import React, { useState, useEffect } from 'react';
import Button from './Button';

function AddItem({ onAddItem }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener los productos de la API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Aquí usamos la API definida en la evaluación
        const response = await fetch('https://front2.nsideas.cl/api/products');
        
        if (!response.ok) {
          throw new Error('No se pudieron cargar los productos');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedProduct) {
      alert('Por favor selecciona un producto');
      return;
    }

    // Buscar el producto seleccionado en la lista
    const product = products.find(prod => prod.id === parseInt(selectedProduct));
    
    if (product) {
      // Crear el objeto para el nuevo item
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: parseInt(quantity),
        total: product.price * parseInt(quantity)
      };
      
      // Llamar a la función que recibimos como prop
      onAddItem(newItem);
      
      // Limpiar el formulario
      setSelectedProduct('');
      setQuantity(1);
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="add-item">
      <h2>Agregar producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product">Producto:</label>
          <select 
            id="product"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">Selecciona un producto</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="quantity">Cantidad:</label>
          <input 
            type="number" 
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        
        <Button text="Agregar a la lista" type="submit" />
      </form>
    </div>
  );
}

export default AddItem;