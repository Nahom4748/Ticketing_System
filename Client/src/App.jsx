import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import SignupForm from "./components/SignupForm/SignupForm";
import LoginFormWithNavigate from "./components/LoginForm/LoginFormWithNavigate";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import UserDashboard from "./components/dashboard/UserDashboard";
import PrivateAuthRoute from "../Auth/PrivateAuthRoute";
import AuthContext from "./context/AuthContext";
import SupportMenu from "./components/dashboard/SupportMenu";
import UserPage from "./components/UserPage/UserPage";
import UserNewTickets from "./components/UserPage/UserNewTickets";
import UserNav from "./components/UserPage/UserNav";

class App extends Component {
  static contextType = AuthContext;

  render() {
    const { isLogged, userType } = this.context;

    return (
      <div>
        <UserNav />
        <Routes>
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/UserPage" element={<UserPage />} />
          <Route path="/new-ticket" element={<UserNewTickets />} />
          {/* Redirect root path based on login status */}
          <Route
            path="/"
            element={
              isLogged ? (
                userType === "admin" ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/userdashboard" replace />
                )
              ) : (
                <Hero />
              )
            }
          />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginFormWithNavigate />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <PrivateAuthRoute requiredUserType="admin">
                <AdminDashboard />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/userdashboard"
            element={
              <PrivateAuthRoute requiredUserType="user">
                <UserDashboard />
              </PrivateAuthRoute>
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
