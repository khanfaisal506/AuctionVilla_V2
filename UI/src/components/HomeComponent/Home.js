import './Home.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';

function FadeIn({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: {
      opacity: 1, y: 0, x: 0,
      transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={controls}>
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const auctionCards = [
  { title: 'Rolls-Royce Phantom', category: 'Luxury Cars', bid: '₹2,40,00,000', time: '2h 14m', badge: 'Live' },
  { title: 'Rolex Daytona 2024', category: 'Watches', bid: '₹18,50,000', time: '5h 32m', badge: 'Hot' },
  { title: 'Vintage Art Collection', category: 'Fine Art', bid: '₹95,00,000', time: '1d 3h', badge: 'New' },
  { title: 'Porsche 911 GT3', category: 'Sports Cars', bid: '₹1,20,00,000', time: '3h 48m', badge: 'Live' },
  { title: 'Diamond Estate Ring', category: 'Jewellery', bid: '₹32,00,000', time: '8h 15m', badge: 'Hot' },
  { title: 'McLaren 720S', category: 'Supercars', bid: '₹2,80,00,000', time: '6h 02m', badge: 'Live' },
];

const categories = [
  { icon: '🚗', name: 'Luxury Cars', count: '240+ items' },
  { icon: '💎', name: 'Jewellery', count: '180+ items' },
  { icon: '⌚', name: 'Watches', count: '120+ items' },
  { icon: '🎨', name: 'Fine Art', count: '95+ items' },
  { icon: '🏠', name: 'Real Estate', count: '60+ items' },
  { icon: '📱', name: 'Electronics', count: '310+ items' },
  { icon: '✈️', name: 'Aviation', count: '18+ items' },
  { icon: '🛥️', name: 'Yachts', count: '25+ items' },
];

const features = [
  {
    icon: '🔒',
    title: 'Bank-Grade Security',
    desc: 'All transactions are secured with 256-bit SSL encryption and multi-factor authentication.',
  },
  {
    icon: '⚡',
    title: 'Real-Time Bidding',
    desc: 'Live auction feeds with millisecond precision. Never miss a winning bid.',
  },
  {
    icon: '🌍',
    title: 'Global Reach',
    desc: 'Access auctions from 80+ countries. Bid from anywhere, anytime.',
  },
  {
    icon: '🤝',
    title: 'Verified Sellers',
    desc: 'Every seller goes through a rigorous KYC and authentication process.',
  },
];

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'Luxury Car Collector',
    text: 'AuctionVilla helped me acquire a Rolls-Royce at 20% below market value. The process was seamless and transparent.',
    avatar: 'AM',
  },
  {
    name: 'Priya Sharma',
    role: 'Art Investor',
    text: 'The platform is stunning and the auction process is incredibly smooth. I won a vintage Husain painting effortlessly.',
    avatar: 'PS',
  },
  {
    name: 'Rohit Kapoor',
    role: 'Watch Enthusiast',
    text: 'Bid on a Patek Philippe at 3 AM and won — the real-time system is flawless. Absolutely premium experience.',
    avatar: 'RK',
  },
  {
    name: 'Neha Joshi',
    role: 'Real Estate Developer',
    text: 'Closed three commercial properties through AuctionVilla. Unmatched trust and professionalism.',
    avatar: 'NJ',
  },
];

const badgeColors = { Live: '#22d3ee', Hot: '#f97316', New: '#a78bfa' };

function Home() {
  const isLoggedIn = localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined;

  if (isLoggedIn) return <></>;

  return (
    <div className="av-home">
      {/* Animated Background */}
      <div className="av-bg">
        <div className="av-bg__orb av-bg__orb--1" />
        <div className="av-bg__orb av-bg__orb--2" />
        <div className="av-bg__orb av-bg__orb--3" />
        <div className="av-bg__grid" />
      </div>

      {/* ── HERO ── */}
      <section className="av-hero">
        <div className="av-hero__inner">
          <motion.div
            className="av-hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="av-hero__badge-dot" />
            Live Auctions Running Now
          </motion.div>

          <motion.h1
            className="av-hero__title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            The World's Most
            <br />
            <span className="av-hero__title--accent">Exclusive</span> Auctions
          </motion.h1>

          <motion.p
            className="av-hero__sub"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Bid on ultra-rare luxury assets — cars, art, jewellery, and more.
            <br className="av-hero__br" />
            Transparent. Secure. Cinematic.
          </motion.p>

          <motion.div
            className="av-hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <Link to="/register" className="av-hero__btn av-hero__btn--primary">
              Start Bidding
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/login" className="av-hero__btn av-hero__btn--ghost">
              Sign In
            </Link>
          </motion.div>

          <motion.div
            className="av-hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {[
              { label: 'Active Auctions', value: '1,240+' },
              { label: 'Registered Bidders', value: '82,000+' },
              { label: 'Total Sold Value', value: '₹1.2B+' },
            ].map((s) => (
              <div className="av-hero__stat" key={s.label}>
                <span className="av-hero__stat-val">{s.value}</span>
                <span className="av-hero__stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="av-hero__scroll"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <div className="av-hero__scroll-line" />
        </motion.div>
      </section>

      {/* ── FEATURED AUCTIONS ── */}
      <section className="av-section av-auctions">
        <div className="av-container">
          <FadeIn>
            <div className="av-section__head">
              <p className="av-section__tag">Featured</p>
              <h2 className="av-section__title">Live Auctions</h2>
              <p className="av-section__sub">
                Curated high-value assets with active bids right now.
              </p>
            </div>
          </FadeIn>

          <div className="av-cards">
            {auctionCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.07}>
                <motion.div
                  className="av-card"
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="av-card__img">
                    <div className="av-card__img-placeholder" />
                    <span className="av-card__badge" style={{ color: badgeColors[card.badge] }}>
                      <span className="av-card__badge-dot" style={{ background: badgeColors[card.badge] }} />
                      {card.badge}
                    </span>
                  </div>
                  <div className="av-card__body">
                    <p className="av-card__cat">{card.category}</p>
                    <h3 className="av-card__title">{card.title}</h3>
                    <div className="av-card__footer">
                      <div>
                        <p className="av-card__label">Current Bid</p>
                        <p className="av-card__bid">{card.bid}</p>
                      </div>
                      <div className="av-card__time-wrap">
                        <p className="av-card__label">Ends In</p>
                        <p className="av-card__time">{card.time}</p>
                      </div>
                    </div>
                    <Link to="/register" className="av-card__btn">Place Bid →</Link>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="av-section av-categories">
        <div className="av-container">
          <FadeIn>
            <div className="av-section__head">
              <p className="av-section__tag">Browse</p>
              <h2 className="av-section__title">Auction Categories</h2>
              <p className="av-section__sub">From supercars to rare art — every desire, one platform.</p>
            </div>
          </FadeIn>

          <div className="av-cat-grid">
            {categories.map((cat, i) => (
              <FadeIn key={cat.name} delay={i * 0.06}>
                <motion.div
                  className="av-cat-card"
                  whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.2)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <span className="av-cat-icon">{cat.icon}</span>
                  <p className="av-cat-name">{cat.name}</p>
                  <p className="av-cat-count">{cat.count}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="av-section av-why">
        <div className="av-container av-why__inner">
          <div className="av-why__left">
            <FadeIn>
              <p className="av-section__tag">Why AuctionVilla</p>
              <h2 className="av-section__title">Built for the<br />Discerning Buyer</h2>
              <p className="av-section__sub" style={{ textAlign: 'left', maxWidth: '420px' }}>
                We combine cutting-edge technology with white-glove service to deliver
                an auction experience unlike anything else.
              </p>
              <Link to="/register" className="av-hero__btn av-hero__btn--primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
                Join Now →
              </Link>
            </FadeIn>
          </div>
          <div className="av-why__right">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.1} direction="left">
                <div className="av-feature-card">
                  <span className="av-feature-icon">{f.icon}</span>
                  <div>
                    <h3 className="av-feature-title">{f.title}</h3>
                    <p className="av-feature-desc">{f.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE STATS ── */}
      <section className="av-section av-stats">
        <div className="av-container">
          <div className="av-stats__grid">
            {[
              { value: 82000, suffix: '+', label: 'Registered Users' },
              { value: 1240, suffix: '+', label: 'Active Auctions' },
              { value: 50000, suffix: '+', label: 'Items Sold' },
              { value: 99, suffix: '%', label: 'Satisfaction Rate' },
            ].map((s) => (
              <FadeIn key={s.label}>
                <div className="av-stat-card">
                  <h2 className="av-stat-value">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </h2>
                  <p className="av-stat-label">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="av-section av-testimonials">
        <div className="av-container">
          <FadeIn>
            <div className="av-section__head">
              <p className="av-section__tag">Testimonials</p>
              <h2 className="av-section__title">Trusted by Thousands</h2>
            </div>
          </FadeIn>
          <div className="av-testi-grid">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.08}>
                <motion.div
                  className="av-testi-card"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <p className="av-testi-text">"{t.text}"</p>
                  <div className="av-testi-author">
                    <div className="av-testi-avatar">{t.avatar}</div>
                    <div>
                      <p className="av-testi-name">{t.name}</p>
                      <p className="av-testi-role">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="av-section av-cta">
        <div className="av-container">
          <FadeIn>
            <div className="av-cta__box">
              <div className="av-cta__glow" />
              <p className="av-section__tag" style={{ color: 'rgba(255,255,255,0.5)' }}>Get Started Today</p>
              <h2 className="av-cta__title">Ready to Place Your<br />First Bid?</h2>
              <p className="av-cta__sub">
                Join 82,000+ bidders who trust AuctionVilla for the most exclusive auctions.
              </p>
              <div className="av-hero__cta">
                <Link to="/register" className="av-hero__btn av-hero__btn--primary">
                  Create Free Account →
                </Link>
                <Link to="/login" className="av-hero__btn av-hero__btn--ghost">
                  Sign In
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

export default Home;
