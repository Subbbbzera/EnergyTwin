// Аналітика (PostHog) + A/B-розподіл відвідувачів.
// Кожен відвідувач випадково отримує варіант заголовка (A/B) і групу сталого блоку (on/off).
// Варіант зберігається в localStorage, тож при повторному візиті він не змінюється.
// Для скріншотів можна примусово задати варіант: ?v=a | ?v=b | ?eco=on | ?eco=off
import posthog from 'posthog-js';
import { POSTHOG_HOST, POSTHOG_KEY } from '../config';

export type HeroVariant = 'A' | 'B';
export type EcoVariant = 'on' | 'off';

const params = new URLSearchParams(window.location.search);

function pick<T extends string>(storageKey: string, urlKey: string, options: readonly T[]): T {
  const forced = params.get(urlKey)?.toLowerCase();
  const match = options.find(o => o.toLowerCase() === forced);
  if (match) return match;
  try {
    const saved = localStorage.getItem(storageKey) as T | null;
    if (saved && options.includes(saved)) return saved;
    const v = options[Math.floor(Math.random() * options.length)];
    localStorage.setItem(storageKey, v);
    return v;
  } catch {
    return options[Math.floor(Math.random() * options.length)];
  }
}

export const heroVariant: HeroVariant = pick('et_ab_hero', 'v', ['A', 'B'] as const);
export const ecoVariant: EcoVariant = pick('et_ab_eco', 'eco', ['on', 'off'] as const);
// Джерело трафіку: ?src=owners | tg | insta | form ... (за замовчуванням — direct)
export const trafficSource = params.get('src') || params.get('utm_source') || 'direct';
// Внутрішні перегляди (команда) не рахуємо: ?internal=1 один раз — і браузер позначено
const isInternal = (() => {
  try {
    if (params.get('internal') === '1') localStorage.setItem('et_internal', '1');
    return localStorage.getItem('et_internal') === '1';
  } catch {
    return false;
  }
})();

let enabled = false;

export function initAnalytics() {
  if (!POSTHOG_KEY.startsWith('phc_') || isInternal) return;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'always',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
  });
  posthog.register({
    hero_variant: heroVariant,
    eco_variant: ecoVariant,
    traffic_source: trafficSource,
    device: window.innerWidth < 1024 ? 'mobile' : 'desktop',
  });
  enabled = true;
}

export function track(event: string, props: Record<string, unknown> = {}) {
  if (!enabled) return;
  posthog.capture(event, props);
}
