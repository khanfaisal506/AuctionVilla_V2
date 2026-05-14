import './Header.css';
import { Link } from 'react-router-dom';

function Header() {

  return (
    <>
                {/* Navbar Start */}
                <nav class="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5 py-lg-0">
            <a href="index.html" class="navbar-brand">
                <h1 class="m-0 text-primary"><i class="fa fa-book-reader me-3"></i>eAuction</h1>
            </a>
            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav mx-auto">
                    <a class="nav-item nav-link active"><Link to="/">Home</Link></a>
                    <a class="nav-item nav-link"><Link to="/about">About Us</Link></a>
                    <a class="nav-item nav-link"><Link to="/contact">Contact</Link></a>
                    <a class="nav-item nav-link"><Link to="/service">Service</Link></a>
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" style={{"color":"#f95c37"}}>Pages</a>
                        <div class="dropdown-menu rounded-0 rounded-bottom border-0 shadow-sm m-0">
                            <a class="dropdown-item">Blog</a>
                            <a class="dropdown-item">Testimonials</a>
                        </div>
                    </div>
                    <a class="nav-item nav-link"><Link to="/">Register</Link></a>
                </div>
                <a class="btn btn-primary rounded-pill px-3 d-none d-lg-block" ><Link to="/login" style={{"color":"white"}} >Login</Link><i class="fa fa-arrow-right ms-3"></i></a>
            </div>
        </nav>
        {/* Navbar End */}
    </>
  );
}

export default Header;
