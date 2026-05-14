import './Catalogue.css';
import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { _categoryapiurl, _subcategoryapiurl, _productapiurl } from '../../api.url';

const ICON_BASE_CAT    = '/assets/uploads/caticons/';
const ICON_BASE_SUBCAT = '/assets/uploads/subcaticons/';
const ICON_BASE_PROD   = '/assets/uploads/picons/';

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

function parseDate(str) {
  if (!str) return null;
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

function formatDate(d) {
  if (!d) return '—';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function Thumb({ src, fallback }) {
  const [err, setErr] = useState(false);
  if (err || !src) return (
    <div className="cat-thumb" style={{ display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem' }}>
      {fallback}
    </div>
  );
  return <img className="cat-thumb" src={src} alt="" onError={() => setErr(true)} />;
}

function SkeletonRows({ cols }) {
  return Array.from({ length: 5 }).map((_, i) => (
    <tr key={i}>
      {Array.from({ length: cols }).map((__, j) => (
        <td key={j} style={{ padding: '14px 16px' }}>
          <div className={`cat-skel cat-skel--${['sm','md','lg','xl','md'][j % 5]}`} />
        </td>
      ))}
    </tr>
  ));
}

const TABS = ['Categories', 'Sub-Categories', 'Products'];

export default function Catalogue() {
  const [tab, setTab] = useState(0);
  const [categories,    setCategories]    = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products,      setProducts]      = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search,       setSearch]       = useState('');
  const [catFilter,    setCatFilter]    = useState('all');
  const [subcatFilter, setSubcatFilter] = useState('all');
  const [minPrice,     setMinPrice]     = useState('');
  const [maxPrice,     setMaxPrice]     = useState('');
  const [sortBy,       setSortBy]       = useState('default');

  const fetchAll = useCallback(() => {
    setLoading(true);
    Promise.all([
      axios.get(_categoryapiurl    + 'fetch').catch(() => ({ data: [] })),
      axios.get(_subcategoryapiurl + 'fetch').catch(() => ({ data: [] })),
      axios.get(_productapiurl     + 'fetch').catch(() => ({ data: [] })),
    ]).then(([c, sc, p]) => {
      setCategories(Array.isArray(c.data)   ? c.data  : []);
      setSubcategories(Array.isArray(sc.data) ? sc.data : []);
      setProducts(Array.isArray(p.data)     ? p.data  : []);
      setLoading(false);
    });
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Reset filters on tab change
  useEffect(() => {
    setSearch(''); setCatFilter('all'); setSubcatFilter('all');
    setMinPrice(''); setMaxPrice(''); setSortBy('default');
  }, [tab]);

  // Unique cats/subcats for dropdowns
  const catOptions    = useMemo(() => [...new Set(subcategories.map(s => s.catnm).filter(Boolean))].sort(), [subcategories]);
  const subcatOptions = useMemo(() => {
    const base = catFilter === 'all' ? products : products.filter(p => p.catnm === catFilter);
    return [...new Set(base.map(p => p.subcatnm).filter(Boolean))].sort();
  }, [products, catFilter]);

  // Filtered lists
  const filteredCats = useMemo(() => {
    const q = search.toLowerCase();
    let list = categories.filter(c => !q || c.catnm?.toLowerCase().includes(q));
    if (sortBy === 'az') list = [...list].sort((a,b) => a.catnm.localeCompare(b.catnm));
    if (sortBy === 'za') list = [...list].sort((a,b) => b.catnm.localeCompare(a.catnm));
    return list;
  }, [categories, search, sortBy]);

  const filteredSubs = useMemo(() => {
    const q = search.toLowerCase();
    let list = subcategories.filter(s => {
      const matchQ   = !q || s.subcatnm?.toLowerCase().includes(q) || s.catnm?.toLowerCase().includes(q);
      const matchCat = catFilter === 'all' || s.catnm === catFilter;
      return matchQ && matchCat;
    });
    if (sortBy === 'az') list = [...list].sort((a,b) => a.subcatnm.localeCompare(b.subcatnm));
    if (sortBy === 'za') list = [...list].sort((a,b) => b.subcatnm.localeCompare(a.subcatnm));
    return list;
  }, [subcategories, search, catFilter, sortBy]);

  const filteredProds = useMemo(() => {
    const q = search.toLowerCase();
    let list = products.filter(p => {
      const matchQ      = !q || p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
      const matchCat    = catFilter    === 'all' || p.catnm    === catFilter;
      const matchSubcat = subcatFilter === 'all' || p.subcatnm === subcatFilter;
      const price       = Number(p.baseprice);
      const matchMin    = !minPrice || price >= Number(minPrice);
      const matchMax    = !maxPrice || price <= Number(maxPrice);
      return matchQ && matchCat && matchSubcat && matchMin && matchMax;
    });
    if (sortBy === 'az')          list = [...list].sort((a,b) => a.title.localeCompare(b.title));
    if (sortBy === 'za')          list = [...list].sort((a,b) => b.title.localeCompare(a.title));
    if (sortBy === 'price-asc')   list = [...list].sort((a,b) => a.baseprice - b.baseprice);
    if (sortBy === 'price-desc')  list = [...list].sort((a,b) => b.baseprice - a.baseprice);
    if (sortBy === 'newest')      list = [...list].sort((a,b) => (parseDate(b.info)||0) - (parseDate(a.info)||0));
    if (sortBy === 'oldest')      list = [...list].sort((a,b) => (parseDate(a.info)||0) - (parseDate(b.info)||0));
    return list;
  }, [products, search, catFilter, subcatFilter, minPrice, maxPrice, sortBy]);

  const hasFilters = search || catFilter !== 'all' || subcatFilter !== 'all' || minPrice || maxPrice || sortBy !== 'default';
  const clearAll   = () => { setSearch(''); setCatFilter('all'); setSubcatFilter('all'); setMinPrice(''); setMaxPrice(''); setSortBy('default'); };

  const currentList   = [filteredCats, filteredSubs, filteredProds][tab];
  const currentTotal  = [categories.length, subcategories.length, products.length][tab];

  // ── Sub-cat count per category
  const subCatCountMap = useMemo(() => {
    const m = {};
    subcategories.forEach(s => { m[s.catnm] = (m[s.catnm] || 0) + 1; });
    return m;
  }, [subcategories]);

  const prodCountMap = useMemo(() => {
    const m = {};
    products.forEach(p => { m[p.catnm] = (m[p.catnm] || 0) + 1; });
    return m;
  }, [products]);

  return (
    <div className="cat-page">

      {/* ── Header ── */}
      <div className="cat-header">
        <h1>Catalogue</h1>
        <p>Browse and filter all categories, sub-categories and listed products.</p>
      </div>

      {/* ── Summary pills ── */}
      <div className="cat-summary">
        <div className="cat-pill cat-pill--purple">
          <span className="cat-pill__num">{loading ? '—' : categories.length}</span> Categories
        </div>
        <div className="cat-pill cat-pill--blue">
          <span className="cat-pill__num">{loading ? '—' : subcategories.length}</span> Sub-Categories
        </div>
        <div className="cat-pill cat-pill--green">
          <span className="cat-pill__num">{loading ? '—' : products.length}</span> Products Listed
        </div>
        <div className="cat-pill cat-pill--pink">
          <span className="cat-pill__num">
            {loading ? '—' : products.reduce((s, p) => s + Number(p.baseprice || 0), 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
          </span> Total Value
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="cat-tabs">
        {TABS.map((t, i) => (
          <button key={t} className={`cat-tab${tab === i ? ' active' : ''}`} onClick={() => setTab(i)}>
            {t}
          </button>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="cat-toolbar">
        <div className="cat-search">
          <span className="cat-search__icon"><SearchIcon /></span>
          <input
            type="text"
            placeholder={tab === 0 ? 'Search categories…' : tab === 1 ? 'Search sub-categories…' : 'Search products by title or description…'}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Category filter — shown in Sub-Categories and Products tabs */}
        {tab >= 1 && (
          <select className="cat-select" value={catFilter} onChange={e => { setCatFilter(e.target.value); setSubcatFilter('all'); }}>
            <option value="all">All Categories</option>
            {(tab === 1 ? catOptions : [...new Set(products.map(p => p.catnm).filter(Boolean))].sort()).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}

        {/* Sub-category filter — Products tab only */}
        {tab === 2 && (
          <select className="cat-select" value={subcatFilter} onChange={e => setSubcatFilter(e.target.value)} disabled={catFilter === 'all' && subcatOptions.length === 0}>
            <option value="all">All Sub-Categories</option>
            {subcatOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        )}

        {/* Price range — Products tab only */}
        {tab === 2 && (
          <div className="cat-price-row">
            <span className="cat-price-label">₹ Price</span>
            <input className="cat-price-input" type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
            <span className="cat-price-sep">—</span>
            <input className="cat-price-input" type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
          </div>
        )}

        {/* Sort */}
        <select className="cat-select" style={{ minWidth: 160 }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="az">Name A → Z</option>
          <option value="za">Name Z → A</option>
          {tab === 2 && <option value="price-asc">Price: Low → High</option>}
          {tab === 2 && <option value="price-desc">Price: High → Low</option>}
          {tab === 2 && <option value="newest">Date: Newest first</option>}
          {tab === 2 && <option value="oldest">Date: Oldest first</option>}
        </select>

        {hasFilters && <button className="cat-clear" onClick={clearAll}>✕ Clear</button>}
      </div>

      {/* ── Result count ── */}
      {!loading && (
        <div className="cat-results">
          Showing <span>{currentList.length}</span> of <span>{currentTotal}</span> {TABS[tab].toLowerCase()}
        </div>
      )}

      {/* ── Table ── */}
      <div className="cat-table-wrap">
        <table className="cat-table">

          {/* CATEGORIES */}
          {tab === 0 && (
            <>
              <thead><tr>
                <th>#</th><th>Category</th><th>Sub-Categories</th><th>Products</th>
              </tr></thead>
              <tbody>
                {loading ? <SkeletonRows cols={4} /> : filteredCats.length === 0 ? (
                  <tr><td colSpan={4}>
                    <div className="cat-empty">
                      <div className="cat-empty__icon">🗂️</div>
                      <div className="cat-empty__msg">{hasFilters ? 'No categories match your search.' : 'No categories added yet.'}</div>
                      {hasFilters && <div className="cat-empty__sub"><span style={{color:'#a78bfa',cursor:'pointer'}} onClick={clearAll}>Clear filters</span></div>}
                    </div>
                  </td></tr>
                ) : filteredCats.map((c, i) => (
                  <tr key={c._id}>
                    <td style={{ color:'rgba(255,255,255,0.22)', fontSize:'0.75rem', fontWeight:600 }}>{i + 1}</td>
                    <td>
                      <div className="cat-thumb-wrap">
                        <Thumb src={ICON_BASE_CAT + c.caticonnm} fallback="🗂️" />
                        <span className="cat-item-name">{c.catnm}</span>
                      </div>
                    </td>
                    <td><span className="cat-badge cat-badge--blue">{subCatCountMap[c.catnm] || 0} sub-cats</span></td>
                    <td><span className="cat-badge cat-badge--green">{prodCountMap[c.catnm]   || 0} products</span></td>
                  </tr>
                ))}
              </tbody>
            </>
          )}

          {/* SUB-CATEGORIES */}
          {tab === 1 && (
            <>
              <thead><tr>
                <th>#</th><th>Sub-Category</th><th>Parent Category</th><th>Products</th>
              </tr></thead>
              <tbody>
                {loading ? <SkeletonRows cols={4} /> : filteredSubs.length === 0 ? (
                  <tr><td colSpan={4}>
                    <div className="cat-empty">
                      <div className="cat-empty__icon">📁</div>
                      <div className="cat-empty__msg">{hasFilters ? 'No sub-categories match your filters.' : 'No sub-categories added yet.'}</div>
                      {hasFilters && <div className="cat-empty__sub"><span style={{color:'#a78bfa',cursor:'pointer'}} onClick={clearAll}>Clear filters</span></div>}
                    </div>
                  </td></tr>
                ) : filteredSubs.map((s, i) => {
                  const pc = products.filter(p => p.subcatnm === s.subcatnm).length;
                  return (
                    <tr key={s._id}>
                      <td style={{ color:'rgba(255,255,255,0.22)', fontSize:'0.75rem', fontWeight:600 }}>{i + 1}</td>
                      <td>
                        <div className="cat-thumb-wrap">
                          <Thumb src={ICON_BASE_SUBCAT + s.subcaticonnm} fallback="📁" />
                          <span className="cat-item-name">{s.subcatnm}</span>
                        </div>
                      </td>
                      <td><span className="cat-badge cat-badge--purple">{s.catnm}</span></td>
                      <td><span className="cat-badge cat-badge--green">{pc} products</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </>
          )}

          {/* PRODUCTS */}
          {tab === 2 && (
            <>
              <thead><tr>
                <th>#</th><th>Product</th><th>Category</th><th>Sub-Category</th><th>Base Price</th><th>Listed On</th>
              </tr></thead>
              <tbody>
                {loading ? <SkeletonRows cols={6} /> : filteredProds.length === 0 ? (
                  <tr><td colSpan={6}>
                    <div className="cat-empty">
                      <div className="cat-empty__icon">📦</div>
                      <div className="cat-empty__msg">{hasFilters ? 'No products match your filters.' : 'No products listed yet.'}</div>
                      {hasFilters && <div className="cat-empty__sub"><span style={{color:'#a78bfa',cursor:'pointer'}} onClick={clearAll}>Clear filters</span></div>}
                    </div>
                  </td></tr>
                ) : filteredProds.map((p, i) => {
                  const d = parseDate(p.info);
                  return (
                    <tr key={p._id}>
                      <td style={{ color:'rgba(255,255,255,0.22)', fontSize:'0.75rem', fontWeight:600 }}>{i + 1}</td>
                      <td>
                        <div className="cat-thumb-wrap">
                          <Thumb src={ICON_BASE_PROD + p.piconnm} fallback="📦" />
                          <div>
                            <div className="cat-item-name">{p.title}</div>
                            <div className="cat-item-sub" style={{ maxWidth: 260, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                              {p.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td><span className="cat-badge cat-badge--purple">{p.catnm}</span></td>
                      <td><span className="cat-badge cat-badge--blue">{p.subcatnm}</span></td>
                      <td className="cat-price">₹{Number(p.baseprice).toLocaleString('en-IN')}</td>
                      <td>
                        <div className="cat-date">{formatDate(d)}</div>
                        {d && <div className="cat-date__time">{d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</div>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </>
          )}

        </table>
      </div>
    </div>
  );
}
