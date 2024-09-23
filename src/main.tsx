import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import InternalServerErrorPage from "./pages/InternalServerErrorPage.tsx";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			staleTime: 1 * 60 * 60 * 1000, // 1 hour
			retry: false,
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
					<ErrorBoundary FallbackComponent={InternalServerErrorPage}>
						<App />
					</ErrorBoundary>
				</BrowserRouter>

    </ThemeProvider>
		</QueryClientProvider>
	</StrictMode>,
);
