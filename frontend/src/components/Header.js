import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header>
      <Navbar
        bg="white"
        variant=""
        expand="md"
        collapseOnSelect
        className="border"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="text-success">Testwowo</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" variant="success" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
              {/* ADMIN MENU:  */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="ADMIN" id="username">
                  <LinkContainer to="/admin/users/list">
                    <NavDropdown.Item>{t("header.usersList")}</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/tests/list">
                    <NavDropdown.Item>{t("header.tests")}</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  {!userInfo.isVerified && (
                    <LinkContainer to="/profile/verify">
                      <NavDropdown.Item>
                        {t("header.emailVerification")}
                      </NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>{t("header.profile")}</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/profile/settings">
                    <NavDropdown.Item>
                      {t("header.accountSettings")}
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    {t("header.logout")}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user" />
                    {t("header.signIn")}
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
