import { AuthErrorCodes } from "firebase/auth";

class FirebaseError extends Error {
	constructor(status, message) {
		super();
		this.status = status;
		this.message = message;
	}
}

const catchFirebaseError = (err, errMsg = undefined) => {
	throw new FirebaseError(err.status, errMsg ? errMsg : err.message);
};

const authErrorHandler = (err) => {
	if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
		catchFirebaseError(err, "Email already in use! ");
	} else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
		catchFirebaseError(err, "Password should be at least 6 characters! ");
	} else {
		catchFirebaseError(err);
	}
};

const dbErrorHandler = (err) => {
	catchFirebaseError(err);
};

const storageErrorHandler = (err) => {
	catchFirebaseError(err);
};

export { authErrorHandler, dbErrorHandler, storageErrorHandler };
