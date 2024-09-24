import RegisterPage from "@pages/RegisterPage";
import { Route } from "@shared/models/Route";
export const unProtectedRoutes: Route[] = [
	{
		path: "/register",
		Component: RegisterPage,
	},
];

export const protectedRoutes: Route[] = [];
