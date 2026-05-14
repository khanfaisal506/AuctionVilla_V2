import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { useEffect, useState } from 'react';
import Auth from '../AuthenticationComponent/AuthComponent';
import Cursor from '../CursorComponent/Cursor';
import { motion, AnimatePresence } from 'framer-motion';

function NavLink({ to, children, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to ||
    (to !== '/home' && to !== '/user' && location.pathname.startsWith(to));
  return (
    <Link
      to={to}
      className={`av-link${isActive ? ' av-link--active' : ''}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function DropdownMenu({ label, items, onClose }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="av-drop"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="av-link av-drop__trigger">
        {label}
        <svg className={`av-chevron${open ? ' av-chevron--open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="av-drop__panel"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {items.map(({ to, label: lbl }) => (
              <Link key={to} to={to} className="av-drop__item" onClick={onClose}>
                {lbl}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setRole(token ? localStorage.getItem('role') : null);
    setUserName(localStorage.getItem('name') || '');
  }, [location]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const close = () => setMobileOpen(false);

  return (
    <>
      <Auth />
      <Cursor />

      <motion.header
        className={`nav${scrolled ? ' nav--solid' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav__bar">

          {/* ── Logo ── */}
          <Link to="/home" className="nav__logo" onClick={close}>
            <span className="nav__logo-mark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="url(#lg1)" />
                <path d="M2 17l10 5 10-5" stroke="url(#lg2)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2 12l10 5 10-5" stroke="url(#lg3)" strokeWidth="1.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="lg1" x1="2" y1="7" x2="22" y2="7" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8b5cf6" /><stop offset="1" stopColor="#38bdf8" />
                  </linearGradient>
                  <linearGradient id="lg2" x1="2" y1="17" x2="22" y2="17" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8b5cf6" stopOpacity="0.6" /><stop offset="1" stopColor="#38bdf8" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="lg3" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8b5cf6" stopOpacity="0.8" /><stop offset="1" stopColor="#38bdf8" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="nav__logo-text">Auction<em>Villa</em></span>
          </Link>
          {!role && (
            <div className="nav__live-badge">
              <span className="nav__live-dot" />
              Live
            </div>
          )}

          {/* ── Center links ── */}
          <nav className="nav__links">
            {!role && (
              <>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/service">Services</NavLink>
                <NavLink to="/brand">Brands</NavLink>
              </>
            )}
            {role === 'admin' && (
              <>
                <NavLink to="/adminhome">Dashboard</NavLink>
                <NavLink to="/manageuser">Users</NavLink>
                <NavLink to="/catalogue">Catalogue</NavLink>
                <DropdownMenu label="Add" onClose={close} items={[
                  { to: '/addcategory',    label: 'Add Category'     },
                  { to: '/addsubcategory', label: 'Add Sub-Category' },
                  { to: '/addproduct',     label: 'Add Product'      },
                ]} />
                <DropdownMenu label="Settings" onClose={close} items={[
                  { to: '/cpadmin', label: 'Change Password' },
                  { to: '/epadmin', label: 'Edit Profile' },
                ]} />
              </>
            )}
            {role === 'user' && (
              <>
                <NavLink to="/user">Home</NavLink>
                <NavLink to="/viewpc">Browse</NavLink>
                <NavLink to="/addproduct">List Item</NavLink>
                <NavLink to="/viewbidproduct">My Bids</NavLink>
                <DropdownMenu label="Settings" onClose={close} items={[
                  { to: '/cpuser', label: 'Change Password' },
                  { to: '/epuser', label: 'Edit Profile' },
                ]} />
              </>
            )}
          </nav>

          {/* ── Right side ── */}
          <div className="nav__right">
            {!role && (
              <>
                <Link to="/login" className="nav__signin">Sign In</Link>
                <Link to="/register" className="nav__cta">
                  Get Started
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </>
            )}
            {role && (
              <div className="nav__user">
                {userName && (
                  <div className="nav__avatar" title={userName}>
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <Link to="/logout" className="nav__signin">Log Out</Link>
              </div>
            )}

            {/* Hamburger */}
            <button
              className={`nav__burger${mobileOpen ? ' is-open' : ''}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="nav__drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <div className="nav__drawer-inner">
                {!role && (
                  <>
                    <Link to="/home" className="nav__m-link" onClick={close}>Home</Link>
                    <Link to="/service" className="nav__m-link" onClick={close}>Services</Link>
                    <Link to="/brand" className="nav__m-link" onClick={close}>Brands</Link>
                    <hr className="nav__m-hr" />
                    <Link to="/login" className="nav__m-link" onClick={close}>Sign In</Link>
                    <Link to="/register" className="nav__m-cta" onClick={close}>Get Started →</Link>
                  </>
                )}
                {role === 'admin' && (
                  <>
                    <Link to="/adminhome"      className="nav__m-link" onClick={close}>Dashboard</Link>
                    <Link to="/manageuser"    className="nav__m-link" onClick={close}>Manage Users</Link>
                    <Link to="/catalogue"     className="nav__m-link" onClick={close}>Catalogue</Link>
                    <Link to="/addcategory"   className="nav__m-link" onClick={close}>Add Category</Link>
                    <Link to="/addsubcategory" className="nav__m-link" onClick={close}>Add Sub-Category</Link>
                    <Link to="/addproduct"    className="nav__m-link" onClick={close}>Add Product</Link>
                    <hr className="nav__m-hr" />
                    <Link to="/cpadmin" className="nav__m-link" onClick={close}>Change Password</Link>
                    <Link to="/epadmin" className="nav__m-link" onClick={close}>Edit Profile</Link>
                    <Link to="/logout" className="nav__m-link" onClick={close}>Log Out</Link>
                  </>
                )}
                {role === 'user' && (
                  <>
                    <Link to="/user" className="nav__m-link" onClick={close}>Home</Link>
                    <Link to="/viewpc" className="nav__m-link" onClick={close}>Browse</Link>
                    <Link to="/addproduct" className="nav__m-link" onClick={close}>List Item</Link>
                    <Link to="/viewbidproduct" className="nav__m-link" onClick={close}>My Bids</Link>
                    <hr className="nav__m-hr" />
                    <Link to="/cpuser" className="nav__m-link" onClick={close}>Change Password</Link>
                    <Link to="/epuser" className="nav__m-link" onClick={close}>Edit Profile</Link>
                    <Link to="/logout" className="nav__m-link" onClick={close}>Log Out</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
