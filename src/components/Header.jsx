import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="main-header glass">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="header-content"
      >
        <div className="logo-box">
          <h1 className="logo-text">
            SANDUBA<span className="logo-accent">FIT</span>
          </h1>
          <div className="logo-line" />
        </div>
      </motion.div>
    </header>
  );
};

export default Header;

