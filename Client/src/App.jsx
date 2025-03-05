import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import SignupForm from "./components/SignupForm/SignupForm";
import LoginFormWithNavigate from "./components/LoginForm/LoginFormWithNavigate"; // Import LoginFormWithNavigate
import AdminDashboard from "./components/dashboard/AdminDashboard.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      user: null, // Add state for the user
    };
  }

  setIsLogged = (status) => {
    this.setState({ isLogged: status });
  };

  setUser = (user) => {
    this.setState({ user }); // Update the user state
  };

  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/login"
            element={
              <LoginFormWithNavigate
                setIsLogged={this.setIsLogged} // Pass setIsLogged to the child
                setUser={this.setUser} // Pass setUser to the child
              />
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    );
  }
}

export default App;
