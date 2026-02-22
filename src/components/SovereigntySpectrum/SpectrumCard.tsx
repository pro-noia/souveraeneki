"use client";

import { useState } from "react";
import type { LevelData, MerkmalItem } from "./spectrumConfig";
import styles from "./SovereigntySpectrum.module.css";

function MerkmalIcon({ icon }: { icon: MerkmalItem["icon"] }) {
  if (icon === "check")
    return <span className={`${styles.merkmalIcon} ${styles.iconCheck}`}>✓</span>;
  if (icon === "cross")
    return <span className={`${styles.merkmalIcon} ${styles.iconCross}`}>✗</span>;
  return <span className={`${styles.merkmalIcon} ${styles.iconWarn}`}>⚠</span>;
}

function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className={styles.accordionToggle}
        onClick={() => setOpen(!open)}
        type="button"
        aria-expanded={open}
      >
        {title}
        <svg
          className={styles.accordionChevron}
          data-open={open}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      <div className={styles.accordionContent} data-open={open}>
        <div className={styles.accordionInner}>{children}</div>
      </div>
    </div>
  );
}

interface SpectrumCardProps {
  data: LevelData;
  active: boolean;
  onClick: () => void;
}

export default function SpectrumCard({
  data,
  active,
  onClick,
}: SpectrumCardProps) {
  return (
    <article
      className={styles.card}
      data-active={active}
      onClick={onClick}
      style={
        active
          ? {
              borderColor: data.color,
              boxShadow: `0 8px 32px ${data.glowColor}`,
            }
          : undefined
      }
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Level label */}
      <div className={styles.levelLabel} style={{ color: data.color }}>
        Level {data.level}
      </div>

      {/* Header */}
      <div className={styles.cardHeader}>
        <div
          className={styles.levelBadge}
          style={{ background: data.color }}
        >
          {data.level}
        </div>
        <h3 className={styles.cardTitle}>{data.title}</h3>
      </div>

      {/* Tags — always visible */}
      <div className={styles.tags}>
        {data.suitableFor.map((tag) => (
          <span
            key={tag}
            className={styles.tag}
            style={active ? { borderColor: `${data.color}44` } : undefined}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Accordion: Technologien */}
      <Accordion title="🛠 Technologien">
        <div className={styles.techList}>
          {data.technologies.map((tech) => (
            <div key={tech} className={styles.techItem}>
              {tech}
            </div>
          ))}
        </div>
      </Accordion>

      {/* Accordion: Auswirkungen */}
      <Accordion title="📊 Auswirkungen">
        <div className={styles.techList}>
          {data.merkmale.map((m) => (
            <div key={m.text} className={styles.merkmalItem}>
              <MerkmalIcon icon={m.icon} />
              <span>{m.text}</span>
            </div>
          ))}
        </div>
      </Accordion>
    </article>
  );
}
