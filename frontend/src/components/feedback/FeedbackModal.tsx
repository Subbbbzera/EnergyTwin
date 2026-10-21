import { useEffect, useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { FEEDBACK_FORM_URL } from '../../config';
import { addFeedback, clearFeedback, getFeedbackStats, type FeedbackEntry } from '../../lib/feedback';

interface FeedbackModalProps {
  page: string;
  onClose: () => void;
}

const BUSINESS_TYPES = ["Кав'ярня", 'Магазин', 'СТО', 'Інше'];

const textareaClass = 'w-full bg-et-block border border-et-border text-et-text text-sm rounded-[10px] px-4 py-2.5 outline-none focus:border-et-accent focus:ring-1 focus:ring-et-accent transition-colors resize-none';

function describeEntry(f: FeedbackEntry) {
  if (f.type === 'forecast') return { label: 'Прогноз', value: f.value === 'up' ? '👍' : '👎' };
  if (f.type === 'simulation_rating') return { label: 'Симуляція', value: `${f.value}/5` };
  return { label: 'Анкета', value: String(f.value) };
}

function formatDate(ts: string) {
  try {
    return new Date(ts).toLocaleString('uk-UA', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

export function FeedbackModal({ page, onClose }: FeedbackModalProps) {
  const [businessType, setBusinessType] = useState<string>('');
  const [unclear, setUnclear] = useState('');
  const [missing, setMissing] = useState('');
  const [sent, setSent] = useState(false);
  const [stats, setStats] = useState(getFeedbackStats);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const canSubmit = businessType !== '' || unclear.trim() !== '' || missing.trim() !== '';

  const handleSubmit = () => {
    if (!canSubmit) return;
    addFeedback({
      type: 'general',
      value: businessType || 'Не вказано',
      comment: `Незрозуміло: ${unclear.trim() || '—'} | Не вистачає: ${missing.trim() || '—'}`,
      page,
    });
    setBusinessType('');
    setUnclear('');
    setMissing('');
    setSent(true);
    setStats(getFeedbackStats());
  };

  const handleClear = () => {
    clearFeedback();
    setStats(getFeedbackStats());
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
        className="w-full max-w-[520px] max-h-[90vh] overflow-auto bg-et-card border border-et-border rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 id="feedback-title" className="font-space font-semibold text-xl text-et-text">Залишити відгук</h2>
          <button onClick={onClose} aria-label="Закрити" className="text-et-muted hover:text-et-text transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-sm text-et-text mb-2">Тип бізнесу</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BUSINESS_TYPES.map(t => (
              <button
                key={t}
                onClick={() => { setBusinessType(t); setSent(false); }}
                className={`py-2 rounded-[10px] text-sm transition-colors ${businessType === t ? 'bg-et-accent text-et-bg font-bold' : 'bg-et-block text-et-muted hover:text-et-text'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-et-text mb-2" htmlFor="fb-unclear">Що було незрозуміло?</label>
          <textarea id="fb-unclear" rows={2} value={unclear} onChange={(e) => { setUnclear(e.target.value); setSent(false); }} className={textareaClass} />
        </div>

        <div className="mb-5">
          <label className="block text-sm text-et-text mb-2" htmlFor="fb-missing">Чого не вистачає?</label>
          <textarea id="fb-missing" rows={2} value={missing} onChange={(e) => { setMissing(e.target.value); setSent(false); }} className={textareaClass} />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full bg-et-accent text-et-bg font-bold py-3 rounded-[10px] flex justify-center items-center gap-2 hover:bg-[#F5B700]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={16} />
          Надіслати
        </button>

        {sent && (
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-et-accent">
            <CheckCircle2 size={16} /> Дякуємо! Відгук збережено.
          </div>
        )}

        <div className="mt-3 text-center">
          <a href={FEEDBACK_FORM_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-et-muted underline hover:text-et-accent transition-colors">
            Повна анкета (Google Form)
          </a>
        </div>

        {/* Зібрані відгуки */}
        <div className="mt-6 pt-5 border-t border-et-border">
          <div className="flex justify-between items-center mb-3">
            <div className="text-et-muted text-xs font-bold tracking-widest uppercase">ЗІБРАНІ ВІДГУКИ</div>
            {stats.total > 0 && (
              <button onClick={handleClear} className="text-xs text-et-muted hover:text-et-danger transition-colors">Очистити</button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-et-block rounded-[10px] p-3 text-center">
              <div className="text-xs text-et-muted mb-1">Усього</div>
              <div className="font-space font-medium text-lg text-et-text">{stats.total}</div>
            </div>
            <div className="bg-et-block rounded-[10px] p-3 text-center">
              <div className="text-xs text-et-muted mb-1">Середня оцінка</div>
              <div className="font-space font-medium text-lg text-et-accent">
                {stats.avgRating !== null ? `${stats.avgRating.toFixed(1)}/5` : '—'}
              </div>
              <div className="text-[10px] text-et-muted">оцінок: {stats.ratingsCount}</div>
            </div>
            <div className="bg-et-block rounded-[10px] p-3 text-center">
              <div className="text-xs text-et-muted mb-1">Прогноз точний 👍</div>
              <div className="font-space font-medium text-lg text-et-success">
                {stats.upShare !== null ? `${stats.upShare}%` : '—'}
              </div>
              <div className="text-[10px] text-et-muted">голосів: {stats.votesCount}</div>
            </div>
          </div>

          {stats.recent.length > 0 && (
            <div className="mt-3 space-y-1.5">
              {stats.recent.map((f) => {
                const d = describeEntry(f);
                return (
                  <div key={f.timestamp + f.type} className="flex items-center gap-2 text-xs bg-et-block rounded-md px-3 py-2">
                    <span className="text-et-muted w-[72px] shrink-0">{d.label}</span>
                    <span className="font-space text-et-text shrink-0">{d.value}</span>
                    {f.comment && <span className="text-et-muted truncate">· {f.comment}</span>}
                    <span className="ml-auto text-et-muted font-space shrink-0">{formatDate(f.timestamp)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
