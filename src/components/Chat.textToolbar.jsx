import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/theme.context";
import ChatTextarea from "./Chat.textarea";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import SendDay from "../img/send-day.png";
import SendNight from "../img/send-night.png";

function ChatTextToolbar() {
	const { onNightMode } = useContext(ThemeContext);

	const [text, setText] = useState([]);
	const [img, setImg] = useState({});

	const textChangeHanlder = (evt) => {
		setText((evt.target.value + " ").split(/(\n)/g));
	};

	const imgChangeHandler = (evt) => {
		setImg(evt.target.file[0]);
	};

	const submitHandler = (evt) => {
		evt.preventDefault();
		setText([]);
		setImg({});
		evt.target.reset();
	};

	return (
		<form className='chat-text-toolbar' onSubmit={submitHandler}>
			<ChatTextarea text={text} changeHandler={textChangeHanlder} />
			<div className='btn-container'>
				<div className='btn-group'>
					<input
						type='file'
						id='img'
						style={{ display: "none" }}
						onChange={imgChangeHandler}
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
					<button id='send-message' type='submit'>
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
