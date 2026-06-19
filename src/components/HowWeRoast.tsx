"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface PanelData {
  label: string;
  caption: string;
  copy: string;
  image: string;
  imageAlt: string;
}

const panels: PanelData[] = [
  {
    label: "01",
    caption: "The Drum\nFive minutes from green.",
    copy: "We roast in small batches on a 12-kilogram drum roaster. The drum retains heat evenly — no hot spots, no scorching. Each roast profile is written by hand and followed without automation. Temperature and time are the only variables we control.",
    image: "/img/roast-drum.jpg",
    imageAlt: "Coffee roasting drum glowing with heat",
  },
  {
    label: "02",
    caption: "The Chaff\nFirst crack, then silence.",
    copy: "Around 195°C the beans exhale — a soft crack, and then the chaff separates. That moment tells us more than any probe. We pull the roast shortly after to preserve the origin character: the thing that makes an Ethiopian coffee taste like Ethiopia and not like roast.",
    image: "/img/roast-chaff.jpg",
    imageAlt: "Freshly roasted coffee beans with rising steam and chaff",
  },
  {
    label: "03",
    caption: "The Cooling Tray\nRested, then rested again.",
    copy: "The beans cool on an open tray for twelve minutes, stirred continuously. After that, they rest for 24 hours before we bag them. Degassing matters. A rushed bag is a flat cup — and we don't rush.",
    image: "/img/roast-cooling.jpg",
    imageAlt: "Coffee beans cooling on a wide steel tray in the roastery",
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
      <div className="aspect-[4/3] w-full overflow-hidden relative group">
        <Image
          src={panel.image}
          alt={panel.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ember-dark/50 via-transparent to-transparent" />
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
