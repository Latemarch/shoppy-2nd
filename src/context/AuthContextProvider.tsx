import { User } from "firebase/auth";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { login, logout, onUserStateChange } from "../apis/firebase";

interface IProp {
	children: ReactNode;
}
export interface IValue {
	user: User | null;
	login(): any;
	logout(): any;
}

const AuthContext = createContext<IValue | null>(null);

export default function AuthContextProvider({ children }: IProp) {
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		onUserStateChange(setUser);
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext);
}
