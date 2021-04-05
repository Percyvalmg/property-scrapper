import {Button, Col, Container, FormControl, InputGroup, Row,} from "react-bootstrap";
import React from "react";
import {Link} from "./Link";
import {CopyToClipboard} from "react-copy-to-clipboard";

export const PropertyTableEmpty = () => {
    return (
        <Container fluid>
            <Row
                className={"align-items-center text-center"}
                style={{height: "81vh", color: "white", backgroundColor: "#3d4349"}}
            >
                <Col>
                    <div className={"my-auto mx-auto"}>
                        <p>
                            Enter a property link from
                            <Link href={"https://www.property24.com/"}> Property 24</Link> or
                            <Link href={"https://www.privateproperty.co.za/"}>
                                {" "}
                                Private Property{" "}
                            </Link>
                            to populate this table
                        </p>
                        <Row className={"justify-content-md-center"}>
                            <Col md={4}>
                                <p className={"mb-2"}>
                                    <strong>Example:</strong>
                                </p>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Recipient's username"
                                        aria-label="Property Url Example"
                                        aria-describedby="basic-addon2"
                                        value={
                                            "https://www.privateproperty.co.za/for-sale/gauteng/centurion/centurion-east/highveld/T3040023"
                                        }
                                        readOnly
                                    />
                                    <InputGroup.Append>
                                        <CopyToClipboard
                                            text={
                                                "https://www.privateproperty.co.za/for-sale/gauteng/centurion/centurion-east/highveld/T3040023"
                                            }
                                        >
                                            <Button>Copy Here</Button>
                                        </CopyToClipboard>
                                    </InputGroup.Append>
                                </InputGroup>
                                <p className={"mt-2"}>
                                    Paste the link you copied in the top right hand corner of this
                                    page where it states,
                                    <strong> "Enter property url"</strong>. <br/>
                                    and then press the <strong>Import</strong> button
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
