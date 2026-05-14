import './ViewbidProduct.css';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { _productapiurl } from '../../api.url.js';
import { Link } from 'react-router-dom';

function ViewbidProduct() {
  const [pDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    axios.get(_productapiurl + 'fetch?uid=' + localStorage.getItem('email'))
      .then(res => { setProductDetails(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  return (
    <div className="vbp-page">
      <div className="vbp-header">
        <h1>My Listed Products</h1>
        <p>All items you've put up for auction — click "View Bids" to see activity.</p>
        {!loading && (
          <span className="vbp-count">
            {pDetails.length} product{pDetails.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="vbp-table-wrap">
        {loading ? (
          <div className="vbp-empty">Loading your products…</div>
        ) : pDetails.length === 0 ? (
          <div className="vbp-empty">
            You haven't listed any products yet.
            <br />
            <Link to="/addproduct">+ List your first item →</Link>
          </div>
        ) : (
          <table className="vbp-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Base Price</th>
                <th>Listed On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pDetails.map((row, i) => (
                <tr key={row._id}>
                  <td style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem' }}>
                    {i + 1}
                  </td>
                  <td className="vbp-title">{row.title}</td>
                  <td><span className="vbp-cat">{row.subcatnm}</span></td>
                  <td style={{ maxWidth: 200, color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
                    {row.description?.length > 60 ? row.description.slice(0, 60) + '…' : row.description}
                  </td>
                  <td className="vbp-price">{row.baseprice}</td>
                  <td style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
                    {row.info ? new Date(row.info).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                  <td>
                    <Link to={`/viewbid/${row._id}`} className="vbp-btn">
                      View Bids →
                    </Link>
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

export default ViewbidProduct;
