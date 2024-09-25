import { useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { protectedRoutes, unProtectedRoutes } from "./routes";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthStore } from "@store/auth";
import Loader from "@shared/components/Loader";
import ConfirmDialog from "@shared/components/ConfirmDialog";
import Navbar from "@layout/navbar/Home/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { environment } from "@enviroment";
import { useLoaderStore } from "@store/loader";

function AppContainer() {
	axios.defaults.baseURL = environment.baseUrl;
	const { isLoggedIn } = useAuthStore();
	const token = localStorage.getItem("authToken");
	const { user } = useAuthStore();

	if (token && !user) {
		return <Loader />;
	}

	if (!isLoggedIn) {
		return (
			<Routes>
				{unProtectedRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		);
	}

	return (
		<Navbar>
			<Routes>
				{protectedRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Navbar>
	);
}

function App() {
	const [backdropOpen, setBackdropOpen] = useState(false);
	const loaderRef = useRef(useLoaderStore.getState());

	useEffect(() => {
		const unsubscribeLoading = useLoaderStore.subscribe((state) => {
			loaderRef.current = state;
			setBackdropOpen(state.open);
		});

		return () => {
			unsubscribeLoading();
		};
	}, []);

	return (
		<>
			<AppContainer />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				stacked
			/>
			<Backdrop
				sx={{
					color: "custom.white",
					zIndex: (theme) => Math.max.apply(Math, Object.values(theme.zIndex)) + 1,
				}}
				open={backdropOpen}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<ConfirmDialog />
		</>
	);
}

export default App;
