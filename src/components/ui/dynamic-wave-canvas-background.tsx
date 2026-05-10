"use client";

import { useEffect, useRef } from "react";

/**
 * Animierter Wave-Canvas-Hintergrund.
 *
 * Basis: dynamic-wave-canvas-background von 21st.dev.
 * Adaption: Farbpalette auf Brand-System gemappt (Petrol + Mondstein auf
 * Eichensaal/Tinte-Tiefen). Das Original-Snippet rendert ein Lila-Blau-Wash,
 * was direkt in die in PRODUCT.md verbotene AI-Cosmic-Violet-Lane fällt.
 *
 * Zusätzlich gegenüber Original:
 *   • TypeScript + Null-Checks
 *   • requestAnimationFrame-Cleanup beim Unmount
 *   • prefers-reduced-motion: ein statischer Frame, keine Schleife
 *   • aria-hidden + pointer-events-none (rein dekorativ)
 */

interface HeroWaveProps {
  className?: string;
}

const HeroWave = ({ className = "" }: HeroWaveProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let imageData: ImageData = ctx.createImageData(1, 1);
    let data: Uint8ClampedArray = imageData.data;
    const SCALE = 2;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width = Math.floor(canvas.width / SCALE);
      height = Math.floor(canvas.height / SCALE);
      imageData = ctx.createImageData(width, height);
      data = imageData.data;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const startTime = Date.now();

    // Trig-Lookup-Tables, identisch zum Original-Snippet
    const SIN_TABLE = new Float32Array(1024);
    const COS_TABLE = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) {
      const angle = (i / 1024) * Math.PI * 2;
      SIN_TABLE[i] = Math.sin(angle);
      COS_TABLE[i] = Math.cos(angle);
    }

    const fastSin = (x: number) => {
      const index =
        Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * 1024) & 1023;
      return SIN_TABLE[index];
    };

    const fastCos = (x: number) => {
      const index =
        Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * 1024) & 1023;
      return COS_TABLE[index];
    };

    // Brand-Anchorfarben in sRGB-Approximation [0..1] aus den OKLCH-Tokens.
    // Drei Farben → Drei-Wege-Gewichtung pro Pixel (Bernstein bewusst raus,
    // damit das Bild nicht ins Gelb-Messing kippt):
    //   Petrol (kühl-blau) · Rost (warm-rot) · Salbei (kühl-grün)
    // Jede Farbe bekommt ein eigenes Gewicht aus einer entkoppelten Welle,
    // dann normalisiert — so gibt es keine dominante Achse, alle drei
    // Stationen zirkulieren gleichberechtigt.
    const PETROL_R = 0.16, PETROL_G = 0.37, PETROL_B = 0.43;
    const ROST_R   = 0.45, ROST_G   = 0.20, ROST_B   = 0.13;
    const SALBEI_R = 0.40, SALBEI_G = 0.55, SALBEI_B = 0.42;

    let frameId = 0;
    let stopped = false;

    const renderFrame = (time: number) => {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const u_x = (2 * x - width) / height;
          const u_y = (2 * y - height) / height;

          let a = 0;
          let d = 0;

          // 4 Iterationen für Turbulenz-Charakter (statt flächiger Wolken).
          // time-Multiplikator bleibt halbiert (war 0.5 im Original) → 0.25.
          for (let i = 0; i < 4; i++) {
            a += fastCos(i - d + time * 0.25 - a * u_x);
            d += fastSin(i * u_y + a);
          }

          // Steilere Power-Kurve (1.9) und niedrigerer Floor (0.04) drücken
          // den Mittelbereich näher an Schwarz — Crests bleiben farbig,
          // Täler werden tief. Range ~0.04..0.64.
          const wave = (fastSin(a) + fastCos(d)) * 0.5;
          const waveAbs = Math.abs(wave);
          const intensity = 0.04 + 0.60 * Math.pow(waveAbs, 1.9);

          // Drei entkoppelte Wellen → drei Farb-Gewichte. Anschließend
          // normalisiert, damit die Summe immer 1 ergibt (keine Drift in
          // Helligkeit durch Gewicht-Schwankung). Zeit-Multiplikatoren
          // bleiben halbiert für ruhige Bewegung.
          const wPetrol = 0.5 + 0.5 * fastSin(a + time * 0.10);
          const wRost   = 0.5 + 0.5 * fastCos(d + time * 0.05);
          const wSalbei = 0.5 + 0.5 * fastSin(d - a + time * 0.075);
          const wSum = wPetrol + wRost + wSalbei + 1e-4;
          const nP = wPetrol / wSum;
          const nR = wRost   / wSum;
          const nS = wSalbei / wSum;

          const tintR = PETROL_R * nP + ROST_R * nR + SALBEI_R * nS;
          const tintG = PETROL_G * nP + ROST_G * nR + SALBEI_G * nS;
          const tintB = PETROL_B * nP + ROST_B * nR + SALBEI_B * nS;

          // Sanfter Boost — Crests sollen kräftig wirken, sind aber wegen
          // intensity * boost ohnehin durch Min(1, …) gekappt.
          const boost = 1.20;
          const r = Math.min(1, tintR * intensity * boost);
          const g = Math.min(1, tintG * intensity * boost);
          const b = Math.min(1, tintB * intensity * boost);

          const index = (y * width + x) * 4;
          data[index] = r * 255;
          data[index + 1] = g * 255;
          data[index + 2] = b * 255;
          data[index + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      if (SCALE > 1) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
          canvas,
          0,
          0,
          width,
          height,
          0,
          0,
          canvas.width,
          canvas.height,
        );
      }
    };

    const loop = () => {
      if (stopped) return;
      const time = (Date.now() - startTime) * 0.001;
      renderFrame(time);
      frameId = requestAnimationFrame(loop);
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      // Ein statischer Frame, keine Schleife.
      renderFrame(0);
    } else {
      frameId = requestAnimationFrame(loop);
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
    />
  );
};

export default HeroWave;
