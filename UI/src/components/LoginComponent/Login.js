import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { _userapiurl } from '../../api.url';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setOutput('Please fill in all fields.');
      setIsError(true);
      return;
    }
    setLoading(true);
    setOutput('');
    const userDetails = { email, password };

    axios.post(_userapiurl + 'login', userDetails)
      .then(response => {
        const users = response.data.userDetails;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('_id', users._id);
        localStorage.setItem('name', users.name);
        localStorage.setItem('email', users.email);
        localStorage.setItem('mobile', users.mobile);
        localStorage.setItem('address', users.address);
        localStorage.setItem('city', users.city);
        localStorage.setItem('gender', users.gender);
        localStorage.setItem('info', users.info);
        localStorage.setItem('role', users.role);
        setIsError(false);
        setOutput('Login Successful');
        setLoading(false);
        users.role === 'admin' ? navigate('/admin') : navigate('/user');
      })
      .catch(error => {
        setIsError(true);
        setOutput('Invalid email or password. Please try again.');
        setEmail('');
        setPassword('');
        setLoading(false);
      });
  };

  return (
    <div className="auth-page">
      {/* Background */}
      <div className="auth-bg">
        <div className="auth-bg__orb auth-bg__orb--1" />
        <div className="auth-bg__orb auth-bg__orb--2" />
        <div className="auth-bg__grid" />
      </div>

      <div className="auth-center">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Header */}
          <div className="auth-card__head">
            <h1 className="auth-card__title">Welcome back</h1>
            <p className="auth-card__sub">Sign in to access your auctions and bids.</p>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label">Email address</label>
              <input
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="auth-input auth-input--pw"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-eye"
                  onClick={() => setShowPass(!showPass)}
                  tabIndex={-1}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {output && (
              <motion.div
                className={`auth-msg${isError ? ' auth-msg--error' : ' auth-msg--success'}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {isError ? '⚠️' : '✓'} {output}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="auth-submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <span className="auth-spinner" />
              ) : (
                'Sign In →'
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="auth-card__footer">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">Create one free</Link>
          </p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="auth-trust"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span className="auth-trust__item">🔒 256-bit SSL</span>
          <span className="auth-trust__dot" />
          <span className="auth-trust__item">82,000+ users</span>
          <span className="auth-trust__dot" />
          <span className="auth-trust__item">Bank-grade security</span>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
