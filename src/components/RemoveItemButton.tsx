import {Button} from "react-bootstrap";
import React from "react";
import {PropertyCollection} from "../types";

export function RemoveItemButton({propertyData, setPropertyData, index,}: PropertyCollection & { index: number }) {
    return (
        <Button
            variant="link"
            className={"m-0"}
            onClick={() => {
                propertyData.splice(index, 1);
                setPropertyData([...propertyData]);
            }}
        >
            remove
        </Button>
    );
}
