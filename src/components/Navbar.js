import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs"; // Import modern icons
import "../styles/Navbar.css";

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav className="navbar">
      <h2>E-Commerce</h2>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/cart">Cart</Link>
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <BsSun size={24} /> : <BsMoon size={24} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
