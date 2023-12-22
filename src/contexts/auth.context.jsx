import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener } from "../firebase/firebase.auth";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			setCurrentUser(user);
		});
		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthContextProvider };
