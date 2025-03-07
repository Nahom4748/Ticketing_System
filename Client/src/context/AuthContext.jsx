import React, { createContext, Component } from "react";
import getAuth from "../util/userAuthHeader.js";

const AuthContext = createContext();

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
  state = {
    isLogged: false,
    user: null,
    userType: null,
    usrId: null,
  };

  async componentDidMount() {
    await this.checkAuth();
  }

  checkAuth = async () => {
    try {
      const loggedInUser = await getAuth();
      console.log(loggedInUser);
      if (loggedInUser) {
        this.setState({
          isLogged: true,
          user: loggedInUser.user,
          userType: loggedInUser.user.role,
          userEmail: loggedInUser.user.email,
          userId: loggedInUser.user.id,
        });
      } else {
        this.setState({
          isLogged: false,
          user: null,
          userType: null,
          userId: null,
        });
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      this.setState({
        isLogged: false,
        user: null,
        userType: null,
        userId: null,
      });
    }
  };

  login = (user) => {
    localStorage.setItem("authToken", JSON.stringify(user));
    console.log(user.user);
    this.setState({
      isLogged: true,
      user: user.user,
      userType: user.user.role,
      Id: user.user.id,
    });
  };

  logout = () => {
    localStorage.removeItem("authToken");
    this.setState({ isLogged: false, user: null, userType: null, Id: null });
    window.location.href = "/login";
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isLogged: this.state.isLogged,
          user: this.state.user,
          userType: this.state.userType,
          userId: this.state.userId,
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
