import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";
import SiteFooter from "@/components/SiteFooter";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Ember & Ash Journal`,
    description: post.description,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-ember-dark px-6 md:px-12 pt-28 pb-16 max-w-4xl">
        <Link
          href="/blog"
          className="font-body text-[11px] tracking-[0.1em] uppercase text-ash hover:text-bone transition-colors mb-8 block"
        >
          ← Journal
        </Link>
        {post.date && (
          <p className="font-body text-[11px] tracking-[0.12em] uppercase text-ash mb-4">
            {post.date}
          </p>
        )}
        <h1 className="font-display text-4xl md:text-5xl text-parchment leading-tight">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-4 font-body text-base text-bone/70 max-w-xl leading-relaxed">
            {post.description}
          </p>
        )}
      </div>

      {/* Article */}
      <div className="px-6 md:px-12 py-16 max-w-3xl">
        <article
          className="post-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="mt-16 pt-8 border-t border-bone">
          <Link
            href="/blog"
            className="font-body text-[11px] tracking-[0.1em] uppercase text-ash hover:text-ember transition-colors"
          >
            ← Back to Journal
          </Link>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
