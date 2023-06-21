import React from "react";
import { useDispatch } from "react-redux";
import { Row } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { useTranslation } from "react-i18next";

const HomeScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
      <Meta />
    </>
  );
};

export default HomeScreen;
