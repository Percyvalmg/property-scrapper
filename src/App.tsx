import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Footer, Header, PropertyDataProvider, PropertyViewContainer} from "./components";

function App() {
    return (
        <>
            <PropertyDataProvider>
                <Header/>
                <PropertyViewContainer/>
                <Footer/>
            </PropertyDataProvider>
        </>
    );
}

export default App;
