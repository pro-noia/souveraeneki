"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { trackWizardEvent } from "@/lib/analytics";
import {
  STEP1_HEADLINE,
  STEP2_HEADLINE,
  ROLE_TILES,
  LEVEL_TILES,
  WIZARD_ROUTES,
} from "./wizardConfig";
import WizardProgress from "./WizardProgress";
import WizardStep from "./WizardStep";
import styles from "./SovereignWizard.module.css";

export default function SovereignWizard() {
  const router = useRouter();
  const wizardRef = useRef<HTMLDivElement>(null);
  const hasTrackedView = useRef(false);

  const [step, setStep] = useState(1);
  const [role, setRole] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  // Track step 1 view when wizard enters viewport
  useEffect(() => {
    const el = wizardRef.current;
    if (!el || hasTrackedView.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          hasTrackedView.current = true;
          trackWizardEvent("wizard_step1_view");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track step 2 view
  useEffect(() => {
    if (step === 2 && role) {
      trackWizardEvent("wizard_step2_view", { role });
    }
  }, [step, role]);

  const handleRoleSelect = useCallback((selectedRole: string) => {
    trackWizardEvent("wizard_step1_select", { role: selectedRole });
    setRole(selectedRole);
    setStep(2);
  }, []);

  const handleLevelSelect = useCallback(
    (selectedLevel: string) => {
      if (!role) return;

      trackWizardEvent("wizard_step2_select", { role, level: selectedLevel });

      const targetUrl = WIZARD_ROUTES[role]?.[selectedLevel];
      if (!targetUrl) return;

      setRedirecting(true);

      setTimeout(() => {
        trackWizardEvent("wizard_complete", {
          role,
          level: selectedLevel,
          target_url: targetUrl,
        });
        router.push(targetUrl);
      }, 500);
    },
    [role, router]
  );

  const handleBack = useCallback(() => {
    if (role) {
      trackWizardEvent("wizard_back", { from_step: 2, role });
    }
    setRole(null);
    setStep(1);
  }, [role]);

  return (
    <section id="wizard" ref={wizardRef} className={styles.wizard}>
      <div className={styles.wizardInner}>
        <WizardProgress currentStep={step} totalSteps={2} />

        {redirecting ? (
          <div className={styles.redirecting}>
            <div className={styles.spinner} />
            <span>Wird geladen …</span>
          </div>
        ) : (
          <>
            <div className={styles.stepsTrack} data-step={step}>
              <div className={styles.stepPanel}>
                <WizardStep
                  headline={STEP1_HEADLINE}
                  tiles={ROLE_TILES}
                  selectedId={null}
                  onSelect={handleRoleSelect}
                  stepNumber={1}
                />
              </div>
              <div className={styles.stepPanel}>
                <WizardStep
                  headline={STEP2_HEADLINE}
                  tiles={LEVEL_TILES}
                  selectedId={null}
                  onSelect={handleLevelSelect}
                  stepNumber={2}
                />
              </div>
            </div>

            {step === 2 && (
              <div className="flex justify-center">
                <button
                  className={styles.back}
                  onClick={handleBack}
                  type="button"
                >
                  <ArrowLeft size={16} />
                  Zurück
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
