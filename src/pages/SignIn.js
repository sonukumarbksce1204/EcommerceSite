import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // Ensure the correct API import
import "../styles/signin.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages

    try {
      // Correct API call to your backend login route
      const { data } = await api.post("/api/users/login", { email, password });

      // Store JWT token & user details in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");
      navigate("/home"); // Redirect to the home page after successful login
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignIn}>
          <input 
            type="email" 
            placeholder="Email" 
            required 
            className="signin-input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            className="signin-input" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="signin-btn">Sign In</button>
        </form>
        <a href="/signup" className="auth-link">Don't have an account? Sign up</a>
      </div>
    </div>
  );
}

export default SignIn;
