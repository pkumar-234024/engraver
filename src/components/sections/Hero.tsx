import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero: React.FC = () => {
  return (
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
          <a href="#about" className="btn-secondary">Learn More</a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
