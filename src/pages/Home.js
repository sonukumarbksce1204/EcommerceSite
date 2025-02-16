import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from "react-icons/fa";
import Navbar from "../components/Navbar";
import OfferBanner from "../components/OfferBanner";
import "../styles/Home.css";
import RecentlyAddedProducts from "../components/RecentlyAddedProducts";

const fallbackProducts = [
  { id: 1, name: "iPhone 14", price: 79999, image: "https://m.media-amazon.com/images/I/61bK6PMOC3L._SX679_.jpg" },
  { id: 2, name: "Samsung Galaxy S23", price: 74999, image: "https://www.dxomark.com/wp-content/uploads/medias/post-140900/Samsung-Galaxy-S23_Yoast-image-packshot-review.jpg" },
  { id: 3, name: "MacBook Air M2", price: 99999, image: "https://m.media-amazon.com/images/I/71f5Eu5lJSL._SX679_.jpg" },
  { id: 4, name: "Sony WH-1000XM5", price: 29999, image: "https://www.headphonezone.in/cdn/shop/products/Headphone-Zone-Sony-WH-1000XM5-Black-1.jpg?v=1663741826&width=1160" },
  { id: 5, name: "Nike Air Max", price: 12999, image: "https://www.superkicks.in/cdn/shop/files/1_74f429ef-3dd1-47c1-8595-0b34b838dd7b.jpg?v=1705402288&width=1946" },
  { id: 6, name: "JBL Flip 5", price: 6999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpGzOO2Npbobsv6PEr4MAEGvhNUc49pZ0AsQ&s" },
  { id: 7, name: "PlayStation 5", price: 59999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnIwY2c_pLXybmoSDikwCF6hehjs0xb6UzQ&s" },
  { id: 8, name: "Xbox Series X", price: 52999, image: "https://cms-assets.xboxservices.com/assets/f0/8d/f08dfa50-f2ef-4873-bc8f-bcb6c34e48c0.png?n=642227_Hero-Gallery-0_C2_857x676.png" },
  { id: 9, name: "GoPro Hero 11", price: 49999, image: "https://gppro.in/wp-content/uploads/2024/11/hero-11-3-325x325.jpg" },
  { id: 10, name: "Samsung QLED TV", price: 139999, image: "https://mahajanelectronics.com/cdn/shop/files/81UppzA19ML._SL1500.jpg?v=1738767483" },
  { id: 11, name: "AirPods Pro", price: 26999, image: "https://m.media-amazon.com/images/I/71bhWgQK-cL._SX679_.jpg" },
  { id: 12, name: "Amazon Echo Dot", price: 4499, image: "https://m.media-amazon.com/images/I/61MbLLagiVL._SX679_.jpg" },
];

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const productsPerPage = 6; // Display 6 products per page
  const navigate = useNavigate();

  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId)
        : [...prevWishlist, productId]
    );
  };

  const getProductRating = () => Math.floor(Math.random() * 5) + 1;

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/products", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.length > 0 ? data : fallbackProducts);
      })
      .catch(() => setProducts(fallbackProducts));
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="home-container">
      <Navbar />
      <motion.h1 initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        Explore Our Products
      </motion.h1>

      <div className="search-cart-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button onClick={() => navigate("/cart")} className="cart-btn">🛒 View Cart</button>
      </div>

      <div className="banner-and-recent">
        <div className="offer-banner">
          <OfferBanner />
        </div>
        <div className="recently-added-products">
          <RecentlyAddedProducts />
        </div>
      </div>

      <div className="product-grid">
        {currentProducts.map((product) => (
          <motion.div
            key={product.id}
            className="product-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>₹{product.price.toLocaleString()}</p>
            <div className="product-rating">
              {[...Array(5)].map((_, index) => (
                index < getProductRating() ? <FaStar key={index} color="gold" /> : <FaRegStar key={index} color="gray" />
              ))}
            </div>
            <div className="product-actions">
              <motion.button className="btn add-to-cart" onClick={() => addToCart(product)} whileTap={{ scale: 0.95 }}>
                Add to Cart
              </motion.button>
              <button className="wishlist-btn" onClick={() => toggleWishlist(product.id)}>
                {wishlist.includes(product.id) ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>

      <footer className="footer">
        <p>© 2025 Sonu Kumar. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
