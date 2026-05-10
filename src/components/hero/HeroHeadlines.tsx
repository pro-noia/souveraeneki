"use client";

import { useEffect, useRef, useState } from "react";
import heroContent from "@/data/hero-content.json";
import styles from "./HeroHeadlines.module.css";

type Tier = "bright" | "dim" | "accent";

interface Line {
  tier: Tier;
  text: string;
}

interface Slide {
  id: string;
  topic: string;
  durationSec: number;
  lines: Line[];
  subline: string;
}

const slides = heroContent.heroes as Slide[];

const STORAGE_KEY = "sovereign-hero-cursor";
const CHAR_DELAY_MS = 18;
const SUBLINE_DELAY_MS = 200;

const TIER_CLASS: Record<Tier, string> = {
  bright: styles.tierBright,
  dim: styles.tierDim,
  accent: styles.tierAccent,
};

function getStartIndex(total: number): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw === null ? 0 : parseInt(raw, 10);
    const start = Number.isFinite(parsed)
      ? ((parsed % total) + total) % total
      : 0;
    window.localStorage.setItem(STORAGE_KEY, String((start + 1) % total));
    return start;
  } catch {
    return Math.floor(Math.random() * total);
  }
}

function countAnimChars(text: string): number {
  // Whitespace ist kein Animationsschritt — passt zur AnimatedLine-Logik unten.
  let n = 0;
  for (const ch of text) if (!/\s/.test(ch)) n++;
  return n;
}

function AnimatedLine({
  line,
  baseOffset,
  reduced,
}: {
  line: Line;
  baseOffset: number;
  reduced: boolean;
}) {
  const tokens = line.text.split(/(\s+)/).filter((t) => t.length > 0);
  let charIdx = 0;

  return (
    <span className={`${styles.line} ${TIER_CLASS[line.tier]}`}>
      {tokens.map((token, tIdx) => {
        if (/^\s+$/.test(token)) {
          return <span key={`s-${tIdx}`}>{token}</span>;
        }
        return (
          <span key={`w-${tIdx}`} className={styles.word}>
            {Array.from(token).map((char) => {
              const delay = reduced ? 0 : (baseOffset + charIdx) * CHAR_DELAY_MS;
              const node = (
                <span
                  key={charIdx}
                  className={styles.char}
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {char}
                </span>
              );
              charIdx++;
              return node;
            })}
          </span>
        );
      })}
    </span>
  );
}

interface RotationState {
  current: number;
  reduced: boolean;
}

export default function HeroHeadlines() {
  // Server- und erstes Client-Render zeigen Slide 0 (keine Hydration-Mismatch).
  // localStorage und matchMedia gibt es erst nach dem Mount → Update im Effect.
  const [state, setState] = useState<RotationState>({
    current: 0,
    reduced: false,
  });
  const initialized = useRef(false);

  useEffect(() => {
    // StrictMode-Schutz: Cursor nur einmal beim Mount weiterdrehen.
    if (initialized.current) return;
    initialized.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe one-shot init
    setState({
      current: getStartIndex(slides.length),
      reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  const { current, reduced } = state;

  useEffect(() => {
    const slide = slides[current];
    const timer = window.setTimeout(
      () =>
        setState((prev) => ({
          ...prev,
          current: (prev.current + 1) % slides.length,
        })),
      slide.durationSec * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [current]);

  const slide = slides[current];

  // Kumulativer Char-Offset pro Zeile, damit Stagger über alle Zeilen
  // hinweg ohne Sprung weiterläuft.
  const offsets: number[] = [];
  let cumulative = 0;
  for (const line of slide.lines) {
    offsets.push(cumulative);
    cumulative += countAnimChars(line.text);
  }
  const totalChars = cumulative;
  const sublineDelayMs = reduced
    ? 0
    : totalChars * CHAR_DELAY_MS + SUBLINE_DELAY_MS;

  return (
    <div className={styles.hero}>
      <h1
        key={`h-${slide.id}`}
        className={`${styles.headline} ${reduced ? styles.headlineFade : ""}`}
      >
        {slide.lines.map((line, idx) => (
          <AnimatedLine
            key={idx}
            line={line}
            baseOffset={offsets[idx]}
            reduced={reduced}
          />
        ))}
      </h1>

      <p
        key={`s-${slide.id}`}
        className={styles.subline}
        style={{ animationDelay: `${sublineDelayMs}ms` }}
      >
        {slide.subline}
      </p>

      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-label="Headline-Rotation"
      >
        <div
          key={`p-${slide.id}`}
          className={styles.progressBar}
          style={{ animationDuration: `${slide.durationSec}s` }}
        />
      </div>
    </div>
  );
}
