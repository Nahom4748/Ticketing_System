import axios from "axios";
import API_URL from "../util/baseURL.js";

// Signup function
const signup = async ({ email, password, role }) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, {
      email,
      password,
      role: role || "user",
    });
    return response.data;
  } catch (error) {
    let message = error.response?.data?.message || "Registration failed";
    if (error.response?.status === 409) {
      message = "Email already exists";
    }
    throw new Error(message);
  }
};

// Login function
const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });
    return response.data; // Returning the token or user data from the response
  } catch (error) {
    let message = error.response?.data?.message || "Login failed";
    if (error.response?.status === 401) {
      message = "Invalid email or password";
    }
    throw new Error(message);
  }
};

const createAccService = { signup, login };
export default createAccService;
