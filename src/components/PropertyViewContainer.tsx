import {PropertyView} from "./PropertyView";
import {PropertyViewEmpty} from "./PropertyViewEmpty";
import {usePropertyData} from "./usePropertyData";
import React from "react";

export const PropertyViewContainer = () => {
    const {propertyData, setPropertyData} = usePropertyData()
    return propertyData.length > 0 ? <PropertyView/> : <PropertyViewEmpty/>;
}
