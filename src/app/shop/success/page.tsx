"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { track } from "@/lib/funnel";

export default function SuccessPage() {
  useEffect(() => {
    track("purchase");
    track("convert");
  }, []);

  return (
    <main className="min-h-screen bg-parchment flex items-center justify-center px-6">
      <motion.div
        className="max-w-lg text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Stamp mark */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-ember mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C44B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-display text-4xl md:text-5xl text-ember-dark leading-tight mb-4">
          Your order is<br /><em>on its way to the drum.</em>
        </h1>

        <p className="font-body text-base text-roast leading-relaxed mb-3">
          We&apos;ll roast your coffee fresh and ship it with a roast date on
          every bag. You&apos;ll receive a confirmation email shortly.
        </p>

        <p className="font-body text-sm text-ash mb-10">
          Questions? Reply to your confirmation email — we read every one.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="font-body text-[11px] tracking-[0.12em] uppercase text-roast border border-bone px-8 py-3 hover:border-ember hover:text-ember transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="font-body text-[11px] tracking-[0.12em] uppercase bg-ember text-parchment px-8 py-3 hover:opacity-90 transition-opacity"
          >
            Back Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
