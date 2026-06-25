import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";

/**
 * Navbar Component - Enhanced with Modern Animations
 * Features glass/blur effect, smooth hover animations, and responsive design
 */
function Navbar() {
  const { cartCount } = useCartContext();
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const navItemVariants = {
    rest: { color: "inherit" },
    hover: {
      color: "var(--primary)",
      transition: { duration: 0.3 },
    },
  };

  const linkVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  const cartBadgeVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
    },
  };

  return (
    <motion.nav
      className="navbar navbar-expand-lg navbar-light sticky-top"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        {/* Brand Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link className="navbar-brand" to="/">
            <motion.i
              className="fas fa-shopping-cart me-2"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="brand-easy">Easy</span>
            <span className="brand-buy">Buy</span>
          </Link>
        </motion.div>

        {/* Mobile Toggle Button */}
        <motion.button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="navbar-toggler-icon"></span>
        </motion.button>

        {/* Navigation Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <motion.ul className="navbar-nav ms-auto">
            {/* Home Link */}
            <motion.li
              className="nav-item"
              custom={0}
              variants={linkVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div
                variants={navItemVariants}
                initial="rest"
                whileHover="hover"
              >
                <NavLink className="nav-link" to="/" end>
                  Home
                </NavLink>
              </motion.div>
            </motion.li>

            {/* Products Link */}
            <motion.li
              className="nav-item"
              custom={1}
              variants={linkVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div
                variants={navItemVariants}
                initial="rest"
                whileHover="hover"
              >
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </motion.div>
            </motion.li>

            {/* Categories Link */}
            <motion.li
              className="nav-item"
              custom={2}
              variants={linkVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div
                variants={navItemVariants}
                initial="rest"
                whileHover="hover"
              >
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </motion.div>
            </motion.li>

            {/* About Link */}
            <motion.li
              className="nav-item"
              custom={3}
              variants={linkVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div
                variants={navItemVariants}
                initial="rest"
                whileHover="hover"
              >
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </motion.div>
            </motion.li>

            {/* Contact Link */}
            <motion.li
              className="nav-item"
              custom={4}
              variants={linkVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div
                variants={navItemVariants}
                initial="rest"
                whileHover="hover"
              >
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </motion.div>
            </motion.li>

            {/* Search Link */}
            <motion.li
              className="nav-item"
              custom={5}
              variants={linkVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink className="nav-link" to="/search">
                  <i className="fas fa-search"></i>
                </NavLink>
              </motion.div>
            </motion.li>

            {/* Cart Link */}
            <motion.li
              className="nav-item cart-badge"
              custom={6}
              variants={linkVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink className="nav-link" to="/cart">
                  <i className="fas fa-shopping-cart"></i>
                  {cartCount > 0 && (
                    <motion.span
                      className="badge bg-danger"
                      variants={cartBadgeVariants}
                      initial="initial"
                      animate={["animate", cartCount > 0 ? "pulse" : ""]}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </NavLink>
              </motion.div>
            </motion.li>

            {/* Auth Links */}
            {!isAuthenticated ? (
              <motion.li
                className="nav-item"
                custom={7}
                variants={linkVariants}
                initial="initial"
                animate="animate"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </motion.div>
              </motion.li>
            ) : (
              <>
                <motion.li
                  className="nav-item"
                  custom={7}
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                >
                  <motion.div
                    variants={navItemVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <NavLink className="nav-link" to="/account">
                      Account
                    </NavLink>
                  </motion.div>
                </motion.li>
                <motion.li
                  className="nav-item"
                  custom={8}
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                >
                  <motion.button
                    className="btn nav-logout-btn"
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Logout
                  </motion.button>
                </motion.li>
              </>
            )}
          </motion.ul>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
