import { useState, useMemo } from 'react';
import { Play, ArrowRight, Lightbulb } from 'lucide-react';

export function Simulation() {
  const [startTime, setStartTime] = useState<number>(14);
  const [duration, setDuration] = useState<number>(4);
  const [highOn, setHighOn] = useState<boolean>(true);
  const [lowOn, setLowOn] = useState<boolean>(false);

  const [addedBat, setAddedBat] = useState<number>(0);
  const [addedGen, setAddedGen] = useState<number>(0);
  const [shedding, setShedding] = useState<string>('none');

  // Logic
  const baseBattery = 2.0;
  const loadCritical = 0.75;
  const loadHigh = 0.34;
  const loadLow = 0.5;

  const currentLoad = loadCritical + (highOn ? loadHigh : 0) + (lowOn ? loadLow : 0);
  const autonomyHours = baseBattery / currentLoad;
  const isEnough = autonomyHours >= duration;

  const dischargeTime = startTime + autonomyHours;
  const dischargeHour = Math.floor(dischargeTime);
  const dischargeMin = Math.round((dischargeTime - dischargeHour) * 60);
  const dischargeTimeStr = `${dischargeHour}:${dischargeMin.toString().padStart(2, '0')}`;

  const downtimeHours = Math.max(0, duration - autonomyHours);
  
  const formatTime = (h: number) => {
    const hrs = Math.floor(h);
    const mins = Math.round((h - hrs) * 60);
    if (hrs === 0) return `${mins} хв`;
    if (mins === 0) return `${hrs} год`;
    return `${hrs} год ${mins} хв`;
  };

  // What-If logic
  const whatIfBattery = baseBattery + addedBat;
  const sheddingReduction = 
    (shedding === 'showcase' || shedding === 'both' ? 0.2 : 0) +
    (shedding === 'grinder' || shedding === 'both' ? 0.15 : 0);
  
  const whatIfLoad = currentLoad - sheddingReduction;
  const whatIfAutonomy = whatIfBattery / whatIfLoad;
  
  const peakLoad = 4.95;
  const inverterBase = 3.0;
  const totalPower = inverterBase + addedGen;
  const peakCoverage = Math.min(100, Math.round((totalPower / peakLoad) * 100));

  const accentColor = isEnough ? '#22C55E' : '#EF4444';
  const accentClass = isEnough ? 'text-et-success' : 'text-et-danger';
  const accentBgClass = isEnough ? 'bg-et-success' : 'bg-et-danger';
  const accentBgMutedClass = isEnough ? 'bg-et-success/20' : 'bg-et-danger/20';

  // SVG coordinates calculations
  // X axis: 0 to 1000 represents the `duration` hours.
  const endOutageTime = startTime + duration;
  
  // Base line
  const baseDischargeRatio = Math.min(1, autonomyHours / duration);
  const baseX = baseDischargeRatio * 1000;

  // WhatIf line
  const whatIfDischargeRatio = Math.min(1, whatIfAutonomy / duration);
  const whatIfX = whatIfDischargeRatio * 1000;

  return (
    <div className="flex-1 overflow-auto bg-et-bg p-8 flex flex-col min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-space font-semibold text-2xl text-et-text mb-1">Симулятор розряду та сценаріїв блекауту</h1>
        <p className="text-et-muted text-sm">Кав'ярня «Central» · зміни параметрів перераховуються одразу</p>
      </div>

      <div className="flex gap-6 mb-6">
        {/* Left Card: Params */}
        <div className="w-[340px] bg-et-card border border-et-border rounded-2xl p-6 flex flex-col shrink-0">
          <div className="text-et-muted text-xs font-bold tracking-widest uppercase mb-5">ПАРАМЕТРИ ТЕСТУВАННЯ</div>
          
          <div className="mb-5">
            <div className="text-sm text-et-text mb-2">Початок відключення</div>
            <div className="flex gap-2">
              {[12, 14, 16, 18].map(t => (
                <button 
                  key={t}
                  onClick={() => setStartTime(t)}
                  className={`flex-1 py-2 rounded-[10px] text-sm font-space transition-colors ${startTime === t ? 'bg-et-accent text-et-bg font-bold' : 'bg-et-block text-et-muted hover:text-et-text'}`}
                >
                  {t}:00
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-et-text mb-2">Тривалість</div>
            <div className="flex gap-2">
              {[2, 4, 6, 8].map(d => (
                <button 
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`flex-1 py-2 rounded-[10px] text-sm font-space transition-colors ${duration === d ? 'bg-et-block border border-et-border text-et-text font-bold' : 'text-et-muted hover:text-et-text border border-transparent'}`}
                >
                  {d} год
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 flex-1">
            <div className="text-sm text-et-text mb-3">Пріоритети в роботі</div>
            <div className="space-y-2">
              <label className="flex items-center justify-between bg-et-block p-3 rounded-[10px] opacity-70 cursor-not-allowed">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked readOnly disabled className="accent-et-accent w-4 h-4 rounded" />
                  <span className="text-sm font-medium">CRITICAL</span>
                </div>
                <span className="text-sm font-space text-et-muted">0.75 кВт</span>
              </label>
              <label className="flex items-center justify-between bg-et-block p-3 rounded-[10px] cursor-pointer hover:border-et-border border border-transparent transition-colors">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={highOn} onChange={(e) => setHighOn(e.target.checked)} className="accent-et-accent w-4 h-4 rounded cursor-pointer" />
                  <span className="text-sm font-medium">HIGH</span>
                </div>
                <span className="text-sm font-space text-et-muted">0.34 кВт</span>
              </label>
              <label className="flex items-center justify-between bg-et-block p-3 rounded-[10px] cursor-pointer hover:border-et-border border border-transparent transition-colors">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={lowOn} onChange={(e) => setLowOn(e.target.checked)} className="accent-et-accent w-4 h-4 rounded cursor-pointer" />
                  <span className="text-sm font-medium">LOW</span>
                </div>
                <span className="text-sm font-space text-et-muted">0.5 кВт</span>
              </label>
            </div>
          </div>

          <button className="w-full bg-et-accent text-et-bg font-bold py-3.5 rounded-[10px] flex justify-center items-center gap-2 hover:bg-[#F5B700]/90 transition-colors">
            <Play size={18} fill="currentColor" />
            Запустити симуляцію
          </button>
        </div>

        {/* Right Card: Diagram */}
        <div className="flex-1 bg-et-card border border-et-border rounded-2xl p-6 flex flex-col">
          <div className="text-et-muted text-xs font-bold tracking-widest uppercase mb-4">ДІАГРАМА РОЗРЯДУ БАТАРЕЇ У ЧАСІ</div>
          
          <div className="flex-1 relative mt-2 mb-8 ml-8">
            {/* Y Axis */}
            <div className="absolute -left-8 top-0 bottom-6 w-6 flex flex-col justify-between text-xs text-et-muted font-space pointer-events-none z-10 text-right">
              <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
            </div>

            {/* Grid */}
            <div className="absolute left-0 right-0 top-2 bottom-6 flex flex-col justify-between pointer-events-none">
              <div className="border-t border-et-border w-full"></div>
              <div className="border-t border-et-border w-full"></div>
              <div className="border-t border-et-border w-full"></div>
              <div className="border-t border-et-border w-full"></div>
              <div className="border-t border-et-border w-full"></div>
            </div>

            {/* SVG Area */}
            <div className="absolute left-0 right-0 top-2 bottom-6">
              <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" className="overflow-visible">
                {/* Outage area after discharge */}
                {!isEnough && (
                  <rect x={baseX} y="0" width={1000 - baseX} height="100" fill={accentColor} fillOpacity="0.1" />
                )}
                
                {/* What-If Line (Green dotted) */}
                <path 
                  d={`M0,0 L${whatIfX},100 L1000,100`} 
                  fill="none" 
                  stroke="#22C55E" 
                  strokeWidth="2" 
                  strokeDasharray="6,6"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Current Scenario Line */}
                <path 
                  d={`M0,0 L${baseX},100 L1000,100`} 
                  fill="none" 
                  stroke={accentColor} 
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Vertical Discharge Line */}
                {!isEnough && (
                  <line x1={baseX} y1="0" x2={baseX} y2="100" stroke={accentColor} strokeWidth="1" strokeDasharray="4,4" vectorEffect="non-scaling-stroke" />
                )}
              </svg>

              {/* Discharge Badge */}
              {!isEnough && (
                <div className={`absolute ${accentBgClass} text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-none whitespace-nowrap`} 
                     style={{ left: `${baseX/10}%`, top: '40%', transform: 'translateX(-50%)' }}>
                  {dischargeTimeStr} розряд
                </div>
              )}
            </div>

            {/* X Axis labels */}
            <div className="absolute left-0 right-0 bottom-0 flex justify-between text-xs text-et-muted font-space pointer-events-none">
              {Array.from({length: duration + 1}).map((_, i) => {
                const h = startTime + i;
                const hStr = h >= 24 ? h - 24 : h;
                return (
                  <span key={i} style={{ position: 'absolute', left: `${(i/duration)*100}%`, transform: 'translateX(-50%)' }}>
                    {hStr}:00
                  </span>
                )
              })}
            </div>
          </div>

          {/* Bottom mini-cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-et-block rounded-[10px] p-4 text-center">
              <div className="text-xs text-et-muted mb-1">Статус батареї</div>
              <div className={`font-space font-medium text-lg ${isEnough ? 'text-et-success' : 'text-et-danger'}`}>
                {isEnough ? 'Вистачає' : `Розряд о ${dischargeTimeStr}`}
              </div>
            </div>
            <div className="bg-et-block rounded-[10px] p-4 text-center">
              <div className="text-xs text-et-muted mb-1">Автономність</div>
              <div className="font-space font-medium text-lg text-et-text">
                {formatTime(autonomyHours)}
              </div>
            </div>
            <div className="bg-et-block rounded-[10px] p-4 text-center">
              <div className="text-xs text-et-muted mb-1">Час простою</div>
              <div className={`font-space font-medium text-lg ${isEnough ? 'text-et-success' : 'text-et-danger'}`}>
                {formatTime(downtimeHours)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card: What-If */}
      <div className="bg-et-bg border border-et-accent/40 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-et-muted text-xs font-bold tracking-widest uppercase">КОНСТРУКТОР СЦЕНАРІЇВ WHAT-IF</div>
          <div className="text-sm text-et-text">
            Поточна автономність: <span className="font-space font-medium">{formatTime(autonomyHours)}</span> · 
            дефіцит: <span className="font-space font-medium text-et-danger">{formatTime(downtimeHours)}</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {/* Row 1 */}
          <div className="flex items-center gap-6">
            <div className="w-[140px] text-sm text-et-text font-medium">+ Батарея LiFePO4</div>
            <div className="flex gap-2 bg-et-block p-1 rounded-lg">
              {[0, 2.5, 5, 10].map(v => (
                <button key={v} onClick={() => setAddedBat(v)} className={`px-4 py-1.5 rounded-md text-sm transition-colors ${addedBat === v ? 'bg-et-card text-et-text font-medium shadow-sm' : 'text-et-muted hover:text-et-text'}`}>
                  {v === 0 ? 'Без' : `+${v}`}
                </button>
              ))}
            </div>
            <ArrowRight className="text-et-border" size={16} />
            <div className="text-sm text-et-text">
              Нова автономність: <span className="font-space font-medium text-et-success">{formatTime(whatIfAutonomy)}</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center gap-6">
            <div className="w-[140px] text-sm text-et-text font-medium">+ Генератор</div>
            <div className="flex gap-2 bg-et-block p-1 rounded-lg">
              {[0, 3.0, 5.5].map(v => (
                <button key={v} onClick={() => setAddedGen(v)} className={`px-4 py-1.5 rounded-md text-sm transition-colors ${addedGen === v ? 'bg-et-card text-et-text font-medium shadow-sm' : 'text-et-muted hover:text-et-text'}`}>
                  {v === 0 ? 'Немає' : `${v} кВт`}
                </button>
              ))}
            </div>
            <ArrowRight className="text-et-border" size={16} />
            <div className="text-sm text-et-text">
              Покриття піків: <span className="font-space font-medium text-et-success">{peakCoverage}%</span>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex items-center gap-6">
            <div className="w-[140px] text-sm text-et-text font-medium">Smart Shedding</div>
            <div className="flex gap-2 bg-et-block p-1 rounded-lg">
              {[
                { id: 'none', label: 'Без змін' },
                { id: 'showcase', label: 'Пауза вітрини' },
                { id: 'grinder', label: 'Гриндер на вимогу' },
                { id: 'both', label: 'Обидва' }
              ].map(opt => (
                <button key={opt.id} onClick={() => setShedding(opt.id)} className={`px-4 py-1.5 rounded-md text-sm transition-colors ${shedding === opt.id ? 'bg-et-card text-et-text font-medium shadow-sm' : 'text-et-muted hover:text-et-text'}`}>
                  {opt.label}
                </button>
              ))}
            </div>
            <ArrowRight className="text-et-border" size={16} />
            <div className="text-sm text-et-text">
              Економія заряду: <span className="font-space font-medium text-et-success">{sheddingReduction > 0 ? `-${sheddingReduction.toFixed(2)} кВт` : '0 кВт'}</span>
            </div>
          </div>
        </div>

        <div className="bg-et-block rounded-[10px] p-4 flex gap-3 text-sm text-et-text items-start border border-et-border">
          <Lightbulb className="text-et-accent shrink-0 mt-0.5" size={18} />
          <div>
            <span className="font-medium">Smart Shedding:</span> якщо ставити вітрину на паузу в пік і вмикати гриндер лише під замовлення, поточного резерву вистачить ще на ~50 хв.
          </div>
        </div>
      </div>
    </div>
  );
}
