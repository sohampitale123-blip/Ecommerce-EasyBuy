// Shared footer shown at the bottom of authenticated pages.
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>About EasyBuy</h5>
            <p>
              Your one-stop destination for all your shopping needs. Quality
              products at affordable prices.
            </p>
            <div className="social-links mt-3">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Contact Info</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-map-marker-alt me-2"></i> 42 MG Road,
                Pune, Maharashtra 411001
              </li>
              <li><i className="fas fa-phone me-2"></i> +91 98765 43210</li>
              <li><i className="fas fa-envelope me-2"></i> support@easybuy.in</li>
            </ul>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="text-center py-3">
          <p className="mb-0">&copy; 2026 EasyBuy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
