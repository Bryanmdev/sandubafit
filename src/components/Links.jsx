import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Camera, ChevronRight, Leaf, ShoppingBag, Info } from 'lucide-react';

const Links = ({ onOrderClick, onDetailsClick }) => {
  return (
    <section className="section-padding">
      <div className="links-container">
        <motion.button
          onClick={onOrderClick}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="link-card main-cta"
        >
          <div className="link-icon-box" style={{ backgroundColor: 'var(--primary)' }}>
            <ShoppingBag size={28} />
          </div>
          <div className="link-text">
            <span className="link-title">Fazer Pedido</span>
            <span className="link-subtitle">Entrega ou retirada no local</span>
          </div>
          <ChevronRight className="chevron" size={20} />
        </motion.button>

        <motion.button
          onClick={onDetailsClick}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="link-card"
        >
          <div className="link-icon-box" style={{ backgroundColor: 'var(--secondary)' }}>
            <Info size={28} />
          </div>
          <div className="link-text">
            <span className="link-title">Segredos do Sanduba</span>
            <span className="link-subtitle">Calorias, Benefícios e Receita</span>
          </div>
          <ChevronRight className="chevron" size={20} />
        </motion.button>

        <motion.a
          href="https://instagram.com/_sandubafit"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="link-card"
        >
          <div className="link-icon-box" style={{ backgroundColor: '#E4405F' }}>
            <Camera size={28} />
          </div>
          <div className="link-text">
            <span className="link-title">Instagram</span>
            <span className="link-subtitle">@_sandubafit</span>
          </div>
          <ChevronRight className="chevron" size={20} />
        </motion.a>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="about-mini-card"
        >
          <div className="about-header">
            <Leaf size={20} className="leaf-icon" />
            <h3>Nossa Essência</h3>
          </div>
          <p>Sanduíche natural de verdade com ingredientes premium. Para quem busca sabor e saúde em cada mordida.</p>
        </motion.div>
      </div>

    </section>
  );
};

export default Links;

