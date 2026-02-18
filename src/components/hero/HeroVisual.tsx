export default function HeroVisual() {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    cx: 150 + Math.cos((i * Math.PI * 2) / 14) * (80 + (i % 3) * 30),
    cy: 150 + Math.sin((i * Math.PI * 2) / 14) * (80 + (i % 3) * 30),
    delay: `${(i * 0.6).toFixed(1)}s`,
    size: 2 + (i % 3),
  }));

  const rainLines = Array.from({ length: 8 }, (_, i) => ({
    x: 60 + i * 35,
    delay: `${(i * 0.4).toFixed(1)}s`,
  }));

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto lg:mx-0">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(100, 60, 180, 0.5) 0%, rgba(180, 60, 120, 0.3) 40%, rgba(232, 86, 74, 0.15) 70%, transparent 100%)",
        }}
      />

      <svg
        viewBox="0 0 300 300"
        className="relative w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="sphere-grad" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#7C5CFC" />
            <stop offset="35%" stopColor="#A855F7" />
            <stop offset="65%" stopColor="#D946A8" />
            <stop offset="100%" stopColor="#F4845F" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer ring — clockwise */}
        <circle
          cx="150"
          cy="150"
          r="130"
          fill="none"
          stroke="rgba(120, 80, 200, 0.2)"
          strokeWidth="1"
          strokeDasharray="8 6"
          style={{
            transformOrigin: "150px 150px",
            animation: "rotate-cw 40s linear infinite",
          }}
        />

        {/* Middle ring — counter-clockwise */}
        <circle
          cx="150"
          cy="150"
          r="100"
          fill="none"
          stroke="rgba(180, 80, 160, 0.2)"
          strokeWidth="1"
          strokeDasharray="12 8"
          style={{
            transformOrigin: "150px 150px",
            animation: "rotate-ccw 30s linear infinite",
          }}
        />

        {/* Inner ring — clockwise */}
        <circle
          cx="150"
          cy="150"
          r="70"
          fill="none"
          stroke="rgba(200, 100, 140, 0.15)"
          strokeWidth="0.75"
          strokeDasharray="6 10"
          style={{
            transformOrigin: "150px 150px",
            animation: "rotate-cw 25s linear infinite",
          }}
        />

        {/* Central sphere */}
        <circle
          cx="150"
          cy="150"
          r="40"
          fill="url(#sphere-grad)"
          filter="url(#glow)"
          style={{ animation: "pulse-glow 4s ease-in-out infinite" }}
        />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <circle
            key={`particle-${i}`}
            cx={p.cx}
            cy={p.cy}
            r={p.size}
            fill="rgba(168, 85, 247, 0.6)"
            style={{
              animation: `float-particle ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}

        {/* Data rain lines */}
        {rainLines.map((l, i) => (
          <line
            key={`rain-${i}`}
            x1={l.x}
            y1="220"
            x2={l.x}
            y2="245"
            stroke="rgba(168, 85, 247, 0.35)"
            strokeWidth="1"
            strokeLinecap="round"
            style={{
              animation: `data-rain ${2 + (i % 3) * 0.5}s ease-in-out infinite`,
              animationDelay: l.delay,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
