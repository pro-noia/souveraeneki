import styles from "./SovereignWizard.module.css";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function WizardProgress({
  currentStep,
  totalSteps,
}: WizardProgressProps) {
  return (
    <div className={styles.progress}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={styles.progressDot}
            data-active={i + 1 <= currentStep}
          />
          {i < totalSteps - 1 && <div className={styles.progressBar} />}
        </div>
      ))}
    </div>
  );
}
