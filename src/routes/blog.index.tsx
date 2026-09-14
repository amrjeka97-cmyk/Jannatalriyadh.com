import { createFileRoute, Link } from "@tanstack/react-router";
import heroPoster from "@/assets/landscaping-riyadh.webp";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Card, CTABand, SectionHeading } from "@/components/ui-kit";
import { ArrowIcon } from "@/components/icons";
import { posts, site } from "@/lib/site";

const BASE = site.url;
const title = "المدونة | نصائح تنسيق الحدائق بالرياض | جنات الرياض";
const description =
  "مقالات ونصائح عن تنسيق الحدائق بالرياض: أنواع الثيل، اختيار العشب الصناعي، تكاليف التنسيق، النباتات المناسبة وشبكات الري.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${BASE}/blog` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/blog` }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <PageHero
        title="مدونة جنات الرياض"
        desc="مقالات عملية تساعدك في اتخاذ قرارات صحيحة قبل وبعد تنسيق حديقتك."
        image={heroPoster}
        crumbs={[{ label: "الرئيسية", to: "/" }, { label: "المدونة" }]}
      />

      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="المدونة" title="أحدث المقالات" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <Card className="flex h-full flex-col">
                  <img
                    src={p.thumbnailImage ?? p.articleImage}
                    alt={p.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-bold text-primary">{p.category}</p>
                    <h2 className="mt-2 text-base text-foreground">{p.title}</h2>
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
