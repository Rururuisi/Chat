import React, { useState } from "react";

function ChatTextArea() {
	const [text, setText] = useState("");

	const changeHandler = (evt) => {
		setText(evt.target.value);
	};

	return (
		<div className='chat-textarea'>
			<div className='textarea'>{text}</div>
			<div className='textarea-box'>
				<textarea onChange={changeHandler} />
			</div>
		</div>
	);
}

export default ChatTextArea;
