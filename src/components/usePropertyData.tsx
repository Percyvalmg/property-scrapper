import React, {useContext} from "react";
import {PropertyContext} from "./PropertyDataProvider";

export function usePropertyData() {
    const context = useContext(PropertyContext);
    if (!context) {
        throw new Error(`useCount must be used within a CountProvider`)
    }
    return context;
}
