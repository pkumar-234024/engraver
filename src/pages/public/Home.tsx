import React, { useEffect } from 'react';
import Hero from '../../components/sections/Hero';
import ProductGallery from '../../components/sections/ProductGallery';
import About from '../../components/sections/About';
import Contact from '../../components/sections/Contact';

const Home: React.FC = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <ProductGallery />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
