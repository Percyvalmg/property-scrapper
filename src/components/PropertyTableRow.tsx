import {RemoveItemButton} from "./RemoveItemButton";
import {PropertyTableImage} from "./PropertyTableImage";
import React from "react";
import {PropertyEntity} from "../types";

type PropertyTableRowProps = {
    index: number,
    property: PropertyEntity,
    propertyData: PropertyEntity[],
    setPropertyData: (data: PropertyEntity[]) => void
}
export const PropertyTableRow = ({index, property, propertyData, setPropertyData}: PropertyTableRowProps) => {
    return (
        <tr>
            <td className={'p-0'}>
                <RemoveItemButton propertyData={propertyData} setPropertyData={setPropertyData}
                                  index={index}/>
            </td>
            <td className={'p-0'} style={{maxWidth: '100px', maxHeight: '100px'}}>
                <PropertyTableImage property={property}/>
            </td>
            <td>{property.price}</td>
            <td>{property.location}</td>
            <td>{property.bedrooms}</td>
            <td>{property.bathrooms}</td>
            <td>{property.floorSize}</td>
            <td>{property.parking}</td>
            <td>{property.levy}</td>
            <td>{property.rates}</td>
        </tr>
    )
}
