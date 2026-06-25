import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

// Checkout form and order summary before confirmation.
function CheckoutPage() {
  const { cart, setOrderNumber, clearCart } = useCartContext();
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.PROD ? "" : "http://localhost:3001";
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const toastTimeoutRef = useRef(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const errors = useMemo(() => {
    const nextErrors = {};
    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName) {
      nextErrors.fullName = "Full name is required.";
    } else if (trimmedName.length < 2 || trimmedName.length > 50) {
      nextErrors.fullName = "Name must be between 2 and 50 characters.";
    } else if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(trimmedName)) {
      nextErrors.fullName = "Name can contain letters, spaces, apostrophes, and hyphens only.";
    }

    if (!trimmedEmail) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone) {
      nextErrors.phone = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.address.trim()) nextErrors.address = "Address is required.";

    if (!formData.city.trim()) {
      nextErrors.city = "City is required.";
    } else if (!/^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/.test(formData.city.trim())) {
      nextErrors.city = "City can contain letters only.";
    }

    if (!INDIAN_STATES.includes(formData.state)) {
      nextErrors.state = "Please select a state.";
    }

    if (!formData.zipCode) {
      nextErrors.zipCode = "PIN code is required.";
    } else if (!/^[1-9]\d{5}$/.test(formData.zipCode)) {
      nextErrors.zipCode = "Enter a valid 6-digit Indian PIN code.";
    }

    if (!formData.country.trim()) {
      nextErrors.country = "Country is required.";
    } else if (!/^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/.test(formData.country.trim())) {
      nextErrors.country = "Country can contain letters only.";
    }

    return nextErrors;
  }, [formData]);

  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([field]) => submitAttempted || touched[field]),
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    const digitLimits = { phone: 10, zipCode: 6 };
    const nextValue = digitLimits[name]
      ? value.replace(/\D/g, "").slice(0, digitLimits[name])
      : value;
    setFormData((current) => ({ ...current, [name]: nextValue }));
  };

  const handleBlur = (event) => {
    setTouched((current) => ({ ...current, [event.target.name]: true }));
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setToast((previous) => ({ ...previous, show: false }));
    }, 2400);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (Object.keys(errors).length > 0) {
      showToast("Please correct the highlighted shipping details.", "danger");
      return;
    }

    if (cart.length === 0) {
      showToast(
        "Your cart is empty. Add items before placing an order.",
        "danger",
      );
      return;
    }

    setIsSubmitting(true);

    const orderNum =
      "ORD" + Math.random().toString(36).substr(2, 9).toUpperCase();

    const orderPayload = {
      shippingDetails: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      cartItems: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      totalPrice: Number(total.toFixed(2)),
      orderStatus: "placed",
      timestamp: new Date().toISOString(),
      orderNumber: orderNum,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      setOrderNumber(orderNum);
      clearCart();
      localStorage.removeItem("easybuy_cart");
      showToast("Order placed successfully!", "success");

      setTimeout(() => {
        navigate("/confirmation");
      }, 900);
    } catch (error) {
      console.error(error);
      showToast(
        "Could not place your order. Please verify the API server is running.",
        "danger",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="checkout-section">
      <div className="container">
        <h2 className="section-title text-center">Checkout</h2>

        <div className="row">
          <div className="col-md-7">
            <div className="form-section">
              <h4 className="mb-4">Shipping Information</h4>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    className={`form-control ${visibleErrors.fullName ? "checkout-input-invalid" : ""}`}
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="name"
                    aria-invalid={Boolean(visibleErrors.fullName)}
                  />
                  {visibleErrors.fullName && <span className="checkout-field-error">{visibleErrors.fullName}</span>}
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${visibleErrors.email ? "checkout-input-invalid" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="email"
                      aria-invalid={Boolean(visibleErrors.email)}
                    />
                    {visibleErrors.email && <span className="checkout-field-error">{visibleErrors.email}</span>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      className={`form-control ${visibleErrors.phone ? "checkout-input-invalid" : ""}`}
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputMode="numeric"
                      maxLength="10"
                      autoComplete="tel"
                      aria-invalid={Boolean(visibleErrors.phone)}
                    />
                    {visibleErrors.phone && <span className="checkout-field-error">{visibleErrors.phone}</span>}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Address *</label>
                  <input
                    type="text"
                    name="address"
                    className={`form-control ${visibleErrors.address ? "checkout-input-invalid" : ""}`}
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="street-address"
                    aria-invalid={Boolean(visibleErrors.address)}
                  />
                  {visibleErrors.address && <span className="checkout-field-error">{visibleErrors.address}</span>}
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      className={`form-control ${visibleErrors.city ? "checkout-input-invalid" : ""}`}
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="address-level2"
                      aria-invalid={Boolean(visibleErrors.city)}
                    />
                    {visibleErrors.city && <span className="checkout-field-error">{visibleErrors.city}</span>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">State *</label>
                    <select
                      name="state"
                      className={`form-select ${visibleErrors.state ? "checkout-input-invalid" : ""}`}
                      value={formData.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="address-level1"
                      aria-invalid={Boolean(visibleErrors.state)}
                    >
                      <option value="">Select state</option>
                      {INDIAN_STATES.map((state) => (
                        <option value={state} key={state}>{state}</option>
                      ))}
                    </select>
                    {visibleErrors.state && <span className="checkout-field-error">{visibleErrors.state}</span>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">PIN Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      className={`form-control ${visibleErrors.zipCode ? "checkout-input-invalid" : ""}`}
                      value={formData.zipCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputMode="numeric"
                      maxLength="6"
                      autoComplete="postal-code"
                      aria-invalid={Boolean(visibleErrors.zipCode)}
                    />
                    {visibleErrors.zipCode && <span className="checkout-field-error">{visibleErrors.zipCode}</span>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Country *</label>
                    <input
                      type="text"
                      name="country"
                      className={`form-control ${visibleErrors.country ? "checkout-input-invalid" : ""}`}
                      value={formData.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="country-name"
                      aria-invalid={Boolean(visibleErrors.country)}
                    />
                    {visibleErrors.country && <span className="checkout-field-error">{visibleErrors.country}</span>}
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mt-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-5">
            <div className="order-summary-box">
              <h4 className="mb-4">Order Summary</h4>
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between mb-3"
                >
                  <div>
                    <h6>{item.name}</h6>
                    <small>Qty: {item.quantity}</small>
                  </div>
                  <strong>₹{(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <strong>₹{total.toFixed(2)}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <strong>Free</strong>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h5>Total:</h5>
                <h5>₹{total.toFixed(2)}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="toast-container position-fixed top-0 end-0 p-3">
        <div
          className={`toast align-items-center text-bg-${toast.variant} border-0 ${toast.show ? "show" : "hide"
            }`}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Close"
              onClick={() =>
                setToast((previous) => ({ ...previous, show: false }))
              }
            ></button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
