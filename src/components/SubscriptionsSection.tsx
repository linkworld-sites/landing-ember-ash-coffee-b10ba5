"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/funnel";

type Frequency = "fortnightly" | "monthly";
type Size = "250g" | "1kg";

const prices: Record<Frequency, Record<Size, number>> = {
  fortnightly: { "250g": 32, "1kg": 58 },
  monthly: { "250g": 29, "1kg": 52 },
};

export default function SubscriptionsSection() {
  const [frequency, setFrequency] = useState<Frequency>("fortnightly");
  const [size, setSize] = useState<Size>("250g");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  const price = prices[frequency][size];

  const handleSubscribe = () => {
    track("intent");
  };

  return (
    <section id="subscriptions" className="bg-ember-dark py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border border-bone/20 p-8 md:p-14"
        >
          {/* Label */}
          <p className="font-body text-[10px] tracking-[0.16em] uppercase text-ash mb-6">
            Subscribe
          </p>

          {/* Headline */}
          <h2 className="font-display text-4xl md:text-5xl text-parchment leading-tight mb-4">
            A new bag,
            <br />
            <em>every time we roast.</em>
          </h2>
          <p className="font-body text-sm text-bone/70 leading-relaxed mb-10 max-w-md">
            We roast to order. Your subscription means a freshly roasted bag arrives on
            your schedule — dated, named, and roasted the day before it ships.
          </p>

          {/* Frequency toggle */}
          <div className="mb-6">
            <p className="font-body text-[10px] tracking-[0.14em] uppercase text-ash mb-3">
              Delivery frequency
            </p>
            <div className="flex gap-3">
              {(["fortnightly", "monthly"] as Frequency[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className="relative px-6 py-2.5 font-body text-[11px] tracking-[0.1em] uppercase overflow-hidden border transition-colors"
                  style={{
                    borderColor: frequency === f ? "#D4C8B0" : "rgba(212,200,176,0.25)",
                    color: frequency === f ? "#F5ECD7" : "#7A6A5A",
                  }}
                >
                  {frequency === f && (
                    <motion.span
                      layoutId="sub-toggle"
                      className="absolute inset-0 bg-bone/10"
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                  )}
                  <span className="relative z-10">{f === "fortnightly" ? "Fortnightly" : "Monthly"}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mb-10">
            <p className="font-body text-[10px] tracking-[0.14em] uppercase text-ash mb-3">
              Bag size
            </p>
            <div className="flex gap-3">
              {(["250g", "1kg"] as Size[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className="relative px-6 py-2.5 font-body text-[11px] tracking-[0.1em] uppercase overflow-hidden border transition-colors"
                  style={{
                    borderColor: size === s ? "#D4C8B0" : "rgba(212,200,176,0.25)",
                    color: size === s ? "#F5ECD7" : "#7A6A5A",
                  }}
                >
                  {size === s && (
                    <motion.span
                      layoutId="size-toggle"
                      className="absolute inset-0 bg-bone/10"
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                  )}
                  <span className="relative z-10">{s}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Live price */}
          <div className="mb-8 flex items-baseline gap-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={price}
                className="font-display text-4xl text-parchment"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
              >
                £{price}
              </motion.span>
            </AnimatePresence>
            <span className="font-body text-[11px] tracking-[0.1em] uppercase text-ash">
              per delivery
            </span>
          </div>

          {/* CTA */}
          <Link href="/shop">
            <motion.button
              type="button"
              onClick={handleSubscribe}
              className="w-full bg-ember text-parchment py-4 font-body text-[12px] tracking-[0.12em] uppercase"
              whileHover={{ opacity: 0.92 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              Start your subscription — £{price} / delivery
            </motion.button>
          </Link>

          <p className="mt-4 text-center font-body text-[10px] tracking-[0.1em] uppercase text-ash/60">
            Cancel anytime · No lock-in · Roasted fresh
          </p>
        </motion.div>
      </div>
    </section>
  );
}
