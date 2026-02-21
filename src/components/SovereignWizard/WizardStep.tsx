import type { TileData } from "./wizardConfig";
import WizardTile from "./WizardTile";
import styles from "./SovereignWizard.module.css";

interface WizardStepProps {
  headline: string;
  tiles: TileData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  stepNumber: 1 | 2;
}

export default function WizardStep({
  headline,
  tiles,
  selectedId,
  onSelect,
  stepNumber,
}: WizardStepProps) {
  return (
    <div>
      <h2 className={styles.headline}>{headline}</h2>
      <div
        className={`${styles.grid} ${
          stepNumber === 1 ? styles.gridStep1 : styles.gridStep2
        }`}
      >
        {tiles.map((tile) => (
          <WizardTile
            key={tile.id}
            tile={tile}
            onSelect={onSelect}
            selected={tile.id === selectedId}
          />
        ))}
      </div>
    </div>
  );
}
