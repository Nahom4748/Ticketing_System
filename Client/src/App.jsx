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
import AdminListOfticketsMenu from "./components/AdminPages/AdminListOfticketsMenu";
import AdminTicketListResolved from "./components/Admin/AdminTicketListResolved";
import AdminTicketListResolvedMenu from "./components/AdminPages/AdminTicketListResolvedMenu";
import AdminTicketListClosed from "./components/Admin/AdminTicketListClosed";
import AdminTicketListClosedMenu from "./components/AdminPages/AdminTicketListClosedMenu";

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
