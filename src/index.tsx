import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {AuthProvider} from "./services/auth";
import {analytics} from "./firebase";

function sendToAnalytics({id, name, value}: { id: string; name: string, value: number }) {
    analytics.logEvent('web_vitals', {
        eventCategory: 'Web Vitals',
        eventAction: name,
        eventValue: Math.round(name === 'CLS' ? value * 1000 : value),
        eventLabel: id,
        nonInteraction: true,
    });
}

ReactDOM.render(
    <AuthProvider>
        <App/>
    </AuthProvider>
    , document.getElementById("root"));

reportWebVitals(sendToAnalytics);
