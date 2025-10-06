import React, { useState } from 'react';
import axios from 'axios';
import { Item } from '../types';

const InventoryForm: React.FC = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Omit<Item, 'id'> = { name, quantity, location };
    await axios.post(`${process.env.REACT_APP_API_URL}/items`, newItem);
    setName('');
    setQuantity(0);
    setLocation('');
    window.location.reload(); // Refresh to update list
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />
      <input
        type="text"
        placeholder="Location (optional)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default InventoryForm;
