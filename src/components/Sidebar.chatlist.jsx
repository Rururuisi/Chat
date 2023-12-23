import { useContext, useState } from "react";
import { ChatContext } from "../contexts/chat.context";

import Avatar from "../img/avatar.jpg";

function ChatList({ isSearch = false, chats = [] }) {
	const { dispatch, ActionType } = useContext(ChatContext);

	const [selectedChat, setSelectedChat] = useState("");

	const selectHandler = (chatIdx, userInfo) => {
		setSelectedChat(chatIdx);
		dispatch({ type: ActionType.CHANGE_USER, payload: userInfo });
	};

	return (
		<ul className='user-list chatlist'>
			{!isSearch && chats.length === 0 && (
				<p className='empty-list'>Empty</p>
			)}
			{chats.map((chat, idx) => {
				const { date, userInfo } = chat[1];
				return (
					<li
						key={chat[0]}
						className={`user ${idx === selectedChat && "active"}`}
						onClick={() => selectHandler(idx, userInfo)}>
						<div>
							<img src={userInfo.photoURL || Avatar} />
							<span>
								<p className='username'>
									{userInfo.displayName}
								</p>
								<p className='message'>
									ok, I'll get back later.{" "}
								</p>
							</span>
						</div>
					</li>
				);
			})}
		</ul>
	);
}

export default ChatList;
