import axios from "axios";

// Set up baseURL without `/api/users` (we'll add it in each specific API call)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",  // base URL should not have /api/users
  headers: {
    "Content-Type": "application/json",
  },
});

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/users/register", userData); // Adding /api/users/register here
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed!";
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/api/users/login", credentials); // Adding /api/users/login here
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed!";
  }
};

export default api;
