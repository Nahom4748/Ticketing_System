import React, { useState, useContext } from "react";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import createAccService from "../../services/auth.service";
import AuthContext from "../../context/AuthContext";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await createAccService.login(formData);
      console.log(response);
      if (response.status === "success") {
        login(response.user); // Call login from AuthContext
        const userToken = response.user;
        console.log(userToken);
        if (userToken) {
          localStorage.setItem("authToken", JSON.stringify(response));
          navigate("/");
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setError(error.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/10 transform transition-all hover:shadow-3xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/80">Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center bg-red-500/20 text-red-300 px-4 py-3 rounded-lg border border-red-500/30">
                <svg
                  className="w-5 h-5 mr-2 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-white/20"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-white/20 pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash
                      className="text-white/70 hover:text-white"
                      size={18}
                    />
                  ) : (
                    <FaEye
                      className="text-white/70 hover:text-white"
                      size={18}
                    />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition-all"
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-white/80">
            <span>Don't have an account? </span>
            <Link
              to="/signup"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
