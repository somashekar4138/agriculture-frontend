import LoginPage from "@pages/LoginPage";
import MainPage from "@pages/MainPage";
import RegisterPage from "@pages/RegisterPage";
import { Route } from "@shared/models/Route";
export const unProtectedRoutes: Route[] = [
	{
		path: "/register",
		Component: RegisterPage,
	},
	{
		path: "/login",
		Component: LoginPage,
	},
];

export const protectedRoutes: Route[] = [
	{
		path: "/",
		Component: MainPage,
	},
];
