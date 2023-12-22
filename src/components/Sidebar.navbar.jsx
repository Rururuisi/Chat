import React from "react";
import { useNavigate } from "react-router-dom";
import Add from "../img/add.png";
import Avatar from "../img/avatar.jpg";
import Night from "../img/night.png";
import Day from "../img/day.png";

function Navbar({ switchMode, isNight = true }) {
	const navigate = useNavigate();

	const logoutHandler = () => {
		navigate("/login");
	};

	return (
		<div className='sidebar-navbar'>
			<div className='username'>
				<img src={Avatar} />
				<span>yyds9943</span>
			</div>
			<div className='btn-group'>
				<img src={Add} />
				<img src={isNight ? Day : Night} onClick={switchMode} />
				<button onClick={logoutHandler}>Logout</button>
			</div>
		</div>
	);
}

export default Navbar;
