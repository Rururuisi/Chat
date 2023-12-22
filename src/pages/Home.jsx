import { useContext } from "react";
import { ThemeContext } from "../contexts/theme.context";
import Sidebar from "../components/Sidebar.main";
import Chat from "../components/Chat.main";

function Home() {
	const { onNightMode } = useContext(ThemeContext);

	return (
		<div className='home' id={`${onNightMode ? "night" : "light"}`}>
			<div className='container'>
				<Sidebar />
				<Chat />
			</div>
		</div>
	);
}

export default Home;
