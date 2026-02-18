"use client";

import { useState, useEffect, useCallback } from "react";

// ---- Easy to edit: just change these strings ----
const headlines = [
  "Souveräne KI für Europa — sicher und selbstbestimmt",
  "Volle Kontrolle über Ihre KI-Infrastruktur",
  "Datensouveränität trifft modernste Technologie",
];

const TYPING_SPEED = 54; // ms per character typing
const DELETING_SPEED = 36; // ms per character deleting
const PAUSE_DURATION = 2400; // ms to hold the finished headline

export default function HeroHeadlines() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentHeadline = headlines[headlineIndex];

  const tick = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      // Typing forward
      if (charCount < currentHeadline.length) {
        setCharCount((c) => c + 1);
      } else {
        // Finished typing — pause, then start deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, PAUSE_DURATION);
      }
    } else {
      // Deleting backward
      if (charCount > 0) {
        setCharCount((c) => c - 1);
      } else {
        // Finished deleting — move to next headline
        setIsDeleting(false);
        setHeadlineIndex((idx) => (idx + 1) % headlines.length);
      }
    }
  }, [charCount, currentHeadline.length, isDeleting, isPaused]);

  useEffect(() => {
    if (isPaused) return;

    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, isPaused]);

  const displayedText = currentHeadline.slice(0, charCount);

  return (
    <div
      className="h-[calc(var(--text-hero)*3.3)]"
      aria-live="polite"
      aria-label={currentHeadline}
    >
      <h1
        className="text-[var(--text-primary)] font-bold leading-[1.1] tracking-[-0.02em]"
        style={{ fontSize: "var(--text-hero)" }}
      >
        {displayedText}
        <span
          className="inline-block w-[3px] ml-1 align-baseline"
          style={{
            height: "0.85em",
            background: "var(--accent-secondary)",
            animation: "cursor-blink 0.7s step-end infinite",
          }}
          aria-hidden="true"
        />
      </h1>
    </div>
  );
}
