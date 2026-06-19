"use client";

import { motion, useReducedMotion } from "framer-motion";

function DrumBackground() {
  const spokes = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ember-glow" cx="78%" cy="80%" r="55%">
          <stop offset="0%" stopColor="#C44B1B" stopOpacity="0.75" />
          <stop offset="35%" stopColor="#E8A045" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1A0A00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8A045" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C44B1B" stopOpacity="0" />
        </radialGradient>
        <filter id="grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" seed="5" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey-noise" />
          <feBlend in="SourceGraphic" in2="grey-noise" mode="multiply" />
        </filter>
      </defs>

      {/* Dark base handled by parent div */}

      {/* Ember glow ellipse */}
      <ellipse cx="1150" cy="760" rx="680" ry="560" fill="url(#ember-glow)" />

      {/* Roast drum — outer ring */}
      <circle cx="1140" cy="660" r="360" fill="none" stroke="#C44B1B" strokeWidth="1.2" strokeOpacity="0.28" />
      {/* Drum — middle ring */}
      <circle cx="1140" cy="660" r="290" fill="none" stroke="#E8A045" strokeWidth="0.7" strokeOpacity="0.22" />
      {/* Drum — inner ring with glow fill */}
      <circle cx="1140" cy="660" r="210" fill="url(#center-glow)" stroke="#C44B1B" strokeWidth="1.5" strokeOpacity="0.45" />
      {/* Drum hub */}
      <circle cx="1140" cy="660" r="28" fill="none" stroke="#E8A045" strokeWidth="1" strokeOpacity="0.5" />

      {/* Drum spokes */}
      {spokes.map((i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={1140 + 28 * Math.cos(a)}
            y1={660 + 28 * Math.sin(a)}
            x2={1140 + 360 * Math.cos(a)}
            y2={660 + 360 * Math.sin(a)}
            stroke="#C44B1B"
            strokeWidth="0.5"
            strokeOpacity="0.22"
          />
        );
      })}

      {/* Coffee bean silhouettes — scattered left side */}
      <g fill="#3D2B1F" fillOpacity="0.5">
        <ellipse cx="148" cy="280" rx="20" ry="28" transform="rotate(-28, 148, 280)" />
        <line x1="148" y1="253" x2="148" y2="307" stroke="#1A0A00" strokeWidth="1.5" strokeOpacity="0.8" transform="rotate(-28, 148, 280)" />

        <ellipse cx="320" cy="178" rx="17" ry="24" transform="rotate(18, 320, 178)" />
        <line x1="320" y1="155" x2="320" y2="201" stroke="#1A0A00" strokeWidth="1.2" strokeOpacity="0.8" transform="rotate(18, 320, 178)" />

        <ellipse cx="95" cy="480" rx="19" ry="26" transform="rotate(-12, 95, 480)" />
        <line x1="95" y1="455" x2="95" y2="505" stroke="#1A0A00" strokeWidth="1.3" strokeOpacity="0.8" transform="rotate(-12, 95, 480)" />

        <ellipse cx="460" cy="380" rx="16" ry="22" transform="rotate(38, 460, 380)" />
        <line x1="460" y1="359" x2="460" y2="401" stroke="#1A0A00" strokeWidth="1" strokeOpacity="0.8" transform="rotate(38, 460, 380)" />

        <ellipse cx="240" cy="590" rx="18" ry="25" transform="rotate(-5, 240, 590)" />
        <line x1="240" y1="566" x2="240" y2="614" stroke="#1A0A00" strokeWidth="1.2" strokeOpacity="0.8" transform="rotate(-5, 240, 590)" />

        <ellipse cx="580" cy="220" rx="15" ry="21" transform="rotate(-42, 580, 220)" />
        <line x1="580" y1="200" x2="580" y2="240" stroke="#1A0A00" strokeWidth="1" strokeOpacity="0.8" transform="rotate(-42, 580, 220)" />

        <ellipse cx="380" cy="720" rx="17" ry="23" transform="rotate(22, 380, 720)" />
        <line x1="380" y1="698" x2="380" y2="742" stroke="#1A0A00" strokeWidth="1.1" strokeOpacity="0.8" transform="rotate(22, 380, 720)" />
      </g>

      {/* Steam wisps rising from drum center */}
      <g fill="none" stroke="#E8A045" strokeLinecap="round">
        <path d="M 760 480 Q 772 455 760 430 Q 748 405 760 378 Q 772 351 760 324" strokeWidth="1.5" strokeOpacity="0.3" />
        <path d="M 785 510 Q 797 482 785 455 Q 773 428 785 400 Q 797 372 785 345" strokeWidth="1" strokeOpacity="0.2" />
        <path d="M 738 500 Q 726 472 738 445 Q 750 418 738 390" strokeWidth="1.2" strokeOpacity="0.22" />
      </g>

      {/* Subtle grain overlay */}
      <rect width="1440" height="900" fill="#1A0A00" fillOpacity="0.06" filter="url(#grain)" />
    </svg>
  );
}

export default function HeroSection() {
  const shouldReduce = useReducedMotion();

  const line1Variants = {
    hidden: { x: shouldReduce ? 0 : -40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const line2Variants = {
    hidden: { x: shouldReduce ? 0 : 40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
    },
  };

  const subVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.7 },
    },
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-ember-dark">
      {/* Abstract background */}
      <DrumBackground />

      {/* Dark vignette on left side to ensure text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(26,10,0,0.65) 0%, rgba(26,10,0,0.3) 55%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(26,10,0,0.5) 0%, transparent 50%)",
        }}
      />

      {/* Headline — bottom left */}
      <div className="absolute bottom-16 left-6 md:left-12 lg:left-16 max-w-[700px] z-10">
        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-parchment leading-none"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            initial="hidden"
            animate="visible"
            variants={line1Variants}
          >
            Roasted the day
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.p
            className="font-display text-parchment leading-none"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            initial="hidden"
            animate="visible"
            variants={line2Variants}
          >
            we receive your order.
          </motion.p>
        </div>

        <motion.p
          className="mt-6 font-body text-[11px] tracking-[0.14em] uppercase text-bone/80 max-w-xs"
          initial="hidden"
          animate="visible"
          variants={subVariants}
        >
          Single-origin · Direct trade · Every bag dated
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 right-8 md:right-12 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="font-body text-[10px] tracking-[0.15em] uppercase text-ash writing-mode-vertical"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-ash/50"
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
