import { ChevronDown, MapPin, Bell, ArrowRight } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="flex-1 overflow-auto bg-et-bg p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <h1 className="font-space font-semibold text-2xl text-et-text">Кав'ярня «Central»</h1>
            <ChevronDown size={20} className="text-et-muted" />
          </div>
          <div className="flex items-center gap-1.5 text-et-muted text-sm bg-et-block px-3 py-1.5 rounded-full">
            <MapPin size={14} />
            Тернопіль
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer text-et-muted hover:text-et-text">
            <Bell size={20} />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-et-danger text-white text-[10px] font-bold flex items-center justify-center rounded-full">3</span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-et-block cursor-pointer">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Red Banner */}
      <div className="bg-et-danger/10 border border-et-danger/45 rounded-2xl p-4 mb-6 flex justify-between items-center">
        <div>
          <div className="text-et-danger text-xs font-bold tracking-widest uppercase mb-1">НАСТУПНЕ ВІДКЛЮЧЕННЯ · СЬОГОДНІ</div>
          <div className="text-et-text text-sm">
            <span className="font-space font-semibold text-base mr-2">14:00–18:00 (4 години)</span>
            — резерву вистачить на 1 год 50 хв (розряд о 15:50)
          </div>
        </div>
        <button className="bg-et-accent text-et-bg font-medium px-5 py-2.5 rounded-[10px] flex items-center gap-2 hover:bg-[#F5B700]/90 transition-colors">
          Відкрити симулятор <ArrowRight size={18} />
        </button>
      </div>

      {/* 3 Cards Row */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Card 1 */}
        <div className="bg-et-card border border-et-border rounded-2xl p-6">
          <div className="text-et-muted text-xs font-bold tracking-widest uppercase mb-4">ENERGYTWIN SCORE</div>
          <div className="font-space font-bold text-[40px] text-et-accent leading-none mb-6">
            72<span className="text-2xl text-et-muted">/100</span>
          </div>
          <div className="space-y-3 mb-5">
            <div>
              <div className="flex justify-between text-xs mb-1.5"><span className="text-et-muted">Потужність</span><span className="font-space font-medium text-et-text">81</span></div>
              <div className="h-1.5 bg-et-block rounded-full overflow-hidden"><div className="h-full bg-et-accent rounded-full" style={{ width: '81%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5"><span className="text-et-muted">Автономність</span><span className="font-space font-medium text-et-text">58</span></div>
              <div className="h-1.5 bg-et-block rounded-full overflow-hidden"><div className="h-full bg-et-danger rounded-full" style={{ width: '58%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5"><span className="text-et-muted">Резерв</span><span className="font-space font-medium text-et-text">76</span></div>
              <div className="h-1.5 bg-et-block rounded-full overflow-hidden"><div className="h-full bg-et-accent rounded-full" style={{ width: '76%' }}></div></div>
            </div>
          </div>
          <div className="text-xs text-et-muted leading-tight">
            Головний ризик: автономність — резерв не покриває все відключення
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-et-card border border-et-border rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-et-muted text-xs font-bold tracking-widest uppercase mb-4">ФІНАНСОВІ ВТРАТИ ПРОСТОЮ</div>
            <div className="text-et-text text-sm mb-1">Втрати за це відключення</div>
            <div className="font-space font-bold text-[40px] text-et-danger leading-none mb-6">
              3 885 ₴
            </div>
          </div>
          <div className="space-y-2 bg-et-block rounded-[10px] p-4">
            <div className="flex justify-between text-sm">
              <span className="text-et-muted">Ціна 1 год простою</span>
              <span className="font-space font-medium text-et-text">1 850 ₴</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-et-muted">Прогноз на місяць</span>
              <span className="font-space font-medium text-et-text">46 620 ₴</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-et-card border border-et-border rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-et-muted text-xs font-bold tracking-widest uppercase mb-4">ПОТОЧНИЙ СТАН СИСТЕМИ</div>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-et-border">
                <span className="text-sm text-et-muted">Інвертор</span>
                <span className="font-space font-medium text-lg text-et-text">3.0 <span className="text-sm text-et-muted">кВт</span></span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-et-border">
                <span className="text-sm text-et-muted">Батарея</span>
                <span className="font-space font-medium text-lg text-et-text">2.0 <span className="text-sm text-et-muted">кВт·год</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-et-muted">Дефіцит енергії</span>
                <span className="font-space font-medium text-lg text-et-danger">2.4 <span className="text-sm opacity-80">кВт·год</span></span>
              </div>
            </div>
          </div>
          <div className="bg-et-danger/10 text-et-danger text-sm rounded-[10px] p-3 text-center border border-et-danger/20">
            Пуск кавомашини 3.6 кВт перевищує інвертор 3.0 кВт
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-[2fr_1fr] gap-6 min-h-[340px]">
        {/* Graph Card */}
        <div className="bg-et-card border border-et-border rounded-2xl p-6 relative flex flex-col">
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="text-et-muted text-xs font-bold tracking-widest uppercase">ДОБОВИЙ ПРОФІЛЬ НАВАНТАЖЕННЯ</div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-et-muted"></div><span className="text-et-muted">кВт</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-et-danger/40"></div><span className="text-et-muted">Відключення</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-et-danger"></div><span className="text-et-muted">Простій</span></div>
            </div>
          </div>

          <div className="flex-1 relative mt-4">
            {/* Y Axis labels */}
            <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-xs text-et-muted font-space pointer-events-none z-10">
              <span>6</span><span>4</span><span>2</span><span>0</span>
            </div>

            {/* Grid Lines */}
            <div className="absolute left-8 right-0 top-2 bottom-6 flex flex-col justify-between pointer-events-none">
              <div className="border-t border-et-border w-full"></div>
              <div className="border-t border-et-border w-full"></div>
              <div className="border-t border-et-border w-full"></div>
              <div className="border-t border-et-border w-full"></div>
            </div>

            {/* SVG Graph Area */}
            <div className="absolute left-8 right-0 top-2 bottom-6">
              <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" className="overflow-visible">
                <defs>
                  <linearGradient id="yellowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F5B700" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#F5B700" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Outage Zone 14:00 - 18:00 (X: 583 to 750) */}
                <rect x="583" y="0" width="167" height="100" fill="#EF4444" fillOpacity="0.1" />
                {/* Down-time Zone 15:50 - 18:00 (X: 660 to 750) */}
                <rect x="660" y="0" width="90" height="100" fill="#EF4444" fillOpacity="0.2" />

                {/* Path (0-24h) roughly: y=0 is 100, y=6 is 0 */}
                {/* 0h(0):1.1kw(81), 8h(333):1.2kw(80), 12h(500):4.2kw(30), 14h(583):4.0kw(33), 14.1h(587):1.1kw(81), 15.8h(660):1.1kw(81), 15.9h(662):0kw(100), 18h(750):0kw(100), 18.1h(754):3.4kw(43), 22h(916):1.2kw(80), 24h(1000):1.1kw(81) */}
                <path 
                  d="M0,81 C166,81 250,80 333,80 C416,80 450,30 500,30 C541,30 562,33 583,33 L587,81 L660,81 L662,100 L750,100 L754,43 C833,43 875,80 916,80 C958,80 1000,81 1000,81" 
                  fill="url(#yellowGrad)" 
                  stroke="#F5B700" 
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                
                {/* Peak Point */}
                <circle cx="500" cy="30" r="4" fill="#F5B700" stroke="#0B0D12" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
              </svg>
              
              {/* HTML Labels on Graph */}
              <div className="absolute font-space text-[11px] text-et-accent" style={{ left: '50%', top: '15%', transform: 'translateX(-50%)' }}>Пік 4.2 кВт</div>
              
              <div className="absolute text-[10px] font-bold tracking-wider text-et-danger" style={{ left: '66.65%', top: '5%', transform: 'translateX(-50%)' }}>ВІДКЛЮЧЕННЯ</div>
              
              <div className="absolute bg-et-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-none whitespace-nowrap" style={{ left: '66%', top: '45%', transform: 'translateX(-50%)' }}>15:50 розряд</div>
            </div>

            {/* X Axis labels */}
            <div className="absolute left-8 right-0 bottom-0 flex justify-between text-xs text-et-muted font-space">
              <span style={{ position: 'absolute', left: '0%', transform: 'translateX(-50%)' }}>00:00</span>
              <span style={{ position: 'absolute', left: '25%', transform: 'translateX(-50%)' }}>06:00</span>
              <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>12:00</span>
              <span className="text-et-danger font-bold" style={{ position: 'absolute', left: '58.3%', transform: 'translateX(-50%)' }}>14</span>
              <span className="text-et-danger font-bold" style={{ position: 'absolute', left: '75%', transform: 'translateX(-50%)' }}>18</span>
              <span style={{ position: 'absolute', left: '100%', transform: 'translateX(-50%)' }}>24:00</span>
            </div>
          </div>
        </div>

        {/* Top 3 Consumers Card */}
        <div className="bg-et-card border border-et-border rounded-2xl p-6 flex flex-col">
          <div className="text-et-muted text-xs font-bold tracking-widest uppercase mb-5">ТОП-3 КРИТИЧНІ СПОЖИВАЧІ</div>
          <div className="flex-1 space-y-3">
            {/* Consumer 1 */}
            <div className="bg-et-block rounded-[10px] p-3 border border-et-border flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-space text-et-muted text-xs">01</span>
                  <span className="text-sm font-medium text-et-text">Кавомашина</span>
                </div>
                <div className="text-xs text-et-muted">
                  <span className="font-space">3.2 кВт</span> · пуск <span className="font-space text-et-text">3.6</span>
                </div>
              </div>
              <div className="bg-et-danger/10 text-et-danger text-[10px] font-bold px-2 py-1 rounded">CRITICAL</div>
            </div>
            {/* Consumer 2 */}
            <div className="bg-et-block rounded-[10px] p-3 border border-et-border flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-space text-et-muted text-xs">02</span>
                  <span className="text-sm font-medium text-et-text">Холодильник</span>
                </div>
                <div className="text-xs text-et-muted">
                  <span className="font-space">0.35 кВт</span> · пуск <span className="font-space text-et-text">1.1</span>
                </div>
              </div>
              <div className="bg-et-danger/10 text-et-danger text-[10px] font-bold px-2 py-1 rounded">CRITICAL</div>
            </div>
            {/* Consumer 3 */}
            <div className="bg-et-block rounded-[10px] p-3 border border-et-border flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-space text-et-muted text-xs">03</span>
                  <span className="text-sm font-medium text-et-text">Гриндер</span>
                </div>
                <div className="text-xs text-et-muted">
                  <span className="font-space">0.5 кВт</span> · пуск <span className="font-space text-et-text">0.9</span>
                </div>
              </div>
              <div className="bg-et-accent/10 text-et-accent text-[10px] font-bold px-2 py-1 rounded">HIGH</div>
            </div>
          </div>
          <button className="mt-4 w-full py-2.5 rounded-[10px] text-sm font-medium text-et-text border border-et-border hover:bg-et-block transition-colors">
            Усе обладнання →
          </button>
        </div>
      </div>
    </div>
  );
}
