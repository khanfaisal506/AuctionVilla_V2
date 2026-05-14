import './UserHome.css';
import { Link } from 'react-router-dom';

function UserHome() {
  const userName = localStorage.getItem('name') || 'User';

  return (
    <div className="uh-page">
      <div className="uh-hero">
        <h1>Welcome back, <span>{userName}</span> 👋</h1>
        <p>Ready to bid on something exclusive today?</p>
      </div>

      <div className="uh-cards">
        <Link to="/viewpc" className="uh-card">
          <div className="uh-card__icon">🛍️</div>
          <div>
            <p className="uh-card__title">Browse Auctions</p>
            <p className="uh-card__sub">Explore all live categories</p>
          </div>
        </Link>
        <Link to="/addproduct" className="uh-card">
          <div className="uh-card__icon">📦</div>
          <div>
            <p className="uh-card__title">List an Item</p>
            <p className="uh-card__sub">Put your item up for bidding</p>
          </div>
        </Link>
        <Link to="/viewbidproduct" className="uh-card">
          <div className="uh-card__icon">🏷️</div>
          <div>
            <p className="uh-card__title">My Bids</p>
            <p className="uh-card__sub">Track your listed products</p>
          </div>
        </Link>
        <Link to="/epuser" className="uh-card">
          <div className="uh-card__icon">✏️</div>
          <div>
            <p className="uh-card__title">Edit Profile</p>
            <p className="uh-card__sub">Update your account details</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default UserHome;
