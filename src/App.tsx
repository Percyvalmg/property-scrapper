import React, {lazy, Suspense, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {analytics} from "./firebase";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
    useEffect(() => {
        analytics.setAnalyticsCollectionEnabled(!window.location.origin.includes('localhost'))
    }, [])

    return (
        <>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/forgot-password" component={ForgotPassword}/>
                    </Switch>
                </Suspense>
            </Router>
        </>
    );
}

export default App;
