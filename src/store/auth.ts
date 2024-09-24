import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { environment } from "@enviroment";
import { LoaderService } from "@shared/services/LoaderService";

export interface UserInterface {
	id: string;
	email: string;
	name: string;
	phone: string;
}

interface AuthStore {
	isLoggedIn: boolean;
	user: UserInterface | null;
	setLoggedIn: (isLoggedIn: boolean) => void;
	setUser: (user: UserInterface | null) => void;
	setToken: (token: string) => void;
	logout: () => void;
	validateToken: () => Promise<UserInterface | null>;
}

export const useAuthStore = create<AuthStore>((set, getStore) => ({
	isLoggedIn: false,
	user: null,
	setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
	setUser: (user) => {
		localStorage.setItem("userid", user ? user.id : "");
		return set({ user, isLoggedIn: user === null ? false : true });
	},
	logout: () => {
		localStorage.clear();
		sessionStorage.clear();
		set({ isLoggedIn: false, user: null });
	},
	setToken: (token) => {
		localStorage.setItem("authToken", token);
		getStore().validateToken();
	},
	validateToken: async () => {
		const authToken = localStorage.getItem("authToken");
		if (authToken) {
			try {
				LoaderService.instance.showLoader();

				// const user = "user";
				// set({ isLoggedIn: true, user: user });
				return null;
			} catch (error) {
				console.error("[AuthStore] validateToken error", error);
				getStore().logout();
				return null;
			} finally {
				LoaderService.instance.hideLoader();
			}
		}
		getStore().logout();
		return null;
	},
}));

if (environment.production === false) {
	mountStoreDevtool("Auth", useAuthStore);
}
