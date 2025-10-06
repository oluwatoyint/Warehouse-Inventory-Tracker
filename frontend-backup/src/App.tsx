import React from 'react';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Warehouse Inventory Tracker</h1>
      <InventoryForm />
      <InventoryList />
    </div>
  );
};

export default App;
