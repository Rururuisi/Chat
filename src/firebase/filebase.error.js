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

export default catchFirebaseError;
