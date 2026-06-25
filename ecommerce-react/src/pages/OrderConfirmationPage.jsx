import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

// Confirmation page shown after a successful checkout.
function OrderConfirmationPage() {
  const { orderNumber } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (import.meta.env.DEV === false) {
      return;
    }

    const checkBlockingElement = (selector, label) => {
      const target = document.querySelector(selector);

      if (!target) {
        return;
      }

      const rect = target.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const topElement = document.elementFromPoint(x, y);

      if (topElement && topElement !== target && !target.contains(topElement)) {
        // Helps identify overlays or high z-index blockers during debugging.
        console.warn(`[click-debug] ${label} blocked by`, topElement);
      }
    };

    requestAnimationFrame(() => {
      checkBlockingElement(".order-details-box .btn", "Continue Shopping");
      checkBlockingElement(".navbar .nav-link", "Navbar link");
    });
  }, []);

  return (
    <section className="confirmation-section">
      <div className="container">
        <div className="confirmation-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2 className="section-title text-center">Order Confirmed!</h2>
        <p className="text-center">Thank you for your purchase</p>

        <div className="order-details-box">
          <h4 className="text-center mb-4">Order Details</h4>
          <div className="d-flex justify-content-between mb-3">
            <strong>Order Number:</strong>
            <span>{orderNumber}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <strong>Status:</strong>
            <span className="badge bg-success">Processing</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <strong>Date:</strong>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <hr />
          <p className="text-center text-muted mb-4">
            A confirmation email has been sent to your email address.
          </p>
          <button
            className="btn btn-primary w-100"
            type="button"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
}

export default OrderConfirmationPage;
