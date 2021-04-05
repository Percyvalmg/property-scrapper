import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap"; /*  */
import firebase from "firebase/app";
import {Link, useHistory} from "react-router-dom";
import {AuthForm, Footer, Header} from "../components";

type RegisterProps = {};
const Register: React.FC<RegisterProps> = () => {
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                history.push("/");
            }
            console.log("Auth Status Changed!", user);
        });

        return unsubscribe();
    }, []);

    return (
        <>
            <Header>
                <Link className={"btn btn-primary"} to={"/"}>
                    Home
                </Link>
            </Header>
            <Container
                className={"pt-5 text-center"}
                style={{height: "87vh", backgroundColor: "#3d4349", color: "white"}}
                fluid
            >
                <h1 className={"mb-5"}>Register</h1>
                <Row className={"justify-content-center"}>
                    <Col md={4}>
                        <AuthForm isLoginForm={false}/>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    );
};

export default Register;
