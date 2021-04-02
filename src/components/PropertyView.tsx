import {Table} from "react-bootstrap";
import React, {useEffect} from "react";
import {PropertyEntity} from "../types";
import {usePropertyData} from "./usePropertyData";
import {PropertyImage} from "./PropertyImage";
import {RemoveItemButton} from "./RemoveItemButton";
import TableScrollbar from 'react-table-scrollbar';

type PropertyViewProps = {}
export const PropertyView = (props: PropertyViewProps) => {
    const {propertyData, setPropertyData} = usePropertyData();

    useEffect(() => {
        console.log('Data', propertyData);
    }, [propertyData.length])

    return (
        <div style={{backgroundColor: '#3d4349'}}>
            <TableScrollbar height={"100vh"}>
                <Table bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th/>
                        <th>Image</th>
                        <th className={'px-5'}>Price</th>
                        <th>location</th>
                        <th>Bedrooms</th>
                        <th>Bathrooms</th>
                        <th>Floor Size</th>
                        <th>Parking</th>
                        <th className={'px-4'}>Levy</th>
                        <th className={'px-4'}>Rates</th>
                    </tr>
                    </thead>
                    <tbody>
                    {propertyData.map((property: PropertyEntity, index) => <tr key={index}>
                        <td className={'p-0'}>
                            <RemoveItemButton propertyData={propertyData} setPropertyData={setPropertyData}
                                              index={index}/>
                        </td>
                        <td className={'p-0'} style={{maxWidth: '100px', maxHeight: '100px'}}>
                            <PropertyImage image={property.image} images={property.images}/>
                        </td>
                        <td>{property.price}</td>
                        <td>{property.location}</td>
                        <td>{property.bedrooms}</td>
                        <td>{property.bathrooms}</td>
                        <td>{property.floorSize}</td>
                        <td>{property.parking}</td>
                        <td>{property.levy}</td>
                        <td>{property.rates}</td>
                    </tr>)}
                    </tbody>
                </Table>
            </TableScrollbar>
        </div>
    )
}
