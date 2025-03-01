import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update with your backend URL

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      ...userData,
      role: "user", // Force user role on frontend
    });
    return response.data;
  } catch (error) {
    let message = error.response?.data?.message || error.message;

    // Handle specific error cases
    if (error.response?.status === 409) {
      message = "Email already exists";
    }

    throw new Error(message);
  }
};
