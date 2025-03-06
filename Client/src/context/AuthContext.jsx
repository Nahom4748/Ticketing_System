import React, { createContext, Component } from "react";
import getAuth from "../util/userAuthHeader";

const AuthContext = createContext();

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
  state = {
    isLogged: false,
    user: null,
    userType: null,
  };

  async componentDidMount() {
    await this.checkAuth();
  }

  checkAuth = async () => {
    try {
      const loggedInUser = await getAuth();
      console.log(loggedInUser);
      if (loggedInUser && loggedInUser?.token) {
        this.setState({
          isLogged: true,
          user: loggedInUser,
          userType: loggedInUser.role,
          userEmail: loggedInUser.email,
        });
      } else {
        this.setState({
          isLogged: false,
          user: null,
          userType: null,
        });
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      this.setState({
        isLogged: false,
        user: null,
        userType: null,
      });
    }
  };

  login = (user) => {
    localStorage.setItem("authToken", JSON.stringify(user));
    this.setState({ isLogged: true, user, userType: user.role });
  };

  logout = () => {
    localStorage.removeItem("authToken");
    this.setState({ isLogged: false, user: null, userType: null });
    window.location.href = "/login";
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isLogged: this.state.isLogged,
          user: this.state.user,
          userType: this.state.userType,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;
