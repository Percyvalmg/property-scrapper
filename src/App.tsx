import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {PropertyEntity} from "./types";
import {Footer, Header, PropertyView, PropertyViewEmpty} from "./components";

function App() {
    const [data, setData] = useState<PropertyEntity[]>([])
    return (
        <>
            <Header data={data} setData={setData}/>
            {(data.length > 0) ? <PropertyView data={data}/> : <PropertyViewEmpty/>}
            <Footer/>
        </>
    );
}

export default App;
