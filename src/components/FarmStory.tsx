"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";

export default function FarmStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [1, 1] : [1.0, 1.03]
  );

  const pullQuoteRef = useRef<HTMLQuoteElement>(null);
  const isPullQuoteInView = useInView(pullQuoteRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative bg-parchment overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left — pinned farm image */}
        <div className="relative lg:sticky lg:top-0 lg:h-screen w-full lg:w-1/2 overflow-hidden bg-ember-dark shrink-0">
          <motion.div className="w-full h-full" style={{ scale: imageScale }}>
            <Image
              src="/img/farm-story.jpg"
              alt="Ethiopian coffee farm in the Guji highlands"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Amber tint overlay for brand warmth */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(26,10,0,0.1) 0%, rgba(26,10,0,0.35) 100%)",
              }}
            />
          </motion.div>
          {/* Origin stamp overlay */}
          <div className="absolute bottom-8 left-8 right-8 z-10">
            <div className="inline-block border border-bone/30 px-4 py-2">
              <p className="font-body text-[10px] tracking-[0.15em] uppercase text-bone/70">
                Featured Origin — Ethiopia Guji Natural
              </p>
            </div>
          </div>
        </div>

        {/* Right — scrolling copy */}
        <div className="w-full lg:w-1/2 px-8 md:px-16 py-24 md:py-32 flex flex-col justify-center">
          <p className="font-body text-[11px] tracking-[0.14em] uppercase text-ash mb-8">The Farm Story</p>

          <h2 className="font-display text-4xl md:text-5xl text-ember-dark leading-tight mb-10">
            From one farm.
            <br />
            <em>One harvest. One lot.</em>
          </h2>

          <div className="space-y-6 font-body text-base text-roast leading-[1.8]">
            <p>
              The Guji Zone sits in the highlands of southern Ethiopia, where
              wild coffee trees grow alongside cultivated ones. The farmers here
              have been tending coffee for generations — not as a crop, exactly,
              but as a relationship. The trees remember the hands that pruned
              them.
            </p>
            <p>
              Our lot comes from a single washing station in Shakiso, where
              smallholder farmers deliver their cherries the morning after
              picking. Natural process: the fruit dries intact on raised beds
              for 21–28 days, transferring those dense layers of tropical fruit
              into the seed. Nothing is rushed. The altitude does the work.
            </p>
          </div>

          {/* Pull quote */}
          <motion.blockquote
            ref={pullQuoteRef}
            className="my-12 border-l-2 border-ember pl-6"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={isPullQuoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <p className="font-display italic text-3xl md:text-4xl text-ember leading-snug">
              &ldquo;Stone fruit, jasmine, and a long, warm finish.&rdquo;
            </p>
          </motion.blockquote>

          <div className="space-y-6 font-body text-base text-roast leading-[1.8]">
            <p>
              We cup every lot before it ships, and we write the tasting notes
              ourselves — no marketing copywriter, no template. If the jasmine
              isn&apos;t there, we don&apos;t say jasmine. What you read on the
              bag is what we tasted, nothing more.
            </p>
          </div>

          {/* Metadata table */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-bone pt-8">
            {[
              ["Origin", "Ethiopia, Guji Zone"],
              ["Farm", "Shakiso Washing Station"],
              ["Process", "Natural"],
              ["Altitude", "2,000–2,200m"],
              ["Harvest", "November – January"],
              ["Variety", "Heirloom Ethiopian"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="font-body text-[10px] tracking-[0.14em] uppercase text-ash">{label}</p>
                <p className="font-body text-sm text-roast mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
