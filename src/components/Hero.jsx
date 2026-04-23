import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="hero-section">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="hero-image-wrapper"
      >
        <img src="/hero.png" alt="Natural Sandwich" className="hero-image" />
        <div className="hero-overlay" />
      </motion.div>

      <div className="hero-content">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="hero-badge"
        >
          100% Ingredientes Naturais
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="hero-title"
        >
          Sabor de verdade, <br />
          <span>sem culpa.</span>
        </motion.h2>
      </div>
    </section>
  );
};

export default Hero;

