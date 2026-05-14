import './CpAdmin.css';
import { useState } from 'react';
import { _userapiurl } from '../../api.url';
import axios from 'axios';

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function CpAdmin() {
  const [opass, setOldPassword] = useState('');
  const [npass, setNewPassword] = useState('');
  const [cnpass, setConfirmNewPassword] = useState('');
  const [output, setOutput] = useState({ msg: '', type: '' });
  const [show, setShow] = useState({ old: false, new: false, confirm: false });

  const handleSubmit = () => {
    if (!opass || !npass || !cnpass) {
      setOutput({ msg: 'Please fill in all fields.', type: 'error' });
      return;
    }
    if (npass !== cnpass) {
      setOutput({ msg: "New passwords don't match.", type: 'error' });
      setNewPassword(''); setConfirmNewPassword('');
      return;
    }
    axios.get(_userapiurl + 'fetch?email=' + localStorage.getItem('email') + '&password=' + opass)
      .then(() => {
        const updateDetails = { condition_obj: { email: localStorage.getItem('email') }, content_obj: { password: npass } };
        axios.patch(_userapiurl + 'update', updateDetails).then(() => {
          setOutput({ msg: 'Password changed successfully!', type: 'success' });
          setOldPassword(''); setNewPassword(''); setConfirmNewPassword('');
        });
      })
      .catch(() => {
        setOutput({ msg: 'Old password is incorrect.', type: 'error' });
        setOldPassword('');
      });
  };

  const toggle = key => setShow(s => ({ ...s, [key]: !s[key] }));

  return (
    <div className="cp-page">
      <div className="cp-card">
        <h2>Change Password</h2>
        <p>Keep your account secure by updating your password regularly.</p>

        {output.msg && (
          <div className={`cp-msg cp-msg--${output.type}`}>
            <span>{output.type === 'success' ? '✓' : '✕'}</span> {output.msg}
          </div>
        )}

        <div className="cp-field">
          <label>Current Password</label>
          <div className="cp-input-wrap">
            <input type={show.old ? 'text' : 'password'} value={opass} onChange={e => setOldPassword(e.target.value)} placeholder="Enter current password" />
            <button type="button" className="cp-eye" onClick={() => toggle('old')}><EyeIcon open={show.old} /></button>
          </div>
        </div>

        <div className="cp-field">
          <label>New Password</label>
          <div className="cp-input-wrap">
            <input type={show.new ? 'text' : 'password'} value={npass} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" />
            <button type="button" className="cp-eye" onClick={() => toggle('new')}><EyeIcon open={show.new} /></button>
          </div>
        </div>

        <div className="cp-field">
          <label>Confirm New Password</label>
          <div className="cp-input-wrap">
            <input type={show.confirm ? 'text' : 'password'} value={cnpass} onChange={e => setConfirmNewPassword(e.target.value)} placeholder="Re-enter new password" />
            <button type="button" className="cp-eye" onClick={() => toggle('confirm')}><EyeIcon open={show.confirm} /></button>
          </div>
        </div>

        <button className="cp-btn" onClick={handleSubmit}>Update Password</button>
      </div>
    </div>
  );
}

export default CpAdmin;
