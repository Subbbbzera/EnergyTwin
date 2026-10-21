import { useCallback, useState } from 'react';
import { Menu, Zap } from 'lucide-react';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Simulation } from './pages/Simulation';
import { FeedbackModal } from './components/feedback/FeedbackModal';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeFeedback = useCallback(() => setFeedbackOpen(false), []);

  return (
    <div className="flex flex-col lg:flex-row h-dvh bg-et-bg text-et-text overflow-hidden">
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-et-border shrink-0">
        <button onClick={() => setMenuOpen(true)} aria-label="Відкрити меню" className="text-et-muted hover:text-et-text transition-colors">
          <Menu size={22} />
        </button>
        <div className="w-7 h-7 rounded bg-et-accent text-et-bg flex items-center justify-center">
          <Zap size={16} fill="currentColor" />
        </div>
        <span className="font-space font-bold text-et-text">EnergyTwin</span>
      </div>

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onFeedbackClick={() => setFeedbackOpen(true)}
        mobileOpen={menuOpen}
        onMobileClose={() => setMenuOpen(false)}
      />
      {feedbackOpen && <FeedbackModal page={activeTab} onClose={closeFeedback} />}
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'simulation' && <Simulation />}

      {activeTab !== 'dashboard' && activeTab !== 'simulation' && (
        <div className="flex-1 flex items-center justify-center p-8 bg-et-bg">
          <div className="text-et-muted text-lg text-center">Розділ "{activeTab}" знаходиться в розробці...</div>
        </div>
      )}
    </div>
  );
}

export default App;
