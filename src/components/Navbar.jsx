import React from "react";
import Add from "../img/add.png";
import Avatar from "../img/avatar.jpg";
import More from "../img/more.png";

function Navbar() {
	return (
		<div className='navbar'>
			<div className='username'>
				<img src={Avatar} />
				<span>yyds9943</span>
			</div>
			<div className='btn-group'>
				<img src={Add} />
				<button>Logout</button>
			</div>
		</div>
	);
}

export default Navbar;
