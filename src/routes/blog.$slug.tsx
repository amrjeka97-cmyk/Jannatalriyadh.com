import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Card, CTABand, SectionHeading } from "@/components/ui-kit";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/icons";
import { posts, site } from "@/lib/site";

const BASE = site.url;

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return { meta: [{ title: "المقال غير متوفر" }, { name: "robots", content: "noindex" }] };
    }
    const url = `${BASE}/blog/${params.slug}`;
    const title = `${post.title} | مدونة ${site.nameAr}`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            articleSection: post.category,
            inLanguage: "ar",
            mainEntityOfPage: url,
            author: { "@type": "Organization", name: site.nameAr },
            publisher: { "@type": "Organization", name: site.nameAr },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${BASE}/` },
              { "@type": "ListItem", position: 2, name: "المدونة", item: `${BASE}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: PostDetail,
});

function PostDetail() {
  const { post } = Route.useLoaderData();
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        title={post.title}
        desc={post.excerpt}
        image={post.articleImage}
        crumbs={[
          { label: "الرئيسية", to: "/" },
          { label: "المدونة", to: "/blog" },
          { label: post.title },
        ]}
      />

      <section className="section-y">
        <div className="container-x max-w-3xl">
          <p className="text-xs font-bold text-primary">
            {post.category} — {post.date}
          </p>
          <div className="mt-6 space-y-5">
            {post.body.map((p, i) => {
              if (p.startsWith("## ")) {
                return (
                  <h2 key={i} className="mt-8 text-xl font-bold text-foreground md:text-2xl">
                    {p.replace("## ", "")}
                  </h2>
                );
              }
              const parts = p.split(/(\[[^\]]+\]\([^)]+\))/g);
              if (parts.length > 1) {
                return (
                  <p key={i} className="leading-8 text-muted-foreground md:text-lg">
                    {parts.map((part, j) => {
                      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
                      if (match) {
                        return (
                          <Link
                            key={j}
                            to={match[2] as never}
                            className="font-semibold text-primary hover:underline"
                          >
                            {match[1]}
                          </Link>
                        );
                      }
                      return <span key={j}>{part}</span>;
                    })}
                  </p>
                );
              }
              return (
                <p key={i} className="leading-8 text-muted-foreground md:text-lg">
                  {p}
                </p>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-x">
          <SectionHeading eyebrow="اقرأ أيضًا" title="مقالات ذات صلة" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <Card className="flex h-full flex-col">
                  <img
                    src={p.thumbnailImage ?? p.articleImage}
                    alt={p.title}
                    className="h-40 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-base text-foreground">{p.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                      {p.excerpt}
                    </p>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
                    >
                      اقرأ المقال <ArrowIcon />
                    </Link>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
