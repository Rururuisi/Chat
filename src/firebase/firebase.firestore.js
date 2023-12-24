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
	arrayUnion,
	Timestamp,
} from "firebase/firestore";
import { dbErrorHandler, storageErrorHandler } from "./filebase.error";
import { v4 as uuid } from "uuid";
import { uploadMessageImage } from "./firebase.storage";

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
	try {
		return await searchMatchData("users", "displayName", displayName);
	} catch (err) {
		dbErrorHandler(err);
	}
};

const searchMatchData = async (collectionName, field, value) => {
	try {
		const q = query(
			collection(db, collectionName),
			where(field, "==", value)
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

const updateUserChatsDocInitial = async (
	objectUserId,
	{ chatId, userId, displayName, photoURL }
) => {
	const data = {
		[`${chatId}.userInfo`]: {
			uid: userId,
			displayName,
			photoURL,
		},
		[`${chatId}.date`]: serverTimestamp(),
	};
	await updateUserChatsDoc(objectUserId, data);
};

const updateUserChatsDocLastMsg = async (objectUserId, chatId, lastMessage) => {
	const data = {
		[`${chatId}.lastMessage`]: { text: lastMessage },
		[`${chatId}.date`]: serverTimestamp(),
	};
	await updateUserChatsDoc(objectUserId, data);
};

const updateUserChatsDoc = async (objectUserId, data) => {
	try {
		await updateDoc(doc(db, "userChats", objectUserId), data);
	} catch (err) {
		dbErrorHandler(err);
	}
};

const updateChatsDoc = async (chatId, senderId, text, img) => {
	const messageData = {
		id: uuid(),
		text,
		senderId,
		date: Timestamp.now(),
	};
	try {
		if (img) {
			const url = await uploadMessageImage(
				chatId,
				`${img.name}-${messageData.id}`,
				img
			);
			messageData.imageURL = url;
		}

		await updateDoc(doc(db, "chats", chatId), {
			messages: arrayUnion(messageData),
		});
	} catch (err) {
		dbErrorHandler(err);
	}
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
	updateUserChatsDocInitial,
	updateUserChatsDocLastMsg,
	updateChatsDoc,
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
