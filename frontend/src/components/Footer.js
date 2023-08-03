import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import i18n from "../i18n";

const Footer = () => {
  return (
    <>
      <Row className="text-center">
        <Col className="py-3">Copyright &copy; Testowo</Col>
      </Row>
      <Row className="text-center">
        <Col>
          {/* {Object.keys(locales).map((locale) => (
            <Button
              onClick={() => i18n.changeLanguage(locale)}
              variant="success"
              className="rounded btn-success english"
            >
              {locales[locale].title}
            </Button>
          ))} */}
          <Button
            onClick={() => i18n.changeLanguage("en")}
            variant="success"
            className="rounded btn-success english border border-successs"
          >
            {" "}
          </Button>
          <Button
            onClick={() => i18n.changeLanguage("pl")}
            variant="success"
            className="rounded btn-success polish border border-successs"
          >
            {" "}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
