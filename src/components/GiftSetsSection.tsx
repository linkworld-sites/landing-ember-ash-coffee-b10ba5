"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface GiftProduct {
  name: string;
  description: string;
  price: string;
  roastBadge: string;
  note: string;
  art: React.ReactNode;
}

function TrioArt() {
  return (
    <svg className="w-full h-full" viewBox="0 0 400 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="trio-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EDE4CC" />
          <stop offset="100%" stopColor="#D4C8B0" />
        </linearGradient>
      </defs>
      <rect width="400" height="420" fill="url(#trio-bg)" />
      {[80, 190, 300].map((x, i) => (
        <g key={x}>
          <rect
            x={x - 35}
            y={80 + i * 15}
            width={70}
            height={200 - i * 10}
            rx={4}
            fill="#3D2B1F"
            fillOpacity={0.08 + i * 0.03}
            stroke="#3D2B1F"
            strokeWidth="1"
            strokeOpacity={0.2 + i * 0.05}
          />
          <rect
            x={x - 28}
            y={85 + i * 15}
            width={56}
            height={16}
            rx={2}
            fill="#C44B1B"
            fillOpacity={0.35 + i * 0.05}
          />
          <text
            x={x}
            y={98 + i * 15}
            textAnchor="middle"
            fontFamily="var(--font-dm-sans), system-ui"
            fontSize="7"
            letterSpacing="1.5"
            fill="#F5ECD7"
            fillOpacity="0.9"
          >
            EMBER & ASH
          </text>
        </g>
      ))}
      <ellipse cx="200" cy="360" rx="180" ry="12" fill="#3D2B1F" fillOpacity="0.08" />
      <text
        x="200"
        y="405"
        textAnchor="middle"
        fontFamily="var(--font-dm-sans), system-ui"
        fontSize="8"
        letterSpacing="2"
        fill="#7A6A5A"
        fillOpacity="0.7"
      >
        [Product photo placeholder]
      </text>
    </svg>
  );
}

function SingleBagArt() {
  return (
    <svg className="w-full h-full" viewBox="0 0 400 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="single-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EDE4CC" />
          <stop offset="100%" stopColor="#D4C8B0" />
        </linearGradient>
      </defs>
      <rect width="400" height="420" fill="url(#single-bg)" />
      <rect x="110" y="60" width="180" height="260" rx="6" fill="#3D2B1F" fillOpacity="0.12" stroke="#3D2B1F" strokeWidth="1.5" strokeOpacity="0.25" />
      <circle cx="200" cy="120" r="12" fill="none" stroke="#C44B1B" strokeWidth="1.2" strokeOpacity="0.5" />
      <circle cx="200" cy="120" r="6" fill="#C44B1B" fillOpacity="0.3" />
      <rect x="130" y="155" width="140" height="80" rx="3" fill="#C44B1B" fillOpacity="0.15" stroke="#C44B1B" strokeWidth="0.8" strokeOpacity="0.4" />
      <text x="200" y="180" textAnchor="middle" fontFamily="var(--font-playfair), serif" fontSize="13" fill="#3D2B1F" fillOpacity="0.8">Ember & Ash</text>
      <text x="200" y="200" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui" fontSize="7" letterSpacing="2" fill="#7A6A5A">ROAST-TO-ORDER</text>
      <ellipse cx="200" cy="340" rx="90" ry="8" fill="#3D2B1F" fillOpacity="0.07" />
      <text x="200" y="408" textAnchor="middle" fontFamily="var(--font-dm-sans), system-ui" fontSize="8" letterSpacing="2" fill="#7A6A5A" fillOpacity="0.7">[Product photo placeholder]</text>
    </svg>
  );
}

const gifts: GiftProduct[] = [
  {
    name: "The Roastery Trio",
    description:
      "Three 100g bags from our current single-origin selection — each from a different country, each a different process. A tasting journey across the roaster.",
    price: "£45.00",
    roastBadge: "Roasted fresh",
    note: "Ethiopia · Guatemala · Colombia",
    art: <TrioArt />,
  },
  {
    name: "The Monthly Gift",
    description:
      "A 250g bag of our featured roast, arriving once a month. For the coffee lover in your life who deserves something new each time.",
    price: "£29.00 / month",
    roastBadge: "Dated on bag",
    note: "Single-origin · Whole bean or ground",
    art: <SingleBagArt />,
  },
];

function GiftCard({ gift, index }: { gift: GiftProduct; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={cardRef}
      className="group flex flex-col"
      initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
      animate={isCardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.12 }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-linen">
        {gift.art}
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-ember flex items-center justify-center bg-ember/10">
          <p className="font-body text-[8px] tracking-[0.1em] uppercase text-ember text-center leading-tight px-1">
            {gift.roastBadge}
          </p>
        </div>
      </div>
      <div className="mt-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl text-ember-dark">{gift.name}</h3>
          <span className="font-display text-lg text-roast shrink-0">{gift.price}</span>
        </div>
        <p className="mt-1 font-body text-[11px] tracking-[0.1em] uppercase text-ash">{gift.note}</p>
        <p className="mt-3 font-body text-sm text-roast leading-relaxed">{gift.description}</p>
        <div className="mt-5">
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

export default function GiftSetsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-linen py-24 md:py-32 px-6 md:px-12">
      <div ref={headerRef} className="mb-16">
        <motion.p
          className="font-body text-[11px] tracking-[0.14em] uppercase text-ash mb-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Gifts & Bundles
        </motion.p>
        <motion.h2
          className="font-display text-4xl md:text-5xl text-ember-dark leading-tight"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Bag & Gift Sets.
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
        {gifts.map((gift, i) => (
          <GiftCard key={gift.name} gift={gift} index={i} />
        ))}
      </div>
    </section>
  );
}
