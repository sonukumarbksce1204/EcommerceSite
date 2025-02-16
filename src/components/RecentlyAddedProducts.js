import { useState, useEffect } from "react";
import "../styles/RecentlyAddedProducts.css";

function RecentlyAddedProducts({ cartItems = [] }) {
  const [recentItems, setRecentItems] = useState([]);

  // Use useEffect to set recentItems when cartItems change
  useEffect(() => {
    // Check if there are changes in cartItems
    if (cartItems.length !== recentItems.length) {
      setRecentItems(cartItems.slice(-3)); // Update the recent items
    }
  }, [cartItems, recentItems]); // Re-run effect if cartItems or recentItems change

  return (
    <div className="recently-added-container">
      <h3>Recently Added Products</h3>
      <div className="recent-grid">
        {recentItems.length > 0 ? (
          recentItems.map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))
        ) : (
          <p>No products added recently.</p>
        )}
      </div>
    </div>
  );
}

export default RecentlyAddedProducts;
