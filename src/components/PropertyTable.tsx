import {Table} from "react-bootstrap";
import React, {ReactNode, ReactNodeArray} from "react";
import TableScrollbar from "react-table-scrollbar";

type PropertyTableProps = {
    childrenArray: ReactNodeArray | false;
    children: ReactNode;
};

export const PropertyTable: React.FC<PropertyTableProps> = ({childrenArray, children,}: PropertyTableProps) => {
    return (
        <div style={{backgroundColor: "#3d4349"}}>
            <TableScrollbar height={"100vh"}>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th/>
                        <th>Image</th>
                        <th className={"px-5"}>Price</th>
                        <th>location</th>
                        <th>Bedrooms</th>
                        <th>Bathrooms</th>
                        <th>Floor Size</th>
                        <th>Parking</th>
                        <th className={"px-4"}>Levy</th>
                        <th className={"px-4"}>Rates</th>
                    </tr>
                    </thead>
                    <tbody>
                    {childrenArray ? (
                        childrenArray.map((child) => child)
                    ) : (
                        <tr>
                            <td colSpan={10} className={"p-0"}>
                                {children}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </TableScrollbar>
        </div>
    );
};
