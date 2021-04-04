import {Navbar} from "react-bootstrap";
import React from "react";

type HeaderProps = {};
export const Header: React.FC<HeaderProps> = ({children}) => {
    return (
        <Navbar expand="sm" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Property Scrapper</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse className={'justify-content-end'}>
                {children}
            </Navbar.Collapse>
        </Navbar>
    )
}

