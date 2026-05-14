import './Contact.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setVisible(!token);
  }, []);

  return (
    <footer className="av-footer">
      {visible && (
        <div className="av-footer__top">
          <div className="av-footer__container">
            <div className="av-footer__brand">
              <p className="av-footer__logo">Auction<span>Villa</span></p>
              <p className="av-footer__tagline">
                The world's most exclusive online auction platform. Transparent, secure, and cinematic.
              </p>
              <div className="av-footer__socials">
                <a href="#" className="av-footer__social" aria-label="Twitter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="av-footer__social" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="#" className="av-footer__social" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>

            <div className="av-footer__col">
              <p className="av-footer__col-title">Platform</p>
              <Link to="/home" className="av-footer__link">Home</Link>
              <Link to="/service" className="av-footer__link">Services</Link>
              <Link to="/brand" className="av-footer__link">Brands</Link>
              <Link to="/register" className="av-footer__link">Register</Link>
              <Link to="/login" className="av-footer__link">Login</Link>
            </div>

            <div className="av-footer__col">
              <p className="av-footer__col-title">Top Brands</p>
              <a href="#" className="av-footer__link">BMW</a>
              <a href="#" className="av-footer__link">Rolls-Royce</a>
              <a href="#" className="av-footer__link">Lamborghini</a>
              <a href="#" className="av-footer__link">Ferrari</a>
              <a href="#" className="av-footer__link">Porsche</a>
              <a href="#" className="av-footer__link">Aston Martin</a>
            </div>

            <div className="av-footer__col">
              <p className="av-footer__col-title">Newsletter</p>
              <p className="av-footer__newsletter-desc">
                Get notified about premium auctions before they go live.
              </p>
              <div className="av-footer__newsletter">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="av-footer__input"
                />
                <button className="av-footer__subscribe">→</button>
              </div>
              <p className="av-footer__contact-item">support@auctionvilla.in</p>
              <p className="av-footer__contact-item">+91 70006 38952</p>
            </div>
          </div>
        </div>
      )}

      <div className="av-footer__bottom">
        <div className="av-footer__container av-footer__bottom-inner">
          <p className="av-footer__copy">
            © {new Date().getFullYear()} AuctionVilla. All rights reserved.
          </p>
          <div className="av-footer__legal">
            <a href="#" className="av-footer__legal-link">Privacy Policy</a>
            <a href="#" className="av-footer__legal-link">Terms of Service</a>
            <a href="#" className="av-footer__legal-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Contact;
