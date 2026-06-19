"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

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
      {/* Photo background */}
      <Image
        src="/img/hero-bg.jpg"
        alt="Ember & Ash Coffee roastery"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark cinematic overlay — preserves ember glow aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(26,10,0,0.78) 0%, rgba(26,10,0,0.55) 50%, rgba(26,10,0,0.35) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(26,10,0,0.7) 0%, transparent 55%)",
        }}
      />

      {/* Ember glow tint */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 80% 90%, rgba(196,75,27,0.30) 0%, transparent 60%)",
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
        <span
          className="font-body text-[10px] tracking-[0.15em] uppercase text-ash"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
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
