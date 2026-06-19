"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";

function FarmArt() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 700 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="farm-sky" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#E8A045" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3D2B1F" stopOpacity="0.9" />
        </radialGradient>
        <linearGradient id="farm-ground" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3D2B1F" />
          <stop offset="100%" stopColor="#1A0A00" />
        </linearGradient>
        <filter id="farm-blur">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="700" height="900" fill="url(#farm-sky)" />

      {/* Rolling hills — layered */}
      <path d="M 0 600 Q 175 500 350 560 Q 525 620 700 520 L 700 900 L 0 900 Z" fill="#3D2B1F" />
      <path d="M 0 650 Q 200 570 400 620 Q 560 660 700 580 L 700 900 L 0 900 Z" fill="#1A0A00" fillOpacity="0.8" />
      <path d="M 0 720 Q 150 680 300 700 Q 450 720 700 670 L 700 900 L 0 900 Z" fill="#1A0A00" />

      {/* Sun / light source */}
      <circle cx="350" cy="260" r="90" fill="#E8A045" fillOpacity="0.18" />
      <circle cx="350" cy="260" r="55" fill="#E8A045" fillOpacity="0.25" />
      <circle cx="350" cy="260" r="28" fill="#E8A045" fillOpacity="0.55" />

      {/* Coffee plant silhouettes on hills */}
      <g fill="#1A0A00" fillOpacity="0.75">
        {[80, 160, 260, 360, 440, 560, 640].map((x, i) => {
          const y = 545 + (i % 3) * 18;
          const h = 45 + (i % 2) * 20;
          return (
            <g key={x}>
              <rect x={x - 2} y={y - h} width={4} height={h} />
              <ellipse cx={x} cy={y - h} rx={16 + (i % 3) * 4} ry={10} />
              <ellipse cx={x} cy={y - h * 0.6} rx={20 + (i % 3) * 4} ry={12} />
            </g>
          );
        })}
      </g>

      {/* Atmospheric haze lines */}
      {[380, 420, 460, 500].map((y, i) => (
        <line key={y} x1={0} y1={y} x2={700} y2={y} stroke="#E8A045" strokeWidth="0.4" strokeOpacity={0.08 - i * 0.015} />
      ))}

      {/* Foreground texture — soil rows */}
      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={i}
          d={`M 0 ${730 + i * 22} Q 350 ${720 + i * 22} 700 ${730 + i * 22}`}
          fill="none"
          stroke="#3D2B1F"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
      ))}

      {/* "Origin" stamp text mark */}
      <text
        x="350"
        y="860"
        textAnchor="middle"
        fontFamily="var(--font-dm-sans), system-ui"
        fontSize="9"
        letterSpacing="4"
        fill="#E8A045"
        fillOpacity="0.5"
        textDecoration="none"
      >
        GUJI ZONE · ETHIOPIA · 2,100M
      </text>
    </svg>
  );
}

export default function FarmStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [1, 1] : [1.0, 1.03]
  );

  const pullQuoteRef = useRef<HTMLQuoteElement>(null);
  const isPullQuoteInView = useInView(pullQuoteRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative bg-parchment overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left — pinned farm image */}
        <div className="relative lg:sticky lg:top-0 lg:h-screen w-full lg:w-1/2 overflow-hidden bg-ember-dark shrink-0">
          <motion.div className="w-full h-full" style={{ scale: imageScale }}>
            <FarmArt />
          </motion.div>
          {/* Origin stamp overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="inline-block border border-bone/30 px-4 py-2">
              <p className="font-body text-[10px] tracking-[0.15em] uppercase text-bone/70">
                Featured Origin — Ethiopia Guji Natural
              </p>
            </div>
          </div>
        </div>

        {/* Right — scrolling copy */}
        <div className="w-full lg:w-1/2 px-8 md:px-16 py-24 md:py-32 flex flex-col justify-center">
          <p className="font-body text-[11px] tracking-[0.14em] uppercase text-ash mb-8">The Farm Story</p>

          <h2 className="font-display text-4xl md:text-5xl text-ember-dark leading-tight mb-10">
            From one farm.
            <br />
            <em>One harvest. One lot.</em>
          </h2>

          <div className="space-y-6 font-body text-base text-roast leading-[1.8]">
            <p>
              The Guji Zone sits in the highlands of southern Ethiopia, where
              wild coffee trees grow alongside cultivated ones. The farmers here
              have been tending coffee for generations — not as a crop, exactly,
              but as a relationship. The trees remember the hands that pruned
              them.
            </p>
            <p>
              Our lot comes from a single washing station in Shakiso, where
              smallholder farmers deliver their cherries the morning after
              picking. Natural process: the fruit dries intact on raised beds
              for 21–28 days, transferring those dense layers of tropical fruit
              into the seed. Nothing is rushed. The altitude does the work.
            </p>
          </div>

          {/* Pull quote */}
          <motion.blockquote
            ref={pullQuoteRef}
            className="my-12 border-l-2 border-ember pl-6"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={isPullQuoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <p className="font-display italic text-3xl md:text-4xl text-ember leading-snug">
              &ldquo;Stone fruit, jasmine, and a long, warm finish.&rdquo;
            </p>
          </motion.blockquote>

          <div className="space-y-6 font-body text-base text-roast leading-[1.8]">
            <p>
              We cup every lot before it ships, and we write the tasting notes
              ourselves — no marketing copywriter, no template. If the jasmine
              isn&apos;t there, we don&apos;t say jasmine. What you read on the
              bag is what we tasted, nothing more.
            </p>
          </div>

          {/* Metadata table */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-bone pt-8">
            {[
              ["Origin", "Ethiopia, Guji Zone"],
              ["Farm", "Shakiso Washing Station"],
              ["Process", "Natural"],
              ["Altitude", "2,000–2,200m"],
              ["Harvest", "November – January"],
              ["Variety", "Heirloom Ethiopian"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="font-body text-[10px] tracking-[0.14em] uppercase text-ash">{label}</p>
                <p className="font-body text-sm text-roast mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
