import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroDelivery from "../assets/home-carousel-delivery.png";
import heroProducts from "../assets/home-carousel-products.png";
import heroShopping from "../assets/home-carousel-shopping.png";

const slides = [heroShopping, heroProducts, heroDelivery];

const heroVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.4, ease: "easeOut" },
  },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

function Carousel() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <Motion.section
      className="hero-section"
      initial="initial"
      animate="animate"
      variants={heroVariants}
    >
      <div className="hero-carousel-images" aria-hidden="true">
        {slides.map((slide, index) => (
          <img
            className={`hero-carousel-image ${index === activeSlide ? "is-active" : ""}`}
            src={slide}
            alt=""
            key={slide}
          />
        ))}
      </div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <Motion.h1
          className="hero-title"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          Welcome to EasyBuy
        </Motion.h1>
        <Motion.p
          className="hero-subtitle"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          Your Ultimate Shopping Destination for Quality Products
        </Motion.p>
        <Motion.div
          className="hero-cta"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Motion.button
            className="btn btn-primary btn-large"
            onClick={() => navigate("/products")}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            <i className="fas fa-shopping-bag me-2"></i>
            Shop Now
          </Motion.button>
          <Motion.button
            className="btn btn-ghost btn-large"
            onClick={() => navigate("/products")}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            whileHover="hover"
            whileTap="tap"
          >
            <i className="fas fa-arrow-right me-2"></i>
            Explore Deals
          </Motion.button>
        </Motion.div>
      </div>

      <div className="hero-carousel-controls">
        <div className="hero-carousel-dots" aria-label="Choose a banner">
          {slides.map((slide, index) => (
            <button
              type="button"
              className={index === activeSlide ? "is-active" : ""}
              onClick={() => setActiveSlide(index)}
              aria-label={`Show banner ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
              key={slide}
            ></button>
          ))}
        </div>
      </div>
    </Motion.section>
  );
}

export default Carousel;
