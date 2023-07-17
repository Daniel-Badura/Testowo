import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const locales = {
    en: {
      title: "English",
    },
    pl: {
      title: "Polski",
    },
  };
  return (
    <>
      <Row className="text-center">
        <Col className="text-right py-3">Copyright &copy; Testowo</Col>
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
