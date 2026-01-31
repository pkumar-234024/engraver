import React from 'react';
import { Scissors, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <Scissors className="logo-icon" />
            <span className="gradient-text">EngraverPro</span>
          </div>
          <p>Precision laser engraving and custom designs for posters, name plates, and professional stamps.</p>
          <div className="social-links">
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#work">Our Gallery</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Get a Quote</a></li>
            <li><a href="/admin">Admin Portal</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Info</h4>
          <ul>
            <li><Phone size={18} /> +1 (555) 123-4567</li>
            <li><Mail size={18} /> hello@engraverpro.com</li>
            <li><MapPin size={18} /> 123 Craft St, Design City</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} EngraverPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
