import {Table} from "react-bootstrap";
import React from "react";
import {PropertyEntity} from "../types";
import {SRLWrapper} from "simple-react-lightbox";

type PropertyViewProps = { data: PropertyEntity[] }
export const PropertyView = ({data}: PropertyViewProps) => {
    return (
        <Table style={{minHeight: '81vh'}} className={'my-auto mx-auto'} striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>#</th>
                <th>Image</th>
                <th>Price</th>
                <th>location</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Floor Size</th>
                <th>Parking</th>
                <th>Levy</th>
                <th>Rates</th>
            </tr>
            </thead>
            <tbody>
            {data?.map((property: PropertyEntity, index) => <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <SRLWrapper>
                        <a href={property.image}>
                            <img src={property.image} style={{width: '100px', height: '100px'}} alt={'Property Image'}/>
                        </a>
                        {property.images &&
                        property.images?.map((image, index) => {
                            if (index != 0)
                                return <a href={image} style={{display: 'none'}}>
                                    <img src={image} style={{width: '100px', height: '100px'}} alt={'Property Image'}/>
                                </a>
                        })
                        }
                    </SRLWrapper>
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
    )
}
