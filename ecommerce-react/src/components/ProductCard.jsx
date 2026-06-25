import { motion } from "framer-motion";

/**
 * ProductCard Component - Enhanced with Animations
 * Displays product with smooth hover effects and Framer Motion animations
 * Supports view and add-to-cart actions with responsive design
 */
function ProductCard({
  product,
  onView,
  onAddToCart,
  showAddToCart = true,
  cardClassName = "card product-card",
  colClassName = "col-md-4 col-sm-6 mb-4",
  index = 0,
}) {
  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3 },
    },
  };

  // Image hover animation
  const imageVariants = {
    normal: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.4 } },
  };

  // Button animation
  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className={colClassName}>
      <motion.div
        className={cardClassName}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: false }}
      >
        {/* Product Image with zoom effect */}
        <motion.div
          className="product-card-image"
          style={{ overflow: "hidden" }}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            variants={imageVariants}
            initial="normal"
            whileHover="hover"
          />
          {/* Sale badge if applicable */}
          {product.discount && (
            <motion.div
              className="product-badge"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              -{product.discount}%
            </motion.div>
          )}
        </motion.div>

        {/* Product Details */}
        <div className="product-card-body">
          <h5 className="product-title">{product.name}</h5>

          {/* Rating */}
          <div className="product-rating mb-2">
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={`fas fa-star ${
                  index < Math.floor(product.rating) ? "" : "text-muted"
                }`}
              ></i>
            ))}
            <span className="ms-2">({product.rating.toFixed(1)})</span>
          </div>

          {/* Price */}
          <p className="product-price">₹{product.price}</p>

          {/* Action Buttons */}
          {showAddToCart ? (
            <div className="product-actions">
              <motion.button
                className="btn btn-ghost"
                onClick={onView}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <i className="fas fa-eye me-2"></i>View
              </motion.button>
              <motion.button
                className="btn btn-primary"
                onClick={onAddToCart}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <i className="fas fa-shopping-cart me-2"></i>Add
              </motion.button>
            </div>
          ) : (
            <motion.button
              className="btn btn-primary w-100"
              onClick={onView}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <i className="fas fa-arrow-right me-2"></i>View Details
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ProductCard;
