import React from 'react';
import { ArrowRight, Phone, Mail, Clock } from 'lucide-react';
import { siteConfig } from '../../config/site';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-preview glass-card">
          <div className="contact-content">
            <span className="subtitle">Ready to Start?</span>
            <h2>Let's Create Something <span className="gradient-text">Unique</span></h2>
            <p>Get in touch with us for quotes, material consultations, or custom design requests. We're here to bring your vision to life.</p>
            
            <div className="contact-info">
              <div className="contact-item">
                <div className="icon"><Phone size={24} /></div>
                <div>
                  <span className="label">Call Us</span>
                  <span className="value">{siteConfig.contact.phone}</span>
                  {siteConfig.contact.alternatePhone && (
                    <span className="value" style={{ fontSize: '0.9rem', opacity: 0.8 }}>{siteConfig.contact.alternatePhone}</span>
                  )}
                </div>
              </div>
              <div className="contact-item">
                <div className="icon"><Mail size={24} /></div>
                <div>
                  <span className="label">Email Address</span>
                  <span className="value">{siteConfig.contact.email}</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon"><Clock size={24} /></div>
                <div>
                  <span className="label">Working Hours</span>
                  <span className="value">{siteConfig.contact.workingHours}</span>
                </div>
              </div>
            </div>

            <a href={`mailto:${siteConfig.contact.email}`} className="btn-primary contact-cta">
              Send a Message <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
