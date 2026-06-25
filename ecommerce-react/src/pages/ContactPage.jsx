import { useMemo, useState } from "react";

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Point to local server (server.js) which listens on port 3001
  const baseUrl = `http://${window.location.hostname}:3001`;

  const errors = useMemo(() => {
    const nextErrors = {};
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();

    if (!trimmedName) {
      nextErrors.name = "Name is required.";
    } else if (trimmedName.length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    } else if (trimmedName.length > 50) {
      nextErrors.name = "Name must be 50 characters or fewer.";
    } else if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(trimmedName)) {
      nextErrors.name = "Name can contain letters, spaces, apostrophes, and hyphens only.";
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.phone) {
      nextErrors.phone = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(form.phone)) {
      nextErrors.phone = "Mobile number must contain exactly 10 digits.";
    }

    if (!form.address.trim()) {
      nextErrors.address = "Address is required.";
    }

    return nextErrors;
  }, [form]);

  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([field]) => submitAttempted || touched[field]),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setForm((current) => ({ ...current, [name]: nextValue }));
  };

  const handleBlur = (e) => {
    setTouched((current) => ({ ...current, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (Object.keys(errors).length > 0) {
      setStatus({ type: "error", message: "Please correct the highlighted fields." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim() || null,
        phone: form.phone.trim(),
        address: form.address.trim(),
        message: form.message.trim() || null,
        timestamp: new Date().toISOString(),
      };

      const res = await fetch(`${baseUrl}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit contact");

      setStatus({ type: "success", message: "Thanks! Your message was submitted." });
      setForm({ name: "", email: "", phone: "", address: "", message: "" });
      setTouched({});
      setSubmitAttempted(false);
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      <div className="contact-glow contact-glow-one" aria-hidden="true"></div>
      <div className="contact-glow contact-glow-two" aria-hidden="true"></div>

      <div className="container contact-container">
        <header className="contact-header">
          <span>Let&apos;s connect</span>
          <h1>How can we help?</h1>
          <p>Send us your details and our team will get back to you.</p>
        </header>

        <div className="contact-layout">
          <aside className="contact-details-panel">
            <div className="contact-panel-icon">
              <i className="fas fa-paper-plane"></i>
            </div>
            <span className="contact-panel-label">EasyBuy support</span>
            <h2>We are ready to listen.</h2>
            <p>
              Questions about an order, a product, or your account? Share the
              details and we will point you in the right direction.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <i className="fas fa-headset"></i>
                <div>
                  <strong>Helpful support</strong>
                  <span>Clear answers when you need them</span>
                </div>
              </div>
              <div className="contact-method">
                <i className="fas fa-clock"></i>
                <div>
                  <strong>Quick response</strong>
                  <span>We review every submitted message</span>
                </div>
              </div>
              <div className="contact-method">
                <i className="fas fa-shield-halved"></i>
                <div>
                  <strong>Your details matter</strong>
                  <span>Information is used only to assist you</span>
                </div>
              </div>
            </div>
          </aside>

          <section className="contact-form-panel">
            <div className="contact-form-heading">
              <span>Send a message</span>
              <h2>Tell us what you need</h2>
            </div>

            {status && (
              <div
                className={`contact-status ${status.type === "success" ? "contact-status-success" : "contact-status-error"}`}
                role="alert"
              >
                <i className={`fas ${status.type === "success" ? "fa-circle-check" : "fa-circle-exclamation"}`}></i>
                {status.message}
              </div>
            )}

            <form className="contact-form-grid" onSubmit={handleSubmit} noValidate>
              <div className="contact-field">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${visibleErrors.name ? "contact-input-invalid" : ""}`}
                  placeholder="Full name"
                  autoComplete="name"
                  aria-invalid={Boolean(visibleErrors.name)}
                />
                {visibleErrors.name && (
                  <span className="contact-field-error" role="alert">
                    <i className="fas fa-circle-exclamation"></i> {visibleErrors.name}
                  </span>
                )}
              </div>

              <div className="contact-field">
                <label className="form-label">Email (optional)</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${visibleErrors.email ? "contact-input-invalid" : ""}`}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(visibleErrors.email)}
                />
                {visibleErrors.email && (
                  <span className="contact-field-error" role="alert">
                    <i className="fas fa-circle-exclamation"></i> {visibleErrors.email}
                  </span>
                )}
              </div>

              <div className="contact-field">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${visibleErrors.phone ? "contact-input-invalid" : ""}`}
                  placeholder="10-digit mobile number"
                  inputMode="numeric"
                  maxLength="10"
                  autoComplete="tel"
                  aria-invalid={Boolean(visibleErrors.phone)}
                />
                {visibleErrors.phone && (
                  <span className="contact-field-error" role="alert">
                    <i className="fas fa-circle-exclamation"></i> {visibleErrors.phone}
                  </span>
                )}
              </div>

              <div className="contact-field">
                <label className="form-label">Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${visibleErrors.address ? "contact-input-invalid" : ""}`}
                  placeholder="Your address"
                  autoComplete="street-address"
                  aria-invalid={Boolean(visibleErrors.address)}
                />
                {visibleErrors.address && (
                  <span className="contact-field-error" role="alert">
                    <i className="fas fa-circle-exclamation"></i> {visibleErrors.address}
                  </span>
                )}
              </div>

              <div className="contact-field contact-field-wide">
                <label className="form-label">Message (optional)</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="How can we help?"
                  rows="5"
                />
              </div>

              <button className="btn contact-submit-button" disabled={loading}>
                {loading ? (
                  <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                ) : (
                  <>Send message <i className="fas fa-arrow-right"></i></>
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
