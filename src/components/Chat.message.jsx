import { useContext } from "react";
import Avatar from "../img/avatar.jpg";
import { AuthContext } from "../contexts/auth.context";
import { ChatContext } from "../contexts/chat.context";

function Message({ message }) {
	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);
	const isMsgOwner = currentUser.uid === message.senderId;
	const avatar =
		`${isMsgOwner ? currentUser.photoURL : data.user.photoURL}` || Avatar;

	const getTime = (date) => {
		const t = date.toDate();
		const dateStr = `${t.toLocaleString([], {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		})}`;
		return dateStr;
	};

	return (
		<div className={`message ${isMsgOwner ? "owner" : ""}`}>
			<img className='avatar' src={avatar} />
			<span className='msg'>
				<p className='time'>{getTime(message.date)}</p>
				{message.text.length > 0 && (
					<div className='bubble'>
						{message.text.map((txt, id) => (
							<p key={id}>{txt}</p>
						))}
					</div>
				)}
				{message.imageURL && (
					<img className='picture' src={message.imageURL} />
				)}
			</span>
		</div>
	);
}

export default Message;
