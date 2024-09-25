import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { environment } from "@enviroment";

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
}

export const useAuthStore = create<AuthStore>((set) => ({
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
	},
}));

if (environment.production === false) {
	mountStoreDevtool("Auth", useAuthStore);
}
