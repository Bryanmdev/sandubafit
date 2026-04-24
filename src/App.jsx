import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Links from './components/Links';
import OrderModal from './components/OrderModal';
import DetailsModal from './components/DetailsModal';

function App() {
  const [loading, setLoading] = useState(true);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="app-container">
      <AnimatePresence>
        {loading && (
          <motion.div 
            key="loader"
            exit={{ opacity: 0 }}
            className="loader-overlay"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="loader-content"
            >
              <h1>SANDUBA<span>FIT</span></h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
          <Hero />
          <Links 
            onOrderClick={() => setIsOrderOpen(true)}
            onDetailsClick={() => setIsDetailsOpen(true)}
          />
          <footer className="main-footer">
            <p>&copy; 2024 Sanduba Fit. Qualidade Premium.</p>
            <p style={{ marginTop: '10px' }}>
              Desenvolvido por <a href="https://portfolio-bryandev.vercel.app/pt" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: '600', opacity: 1 }}>Bryan M</a>
            </p>
          </footer>
        </motion.div>
      )}

      <OrderModal isOpen={isOrderOpen} onClose={() => setIsOrderOpen(false)} />
      <DetailsModal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />

    </div>
  );
}

export default App;

