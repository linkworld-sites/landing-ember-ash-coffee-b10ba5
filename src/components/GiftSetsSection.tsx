"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface GiftProduct {
  name: string;
  description: string;
  price: string;
  roastBadge: string;
  note: string;
  image: string;
  imageAlt: string;
}

const gifts: GiftProduct[] = [
  {
    name: "The Roastery Trio",
    description:
      "Three 100g bags from our current single-origin selection — each from a different country, each a different process. A tasting journey across the roaster.",
    price: "£45.00",
    roastBadge: "Roasted fresh",
    note: "Ethiopia · Guatemala · Colombia",
    image: "/img/gift-trio.jpg",
    imageAlt: "Three specialty coffee bags from Ember & Ash Coffee",
  },
  {
    name: "The Monthly Gift",
    description:
      "A 250g bag of our featured roast, arriving once a month. For the coffee lover in your life who deserves something new each time.",
    price: "£29.00 / month",
    roastBadge: "Dated on bag",
    note: "Single-origin · Whole bean or ground",
    image: "/img/gift-monthly.jpg",
    imageAlt: "A specialty coffee bag beside a ceramic mug with morning light",
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
        <Image
          src={gift.image}
          alt={gift.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ember-dark/30 via-transparent to-transparent" />
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-ember flex items-center justify-center bg-ember-dark/60 z-10">
          <p className="font-body text-[8px] tracking-[0.1em] uppercase text-parchment text-center leading-tight px-1">
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
