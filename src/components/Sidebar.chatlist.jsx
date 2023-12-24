import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../contexts/chat.context";

import Avatar from "../img/avatar.jpg";

function ChatList({ isSearch = false, chats = [] }) {
	const { dispatch, ActionType } = useContext(ChatContext);

	const [selectedChat, setSelectedChat] = useState("");

	const selectHandler = (userInfo) => {
		setSelectedChat(userInfo.uid);
		dispatch({ type: ActionType.CHANGE_USER, payload: userInfo });
	};

	const getTime = (date) => {
		const t = date.toDate();
		const isToday = t.getDate() === new Date().getDate();
		const timeStr = `${t.toLocaleTimeString([], { timeStyle: "short" })}`;
		const dateStr = `${t.toLocaleDateString()}`;
		return isToday ? timeStr : dateStr;
	};

	return (
		<ul className='user-list chatlist'>
			{!isSearch && chats.length === 0 && (
				<p className='empty-list'>Empty</p>
			)}
			{chats.map((chat) => {
				const { lastMessage, date, userInfo } = chat[1];
				return (
					<li
						key={chat[0]}
						className={`user ${
							userInfo.uid === selectedChat && "active"
						}`}
						onClick={() => selectHandler(userInfo)}>
						<div>
							<img src={userInfo.photoURL || Avatar} />
							<span>
								<p className='username'>
									{userInfo.displayName}
								</p>
								<p className='message'>
									{lastMessage?.text || ""}
								</p>
							</span>
						</div>
						<div id='chat-list-time'>{date && getTime(date)}</div>
					</li>
				);
			})}
		</ul>
	);
}

export default ChatList;
