import React from "react";
import Avatar from "../img/avatar.jpg";

function Message({ isReceiver = false }) {
	return (
		<div className={`message ${isReceiver ? "receiver" : ""}`}>
			<img className='avatar' src={Avatar} />
			<span className='msg'>
				<p className='time'>just now</p>
				<p className='bubble'>Hello! Can you do me a favor?</p>
				<img
					className='picture'
					src='https://res.cloudinary.com/scribe-publications/image/upload/w_800,/v1661532377/newcovers/9781922310859_rev.jpg'
				/>
			</span>
		</div>
	);
}

export default Message;
