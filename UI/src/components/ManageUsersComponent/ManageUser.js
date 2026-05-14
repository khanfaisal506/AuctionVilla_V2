import './ManageUser.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { _userapiurl } from '../../api.url';
import axios from 'axios';

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const CalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

function parseDate(infoStr) {
  if (!infoStr) return null;
  const d = new Date(infoStr);
  return isNaN(d.getTime()) ? null : d;
}

function formatDate(d) {
  if (!d) return '—';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateInput(d) {
  if (!d) return '';
  return d.toISOString().slice(0, 10);
}

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
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    axios.get(_userapiurl + 'fetch?role=user')
      .then(res => { setUserDetails(Array.isArray(res.data) ? res.data : []); setLoading(false); })
      .catch(() => { setUserDetails([]); setLoading(false); });
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const changeStatus = (action, _id) => {
    if (action === 'delete') { setConfirmDelete(_id); return; }
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
    const from = dateFrom ? new Date(dateFrom + 'T00:00:00') : null;
    const to   = dateTo   ? new Date(dateTo   + 'T23:59:59') : null;

    return userDetails.filter(u => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.mobile?.includes(q);
      const matchStatus = statusFilter === 'all' ||
        (statusFilter === 'verified' ? u.status === 1 : u.status === 0);
      const matchGender = genderFilter === 'all' || u.gender?.toLowerCase() === genderFilter;
      const matchCity   = cityFilter === 'all'   || u.city === cityFilter;

      const reg = parseDate(u.info);
      const matchFrom = !from || (reg && reg >= from);
      const matchTo   = !to   || (reg && reg <= to);

      return matchSearch && matchStatus && matchGender && matchCity && matchFrom && matchTo;
    });
  }, [userDetails, search, statusFilter, genderFilter, cityFilter, dateFrom, dateTo]);

  const counts = useMemo(() => ({
    all:      userDetails.length,
    verified: userDetails.filter(u => u.status === 1).length,
    pending:  userDetails.filter(u => u.status === 0).length,
  }), [userDetails]);

  const hasFilters = search || statusFilter !== 'all' || genderFilter !== 'all' || cityFilter !== 'all' || dateFrom || dateTo;
  const clearFilters = () => {
    setSearch(''); setStatusFilter('all');
    setGenderFilter('all'); setCityFilter('all');
    setDateFrom(''); setDateTo('');
  };

  return (
    <div className="mu-page">

      {/* ── Delete Modal ── */}
      {confirmDelete && (
        <div className="mu-modal-bg">
          <div className="mu-modal">
            <div className="mu-modal__icon">⚠️</div>
            <h3 className="mu-modal__title">Delete this user?</h3>
            <p className="mu-modal__sub">This action is permanent and cannot be undone.</p>
            <div className="mu-modal__btns">
              <button className="mu-modal__cancel" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="mu-modal__confirm" onClick={confirmDeleteUser}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="mu-header">
        <div className="mu-header__left">
          <h1>Manage Users</h1>
          <p>Review, verify and manage all registered users on the platform.</p>
        </div>
      </div>

      {/* ── Stat pills ── */}
      <div className="mu-stats">
        {[
          { key: 'all',      label: 'All Users', count: counts.all      },
          { key: 'verified', label: 'Verified',   count: counts.verified },
          { key: 'pending',  label: 'Pending',    count: counts.pending  },
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

      {/* ── Filters row 1: search + dropdowns ── */}
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
      </div>

      {/* ── Filters row 2: date range ── */}
      <div className="mu-toolbar mu-toolbar--date">
        <div className="mu-date-group">
          <CalIcon />
          <span className="mu-date-label">Registered from</span>
          <input
            type="date"
            className="mu-date-input"
            value={dateFrom}
            max={dateTo || undefined}
            onChange={e => setDateFrom(e.target.value)}
          />
          <span className="mu-date-sep">→</span>
          <input
            type="date"
            className="mu-date-input"
            value={dateTo}
            min={dateFrom || undefined}
            onChange={e => setDateTo(e.target.value)}
          />
          {(dateFrom || dateTo) && (
            <button className="mu-date-clear" onClick={() => { setDateFrom(''); setDateTo(''); }}>✕</button>
          )}
        </div>

        {hasFilters && (
          <button className="mu-clear" onClick={clearFilters}>✕ Clear all filters</button>
        )}
      </div>

      {/* ── Result count ── */}
      {!loading && (
        <div className="mu-results">
          Showing <span>{filtered.length}</span> of <span>{userDetails.length}</span> users
          {hasFilters && filtered.length !== userDetails.length && (
            <span className="mu-results__tag"> · filtered</span>
          )}
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
              <th>Registered On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <SkeletonRows />
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className="mu-empty">
                    <div className="mu-empty__icon">{hasFilters ? '🔍' : '👥'}</div>
                    <div className="mu-empty__msg">
                      {hasFilters ? 'No users match your filters.' : 'No users registered yet.'}
                    </div>
                    {hasFilters && (
                      <div className="mu-empty__sub">
                        Try adjusting your search or{' '}
                        <span style={{ color: '#a78bfa', cursor: 'pointer' }} onClick={clearFilters}>
                          clear all filters
                        </span>.
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => {
                const regDate = parseDate(row.info);
                return (
                  <tr key={row._id}>
                    <td className="mu-td--id">{i + 1}</td>
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
                    <td className="mu-td--mono">{row.mobile || '—'}</td>
                    <td>
                      <span className="mu-gender">
                        {row.gender === 'male' ? '♂' : '♀'} {row.gender}
                      </span>
                    </td>
                    <td className="mu-td--city">{row.city || '—'}</td>
                    <td>
                      <div className="mu-reg">
                        <span className="mu-reg__date">{formatDate(regDate)}</span>
                        {regDate && (
                          <span className="mu-reg__time">
                            {regDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
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
                        <button className="mu-btn mu-btn--delete" onClick={() => changeStatus('delete', row._id)}>✕</button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUser;
