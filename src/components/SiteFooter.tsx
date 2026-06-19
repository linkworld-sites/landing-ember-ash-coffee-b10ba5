"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

const navGroups = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All Coffees" },
      { href: "/#subscriptions", label: "Subscriptions" },
      { href: "/shop", label: "Gift Sets" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#roast", label: "How We Roast" },
      { href: "/blog", label: "Journal" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/cookies", label: "Cookies" },
    ],
  },
];

export default function SiteFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <footer className="bg-linen border-t border-bone" ref={ref}>
      <div className="px-6 md:px-12 py-20 md:py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Brand blurb */}
          <div className="md:col-span-2">
            <Link href="/" className="font-display italic text-2xl text-ember-dark block mb-4">
              Ember & Ash
            </Link>
            <p className="font-body text-sm text-roast leading-relaxed max-w-xs">
              We roast single-origin coffee to order, in small batches. Every
              bag is dated. Every bean is traceable. The craft is in the
              restraint — nothing added, nothing hidden.
            </p>

            {/* Email signup */}
            <div className="mt-8">
              <p className="font-body text-[11px] tracking-[0.12em] uppercase text-ash mb-3">
                We&apos;ll write when there&apos;s something worth saying.
              </p>
              {submitted ? (
                <p className="font-body text-sm text-ember">Thank you — you&apos;re on the list.</p>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex gap-0 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-transparent border border-bone px-4 py-2.5 font-body text-sm text-ember-dark placeholder:text-ash/50 focus:outline-none focus:border-ash transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-roast text-parchment px-4 py-2.5 font-body text-[11px] tracking-[0.1em] uppercase hover:bg-ember transition-colors"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-4">
              <a href="#" className="text-ash hover:text-ember transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="text-ash hover:text-ember transition-colors" aria-label="Twitter">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="font-body text-[10px] tracking-[0.16em] uppercase text-ash mb-5">
                {group.title}
              </p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-roast hover:text-ember transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-bone flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-body text-[11px] tracking-[0.08em] text-ash">
            © {new Date().getFullYear()} Ember & Ash Coffee. Roasted to order.
          </p>
          <div className="flex gap-6">
            <Link href="/legal/privacy" className="font-body text-[11px] text-ash hover:text-ember transition-colors">
              Privacy
            </Link>
            <Link href="/legal/cookies" className="font-body text-[11px] text-ash hover:text-ember transition-colors">
              Cookies
            </Link>
            <Link href="/blog" className="font-body text-[11px] text-ash hover:text-ember transition-colors">
              Journal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
