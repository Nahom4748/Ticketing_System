// SignupForm.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import { signup } from "../../services/auth.service";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
      successMessage: "",
    };
  }

  validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!emailRegex.test(this.state.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!passwordRegex.test(this.state.password)) {
      errors.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, and numbers";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) return;

    this.setState({ loading: true, errors: {}, successMessage: "" });

    try {
      const response = await signup({
        email: this.state.email,
        password: this.state.password,
      });

      this.setState({
        successMessage: "Account created successfully! Redirecting to login...",
        email: "",
        password: "",
      });

      setTimeout(() => {
        this.props.history.push("/login");
      }, 2000);
    } catch (error) {
      this.setState({
        errors: {
          api: error.message || "Registration failed. Please try again.",
        },
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: { ...this.state.errors, [e.target.name]: "" },
    });
  };

  render() {
    const { errors, loading, successMessage } = this.state;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Create Your Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10">
            <form className="space-y-6" onSubmit={this.handleSubmit}>
              {errors.api && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex items-center">
                    <FiAlertCircle className="h-5 w-5 text-red-400" />
                    <p className="ml-3 text-sm text-red-700">{errors.api}</p>
                  </div>
                </div>
              )}

              {successMessage && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex items-center">
                    <FiAlertCircle className="h-5 w-5 text-green-400" />
                    <p className="ml-3 text-sm text-green-700">
                      {successMessage}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={this.state.email}
                    onChange={this.handleChange}
                    disabled={loading}
                  />
                  {errors.email && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FiAlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={this.state.password}
                    onChange={this.handleChange}
                    disabled={loading}
                  />
                  {errors.password && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FiAlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.password ? (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">
                    Password must contain at least:
                    <span className="block">• 8 characters</span>
                    <span className="block">• 1 uppercase letter</span>
                    <span className="block">• 1 lowercase letter</span>
                    <span className="block">• 1 number</span>
                  </p>
                )}
              </div>

              <div className="text-sm text-gray-500 text-center">
                All accounts are created as regular users. Contact support for
                admin privileges.
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupForm;
