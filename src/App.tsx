import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Footer, Header, PropertyImportForm, PropertyTable, PropertyTableEmpty, PropertyTableRow} from "./components";
import {PropertyEntity} from "./types";

function App() {
    const localStorageData = localStorage.getItem('propertyData');
    const [propertyCollection, setPropertyCollection] =
        useState<PropertyEntity[]>(localStorageData ? JSON.parse(localStorageData) : []);

    useEffect(() => {
        localStorage.setItem('propertyData', JSON.stringify(propertyCollection));
    }, [propertyCollection, setPropertyCollection])

    return (
        <>
            <Header>
                <PropertyImportForm propertyCollection={propertyCollection}
                                    setPropertyCollection={setPropertyCollection}/>
            </Header>
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
