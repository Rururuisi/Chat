import { useState } from "react";
import Sidebar from "../components/Sidebar.main";
import Chat from "../components/Chat.main";

function Home() {
	const [onNight, setOnNight] = useState(true);

	const switchMode = () => setOnNight(!onNight);

	return (
		<div className='home' id={`${onNight ? "" : "light"}`}>
			<div className='container'>
				<Sidebar sitchMode={switchMode} isNight={onNight} />
				<Chat />
			</div>
		</div>
	);
}

export default Home;
