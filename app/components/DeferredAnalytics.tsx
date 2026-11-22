"use client";

import { useEffect } from "react";

const INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
/** Visitors who read without interacting are still counted after this delay. */
const FALLBACK_DELAY_MS = 12_000;

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

/**
 * Loads Google Analytics after the visitor's first interaction (or after a
 * short fallback delay) instead of during page load. The ~200 KB gtag script
 * then no longer competes with the first render, which keeps the main thread
 * free and the page responsive on phones.
 */
export default function DeferredAnalytics({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      cleanup();

      const w = window as GtagWindow;
      w.dataLayer = w.dataLayer || [];
      w.gtag = function gtag() {
        // gtag expects the `arguments` object itself, not an array copy.
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      };
      w.gtag("js", new Date());
      w.gtag("config", measurementId);

      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      document.head.appendChild(script);
    };

    const timer = window.setTimeout(load, FALLBACK_DELAY_MS);
    const cleanup = () => {
      window.clearTimeout(timer);
      for (const event of INTERACTION_EVENTS) window.removeEventListener(event, load);
    };
    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, load, { once: true, passive: true });
    }
    return cleanup;
  }, [measurementId]);

  return null;
}
