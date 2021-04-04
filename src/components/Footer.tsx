import {Navbar} from "react-bootstrap";
import React from "react";
import {Link} from "./Link";

export const Footer = () => {
    return (
        <Navbar bg="dark" fixed="bottom">
            <Navbar.Brand style={{color: 'white'}} href="#home">Created by
                <Link href={"https://github.com/Percyvalmg"}> Percyval</Link>
            </Navbar.Brand>
        </Navbar>
    )
}
