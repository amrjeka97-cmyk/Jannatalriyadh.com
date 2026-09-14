import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/landscaping-riyadh.webp";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTABand, SectionHeading } from "@/components/ui-kit";
import { LeafIcon } from "@/components/icons";
import { site, whyUs } from "@/lib/site";

const BASE = site.url;
const title = "لماذا نحن؟ | " + site.nameAr;
const description =
  "أسباب تجعل عملاءنا يختارون جنات الرياض: دراسة الموقع، واختيار الخامات، والتنفيذ الاحترافي لحديقتك.";

export const Route = createFileRoute("/why-us")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${BASE}/why-us` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/why-us` }],
  }),
  component: WhyUs,
});

function WhyUs() {
  return (
    <>
      <PageHero
        title="لماذا نحن؟"
        desc="أسباب تجعل عملاءنا يختارون جنات الرياض لتنفيذ مشاريع اللاندسكيب."
        image={heroImg}
        crumbs={[{ label: "الرئيسية", to: "/" }, { label: "لماذا نحن؟" }]}
      />
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="لماذا نحن"
            title="أسباب تجعل عملاءنا يختارون جنات الرياض"
            desc="طريقة عملنا في دراسة الموقع واختيار الخامات والتنفيذ هي ما يصنع الفرق في النتيجة النهائية."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 80}>
                <div className="surface-card h-full p-6">
                  <span className="grid size-11 place-items-center rounded-full bg-accent text-primary">
                    <LeafIcon />
                  </span>
                  <h3 className="mt-4 text-base text-foreground">{w.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
