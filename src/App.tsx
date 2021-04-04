import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Footer, Header} from "./components";
import {PropertyTable} from "./components/PropertyTable";
import {PropertyTableEmpty} from "./components/PropertyTableEmpty";
import {PropertyEntity} from "./types";
import {PropertyTableRow} from "./components/PropertyTableRow";

function App() {
    const localStorageData = localStorage.getItem('propertyData');
    const [propertyCollection, setPropertyCollection] =
        useState<PropertyEntity[]>(localStorageData ? JSON.parse(localStorageData) : []);
    useEffect(() => {
        localStorage.setItem('propertyData', JSON.stringify(propertyCollection));
    }, [propertyCollection, setPropertyCollection])

    return (
        <>
            <Header propertyCollection={propertyCollection} setPropertyCollection={setPropertyCollection}/>
            <PropertyTable childrenArray={(propertyCollection.length > 0) &&
            propertyCollection.map((property: PropertyEntity, index) =>
                <PropertyTableRow
                    key={index}
                    property={property}
                    setPropertyData={setPropertyCollection}
                    propertyData={propertyCollection}
                    index={index}
                />)} children={<PropertyTableEmpty/>}/>
            <Footer/>

        </>
    );
}

export default App;
