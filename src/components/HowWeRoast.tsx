"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

function DrumArt() {
  const spokes = Array.from({ length: 8 }, (_, i) => i);
  return (
    <svg className="w-full h-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="drum-art-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8A045" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#C44B1B" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1A0A00" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="320" fill="#1A0A00" />
      <circle cx="200" cy="160" r="140" fill="url(#drum-art-glow)" />
      <circle cx="200" cy="160" r="130" fill="none" stroke="#C44B1B" strokeWidth="2" strokeOpacity="0.6" />
      <circle cx="200" cy="160" r="95" fill="none" stroke="#E8A045" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="200" cy="160" r="55" fill="none" stroke="#C44B1B" strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="200" cy="160" r="18" fill="#E8A045" fillOpacity="0.3" stroke="#E8A045" strokeWidth="1" strokeOpacity="0.7" />
      {spokes.map((i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={200 + 18 * Math.cos(a)}
            y1={160 + 18 * Math.sin(a)}
            x2={200 + 130 * Math.cos(a)}
            y2={160 + 130 * Math.sin(a)}
            stroke="#C44B1B"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
        );
      })}
      {[60, 90, 120].map((x, i) => (
        <path
          key={i}
          d={`M ${x} 30 Q ${x + 8} 15 ${x} 0`}
          fill="none"
          stroke="#E8A045"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
      ))}
    </svg>
  );
}

function ChaffArt() {
  const particles = Array.from({ length: 45 }, (_, i) => ({
    cx: 20 + (i * 73) % 360,
    cy: 20 + (i * 53) % 280,
    r: 1.5 + (i % 5) * 1.2,
    op: 0.2 + (i % 4) * 0.15,
  }));
  return (
    <svg className="w-full h-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="320" fill="#3D2B1F" />
      <ellipse cx="200" cy="160" rx="200" ry="160" fill="#E8A045" fillOpacity="0.06" />
      {particles.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#E8A045" fillOpacity={p.op} />
      ))}
      {[120, 180, 240, 300].map((x, i) => (
        <path
          key={i}
          d={`M ${x} 280 Q ${x + 12} ${220 - i * 15} ${x - 8} ${160 - i * 10} Q ${x + 6} ${110 - i * 8} ${x} 60`}
          fill="none"
          stroke="#E8A045"
          strokeWidth="0.6"
          strokeOpacity="0.3"
        />
      ))}
      <line x1="40" y1="290" x2="360" y2="290" stroke="#E8A045" strokeWidth="0.5" strokeOpacity="0.2" />
    </svg>
  );
}

function CoolingTrayArt() {
  const rows = 8;
  const cols = 10;
  return (
    <svg className="w-full h-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="tray-glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#C44B1B" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1A0A00" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="320" fill="#1A0A00" />
      <ellipse cx="200" cy="160" rx="200" ry="160" fill="url(#tray-glow)" />
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => {
          const x = 30 + col * 36;
          const y = 28 + row * 34;
          const opacity = 0.25 + ((row * cols + col) % 3) * 0.15;
          return (
            <g key={`${row}-${col}`}>
              <ellipse
                cx={x}
                cy={y}
                rx="11"
                ry="15"
                fill="#3D2B1F"
                fillOpacity={opacity}
                stroke="#C44B1B"
                strokeWidth="0.5"
                strokeOpacity={opacity * 0.8}
                transform={`rotate(${(row * 13 + col * 7) % 30 - 15}, ${x}, ${y})`}
              />
              <line
                x1={x}
                y1={y - 12}
                x2={x}
                y2={y + 12}
                stroke="#1A0A00"
                strokeWidth="1"
                strokeOpacity={opacity * 0.9}
                transform={`rotate(${(row * 13 + col * 7) % 30 - 15}, ${x}, ${y})`}
              />
            </g>
          );
        })
      )}
    </svg>
  );
}

interface PanelData {
  label: string;
  caption: string;
  copy: string;
  art: React.ReactNode;
}

const panels: PanelData[] = [
  {
    label: "01",
    caption: "The Drum\nFive minutes from green.",
    copy: "We roast in small batches on a 12-kilogram drum roaster. The drum retains heat evenly — no hot spots, no scorching. Each roast profile is written by hand and followed without automation. Temperature and time are the only variables we control.",
    art: <DrumArt />,
  },
  {
    label: "02",
    caption: "The Chaff\nFirst crack, then silence.",
    copy: "Around 195°C the beans exhale — a soft crack, and then the chaff separates. That moment tells us more than any probe. We pull the roast shortly after to preserve the origin character: the thing that makes an Ethiopian coffee taste like Ethiopia and not like roast.",
    art: <ChaffArt />,
  },
  {
    label: "03",
    caption: "The Cooling Tray\nRested, then rested again.",
    copy: "The beans cool on an open tray for twelve minutes, stirred continuously. After that, they rest for 24 hours before we bag them. Degassing matters. A rushed bag is a flat cup — and we don't rush.",
    art: <CoolingTrayArt />,
  },
];

function RoastPanel({ panel, index }: { panel: PanelData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="flex flex-col"
      initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-ember-dark">
        {panel.art}
      </div>
      <div className="mt-5">
        <p className="font-body text-[10px] tracking-[0.16em] uppercase text-ash mb-1">
          {panel.label}
        </p>
        <h3 className="font-display text-xl text-ember-dark leading-tight whitespace-pre-line">
          {panel.caption}
        </h3>
      </div>
      <p className="mt-4 font-body text-sm text-roast leading-[1.8]">{panel.copy}</p>
    </motion.div>
  );
}

export default function HowWeRoast() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <section id="roast" className="bg-linen py-24 md:py-32 px-6 md:px-12">
      <div ref={headerRef} className="mb-16">
        <motion.p
          className="font-body text-[11px] tracking-[0.14em] uppercase text-ash mb-3"
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          The Process
        </motion.p>
        <motion.h2
          className="font-display text-4xl md:text-5xl text-ember-dark leading-tight"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          How we roast.
          <br />
          <em>Every time.</em>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {panels.map((panel, i) => (
          <RoastPanel key={panel.label} panel={panel} index={i} />
        ))}
      </div>
    </section>
  );
}
