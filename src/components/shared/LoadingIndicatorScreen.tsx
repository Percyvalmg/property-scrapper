import {Container, Row, Spinner} from "react-bootstrap";
import React from "react";

export const LoadingIndicatorScreen = () => {
    return (
        <Container className={'bg-dark'} style={{height: '100vh', width: '100%'}} fluid>
            <Row className={'justify-content-center h-100'}>
                <div className="d-flex align-self-center">
                    <Spinner animation="border" variant={'light'} role="status" style={{width: '3rem', height: '3rem'}}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            </Row>
        </Container>
    )
}
