import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroPoster from "@/assets/landscaping-riyadh.webp";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTABand, SectionHeading } from "@/components/ui-kit";
import { gallery, serviceCategories, site } from "@/lib/site";

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
  const [cat, setCat] = useState("الكل");
  const shown = cat === "الكل" ? gallery : gallery.filter((g) => g.category === cat);

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
          <SectionHeading
            eyebrow="أعمالنا"
            title="مشاريع منفذة داخل الرياض"
            desc="اختر التصنيف لعرض الأعمال المرتبطة به."
          />
          <div className="mt-9 flex flex-wrap justify-center gap-2">
            {serviceCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  cat === c
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((g, i) => (
              <Reveal key={`${g.alt}-${i}`} delay={(i % 3) * 70}>
                <figure className="group overflow-hidden rounded-[var(--radius-2xl)] border border-border shadow-[var(--shadow-soft)]">
                  <img
                    src={g.thumbnailImage ?? g.projectImage}
                    alt={g.alt}
                    className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <figcaption className="bg-card px-4 py-3 text-sm text-muted-foreground">
                    {g.alt}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
