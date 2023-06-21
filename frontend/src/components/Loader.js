import React from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Loader = () => {
  const { t } = useTranslation();
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "10rem",
        height: "10rem",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only">{t("loader.loading")}</span>
    </Spinner>
  );
};

export default Loader;
