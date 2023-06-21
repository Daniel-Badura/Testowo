import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { verifyEmail } from "../actions/userActions";
import { useTranslation } from "react-i18next";

const VerificationScreen = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verificationCode, setPassword] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;
  const redirect = location.search
    ? new URLSearchParams(location.search).get("redirect")
    : "/profile";
  const userVerifyEmail = useSelector((state) => state.userVerifyEmail);

  useEffect(() => {
    if (!userInfo) {
      navigate(redirect);
    } else if (userInfo.isVerified) {
      navigate(redirect);
    }
    userVerifyEmail.error = null;
  }, [navigate, userInfo, redirect, userVerifyEmail]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(verifyEmail({ verificationCode }));
  };
  return (
    <FormContainer>
      <h1 className="text-centered">{t("verificationScreen.verify")}</h1>
      <Message>
        {t("verificationScreen.enterCode")}
        {userInfo.email}
      </Message>
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="text-centered">
        <Form.Group controlId="verification" className="py-2 ">
          <Form.Control
            type="text"
            placeholder="Email Verification Code"
            value={verificationCode}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="text-center">
          {t("verificationScreen.submit")}
        </Button>
      </Form>
      <div className="py-1"></div>
      {userVerifyEmail.error && (
        <Message variant="danger"> {userVerifyEmail.error} </Message>
      )}
    </FormContainer>
  );
};

export default VerificationScreen;
