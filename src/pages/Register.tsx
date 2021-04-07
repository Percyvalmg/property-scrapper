import React, {useEffect} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {Footer, Header} from "../components";
import {useAuth} from "../services/AuthProvider";

type RegisterProps = {}
const Register: React.FC<RegisterProps> = ({children}) => {
    const history = useHistory();

    const {currentUser} = useAuth();

    useEffect(() => {
        if (currentUser) history.push('/');
    }, [currentUser])

    return (
        <>
            <Header>
                <Link className={"btn btn-primary"} to={"/"}>
                    Home
                </Link>
            </Header>
            <Container
                className={"pt-5 text-center"}
                style={{height: "87vh", backgroundColor: "#3d4349", color: "white"}} fluid
            >
                <Row className={"justify-content-center"}>
                    <Col sm={4}>
                        <Card border="primary" className={'bg-dark text-white'}>
                            <Card.Header as="h1">Register</Card.Header>
                            <Card.Body>
                                {children}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    );
};

export default Register;