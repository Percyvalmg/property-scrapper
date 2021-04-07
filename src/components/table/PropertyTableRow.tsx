import {PropertyTableImage} from "./PropertyTableImage";
import React from "react";
import {PropertyEntity, SavedPropertyEntity} from "../../services/property/types";
import {Button, ButtonGroup} from "react-bootstrap";
import {deleteProperty, getPropertyCollection, saveProperty} from "../../services/property";
import {useAuth} from "../../services/auth";
import {ResponseCode} from "../../services";

type PropertyTableRowProps = {
    index: number,
    property: PropertyEntity | SavedPropertyEntity,
    propertyData: PropertyEntity[],
    setPropertyData: (data: PropertyEntity[]) => void,
    savedPropertyData: SavedPropertyEntity[],
    setSavedPropertyData: (data: SavedPropertyEntity[]) => void,
}

function isSavedProperty(property: PropertyEntity | SavedPropertyEntity): property is SavedPropertyEntity {
    return (property as SavedPropertyEntity).userId !== undefined;
}

const removeItem = (propertyData: PropertyEntity[], setPropertyData: (propertyData: PropertyEntity[]) => void, index: number) => {
    propertyData.splice(index, 1);
    setPropertyData([...propertyData]);
}
const deleteItem = (propertyData: SavedPropertyEntity[], setPropertyData: (propertyData: SavedPropertyEntity[]) => void, index: number) => {
    propertyData.splice(index, 1);
    setPropertyData([...propertyData]);
}

export const PropertyTableRow: React.FC<PropertyTableRowProps> = (
    {
        index,
        property,
        propertyData,
        setPropertyData,
        savedPropertyData,
        setSavedPropertyData
    }) => {
    const {currentUser} = useAuth();
    return (
        <tr>
            <td className={'p-0'}>
                {!isSavedProperty(property) ?
                    <ButtonGroup vertical>
                        <Button variant="link"
                                className={"m-0"}
                                onClick={() => removeItem(propertyData, setPropertyData, index)}>
                            Remove
                        </Button>
                        <Button variant={'link'} onClick={async () => {
                            const response = await saveProperty(currentUser, property);
                            if (response.code === ResponseCode.SUCCESS) {
                                removeItem(propertyData, setPropertyData, index);
                                getPropertyCollection(currentUser)
                                .then(response => {
                                    if (response.data.length > 0) setSavedPropertyData(response.data)
                                })
                            }
                            alert(response.message);
                        }}>
                            Save Property
                        </Button>
                    </ButtonGroup> :
                    <ButtonGroup vertical>
                        <Button variant="link"
                                className={"m-0"}
                                onClick={async () => {
                                    const response = await deleteProperty(currentUser, property);
                                    if (response.code === ResponseCode.SUCCESS) {
                                        deleteItem(savedPropertyData, setSavedPropertyData, index)
                                        getPropertyCollection(currentUser)
                                        .then(response => {
                                            if (response.data.length > 0) setSavedPropertyData(response.data)
                                        })
                                    }
                                    alert(response.message);
                                }}>
                            Delete
                        </Button>
                    </ButtonGroup>
                }
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
