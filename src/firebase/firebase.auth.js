import { app } from "./firebase.config";
import {
	getAuth,
	createUserWithEmailAndPassword,
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
			user.photoURL = await uploadAvatar(user.uid, avatar);
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

const updateUserProfile = async (userInfo) => {
	try {
		await updateProfile(auth.currentUser, userInfo);
	} catch (err) {
		catchFirebaseError(err);
	}
};

export { auth, createUser, updateUserProfile };
