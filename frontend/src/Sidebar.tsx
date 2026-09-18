import { Zap, LayoutDashboard, Server, Activity, Sliders, Info, List, Bell, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'equipment', label: 'Техніка', icon: Server },
    { id: 'profile', label: 'Енергопрофіль', icon: Activity },
    { id: 'simulation', label: 'Симулятор', icon: Sliders },
    { id: 'recommendations', label: 'Рекомендації', icon: Info },
    { id: 'catalog', label: 'Каталог', icon: List },
    { id: 'alerts', label: 'Сповіщення', icon: Bell, badge: 3 },
    { id: 'settings', label: 'Налаштування', icon: Settings },
  ];

  return (
    <aside className="w-[216px] h-screen border-r border-et-border bg-et-bg flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-et-accent text-et-bg flex items-center justify-center">
          <Zap size={20} fill="currentColor" />
        </div>
        <span className="font-space font-bold text-lg text-et-text">EnergyTwin</span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-colors text-sm font-medium ${
                isActive 
                  ? 'bg-et-accent/12 text-et-accent' 
                  : 'text-et-muted hover:text-et-text hover:bg-et-card'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-et-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-et-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-et-block flex items-center justify-center text-et-muted overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium text-et-text">Мій профіль</span>
            <span className="text-xs text-et-muted">Профіль на 60%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
