import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import ProtectedRoute from "./utils/ProtectedRoute"; // Import ProtectedRoute
import "./styles/styles.css"; // Global styles

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protect Home, Cart, and Payment routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
        </Route>

        {/* Handle unknown routes */}
        <Route path="*" element={<SignIn />} /> {/* Alternatively, use a 404 component */}
      </Routes>
    </Router>
  );
}

export default App;
