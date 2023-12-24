import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import {
	combineId,
	findDocData,
	addChatToDoc,
	updateUserChatsDocInitial,
} from "../firebase/firebase.firestore";
import Avatar from "../img/avatar.jpg";

function UserList({ users = [], isAddedFunc }) {
	const { currentUser } = useContext(AuthContext);

	const getUserInfo = (uid, displayName, photoURL) => ({
		userId: uid,
		displayName,
		photoURL,
	});

	const addChat = async (user) => {
		const chatId = combineId(user.uid, currentUser.uid);
		try {
			const chat = await findDocData("chats", chatId);
			if (!chat) {
				await addChatToDoc(chatId);
				await updateUserChatsDocInitial(currentUser.uid, {
					chatId,
					...getUserInfo(user.uid, user.displayName, user.photoURL),
				});
				await updateUserChatsDocInitial(user.uid, {
					chatId,
					...getUserInfo(
						currentUser.uid,
						currentUser.displayName,
						currentUser.photoURL
					),
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
