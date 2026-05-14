import './EpAdmin.css';
import { useState, useEffect } from 'react';
import { _userapiurl } from '../../api.url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EpAdmin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [output, setOutput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(_userapiurl + 'fetch?email=' + localStorage.getItem('email'))
      .then(res => {
        const u = res.data[0];
        setName(u.name);
        setEmail(u.email);
        setAddress(u.address);
        setMobile(u.mobile);
        setCity(u.city);
        setGender(u.gender);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = () => {
    const updateDetails = {
      condition_obj: { email },
      content_obj: { name, mobile, address, city, gender },
    };
    axios.patch(_userapiurl + 'update', updateDetails).then(() => {
      setOutput('Profile updated successfully!');
      setTimeout(() => { setOutput(''); navigate('/epadmin'); }, 2000);
    });
  };

  const initials = name ? name.charAt(0).toUpperCase() : 'A';

  return (
    <div className="ep-page">
      <div className="ep-card">
        <h2>Edit Profile</h2>
        <p>Update your admin account details below.</p>

        <div className="ep-avatar">{initials}</div>

        {output && (
          <div className="ep-msg"><span>✓</span> {output}</div>
        )}

        <div className="ep-grid">
          <div className="ep-field">
            <label>Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
          </div>

          <div className="ep-field">
            <label>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
          </div>

          <div className="ep-field">
            <label>Mobile</label>
            <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="10-digit number" maxLength={10} />
          </div>

          <div className="ep-field">
            <label>City</label>
            <select value={city} onChange={e => setCity(e.target.value)}>
              <option value="">Select city…</option>
              <optgroup label="Madhya Pradesh">
                <option>Indore</option>
                <option>Ratlam</option>
                <option>Bhopal</option>
              </optgroup>
            </select>
          </div>

          <div className="ep-field ep-grid--full">
            <label>Address</label>
            <textarea rows={3} value={address} onChange={e => setAddress(e.target.value)} placeholder="Your full address" />
          </div>

          <div className="ep-field ep-grid--full">
            <label>Gender</label>
            <div className="ep-radio-group">
              <label className="ep-radio">
                <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={e => setGender(e.target.value)} />
                Male
              </label>
              <label className="ep-radio">
                <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={e => setGender(e.target.value)} />
                Female
              </label>
            </div>
          </div>
        </div>

        <div className="ep-actions">
          <button className="ep-btn" onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default EpAdmin;
