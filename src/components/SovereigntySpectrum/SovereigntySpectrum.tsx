"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  SECTION_TITLE,
  SECTION_SUBTITLE,
  AXIS_LEFT,
  AXIS_RIGHT,
  INFO_TEXT,
  LEVELS,
} from "./spectrumConfig";
import SpectrumCard from "./SpectrumCard";
import styles from "./SovereigntySpectrum.module.css";

export default function SovereigntySpectrum() {
  const [activeLevel, setActiveLevel] = useState(0); // 0-indexed
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth <= 768);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const currentData = LEVELS[activeLevel];
  const fillPercent = (activeLevel / (LEVELS.length - 1)) * 100;

  // Gradient for the slider fill: from level 1 color to current level color
  const fillGradient =
    LEVELS.length > 1
      ? `linear-gradient(90deg, ${LEVELS[0].color}, ${currentData.color})`
      : currentData.color;

  const handleSliderClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      const index = Math.round(ratio * (LEVELS.length - 1));
      setActiveLevel(Math.max(0, Math.min(LEVELS.length - 1, index)));
    },
    []
  );

  // Touch swipe handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (Math.abs(touchDeltaX.current) > 40) {
      setActiveLevel((prev) => {
        if (touchDeltaX.current < 0) return Math.min(prev + 1, LEVELS.length - 1);
        return Math.max(prev - 1, 0);
      });
    }
    touchDeltaX.current = 0;
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.headline}>{SECTION_TITLE}</h2>
      <p className={styles.subtitle}>{SECTION_SUBTITLE}</p>

      {/* Slider */}
      <div className={styles.sliderArea}>
        <div className={styles.axisLabels}>
          <span className={styles.axisLeft}>{AXIS_LEFT}</span>
          <span className={styles.axisRight}>{AXIS_RIGHT}</span>
        </div>

        <div
          className={styles.sliderTrack}
          onClick={handleSliderClick}
          role="slider"
          aria-valuemin={1}
          aria-valuemax={4}
          aria-valuenow={activeLevel + 1}
          aria-label="Souveränitäts-Level"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp")
              setActiveLevel((p) => Math.min(p + 1, LEVELS.length - 1));
            if (e.key === "ArrowLeft" || e.key === "ArrowDown")
              setActiveLevel((p) => Math.max(p - 1, 0));
          }}
        >
          <div
            className={styles.sliderFill}
            style={{
              width: `${fillPercent}%`,
              background: fillGradient,
            }}
          />
          <div
            className={styles.sliderThumb}
            style={{
              left: `${fillPercent}%`,
              background: currentData.color,
              boxShadow: `0 0 12px ${currentData.glowColor}`,
            }}
          />
        </div>

        {/* Step dots */}
        <div className={styles.stepDots}>
          {LEVELS.map((level, i) => (
            <button
              key={level.level}
              className={styles.stepDot}
              data-active={i === activeLevel}
              onClick={() => setActiveLevel(i)}
              type="button"
              aria-label={`Level ${level.level}: ${level.title}`}
            >
              <div
                className={styles.stepDotCircle}
                style={
                  i === activeLevel
                    ? {
                        background: level.color,
                        borderColor: level.color,
                      }
                    : i <= activeLevel
                      ? { borderColor: LEVELS[i].color }
                      : undefined
                }
              />
              <span className={styles.stepDotLabel}>Level {level.level}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div
        className={styles.cardsWrapper}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.cardsGrid}
          style={
            isMobile
              ? { transform: `translateX(-${activeLevel * 100}%)` }
              : undefined
          }
        >
          {LEVELS.map((level, i) => (
            <SpectrumCard
              key={level.level}
              data={level}
              active={i === activeLevel}
              onClick={() => setActiveLevel(i)}
            />
          ))}
        </div>

        {/* Mobile swipe dots */}
        <div className={styles.swipeDots}>
          {LEVELS.map((level, i) => (
            <button
              key={level.level}
              className={styles.swipeDot}
              data-active={i === activeLevel}
              onClick={() => setActiveLevel(i)}
              type="button"
              aria-label={`Level ${level.level}`}
              style={
                i === activeLevel ? { background: level.color } : undefined
              }
            />
          ))}
        </div>
      </div>

      {/* Info block */}
      <div className={styles.infoBlock}>{INFO_TEXT}</div>
    </section>
  );
}
