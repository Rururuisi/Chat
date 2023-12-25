import React from "react";
import Add from "../img/add.png";
import Vedio from "../img/cam.png";
import More from "../img/more.png";
import Back from "../img/back.png";

function ChatTopBar({ username }) {
	const backHandler = (evt) => {
		if (window.innerWidth < 768) {
			document.querySelector(".chat").style.display = "none";
			document.querySelector(".sidebar").style.display = "block";
		} else {
			document.querySelector(".chat").style.display = "flex";
			document.querySelector(".sidebar").style.display = "block";
		}
	};

	return (
		<div className='chat-navbar'>
			<div className='username'>
				<img className='btn' src={Back} onClick={backHandler} />
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
