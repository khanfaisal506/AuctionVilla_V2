import './Register.css';
import '../LoginComponent/Login.css';
import { useState } from 'react';
import axios from 'axios';
import { _userapiurl } from '../../api.url';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !mobile) {
      setOutput('Please fill in all required fields.');
      setIsError(true);
      return;
    }
    setLoading(true);
    setOutput('');

    const userDetails = { name, email, password, mobile, address, city, gender };

    axios.post(_userapiurl + 'save', userDetails)
      .then(() => {
        setIsError(false);
        setOutput('Account created successfully! You can now sign in.');
        setLoading(false);
        setName(''); setEmail(''); setPassword('');
        setMobile(''); setAddress(''); setCity(''); setGender('');
        setStep(1);
      })
      .catch(error => {
        setIsError(true);
        setOutput('Registration failed. ' + (error.response?.data?.message || error.message));
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

      <div className="auth-center auth-center--wide">
        <motion.div
          className="auth-card auth-card--wide"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Header */}
          <div className="auth-card__head">
            <Link to="/home" className="auth-logo">Auction<span>Villa</span></Link>
            <h1 className="auth-card__title">Create your account</h1>
            <p className="auth-card__sub">Join 82,000+ bidders on the world's most exclusive auction platform.</p>
          </div>

          {/* Progress */}
          <div className="reg-steps">
            <div className={`reg-step${step >= 1 ? ' reg-step--active' : ''}`}>
              <span className="reg-step__num">1</span>
              <span className="reg-step__label">Account</span>
            </div>
            <div className="reg-step__line" />
            <div className={`reg-step${step >= 2 ? ' reg-step--active' : ''}`}>
              <span className="reg-step__num">2</span>
              <span className="reg-step__label">Profile</span>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div
                className="reg-step-body"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="auth-row">
                  <div className="auth-field">
                    <label className="auth-label">Full Name <span className="auth-required">*</span></label>
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="John Smith"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Mobile Number <span className="auth-required">*</span></label>
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="+91 98765 43210"
                      value={mobile}
                      onChange={e => setMobile(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label">Email Address <span className="auth-required">*</span></label>
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="auth-field">
                  <label className="auth-label">Password <span className="auth-required">*</span></label>
                  <div className="auth-input-wrap">
                    <input
                      type={showPass ? 'text' : 'password'}
                      className="auth-input auth-input--pw"
                      placeholder="Min. 8 characters"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <button type="button" className="auth-eye" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                      {showPass ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <motion.button
                  type="button"
                  className="auth-submit"
                  onClick={() => {
                    if (!name || !email || !password || !mobile) {
                      setOutput('Please fill in all required fields.');
                      setIsError(true);
                      return;
                    }
                    setOutput('');
                    setStep(2);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue →
                </motion.button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                className="reg-step-body"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="auth-field">
                  <label className="auth-label">Address</label>
                  <textarea
                    className="auth-input auth-textarea"
                    rows={3}
                    placeholder="Your full address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </div>

                <div className="auth-row">
                  <div className="auth-field">
                    <label className="auth-label">City</label>
                    <select
                      className="auth-input auth-select"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                    >
                      <option value="">Select City</option>
                      <optgroup label="Madhya Pradesh">
                        <option>Indore</option>
                        <option>Ratlam</option>
                        <option>Bhopal</option>
                      </optgroup>
                    </select>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Gender</label>
                    <div className="auth-gender">
                      {['Male', 'Female', 'Other'].map(g => (
                        <label key={g} className={`auth-gender-opt${gender.toLowerCase() === g.toLowerCase() ? ' auth-gender-opt--selected' : ''}`}>
                          <input
                            type="radio"
                            name="gender"
                            value={g.toLowerCase()}
                            checked={gender.toLowerCase() === g.toLowerCase()}
                            onChange={e => setGender(e.target.value)}
                            style={{ display: 'none' }}
                          />
                          {g}
                        </label>
                      ))}
                    </div>
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

                <div className="auth-row auth-row--btns">
                  <button type="button" className="auth-back" onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <motion.button
                    type="submit"
                    className="auth-submit auth-submit--flex"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? <span className="auth-spinner" /> : 'Create Account →'}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 1 && output && (
              <motion.div
                className={`auth-msg${isError ? ' auth-msg--error' : ' auth-msg--success'}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {isError ? '⚠️' : '✓'} {output}
              </motion.div>
            )}
          </form>

          <p className="auth-card__footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Sign in</Link>
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
          <span className="auth-trust__item">Free to join</span>
          <span className="auth-trust__dot" />
          <span className="auth-trust__item">No credit card required</span>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;
