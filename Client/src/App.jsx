import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import SignupForm from "./components/SignupForm/SignupForm";
import LoginFormWithNavigate from "./components/LoginForm/LoginFormWithNavigate";
import UserDashboard from "./components/dashboard/UserDashboard";
import PrivateAuthRoute from "../Auth/PrivateAuthRoute";
import AuthContext from "./context/AuthContext";
import UserPage from "./components/UserPage/UserPage";
import UserNewTickets from "./components/UserPage/UserNewTickets";
import UserNav from "./components/UserPage/UserNav";
import Tickets from "./components/UserPage/Tickets";
import ClosedTickets from "./components/UserPage/ClosedTickets";
import AdminDashbordMenu from "./components/AdminPages/AdminDashbordMenu";

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
          <Route path="/Tickets-list" element={<Tickets />} />
          <Route path="/history" element={<ClosedTickets />} />
          <Route path="/AdminDashboard" element={<AdminDashbordMenu />} />
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
                <AdminDashbordMenu />
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
