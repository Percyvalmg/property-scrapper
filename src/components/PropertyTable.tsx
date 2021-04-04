import {Table} from "react-bootstrap";
import React from "react";
import {PropertyEntity} from "../types";
import {usePropertyData} from "./usePropertyData";
import TableScrollbar from 'react-table-scrollbar';
import {PropertyTableRow} from "./PropertyTableRow";

export const PropertyTable = () => {
    const {propertyData, setPropertyData} = usePropertyData();

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
                    {propertyData.map((property: PropertyEntity, index) =>
                        <PropertyTableRow
                            key={index}
                            property={property}
                            setPropertyData={setPropertyData}
                            propertyData={propertyData}
                            index={index}
                        />)}
                    </tbody>
                </Table>
            </TableScrollbar>
        </div>
    )
}
