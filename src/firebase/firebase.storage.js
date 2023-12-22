import { app } from "./firebase.config";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	uploadBytes,
} from "firebase/storage";
import { updateUserProfile } from "./firebase.auth";
import catchFirebaseError from "./filebase.error";

// Initialize Cloud Storage and get a reference to the service
const storageRef = ref(getStorage(app), "user-assets");

const uploadAvatar = async (uid, file) => {
	try {
		// upload to the folder path "avatars/"
		const avatarsRef = ref(storageRef, `${uid}/avatar.jpg`);
		const url = await processUpload(avatarsRef, file);
		return url;
	} catch (err) {
		catchFirebaseError(err);
	}
};

const processUpload = async (storageRef, file) => {
	try {
		await uploadBytes(storageRef, file);
		const url = await getDownloadURL(storageRef);
		await updateUserProfile({ photoURL: url });
		return url;
	} catch (err) {
		catchFirebaseError(err);
	}
};

export { uploadAvatar };
