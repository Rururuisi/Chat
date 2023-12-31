import React, { useContext, useEffect } from "react";
import Add from "../img/add.png";
import Vedio from "../img/cam.png";
import More from "../img/more.png";
import Back from "../img/back.png";
import { ThemeContext } from "../contexts/theme.context";

function ChatTopBar({ username }) {
	const { onChatSwitch } = useContext(ThemeContext);

	return (
		<div className='chat-navbar'>
			<div className='username'>
				<img
					className='btn'
					src={Back}
					onClick={() => onChatSwitch(false)}
				/>
				<span>{username}</span>
			</div>
			<div className='btn-group'>
				<img src={Add} />
				<img src={Vedio} />
				<img src={More} />
			</div>
		</div>
	);
}

export default ChatTopBar;
