import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // Import QR Code Generator
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
          alert("Session expired! Please try again.");
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
      alert("Please enter all card details!");
      return;
    } else if (paymentMethod === "upi" && !upiId) {
      alert("Please enter a valid UPI ID!");
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
    <div className="payment-container">
      <h1>💳 Payment Page</h1>
      <h2>Total Amount: ₹{totalAmount}</h2>

      <div className="payment-options">
        <button onClick={() => setPaymentMethod("card")}>Pay via Card</button>
        <button onClick={() => setPaymentMethod("upi")}>Pay via UPI</button>
        <button onClick={() => setPaymentMethod("qr")}>Pay via QR Code</button>
      </div>

      {paymentMethod === "card" && (
        <div className="card-form">
          <input type="text" placeholder="Card Number" onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} />
          <input type="text" placeholder="MM/YY" onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
          <input type="text" placeholder="CVV" onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
          <button onClick={handlePayment} disabled={loading}>{loading ? "Processing..." : `Pay ₹${totalAmount}`}</button>
        </div>
      )}

      {paymentMethod === "upi" && (
        <div className="upi-section">
          <input type="text" placeholder="Your UPI ID" onChange={(e) => setUpiId(e.target.value)} />
          <button onClick={handlePayment} disabled={loading}>{loading ? "Processing..." : `Pay ₹${totalAmount}`}</button>
        </div>
      )}

      {paymentMethod === "qr" && (
        <div className="qr-section">
          <QRCodeCanvas value={`upi://pay?pa=yourupi@bank&pn=YourName&am=${totalAmount}&cu=INR`} size={200} />
          <p>Scan this QR Code using any UPI app</p>
        </div>
      )}

      <p>Session expires in: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}</p>
      <button onClick={() => navigate("/cart")}>Cancel</button>
    </div>
  );
}

export default Payment;
