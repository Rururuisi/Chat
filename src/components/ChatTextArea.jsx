import React, { useState, Fragment } from "react";

function ChatTextArea() {
	const [text, setText] = useState([]);

	const changeHandler = (evt) => {
		setText((evt.target.value + " ").split(/(\n)/g));
	};

	return (
		<div className='chat-textarea'>
			<div className='textarea'>
				{text.map((txt, id) =>
					txt === "\n" ? (
						<Fragment key={id}>
							<br />
						</Fragment>
					) : (
						<Fragment key={id}>{txt}</Fragment>
					)
				)}
			</div>
			<div className='textarea-box'>
				<textarea rows={1} onChange={changeHandler} />
			</div>
		</div>
	);
}

export default ChatTextArea;
