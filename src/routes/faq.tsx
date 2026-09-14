import { createFileRoute } from "@tanstack/react-router";
import heroPoster from "@/assets/landscaping-riyadh.webp";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Accordion, CTABand, SectionHeading } from "@/components/ui-kit";
import { generalFaqs, services, site } from "@/lib/site";

const BASE = site.url;
const title = "الأسئلة الشائعة | تنسيق الحدائق بالرياض | جنات الرياض";
const description =
  "أجوبة عن أكثر الأسئلة تكرارًا حول تنسيق الحدائق بالرياض: المعاينة، الثيل الطبيعي والصناعي، شبكات الري، المظلات، مدة التنفيذ والصيانة.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${BASE}/faq` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/faq` }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const serviceFaqs = services
    .flatMap((s) => s.faqs.slice(0, 1).map((f) => ({ ...f, service: s.title })))
    .slice(0, 8);

  return (
    <>
      <PageHero
        title="الأسئلة الشائعة"
        desc="كل ما تحتاج معرفته قبل البدء في تنسيق حديقتك داخل الرياض."
        image={heroPoster}
        crumbs={[{ label: "الرئيسية", to: "/" }, { label: "الأسئلة الشائعة" }]}
      />

      <section className="section-y">
        <div className="container-x max-w-3xl">
          <SectionHeading eyebrow="أسئلة عامة" title="استفسارات متكررة" />
          <Reveal className="mt-10">
            <Accordion items={generalFaqs} />
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-x max-w-3xl">
          <SectionHeading eyebrow="أسئلة عن الخدمات" title="أسئلة حسب نوع الخدمة" />
          <Reveal className="mt-10">
            <Accordion items={serviceFaqs.map((f) => ({ q: `${f.service}: ${f.q}`, a: f.a }))} />
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
