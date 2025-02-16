import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Cart.css";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  const adjustQuantity = (id, type) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: type === "increase" ? (item.quantity || 1) + 1 : Math.max(item.quantity - 1, 1) }
        : item
    );
    updateCart(updatedCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    localStorage.setItem("totalAmount", totalPrice);
    navigate("/payment");
  };

  return (
    <div className="cart-container">
      <Navbar />
      <h1>🛒 Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-grid">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => adjustQuantity(item.id, "decrease")}><FaMinus /></button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => adjustQuantity(item.id, "increase")}><FaPlus /></button>
                </div>
                <button onClick={() => removeFromCart(item.id)}><FaTrash /> Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h2>Total: ₹{totalPrice}</h2>
          <button onClick={handleCheckout}>Proceed to Payment</button>
        </div>
      )}
      <button onClick={() => navigate("/home")}>🏠 Back to Home</button>
    </div>
  );
}

export default Cart;
