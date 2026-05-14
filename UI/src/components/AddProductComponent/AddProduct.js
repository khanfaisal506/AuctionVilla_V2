import './AddProduct.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { _categoryapiurl, _subcategoryapiurl, _productapiurl } from '../../api.url';

function AddProduct() {
  const [file, setFile]           = useState(null);
  const [preview, setPreview]     = useState(null);
  const [title, setTitle]         = useState('');
  const [catName, setCatName]     = useState('');
  const [subCatName, setSubCatName] = useState('');
  const [description, setDescription] = useState('');
  const [baseprice, setBasePrice] = useState('');
  const [output, setOutput]       = useState('');
  const [isError, setIsError]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const [cDetails, setCategories] = useState([]);
  const [scDetails, setSubCats]   = useState([]);
  const [scLoading, setScLoading] = useState(false);

  useEffect(() => {
    axios.get(_categoryapiurl + 'fetch')
      .then(res => setCategories(Array.isArray(res.data) ? res.data : []))
      .catch(() => {});
  }, []);

  const handleCatChange = val => {
    setCatName(val);
    setSubCatName('');
    setSubCats([]);
    if (!val) return;
    setScLoading(true);
    axios.get(_subcategoryapiurl + 'fetch?catnm=' + val)
      .then(res => { setSubCats(Array.isArray(res.data) ? res.data : []); setScLoading(false); })
      .catch(() => setScLoading(false));
  };

  const handleFile = e => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const isValid = title.trim() && catName && subCatName && description.trim() && baseprice && file;

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('catnm', catName);
    formData.append('subcatnm', subCatName);
    formData.append('description', description.trim());
    formData.append('baseprice', baseprice);
    formData.append('uid', localStorage.getItem('email') || 'admin');
    formData.append('picon', file);

    axios.post(_productapiurl + 'save', formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then(() => {
        setTitle(''); setCatName(''); setSubCatName('');
        setDescription(''); setBasePrice(''); setFile(null); setPreview(null);
        setSubCats([]);
        setIsError(false);
        setOutput('Product listed successfully!');
        setLoading(false);
        setTimeout(() => setOutput(''), 5000);
      })
      .catch(() => {
        setIsError(true);
        setOutput('Something went wrong. Please try again.');
        setLoading(false);
        setTimeout(() => setOutput(''), 5000);
      });
  };

  return (
    <div className="adf-page">
      <div className="adf-card">

        <div className="adf-card__head">
          <h2>List a Product</h2>
          <p>Fill in the details below to put a product up for auction.</p>
        </div>

        {output && (
          <div className={`adf-toast${isError ? ' adf-toast--err' : ''}`}>
            <span>{isError ? '✕' : '✓'}</span> {output}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div className="adf-field">
            <label>Product Title</label>
            <input
              type="text"
              placeholder="e.g. Apple iPhone 14 Pro Max 256GB…"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category + Subcategory row */}
          <div className="adf-row">
            <div className="adf-field">
              <label>Category</label>
              <select value={catName} onChange={e => handleCatChange(e.target.value)} required>
                <option value="">Select category…</option>
                {cDetails.map(row => (
                  <option key={row._id} value={row.catnm}>{row.catnm}</option>
                ))}
              </select>
            </div>

            <div className="adf-field">
              <label>Sub-Category</label>
              <select
                value={subCatName}
                onChange={e => setSubCatName(e.target.value)}
                disabled={!catName || scLoading}
                required
              >
                <option value="">
                  {scLoading ? 'Loading…' : catName ? 'Select sub-category…' : 'Select category first'}
                </option>
                {scDetails.map(row => (
                  <option key={row._id} value={row.subcatnm}>{row.subcatnm}</option>
                ))}
              </select>
              {catName && !scLoading && scDetails.length === 0 && (
                <div className="adf-hint">No sub-categories found for this category.</div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="adf-field">
            <label>Description</label>
            <textarea
              placeholder="Describe the item — condition, specifications, what's included…"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Base price */}
          <div className="adf-field">
            <label>Starting / Base Price (₹)</label>
            <div className="adf-price">
              <span className="adf-price__sym">₹</span>
              <input
                type="number"
                placeholder="0"
                min="1"
                value={baseprice}
                onChange={e => setBasePrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="adf-divider" />

          {/* Image upload */}
          <div className="adf-field">
            <label>Product Image</label>
            <div className="adf-upload">
              <input type="file" id="picon" accept="image/*" onChange={handleFile} />
              <label htmlFor="picon" className="adf-upload__label">
                📷 <span>Browse</span> or drop an image here
              </label>
              {file && <div className="adf-upload__name">✓ {file.name}</div>}
            </div>
            {preview && <img src={preview} alt="preview" className="adf-preview" />}
          </div>

          <button className="adf-btn" type="submit" disabled={loading || !isValid}>
            {loading ? 'Listing product…' : 'List Product for Auction'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;
