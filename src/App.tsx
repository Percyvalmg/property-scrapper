import React, {lazy, Suspense, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/app";
import "firebase/auth";
import {firebaseConfig} from "./constants";

require("dotenv").config();

const config = {
    apiKey: firebaseConfig.FIREBASE_API_KEY,
    projectId: firebaseConfig.FIREBASE_PROJECT_ID,
    appId: firebaseConfig.FIREBASE_APP_ID,
    measurementId: firebaseConfig.FIREBASE_MEASUREMENT_ID,
    authDomain: firebaseConfig.FIREBASE_AUTH_DOMAIN,
    storageBucket: firebaseConfig.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: firebaseConfig.FIREBASE_MESSAGING_SENDER_ID,
};

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
    useEffect(() => {
        firebase.initializeApp(config);
    }, []);

    return (
        <>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/Login" component={Login}/>
                        <Route path="/Register" component={Register}/>
                    </Switch>
                </Suspense>
            </Router>
        </>
    );
}

export default App;
