import { useCallback, useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { addFeedback } from '../../lib/feedback';
import { track } from '../../lib/analytics';
import { Toast } from '../ui/Toast';

// Тест Шона Елліса на product-market fit: частка «дуже засмучусь» ≥ 40% — сильний сигнал
const PMF_OPTIONS = [
  { id: 'very', label: 'Дуже засмучуся' },
  { id: 'somewhat', label: 'Трохи засмучуся' },
  { id: 'not', label: 'Не засмучуся' },
] as const;

const PAY_OPTIONS = [
  { id: 'no', label: 'Не платив би' },
  { id: '200', label: 'до 200 ₴' },
  { id: '500', label: '200–500 ₴' },
  { id: '500+', label: 'понад 500 ₴' },
] as const;

const chip = (active: boolean) =>
  `px-3 py-2 rounded-[10px] text-sm transition-colors border ${active ? 'bg-et-accent border-et-accent text-et-bg font-medium' : 'bg-et-block border-et-border text-et-muted hover:text-et-text'}`;

export function SimulationFeedback() {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState<number | null>(null);
  const [pmf, setPmf] = useState<string | null>(null);
  const [pay, setPay] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  const handleSubmit = () => {
    if (rating === null) return;
    addFeedback({ type: 'simulation_rating', value: rating, comment: comment.trim(), page: 'simulation' });
    track('simulation_rating', { rating, comment: comment.trim() });
    setSubmitted(rating);
    setToast('Дякуємо за відгук!');
  };

  return (
    <>
      {submitted !== null ? (
        <div className="bg-et-card border border-et-border rounded-2xl p-6 mb-6 space-y-5">
          <div className="flex items-center gap-3 text-sm text-et-text">
            <CheckCircle2 size={18} className="text-et-accent" />
            <span>Ваша оцінка: <span className="font-space font-bold text-et-accent">{submitted}/5</span></span>
          </div>

          <div>
            <div className="text-sm text-et-text font-medium mb-3">Як би ви почувалися, якби EnergyTwin більше не було?</div>
            <div className="flex flex-wrap gap-2">
              {PMF_OPTIONS.map(o => (
                <button key={o.id} disabled={pmf !== null} onClick={() => { setPmf(o.id); track('pmf_answer', { answer: o.id }); }} className={chip(pmf === o.id)}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {pmf !== null && (
            <div>
              <div className="text-sm text-et-text font-medium mb-3">Скільки ви готові платити за EnergyTwin на місяць?</div>
              <div className="flex flex-wrap gap-2">
                {PAY_OPTIONS.map(o => (
                  <button key={o.id} disabled={pay !== null} onClick={() => { setPay(o.id); track('willingness_to_pay', { answer: o.id }); setToast('Дякуємо, це дуже допомагає!'); }} className={chip(pay === o.id)}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-et-card border border-et-border rounded-2xl p-6 mb-6">
          <div className="text-sm text-et-text font-medium mb-4">Чи допомогла симуляція обрати резерв?</div>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  aria-pressed={rating === n}
                  className={`w-10 h-10 rounded-[10px] text-sm font-space transition-colors border ${rating === n ? 'bg-et-accent border-et-accent text-et-bg font-bold' : 'bg-et-block border-et-border text-et-muted hover:text-et-text'}`}
                >
                  {n}
                </button>
              ))}
            </div>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Коментар…"
              className="flex-1 bg-et-block border border-et-border text-et-text text-sm rounded-[10px] px-4 py-2.5 outline-none focus:border-et-accent focus:ring-1 focus:ring-et-accent transition-colors"
            />
            <button
              onClick={handleSubmit}
              disabled={rating === null}
              className="bg-et-accent text-et-bg font-medium px-5 py-2.5 rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#F5B700]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={16} />
              Надіслати
            </button>
          </div>
        </div>
      )}
      <Toast message={toast} onClose={closeToast} />
    </>
  );
}
