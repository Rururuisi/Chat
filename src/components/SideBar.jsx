import "../styles/sidebar.scss";
import React from "react";
import Navbar from "./Navbar";
import Avatar from "../img/avatar.jpg";

function SideBar({ sitchMode, isNight }) {
	return (
		<div className='sidebar'>
			<Navbar switchMode={sitchMode} isNight={isNight} />
			<div className='search'>
				<input type='search' placeholder='Find a user' />
			</div>
			<ul className='user-list'>
				<li className='user active'>
					<img src={Avatar} />
					<span>
						<p className='username'>monkey99</p>
						<p className='message'>ok, I'll get back later. </p>
					</span>
				</li>
				<li className='user'>
					<img src={Avatar} />
					<span>
						<p className='username'>monkey99</p>
						<p className='message'>ok, I'll get back later. </p>
					</span>
				</li>
				<li className='user'>
					<img src={Avatar} />
					<span>
						<p className='username'>monkey99</p>
						<p className='message'>ok, I'll get back later. </p>
					</span>
				</li>
				<li className='user'>
					<img src={Avatar} />
					<span>
						<p className='username'>monkey99</p>
						<p className='message'>ok, I'll get back later. </p>
					</span>
				</li>
				<li className='user'>
					<img src={Avatar} />
					<span>
						<p className='username'>monkey99</p>
						<p className='message'>ok, I'll get back later. </p>
					</span>
				</li>
				<li className='user'>
					<img src={Avatar} />
					<span>
						<p className='username'>monkey99</p>
						<p className='message'>ok, I'll get back later. </p>
					</span>
				</li>
				<li className='user'>
					<img src={Avatar} />
					<span>
						<p className='username'>monkey99</p>
						<p className='message'>ok, I'll get back later. </p>
					</span>
				</li>
				<li className='user'>
					<img src={Avatar} />
					<span>
						<p className='username'>monkey99</p>
						<p className='message'>ok, I'll get back later. </p>
					</span>
				</li>
				<li className='user'>
					<img src={Avatar} />
					<span>
						<p className='username'>monkey99</p>
						<p className='message'>ok, I'll get back later. </p>
					</span>
				</li>
				<li className='user'>
					<img src={Avatar} />
					<span>
						<p className='username'>monkey99</p>
						<p className='message'>ok, I'll get back later. </p>
					</span>
				</li>
				<li className='user'>
					<img src={Avatar} />
					<span>
						<p className='username'>monkey99</p>
						<p className='message'>ok, I'll get back later. </p>
					</span>
				</li>
				<li className='user'>
					<img src={Avatar} />
					<span>
						<p className='username'>monkey99</p>
						<p className='message'>ok, I'll get back later. </p>
					</span>
				</li>
			</ul>
		</div>
	);
}

export default SideBar;
