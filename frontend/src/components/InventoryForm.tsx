import React, { useState } from 'react';
import { inventoryAPI, Item } from '../services/api'; // Import from api.ts
import './InventoryForm.css';

interface InventoryFormProps {
  onItemAdded: () => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ onItemAdded }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!name.trim()) {
        throw new Error('Item name is required');
      }
      if (quantity < 0) {
        throw new Error('Quantity cannot be negative');
      }

      const newItem: Omit<Item, 'id'> = { 
        name: name.trim(), 
        quantity, 
        location: location.trim() 
      };
      
      await inventoryAPI.addItem(newItem);
      
      setName('');
      setQuantity(0);
      setLocation('');
      onItemAdded();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inventory-form">
      <h2>Add New Item</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Item Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <input
            type="number"
            placeholder="Quantity *"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="0"
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Item'}
        </button>
      </form>
    </div>
  );
};

export default InventoryForm;
