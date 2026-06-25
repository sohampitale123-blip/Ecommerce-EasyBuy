import { Link } from "react-router-dom";
import useAOS from "../hooks/useAOS";

function LandingPage() {
  useAOS();

  return (
    <section className="landing-page">
      <div className="landing-noise" aria-hidden="true"></div>
      <div className="landing-glow landing-glow-one" aria-hidden="true"></div>
      <div className="landing-glow landing-glow-two" aria-hidden="true"></div>

      <header className="landing-header">
        <Link to="/" className="landing-brand" aria-label="Easy Buy home">
          <span className="landing-brand-mark">EB</span>
          <span>
            Easy <strong>Buy</strong>
          </span>
        </Link>

        <nav className="landing-nav" aria-label="Landing page actions">
          <Link to="/login" className="landing-nav-btn landing-nav-btn-ghost">
            Login
          </Link>
          <Link to="/signup" className="landing-nav-btn landing-nav-btn-primary">
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="landing-main">
        <div className="landing-hero" data-aos="fade-up">
          <p className="landing-kicker">Your everyday shopping companion</p>
          <h1>
            Shop Every
            <span>Product You Love</span>
          </h1>
          <p className="landing-copy">
            Discover curated products, secure checkout, fast delivery, and smart
            deals from a modern shopping experience built for effortless buying.
          </p>

          <div className="landing-actions" data-aos="fade-up" data-aos-delay="100">
            <Link to="/login" className="landing-cta landing-cta-primary">
              Login
            </Link>
            <Link to="/signup" className="landing-cta landing-cta-secondary">
              Sign Up
            </Link>
          </div>
        </div>

        <div className="landing-preview-strip" data-aos="fade-up" data-aos-delay="180">
          <article className="landing-feature-card">
            <span className="landing-feature-icon" aria-hidden="true">
              FD
            </span>
            <h2>Fast Delivery</h2>
            <p>Track orders easily and get your favorite products delivered quickly.</p>
          </article>
          <article className="landing-feature-card">
            <span className="landing-feature-icon" aria-hidden="true">
              EO
            </span>
            <h2>Exclusive Offers</h2>
            <p>Unlock member deals, seasonal discounts, and limited-time savings.</p>
          </article>
          <article className="landing-feature-card">
            <span className="landing-feature-icon" aria-hidden="true">
              BD
            </span>
            <h2>Best Deals</h2>
            <p>Find curated bundles and smart prices across popular categories.</p>
          </article>
          <article className="landing-feature-card">
            <span className="landing-feature-icon" aria-hidden="true">
              CS
            </span>
            <h2>24/7 Support</h2>
            <p>Get help with orders, returns, and checkout whenever you need it.</p>
          </article>
        </div>
      </main>
    </section>
  );
}

export default LandingPage;
