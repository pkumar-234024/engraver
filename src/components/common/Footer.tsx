import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { siteConfig } from '../../config/site';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <Scissors className="logo-icon" />
            <span className="gradient-text">{siteConfig.name}</span>
          </div>
          <p>{siteConfig.tagline}</p>
          <div className="social-links">
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
            <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer"><Twitter size={20} /></a>
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
            <li><Phone size={18} /> {siteConfig.contact.phone}</li>
            <li><Mail size={18} /> {siteConfig.contact.email}</li>
            <li><MapPin size={18} /> {siteConfig.contact.address}</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
