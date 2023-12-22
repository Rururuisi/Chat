import React from "react";
import Message from "./Chat.message";

function Messages() {
	return (
		<div className='messages'>
			<div className='container'>
				<Message />
				<Message isReceiver={true} />
				<Message />
				<Message />
				<Message isReceiver={true} />
				<Message isReceiver={true} />
				<Message />
				<Message />
				<Message />
				<Message isReceiver={true} />
				<Message />
				<Message />
				<Message />
				<Message isReceiver={true} />
			</div>
		</div>
	);
}

export default Messages;
