import "../styles/chat.scss";
import { useContext } from "react";
import { ChatContext } from "../contexts/chat.context";
import ChatNavbar from "./Chat.navbar";
import ChatWindow from "./Chat.window";
import ChatTextToolbar from "./Chat.textToolbar";

function Chat() {
	const { data } = useContext(ChatContext);
	const { chatId, user } = data;

	return (
		<div className='chat'>
			{chatId === "null" ? (
				<div className='no-chat-open'>Lemma Chat</div>
			) : (
				<>
					<ChatNavbar username={user.displayName} />
					<ChatWindow />
					<ChatTextToolbar />
				</>
			)}
		</div>
	);
}

export default Chat;
