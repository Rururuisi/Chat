import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/theme.context";
import { AuthContext } from "../contexts/auth.context";
import { ChatContext } from "../contexts/chat.context";
import {
	updateChatsDoc,
	updateUserChatsDocLastMsg,
} from "../firebase/firebase.firestore";
import ChatTextarea from "./Chat.textarea";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import SendDay from "../img/send-day.png";
import SendNight from "../img/send-night.png";
import ImageControl from "./Chat.imageControl";

function ChatTextToolbar() {
	const { onNightMode } = useContext(ThemeContext);
	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const [text, setText] = useState([]);
	const [img, setImg] = useState("");
	const [imgUrl, setImageUrl] = useState("");
	const [onImgCtrlPannel, setOnImgCtrlPannel] = useState(false);

	const textChangeHanlder = (evt) => {
		setText((evt.target.value + " ").split(/(\n)/g));
	};

	const imgChangeHandler = (evt) => {
		setImg(evt.target.files[0]);
		setImageUrl(URL.createObjectURL(evt.target.files[0]));
		evt.target.files[0] && setOnImgCtrlPannel(true);
	};

	const clickHandler = (evt) => {
		if (text.length === 0 && !img) {
			evt.preventDefault();
		}
	};

	const submitHandler = async (evt) => {
		evt.preventDefault();
		setOnImgCtrlPannel(false);
		try {
			await updateChatsDoc(data.chatId, currentUser.uid, text, img);
			await updateUserChatsDocLastMsg(
				data.user.uid,
				data.chatId,
				img ? "[Image]" : text[0]
			);
			await updateUserChatsDocLastMsg(
				currentUser.uid,
				data.chatId,
				img ? "[Image]" : text[0]
			);
			setText([]);
			setImg(null);
			evt.target.reset();
		} catch (err) {
			alert(err.message);
		}
	};

	const cancleImageHandler = (evt) => {
		setOnImgCtrlPannel(false);
		setImg(null);
		setImageUrl("");
	};

	return (
		<form className='chat-text-toolbar' onSubmit={submitHandler}>
			{onImgCtrlPannel && (
				<ImageControl
					image={imgUrl}
					cancelHandler={cancleImageHandler}
				/>
			)}
			<ChatTextarea text={text} changeHandler={textChangeHanlder} />
			<div className='btn-container'>
				<div className='btn-group'>
					<input
						type='file'
						id='img'
						style={{ display: "none" }}
						onInput={imgChangeHandler}
						accept='image/*'
					/>
					<label htmlFor='img'>
						<img src={Img} />
					</label>
					{/*<input
						type='file'
						id='attach'
						style={{ display: "none" }}
					/>
					<label htmlFor='attach'>
					</label>*/}
					<img src={Attach} />
					<button
						id='send-message'
						type='submit'
						onClick={clickHandler}>
						<img
							className='send'
							src={onNightMode ? SendNight : SendDay}
						/>
					</button>
				</div>
			</div>
		</form>
	);
}

export default ChatTextToolbar;
