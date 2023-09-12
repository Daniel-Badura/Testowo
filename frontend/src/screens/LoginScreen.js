import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import { useTranslation } from "react-i18next";

const LoginScreen = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search
    ? new URLSearchParams(location.search).get("redirect")
    : "/";
  // const redirect = location.search ? location.search.split('=')[1] : '/login';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <h1>Login</h1>
      {error && <Message variant="danger"> {error} </Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>{t("emailAddress")}</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="py-2">
          <Form.Label>{t("password")}</Form.Label>
          <Form.Control
            className="rounded"
            type="password"
            placeholder={t("enterPassword")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="text-center">
          {t("signIn")}
        </Button>
      </Form>
      <Row className="py-2">
        <Col>
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            {t("register")}
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
