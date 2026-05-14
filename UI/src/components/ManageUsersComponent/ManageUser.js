import './ManageUser.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { _userapiurl } from '../../api.url';
import axios from 'axios';

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

function SkeletonRows() {
  return Array.from({ length: 5 }).map((_, i) => (
    <tr key={i} className="mu-skeleton">
      <td><div className="mu-skel mu-skel--sm" /></td>
      <td>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div className="mu-skel" style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0 }} />
          <div>
            <div className="mu-skel mu-skel--lg" style={{ marginBottom: 6 }} />
            <div className="mu-skel mu-skel--xl" style={{ height: 10 }} />
          </div>
        </div>
      </td>
      <td><div className="mu-skel mu-skel--md" /></td>
      <td><div className="mu-skel mu-skel--sm" /></td>
      <td><div className="mu-skel mu-skel--md" /></td>
      <td><div className="mu-skel mu-skel--lg" /></td>
    </tr>
  ));
}

function ManageUser() {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    axios.get(_userapiurl + 'fetch?role=user')
      .then(res => { setUserDetails(Array.isArray(res.data) ? res.data : []); setLoading(false); })
      .catch(() => { setUserDetails([]); setLoading(false); });
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const changeStatus = (action, _id) => {
    if (action === 'delete') {
      setConfirmDelete(_id);
      return;
    }
    const content_obj = action === 'verify' ? { status: 1 } : { status: 0 };
    axios.patch(_userapiurl + 'update', { condition_obj: { _id }, content_obj }).then(fetchUsers);
  };

  const confirmDeleteUser = () => {
    if (!confirmDelete) return;
    axios.delete(_userapiurl + 'delete', { data: { _id: confirmDelete } })
      .then(() => { setConfirmDelete(null); fetchUsers(); })
      .catch(() => setConfirmDelete(null));
  };

  const cities = useMemo(() => {
    const s = new Set(userDetails.map(u => u.city).filter(Boolean));
    return [...s].sort();
  }, [userDetails]);

  const filtered = useMemo(() => {
    return userDetails.filter(u => {
      const q = search.toLowerCase();
      const matchSearch = !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.mobile?.includes(q);
      const matchStatus = statusFilter === 'all' || (statusFilter === 'verified' ? u.status === 1 : u.status === 0);
      const matchGender = genderFilter === 'all' || u.gender?.toLowerCase() === genderFilter;
      const matchCity   = cityFilter === 'all' || u.city === cityFilter;
      return matchSearch && matchStatus && matchGender && matchCity;
    });
  }, [userDetails, search, statusFilter, genderFilter, cityFilter]);

  const counts = useMemo(() => ({
    all:      userDetails.length,
    verified: userDetails.filter(u => u.status === 1).length,
    pending:  userDetails.filter(u => u.status === 0).length,
  }), [userDetails]);

  const hasFilters = search || statusFilter !== 'all' || genderFilter !== 'all' || cityFilter !== 'all';
  const clearFilters = () => { setSearch(''); setStatusFilter('all'); setGenderFilter('all'); setCityFilter('all'); };

  return (
    <div className="mu-page">

      {/* ── Confirm Delete Modal ── */}
      {confirmDelete && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: '#0f0f1a', border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 18, padding: '32px 28px', maxWidth: 380, width: '90%', textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>⚠️</div>
            <h3 style={{ color: '#fff', margin: '0 0 8px', fontSize: '1.1rem' }}>Delete this user?</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', margin: '0 0 24px' }}>
              This action is permanent and cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmDelete(null)} style={{
                flex: 1, padding: '10px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
                background: 'transparent', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.87rem',
              }}>Cancel</button>
              <button onClick={confirmDeleteUser} style={{
                flex: 1, padding: '10px', borderRadius: 10, border: 'none',
                background: 'linear-gradient(135deg,#ef4444,#dc2626)', color: '#fff',
                cursor: 'pointer', fontWeight: 700, fontSize: '0.87rem',
              }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page header ── */}
      <div className="mu-header">
        <div className="mu-header__left">
          <h1>Manage Users</h1>
          <p>Review, verify and manage all registered users on the platform.</p>
        </div>
      </div>

      {/* ── Stat filter pills ── */}
      <div className="mu-stats">
        {[
          { key: 'all',      label: 'All Users',    count: counts.all      },
          { key: 'verified', label: 'Verified',      count: counts.verified },
          { key: 'pending',  label: 'Pending',       count: counts.pending  },
        ].map(({ key, label, count }) => (
          <button
            key={key}
            className={`mu-stat${statusFilter === key ? ` active--${key}` : ''}`}
            onClick={() => setStatusFilter(key)}
          >
            <span className="mu-stat__num">{loading ? '—' : count}</span>
            {label}
          </button>
        ))}
      </div>

      {/* ── Filters toolbar ── */}
      <div className="mu-toolbar">
        <div className="mu-search">
          <span className="mu-search__icon"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search by name, email or phone…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select className="mu-select" value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
          <option value="all">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select className="mu-select" value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
          <option value="all">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {hasFilters && (
          <button className="mu-clear" onClick={clearFilters}>✕ Clear filters</button>
        )}
      </div>

      {/* ── Result count ── */}
      {!loading && (
        <div className="mu-results">
          Showing <span>{filtered.length}</span> of <span>{userDetails.length}</span> users
        </div>
      )}

      {/* ── Table ── */}
      <div className="mu-table-wrap">
        <table className="mu-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>City</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <SkeletonRows />
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="mu-empty">
                    <div className="mu-empty__icon">{hasFilters ? '🔍' : '👥'}</div>
                    <div className="mu-empty__msg">
                      {hasFilters ? 'No users match your filters.' : 'No users registered yet.'}
                    </div>
                    {hasFilters && (
                      <div className="mu-empty__sub">
                        Try adjusting your search or <span
                          style={{ color: '#a78bfa', cursor: 'pointer' }}
                          onClick={clearFilters}
                        >clear all filters</span>.
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr key={row._id}>
                  <td style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.75rem', fontWeight: 600 }}>
                    {i + 1}
                  </td>
                  <td>
                    <div className="mu-user-cell">
                      <div className={`mu-avatar${row.gender === 'female' ? ' mu-avatar--f' : ''}`}>
                        {(row.name || '?').charAt(0)}
                      </div>
                      <div>
                        <div className="mu-user-name">{row.name}</div>
                        <div className="mu-user-email">{row.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.82rem', letterSpacing: '0.02em' }}>
                    {row.mobile || '—'}
                  </td>
                  <td>
                    <span className="mu-gender">
                      {row.gender === 'male' ? '♂' : '♀'} {row.gender}
                    </span>
                  </td>
                  <td style={{ textTransform: 'capitalize', color: 'rgba(255,255,255,0.55)' }}>
                    {row.city || '—'}
                  </td>
                  <td>
                    {row.status === 1
                      ? <span className="mu-badge mu-badge--verified"><span className="mu-badge__dot" /> Verified</span>
                      : <span className="mu-badge mu-badge--pending"><span className="mu-badge__dot" /> Pending</span>
                    }
                  </td>
                  <td>
                    <div className="mu-actions">
                      {row.status === 0
                        ? <button className="mu-btn mu-btn--verify" onClick={() => changeStatus('verify', row._id)}>✓ Verify</button>
                        : <button className="mu-btn mu-btn--block"  onClick={() => changeStatus('block',  row._id)}>⊘ Block</button>
                      }
                      <button className="mu-btn mu-btn--delete" onClick={() => changeStatus('delete', row._id)}>✕ Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUser;
