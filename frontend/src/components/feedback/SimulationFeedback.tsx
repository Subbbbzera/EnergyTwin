import { useCallback, useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { addFeedback } from '../../lib/feedback';
import { Toast } from '../ui/Toast';

export function SimulationFeedback() {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  const handleSubmit = () => {
    if (rating === null) return;
    addFeedback({ type: 'simulation_rating', value: rating, comment: comment.trim(), page: 'simulation' });
    setSubmitted(rating);
    setToast('Дякуємо за відгук!');
  };

  return (
    <>
      {submitted !== null ? (
        <div className="bg-et-card border border-et-border rounded-2xl px-6 py-4 mb-6 flex items-center gap-3 text-sm text-et-text">
          <CheckCircle2 size={18} className="text-et-accent" />
          <span>Ваша оцінка: <span className="font-space font-bold text-et-accent">{submitted}/5</span></span>
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
