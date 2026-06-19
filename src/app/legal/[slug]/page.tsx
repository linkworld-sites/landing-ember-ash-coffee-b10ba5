import { notFound } from "next/navigation";
import Link from "next/link";
import { getLegalPage, getLegalSlugs } from "@/lib/legal";
import SiteFooter from "@/components/SiteFooter";

export function generateStaticParams() {
  return getLegalSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return {};
  return { title: `${page.title} — Ember & Ash Coffee` };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  return (
    <main className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-linen border-b border-bone px-6 md:px-12 pt-28 pb-12">
        <Link
          href="/"
          className="font-body text-[11px] tracking-[0.1em] uppercase text-ash hover:text-ember transition-colors mb-6 block"
        >
          ← Home
        </Link>
        <h1 className="font-display text-3xl md:text-4xl text-ember-dark">{page.title}</h1>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 py-16 max-w-3xl">
        <article
          className="post-body"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </div>

      <SiteFooter />
    </main>
  );
}
