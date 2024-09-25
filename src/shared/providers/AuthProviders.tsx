import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
	User,
	getAuth,
	signInWithEmailAndPassword,
	reauthenticateWithCredential,
	EmailAuthProvider,
	updatePassword,
	AuthErrorCodes,
	sendPasswordResetEmail,
	checkActionCode,
	verifyPasswordResetCode,
	confirmPasswordReset,
	RecaptchaVerifier,
	signInWithPhoneNumber,
	PhoneAuthProvider,
	signInWithCredential,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { firebaseApp } from "../../environment";
import { useAuthStore } from "@store/auth";

interface AuthContext {
	isLoading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: (id?: string) => Promise<void>;
	changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
	forgotPassword: (email: string) => Promise<void>;
	resetDefaultPassword: (oldPassword: string, newPassword: string) => Promise<void>;
	getAccessTokenSilently: () => Promise<string | null>;
	checkOobCode: (oobCode: string) => Promise<string | undefined>;
	resetPassword: (oobCode: string, email: string, newPassword: string) => Promise<void>;
	signInWithPhone: (phoneNumber: string, container: HTMLElement) => Promise<string>;
	verifyPhoneCode: (code: string, verificationId: string) => Promise<void>;
	signInWithToken: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
}

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	const [isLoading, setIsLoading] = useState(true);
	const auth = getAuth(firebaseApp);
	const { setToken, setUser, logout } = useAuthStore();

	const getAccessTokenSilently = useCallback(async () => {
		const user = auth.currentUser;
		if (user) {
			const token = await user.getIdToken();
			console.log(token);
			return token;
		}
		return null;
	}, []);

	const onAuthStateChanged = useCallback(async (authUser: User | null) => {
		if (authUser) {
			const token = await authUser.getIdTokenResult();
			setToken(token.token);
			console.log(token, authUser);
			setUser({
				id: authUser.uid,
				email: authUser.email ?? "",
				name: authUser.displayName ?? "",
				phone: authUser.phoneNumber ?? "",
			});
		}
		setIsLoading(false);
	}, []);

	const signInWithToken = useCallback(async (jwtToken: string) => {
		try {
			setIsLoading(true);
			console.log(jwtToken);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const token = params.get("token");
		if (token) {
			signInWithToken(token);
			return;
		}
		const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	const signIn = useCallback(async (email: string, password: string) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			if (error instanceof FirebaseError) {
				if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
					throw new Error("Invalid email or password");
				}
				if (error.code === AuthErrorCodes.USER_DELETED) {
					throw new Error("No account found with this email");
				}
				if (error.code === AuthErrorCodes.USER_DISABLED) {
					throw new Error("This account has been disabled");
				}
				if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
					throw new Error("Please check your password and try again");
				}
				if (error.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
					throw new Error("Too many attempts, please try again later");
				}
				if (error.code === AuthErrorCodes.INVALID_EMAIL) {
					throw new Error("Invalid email");
				}
			}
			throw new Error("An error occurred while signing in");
		}
	}, []);

	const signInWithPhone = useCallback(async (phoneNumber: string, container: HTMLElement) => {
		try {
			const appVerifier = new RecaptchaVerifier(auth, container, { size: "invisible" });
			const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

			return confirmationResult.verificationId;
		} catch (error) {
			if (error instanceof FirebaseError) {
				if (error.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
					throw new Error(
						"We noticed several incorrect verification attempts. To protect your account, we've limited OTP requests for now. Please wait a few minutes and try again.",
					);
				}
				if (error.code === AuthErrorCodes.ADMIN_ONLY_OPERATION) {
					throw new Error(
						"Patient not Your mobile number is not yet activated for login. Please contact your practice to complete the onboarding process.",
					);
				}
			}
			throw new Error("An error occurred while signing in");
		}
	}, []);

	const verifyPhoneCode = useCallback(async (code: string, verificationId: string) => {
		try {
			const credential = PhoneAuthProvider.credential(verificationId, code);
			await signInWithCredential(auth, credential);
		} catch (error) {
			if (error instanceof FirebaseError) {
				if (error.code === AuthErrorCodes.INVALID_CODE) {
					throw new Error("Invalid Verification Code. Please try again.");
				}
				if (error.code === "auth/code-expired") {
					throw new Error(
						"The verification code you entered timed out. Just  click ‘Resend Code’ and we’ll send you a new one.",
					);
				}
			}
			throw new Error("An error occurred while signing in");
		}
	}, []);

	const signOut = useCallback(async (id?: string) => {
		console.log(id);
		try {
			await logout();
			await auth.signOut();
			setUser(null);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
		const user = auth.currentUser;
		if (user) {
			try {
				const email = user.email ?? "";
				await reauthenticateWithCredential(
					user,
					EmailAuthProvider.credential(email, currentPassword),
				);
				await updatePassword(user, newPassword);
			} catch (error) {
				if (error instanceof FirebaseError) {
					if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
						throw new Error("Password is too weak");
					}
					if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
						throw new Error("Please check your current password");
					}
				}
				throw new Error("An error occurred while changing the password");
			}
		}
	}, []);

	const resetDefaultPassword = useCallback(async (currentPassword: string, newPassword: string) => {
		const user = auth.currentUser;
		if (user) {
			try {
				const email = user.email ?? "";
				await reauthenticateWithCredential(
					user,
					EmailAuthProvider.credential(email, currentPassword),
				);
				await updatePassword(user, newPassword);
			} catch (error) {
				if (error instanceof FirebaseError) {
					if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
						throw new Error("Password is too weak");
					}
					if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
						throw new Error("Please check your current password");
					}
				}
				throw new Error("An error occurred while changing the password");
			}
		}
	}, []);

	const forgotPassword = useCallback(async (email: string) => {
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const checkOobCode = useCallback(async (oobCode: string) => {
		try {
			const info = await checkActionCode(auth, oobCode);
			return info.data.email ?? undefined;
		} catch (error) {
			console.error(error);
		}
	}, []);

	const resetPassword = useCallback(async (oobCode: string, email: string, newPassword: string) => {
		try {
			const accountEmail = await verifyPasswordResetCode(auth, oobCode);
			if (accountEmail !== email) {
				throw new Error("invalid-email");
			}
			await confirmPasswordReset(auth, oobCode, newPassword);
		} catch (error: any) {
			console.error(error);
			if (error.toString().includes("invalid-email")) {
				throw new Error("Unable to reset password, please request a new link");
			}
			throw new Error("An error occurred while resetting the password");
		}
	}, []);

	const value = useMemo(
		() => ({
			isLoading,
			signIn,
			signOut,
			changePassword,
			forgotPassword,
			resetDefaultPassword,
			getAccessTokenSilently,
			checkOobCode,
			resetPassword,
			signInWithPhone,
			verifyPhoneCode,
			signInWithToken,
		}),
		[
			isLoading,
			signIn,
			signOut,
			changePassword,
			forgotPassword,
			resetDefaultPassword,
			getAccessTokenSilently,
			checkOobCode,
			resetPassword,
			signInWithPhone,
			verifyPhoneCode,
			signInWithToken,
		],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
