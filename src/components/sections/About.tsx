import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Heart } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-title text-center">
          <span className="subtitle">Our Story</span>
          <h2>Crafting Excellence Since 2010</h2>
        </div>
        
        <div className="about-grid">
          <motion.div 
            whileHover={{ translateY: -10 }}
            className="about-card glass-card"
          >
            <div className="card-icon"><Award size={32} /></div>
            <h3>Quality Material</h3>
            <p>We use only premium brass, acrylic, and wood for all our engraving projects to ensure durability.</p>
          </motion.div>

          <motion.div 
            whileHover={{ translateY: -10 }}
            className="about-card glass-card"
          >
            <div className="card-icon"><Zap size={32} /></div>
            <h3>Laser Precision</h3>
            <p>Our state-of-the-art laser technology allows for incredibly fine details and clean cuts on every surface.</p>
          </motion.div>

          <motion.div 
            whileHover={{ translateY: -10 }}
            className="about-card glass-card"
          >
            <div className="card-icon"><Heart size={32} /></div>
            <h3>Custom Care</h3>
            <p>Every piece is custom-made to your specifications with meticulous attention to detail and customer satisfaction.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
