import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Use axios for API requests
import "../styles/signin.css"; // Ensure this CSS file exists

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages

    try {
      // API call to backend login endpoint
      const { data } = await axios.post(
        "https://ecommerce-l7q0.onrender.com/api/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Store JWT token & user details in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");
      navigate("/home"); // Redirect to home page
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
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
        {/* ✅ Corrected SignUp Link */}
        <Link to="/signup" className="auth-link">Don't have an account? Sign up</Link>
      </div>
    </div>
  );
}

export default SignIn;
