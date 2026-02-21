import { useState } from "react";
import type { TileData } from "./wizardConfig";
import styles from "./SovereignWizard.module.css";

interface WizardTileProps {
  tile: TileData;
  onSelect: (id: string) => void;
  selected: boolean;
}

export default function WizardTile({
  tile,
  onSelect,
  selected,
}: WizardTileProps) {
  const [animating, setAnimating] = useState(false);
  const Icon = tile.icon;

  const handleClick = () => {
    if (animating) return;
    setAnimating(true);
    // Trigger select after pulse animation
    setTimeout(() => {
      onSelect(tile.id);
    }, 500);
  };

  return (
    <button
      className={styles.tile}
      data-selected={selected || animating}
      data-animating={animating}
      onClick={handleClick}
      type="button"
    >
      <Icon size={36} strokeWidth={1.5} className={styles.tileIcon} />
      <span className={styles.tileTitle}>{tile.title}</span>
    </button>
  );
}
