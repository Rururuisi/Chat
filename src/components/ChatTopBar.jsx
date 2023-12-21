import React from "react";
import Vedio from "../img/cam.png";
import More from "../img/more.png";

function ChatTopBar() {
	return (
		<div className='chat-top-bar'>
			<div className='username'>
				<span>monkey99</span>
			</div>
			<div className='btn-group'>
				<img src={Vedio} />
				<img src={More} />
			</div>
		</div>
	);
}

export default ChatTopBar;
