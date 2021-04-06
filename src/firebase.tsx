import firebase from "firebase";
import "firebase/auth";

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export default app;
