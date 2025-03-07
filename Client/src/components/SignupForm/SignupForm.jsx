// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   EnvelopeIcon,
//   LockClosedIcon,
//   UserCircleIcon,
// } from "@heroicons/react/24/outline";
// import createAccService from "../../services/auth.service";

// const SignupForm = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "user",
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//     general: "",
//   });

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const validatePassword = (password) => {
//     const minLength = 8;
//     const hasUpperCase = /[A-Z]/;
//     const hasLowerCase = /[a-z]/;
//     const hasNumbers = /\d/;
//     const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;

//     return (
//       password.length >= minLength &&
//       hasUpperCase.test(password) &&
//       hasLowerCase.test(password) &&
//       hasNumbers.test(password) &&
//       hasSpecial.test(password)
//     );
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let validationErrors = { email: "", password: "", general: "" };

//     if (!validateEmail(formData.email)) {
//       validationErrors.email = "Please enter a valid email address.";
//     }

//     if (!validatePassword(formData.password)) {
//       validationErrors.password =
//         "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
//     }

//     if (validationErrors.email || validationErrors.password) {
//       setErrors(validationErrors);
//       return;
//     }

//     setLoading(true);
//     try {
//       await createAccService.signup(formData);
//       setSuccess(true);
//     } catch (error) {
//       setErrors({
//         ...errors,
//         general: error.message || "Registration failed.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white rounded-2xl shadow-xl py-8 px-10">
//           <div className="text-center mb-8">
//             <UserCircleIcon className="h-12 w-12 text-blue-600 mx-auto" />
//             <h2 className="mt-4 text-center text-3xl font-bold text-gray-900">
//               Create Your Account
//             </h2>
//           </div>

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`pl-10 pr-4 py-3 w-full border ${
//                     errors.email ? "border-red-500" : "border-gray-300"
//                   } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
//                   placeholder="you@example.com"
//                 />
//               </div>
//               {errors.email && (
//                 <p className="mt-2 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <LockClosedIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`pl-10 pr-4 py-3 w-full border ${
//                     errors.password ? "border-red-500" : "border-gray-300"
//                   } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
//                   placeholder="••••••••"
//                 />
//               </div>
//               {errors.password && (
//                 <p className="mt-2 text-sm text-red-600">{errors.password}</p>
//               )}
//             </div>

//             {/* Role Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Account Type
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="user">Standard User</option>
//                 <option value="admin">Administrator</option>
//               </select>
//             </div>

//             {/* Error & Success Messages */}
//             {errors.general && (
//               <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
//                 {errors.general}
//               </div>
//             )}
//             {success && (
//               <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
//                 Registration successful! Please check your email.
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 px-4 border border-transparent rounded-lg font-medium text-white ${
//                 loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all`}
//             >
//               {loading ? "Processing..." : "Create Account"}
//             </button>
//           </form>

//           {/* Redirect to Login */}
//           <div className="mt-8 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
//               >
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSpinner, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";

import {
  EnvelopeIcon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import createAccService from "../../services/auth.service";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = { email: "", password: "", general: "" };

    if (!validateEmail(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!validatePassword(formData.password)) {
      validationErrors.password =
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await createAccService.signup(formData);
      setSuccess(true);
    } catch (error) {
      setErrors({
        ...errors,
        general: error.message || "Registration failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ... keep your existing validation and logic functions ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/10 transform transition-all hover:shadow-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-500/20 rounded-2xl mb-4">
              <FaUser className="w-7 h-7 text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-white/80">Get started with your free account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
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
                <span className="text-sm">{errors.general}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center bg-green-500/20 text-green-300 px-4 py-3 rounded-lg border border-green-500/30">
                <svg
                  className="w-5 h-5 mr-2 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">
                  Registration successful! Please check your email.
                </span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-white/20 pl-12"
                  placeholder="name@company.com"
                  required
                />
                <EnvelopeIcon className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email}</p>
              )}
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
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-white/20 pl-12 pr-12"
                  placeholder="••••••••"
                  required
                />
                <LockClosedIcon className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors"
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
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium   text-white/90 mb-2">
                Account Type
              </label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none transition-all hover:border-white/20 pl-12 pr-4"
                >
                  <option value="user">Standard User</option>
                  <option value="admin">Administrator</option>
                </select>
                <UserCircleIcon className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
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
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-white/80">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
