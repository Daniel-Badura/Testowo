import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./i18n";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import VerificationScreen from "./screens/VerificationScreen";
import UsersListScreen from "./screens/UsersListScreen";
import EditUserScreen from "./screens/EditUserScreen";
import UserAccountSettingsScreen from "./screens/UserAccountSettingsScreen";

function App() {
  const { t } = useTranslation();

  return (
    <Suspense>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/profile/verify" element={<VerificationScreen />} />
            <Route
              path="/profile/settings"
              element={<UserAccountSettingsScreen />}
            />
            <Route path="/admin/users/list" element={<UsersListScreen />} />
            <Route path="/admin/users/:id/edit" element={<EditUserScreen />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
