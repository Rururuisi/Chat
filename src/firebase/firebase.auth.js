import { app } from "./firebase.config";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
} from "firebase/auth";
import { addUserToDoc, addUserChatToDoc } from "./firebase.firestore.js";
import { uploadAvatar } from "./firebase.storage.js";
import { authErrorHandler } from "./filebase.error.js";

// Email Password Authentication
const auth = getAuth(app);

const createUser = async (displayName, email, password, avatar) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		if (avatar) {
			const photoURL = await uploadAvatar(
				user.displayName + user.uid,
				avatar
			);
			user.photoURL = photoURL;
		}
		user.displayName = displayName;
		await updateUserProfile(user);
		await addUserToDoc(user);
		await addUserChatToDoc(user.uid, {});
		return user;
	} catch (err) {
		authErrorHandler(err);
	}
};

const signInUser = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential.user;
	} catch (err) {
		authErrorHandler(err);
	}
};

const signOutUser = () => {
	signOut(auth);
};

const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);

const updateUserProfile = async (userInfo) => {
	try {
		await updateProfile(auth.currentUser, userInfo);
	} catch (err) {
		authErrorHandler(err);
	}
};

export {
	auth,
	createUser,
	signInUser,
	signOutUser,
	updateUserProfile,
	onAuthStateChangedListener,
};
