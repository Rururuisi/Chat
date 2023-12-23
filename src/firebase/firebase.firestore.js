import { app } from "./firebase.config";
import {
	getFirestore,
	doc,
	setDoc,
	collection,
	query,
	where,
	getDocs,
	getDoc,
} from "firebase/firestore";
import { dbErrorHandler, storageErrorHandler } from "./filebase.error";

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
		await setDoc(doc(db, "userChats", userId), userChat);
	} catch (err) {
		dbErrorHandler(err);
	}
};

const addChatToDoc = async (chatId, chat) => {
	try {
		await setDoc(doc(db, "chats", chatId), chat);
	} catch (err) {
		dbErrorHandler(err);
	}
};

const searchMatchUsers = async (displayName) => {
	try {
		const q = query(
			collection(db, "users"),
			where("displayName", "==", displayName)
		);
		const snapshot = await getDocs(q);
		const users = [];

		snapshot.forEach((doc) => {
			users.push(doc.data());
		});

		return users;
	} catch (err) {
		storageErrorHandler(err);
	}
};

const findDocData = async (collectionName, uid) => {
	try {
		const docRef = doc(db, collectionName, uid);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists) {
			return null;
		}

		return docSnap.data();
	} catch (err) {
		storageErrorHandler(err);
	}
};

const combineId = (uid1, uid2) => {
	return uid1 > uid2 ? uid1 + uid2 : uid2 + uid1;
};

export {
	addUserToDoc,
	addUserChatToDoc,
	addChatToDoc,
	searchMatchUsers,
	findDocData,
	combineId,
};

/**
 * Data:
 * 1. users - collection of users, user's id -> user's id and info
 * 2. userChats - collection of the chats of each users (similar to friend list of each user), user's id -> other users' id and chat id of them
 * 3. chats - collection of all chats (chats of all the users), chat's id -> [user1's id and message, user2's id and message, ...]
 */
