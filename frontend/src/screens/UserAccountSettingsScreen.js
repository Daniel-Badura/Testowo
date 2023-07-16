import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserDetails } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import FormContainer from "../components/FormContainer";
import { useTranslation } from "react-i18next";

const UserAccountSettingsScreen = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  let { success, error } = userUpdateProfile;

  const redirect = location.search
    ? new URLSearchParams(location.search).get("redirect")
    : "/login";

  useEffect(() => {
    if (!userInfo) {
      navigate(redirect);
    } else {
      if (!user || !user.name) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setLastname(user.lastname);
        setPhone(user.phone);
        setEmail(user.email);
      }
    }
  }, [navigate, user, redirect, userInfo, dispatch, success]);
  const submitHandler = (e) => {
    setMessage(null);
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserDetails({
          id: user._id,
          name,
          lastname,
          email,
          phone,
          password,
          newPassword,
        })
      );
    }
  };
  return (
    <FormContainer>
      <h2>{t("userAccountSettingsScreen.accountSettings")}</h2>
      {message && <Message variant="danger"> {message} </Message>}
      {success && (
        <Message variant="success">
          {t("userAccountSettingsScreen.profileUpdated")}
        </Message>
      )}
      {error &&
        error.split(",").map((errorMessage) => (
          <Message key={errorMessage} variant="danger">
            {errorMessage.trim().replace("Path ", "")}
          </Message>
        ))}
      {/* {error && <Message variant='danger'> {error} </Message>} */}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="pt-2">
          <Form.Label>
            {t("userAccountSettingsScreen.emailAddress")}{" "}
            {userInfo.isVerified && (
              <Form.Check
                id="checkboxEmail"
                className="block"
                type="checkbox"
                checked={changeEmail}
                onChange={(e) => setChangeEmail(e.target.checked)}
              ></Form.Check>
            )}
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={userInfo ? (userInfo.isVerified ? "is-valid" : "") : ""}
            disabled={!changeEmail}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="pt-2">
          {changePassword ? (
            <Form.Label>
              {t("userAccountSettingsScreen.oldPassword")}
            </Form.Label>
          ) : (
            <Form.Label>{t("userAccountSettingsScreen.password")}</Form.Label>
          )}
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="changePassword" className="pt-2">
          <Form.Check
            type="checkbox"
            label={t("changePassword")}
            checked={changePassword}
            onChange={(e) => setChangePassword(e.target.checked)}
          ></Form.Check>
        </Form.Group>
        {changePassword && (
          <div>
            <Form.Group controlId="confirmPassword" className="pt-2">
              <Form.Label>
                {" "}
                {t("userAccountSettingsScreen.newPassword")}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmNewPassword" className="pt-2">
              <Form.Label>
                {t("userAccountSettingsScreen.confirmNewPassword")}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </div>
        )}
        <Row>
          <Col>
            <Button
              type="submit"
              variant="success"
              className="text-center my-2 rounded"
            >
              {t("userAccountSettingsScreen.update")}
            </Button>
          </Col>
          <Col className="text-right">
            <Button type="submit" variant="danger" className="my-2 rounded">
              {t("userAccountSettingsScreen.removeAccount")}
            </Button>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default UserAccountSettingsScreen;
