import "./styles/style.scss";
import "./styles/mode.scss";
import { AuthContextProvider } from "./contexts/auth.context";
import { ThemeContextProvider } from "./contexts/theme.context.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthContextProvider>
			<ThemeContextProvider>
				<App />
			</ThemeContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
