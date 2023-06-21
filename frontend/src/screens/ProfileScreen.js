import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserDetails } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import FormContainer from "../components/FormContainer";
import { useTranslation } from "react-i18next";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
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
    dispatch(
      updateUserDetails({
        id: user._id,
        name,
        lastname,
        email,
        phone,
        password,
      })
    );
  };
  return (
    <FormContainer>
      <h2>Update Profile</h2>
      {message && <Message variant="danger"> {message} </Message>}
      {success && (
        <Message variant="success">Profile successfully updated </Message>
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
        <Form.Group controlId="name" className="pt-2">
          <Form.Label>{t("profileScreen.name")}</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="lastname" className="pt-2">
          <Form.Label>{t("profileScreen.lastname")}</Form.Label>
          <Form.Control
            type="text"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="pt-2">
          <Form.Label>
            {t("profileScreen.emailAddress")}{" "}
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
        <Form.Group controlId="phone" className="pt-2">
          <Form.Label>{t("profileScreen.phoneNumber")}</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Phone #"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="pt-2">
          <Form.Label>{t("profileScreen.password")}</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="success" className="text-center my-2">
          {t("profileScreen.update")}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
