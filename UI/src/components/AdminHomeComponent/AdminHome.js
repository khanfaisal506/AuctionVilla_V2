import './AdminHome.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { _userapiurl, _categoryapiurl, _subcategoryapiurl, _productapiurl } from '../../api.url';

function StatCard({ icon, value, label, colorClass }) {
  return (
    <div className="adm-stat">
      <div className={`adm-stat__icon adm-stat__icon--${colorClass}`}>{icon}</div>
      <div>
        <div className="adm-stat__val">{value}</div>
        <div className="adm-stat__lbl">{label}</div>
      </div>
    </div>
  );
}

function ActionCard({ icon, title, desc, to }) {
  return (
    <Link to={to} className="adm-card" style={{ textDecoration: 'none' }}>
      <div className="adm-card__icon">{icon}</div>
      <div>
        <p className="adm-card__title">{title}</p>
        <p className="adm-card__desc">{desc}</p>
      </div>
      <span className="adm-card__arrow">→ Open</span>
    </Link>
  );
}

function AdminHome() {
  const [counts, setCounts] = useState({ users: '—', categories: '—', subcategories: '—', products: '—' });
  const adminName = localStorage.getItem('name') || 'Admin';

  useEffect(() => {
    const fetchers = [
      axios.get(_userapiurl + 'fetch?role=user').catch(() => ({ data: [] })),
      axios.get(_categoryapiurl + 'fetch').catch(() => ({ data: [] })),
      axios.get(_subcategoryapiurl + 'fetch').catch(() => ({ data: [] })),
      axios.get(_productapiurl + 'fetch').catch(() => ({ data: [] })),
    ];
    Promise.all(fetchers).then(([u, c, sc, p]) => {
      setCounts({
        users: Array.isArray(u.data) ? u.data.length : '—',
        categories: Array.isArray(c.data) ? c.data.length : '—',
        subcategories: Array.isArray(sc.data) ? sc.data.length : '—',
        products: Array.isArray(p.data) ? p.data.length : '—',
      });
    });
  }, []);

  return (
    <div className="adm-page">
      <div className="adm-welcome">
        <h1>Welcome back, <span>{adminName.charAt(0).toUpperCase() + adminName.slice(1)}</span> 👋</h1>
        <p>Here's what's happening on your platform today.</p>
      </div>

      <div className="adm-stats">
        <StatCard icon="👥" value={counts.users}        label="Total Users"       colorClass="purple" />
        <StatCard icon="🗂️" value={counts.categories}   label="Categories"        colorClass="blue"   />
        <StatCard icon="📁" value={counts.subcategories} label="Sub-Categories"   colorClass="green"  />
        <StatCard icon="📦" value={counts.products}     label="Products Listed"   colorClass="pink"   />
      </div>

      <div className="adm-actions">
        <ActionCard icon="👥" to="/manageuser"     title="Manage Users"       desc="Verify, block, or remove registered users." />
        <ActionCard icon="🗂️" to="/addcategory"    title="Add Category"       desc="Create a new auction product category." />
        <ActionCard icon="📁" to="/addsubcategory" title="Add Sub-Category"   desc="Add a sub-category to an existing one." />
        <ActionCard icon="🔑" to="/cpadmin"        title="Change Password"    desc="Update your admin account password." />
        <ActionCard icon="✏️" to="/epadmin"        title="Edit Profile"       desc="Update your name, contact and details." />
      </div>
    </div>
  );
}

export default AdminHome;
