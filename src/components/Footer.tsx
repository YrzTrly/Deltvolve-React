export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            Deltvolve<span>.</span>
          </a>
          <p>
            Transforming ideas into meaningful solutions. We build for growth,
            innovation, and a better future.
          </p>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#whar-we-do">About Us</a>
            </li>
            <li>
              <a href="#projects">Built by Us</a>
            </li>
            <li>
              <a href="#visitor-pathways">Get Involved</a>
            </li>
            <li>
              <a href="#final-cta">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Get in Touch</h3>
          <p>
            Have an idea or project in mind? Let's build something meaningful
            together.
          </p>
          <a href="/contact" className="footer-cta">
            Start a Conversation ↗
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; <span id="year">2026</span> Deltvolve. All rights reserved.
        </p>

        <div className="footer-legal">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>

        <a href="#top" className="back-to-top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
