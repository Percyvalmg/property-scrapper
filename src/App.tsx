import React, {lazy, Suspense, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {LoginForm, RegistrationForm} from "./components/forms";
import {analytics} from "./firebase";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

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
                        <Route path="/Login" render={() =>
                            <Login>
                                <LoginForm/>
                            </Login>}
                        />
                        <Route path="/Register" render={() =>
                            <Register>
                                <RegistrationForm/>
                            </Register>}
                        />
                    </Switch>
                </Suspense>
            </Router>
        </>
    );
}

export default App;
