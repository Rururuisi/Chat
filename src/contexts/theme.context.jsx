import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const mode = localStorage.getItem("themeMode") || "night";

const ThemeContextProvider = ({ children }) => {
	const [onChat, setOnChat] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [onNightMode, setOnNightMode] = useState(
		mode === "night" ? true : false
	);

	useEffect(() => {
		const unsubscribe = () =>
			window.addEventListener("resize", (evt) => {
				setWindowWidth(window.innerWidth);
			});
		return unsubscribe;
	}, []);

	useEffect(() => {
		if (!onChat) {
			if (window.innerWidth < 768) {
				document.querySelector(".chat").style.display = "none";
				document.querySelector(".sidebar").style.display = "block";
			} else {
				document.querySelector(".chat").style.display = "flex";
				document.querySelector(".sidebar").style.display = "block";
			}
		} else {
			if (window.innerWidth < 768) {
				document.querySelector(".chat").style.display = "flex";
				document.querySelector(".sidebar").style.display = "none";
			} else {
				document.querySelector(".chat").style.display = "flex";
				document.querySelector(".sidebar").style.display = "block";
			}
		}
	}, [onChat, windowWidth]);

	const onChatSwitch = (isOnChat) => {
		setOnChat(isOnChat);
	};

	const switchMode = () => {
		localStorage.setItem("themeMode", !onNightMode ? "night" : "day");
		setOnNightMode(!onNightMode);
	};

	const value = { onNightMode, switchMode, onChat, onChatSwitch };

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeContextProvider };
