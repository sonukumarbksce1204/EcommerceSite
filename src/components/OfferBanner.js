import { useState, useEffect } from "react";

const offerImages = [
  "https://img.freepik.com/free-vector/mega-sale-offers-banner-template_1017-31299.jpg",
  "https://t3.ftcdn.net/jpg/05/07/79/68/360_F_507796863_XOctjfN6VIiHa79bFj7GCg92P9TpELIe.jpg",
  "https://img.freepik.com/free-psd/holi-festival-celebration-facebook-template_23-2150110061.jpg?semt=ais_hybrid",
];

const offerLinks = [
  "https://example.com/offer1",
  "https://example.com/offer2",
  "https://example.com/offer3",
];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % offerImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container">
      <a
        href={offerLinks[currentIndex]}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={offerImages[currentIndex]}
          alt={`Offer ${currentIndex + 1}`}
          className="banner-image active"
        />
      </a>
    </div>
  );
}

export default Banner;
