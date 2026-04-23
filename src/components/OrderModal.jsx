import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bike, Store, ShoppingBag, Send, MapPin, Hash, CreditCard, Wallet, Banknote, Loader2 } from 'lucide-react';
import { SHIPPING_RATES, DEFAULT_SHIPPING, normalizeString } from '../constants/shipping';

const OrderModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [order, setOrder] = useState({
    type: '', 
    quantity: 1,
    address: '',
    cep: '',
    number: '',
    neighborhood: '',
    shippingFee: 0,
    paymentMethod: ''
  });

  if (!isOpen) return null;

  const PRICE_PER_UNIT = 8;

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleCEPChange = async (cep) => {
    const cleanCEP = cep.replace(/\D/g, '');
    setOrder({ ...order, cep: cleanCEP });

    if (cleanCEP.length === 8) {
      setIsFetching(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          const normalizedBairro = normalizeString(data.bairro);
          const fee = SHIPPING_RATES[normalizedBairro] || DEFAULT_SHIPPING;
          
          setOrder(prev => ({
            ...prev,
            neighborhood: data.bairro,
            address: data.logradouro,
            shippingFee: fee
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      } finally {
        setIsFetching(false);
      }
    }
  };

  const handleFinish = () => {
    const totalItems = order.quantity * PRICE_PER_UNIT;
    const totalOrder = totalItems + order.shippingFee;
    
    // Usando Unicode Escapes para evitar erros de encoding (diamantes com ?)
    const emojiMap = {
      pin: '\u{1F4CD}',
      home: '\u{1F3E0}',
      mailbox: '\u{1F4EB}',
      truck: '\u{1F69A}',
      store: '\u{1F3EA}',
      box: '\u{1F4E6}',
      money: '\u{1F4B0}',
      card: '\u{1F4B3}',
      check: '\u{2705}'
    };

    const addressStr = order.type === 'delivery' 
      ? `%0A${emojiMap.pin} Endereço: ${order.address}, n ${order.number}%0A${emojiMap.home} Bairro: ${order.neighborhood}%0A${emojiMap.mailbox} CEP: ${order.cep}%0A${emojiMap.truck} Frete: R$ ${order.shippingFee.toFixed(2)}`
      : `%0A${emojiMap.store} Tipo: Retirada no local`;
    
    const message = `Olá! Gostaria de fazer um pedido do Sanduba Fit:%0A%0A${emojiMap.box} Quantidade: ${order.quantity} unidades%0A${emojiMap.money} Valor dos produtos: R$ ${totalItems.toFixed(2)}${addressStr}%0A${emojiMap.card} Pagamento: ${order.paymentMethod}%0A%0A${emojiMap.check} *TOTAL FINAL: R$ ${totalOrder.toFixed(2)}*`;
    
    window.open(`https://api.whatsapp.com/send?phone=5598991046622&text=${message}`, '_blank');
    onClose();
  };

  const getStepTitle = () => {
    switch(step) {
      case 1: return 'Como quer receber?';
      case 2: return 'Onde entregamos?';
      case 3: return 'Quantas unidades?';
      case 4: return 'Qual a forma de pagamento?';
      default: return '';
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div 
          className="modal-content"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>{getStepTitle()}</h2>
            <button className="close-btn" onClick={onClose}><X /></button>
          </div>

          <div className="modal-body">
            {step === 1 && (
              <div className="options-grid">
                <button className={`option-card ${order.type === 'delivery' ? 'active' : ''}`} onClick={() => { setOrder({...order, type: 'delivery'}); nextStep(); }}>
                  <Bike size={32} />
                  <span>Entrega</span>
                  <small>Levamos até você</small>
                </button>
                <button className={`option-card ${order.type === 'pickup' ? 'active' : ''}`} onClick={() => { setOrder({...order, type: 'pickup', shippingFee: 0}); setStep(3); }}>
                  <Store size={32} />
                  <span>Retirada</span>
                  <small>Venha buscar</small>
                </button>
              </div>
            )}

            {step === 2 && order.type === 'delivery' && (
              <div className="form-container">
                <div className="form-row">
                  <div className="input-group">
                    <MapPin size={18} />
                    <input 
                      type="text" 
                      placeholder="CEP" 
                      maxLength={9}
                      value={order.cep} 
                      onChange={(e) => handleCEPChange(e.target.value)} 
                    />
                    {isFetching && <Loader2 size={16} className="animate-spin" />}
                  </div>
                  <div className="input-group">
                    <Hash size={18} />
                    <input type="text" placeholder="Número" value={order.number} onChange={(e) => setOrder({...order, number: e.target.value})} />
                  </div>
                </div>
                <div className="input-group">
                  <MapPin size={18} />
                  <input type="text" placeholder="Endereço (Rua/Avenida)" value={order.address} onChange={(e) => setOrder({...order, address: e.target.value})} />
                </div>
                <div className="input-group">
                  <MapPin size={18} />
                  <input type="text" placeholder="Bairro" value={order.neighborhood} onChange={(e) => setOrder({...order, neighborhood: e.target.value})} />
                </div>
                {order.neighborhood && (
                  <p className="shipping-badge">Frete para este bairro: <strong>R$ {order.shippingFee.toFixed(2)}</strong></p>
                )}
                <button className="next-btn" onClick={nextStep} disabled={!order.address || !order.number}>Continuar</button>
              </div>
            )}

            {step === 3 && (
              <div className="quantity-container">
                <div className="quantity-selector">
                  <button onClick={() => setOrder({...order, quantity: Math.max(1, order.quantity - 1)})}>-</button>
                  <span className="qty-value">{order.quantity}</span>
                  <button onClick={() => setOrder({...order, quantity: order.quantity + 1})}>+</button>
                </div>
                <div className="summary-box">
                  <div className="summary-line">
                    <span>{order.quantity}x Sanduba Fit</span>
                    <span>R$ {(order.quantity * PRICE_PER_UNIT).toFixed(2)}</span>
                  </div>
                  {order.type === 'delivery' && (
                    <div className="summary-line">
                      <span>Taxa de Entrega</span>
                      <span>R$ {order.shippingFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="summary-line total">
                    <span>Total</span>
                    <span>R$ {(order.quantity * PRICE_PER_UNIT + order.shippingFee).toFixed(2)}</span>
                  </div>
                </div>
                <button className="next-btn" onClick={nextStep}>Ir para Pagamento</button>
                <button className="back-link" onClick={() => order.type === 'delivery' ? setStep(2) : setStep(1)}>Voltar</button>
              </div>
            )}

            {step === 4 && (
              <div className="payment-grid">
                <button className={`option-card ${order.paymentMethod === 'Pix' ? 'active' : ''}`} onClick={() => setOrder({...order, paymentMethod: 'Pix'})}>
                  <Wallet size={28} />
                  <span>Pix</span>
                </button>
                <button className={`option-card ${order.paymentMethod === 'Cartão' ? 'active' : ''}`} onClick={() => setOrder({...order, paymentMethod: 'Cartão'})}>
                  <CreditCard size={28} />
                  <span>Cartão</span>
                </button>
                <button className={`option-card ${order.paymentMethod === 'Dinheiro' ? 'active' : ''}`} onClick={() => setOrder({...order, paymentMethod: 'Dinheiro'})}>
                  <Banknote size={28} />
                  <span>Dinheiro</span>
                </button>
                <button 
                  className="finish-btn" 
                  onClick={handleFinish}
                  disabled={!order.paymentMethod}
                >
                  Finalizar Pedido <Send size={18} />
                </button>
                <button className="back-link" onClick={() => setStep(3)}>Voltar</button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx="true">{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .shipping-badge {
          font-size: 0.85rem;
          color: var(--primary);
          background: rgba(30, 57, 42, 0.05);
          padding: 10px 15px;
          border-radius: 12px;
          text-align: center;
        }

        .summary-box {
          width: 100%;
          background: white;
          padding: 20px;
          border-radius: 20px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .summary-line {
          display: flex;
          justify-content: space-between;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .summary-line.total {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px dashed var(--border);
          color: var(--primary);
          font-weight: 800;
          font-size: 1.1rem;
        }

        .payment-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        
        .payment-grid .option-card {
          padding: 20px 10px;
        }

        .payment-grid .finish-btn {
          grid-column: span 3;
        }

        .option-card.active {
          border-color: var(--primary);
          background: rgba(30, 57, 42, 0.05);
        }

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
          min-height: 400px;
          display: flex;
          flex-direction: column;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .modal-header h2 {
          color: var(--primary);
          font-size: 1.3rem;
          font-weight: 800;
        }
        .close-btn {
          background: #eee;
          border: none;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
        }
        .options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .option-card {
          background: white;
          border: 2px solid transparent;
          padding: 30px 20px;
          border-radius: 25px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: var(--shadow-sm);
        }
        .option-card:hover {
          border-color: var(--secondary);
          transform: translateY(-5px);
        }
        .option-card span {
          font-weight: 800;
          color: var(--primary);
          font-size: 1.1rem;
        }
        .option-card small {
          color: var(--text-muted);
          font-size: 0.75rem;
        }
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .input-group {
          background: white;
          border: 1px solid var(--border);
          border-radius: 15px;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--secondary);
        }
        .input-group input {
          border: none;
          outline: none;
          width: 100%;
          font-family: inherit;
          font-size: 0.95rem;
          background: transparent;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        .next-btn, .finish-btn {
          background: var(--primary);
          color: white;
          border: none;
          padding: 18px;
          border-radius: 20px;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          transition: var(--transition);
        }
        .next-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .quantity-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 25px;
          padding-top: 10px;
        }
        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 30px;
          background: white;
          padding: 10px 30px;
          border-radius: 100px;
          box-shadow: var(--shadow-md);
        }
        .quantity-selector button {
          background: var(--primary);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: 800;
          cursor: pointer;
        }
        .qty-value {
          font-size: 2rem;
          font-weight: 900;
          color: var(--primary);
          min-width: 40px;
          text-align: center;
        }
        .price-summary {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          color: var(--secondary);
          font-size: 1.2rem;
        }
        .delivery-note {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
          text-align: center;
          font-style: italic;
          margin: -10px 0 10px;
        }
        .finish-btn {
          width: 100%;
          background: #25D366; /* WhatsApp Green */
        }
        .back-link {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.9rem;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default OrderModal;
