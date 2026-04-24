import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Target, Zap, UtensilsCrossed } from 'lucide-react';

const DetailsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="modal-content"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>Segredos do Sanduba</h2>
            <button className="close-btn" onClick={onClose}><X /></button>
          </div>

          <div className="modal-scroll">
            <div className="info-grid">
              <div className="info-item">
                <Flame className="icon" />
                <span className="info-label">Calorias</span>
                <span className="info-value">300 a 350 kcal</span>
              </div>
              <div className="info-item">
                <Target className="icon" />
                <span className="info-label">Proteínas</span>
                <span className="info-value">~24g (por sanduba)</span>
              </div>
              <div className="info-item">
                <Zap className="icon" />
                <span className="info-label">Gorduras</span>
                <span className="info-value">Baixo Teor</span>
              </div>
            </div>

            <div className="details-section">
              <h3><UtensilsCrossed size={18} /> Ingredientes Selecionados</h3>
              <p>Pão integral (36%), filé de frango desfiado, requeijão light, milho verde e cenoura ralada.</p>
            </div>

            <div className="details-section">
              <h3>✨ Benefícios</h3>
              <ul className="benefits-list">
                <li>Prático e ideal para o dia a dia</li>
                <li>Satisfaz a fome sem pesar</li>
                <li>Baixo custo para uma refeição completa e saudável</li>
                <li>Opção mais leve comparada a lanches tradicionais</li>
                <li>Sabor de verdade, sem culpa!</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx="true">{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          z-index: 200;
          display: flex;
          align-items: flex-end;
        }
        .modal-content {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          background: var(--bg);
          border-radius: 40px 40px 0 0;
          padding: 30px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 -10px 40px rgba(0,0,0,0.1);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }
        .modal-header h2 {
          color: var(--primary);
          font-size: 1.5rem;
        }
        .close-btn {
          background: #eee;
          border: none;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          color: var(--primary);
        }
        .modal-scroll {
          overflow-y: auto;
          padding-bottom: 20px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 30px;
        }
        .info-item {
          background: white;
          padding: 15px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: var(--shadow-sm);
        }
        .info-item .icon {
          color: var(--secondary);
          margin-bottom: 8px;
        }
        .info-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }
        .info-value {
          font-size: 1rem;
          font-weight: 800;
          color: var(--primary);
        }
        .details-section {
          margin-bottom: 25px;
        }
        .details-section h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.1rem;
          color: var(--primary);
          margin-bottom: 10px;
        }
        .details-section p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }
        .benefits-list {
          list-style: none;
        }
        .benefits-list li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 8px;
          color: var(--text-muted);
          font-size: 0.95rem;
        }
        .benefits-list li::before {
          content: "✔";
          position: absolute;
          left: 0;
          color: var(--secondary);
          font-weight: bold;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default DetailsModal;
