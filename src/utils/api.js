import axios from "axios";

// Set up API base URL (Ensure .env is correctly configured)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://ecommerce-l7q0.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle API errors
const handleApiError = (error) => {
  return error.response?.data?.message || "Something went wrong. Please try again.";
};

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/users/register", userData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/api/users/login", credentials);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export default api;
