import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../src/context/AuthContext";

const PrivateAuthRoute = ({ children, requiredUserType }) => {
  const { isLogged, userType } = useContext(AuthContext);

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  if (userType !== requiredUserType) {
    // Redirect to the user's dashboard if they don't have the required type
    return (
      <Navigate
        to={userType === "admin" ? "/admin" : "/userdashboard"}
        replace
      />
    );
  }

  return children;
};

export default PrivateAuthRoute;
