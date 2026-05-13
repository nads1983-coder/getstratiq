type EventProps = Record<string, string | number | boolean>;

type PlausibleWindow = Window & {
  plausible?: (eventName: string, options?: { props?: EventProps }) => void;
};

export function trackEvent(eventName: string, props?: EventProps) {
  if (typeof window === "undefined") return;

  const plausible = (window as PlausibleWindow).plausible;
  if (typeof plausible !== "function") return;

  try {
    plausible(eventName, props ? { props } : undefined);
  } catch {
    // Analytics must never interrupt the STRATIQ experience.
  }
}
