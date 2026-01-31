import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Scissors, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import type { RootState } from '../../app/store';
import './Footer.css';

const Footer: React.FC = () => {
  const site = useSelector((state: RootState) => state.site);

  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo">
            {site.logoUrl ? (
              <img src={site.logoUrl} alt="Logo" className="footer-logo-img" />
            ) : (
              <Scissors className="logo-icon" />
            )}
            <span className="gradient-text">{site.name}</span>
          </div>
          <p>{site.tagline}</p>
          <div className="social-links">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
            <a href={site.social.twitter} target="_blank" rel="noopener noreferrer"><Twitter size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/#work">Our Gallery</a></li>
            <li><a href="/#about">About Us</a></li>
            <li><a href="/#contact">Contact</a></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/admin">Admin Portal</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <ul>
            <li><Phone size={18} /> {site.contact.phone}</li>
            <li><Mail size={18} /> {site.contact.email}</li>
            <li><MapPin size={18} /> {site.contact.address}</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
