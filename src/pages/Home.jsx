import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddItem from '../components/AddItem';
import ItemList from '../components/ItemList';
import Button from '../components/Button';

function Home() {
  const [items, setItems] = useState([]);

  // Cargar items del localStorage al iniciar
  useEffect(() => {
    const savedItems = localStorage.getItem('shoppingItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Guardar items en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('shoppingItems', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (newItem) => {
    // Verificar si el producto ya está en la lista
    const existingItemIndex = items.findIndex(item => item.id === newItem.id);
    
    if (existingItemIndex >= 0) {
      // Si ya existe, actualizar la cantidad y el total
      const updatedItems = [...items];
      const existingItem = updatedItems[existingItemIndex];
      
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + newItem.quantity,
        total: existingItem.total + newItem.total
      };
      
      setItems(updatedItems);
    } else {
      // Si no existe, agregar el nuevo item
      setItems([...items, newItem]);
    }
  };

  const handleDeleteItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  return (
    <div className="home-page">
      <AddItem onAddItem={handleAddItem} />
      <ItemList items={items} onDeleteItem={handleDeleteItem} />
      
      {items.length > 0 && (
        <div className="checkout-action">
          <Link to="/checkout">
            <Button text="Ir al resumen" className="btn-primary" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;