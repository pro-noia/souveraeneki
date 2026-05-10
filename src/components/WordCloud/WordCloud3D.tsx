"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { words, type WordItem } from "./wordCloudConfig";

// Fibonacci sphere distribution for even point placement
function distributeOnSphere(count: number) {
  const points: { theta: number; phi: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // -1 to 1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const phi = Math.asin(y);

    points.push({ theta, phi });
    void radiusAtY; // used implicitly through phi
  }
  return points;
}

interface WordPosition {
  word: WordItem;
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  color: string;
  fontSize: number;
}

export default function WordCloud3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const angleRef = useRef({ x: 0, y: 0 });
  const mouseOffset = useRef({ x: 0, y: 0 });
  const [positions, setPositions] = useState<WordPosition[]>([]);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ rx: 280, ry: 180 });

  // Update ellipsoid dimensions based on viewport
  useEffect(() => {
    function updateDimensions() {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({ rx: 130, ry: 180 }); // portrait oval on mobile
      } else if (w < 1024) {
        setDimensions({ rx: 220, ry: 160 });
      } else {
        setDimensions({ rx: 320, ry: 190 });
      }
    }
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Distribute words on sphere once
  const spherePoints = useRef(distributeOnSphere(words.length));

  // Mouse interaction: tilt the cloud subtly toward cursor
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseOffset.current = {
        x: ((e.clientY - cy) / rect.height) * 0.3,
        y: ((e.clientX - cx) / rect.width) * 0.3,
      };
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    mouseOffset.current = { x: 0, y: 0 };
  }, []);

  // Animation loop — gestoppt unter prefers-reduced-motion (a11y).
  useEffect(() => {
    const { rx, ry } = dimensions;
    const rz = Math.min(rx, ry) * 0.85;

    const reducedMotionQuery =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    const reducedMotion = reducedMotionQuery?.matches ?? false;

    function animate() {
      // Auto-rotation speed + mouse influence (entfällt unter reduced-motion).
      if (!reducedMotion) {
        angleRef.current.x += 0.002 + mouseOffset.current.x * 0.01;
        angleRef.current.y += 0.004 + mouseOffset.current.y * 0.01;
      }

      const ax = angleRef.current.x;
      const ay = angleRef.current.y;

      const cosAx = Math.cos(ax);
      const sinAx = Math.sin(ax);
      const cosAy = Math.cos(ay);
      const sinAy = Math.sin(ay);

      const newPositions: WordPosition[] = words.map((word, i) => {
        const { theta, phi } = spherePoints.current[i];

        // Point on unit sphere
        const sx = Math.cos(phi) * Math.cos(theta);
        const sy = Math.sin(phi);
        const sz = Math.cos(phi) * Math.sin(theta);

        // Rotate around X axis
        const y1 = sy * cosAx - sz * sinAx;
        const z1 = sy * sinAx + sz * cosAx;

        // Rotate around Y axis
        const x2 = sx * cosAy + z1 * sinAy;
        const z2 = -sx * sinAy + z1 * cosAy;

        // Scale to ellipsoid
        const x = x2 * rx;
        const y = y1 * ry;
        const z = z2 * rz;

        // Depth mapping: z ranges from -rz to +rz
        // Normalize to 0..1 where 1 = front
        const depthNorm = (z + rz) / (2 * rz);
        const scale = 0.5 + depthNorm * 0.5; // 0.5 to 1.0
        // Opacity floor lifted to 0.5 so back-row words still meet contrast.
        const opacity = 0.5 + depthNorm * 0.5;

        // Tinte (dunkel-kühl, hinten) → Mondstein-bright (hell, vorn)
        const r = Math.round(95 + depthNorm * (210 - 95));
        const g = Math.round(110 + depthNorm * (218 - 110));
        const b = Math.round(130 + depthNorm * (230 - 130));
        const color = `rgb(${r}, ${g}, ${b})`;

        const fontSize = word.size * scale;

        return { word, x, y, z, scale, opacity, color, fontSize };
      });

      // Sort by z so front words render on top
      newPositions.sort((a, b) => a.z - b.z);
      setPositions(newPositions);

      // Unter reduced-motion: einmal positionieren, danach nicht mehr animieren.
      if (!reducedMotion) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [dimensions]);

  return (
    <section className="relative pt-[calc(var(--space-section)/2)] pb-[var(--space-section)] overflow-hidden">
      {/* Atmospheric background glow — Mondstein, sehr leise */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.78 0.055 220 / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[var(--container-max)] mx-auto px-[var(--container-padding)]">
        <h2
          className="text-center mb-4 text-[var(--text-primary)] font-semibold tracking-[-0.02em]"
          style={{ fontSize: "var(--text-h2)" }}
        >
          Die Bausteine{" "}
          <span className="text-[var(--accent-light)]">souveräner KI</span>
        </h2>
        <p className="text-center text-[var(--text-muted)] mb-12 max-w-lg mx-auto text-[var(--text-small)]">
          Entdecke die zentralen Begriffe und Konzepte
        </p>

        <div
          ref={containerRef}
          className="relative mx-auto cursor-default"
          style={{
            width: "100%",
            maxWidth: "720px",
            height: dimensions.ry * 2 + 120 + "px",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {positions.map((pos) => {
            const isHovered = hoveredSlug === pos.word.slug;
            return (
              <Link
                key={pos.word.slug}
                href={`/glossar/${pos.word.slug}`}
                className="absolute whitespace-nowrap cursor-pointer select-none"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) scale(${isHovered ? pos.scale * 1.18 : pos.scale})`,
                  fontSize: `${(pos.fontSize * 1.333) / 16}rem`,
                  fontWeight: pos.z > 0 ? 600 : 400,
                  color: isHovered ? "var(--mondstein-bright)" : pos.color,
                  opacity: isHovered ? 1 : pos.opacity,
                  textShadow: isHovered
                    ? "0 0 20px oklch(0.86 0.060 220 / 0.55), 0 0 40px oklch(0.78 0.055 220 / 0.30)"
                    : pos.z > 0
                      ? "0 0 8px oklch(0.78 0.055 220 / 0.18)"
                      : "none",
                  transition:
                    "color 0.2s ease, opacity 0.2s ease, text-shadow 0.2s ease, font-weight 0.2s ease",
                  zIndex: Math.round(pos.z + 1000),
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  fontFamily: "var(--font-heading)",
                }}
                onMouseEnter={() => setHoveredSlug(pos.word.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
              >
                {pos.word.text}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
