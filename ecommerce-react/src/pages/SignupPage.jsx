import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";

/**
 * SignupPage - Enhanced with Modern Animations
 * Features: smooth card entrance, animated form fields, progressive validation
 * Professional account creation experience with smooth transitions
 */
function SignupPage() {
  const { signup } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const errors = useMemo(() => {
    const nextErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName) {
      nextErrors.name = "Name is required.";
    } else if (trimmedName.length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    } else if (trimmedName.length > 50) {
      nextErrors.name = "Name must be 50 characters or fewer.";
    } else if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(trimmedName)) {
      nextErrors.name =
        "Name can only contain letters, spaces, apostrophes, and hyphens.";
    }

    if (!trimmedEmail) {
      nextErrors.email = "Email is required.";
    } else if (
      trimmedEmail.length > 254 ||
      !/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(
        trimmedEmail,
      )
    ) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (formData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    } else if (!/[a-zA-Z]/.test(formData.password)) {
      nextErrors.password = "Password must contain at least 1 letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      nextErrors.password = "Password must contain at least 1 numeric value.";
    } else if (
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(formData.password)
    ) {
      nextErrors.password =
        "Password must contain at least 1 symbol (!@#$%^&* etc).";
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  }, [formData]);

  const isFormValid = Object.keys(errors).length === 0;
  const completedFields = Object.values(formData).filter((value) => value.trim()).length;
  const completion = (completedFields / Object.keys(formData).length) * 100;

  // Keep required fields invalid without showing warnings before the user types.
  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([field]) => formData[field].length > 0),
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid || loading) {
      return;
    }

    setStatus({ type: "", message: "" });
    setLoading(true);

    try {
      // Small delay makes loading state visible for better UX.
      await new Promise((resolve) => setTimeout(resolve, 600));
      await signup(formData.name, formData.email, formData.password);
      setStatus({ type: "success", message: "Account created successfully." });
      navigate("/login", {
        replace: true,
        state: {
          email: formData.email,
          message: "Account created. Please log in with your password.",
        },
      });
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
          className="auth-card auth-dynamic-card auth-signup-card"
          variants={cardVariants}
        >
          <motion.aside
            className="auth-visual-panel auth-signup-visual"
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <motion.div
              className="auth-visual-icon"
              animate={{ y: [0, -10, 0], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <i className="fas fa-gift"></i>
            </motion.div>
            <span className="auth-eyebrow">Join Easy Buy</span>
            <h1>Good things start with one quick signup.</h1>
            <p>Create your account and make every shopping trip simpler.</p>
            <div className="auth-benefit-list">
              <span><i className="fas fa-heart"></i> Save favorites</span>
              <span><i className="fas fa-percent"></i> Member pricing</span>
              <span><i className="fas fa-shield-alt"></i> Secure shopping</span>
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
            <h2>Create your Easy Buy account</h2>
            <p>Four quick details and you are ready to shop.</p>
            <div className="auth-progress" aria-label={`${completion}% complete`}>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
            <small>{completedFields} of 4 fields completed</small>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            variants={containerVariants}
          >
                {/* Name Field */}
                <motion.div
                  className="mb-3"
                  custom={1}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="form-label">Full Name</label>
                  <motion.input
                    type="text"
                    name="name"
                    className={`form-control ${visibleErrors.name ? "is-invalid" : ""}`}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    whileFocus={{ scale: 1.02, borderColor: "var(--primary)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                  {visibleErrors.name && (
                    <motion.div
                      className="form-error show"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <i className="fas fa-exclamation-circle me-2"></i>
                      {visibleErrors.name}
                    </motion.div>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                  className="mb-3"
                  custom={2}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="form-label">Email Address</label>
                  <motion.input
                    type="email"
                    name="email"
                    className={`form-control ${visibleErrors.email ? "is-invalid" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    whileFocus={{ scale: 1.02, borderColor: "var(--primary)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                  {visibleErrors.email && (
                    <motion.div
                      className="form-error show"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <i className="fas fa-exclamation-circle me-2"></i>
                      {visibleErrors.email}
                    </motion.div>
                  )}
                </motion.div>

                {/* Password Field */}
                <motion.div
                  className="mb-3"
                  custom={3}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="form-label">Password</label>
                  <motion.input
                    type="password"
                    name="password"
                    className={`form-control ${visibleErrors.password ? "is-invalid" : ""}`}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    whileFocus={{ scale: 1.02, borderColor: "var(--primary)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                  {visibleErrors.password && (
                    <motion.div
                      className="form-error show"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <i className="fas fa-exclamation-circle me-2"></i>
                      {visibleErrors.password}
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

                {/* Confirm Password Field */}
                <motion.div
                  className="mb-3"
                  custom={4}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="form-label">Confirm Password</label>
                  <motion.input
                    type="password"
                    name="confirmPassword"
                    className={`form-control ${
                      visibleErrors.confirmPassword ? "is-invalid" : ""
                    }`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Retype password"
                    whileFocus={{ scale: 1.02, borderColor: "var(--primary)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                  {visibleErrors.confirmPassword && (
                    <motion.div
                      className="form-error show"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <i className="fas fa-exclamation-circle me-2"></i>
                      {visibleErrors.confirmPassword}
                    </motion.div>
                  )}
                  {!visibleErrors.confirmPassword &&
                    formData.confirmPassword &&
                    !errors.password && (
                      <motion.div
                        className="password-helper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          color: "var(--success)",
                          borderLeftColor: "var(--success)",
                        }}
                      >
                        <i className="fas fa-check-circle me-2"></i>
                        Passwords match!
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

                {/* Submit Button */}
                <motion.div
                  className="auth-action-row"
                  custom={5}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.button
                    type="submit"
                    className="btn btn-primary auth-primary-btn"
                    disabled={!isFormValid || loading}
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
                        Creating account...
                      </motion.span>
                    ) : (
                      <span>
                        <i className="fas fa-user-plus me-2"></i>
                        Sign Up
                      </span>
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
          <motion.p
            className="auth-switch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
          >
            Already have an account? <Link to="/login">Log in</Link>
          </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default SignupPage;
