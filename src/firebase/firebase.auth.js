import { app } from "./firebase.config";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	AuthErrorCodes,
} from "firebase/auth";
import { addUserToDoc } from "./firebase.firestore.js";
import { uploadAvatar } from "./firebase.storage.js";
import catchFirebaseError from "./filebase.error.js";

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
		return user;
	} catch (err) {
		if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
			catchFirebaseError(err, "Email already in use! ");
		} else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
			catchFirebaseError(
				err,
				"Password should be at least 6 characters! "
			);
		} else {
			catchFirebaseError(err);
		}
	}
};

const updateUserProfile = async (userInfo) => {
	try {
		await updateProfile(auth.currentUser, userInfo);
	} catch (err) {
		catchFirebaseError(err);
	}
};

export { createUser, updateUserProfile };
