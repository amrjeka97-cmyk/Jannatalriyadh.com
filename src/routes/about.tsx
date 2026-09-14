import { createFileRoute, Link } from "@tanstack/react-router";
import aboutTeam from "@/assets/about-garden-landscaping-riyadh.jpg";
import aboutStory from "@/assets/about-landscape-garden-riyadh.jpg";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { btn, CTABand, SectionHeading } from "@/components/ui-kit";
import { ArrowIcon, CheckIcon, LeafIcon } from "@/components/icons";
import { executionSteps, site, whyUs } from "@/lib/site";

const BASE = site.url;
const title = "من نحن | جنات الرياض لتنسيق الحدائق واللاندسكيب بالرياض";
const description =
  "تعرف على شركة جنات الرياض: فريق متخصص في تنسيق وتصميم الحدائق واللاندسكيب بالرياض بخبرة 11 عامًا وأكثر من 797 مشروعًا منجزًا.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${BASE}/about` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/about` }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        title={`عن ${site.nameAr}`}
        desc={`فريق متخصص في تصميم وتنفيذ الحدائق والمساحات الخارجية داخل الرياض، بخبرة ${site.years} عامًا وأكثر من ${site.projects} مشروعًا منجزًا.`}
        image={aboutTeam}
        crumbs={[{ label: "الرئيسية", to: "/" }, { label: "من نحن" }]}
      />

      <section className="section-y">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <img
              src={aboutStory}
              alt="فريق جنات الرياض أثناء تنفيذ مشروع تنسيق حديقة بالرياض"
              className="w-full rounded-[var(--radius-3xl)] object-cover shadow-[var(--shadow-lift)]"
              loading="lazy"
            />
          </Reveal>
          <div>
            <SectionHeading
              center={false}
              eyebrow="قصتنا"
              title="خبرة ميدانية في حدائق الرياض"
              desc={`بدأنا العمل في تنسيق الحدائق بالرياض قبل ${site.years} عامًا، وتعاملنا مع مختلف أنواع المواقع: فلل ومنازل واستراحات ومشاريع تجارية.`}
            />
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "تصميم مبني على قياسات فعلية",
                "خامات تتحمل مناخ الرياض",
                "شبكات ري تقلل استهلاك المياه",
                "تسليم نظيف ومتابعة بعد التنفيذ",
              ].map((i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-7 text-muted-foreground"
                >
                  <CheckIcon className="mt-1 size-4 shrink-0 text-primary" /> {i}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/services" className={btn.ghost}>
                استعرض خدماتنا <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="قيمنا" title="ما نلتزم به في كل مشروع" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="section-y bg-secondary">
        <div className="container-x">
          <SectionHeading eyebrow="آلية العمل" title="من التواصل حتى التسليم" />
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {executionSteps.map((s, i) => (
              <Reveal key={s} delay={i * 90}>
                <li className="surface-card h-full p-6">
                  <span className="grid size-11 place-items-center rounded-full bg-primary text-lg font-extrabold text-primary-foreground">
                    {i + 1}
                  </span>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{s}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTABand />
    </>
  );
}
