"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface Coffee {
  origin: string;
  country: string;
  process: string;
  altitude: string;
  price: string;
  note: string;
  image: string;
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
    image: "/products/ethiopia-guji-natural.jpg",
    size: "large",
  },
  {
    origin: "Guatemala Huehue",
    country: "Guatemala",
    process: "Washed Process",
    altitude: "1,600–1,900m",
    price: "£16.00",
    note: "Dark chocolate, walnut, brown sugar.",
    image: "/products/guatemala-huehuetenango.jpg",
    size: "tall",
  },
  {
    origin: "Colombia Nariño",
    country: "Colombia",
    process: "Honey Process",
    altitude: "1,800–2,100m",
    price: "£17.00",
    note: "Red plum, caramel, cedar.",
    image: "/products/colombia-narino.jpg",
    size: "large",
  },
  {
    origin: "Kenya Kirinyaga",
    country: "Kenya",
    process: "Washed Process",
    altitude: "1,750–2,000m",
    price: "£19.00",
    note: "Blackcurrant, tomato leaf, bright acidity.",
    image: "/products/kenya-kirinyaga.jpg",
    size: "tall",
  },
];

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
      {/* Photo */}
      <div
        className={`relative overflow-hidden ${
          coffee.size === "large" ? "aspect-[4/3]" : "aspect-[3/4]"
        }`}
      >
        <Image
          src={coffee.image}
          alt={coffee.origin}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Subtle ember vignette on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-ember-dark/40 via-transparent to-transparent" />
      </div>

      {/* Card content */}
      <div className="mt-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.6rem] leading-tight text-ember-dark">
            {coffee.origin}
          </h3>
          <span className="font-display text-lg text-roast tabular-nums shrink-0">
            {coffee.price}
          </span>
        </div>
        <p className="mt-1 font-body text-[11px] tracking-[0.12em] uppercase text-ash">
          {coffee.country} · {coffee.process} · {coffee.altitude}
        </p>
        <p className="mt-3 font-display italic text-base text-roast leading-snug">
          {coffee.note}
        </p>

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
          <p className="font-body text-[11px] tracking-[0.14em] uppercase text-ash mb-3">
            Current Selection
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ember-dark leading-tight">
            The coffees
            <br />
            <em>we&apos;re roasting now.</em>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:block"
        >
          <Link
            href="/shop"
            className="font-body text-[11px] tracking-[0.12em] uppercase text-ash border-b border-ash/40 pb-0.5 hover:text-ember hover:border-ember transition-colors"
          >
            View all →
          </Link>
        </motion.div>
      </div>

      {/* Asymmetric editorial grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-x-12 gap-y-16">
        <div className="md:col-span-3">
          <CoffeeCard coffee={coffees[0]} index={0} />
        </div>
        <div className="md:col-span-2">
          <CoffeeCard coffee={coffees[1]} index={1} />
        </div>
        <div className="md:col-span-2">
          <CoffeeCard coffee={coffees[2]} index={2} />
        </div>
        <div className="md:col-span-3">
          <CoffeeCard coffee={coffees[3]} index={3} />
        </div>
      </div>

      {/* Mobile view all */}
      <div className="mt-12 text-center md:hidden">
        <Link
          href="/shop"
          className="font-body text-[11px] tracking-[0.12em] uppercase text-ash border-b border-ash/40 pb-0.5"
        >
          View all coffees →
        </Link>
      </div>

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
