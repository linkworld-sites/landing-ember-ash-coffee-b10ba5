"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const words = [
  { text: "Stone Fruit.", size: "text-5xl md:text-7xl", offset: "mt-0 ml-0", delay: 0 },
  { text: "Dark Chocolate.", size: "text-3xl md:text-5xl", offset: "mt-6 ml-12 md:ml-24", delay: 0.08 },
  { text: "Jasmine.", size: "text-6xl md:text-8xl", offset: "mt-4 ml-4 md:ml-8", delay: 0.16 },
  { text: "Brown Sugar.", size: "text-2xl md:text-4xl", offset: "mt-8 ml-16 md:ml-40", delay: 0.24 },
  { text: "Cedar.", size: "text-4xl md:text-6xl", offset: "mt-2 ml-2 md:ml-16", delay: 0.32 },
  { text: "Blackcurrant.", size: "text-3xl md:text-5xl", offset: "mt-6 ml-8 md:ml-4", delay: 0.4 },
  { text: "Red Plum.", size: "text-5xl md:text-6xl", offset: "mt-4 ml-20 md:ml-48", delay: 0.48 },
  { text: "Walnut.", size: "text-2xl md:text-3xl", offset: "mt-8 ml-4 md:ml-20", delay: 0.56 },
];

export default function TastingNotes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-parchment py-24 md:py-36 px-6 md:px-12 overflow-hidden">
      <div ref={containerRef} className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.p
          className="font-body text-[11px] tracking-[0.14em] uppercase text-ash mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          The Vocabulary
        </motion.p>

        {/* Staggered typographic words */}
        <div className="relative">
          {words.map((word, i) => (
            <motion.p
              key={word.text}
              className={`font-display text-ember-dark leading-tight block ${word.size} ${word.offset}`}
              initial={{ y: shouldReduce ? 0 : 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.65,
                ease: "easeOut",
                delay: word.delay,
              }}
            >
              {word.text}
            </motion.p>
          ))}
        </div>

        {/* Payoff line */}
        <motion.p
          className="mt-20 font-body text-sm text-ash max-w-xs"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          We write what we taste. Nothing more.
        </motion.p>

        {/* Decorative rule */}
        <motion.div
          className="mt-8 h-px bg-bone max-w-md"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          style={{ transformOrigin: "left" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        />
      </div>
    </section>
  );
}
