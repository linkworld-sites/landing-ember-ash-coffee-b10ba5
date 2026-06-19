"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useCart } from "@/components/CartContext";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/#subscriptions", label: "Subscriptions" },
  { href: "/#roast", label: "Our Roast" },
  { href: "/blog", label: "Journal" },
];

export default function NavHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-parchment/95 backdrop-blur-sm border-b border-bone/60 shadow-sm"
            : "bg-parchment/80 backdrop-blur-sm"
        }`}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 h-16">
          {/* Wordmark */}
          <Link href="/" className="font-display italic text-xl text-ember-dark tracking-tight hover:text-ember transition-colors">
            Ember & Ash
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
                <Link
                  href={link.href}
                  className="font-body text-[11px] tracking-[0.12em] uppercase text-roast hover:text-ember transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Cart */}
            <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
              <Link
                href="/shop"
                className="font-body text-[11px] tracking-[0.12em] uppercase text-roast hover:text-ember transition-colors flex items-center gap-2"
              >
                Cart
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-ember text-parchment text-[10px] font-body font-medium leading-none"
                  >
                    {count}
                  </motion.span>
                )}
              </Link>
            </motion.div>
          </div>

          {/* Mobile: cart + menu hint */}
          <div className="flex md:hidden items-center gap-4">
            <Link
              href="/shop"
              className="font-body text-[11px] tracking-[0.12em] uppercase text-roast flex items-center gap-2"
            >
              Cart
              {count > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-ember text-parchment text-[10px]">
                  {count}
                </span>
              )}
            </Link>
            <Link href="/shop" className="font-body text-[11px] tracking-[0.12em] uppercase text-roast">
              Shop
            </Link>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
