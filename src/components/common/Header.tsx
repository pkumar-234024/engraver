import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Scissors, LayoutDashboard, ShoppingBag, Phone, Menu, X } from 'lucide-react';
import type { RootState } from '../../app/store';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const site = useSelector((state: RootState) => state.site);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isAdminPath = location.pathname.startsWith('/admin');
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`header ${isScrolled ? 'scrolled' : ''} glass-card`}>
      <div className="container nav-content">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          {site.logoUrl ? (
            <img src={site.logoUrl} alt="Logo" className="nav-logo-img" />
          ) : (
            <Scissors className="logo-icon" />
          )}
          <span className="gradient-text">{site.logoText}</span>
        </Link>
        
        <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={isHomePage ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>
            <ShoppingBag size={18} />
            <span>Showcase</span>
          </Link>
          <a href="/#about" onClick={(e) => scrollToSection(e, 'about')}>
            <span>About</span>
          </a>
          <Link to="/admin" className={isAdminPath ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>
            <LayoutDashboard size={18} />
            <span>Admin Portal</span>
          </Link>
          <a href="/#contact" className="contact-btn" onClick={(e) => scrollToSection(e, 'contact')}>
            <Phone size={18} />
            <span>Get in Touch</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
