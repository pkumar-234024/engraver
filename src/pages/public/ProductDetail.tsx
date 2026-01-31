import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { ArrowLeft, Phone, Calendar, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) => 
    state.products.items.find(p => p.id === id)
  );

  if (!product) {
    return (
      <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>Back to Showcase</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page container">
      <Link to="/" className="back-link">
        <ArrowLeft size={20} /> Back to Showcase
      </Link>

      <div className="detail-grid">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="detail-image"
        >
          <img src={product.imageUrl} alt={product.name} className="glass-card" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="detail-content"
        >
          <span className="category-tag">Custom Engraving</span>
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <div className="price-tag">${product.price}</div>
          
          <div className="full-details glass-card">
            <h3>Product Specification</h3>
            <p>{product.details}</p>
          </div>

          <div className="features-list">
            <div className="feature-item">
              <ShieldCheck size={20} className="feature-icon" />
              <span>Durable & Weather Resistant</span>
            </div>
            <div className="feature-item">
              <Calendar size={20} className="feature-icon" />
              <span>3-5 Days Turnaround</span>
            </div>
          </div>

          <div className="action-buttons">
            <a href="tel:+15551234567" className="btn-primary order-btn">
              <Phone size={18} /> Call to Discuss
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
