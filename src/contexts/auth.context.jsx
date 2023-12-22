import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.auth";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});

		// cleanup function, prevent memory leaking
		return () => {
			unsub();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthContextProvider };
