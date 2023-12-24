import "../styles/sidebar.scss";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/auth.context";
import { searchMatchUsers } from "../firebase/firebase.firestore";
import { onUserChatsSnapshotListener } from "../firebase/firebase.firestore";
import Navbar from "./Sidebar.navbar";
import ChatList from "./Sidebar.chatlist";
import UserList from "./Sidebar.userlist";

function Sidebar() {
	const { currentUser } = useContext(AuthContext);
	const [userList, setuserList] = useState([]);
	const [isSearch, setIsSearch] = useState(false);
	const [chats, setChats] = useState([]);

	useEffect(() => {
		const getChats = () => {
			const unsubscribe = onUserChatsSnapshotListener(
				currentUser.uid,
				(doc) => {
					setChats(
						Object.entries(doc.data()).sort(
							(a, b) => b[1].date - a[1].date
						)
					);
				}
			);
			return unsubscribe;
		};
		currentUser.uid && getChats();
	}, [currentUser.uid]);

	const searchHandler = async (evt) => {
		const value = evt.target.value;
		if (value === "") {
			setIsSearch(false);
		} else {
			try {
				const users = await searchMatchUsers(value);
				setuserList(
					users.filter((user) => user.uid !== currentUser.uid)
				);
				setIsSearch(true);
			} catch (err) {
				alert(err.message);
			}
		}
	};

	const isAdded = (uid) => {
		return chats.findIndex((chat) => chat[1].userInfo.uid === uid) > -1;
	};

	return (
		<div className='sidebar'>
			<Navbar />
			<div className='search'>
				<input
					type='search'
					placeholder='Enter username to find and add a user chat...'
					onChange={searchHandler}
				/>
			</div>
			<div className='list'>
				{isSearch && (
					<UserList users={userList} isAddedFunc={isAdded} />
				)}
				<ChatList isSearch={isSearch} chats={chats} />
			</div>
		</div>
	);
}

export default Sidebar;
