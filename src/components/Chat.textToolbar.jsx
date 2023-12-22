import React from "react";
import ChatTextarea from "./Chat.textarea";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import SendDay from "../img/send-day.png";
import SendNight from "../img/send-night.png";

function ChatTextToolbar() {
	const submitHandler = (evt) => {
		evt.preventDefault();
		evt.target.reset();
	};

	return (
		<form className='chat-text-toolbar' onSubmit={submitHandler}>
			<ChatTextarea />
			<div className='btn-container'>
				<div className='btn-group'>
					<img src={Img} />
					<img src={Attach} />
					<button id='send-message' type='submit'>
						<img className='send' src={SendNight} />
					</button>
				</div>
			</div>
		</form>
	);
}

export default ChatTextToolbar;
