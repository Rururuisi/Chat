import { createContext, useState } from "react";

const ThemeContext = createContext();
const mode = localStorage.getItem("themeMode") || "night";

const ThemeContextProvider = ({ children }) => {
	const [onNightMode, setOnNightMode] = useState(
		mode === "night" ? true : false
	);

	const switchMode = () => {
		localStorage.setItem("themeMode", !onNightMode ? "night" : "day");
		setOnNightMode(!onNightMode);
	};

	const value = { onNightMode, switchMode };

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeContextProvider };
