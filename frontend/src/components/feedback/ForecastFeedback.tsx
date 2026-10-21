import { useState } from 'react';
import { addFeedback, getLastForecastVote } from '../../lib/feedback';

type Vote = 'up' | 'down';

export function ForecastFeedback() {
  const [vote, setVote] = useState<Vote | null>(() => getLastForecastVote());

  const handleVote = (v: Vote) => {
    if (vote === v) return;
    setVote(v);
    addFeedback({ type: 'forecast', value: v, comment: '', page: 'dashboard' });
  };

  return (
    <div className="flex items-center gap-3 mt-3 text-sm">
      <span className={vote ? 'text-et-text' : 'text-et-muted'}>
        {vote ? 'Дякуємо! Це покращує прогноз' : 'Прогноз 14:00–18:00 точний?'}
      </span>
      <div className="flex gap-2">
        {([
          { id: 'up', label: '👍', title: 'Так, точний' },
          { id: 'down', label: '👎', title: 'Ні, неточний' },
        ] as const).map(btn => (
          <button
            key={btn.id}
            onClick={() => handleVote(btn.id)}
            title={btn.title}
            aria-pressed={vote === btn.id}
            className={`px-3 py-1 rounded-md text-sm transition-colors border ${vote === btn.id ? 'bg-et-accent border-et-accent' : 'bg-et-block border-et-border hover:border-et-accent/60'}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
