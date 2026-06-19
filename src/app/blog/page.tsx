import Link from "next/link";
import { getPosts } from "@/lib/posts";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Journal — Ember & Ash Coffee",
  description: "Notes from the roastery — on origins, process, and the slow work of making good coffee.",
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <main className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-ember-dark px-6 md:px-12 pt-28 pb-16">
        <p className="font-body text-[11px] tracking-[0.14em] uppercase text-ash mb-3">
          From the Roastery
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-parchment leading-tight">
          Journal.
        </h1>
        <p className="mt-4 font-body text-sm text-bone/70 max-w-md leading-relaxed">
          Notes on coffee, origins, and the slow work of getting it right.
          We write when there&apos;s something worth saying.
        </p>
      </div>

      {/* Posts */}
      <div className="px-6 md:px-12 py-16 md:py-24 max-w-3xl">
        {posts.length === 0 ? (
          <p className="font-body text-base text-ash leading-relaxed">
            New stories are on the way — check back soon.
          </p>
        ) : (
          <ul className="space-y-14">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  {p.date && (
                    <p className="font-body text-[11px] tracking-[0.12em] uppercase text-ash mb-2">
                      {p.date}
                    </p>
                  )}
                  <h2 className="font-display text-3xl text-ember-dark leading-tight group-hover:text-ember transition-colors">
                    {p.title}
                  </h2>
                  {p.description && (
                    <p className="mt-3 font-body text-base text-roast leading-relaxed max-w-xl">
                      {p.description}
                    </p>
                  )}
                  <span className="mt-3 inline-block font-body text-[11px] tracking-[0.1em] uppercase text-ember border-b border-ember/30 pb-0.5 group-hover:border-ember transition-colors">
                    Read →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}
