import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center ">
        <Col sm={12} md={10} lg={10} xl={11}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
