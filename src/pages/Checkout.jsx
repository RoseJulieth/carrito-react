import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Summary from '../components/Summary';
import SavePurchase from '../components/SavePurchase';
import Button from '../components/Button';

function Checkout() {
  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [step, setStep] = useState(1); // 1: resumen, 2: guardar compra
  const navigate = useNavigate();

  // Calcular el total de la compra
  const total = items.reduce((sum, item) => sum + item.total, 0);

  // Cargar items del localStorage al iniciar
  useEffect(() => {
    const savedItems = localStorage.getItem('shoppingItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      // Si no hay items, redirigir a la página principal
      navigate('/');
    }
  }, [navigate]);

  const handleNameChange = (name) => {
    setCustomerName(name);
  };

  const handleCompleteStep1 = () => {
    setStep(2);
  };

  const handlePurchaseSuccess = () => {
    // Limpiar localStorage
    localStorage.removeItem('shoppingItems');
    
    // Esperar un poco y luego redirigir a la página principal
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="checkout-page">
      {step === 1 ? (
        <Summary 
          items={items} 
          onNameChange={handleNameChange}
          onComplete={handleCompleteStep1}
        />
      ) : (
        <SavePurchase 
          customerName={customerName}
          total={total}
          onSuccess={handlePurchaseSuccess}
        />
      )}
      
      <div className="navigation-buttons">
        <Link to="/">
          <Button text="Volver a la lista" className="btn-secondary" />
        </Link>
      </div>
    </div>
  );
}

export default Checkout;