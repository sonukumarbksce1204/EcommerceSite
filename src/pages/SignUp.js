import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import api from "../utils/api"; // Ensure API is correctly imported
import "../styles/signup.css"; // Ensure the CSS file exists

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading state

    // Basic input validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post("https://ecommerce-l7q0.onrender.com/api/users/register", {
        name,
        email,
        password,
      });

      // ✅ Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Registration successful! Please log in.");
      navigate("/signin"); // Redirect to sign-in page
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="signup-container">
      <div className="glowing-orb orb1"></div>
      <div className="glowing-orb orb2"></div>
      <div className="glowing-orb orb3"></div>
      <div className="glowing-orb orb4"></div>
      <div className="signup-box">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            required
            className="signup-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {/* Link to sign-in page */}
        <Link to="/signin" className="auth-link">Already have an account? Sign In</Link>
      </div>
    </div>
  );
}

export default SignUp;
