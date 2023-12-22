import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { ThemeContext } from "../contexts/theme.context";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.main";
import Chat from "../components/Chat.main";

function Home() {
	const { currentUser } = useContext(AuthContext);
	const { onNightMode } = useContext(ThemeContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	}, []);

	return (
		<div className='home' id={`${onNightMode ? "night" : "light"}`}>
			{currentUser && (
				<div className='container'>
					<Sidebar />
					<Chat />
				</div>
			)}
		</div>
	);
}

export default Home;
