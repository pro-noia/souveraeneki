/**
 * Analytics abstraction layer for wizard events.
 *
 * Currently logs to console in development, silent in production.
 * Replace the implementation body to connect a real provider:
 *   gtag('event', eventName, properties);      // Google Analytics
 *   plausible(eventName, { props: properties }); // Plausible
 *   _paq.push(['trackEvent', ...]);             // Matomo
 */
export function trackWizardEvent(
  eventName: string,
  properties: Record<string, string | number> = {}
) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${eventName}`, properties);
  }
}
