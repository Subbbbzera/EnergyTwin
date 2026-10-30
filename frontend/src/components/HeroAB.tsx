import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { heroVariant, track } from '../lib/analytics';

// A/B-тест ціннісної пропозиції з Модуля 2:
// A — «Передбачуваність», B — «Гроші». Метрика: перехід у симулятор і запуск симуляції.
const COPY = {
  A: {
    tag: 'ПЕРЕДБАЧУВАНІСТЬ',
    title: 'Дізнайтеся, чи переживе ваш бізнес відключення — ще до того, як зникне світло',
    text: 'EnergyTwin показує, на скільки годин вистачить резерву і що вимкнеться першим.',
    cta: 'Перевірити свій бізнес',
  },
  B: {
    tag: 'ГРОШІ',
    title: 'Скільки ви втрачаєте за годину без світла — і що вигідніше докупити',
    text: 'EnergyTwin переводить простій у гривні й підбирає резерв без переплати.',
    cta: 'Порахувати свої втрати',
  },
} as const;

export function HeroAB({ onCta }: { onCta: () => void }) {
  const c = COPY[heroVariant];

  useEffect(() => {
    track('hero_view');
  }, []);

  return (
    <div className="bg-et-card border border-et-accent/40 rounded-2xl p-5 lg:p-6 mb-6 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
      <div className="max-w-3xl">
        <div className="text-et-accent text-xs font-bold tracking-widest uppercase mb-2">{c.tag}</div>
        <div className="font-space font-semibold text-lg lg:text-xl text-et-text leading-snug mb-1">{c.title}</div>
        <div className="text-sm text-et-muted">{c.text}</div>
      </div>
      <button
        onClick={() => {
          track('hero_cta_click');
          onCta();
        }}
        className="bg-et-accent text-et-bg font-bold px-5 py-3 rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#F5B700]/90 transition-colors shrink-0"
      >
        {c.cta} <ArrowRight size={18} />
      </button>
    </div>
  );
}
