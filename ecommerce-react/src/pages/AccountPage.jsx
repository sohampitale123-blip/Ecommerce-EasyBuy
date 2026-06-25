import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";

const accountPageStyles = `
  .account-page {
    min-height: calc(100vh - 150px);
    background:
      radial-gradient(circle at 12% 12%, rgba(11, 106, 166, 0.16), transparent 30%),
      radial-gradient(circle at 88% 84%, rgba(184, 94, 31, 0.16), transparent 34%),
      linear-gradient(135deg, var(--bg-start), var(--bg-end));
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .account-card {
    background: var(--surface-color);
    border: 1px solid rgba(16, 33, 51, 0.1);
    border-radius: 10px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
    padding: 34px;
    max-width: 540px;
    width: 100%;
    animation: accountSlideUp 0.5s ease-out;
  }

  @keyframes accountSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .account-header {
    text-align: center;
    margin-bottom: 30px;
    border-bottom: 1px solid rgba(16, 33, 51, 0.12);
    padding-bottom: 22px;
  }

  .account-header i {
    font-size: 54px;
    color: var(--button-color);
    margin-bottom: 15px;
    display: block;
    animation: accountBounce 2s infinite;
  }

  @keyframes accountBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .account-header h1 {
    color: var(--dark-color);
    font-size: 28px;
    margin: 0;
    font-weight: 800;
  }

  .account-details {
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-bottom: 30px;
  }

  .detail-item {
    border: 1px solid rgba(16, 33, 51, 0.1);
    border-radius: 10px;
    padding: 18px;
    background: var(--surface-soft);
    transition: all 0.3s ease;
    cursor: default;
  }

  .detail-item:hover {
    background: var(--surface-color);
    border-color: rgba(184, 94, 31, 0.32);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  }

  .detail-item label {
    display: block;
    font-size: 12px;
    font-weight: 800;
    color: var(--button-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  .detail-value,
  .password-value {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #15212b;
    font-weight: 700;
  }

  .detail-value i,
  .password-value i {
    color: var(--primary-color);
    font-size: 18px;
  }

  .password-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .password-value { flex: 1; }

  .toggle-password-btn {
    background: none;
    border: none;
    color: var(--button-color);
    font-size: 18px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toggle-password-btn:hover {
    background: rgba(184, 94, 31, 0.12);
    color: var(--button-hover);
    transform: scale(1.1);
  }

  .toggle-password-btn:active { transform: scale(0.95); }

  .account-info {
    background: rgba(139, 183, 214, 0.55);
    border: 1px solid rgba(11, 106, 166, 0.18);
    border-left: 4px solid var(--primary-color);
    border-radius: 10px;
    padding: 15px;
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  .account-info i {
    color: var(--primary-color);
    font-size: 18px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .account-info p {
    margin: 0;
    color: #16354a;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .account-card { padding: 25px; margin: 20px; }
    .account-header h1 { font-size: 24px; }
    .account-header i { font-size: 50px; }
    .detail-item { padding: 15px; }
    .detail-value, .password-value { font-size: 15px; }
  }
`;

function AccountPage() {
  const { user } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <>
      <style>{accountPageStyles}</style>
      <motion.div
        className="account-page py-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      <div className="container">
        <motion.div
          className="account-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="account-header">
            <i className="fas fa-user-circle"></i>
            <h1>My Account</h1>
          </div>

          <div className="account-details">
            {/* Name Section */}
            <motion.div
              className="detail-item"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label>Name</label>
              <div className="detail-value">
                <i className="fas fa-user me-2"></i>
                <span>{user?.name || "N/A"}</span>
              </div>
            </motion.div>

            {/* Email Section */}
            <motion.div
              className="detail-item"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label>Email</label>
              <div className="detail-value">
                <i className="fas fa-envelope me-2"></i>
                <span>{user?.email || "N/A"}</span>
              </div>
            </motion.div>

            {/* Password Section */}
            <motion.div
              className="detail-item"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label>Password</label>
              <div className="password-field">
                <div className="password-value">
                  <i className="fas fa-lock me-2"></i>
                  <span>
                    {showPassword
                      ? localStorage.getItem("easybuy_auth_user")
                        ? JSON.parse(
                            localStorage.getItem("easybuy_auth_user")
                          ).password ||
                          // Fallback: get password from users storage
                          (() => {
                            const users = JSON.parse(
                              localStorage.getItem("easybuy_users") || "[]"
                            );
                            const userObj = users.find(
                              (u) =>
                                u.email ===
                                JSON.parse(
                                  localStorage.getItem("easybuy_auth_user")
                                ).email
                            );
                            return userObj?.password || "N/A";
                          })()
                        : "N/A"
                      : "••••••••"}
                  </span>
                </div>
                <motion.button
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </motion.button>
              </div>
            </motion.div>
          </div>

          <div className="account-info">
            <i className="fas fa-info-circle"></i>
            <p>Your account information is secure and stored locally.</p>
          </div>
        </motion.div>
      </div>
      </motion.div>
    </>
  );
}

export default AccountPage;
