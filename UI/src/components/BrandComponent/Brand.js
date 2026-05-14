import './Brand.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

const luxuryBrands = [
  { name: 'Rolls-Royce', category: 'Luxury Cars', icon: '🚗' },
  { name: 'Lamborghini', category: 'Supercars', icon: '🏎️' },
  { name: 'Ferrari', category: 'Supercars', icon: '🏎️' },
  { name: 'Bentley', category: 'Luxury Cars', icon: '🚗' },
  { name: 'Aston Martin', category: 'Sports Cars', icon: '🚘' },
  { name: 'Porsche', category: 'Sports Cars', icon: '🚘' },
  { name: 'McLaren', category: 'Supercars', icon: '🏎️' },
  { name: 'Bugatti', category: 'Hypercars', icon: '🏁' },
  { name: 'Maserati', category: 'Luxury Cars', icon: '🚗' },
  { name: 'BMW', category: 'Premium Cars', icon: '🚘' },
  { name: 'Mercedes-Benz', category: 'Premium Cars', icon: '🚘' },
  { name: 'Audi', category: 'Premium Cars', icon: '🚘' },
];

const watchBrands = [
  { name: 'Rolex', category: 'Watches', icon: '⌚' },
  { name: 'Patek Philippe', category: 'Watches', icon: '⌚' },
  { name: 'Audemars Piguet', category: 'Watches', icon: '⌚' },
  { name: 'Richard Mille', category: 'Watches', icon: '⌚' },
  { name: 'Vacheron Constantin', category: 'Watches', icon: '⌚' },
  { name: 'Breguet', category: 'Watches', icon: '⌚' },
];

const jewelryBrands = [
  { name: 'Cartier', category: 'Jewellery', icon: '💎' },
  { name: 'Tiffany & Co.', category: 'Jewellery', icon: '💎' },
  { name: 'Bulgari', category: 'Jewellery', icon: '💎' },
  { name: 'Van Cleef & Arpels', category: 'Jewellery', icon: '💎' },
];

const stats = [
  { value: '200+', label: 'Premium Brands' },
  { value: '80+', label: 'Countries' },
  { value: '50K+', label: 'Items Sold' },
  { value: '₹1.2B+', label: 'Total Value' },
];

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } },
      { threshold: 0.1, rootMargin: '-40px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(24px)', transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease` }}>
      {children}
    </div>
  );
}

function BrandGrid({ brands }) {
  return (
    <div className="br-brand-grid">
      {brands.map((b, i) => (
        <FadeIn key={b.name} delay={i * 0.04}>
          <motion.div
            className="br-brand-card"
            whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.2)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <span className="br-brand-icon">{b.icon}</span>
            <p className="br-brand-name">{b.name}</p>
            <p className="br-brand-cat">{b.category}</p>
          </motion.div>
        </FadeIn>
      ))}
    </div>
  );
}

function Brand() {
  return (
    <div className="br-page">
      {/* Background */}
      <div className="br-bg">
        <div className="br-bg__orb br-bg__orb--1" />
        <div className="br-bg__orb br-bg__orb--2" />
        <div className="br-bg__grid" />
      </div>

      {/* Hero */}
      <section className="br-hero">
        <motion.div
          className="br-hero__inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="br-tag">Our Partners</p>
          <h1 className="br-hero__title">
            The World's Most
            <br />
            <span className="br-hero__title--accent">Coveted Brands</span>
          </h1>
          <p className="br-hero__sub">
            AuctionVilla partners exclusively with verified, prestige brands
            across luxury automobiles, fine watches, and rare jewellery.
          </p>
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="br-stats-bar">
        <div className="br-container">
          <div className="br-stats-grid">
            {stats.map((s) => (
              <div className="br-stat" key={s.label}>
                <span className="br-stat__value">{s.value}</span>
                <span className="br-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automobile Brands */}
      <section className="br-section">
        <div className="br-container">
          <FadeIn>
            <div className="br-section__head">
              <span className="br-section__tag">Automobiles</span>
              <h2 className="br-section__title">Luxury & Sports Cars</h2>
            </div>
          </FadeIn>
          <BrandGrid brands={luxuryBrands} />
        </div>
      </section>

      {/* Watch Brands */}
      <section className="br-section br-section--alt">
        <div className="br-container">
          <FadeIn>
            <div className="br-section__head">
              <span className="br-section__tag">Horology</span>
              <h2 className="br-section__title">Prestige Watches</h2>
            </div>
          </FadeIn>
          <BrandGrid brands={watchBrands} />
        </div>
      </section>

      {/* Jewelry Brands */}
      <section className="br-section">
        <div className="br-container">
          <FadeIn>
            <div className="br-section__head">
              <span className="br-section__tag">Fine Jewellery</span>
              <h2 className="br-section__title">Iconic Maisons</h2>
            </div>
          </FadeIn>
          <BrandGrid brands={jewelryBrands} />
        </div>
      </section>

      {/* CTA */}
      <section className="br-cta">
        <div className="br-container">
          <FadeIn>
            <div className="br-cta__box">
              <div className="br-cta__glow" />
              <h2 className="br-cta__title">Bid on Iconic Brands Today</h2>
              <p className="br-cta__sub">Register free and access auctions across all our premium brand partners.</p>
              <div className="br-cta__btns">
                <Link to="/register" className="br-btn br-btn--primary">Create Account →</Link>
                <Link to="/login" className="br-btn br-btn--ghost">Sign In</Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

export default Brand;
