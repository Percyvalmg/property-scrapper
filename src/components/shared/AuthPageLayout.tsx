import React, {useEffect} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {useAuth} from "../../services/auth";
import {Link, useHistory} from "react-router-dom";
import {Footer, Header} from "./index";
import {analytics} from "../../firebase";
import bgImage from "../../assets/login-bg.jpeg"

type AuthPageLayoutProps = { title: string }
export const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({title, children}) => {
    const history = useHistory();
    const {currentUser} = useAuth();

    useEffect(() => {
        analytics.setCurrentScreen(`${title} Page`)
    }, [])

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
                style={{
                    height: "87vh",
                    background: "url(" + bgImage + ") no-repeat center center fixed",
                    backgroundSize: 'cover',
                    color: "white"
                }} fluid
            >
                <Row className={"justify-content-center"}>
                    <Col sm={4}>
                        <Card border="light" className={'bg-dark text-light'}>
                            {/*<Card.Header as="h1">{title}</Card.Header>*/}
                            <Card.Body>
                                <Card.Title as={'h1'}>{title}</Card.Title>
                                <Card.Text>
                                    {children}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    );
};
