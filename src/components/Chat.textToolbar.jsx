import React from "react";
import ChatTextarea from "./Chat.textarea";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import SendDay from "../img/send-day.png";
import SendNight from "../img/send-night.png";

function ChatTextToolbar() {
	return (
		<form className='chat-text-toolbar'>
			<ChatTextarea />
			<div className='btn-group'>
				<img src={Img} />
				<img src={Attach} />
				<img className='send' src={SendNight} />
				{/*<button type='submit'>Send</button>*/}
			</div>
		</form>
	);
}

export default ChatTextToolbar;
