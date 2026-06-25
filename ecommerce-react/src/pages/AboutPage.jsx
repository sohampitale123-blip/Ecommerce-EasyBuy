import { Link } from "react-router-dom";

const offers = [
  {
    icon: "fa-box-open",
    title: "Curated Products",
    text: "Quality products selected from reliable sellers.",
  },
  {
    icon: "fa-shield-halved",
    title: "Secure Checkout",
    text: "A simple, protected checkout and fast order processing.",
  },
  {
    icon: "fa-truck-fast",
    title: "Easy Tracking",
    text: "Manage your account and follow every order with ease.",
  },
  {
    icon: "fa-headset",
    title: "Helpful Support",
    text: "Responsive assistance whenever you need a hand.",
  },
];

function AboutPage() {
  return (
    <main className="about-page">
      <div className="container about-container">
        <header className="about-title-block">
          <h1 className="section-title text-center">About EasyBuy</h1>
          <p>
            Your trusted ecommerce destination for quality products, honest
            pricing, and a reliable experience from browsing to delivery.
          </p>
        </header>

        <section className="about-overview">
          <div className="about-overview-main">
            <span className="about-kicker">Our story</span>
            <h2>Shopping made simple, reliable, and easy to trust.</h2>
            <p>
              We make online shopping easy, transparent, and enjoyable for every
              customer by focusing on service, convenience, and product quality.
            </p>
            <div className="about-highlights">
              <span><i className="fas fa-check-circle"></i> Quality first</span>
              <span><i className="fas fa-lock"></i> Secure shopping</span>
              <span><i className="fas fa-heart"></i> Customer focused</span>
            </div>
          </div>

          <aside className="about-values-panel">
            <h3>Our values</h3>
            <p>
              We believe in customer-first service, transparent pricing, and
              delivering genuine value with every purchase.
            </p>
            <ul>
              <li><i className="fas fa-circle-check"></i> Honest product details</li>
              <li><i className="fas fa-circle-check"></i> Smooth checkout flow</li>
              <li><i className="fas fa-circle-check"></i> Support after every order</li>
            </ul>
          </aside>
        </section>

        <section className="about-offers">
          <div className="about-section-heading">
            <span>Why EasyBuy</span>
            <h2>Built around everyday shopping needs</h2>
          </div>
          <div className="about-offer-grid">
            {offers.map((offer) => (
              <article className="about-offer-card" key={offer.title}>
                <div className="about-offer-icon">
                  <i className={`fas ${offer.icon}`}></i>
                </div>
                <h3>{offer.title}</h3>
                <p>{offer.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-cta">
          <div>
            <span>We are here to help</span>
            <h2>Have a question about EasyBuy?</h2>
            <p>Our team is ready to help with products, orders, and returns.</p>
          </div>
          <Link className="btn about-cta-button" to="/contact">
            Contact us <i className="fas fa-arrow-right"></i>
          </Link>
        </section>
      </div>
    </main>
  );
}

export default AboutPage;
