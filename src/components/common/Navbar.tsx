import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scissors, LayoutDashboard, ShoppingBag, Phone } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <nav className="navbar glass-card">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <Scissors className="logo-icon" />
          <span className="gradient-text">EngraverPro</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            <ShoppingBag size={18} />
            <span>Showcase</span>
          </Link>
          <Link to="/admin" className={isAdminPath ? 'active' : ''}>
            <LayoutDashboard size={18} />
            <span>Admin</span>
          </Link>
          <a href="#contact" className="contact-btn">
            <Phone size={18} />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
