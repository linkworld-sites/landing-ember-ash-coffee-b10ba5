"use client";

import { useEffect } from "react";
import { track } from "@/lib/funnel";
import ShopClient from "@/components/ShopClient";
import type { Product } from "@/lib/checkout";
import SiteFooter from "@/components/SiteFooter";

export default function ShopPageClient({ initialProducts }: { initialProducts: Product[] }) {
  useEffect(() => {
    track("product_view");
  }, []);

  return (
    <main className="min-h-screen bg-parchment">
      {/* Shop header */}
      <div className="bg-ember-dark px-6 md:px-12 pt-28 pb-16">
        <p className="font-body text-[11px] tracking-[0.14em] uppercase text-ash mb-3">
          The Selection
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-parchment leading-tight">
          Every bag carries
          <br />
          <em>a roast date.</em>
        </h1>
        <p className="mt-6 font-body text-sm text-bone/70 max-w-md leading-relaxed">
          We roast to order. Nothing sits in a warehouse. Nothing ships stale.
          Every bag you receive was roasted days before it left the drum.
        </p>
      </div>

      {/* Shop grid */}
      <div className="px-6 md:px-12 py-16 md:py-24">
        <ShopClient products={initialProducts} />
      </div>

      <SiteFooter />
    </main>
  );
}
