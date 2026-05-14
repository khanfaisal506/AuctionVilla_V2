import './Services.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

const services = [
  {
    icon: '🏆',
    title: 'Largest Auction Network',
    desc: 'Access the widest selection of premium assets — from supercars to fine art — all verified and authenticated by our expert team.',
    tag: 'Scale',
  },
  {
    icon: '🔒',
    title: 'Secure Bidding',
    desc: 'Every transaction is protected by bank-grade 256-bit SSL encryption, multi-factor authentication, and real-time fraud detection.',
    tag: 'Security',
  },
  {
    icon: '⚡',
    title: 'Real-Time Auctions',
    desc: 'Millisecond-precision live bidding engine ensures you never miss the winning moment. Bid from any device, anywhere in the world.',
    tag: 'Speed',
  },
  {
    icon: '🤝',
    title: 'Verified Sellers',
    desc: 'Every seller passes rigorous KYC checks and asset authentication. Trade with complete confidence and peace of mind.',
    tag: 'Trust',
  },
  {
    icon: '📊',
    title: 'Price Intelligence',
    desc: 'AI-driven market analytics give you real-time valuations, historical trends, and expert insights before you place a bid.',
    tag: 'Analytics',
  },
  {
    icon: '🌍',
    title: 'Global Reach',
    desc: 'Participate in auctions from 80+ countries. Our multilingual platform and multi-currency support makes global bidding effortless.',
    tag: 'Global',
  },
  {
    icon: '📦',
    title: 'End-to-End Logistics',
    desc: 'We handle white-glove delivery and international shipping for every item won, coordinated with our global logistics partners.',
    tag: 'Delivery',
  },
  {
    icon: '💬',
    title: '24/7 Concierge',
    desc: 'Dedicated auction specialists available around the clock to guide you through every step — from registration to item collection.',
    tag: 'Support',
  },
  {
    icon: '🛡️',
    title: 'Buyer Protection',
    desc: 'Full money-back guarantee on all purchases. If an item is not as described, we resolve it — completely, no questions asked.',
    tag: 'Protection',
  },
];

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } },
      { threshold: 0.1, rootMargin: '-60px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: `opacity 0.65s ${delay}s ease, transform 0.65s ${delay}s ease` }}
    >
      {children}
    </div>
  );
}

function Services() {
  return (
    <div className="svc-page">
      {/* Animated background */}
      <div className="svc-bg">
        <div className="svc-bg__orb svc-bg__orb--1" />
        <div className="svc-bg__orb svc-bg__orb--2" />
        <div className="svc-bg__grid" />
      </div>

      {/* Hero */}
      <section className="svc-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="svc-hero__inner"
        >
          <p className="svc-tag">What We Offer</p>
          <h1 className="svc-hero__title">
            Premium Services for
            <br />
            <span className="svc-hero__title--accent">Serious Bidders</span>
          </h1>
          <p className="svc-hero__sub">
            Everything you need to bid, win, and own — all under one roof.
            Built for collectors, investors, and connoisseurs.
          </p>
          <div className="svc-hero__cta">
            <Link to="/register" className="svc-btn svc-btn--primary">Get Started →</Link>
            <Link to="/login" className="svc-btn svc-btn--ghost">Sign In</Link>
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="svc-section">
        <div className="svc-container">
          <div className="svc-grid">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.05}>
                <motion.div
                  className="svc-card"
                  whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.15)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <div className="svc-card__top">
                    <span className="svc-card__icon">{s.icon}</span>
                    <span className="svc-card__tag">{s.tag}</span>
                  </div>
                  <h3 className="svc-card__title">{s.title}</h3>
                  <p className="svc-card__desc">{s.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="svc-cta-strip">
        <div className="svc-container">
          <FadeIn>
            <div className="svc-cta-box">
              <div className="svc-cta-box__glow" />
              <h2 className="svc-cta-box__title">Ready to Start Bidding?</h2>
              <p className="svc-cta-box__sub">Join 82,000+ bidders who trust AuctionVilla for premium auctions.</p>
              <Link to="/register" className="svc-btn svc-btn--primary">Create Free Account →</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

export default Services;
