import {Col, Container, Row} from "react-bootstrap";
import React from "react";

export const PropertyViewEmpty = () => {
    return (
        <Container fluid>
            <Row className={'align-items-center text-center'} style={{height: '81vh', color: 'grey'}}>
                <Col>
                    <div className={'my-auto mx-auto'}>
                        <p>Enter a Property 24 or Private Property url above to see the good stuff!!</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
