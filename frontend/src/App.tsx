import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Simulation } from './pages/Simulation';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-et-bg text-et-text overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'simulation' && <Simulation />}
      
      {activeTab !== 'dashboard' && activeTab !== 'simulation' && (
        <div className="flex-1 flex items-center justify-center p-8 bg-et-bg">
          <div className="text-et-muted text-lg">Розділ "{activeTab}" знаходиться в розробці...</div>
        </div>
      )}
    </div>
  );
}

export default App;
