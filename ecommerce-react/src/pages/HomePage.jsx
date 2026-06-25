import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartContext } from "../context/CartContext";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";

/**
 * HomePage - Enhanced with Modern Animations
 * Features: animated hero section, scroll animations, staggered card animations
 * Professional design with smooth transitions and micro-interactions
 */
function HomePage() {
  const { categoriesData, productsData, setSelectedProduct } = useCartContext();
  const navigate = useNavigate();

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="home-interactive">
      <Carousel />

      {/* Categories Section */}
      <section className="section-container">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title text-center">Shop by Category</h2>
            <p className="section-subtitle text-center">
              Explore our wide range of carefully curated categories
            </p>
          </motion.div>

          <motion.div
            className="row"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {categoriesData.map((category, index) => (
              <motion.div
                key={category.id}
                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                variants={itemVariants}
              >
                <motion.div
                  className="card category-card"
                  onClick={() => navigate("/categories")}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <motion.div
                    className="card-img-top"
                    style={{ overflow: "hidden", height: "250px" }}
                  >
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                  <div className="card-body text-center">
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text text-muted">
                      {category.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="section-container light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title text-center">Latest Products</h2>
            <p className="section-subtitle text-center">
              Check out our newest and most popular additions
            </p>
          </motion.div>

          <motion.div
            className="row"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {productsData.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                className="col-lg-3 col-md-4 col-sm-6"
                variants={itemVariants}
              >
                <ProductCard
                  product={product}
                  index={index}
                  onView={() => {
                    setSelectedProduct(product);
                    navigate("/product");
                  }}
                  onAddToCart={() => {
                    setSelectedProduct(product);
                    navigate("/cart");
                  }}
                  showAddToCart={true}
                  cardClassName="card product-card"
                  colClassName=""
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              className="btn btn-primary btn-large"
              onClick={() => navigate("/products")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Products
              <i className="fas fa-arrow-right ms-2"></i>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-container">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title text-center mb-5">Why Choose Us</h2>
          </motion.div>

          <motion.div
            className="row"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {[
              {
                icon: "fas fa-shipping-fast",
                title: "Free Shipping",
                description: "On orders over ₹50, fast and reliable delivery",
              },
              {
                icon: "fas fa-undo",
                title: "Easy Returns",
                description: "30-day return policy, hassle-free process",
              },
              {
                icon: "fas fa-lock",
                title: "Secure Payment",
                description: "100% secure transactions with encryption",
              },
              {
                icon: "fas fa-headset",
                title: "24/7 Support",
                description: "Dedicated customer support team available",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="col-lg-3 col-md-6 mb-4"
                variants={itemVariants}
              >
                <motion.div
                  className="feature-box"
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <motion.i
                    className={feature.icon}
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  ></motion.i>
                  <h5 className="feature-title">{feature.title}</h5>
                  <p className="feature-description">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
