import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import ProtectedRoute from "./utils/ProtectedRoute";  // Import ProtectedRoute to protect certain routes
import "./styles/styles.css";  // Global styles
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
        </Route>

        <Route path="*" element={<SignIn />} />
      </Routes>
     </Router>
  );
}

export default App;
