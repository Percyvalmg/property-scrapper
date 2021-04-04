import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Footer, Header, PropertyDataProvider, PropertyTableContainer} from "./components";

function App() {
    return (
        <>
            <PropertyDataProvider>
                <Header/>
                <PropertyTableContainer/>
                <Footer/>
            </PropertyDataProvider>
        </>
    );
}

export default App;
