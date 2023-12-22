// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyBe87VjRRcKSxgdjivLCr0oglsVSp3y5Aw",
	authDomain: "lamachat-e0d30.firebaseapp.com",
	projectId: "lamachat-e0d30",
	storageBucket: "lamachat-e0d30.appspot.com",
	messagingSenderId: "94693677176",
	appId: "1:94693677176:web:7b96becbe3640595ea758d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
