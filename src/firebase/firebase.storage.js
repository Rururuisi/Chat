import { app } from "./firebase.config";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storageErrorHandler } from "./filebase.error";

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const avatarsRef = ref(storage, "avatars");
const chatImagesRef = ref(storage, "chatImages");

const uploadAvatar = async (filename, file) => {
	try {
		// upload to the folder path "avatars/"
		const avaRef = ref(avatarsRef, `${filename}.jpg`);
		return await processUpload(avaRef, file);
	} catch (err) {
		storageErrorHandler(err);
	}
};

const uploadMessageImage = async (chatId, filename, file) => {
	try {
		const imageRef = ref(chatImagesRef, `${chatId}/${filename}.jpg`);
		return await processUpload(imageRef, file);
	} catch (err) {
		storageErrorHandler(err);
	}
};

const processUpload = async (storageRef, file) => {
	try {
		await uploadBytes(storageRef, file);
		const url = await getDownloadURL(storageRef);
		return url;
	} catch (err) {
		storageErrorHandler(err);
	}
};

export { uploadAvatar, uploadMessageImage };
