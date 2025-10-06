import React, { useState, useEffect } from 'react';
import { inventoryAPI, Item } from '../services/api'; // Import from api.ts
import './InventoryList.css';

const InventoryList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Item>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const itemsData = await inventoryAPI.getItems();
      setItems(itemsData);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (item: Item) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleUpdate = async (id: number) => {
    try {
      setError(null);
      await inventoryAPI.updateItem(id, editForm);
      setEditingId(null);
      fetchItems();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update item');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      setError(null);
      await inventoryAPI.deleteItem(id);
      fetchItems();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete item');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  if (loading) {
    return <div className="loading">Loading inventory...</div>;
  }

  return (
    <div className="inventory-list">
      <h2>Inventory Items</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {items.length === 0 ? (
        <div className="no-items">No items in inventory</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  {editingId === item.id ? (
                    <input
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={editForm.quantity || 0}
                      onChange={(e) => setEditForm({ ...editForm, quantity: Number(e.target.value) })}
                      min="0"
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <input
                      value={editForm.location || ''}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    />
                  ) : (
                    item.location || '-'
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <div className="action-buttons">
                      <button onClick={() => handleUpdate(item.id)} className="save-btn">
                        Save
                      </button>
                      <button onClick={cancelEdit} className="cancel-btn">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(item)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="delete-btn">
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryList;
