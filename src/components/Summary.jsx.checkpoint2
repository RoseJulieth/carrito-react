import React, { useState } from 'react';
import Button from './Button';

function Summary({ items, onNameChange, onComplete }) {
  const [customerName, setCustomerName] = useState('');

  // Calcular el total de la compra
  const total = items.reduce((sum, item) => sum + item.total, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNameChange(customerName);
    onComplete();
  };

  return (
    <div className="summary">
      <h2>Resumen de compra</h2>
      
      <div className="items-summary">
        <h3>Productos:</h3>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} ({item.quantity}) - ${item.total}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="total">
        <h3>Total: ${total}</h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tu nombre:</label>
          <input 
            type="text" 
            id="name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        
        <Button text="Continuar" type="submit" />
      </form>
    </div>
  );
}

export default Summary;