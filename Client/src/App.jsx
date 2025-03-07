import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hero from "./components/Hero/Hero.jsx";
import SignupForm from "./components/SignupForm/SignupForm.jsx";
import LoginFormWithNavigate from "./components/LoginForm/LoginFormWithNavigate.jsx";
import PrivateAuthRoute from "../Auth/PrivateAuthRoute.jsx";
import AuthContext from "./context/AuthContext.jsx";
import UserPage from "./components/UserPage/UserPage.jsx";
import UserNewTickets from "./components/UserPage/UserNewTickets.jsx";
import UserNav from "./components/UserPage/UserNav.jsx";
import Tickets from "./components/UserPage/Tickets.jsx";
import ClosedTickets from "./components/UserPage/ClosedTickets.jsx";
import AdminDashbordMenu from "./components/AdminPages/AdminDashbordMenu.jsx";
import AdminListOfticketsMenu from "./components/AdminPages/AdminListOfticketsMenu.jsx";
import AdminTicketListResolvedMenu from "./components/AdminPages/AdminTicketListResolvedMenu.jsx";
import AdminTicketListClosedMenu from "./components/AdminPages/AdminTicketListClosedMenu.jsx";

class App extends Component {
  static contextType = AuthContext;

  render() {
    const { isLogged, userType } = this.context;

    return (
      <div>
        <UserNav />
        <Routes>
          {/* Redirect root path based on login status */}
          <Route
            path="/"
            element={
              isLogged ? (
                userType === "admin" ? (
                  <Navigate to="/AdminDashbord" replace />
                ) : (
                  <Navigate to="/UserPage" replace />
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
            path="/AdminDashbord"
            element={
              <PrivateAuthRoute requiredUserType="admin">
                <AdminDashbordMenu />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/Closed-TicketList"
            element={
              <PrivateAuthRoute requiredUserType="admin">
                <AdminTicketListClosedMenu />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/Resolve-TicketList"
            element={
              <PrivateAuthRoute requiredUserType="admin">
                <AdminTicketListResolvedMenu />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/Open-Ticket"
            element={
              <PrivateAuthRoute requiredUserType="admin">
                <AdminListOfticketsMenu />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/Open-Ticket"
            element={
              <PrivateAuthRoute requiredUserType="admin">
                <AdminListOfticketsMenu />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/UserPage"
            element={
              <PrivateAuthRoute requiredUserType="user">
                <UserPage />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateAuthRoute requiredUserType="user">
                <ClosedTickets />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/Tickets-list"
            element={
              <PrivateAuthRoute requiredUserType="user">
                <Tickets />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/new-ticket"
            element={
              <PrivateAuthRoute requiredUserType="user">
                <UserNewTickets />
              </PrivateAuthRoute>
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
