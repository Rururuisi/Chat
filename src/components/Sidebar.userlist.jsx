import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import {
	combineId,
	findDocData,
	addChatToDoc,
} from "../firebase/firebase.firestore";
import Avatar from "../img/avatar.jpg";

function UserList({ users = [] }) {
	const { currentUser } = useContext(AuthContext);

	const addChat = async (user) => {
		const chatId = combineId(user.uid, currentUser.uid);
		const chat = await findDocData("chats", chatId);
		if (!chat) {
			addChatToDoc(chatId, {});
		}
	};

	return (
		<ul className='user-list search'>
			{users.length === 0 && <p className='not-found'>Not Found</p>}
			{users.map((user) => (
				<li key={user.uid} className={`user`}>
					<div>
						<img src={user.photoURL || Avatar} />
						<span>
							<p className='username'>{user.displayName}</p>
							<p className='message'>ok, I'll get back later. </p>
						</span>
					</div>
					<div>
						<button
							className='add-user-btn'
							onClick={(evt) => addChat(user)}>
							Add
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}

export default UserList;
