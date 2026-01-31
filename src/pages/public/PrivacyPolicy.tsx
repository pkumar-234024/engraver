import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import type { RootState } from '../../app/store';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  const site = useSelector((state: RootState) => state.site);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-page container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="privacy-header"
      >
        <span className="subtitle">Trust & Safety</span>
        <h1>Privacy Policy</h1>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
      </motion.div>

      <div className="privacy-grid">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="privacy-content glass-card"
        >
          <section>
            <div className="section-title">
              <Eye size={24} className="icon" />
              <h2>Information We Collect</h2>
            </div>
            <p>At {site.name}, we collect information you provide directly to us when you request a quote, place an order, or contact us for support. This includes:</p>
            <ul>
              <li>Name, email address, and phone number.</li>
              <li>Shipping and billing addresses.</li>
              <li>Design files and engraving specifications provided for custom work.</li>
            </ul>
          </section>

          <section>
            <div className="section-title">
              <Lock size={24} className="icon" />
              <h2>How We Use Your Data</h2>
            </div>
            <p>We use the collected information to:</p>
            <ul>
              <li>Process and fulfill your engraving orders.</li>
              <li>Communicate with you regarding your designs and project status.</li>
              <li>Send occasional promotional updates (only if you opt-in).</li>
              <li>Improve our website and customer service.</li>
            </ul>
          </section>

          <section>
            <div className="section-title">
              <Shield size={24} className="icon" />
              <h2>Data Protection</h2>
            </div>
            <p>We implement industry-standard security measures to maintain the safety of your personal information. Your design files are stored securely and are only accessible by personnel involved in the production of your order.</p>
          </section>

          <section>
            <div className="section-title">
              <FileText size={24} className="icon" />
              <h2>Your Rights</h2>
            </div>
            <p>You have the right to request access to the personal data we hold about you, to request corrections, or to ask for your data to be deleted from our records by contacting us at {site.contact.email}.</p>
          </section>
        </motion.div>

        <motion.aside 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="privacy-sidebar"
        >
          <div className="contact-card glass-card">
            <h3>Questions?</h3>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="sidebar-contact">
              <li><strong>Email:</strong> {site.contact.email}</li>
              <li><strong>Phone:</strong> {site.contact.phone}</li>
              <li><strong>Address:</strong><br />{site.contact.address}</li>
            </ul>
          </div>
        </motion.aside>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
