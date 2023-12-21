import "../styles/chat.scss";
import React from "react";
import ChatTopBar from "./ChatTopBar";
import ChatWindow from "./ChatWindow";
import ChatTextToolbar from "./ChatTextToolbar";

function Chat() {
	return (
		<div className='chat'>
			<ChatTopBar />
			<ChatWindow />
			<ChatTextToolbar />
		</div>
	);
}

export default Chat;
