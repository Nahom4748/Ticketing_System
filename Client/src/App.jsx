import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import SignupForm from "./components/SignupForm/SignupForm";
import LoginForm from "./components/LoginForm/LoginForm";

class App extends React.Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    );
  }
}

export default App;
