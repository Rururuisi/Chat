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
		ref.current.scrollIntoView({ behavior: "smooth" });
	});

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
			<div className='container'>
				{messages.length > 0 &&
					messages.map((msg, idx) => (
						<Message key={idx} message={msg} />
					))}
				<div ref={ref}></div>
			</div>
		</div>
	);
}

export default Messages;
