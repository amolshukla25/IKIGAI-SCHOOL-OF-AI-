import React from 'react';

interface IkigaiLogoProps {
  size?: number;       // overall height in px
  className?: string;  // extra wrapper classes
  showText?: boolean;  // render "IKIGAI  SCHOOL OF AI" text beside the mark
  darkMode?: boolean;  // light text for dark backgrounds
}

/**
 * SVG recreation of the Ikigai School of AI brand logo.
 * Atom / orbital mark on the left, wordmark on the right.
 */
export default function IkigaiLogo({
  size = 40,
  className = '',
  showText = true,
  darkMode = false,
}: IkigaiLogoProps) {
  const color = darkMode ? '#ffffff' : '#1e293b'; // slate-800
  const subColor = darkMode ? 'rgba(255,255,255,0.55)' : '#94a3b8'; // slate-400

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* ===== Atom / Orbital Mark ===== */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Orbital ring 1 — horizontal-ish */}
        <ellipse
          cx="50"
          cy="50"
          rx="42"
          ry="18"
          stroke={color}
          strokeWidth="4.5"
          transform="rotate(-15 50 50)"
          fill="none"
        />
        {/* Orbital ring 2 — tilted left */}
        <ellipse
          cx="50"
          cy="50"
          rx="42"
          ry="18"
          stroke={color}
          strokeWidth="4.5"
          transform="rotate(45 50 50)"
          fill="none"
        />
        {/* Orbital ring 3 — tilted right */}
        <ellipse
          cx="50"
          cy="50"
          rx="42"
          ry="18"
          stroke={color}
          strokeWidth="4.5"
          transform="rotate(-75 50 50)"
          fill="none"
        />
        {/* Centre nucleus dot */}
        <circle cx="50" cy="50" r="5" fill={color} />
      </svg>

      {/* ===== Wordmark ===== */}
      {showText && (
        <span className="flex flex-col justify-center select-none leading-none">
          <span
            className="font-black tracking-tight leading-none"
            style={{ color, fontSize: size * 0.45 }}
          >
            IKIGAI
          </span>
          <span
            className="font-extrabold uppercase leading-none"
            style={{
              color: subColor,
              fontSize: size * 0.19,
              letterSpacing: '0.2em',
              marginTop: size * 0.04,
            }}
          >
            School of AI
          </span>
        </span>
      )}
    </span>
  );
}
