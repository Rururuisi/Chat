import Avatar from "../img/avatar.jpg";

function ChatList({ isSearch = false, chats = [] }) {
	return (
		<ul className='user-list'>
			{!isSearch && chats.length === 0 && (
				<p className='empty-list'>Empty</p>
			)}
			{chats.map((chat, id) => (
				<li key={chat.uid} className={`user ${id === 0 && "active"}`}>
					<div>
						<img src={chat.photoURL || Avatar} />
						<span>
							<p className='username'>{chat.displayName}</p>
							<p className='message'>ok, I'll get back later. </p>
						</span>
					</div>
				</li>
			))}
		</ul>
	);
}

export default ChatList;
