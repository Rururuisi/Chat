import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { ThemeContext } from "../contexts/theme.context";
import { signOutUser } from "../firebase/firebase.auth";
import Add from "../img/add.png";
import Avatar from "../img/avatar.jpg";
import Night from "../img/night.png";
import Day from "../img/day.png";

function Navbar() {
	const { currentUser } = useContext(AuthContext);
	const { onNightMode, switchMode } = useContext(ThemeContext);

	return (
		<div className='sidebar-navbar'>
			<div className='username'>
				<img className='avatar' src={currentUser.photoURL || Avatar} />
				<span>{currentUser.displayName}</span>
			</div>
			<div className='btn-group'>
				<img src={Add} />
				<img src={onNightMode ? Day : Night} onClick={switchMode} />
				<button onClick={signOutUser}>Logout</button>
			</div>
		</div>
	);
}

export default Navbar;
