import {PropertyTable} from "./PropertyTable";
import {PropertyTableEmpty} from "./PropertyTableEmpty";
import {usePropertyData} from "./usePropertyData";
import React from "react";

export const PropertyTableContainer = () => {
    const {propertyData} = usePropertyData()
    return propertyData.length > 0 ? <PropertyTable/> : <PropertyTableEmpty/>;
}
