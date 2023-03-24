import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AuthContextProvider from "./context/AuthContextProvider";

const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<Header />
				<Outlet />
			</AuthContextProvider>
		</QueryClientProvider>
	);
}

export default App;
