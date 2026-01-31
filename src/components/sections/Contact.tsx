import React from 'react';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-preview glass-card">
          <div className="contact-content">
            <h2>Ready to start your project?</h2>
            <p>Contact us today for custom designs and bulk orders. Our team is ready to assist you.</p>
            <div className="contact-info">
              <div className="contact-item">
                <div className="icon"><Phone size={20} /></div>
                <div>
                  <span className="label">Call us</span>
                  <span className="value">+1 (555) 123-4567</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon"><Mail size={20} /></div>
                <div>
                  <span className="label">Email us</span>
                  <span className="value">hello@engraverpro.com</span>
                </div>
              </div>
            </div>
            <button className="btn-primary contact-cta">
              Send a Message <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
