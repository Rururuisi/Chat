import SideBar from "../components/SideBar";
import Chat from "../components/Chat";
import { useState } from "react";

function Home() {
	const [onNight, setOnNight] = useState(true);

	const switchMode = () => setOnNight(!onNight);

	return (
		<div className='home' id={`${onNight ? "" : "light"}`}>
			<div className='container'>
				<SideBar sitchMode={switchMode} isNight={onNight} />
				<Chat />
			</div>
		</div>
	);
}

export default Home;
