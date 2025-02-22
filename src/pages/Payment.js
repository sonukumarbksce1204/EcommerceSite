import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // QR Code Generator
import { motion } from "framer-motion"; // Animations
import "../styles/payment.css";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [timer, setTimer] = useState(150); // 2 min 30 sec
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTotalAmount(Number(localStorage.getItem("totalAmount")) || 0);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          alert("⏳ Session expired! Please try again.");
          navigate("/cart");
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handlePayment = () => {
    if (paymentMethod === "card" && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      alert("⚠ Please enter all card details!");
      return;
    } else if (paymentMethod === "upi" && !upiId) {
      alert("⚠ Please enter a valid UPI ID!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      alert("✅ Payment Successful!");
      localStorage.clear();
      navigate("/");
    }, 2000);
  };

  return (
    <motion.div 
      className="payment-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h1>💳 Secure Payment</h1>
      <h2>Total Amount: ₹{totalAmount}</h2>

      <motion.div 
        className="payment-options"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <button className="payment-btn" onClick={() => setPaymentMethod("card")}>💳 Card</button>
        <button className="payment-btn" onClick={() => setPaymentMethod("upi")}>📱 UPI</button>
        <button className="payment-btn" onClick={() => setPaymentMethod("qr")}>🔳 QR Code</button>
      </motion.div>

      {paymentMethod === "card" && (
        <motion.div className="card-form">
          <div className="input-group">
            <label>💳 </label>
            <input 
              type="text" 
              placeholder="Enter card number"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} 
            />
          </div>

          <div className="input-group">
            <label>📅 </label>
            <input 
              type="text" 
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} 
            />
          </div>

          <div className="input-group">
            <label>🔒</label>
            <input 
              type="text"
              placeholder="CVV" 
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} 
            />
          </div>

          <button className="pay-btn" onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : `Pay ₹${totalAmount}`}
          </button>
        </motion.div>
      )}

      {paymentMethod === "upi" && (
        <motion.div className="upi-section">
          <div className="input-group">
            <label>📲 </label>
            <input 
              type="text" 
              value={upiId}
              placeholder="Enter UPI ID"
              onChange={(e) => setUpiId(e.target.value)} 
            />
          </div>

          <button className="pay-btn" onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : `Pay ₹${totalAmount}`}
          </button>
        </motion.div>
      )}

      {paymentMethod === "qr" && (
        <motion.div className="qr-section">
          <QRCodeCanvas value={`upi://pay?pa=yourupi@bank&pn=YourName&am=${totalAmount}&cu=INR`} size={220} />
          <p>🔍 Scan this QR Code using any UPI app</p>
        </motion.div>
      )}

      <p className="timer-text">⏳ Session expires in: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}</p>
      <button className="cancel-btn" onClick={() => navigate("/cart")}>❌ Cancel</button>
    </motion.div>
  );
}

export default Payment;
