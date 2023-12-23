import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import {
	combineId,
	findDocData,
	addChatToDoc,
	updateUserChatsDoc,
} from "../firebase/firebase.firestore";
import Avatar from "../img/avatar.jpg";

function UserList({ users = [], isAddedFunc }) {
	const { currentUser } = useContext(AuthContext);

	const addChat = async (user) => {
		const chatId = combineId(user.uid, currentUser.uid);
		const userInfo = {
			userId: user.uid,
			displayName: user.displayName,
			photoURL: user.photoURL,
		};
		try {
			const chat = await findDocData("chats", chatId);
			if (!chat) {
				await addChatToDoc(chatId);
				await updateUserChatsDoc(currentUser.uid, {
					chatId,
					...userInfo,
				});
			}
		} catch (err) {
			alert(err.message);
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
						{isAddedFunc(user.uid) ? (
							<span style={{ fontSize: "14px", color: "#666" }}>
								Added
							</span>
						) : (
							<button
								className='add-user-btn'
								onClick={(evt) => addChat(user)}>
								Add
							</button>
						)}
					</div>
				</li>
			))}
		</ul>
	);
}

export default UserList;
