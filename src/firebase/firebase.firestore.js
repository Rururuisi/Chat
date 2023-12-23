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
	updateDoc,
	serverTimestamp,
	onSnapshot,
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

const addUserChatToDoc = async (userId, userChat = {}) => {
	try {
		await setDoc(doc(db, "userChats", userId), userChat);
	} catch (err) {
		dbErrorHandler(err);
	}
};

const addChatToDoc = async (chatId, chat = { messages: [] }) => {
	try {
		await setDoc(doc(db, "chats", chatId), chat);
	} catch (err) {
		dbErrorHandler(err);
	}
};

const searchMatchUsers = async (displayName) => {
	return await searchMatchData("users", "displayName", displayName);
};

const searchMatchData = async (collectionName, field, displayName) => {
	try {
		const q = query(
			collection(db, collectionName),
			where(field, "==", displayName)
		);
		const snapshot = await getDocs(q);
		const data = [];

		snapshot.forEach((doc) => {
			data.push(doc.data());
		});

		return data;
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

const updateUserChatsDoc = async (
	currentUserId,
	{ chatId, userId, displayName, photoURL }
) => {
	await updateDoc(doc(db, "userChats", currentUserId), {
		[`${chatId}.userInfo`]: {
			uid: userId,
			displayName,
			photoURL,
		},
		[`${chatId}.date`]: serverTimestamp(),
	});
};

const onUserChatsSnapshotListener = (currentUserId, callback) =>
	onSnapshot(doc(db, "userChats", currentUserId), callback);

const onChatsSnapshotListener = (chatId, callback) =>
	onSnapshot(doc(db, "chats", chatId), callback);

const combineId = (uid1, uid2) => {
	return uid1 > uid2 ? uid1 + uid2 : uid2 + uid1;
};

export {
	addUserToDoc,
	addUserChatToDoc,
	addChatToDoc,
	searchMatchUsers,
	findDocData,
	updateUserChatsDoc,
	onUserChatsSnapshotListener,
	onChatsSnapshotListener,
	combineId,
};

/**
 *  Data:
 *  1. users - collection of users, user's id -> user's id and info
 * 		currentUser's uid ->
 * 		{ displayName, email, photoURL, uid }
 *
 *  2. userChats - collection of the chats of each users (similar to friend list of each user)
 * 		currentUser's uid ->
 * 		{ user1's uid: {
 * 				userInfo: {displayName, photoURL, uid},
 * 				lastMessage: "",
 * 				date: ""
 * 			}
 * 		}
 *
 *
 *  3. chats - collection of all chats (chats of all the users)
 * 		combineID of all users' ids in the chat (chatId) ->
 * 		{ message: [
 * 				{displayName, messageType, message, time},
 * 				{displayName, messageType, message, time},
 * 				...
 * 		 	]
 * 		}
 */
