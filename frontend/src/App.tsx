import React, { useState } from 'react';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';
import './App.css';

const App: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleItemAdded = () => {
    // This will trigger InventoryList to refresh
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Warehouse Inventory Tracker</h1>
      </header>
      
      <main className="App-main">
        <InventoryForm onItemAdded={handleItemAdded} />
        <InventoryList key={refreshTrigger} />
      </main>
    </div>
  );
};

export default App;
