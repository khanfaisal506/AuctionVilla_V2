import './Viewbid.css';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { _bidapiurl } from '../../api.url.js';
import { useParams, Link } from 'react-router-dom';

function Viewbid() {
  const params = useParams();
  const [bidDetails, setBidDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBids = useCallback(() => {
    setLoading(true);
    axios.get(_bidapiurl + 'fetch?p_id=' + params.p_id)
      .then(res => { setBidDetails(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.p_id]);

  useEffect(() => { fetchBids(); }, [fetchBids]);

  const sortedBids = [...bidDetails].sort((a, b) => b.bidprice - a.bidprice);

  return (
    <div className="vb-page">
      <Link to="/viewbidproduct" className="vb-back">
        ← Back to my products
      </Link>

      <div className="vb-header">
        <h1>Bid Activity</h1>
        <p>All bids placed on this product, ranked by highest offer.</p>
        <span className="vb-pid">Product #{params.p_id}</span>
      </div>

      <div className="vb-table-wrap">
        {loading ? (
          <div className="vb-empty">Loading bids…</div>
        ) : sortedBids.length === 0 ? (
          <div className="vb-empty">No bids have been placed on this product yet.</div>
        ) : (
          <table className="vb-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Bid ID</th>
                <th>Bidder</th>
                <th>Amount</th>
                <th>Placed On</th>
              </tr>
            </thead>
            <tbody>
              {sortedBids.map((row, i) => (
                <tr key={row._id}>
                  <td>
                    <span className={`vb-rank vb-rank--${i + 1}`}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                    </span>
                    {i === 0 && <span className="vb-top-badge">⚡ Top Bid</span>}
                  </td>
                  <td style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>
                    #{row._id}
                  </td>
                  <td className="vb-uid">{row.u_id}</td>
                  <td className="vb-price">{row.bidprice}</td>
                  <td className="vb-date">
                    {row.info ? new Date(row.info).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
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

export default Viewbid;
