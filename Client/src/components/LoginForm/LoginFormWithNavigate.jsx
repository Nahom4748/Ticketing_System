import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm"; // Make sure the import path is correct

function LoginFormWithNavigate(props) {
  const navigate = useNavigate();

  // Forward the props from LoginFormWithNavigate to LoginForm
  return <LoginForm {...props} navigate={navigate} />;
}

export default LoginFormWithNavigate;
