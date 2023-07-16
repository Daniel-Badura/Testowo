import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { useTranslation } from "react-i18next";

const RegisterScreen = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search
    ? new URLSearchParams(location.search).get("redirect")
    : "/login";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      dispatch(register({ name, lastname, email, password, phone }));
    }
  };
  return (
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant="danger"> {message} </Message>}
      {}
      {error &&
        error.split(",").map((errorMessage) => (
          <Message key={errorMessage} variant="danger">
            {" "}
            {errorMessage.trim().replace("Path ", "")}{" "}
          </Message>
        ))}
      {/* {error && <Message variant='danger'> {error} </Message>} */}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="pt-2">
          <Form.Label>{t("registerScreen.name")}</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="lastname" className="pt-2">
          <Form.Label>{t("registerScreen.lastname")}</Form.Label>
          <Form.Control
            type="text"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="pt-2">
          <Form.Label>{t("registerScreen.emailAddress")}</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="phone" className="pt-2">
          <Form.Label>{t("registerScreen.phoneNumber")}</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Phone #"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="pt-2">
          <Form.Label>{t("registerScreen.password")}</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="pt-2">
          <Form.Label>{t("registerScreen.confirmPassword")}</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="text-center my-2 rounded"
        >
          {t("submit")}
        </Button>
      </Form>
      <Row>
        <Col>
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            {t("registerScreen.haveAccount")}{" "}
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
