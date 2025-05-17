import React from 'react';
import Button from './Button';

function ItemList({ items, onDeleteItem }) {
  if (items.length === 0) {
    return <p>No hay productos en la lista. Agrega algunos.</p>;
  }

  return (
    <div className="item-list">
      <h2>Productos en tu lista</h2>
      <ul>
        {items.map(item => (
          <li key={item.id} className="item">
            <div className="item-info">
              <span className="item-name">{item.name}</span>
              <span className="item-details">
                {item.quantity} x ${item.price} = ${item.total}
              </span>
            </div>
            <Button 
              text="Eliminar" 
              onClick={() => onDeleteItem(item.id)} 
              className="btn-delete"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;