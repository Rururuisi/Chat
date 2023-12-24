import { useContext, useEffect, useState, useRef } from "react";
import { ChatContext } from "../contexts/chat.context";
import Message from "./Chat.message";
import { onChatsSnapshotListener } from "../firebase/firebase.firestore";

function Messages() {
	const { data } = useContext(ChatContext);
	const { chatId } = data;

	const [messages, setMessages] = useState([]);

	const ref = useRef();

	useEffect(() => {
		ref.current.scrollTop = ref.current.scrollHeight;
	}, [messages]);

	useEffect(() => {
		const getMessages = () => {
			const unsubscribe = onChatsSnapshotListener(chatId, (doc) => {
				doc.exists() && setMessages(doc.data().messages);
			});

			return unsubscribe;
		};

		chatId && getMessages();
	}, [chatId]);

	return (
		<div className='messages'>
			<div ref={ref} className='container'>
				{messages.length > 0 &&
					messages.map((msg, idx) => (
						<Message key={idx} message={msg} />
					))}
			</div>
		</div>
	);
}

export default Messages;
