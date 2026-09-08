export const CONSENT_STORAGE_KEY = "dg_cookie_consent";
export const CONSENT_CHANGE_EVENT = "dg-consent-change";
export const ANALYTICS_SESSION_KEY = "_dg_sid";

export type ConsentChoice = "analytics" | "essential";

type StoredConsent = {
  choice: ConsentChoice;
  expiresAt: number;
};

const CONSENT_LIFETIME_MS = 180 * 24 * 60 * 60 * 1000;
const ANALYTICS_SESSION_LIFETIME_MS = 24 * 60 * 60 * 1000;

export const readConsent = (): ConsentChoice | null => {
  if (typeof window === "undefined") return null;

  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) || "null") as StoredConsent | null;
    if (!stored || stored.expiresAt <= Date.now()) {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      return null;
    }
    return stored.choice === "analytics" ? "analytics" : "essential";
  } catch {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    return null;
  }
};

export const saveConsent = (choice: ConsentChoice) => {
  const value: StoredConsent = {
    choice,
    expiresAt: Date.now() + CONSENT_LIFETIME_MS,
  };
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));

  if (choice === "essential") {
    localStorage.removeItem(ANALYTICS_SESSION_KEY);
  }

  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: choice }));
};

export const getAnalyticsSessionId = () => {
  if (typeof window === "undefined") return "";

  try {
    const stored = JSON.parse(localStorage.getItem(ANALYTICS_SESSION_KEY) || "null") as
      | { id: string; expiresAt: number }
      | null;

    if (stored?.id && stored.expiresAt > Date.now()) return stored.id;
  } catch {
    // Replace malformed or legacy values with a short-lived identifier below.
  }

  const id = `${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
  localStorage.setItem(
    ANALYTICS_SESSION_KEY,
    JSON.stringify({ id, expiresAt: Date.now() + ANALYTICS_SESSION_LIFETIME_MS }),
  );
  return id;
};
