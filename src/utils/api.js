import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/users", // ✅ Corrected base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/register", userData); // ✅ Corrected route
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed!";
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/login", credentials); // ✅ Corrected route
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed!";
  }
};

export default api;
