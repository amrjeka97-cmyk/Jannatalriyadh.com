import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Accordion, btn, Card, CTABand, SectionHeading } from "@/components/ui-kit";
import { ArrowIcon, CheckIcon, LeafIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import landscapeFallback from "@/assets/landscape-design-riyadh.jpg";
import {
  executionSteps,
  getServiceGallery,
  getServiceSections,
  resolveServiceSlug,
  serviceGroupBySlug,
  serviceGroupByServiceSlug,
  servicesByGroup,
  services,
  serviceGroups,
  site,
  telLink,
  waLink,
} from "@/lib/site";

const BASE = site.url;

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const group = serviceGroupBySlug[params.slug];
    if (group) return { kind: "group" as const, group };

    const canonicalSlug = resolveServiceSlug(params.slug);
    const service = services.find((s) => s.slug === canonicalSlug);
    if (!service) throw notFound();
    return { kind: "service" as const, service, canonicalSlug };
  },
  head: ({ params, loaderData }) => {
    if (loaderData?.kind === "group") {
      const group = loaderData.group;
      const url = `${BASE}/services/${params.slug}`;
      return {
        meta: [
          { title: group.metaTitle },
          { name: "description", content: group.metaDescription },
          { property: "og:title", content: group.metaTitle },
          { property: "og:description", content: group.metaDescription },
          { property: "og:url", content: url },
        ],
        links: [{ rel: "canonical", href: url }],
        scripts: [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: group.title,
              description: group.metaDescription,
              serviceType: group.title,
              areaServed: { "@type": "City", name: site.city },
              url,
              provider: {
                "@type": "LocalBusiness",
                name: site.businessName,
                telephone: site.phone,
                url: site.url,
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
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${BASE}/` },
                { "@type": "ListItem", position: 2, name: "خدماتنا", item: `${BASE}/services` },
                { "@type": "ListItem", position: 3, name: group.title, item: url },
              ],
            }),
          },
        ],
      };
    }

    const service = loaderData?.service;
    if (!service) return {};
    const canonicalSlug = loaderData?.canonicalSlug ?? resolveServiceSlug(params.slug);
    const url = `${BASE}/services/${canonicalSlug}`;
    const parentGroup = serviceGroupByServiceSlug[service.slug];
    return {
      meta: [
        { title: service.metaTitle },
        { name: "description", content: service.metaDescription },
        { property: "og:title", content: service.metaTitle },
        { property: "og:description", content: service.metaDescription },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.metaDescription,
            serviceType: service.title,
            areaServed: { "@type": "City", name: site.city },
            provider: {
              "@type": "LocalBusiness",
              name: site.businessName,
              telephone: site.phone,
              url: site.url,
              address: {
                "@type": "PostalAddress",
                streetAddress: site.address.streetAddress,
                addressLocality: site.address.addressLocality,
                addressRegion: site.address.addressRegion,
                postalCode: site.address.postalCode,
                addressCountry: site.address.addressCountry,
              },
            },
            url,
            isPartOf: parentGroup ? `${BASE}/services/${parentGroup.slug}` : `${BASE}/services`,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${BASE}/` },
              { "@type": "ListItem", position: 2, name: "خدماتنا", item: `${BASE}/services` },
              ...(parentGroup
                ? [
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: parentGroup.title,
                      item: `${BASE}/services/${parentGroup.slug}`,
                    },
                  ]
                : []),
              {
                "@type": "ListItem",
                position: parentGroup ? 4 : 3,
                name: service.title,
                item: url,
              },
            ],
          }),
        },
        ...(service.faqs.length
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: service.faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.q,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.a,
                    },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const data = Route.useLoaderData();
  if (data.kind === "group") return <ServiceGroupDetail group={data.group} />;

  const { service, canonicalSlug } = data;
  const parentGroup = serviceGroupByServiceSlug[service.slug];
  const others = parentGroup
    ? services
        .filter((s) => parentGroup.slugs.includes(s.slug) && s.slug !== service.slug)
        .slice(0, 3)
    : services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const sections = getServiceSections(service.slug);
  const gallery = getServiceGallery(service.slug, service.serviceImage);

  return (
    <>
      <PageHero
        title={`${service.title} بالرياض`}
        desc={service.intro}
        image={service.serviceImage}
        imageAlt={service.imageAlt}
        crumbs={[
          { label: "الرئيسية", to: "/" },
          { label: "خدماتنا", to: "/services" },
          ...(parentGroup
            ? [{ label: parentGroup.title, to: `/services/${parentGroup.slug}` as const }]
            : []),
          { label: service.title },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waLink(`السلام عليكم، أرغب في الاستفسار عن ${service.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={btn.whatsapp}
          >
            <WhatsAppIcon /> اطلب عرض سعر
          </a>
          <a href={telLink} className={btn.onDark}>
            <PhoneIcon /> {site.phoneDisplay}
          </a>
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-5">
              {service.body.map((p) => (
                <p key={p} className="leading-8 text-muted-foreground md:text-lg">
                  {p}
                </p>
              ))}
            </div>

            <h2 className="mt-12 text-xl text-foreground md:text-2xl">ما يميز الخدمة</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm leading-7 text-muted-foreground"
                >
                  <CheckIcon className="mt-1 size-4 shrink-0 text-primary" /> {f}
                </li>
              ))}
            </ul>

            {sections.length ? (
              <section className="mt-14" aria-labelledby="service-sections-title">
                <h2 id="service-sections-title" className="text-xl text-foreground md:text-2xl">
                  خيارات وتطبيقات الخدمة
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {sections.map((section) => (
                    <article
                      key={section.title}
                      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]"
                    >
                      {section.image ? (
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={section.image}
                            alt={section.alt ?? section.title}
                            className="size-full object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            <h2 className="mt-12 text-xl text-foreground md:text-2xl">الخيارات المتاحة</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {service.options.map((o) => (
                <span
                  key={o}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
                >
                  <LeafIcon className="size-4 text-primary" /> {o}
                </span>
              ))}
            </div>

            <h2 className="mt-12 text-xl text-foreground md:text-2xl">خطوات التنفيذ</h2>
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
          </div>

          <aside className="lg:col-span-1">
            <div className="surface-card p-6">
              <h2 className="text-lg text-foreground">تواصل معنا</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                للحصول على معاينة وتقدير للتكلفة داخل الرياض، تواصل معنا مباشرة.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={waLink(`السلام عليكم، أرغب في ${service.title}.`)}
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
            </div>

            <div className="surface-card mt-6 p-6">
              {parentGroup ? (
                <>
                  <h2 className="text-lg text-foreground">
                    {parentGroup.displayTitle ?? parentGroup.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{parentGroup.desc}</p>
                  <Link
                    to="/services/$slug"
                    params={{ slug: parentGroup.slug }}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary"
                  >
                    عرض المجموعة <ArrowIcon />
                  </Link>
                </>
              ) : null}

              <h2 className="mt-6 text-lg text-foreground">خدمات أخرى</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: o.slug }}
                      className="inline-flex items-center gap-2 font-bold text-primary"
                    >
                      {o.title} <ArrowIcon />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-y bg-secondary" aria-labelledby="service-gallery-title">
        <div className="container-x">
          <SectionHeading
            eyebrow="من أعمالنا"
            title={`صور تطبيقية لـ${service.title}`}
            desc="نماذج بصرية تساعدك على تصور الخامات وتوزيع العناصر قبل معاينة موقعك."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item) => (
              <figure
                key={item.image}
                className="group overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-soft)]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="size-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {service.faqs.length ? (
        <section className="section-y bg-secondary">
          <div className="container-x">
            <SectionHeading eyebrow="الأسئلة الشائعة" title={`أسئلة عن ${service.title}`} />
            <Reveal className="mt-10">
              <Accordion items={service.faqs} />
            </Reveal>
          </div>
        </section>
      ) : null}

      <CTABand />
    </>
  );
}

function ServiceGroupDetail({ group }: { group: (typeof serviceGroups)[number] }) {
  const members = servicesByGroup.find((item) => item.slug === group.slug)?.items ?? [];
  const displayTitle = group.displayTitle ?? group.title;

  return (
    <>
      <PageHero
        title={group.heroTitle}
        desc={group.heroDescription}
        image={members[0]?.serviceImage ?? landscapeFallback}
        imageAlt={group.imageAlt}
        crumbs={[
          { label: "الرئيسية", to: "/" },
          { label: "خدماتنا", to: "/services" },
          { label: displayTitle },
        ]}
      />
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="خدمات المجموعة" title={displayTitle} desc={group.desc} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {members.map((service) => (
              <Card key={service.slug} className="flex h-full flex-col">
                <img
                  src={service.serviceImage}
                  alt={service.title}
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg text-foreground">{service.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                    {service.short}
                  </p>
                  <Link
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
                  >
                    تفاصيل الخدمة <ArrowIcon />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
