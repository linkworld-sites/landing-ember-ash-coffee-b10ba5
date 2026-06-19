"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface Coffee {
  origin: string;
  country: string;
  process: string;
  altitude: string;
  price: string;
  note: string;
  bg: string;
  accent: string;
  size: "large" | "tall";
}

const coffees: Coffee[] = [
  {
    origin: "Ethiopia Guji",
    country: "Ethiopia",
    process: "Natural Process",
    altitude: "2,000–2,200m",
    price: "£18.00",
    note: "Stone fruit, jasmine, and a long, warm finish.",
    bg: "bg-roast",
    accent: "text-amber",
    size: "large",
  },
  {
    origin: "Guatemala Huehue",
    country: "Guatemala",
    process: "Washed Process",
    altitude: "1,600–1,900m",
    price: "£16.00",
    note: "Dark chocolate, walnut, brown sugar.",
    bg: "bg-ember-dark",
    accent: "text-amber",
    size: "tall",
  },
  {
    origin: "Colombia Nariño",
    country: "Colombia",
    process: "Honey Process",
    altitude: "1,800–2,100m",
    price: "£17.00",
    note: "Red plum, caramel, cedar.",
    bg: "bg-roast",
    accent: "text-amber",
    size: "large",
  },
  {
    origin: "Kenya Kirinyaga",
    country: "Kenya",
    process: "Washed Process",
    altitude: "1,750–2,000m",
    price: "£19.00",
    note: "Blackcurrant, tomato leaf, bright acidity.",
    bg: "bg-ember-dark",
    accent: "text-amber",
    size: "tall",
  },
];

function CoffeeBeanArt({ index }: { index: number }) {
  const patterns = [
    // Ethiopia: warm circular layers
    <svg key={0} className="w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="art-glow-0" cx="50%" cy="65%" r="55%">
          <stop offset="0%" stopColor="#E8A045" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#C44B1B" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1A0A00" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill="#3D2B1F" />
      <ellipse cx="200" cy="350" rx="260" ry="220" fill="url(#art-glow-0)" />
      <circle cx="200" cy="350" r="180" fill="none" stroke="#E8A045" strokeWidth="0.8" strokeOpacity="0.35" />
      <circle cx="200" cy="350" r="130" fill="none" stroke="#C44B1B" strokeWidth="1.2" strokeOpacity="0.5" />
      <circle cx="200" cy="350" r="80" fill="none" stroke="#E8A045" strokeWidth="0.6" strokeOpacity="0.4" />
      <ellipse cx="200" cy="350" rx="32" ry="44" fill="#1A0A00" fillOpacity="0.7" />
      <line x1="200" y1="307" x2="200" y2="393" stroke="#3D2B1F" strokeWidth="2.5" strokeOpacity="0.9" />
    </svg>,
    // Guatemala: grid lines, cool
    <svg key={1} className="w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="500" fill="#1A0A00" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={0} y1={i * 42} x2={400} y2={i * 42} stroke="#C44B1B" strokeWidth="0.5" strokeOpacity="0.2" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={i * 50} y1={0} x2={i * 50} y2={500} stroke="#C44B1B" strokeWidth="0.5" strokeOpacity="0.2" />
      ))}
      <ellipse cx="200" cy="280" rx="120" ry="160" fill="none" stroke="#E8A045" strokeWidth="1.5" strokeOpacity="0.5" />
      <ellipse cx="200" cy="280" rx="72" ry="96" fill="#E8A045" fillOpacity="0.08" stroke="#C44B1B" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="200" y1="185" x2="200" y2="375" stroke="#3D2B1F" strokeWidth="3" strokeOpacity="0.7" />
    </svg>,
    // Colombia: honey flowing curves
    <svg key={2} className="w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="art-glow-2" cx="40%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#C44B1B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3D2B1F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill="#3D2B1F" />
      <ellipse cx="160" cy="280" rx="280" ry="240" fill="url(#art-glow-2)" />
      <path d="M 0 400 Q 100 250 200 350 Q 300 450 400 280" fill="none" stroke="#E8A045" strokeWidth="1.5" strokeOpacity="0.4" />
      <path d="M 0 450 Q 120 300 220 380 Q 320 460 400 320" fill="none" stroke="#C44B1B" strokeWidth="1" strokeOpacity="0.3" />
      <path d="M 0 350 Q 80 200 180 300 Q 280 400 400 230" fill="none" stroke="#E8A045" strokeWidth="0.8" strokeOpacity="0.3" />
      <ellipse cx="200" cy="280" rx="38" ry="52" fill="#1A0A00" fillOpacity="0.65" />
      <line x1="200" y1="229" x2="200" y2="331" stroke="#3D2B1F" strokeWidth="2.5" strokeOpacity="0.9" />
    </svg>,
    // Kenya: bright geometric
    <svg key={3} className="w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="500" fill="#1A0A00" />
      <polygon points="200,80 360,400 40,400" fill="none" stroke="#C44B1B" strokeWidth="1" strokeOpacity="0.4" />
      <polygon points="200,140 320,380 80,380" fill="none" stroke="#E8A045" strokeWidth="0.7" strokeOpacity="0.35" />
      <polygon points="200,200 280,360 120,360" fill="#C44B1B" fillOpacity="0.08" stroke="#C44B1B" strokeWidth="1" strokeOpacity="0.5" />
      <ellipse cx="200" cy="290" rx="30" ry="42" fill="#E8A045" fillOpacity="0.12" stroke="#E8A045" strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="200" y1="249" x2="200" y2="331" stroke="#1A0A00" strokeWidth="3" strokeOpacity="0.8" />
    </svg>,
  ];
  return patterns[index % patterns.length];
}

function CoffeeCard({ coffee, index }: { coffee: Coffee; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="group flex flex-col"
      initial={{ y: shouldReduce ? 0 : 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.12 }}
    >
      {/* Visual */}
      <div className={`relative overflow-hidden ${coffee.size === "large" ? "aspect-[4/3]" : "aspect-[3/4]"}`}>
        <div className="absolute inset-0">
          <CoffeeBeanArt index={index} />
        </div>
        {/* Placeholder label */}
        <div className="absolute bottom-4 left-4 bg-ember-dark/70 px-3 py-1">
          <span className="font-body text-[9px] tracking-[0.14em] uppercase text-bone/70">
            [Product photo placeholder]
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="mt-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.6rem] leading-tight text-ember-dark">{coffee.origin}</h3>
          <span className="font-display text-lg text-roast tabular-nums shrink-0">{coffee.price}</span>
        </div>
        <p className="mt-1 font-body text-[11px] tracking-[0.12em] uppercase text-ash">
          {coffee.country} · {coffee.process} · {coffee.altitude}
        </p>
        <p className="mt-3 font-display italic text-base text-roast leading-snug">{coffee.note}</p>

        {/* Add to cart — underline-draw link */}
        <div className="mt-4">
          <Link
            href="/shop"
            className="cart-link inline-block font-body text-[12px] tracking-[0.1em] uppercase text-ember pb-0.5"
          >
            Add to Cart
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedShop() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-parchment px-6 md:px-12 py-24 md:py-32">
      {/* Section header */}
      <div ref={headerRef} className="flex items-baseline justify-between mb-16">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-body text-[11px] tracking-[0.14em] uppercase text-ash mb-3">Current Selection</p>
          <h2 className="font-display text-4xl md:text-5xl text-ember-dark leading-tight">
            The coffees
            <br />
            <em>we're roasting now.</em>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:block"
        >
          <Link href="/shop" className="font-body text-[11px] tracking-[0.12em] uppercase text-ash border-b border-ash/40 pb-0.5 hover:text-ember hover:border-ember transition-colors">
            View all →
          </Link>
        </motion.div>
      </div>

      {/* Asymmetric editorial grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-x-12 gap-y-16">
        {/* Row 1: large (60%) + tall (40%) */}
        <div className="md:col-span-3">
          <CoffeeCard coffee={coffees[0]} index={0} />
        </div>
        <div className="md:col-span-2">
          <CoffeeCard coffee={coffees[1]} index={1} />
        </div>
        {/* Row 2: tall (40%) + large (60%) */}
        <div className="md:col-span-2">
          <CoffeeCard coffee={coffees[2]} index={2} />
        </div>
        <div className="md:col-span-3">
          <CoffeeCard coffee={coffees[3]} index={3} />
        </div>
      </div>

      {/* Mobile view all */}
      <div className="mt-12 text-center md:hidden">
        <Link href="/shop" className="font-body text-[11px] tracking-[0.12em] uppercase text-ash border-b border-ash/40 pb-0.5">
          View all coffees →
        </Link>
      </div>

      {/* Brand sub-copy */}
      <motion.p
        className="mt-20 max-w-md mx-auto text-center font-body text-sm text-ash leading-relaxed"
        initial={{ opacity: 0 }}
        animate={isHeaderInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Every bag carries a roast date. We think you deserve to know.
      </motion.p>
    </section>
  );
}
