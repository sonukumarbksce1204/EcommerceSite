import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import HomePage from "./pages/Home";
import Cart from "./pages/Cart";  // ✅ Import Cart Page
import Payment from "./pages/Payment";  // ✅ Import Payment Page
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />  
        <Route path="/payment" element={<Payment />} />  {/* ✅ Add this line */}
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<SignIn />} />
    </Routes>
  );
}

export default App;
