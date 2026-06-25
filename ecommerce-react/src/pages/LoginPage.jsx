import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";

/**
 * LoginPage - Enhanced with Modern Animations
 * Features: smooth card entrance, animated form fields, button interactions
 * Professional authentication experience
 */
function LoginPage() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }

    if (location.state?.message) {
      setStatus({ type: "success", message: location.state.message });
    }
  }, [location.state]);

  const errors = useMemo(() => {
    const nextErrors = {};

    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.password.trim()) {
      nextErrors.password = "Password is required.";
    }

    return nextErrors;
  }, [formData]);

  const isFormValid = Object.keys(errors).length === 0;
  const showEmailError = formData.email.length > 0 && errors.email;
  const showPasswordError = submitAttempted && errors.password;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (!isFormValid || loading) {
      return;
    }

    setStatus({ type: "", message: "" });
    setLoading(true);

    try {
      // Small delay makes loading state visible for better UX.
      await new Promise((resolve) => setTimeout(resolve, 600));
      await login(formData.email, formData.password);
      setStatus({ type: "success", message: "Login successful." });

      const redirectPath = location.state?.from?.pathname || "/home";
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: loading ? 1 : 1.02 },
    tap: { scale: 0.98 },
  };

  return (
    <motion.section
      className="auth-section auth-experience"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="auth-orb auth-orb-one"
        animate={{ x: [0, 35, 0], y: [0, -25, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="auth-orb auth-orb-two"
        animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container">
        <motion.div
          className="auth-card auth-dynamic-card"
          variants={cardVariants}
        >
          <motion.aside
            className="auth-visual-panel"
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <motion.div
              className="auth-visual-icon"
              animate={{ y: [0, -10, 0], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <i className="fas fa-shopping-bag"></i>
            </motion.div>
            <span className="auth-eyebrow">Welcome back</span>
            <h1>Your next favorite find is waiting.</h1>
            <p>Sign in to continue shopping, track orders, and unlock member-only offers.</p>
            <div className="auth-benefit-list">
              <span><i className="fas fa-bolt"></i> Fast checkout</span>
              <span><i className="fas fa-box"></i> Live order tracking</span>
              <span><i className="fas fa-tag"></i> Exclusive deals</span>
            </div>
          </motion.aside>

          <div className="auth-form-panel">
          <motion.div
            className="auth-form-header"
            custom={0}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <h2>Login to Easy Buy</h2>
            <p>Enter your details to pick up where you left off.</p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            variants={containerVariants}
          >
              {/* Email Field */}
            <motion.div
              className="mb-3"
              custom={1}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="form-label">Email Address</label>
              <motion.input
                type="email"
                name="email"
                className={`form-control ${showEmailError ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                whileFocus={{ scale: 1.02, borderColor: "var(--primary)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              {showEmailError && (
                <motion.div
                  className="form-error show"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {showEmailError}
                </motion.div>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              className="mb-3"
              custom={2}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="form-label">Password</label>
              <motion.input
                type="password"
                name="password"
                className={`form-control ${showPasswordError ? "is-invalid" : ""}`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                whileFocus={{ scale: 1.02, borderColor: "var(--primary)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              {showPasswordError && (
                <motion.div
                  className="form-error show"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {errors.password}
                </motion.div>
              )}
              {!errors.password && formData.password && (
                <motion.div
                  className="password-helper"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <i className="fas fa-info-circle me-2"></i>
                  Password must be at least 6 characters with 1 letter, 1
                  number, and 1 symbol.
                </motion.div>
              )}
            </motion.div>

            {/* Status Messages */}
            {status.message && (
              <motion.div
                className={`auth-message ${
                  status.type === "error" ? "auth-error" : "auth-success"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <i
                  className={`fas ${
                    status.type === "error"
                      ? "fa-circle-xmark"
                      : "fa-circle-check"
                  } me-2`}
                ></i>
                {status.message}
              </motion.div>
            )}

            <motion.div
              className="auth-action-row"
              custom={3}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                type="submit"
                className="btn btn-primary auth-primary-btn"
                disabled={loading}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                {loading ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.i
                      className="fas fa-spinner-third me-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    Logging in...
                  </motion.span>
                ) : (
                  <span>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Login
                  </span>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
          <motion.p
            className="auth-switch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            New to Easy Buy? <Link to="/signup">Create an account</Link>
          </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default LoginPage;
