import React from "react";
import Add from "../img/add.png";
import Vedio from "../img/cam.png";
import More from "../img/more.png";
import Back from "../img/back.png";

function ChatTopBar() {
	return (
		<div className='chat-navbar'>
			<div className='username'>
				<img className='btn' src={Back} />
				<span>monkey99</span>
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
