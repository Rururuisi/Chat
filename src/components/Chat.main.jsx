import "../styles/chat.scss";
import React from "react";
import ChatNavbar from "./Chat.navbar";
import ChatWindow from "./Chat.window";
import ChatTextToolbar from "./Chat.textToolbar";

function Chat() {
	return (
		<div className='chat'>
			<ChatNavbar />
			<ChatWindow />
			<ChatTextToolbar />
		</div>
	);
}

export default Chat;
