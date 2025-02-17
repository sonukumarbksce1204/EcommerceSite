import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

function SignUp() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const API_URL = process.env.REACT_APP_API_URL || "https://ecommerce-l7q0.onrender.com"; // Update with your correct API URL

      const response = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      // Check if response is OK (status code 200-299)
      const data = await response.json();
      console.log("API Response:", data); // Debugging response

      if (!response.ok) {
        alert(data.message || "Signup failed!");
        return;
      }

      alert("Signup successful! Please login.");
      navigate("/signin");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input type="text" name="name" placeholder="Name" required className="signup-input" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required className="signup-input" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required className="signup-input" onChange={handleChange} />
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <a href="/signin" className="auth-link">Already have an account? Sign in</a>
      </div>
    </div>
  );
}

export default SignUp;
