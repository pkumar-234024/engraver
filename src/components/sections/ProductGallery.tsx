import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProductGallery.css';

const ProductGallery: React.FC = () => {
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
    <section id="work" className="showcase">
      <div className="container">
        <div className="section-header">
          <h2>Our Collection</h2>
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
  );
};

export default ProductGallery;
