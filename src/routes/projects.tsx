import { createFileRoute } from "@tanstack/react-router";
import heroPoster from "@/assets/landscaping-riyadh.webp";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTABand, SectionHeading } from "@/components/ui-kit";
import { gallery, site } from "@/lib/site";

const BASE = site.url;
const title = "أعمالنا | معرض مشاريع تنسيق حدائق بالرياض | جنات الرياض";
const description =
  "معرض أعمال جنات الرياض: صور مشاريع تنسيق حدائق وثيل طبيعي وعشب صناعي ومظلات وجلسات وشلالات نفذها فريقنا داخل الرياض.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${BASE}/projects` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/projects` }],
  }),
  component: Projects,
});

function Projects() {
  return (
    <>
      <PageHero
        title="معرض أعمال تنسيق الحدائق بالرياض"
        desc={`نماذج من أكثر من ${site.projects} مشروعًا نفذها فريقنا داخل مدينة الرياض بين فلل ومنازل واستراحات ومشاريع تجارية.`}
        image={heroPoster}
        crumbs={[{ label: "الرئيسية", to: "/" }, { label: "أعمالنا" }]}
      />

      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="أعمالنا" title="مشاريع منفذة داخل الرياض" />
          <div className="mt-8 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {gallery.map((g, i) => {
              const featured = i === 0 || i === 6;
              const variedRatio = i % 4 === 2;

              return (
                <Reveal
                  key={`${g.alt}-${i}`}
                  delay={(i % 3) * 70}
                  className={featured ? "sm:col-span-2" : ""}
                >
                  <figure className="group overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-card shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-medium)]">
                    <img
                      src={g.projectImage}
                      alt={g.alt}
                      className={`block h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
                        featured
                          ? "aspect-[4/3] sm:aspect-[16/8]"
                          : variedRatio
                            ? "aspect-[4/3] sm:aspect-[3/2]"
                            : "aspect-[4/3]"
                      }`}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
