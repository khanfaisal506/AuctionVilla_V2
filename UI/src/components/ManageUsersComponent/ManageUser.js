import './ManageUser.css';
import { useState, useEffect, useCallback } from 'react';
import { _userapiurl } from '../../api.url';
import axios from 'axios';

function ManageUser() {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    axios.get(_userapiurl + 'fetch?role=user')
      .then(res => { setUserDetails(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const changeStatus = (action, _id) => {
    if (action === 'block') {
      axios.patch(_userapiurl + 'update', { condition_obj: { _id }, content_obj: { status: 0 } })
        .then(fetchUsers);
    } else if (action === 'verify') {
      axios.patch(_userapiurl + 'update', { condition_obj: { _id }, content_obj: { status: 1 } })
        .then(fetchUsers);
    } else {
      axios.delete(_userapiurl + 'delete', { data: { _id } })
        .then(fetchUsers);
    }
  };

  return (
    <div className="mu-page">
      <div className="mu-header">
        <div>
          <h1>Manage Users</h1>
          <p>Verify, block or remove registered users from the platform.</p>
          {!loading && <span className="mu-count">{userDetails.length} user{userDetails.length !== 1 ? 's' : ''}</span>}
        </div>
      </div>

      <div className="mu-table-wrap">
        {loading ? (
          <div className="mu-empty">Loading users…</div>
        ) : userDetails.length === 0 ? (
          <div className="mu-empty">No users found.</div>
        ) : (
          <table className="mu-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>City</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userDetails.map(row => (
                <tr key={row._id}>
                  <td style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>#{row._id}</td>
                  <td className="mu-name">{row.name}</td>
                  <td style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>{row.email}</td>
                  <td>{row.mobile}</td>
                  <td style={{ textTransform: 'capitalize' }}>{row.city}</td>
                  <td style={{ textTransform: 'capitalize' }}>{row.gender}</td>
                  <td>
                    {row.status === 1
                      ? <span className="mu-badge mu-badge--verified"><span className="mu-badge__dot" />Verified</span>
                      : <span className="mu-badge mu-badge--pending"><span className="mu-badge__dot" />Pending</span>
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
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ManageUser;
