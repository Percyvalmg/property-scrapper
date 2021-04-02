import React, {createContext, ReactNode, useEffect, useState} from "react";
import {PropertyCollection, PropertyEntity} from "../types";

const PropertyContext = createContext<PropertyCollection>({
        propertyData: [],
        setPropertyData: () => {
        }
    }
)

function PropertyDataProvider(children: { children?: ReactNode; }) {
    const localStorageData = localStorage.getItem('propertyData');
    const [propertyData, setPropertyData] = useState<PropertyEntity[]>(localStorageData ? JSON.parse(localStorageData) : []);
    useEffect(() => {
        localStorage.setItem('propertyData', JSON.stringify(propertyData));
    }, [propertyData, setPropertyData])
    // const value = useMemo(() => [propertyData, setPropertyData], [propertyData]);
    return <PropertyContext.Provider
        value={{propertyData: propertyData, setPropertyData: setPropertyData}} {...children}/>
}

export {PropertyDataProvider, PropertyContext}
