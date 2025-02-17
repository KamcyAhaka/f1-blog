// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCtd0yH1L5nmB7wRJPhHCDbyUW_O-4i7J0",
	authDomain: "f1-blog-8d4cc.firebaseapp.com",
	databaseURL: "https://f1-blog-8d4cc-default-rtdb.firebaseio.com",
	projectId: "f1-blog-8d4cc",
	storageBucket: "f1-blog-8d4cc.appspot.com",
	messagingSenderId: "1011215681017",
	appId: "1:1011215681017:web:6439537c3391e53b5ba928",
	measurementId: "G-FLQGPW9GCS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const storage = getStorage(app);
//
// if (process.env.NODE_ENV === 'development') {
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

export { auth, db, storage };
