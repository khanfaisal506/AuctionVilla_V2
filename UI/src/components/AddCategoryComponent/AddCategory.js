import './AddCategory.css';
import { useState } from 'react';
import axios from 'axios';
import { _categoryapiurl } from '../../api.url';

function AddCategory() {
  const [file, setFile] = useState(null);
  const [catName, setCatName] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFile(e.target.files[0]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!catName.trim()) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('catnm', catName);
    if (file) formData.append('caticon', file);
    axios.post(_categoryapiurl + 'save', formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then(() => {
        setCatName('');
        setFile(null);
        setOutput('Category added successfully!');
        setLoading(false);
        setTimeout(() => setOutput(''), 4000);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="adf-page">
      <div className="adf-card">
        <h2>Add Category</h2>
        <p>Create a new top-level auction category visible to all users.</p>

        {output && (
          <div className="adf-toast">
            <span>✓</span> {output}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="adf-field">
            <label>Category Name</label>
            <input
              type="text"
              placeholder="e.g. Electronics, Jewellery…"
              value={catName}
              onChange={e => setCatName(e.target.value)}
              required
            />
          </div>

          <div className="adf-field">
            <label>Category Icon</label>
            <div className="adf-upload">
              <input type="file" id="caticon" accept="image/*" onChange={handleChange} />
              <label htmlFor="caticon" className="adf-upload__label">
                📁 <span>Browse</span> or drop an image here
              </label>
              {file && <div className="adf-upload__name">✓ {file.name}</div>}
            </div>
          </div>

          <button className="adf-btn" type="submit" disabled={loading || !catName.trim()}>
            {loading ? 'Adding…' : 'Add Category'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
