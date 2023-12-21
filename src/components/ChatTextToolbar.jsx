import React from "react";
import ChatTextArea from "./ChatTextArea";
import Img from "../img/img.png";
import Attach from "../img/attach.png";

function ChatTextToolbar() {
	return (
		<div className='chat-text-toolbar'>
			<ChatTextArea />
			<div className='btn-group'>
				<img src={Img} />
				<img src={Attach} />
				<button>Send</button>
			</div>
		</div>
	);
}

export default ChatTextToolbar;
