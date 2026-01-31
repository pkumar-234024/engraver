import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const categories = useSelector((state: RootState) => state.categories.items);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || product.categoryId === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, activeCategory]);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-title"
          >
            Precision Engraving for <span className="gradient-text">Your Vision</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-subtitle"
          >
            From custom name plates to professional stamps and poster designs. 
            We bring your ideas to life with laser precision.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hero-actions"
          >
            <a href="#work" className="btn-primary">View Our Work</a>
            <a href="#contact" className="btn-secondary">Get in Touch</a>
          </motion.div>
        </div>
      </section>

      <section id="work" className="showcase">
        <div className="container">
          <div className="section-header">
            <h2>Our Gallery</h2>
            <div className="search-gallery glass-card">
              <Search size={20} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="gallery-controls">
            <button 
              className={`filter-badge ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Work
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id} 
                className={`filter-badge ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <motion.div layout className="product-grid">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="product-card glass-card"
                >
                  <div className="product-image">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-footer">
                      <span className="price">${product.price}</span>
                      <Link to={`/product/${product.id}`} className="view-details">
                        View Details <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProducts.length === 0 && (
            <div className="no-results">
              <p>No engraving projects found matching your search.</p>
              <button className="btn-secondary" onClick={() => {setSearchTerm(''); setActiveCategory('all');}}>Clear Filters</button>
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="contact-preview glass-card container">
        <div className="contact-content">
          <h2>Ready to start your project?</h2>
          <p>Contact us today for custom designs and bulk orders.</p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="label">Call us at</span>
              <span className="value">+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <span className="label">Email us</span>
              <span className="value">hello@engraverpro.com</span>
            </div>
          </div>
          <button className="btn-primary">Send a Message <ArrowRight size={18} /></button>
        </div>
      </section>
    </div>
  );
};

export default Home;
