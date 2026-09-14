import { createFileRoute, Link } from "@tanstack/react-router";
import heroPoster from "@/assets/landscaping-riyadh.webp";
import { PageHero } from "@/components/PageHero";
import { ServiceShowcaseCard } from "@/components/ServiceShowcaseCard";
import { CTABand, SectionHeading } from "@/components/ui-kit";
import { servicesByGroup, site } from "@/lib/site";

const BASE = site.url;
const title = "خدمات تنسيق الحدائق بالرياض | جنات الرياض";
const description =
  "خدمات جنات الرياض: تنسيق وتصميم حدائق، ثيل طبيعي وعشب صناعي، مظلات وبرجولات، جلسات خارجية، شلالات ونوافير، شبكات ري ولاندسكيب بالرياض.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${BASE}/services` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/services` }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <>
      <PageHero
        title="خدمات تنسيق الحدائق واللاندسكيب بالرياض"
        desc="خدمات متكاملة تغطي التصميم والزراعة والري والمظلات والجلسات وعناصر الماء داخل مدينة الرياض."
        image={heroPoster}
        crumbs={[{ label: "الرئيسية", to: "/" }, { label: "خدماتنا" }]}
      />

      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="خدماتنا"
            title="اختر الخدمة المناسبة لمساحتك"
            desc="كل مجموعة خدمات لها صفحة مستقلة توضح خدماتها الفرعية، والخيارات المتاحة، والخطوات، مع روابط داخلية مباشرة لكل خدمة."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {servicesByGroup.map((group, index) => (
              <ServiceShowcaseCard
                key={group.slug}
                group={group}
                index={index}
                priorityEager={index < 2}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
