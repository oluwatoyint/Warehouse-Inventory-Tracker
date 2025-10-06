import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Item } from '../types';

const InventoryList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Item>>({});

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/items`);
      setItems(response.data);
    };
    fetchItems();
  }, []);

  const handleEdit = (item: Item) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleUpdate = async (id: number) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/items/${id}`, editForm);
    setEditingId(null);
    window.location.reload();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/items/${id}`);
    window.location.reload();
  };

  return (
    <div>
      <h2>Inventory</h2>
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
                  item.location
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <button onClick={() => handleUpdate(item.id)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
