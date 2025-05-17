import React, { useState } from 'react';
import Button from './Button';

function SavePurchase({ customerName, total, onSuccess }) {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSavePurchase = async () => {
    if (!customerName) {
      setError('Por favor ingresa tu nombre primero');
      return;
    }

    setIsSaving(true);
    setMessage('');
    setError('');

    try {
      // Enviar los datos a la API
      const response = await fetch('https://front2.nsideas.cl/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: customerName,
          total: total
        })
      });

      if (!response.ok) {
        throw new Error('Error al guardar la compra');
      }

      const data = await response.json();
      setMessage('¡Compra guardada con éxito!');
      
      // Llamar a la función de éxito que limpia localStorage, etc.
      onSuccess();
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="save-purchase">
      <h2>Finalizar compra</h2>
      
      <div className="purchase-details">
        <p><strong>Nombre:</strong> {customerName}</p>
        <p><strong>Total:</strong> ${total}</p>
      </div>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      
      <Button 
        text={isSaving ? "Guardando..." : "Guardar compra"} 
        onClick={handleSavePurchase}
        className={isSaving ? "btn-disabled" : "btn-primary"}
        disabled={isSaving}
      />
    </div>
  );
}

export default SavePurchase;