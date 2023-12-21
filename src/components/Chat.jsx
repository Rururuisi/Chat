import React from "react";
import ChatTopBar from "./ChatTopBar";
import ChatWindow from "./ChatWindow";
import ChatTextArea from "./ChatTextArea";

function Chat() {
	return (
		<div className='chat'>
			<ChatTopBar />
			<ChatWindow />
			<ChatTextArea />
		</div>
	);
}

export default Chat;
