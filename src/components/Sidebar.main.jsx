import "../styles/sidebar.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { searchMatchUsers } from "../firebase/firebase.firestore";
import Navbar from "./Sidebar.navbar";
import ChatList from "./Sidebar.chatlist";
import UserList from "./Sidebar.userlist";

function Sidebar() {
	const { currentUser } = useContext(AuthContext);
	const [userList, setuserList] = useState([]);
	const [isSearch, setIsSearch] = useState(false);

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

	return (
		<div className='sidebar'>
			<Navbar />
			<div className='search'>
				<input
					type='search'
					placeholder='Enter username to find a user...'
					onChange={searchHandler}
				/>
			</div>
			<div className='list'>
				{isSearch && <UserList users={userList} />}
				<ChatList isSearch={isSearch} />
			</div>
		</div>
	);
}

export default Sidebar;
