import { createFileRoute } from "@tanstack/react-router";
import heroPoster from "@/assets/landscaping-riyadh.webp";
import { PageHero } from "@/components/PageHero";
import { btn, CTABand, SectionHeading } from "@/components/ui-kit";
import { CheckIcon, InstagramIcon, PhoneIcon, TikTokIcon, WhatsAppIcon } from "@/components/icons";
import { executionSteps, site, telLink, waLink } from "@/lib/site";

const BASE = site.url;
const title = "تواصل معنا | تنسيق حدائق بالرياض | جنات الرياض";
const description =
  "تواصل مع جنات الرياض لتنسيق وتصميم الحدائق واللاندسكيب بالرياض. اتصال أو واتساب على 0574950543 وخدمة جميع أحياء الرياض.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${BASE}/contact` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/contact` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${BASE}/contact`,
          about: {
            "@type": "LocalBusiness",
            name: site.businessName,
            telephone: site.phone,
            url: site.url,
            areaServed: [
              { "@type": "City", name: site.city },
              { "@type": "AdministrativeArea", name: "الرياض" },
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: site.address.streetAddress,
              addressLocality: site.address.addressLocality,
              addressRegion: site.address.addressRegion,
              postalCode: site.address.postalCode,
              addressCountry: site.address.addressCountry,
            },
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        title="تواصل معنا"
        desc="نستقبل طلبات المعاينة والاستفسارات داخل الرياض يوميًا من 8 صباحًا حتى 10 مساءً."
        image={heroPoster}
        crumbs={[{ label: "الرئيسية", to: "/" }, { label: "تواصل معنا" }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}>
            <WhatsAppIcon /> واتساب
          </a>
          <a href={telLink} className={btn.onDark}>
            <PhoneIcon /> {site.phoneDisplay}
          </a>
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="تواصل" title="اطلب معاينة لحديقتك" />
            <p className="mt-6 leading-8 text-muted-foreground md:text-lg">
              أخبرنا بمساحة الحديقة ونوع الأعمال المطلوبة (ثيل، عشب صناعي، مظلات، شلالات، شبكات ري)
              وسنساعدك في اختيار الحل الأنسب لميزانيتك، ثم نحدد موعد معاينة داخل الرياض.
            </p>

            <h2 className="mt-12 text-xl text-foreground md:text-2xl">خطوات العمل معنا</h2>
            <ol className="mt-5 space-y-3">
              {executionSteps.map((s, i) => (
                <li
                  key={s}
                  className="flex items-start gap-3 text-sm leading-7 text-muted-foreground"
                >
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {[
                "خدمة جميع أحياء الرياض",
                "معاينة وتقدير واضح للتكلفة",
                "خامات متعددة تناسب الميزانية",
                "متابعة وصيانة بعد التسليم",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm leading-7 text-muted-foreground"
                >
                  <CheckIcon className="mt-1 size-4 shrink-0 text-primary" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <aside>
            <div className="surface-card p-6">
              <h2 className="text-lg text-foreground">بيانات التواصل</h2>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btn.whatsapp}
                >
                  <WhatsAppIcon /> واتساب
                </a>
                <a href={telLink} className={btn.primary}>
                  <PhoneIcon /> {site.phoneDisplay}
                </a>
              </div>
              <dl className="mt-6 space-y-3 text-sm text-muted-foreground">
                <div>
                  <dt className="font-bold text-foreground">نطاق الخدمة</dt>
                  <dd>
                    {site.city} — {site.country}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-foreground">أوقات العمل</dt>
                  <dd>يوميًا 8:00 صباحًا — 10:00 مساءً</dd>
                </div>
              </dl>
              <div className="mt-6 flex gap-3">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="إنستغرام"
                  className="grid size-10 place-items-center rounded-full border border-border text-foreground transition hover:bg-accent"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={site.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="تيك توك"
                  className="grid size-10 place-items-center rounded-full border border-border text-foreground transition hover:bg-accent"
                >
                  <TikTokIcon />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CTABand />
    </>
  );
}
