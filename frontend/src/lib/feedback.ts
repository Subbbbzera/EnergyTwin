// Збір відгуків користувачів: один масив у localStorage (ключ "et_feedback")
export type FeedbackType = 'forecast' | 'simulation_rating' | 'general';

export interface FeedbackEntry {
  type: FeedbackType;
  value: string | number;
  comment: string;
  page: string;
  timestamp: string;
}

const STORAGE_KEY = 'et_feedback';

// Резерв у пам'яті, якщо localStorage недоступний (приватний режим тощо)
let memoryStore: FeedbackEntry[] = [];

export function getFeedback(): FeedbackEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return memoryStore;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : memoryStore;
  } catch {
    return memoryStore;
  }
}

export function addFeedback(entry: Omit<FeedbackEntry, 'timestamp'>): FeedbackEntry {
  const full: FeedbackEntry = { ...entry, timestamp: new Date().toISOString() };
  const next = [...getFeedback(), full];
  memoryStore = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // залишаємо дані лише в пам'яті
  }
  return full;
}

export function clearFeedback() {
  memoryStore = [];
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ігноруємо
  }
}

export function getLastForecastVote(): 'up' | 'down' | null {
  const votes = getFeedback().filter(f => f.type === 'forecast');
  const last = votes[votes.length - 1];
  return last && (last.value === 'up' || last.value === 'down') ? last.value : null;
}

export function getFeedbackStats() {
  const all = getFeedback();
  const ratings = all.filter(f => f.type === 'simulation_rating').map(f => Number(f.value)).filter(n => n >= 1 && n <= 5);
  const votes = all.filter(f => f.type === 'forecast');
  const ups = votes.filter(f => f.value === 'up').length;

  return {
    total: all.length,
    ratingsCount: ratings.length,
    avgRating: ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null,
    votesCount: votes.length,
    upShare: votes.length ? Math.round((ups / votes.length) * 100) : null,
    generalCount: all.filter(f => f.type === 'general').length,
    recent: all.slice(-3).reverse(),
  };
}
