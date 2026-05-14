import './AddSubCategory.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { _categoryapiurl, _subcategoryapiurl } from '../../api.url';

function AddSubCategory() {
  const [file, setFile] = useState(null);
  const [catName, setCatName] = useState('');
  const [subCatName, setSubCatName] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [cDetails, setCategoryDetails] = useState([]);

  useEffect(() => {
    axios.get(_categoryapiurl + 'fetch')
      .then(res => setCategoryDetails(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => setFile(e.target.files[0]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!catName || !subCatName.trim()) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('catnm', catName);
    formData.append('subcatnm', subCatName);
    if (file) formData.append('caticon', file);
    axios.post(_subcategoryapiurl + 'save', formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then(() => {
        setCatName('');
        setSubCatName('');
        setFile(null);
        setOutput('Sub-category added successfully!');
        setLoading(false);
        setTimeout(() => setOutput(''), 4000);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="adf-page">
      <div className="adf-card">
        <h2>Add Sub-Category</h2>
        <p>Add a sub-category under an existing parent category.</p>

        {output && (
          <div className="adf-toast">
            <span>✓</span> {output}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="adf-field">
            <label>Parent Category</label>
            <select value={catName} onChange={e => setCatName(e.target.value)} required>
              <option value="">Select a category…</option>
              {cDetails.map(row => (
                <option key={row._id} value={row.catnm}>{row.catnm}</option>
              ))}
            </select>
          </div>

          <div className="adf-field">
            <label>Sub-Category Name</label>
            <input
              type="text"
              placeholder="e.g. Smartphones, Rings…"
              value={subCatName}
              onChange={e => setSubCatName(e.target.value)}
              required
            />
          </div>

          <div className="adf-field">
            <label>Sub-Category Icon</label>
            <div className="adf-upload">
              <input type="file" id="scaticon" accept="image/*" onChange={handleChange} />
              <label htmlFor="scaticon" className="adf-upload__label">
                📁 <span>Browse</span> or drop an image here
              </label>
              {file && <div className="adf-upload__name">✓ {file.name}</div>}
            </div>
          </div>

          <button className="adf-btn" type="submit" disabled={loading || !catName || !subCatName.trim()}>
            {loading ? 'Adding…' : 'Add Sub-Category'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSubCategory;
