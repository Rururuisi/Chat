import { app } from "./firebase.config";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { dbErrorHandler } from "./filebase.error";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Add a new document in collection "cities"
const addUserToDoc = async (user) => {
	const { uid, displayName, email, photoURL } = user;
	try {
		await setDoc(doc(db, "users", uid), {
			uid,
			displayName,
			email,
			photoURL,
		});
	} catch (err) {
		dbErrorHandler(err);
	}
};

const addUserChatToDoc = async (userId, userChat) => {
	try {
		await setDoc(doc(db, "chats", userId), userChat);
	} catch (err) {
		dbErrorHandler(err);
	}
};

export { addUserToDoc, addUserChatToDoc };
