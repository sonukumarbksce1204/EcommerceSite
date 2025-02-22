import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/signin.css"; 

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const { data } = await axios.post(
        "https://ecommerce-l7q0.onrender.com/api/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");
      navigate("/home"); 
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (

    
    <div className="signin-container">
      {/* 🔵 Animated Floating Orbs */}
      <div className="glowing-orb orb1"></div>
      <div className="glowing-orb orb2"></div>
      <div className="glowing-orb orb3"></div>
      <div className="glowing-orb orb4"></div>
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
        <Link to="/signup" className="auth-link">Don't have an account? Sign up</Link>
      </div>
    </div>
  );
}

export default SignIn;
