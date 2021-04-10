import {Alert, Navbar} from "react-bootstrap";
import React from "react";
import {useAuth} from "../../services/auth";

type HeaderProps = {};
export const Header: React.FC<HeaderProps> = ({children}) => {
    const {currentUser} = useAuth()
    return (
        <>
            <Navbar expand="sm" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Property Scraper</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className={"justify-content-end"}>
                    {!currentUser ? '' :
                        !currentUser?.emailVerified &&
                        <Alert variant={'danger'} className={'m-0'}>In order for you to save your data, you need to
                            verify
                            your email address. click
                            <a className={'p-0 m-0'} style={{cursor: 'pointer', color: 'blue'}}
                               onClick={async () => {
                                   try {
                                       await currentUser?.sendEmailVerification({url: window.location.origin})
                                       alert(`An email has been sent to ${currentUser?.email} for verification.`);
                                   } catch (e) {
                                       alert(e.message);
                                   }
                               }}> here </a>
                            to verify your email address.
                        </Alert>}
                    {children}
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};
