import "./styles/style.scss";
import "./styles/mode.scss";
import { AuthContextProvider } from "./contexts/auth.context";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthContextProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</AuthContextProvider>
);
