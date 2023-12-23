import React, { useState, Fragment } from "react";

function ChatTextarea({ text = [], changeHandler }) {
	const keyDownHandler = (evt) => {
		if (evt.key === "Enter" && !evt.shiftKey) {
			evt.preventDefault();
			document.querySelector("#send-message").click();
		}
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
				<textarea
					rows={1}
					onChange={changeHandler}
					onKeyDown={keyDownHandler}
				/>
			</div>
		</div>
	);
}

export default ChatTextarea;
