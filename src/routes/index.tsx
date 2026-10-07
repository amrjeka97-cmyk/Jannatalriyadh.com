import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import heroPoster from "@/assets/hero-video-poster.webp";
import aboutTeam from "@/assets/service-card-new/garden-maintenance-team-riyadh.webp";
import { Reveal } from "@/components/Reveal";
import { ServiceShowcaseCard } from "@/components/ServiceShowcaseCard";
import { Accordion, btn, Card, CTABand, SectionHeading } from "@/components/ui-kit";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowIcon,
  CalendarClockIcon,
  CheckIcon,
  LeafIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ShovelIcon,
  WhatsAppIcon,
} from "@/components/icons";
import {
  executionSteps,
  gallery,
  generalFaqs,
  posts,
  servicesByGroup,
  site,
  telLink,
  testimonials,
  waLink,
} from "@/lib/site";
import { Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "تنسيق حدائق بالرياض | جنات الرياض لتصميم الحدائق واللاندسكيب" },
      {
        name: "description",
        content:
          "جنات الرياض: تنسيق وتصميم حدائق بالرياض، ثيل طبيعي وعشب صناعي، مظلات وبرجولات، شلالات وشبكات ري. خبرة 11 عامًا و797 مشروعًا. تواصل 0574950543.",
      },
      { property: "og:title", content: "تنسيق حدائق بالرياض | جنات الرياض" },
      {
        property: "og:description",
        content: "تصميم وتنفيذ الحدائق والمسطحات الخضراء والمظلات والجلسات وشبكات الري بالرياض.",
      },
      { property: "og:url", content: site.url },
    ],
    links: [
      { rel: "canonical", href: site.url },
      { rel: "preload", as: "image", href: heroPoster, fetchPriority: "high" },
    ],
  }),
  component: Index,
});

function Index() {
  const [reviewRating, setReviewRating] = useState(0);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[92svh] flex-col justify-center overflow-hidden">
        <img
          className="absolute inset-0 -z-20 size-full object-cover object-[center_58%] md:object-center"
          src={heroPoster}
          alt="جنات الرياض لتنسيق الحدائق"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="hero-cinematic absolute inset-0 -z-10" />

        <div className="container-x pb-10 pt-28 text-primary-foreground md:pb-14 md:pt-32">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-primary-foreground/10 px-4 py-1.5 text-[11px] font-bold tracking-wide text-primary-foreground backdrop-blur-md md:text-sm">
              <LeafIcon className="size-4 text-gold" /> {site.years} عامًا من الخبرة في حدائق الرياض
            </p>

            <h1 className="mt-7 max-w-[22ch] text-[1.9rem] font-extrabold leading-[1.28] tracking-tight text-shadow-hero md:max-w-4xl md:text-6xl md:leading-[1.18]">
              <span className="block">{site.nameAr}</span>
              <span className="mt-2 block text-primary-foreground/90">
                تنسيق وتصميم الحدائق واللاندسكيب بالرياض
              </span>
            </h1>

            <div className="gold-line mt-7 md:w-20" />

            <p className="mt-6 max-w-xl text-[0.95rem] leading-8 text-primary-foreground/80 md:text-lg md:leading-9">
              نحوّل المساحات الخارجية إلى حدائق مرتبة ومريحة: تصميم مدروس، ثيل ونباتات تتحمل مناخ
              الرياض، مظلات وجلسات وشلالات وشبكات ري بتنفيذ متقن.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-whatsapp px-7 py-4 text-base font-extrabold text-primary-foreground shadow-[0_18px_45px_-18px_oklch(0.66_0.16_150/0.8)] transition duration-300 hover:-translate-y-0.5 hover:brightness-95"
              >
                <WhatsAppIcon className="size-5" /> اطلب استشارة مجانية
              </a>
              <a
                href={telLink}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-primary-foreground/35 bg-primary-foreground/10 px-7 py-4 text-base font-bold text-primary-foreground backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-primary-foreground/20"
              >
                <PhoneIcon className="size-5" /> {site.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Trust bar */}
        <div className="container-x w-full pb-8 md:pb-10">
          <div dir="ltr" className="mx-auto grid max-w-4xl grid-cols-2 gap-3">
            {[
              { k: `+${site.years}`, v: "سنوات خبرة", Icon: CalendarClockIcon, tone: "text-gold" },
              {
                k: `${site.projects}`,
                v: "مشروع منجز",
                Icon: ShovelIcon,
                tone: "text-primary",
              },
              { k: "100%", v: "الالتزام بالمواعيد", Icon: ShieldCheckIcon, tone: "text-gold" },
              {
                k: "الرياض",
                v: "تغطية الرياض وخارجها",
                Icon: MapPinIcon,
                tone: "text-primary",
              },
            ].map(({ k, v, Icon, tone }) => (
              <div
                key={v}
                dir="rtl"
                className="flex min-h-24 items-center gap-3 rounded-[20px] border border-white/20 bg-white/[0.1] px-4 py-4 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_24px_rgba(11,55,35,0.12)] backdrop-blur-[18px] sm:min-h-28 sm:px-6"
              >
                <Icon className={`size-7 shrink-0 ${tone} drop-shadow-[0_0_8px_currentColor]`} />
                <div>
                  <p className="text-xl font-extrabold leading-tight text-primary-foreground sm:text-2xl">
                    {k}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-primary-foreground/75 sm:text-sm">
                    {v}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-y">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <img
              src={aboutTeam}
              alt="فريق جنات الرياض أثناء تنفيذ أعمال تنسيق حديقة"
              className="w-full rounded-[var(--radius-3xl)] object-cover shadow-[var(--shadow-lift)]"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
          <div>
            <SectionHeading
              center={false}
              eyebrow="من نحن"
              title="شركة متخصصة في تنسيق الحدائق بالرياض"
              desc={`${site.nameAr} فريق متخصص في تصميم وتنفيذ الحدائق والمساحات الخارجية، نعمل بخبرة ${site.years} عامًا وأنجزنا أكثر من ${site.projects} مشروعًا داخل وخارج الرياض بين فلل ومنازل واستراحات ومشاريع تجارية.`}
            />
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "تصميم يناسب مساحتك واستخدامك",
                "خامات تتحمل مناخ الرياض",
                "شبكات ري توفر المياه",
                "تنفيذ منظم وتسليم نظيف",
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
              <Link to="/about" className={btn.ghost}>
                تعرف علينا أكثر <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-y scroll-mt-24 bg-secondary">
        <div className="container-x">
          <SectionHeading
            eyebrow="خدماتنا"
            title="خدمات تنسيق الحدائق واللاندسكيب"
            desc="خدمات متكاملة مرتبة في مجموعات تسهّل عليك الوصول لما تحتاجه حديقتك."
          />

          <div className="mt-10 space-y-14">
            <div className="grid gap-8 lg:grid-cols-2">
              {servicesByGroup.map((group, index) => (
                <ServiceShowcaseCard key={group.id} group={group} index={index} />
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/services" className={btn.primary}>
              عرض جميع الخدمات <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="أعمالنا"
            title="معرض مشاريع منفذة في الرياض"
            desc="نماذج من حدائق ومساحات خارجية نفذها فريقنا داخل مدينة الرياض."
          />
          <div className="mt-8 space-y-6 md:space-y-8">
            {galleryRows.map((row, i) => (
              <Reveal key={`gallery-row-${i}`} delay={i * 100}>
                <GalleryCarousel images={row} label={`صف معرض الأعمال ${i + 1}`} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/projects" className={btn.primary}>
              مشاهدة كل الأعمال <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-y bg-secondary">
        <div className="container-x">
          <SectionHeading eyebrow="كيف نعمل" title="أربع خطوات من التواصل حتى التسليم" />
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

      {/* Testimonials */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="آراء العملاء" title="ماذا يقول عملاؤنا" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 2) * 90}>
                <blockquote className="surface-card flex h-full flex-col p-6">
                  <div className="flex gap-1" aria-label={`${t.rating} من 5 نجوم`}>
                    {Array.from({ length: t.rating }, (_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="size-5 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="mt-5 flex-1 leading-8 text-foreground">«{t.text}»</p>
                  <footer className="mt-5 border-t border-border pt-4">
                    <p className="text-sm font-bold text-primary">{t.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t.source} Review</p>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
            <Reveal delay={270}>
              <div className="flex h-full flex-col rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6">
                <div className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Star className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">كن عميلنا المميز القادم</h3>
                <p className="mt-3 flex-1 leading-8 text-muted-foreground">
                  شاركنا تجربتك بعد تنفيذ حديقتك، وساعد الآخرين على اختيار جنات الرياض.
                </p>
                <Dialog>
                  <DialogTrigger className={`${btn.primary} mt-6 w-full`}>
                    شارك تجربتك
                  </DialogTrigger>
                  <DialogContent dir="rtl" className="max-h-[90vh] overflow-y-auto text-right">
                    <DialogHeader className="text-right">
                      <DialogTitle>شارك تجربتك</DialogTitle>
                      <DialogDescription>
                        أرسل رأيك ليكون جاهزًا للمراجعة والموافقة قبل نشره.
                      </DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-5" onSubmit={(event) => event.preventDefault()}>
                      <label className="grid gap-2 text-sm font-bold" htmlFor="review-name">
                        الاسم
                        <input
                          id="review-name"
                          name="name"
                          required
                          className="h-11 rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring"
                        />
                      </label>
                      <fieldset className="grid gap-2">
                        <legend className="text-sm font-bold">التقييم</legend>
                        <div className="flex flex-row-reverse gap-1" dir="ltr">
                          {Array.from({ length: 5 }, (_, ratingIndex) => (
                            <label key={ratingIndex}>
                              <input
                                type="radio"
                                name="rating"
                                value={ratingIndex + 1}
                                required
                                checked={reviewRating === ratingIndex + 1}
                                onChange={() => setReviewRating(ratingIndex + 1)}
                                className="sr-only"
                              />
                              <Star
                                className={`size-7 cursor-pointer ${
                                  ratingIndex < reviewRating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                              <span className="sr-only">{ratingIndex + 1} من 5</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      <label className="grid gap-2 text-sm font-bold" htmlFor="review-text">
                        نص التقييم
                        <textarea
                          id="review-text"
                          name="review"
                          required
                          rows={4}
                          className="resize-y rounded-md border border-input bg-background px-3 py-2 font-normal outline-none focus:ring-2 focus:ring-ring"
                        />
                      </label>
                      <button type="submit" className={`${btn.primary} w-full`}>
                        إرسال التقييم للمراجعة
                      </button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </Reveal>
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://maps.app.goo.gl/vHU4WzNikTHss5DP9?g_st=ac"
              target="_blank"
              rel="noreferrer"
              className={btn.ghost}
            >
              شاهد جميع تقييماتنا على Google
            </a>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section-y bg-secondary">
        <div className="container-x">
          <SectionHeading eyebrow="المدونة" title="مقالات ونصائح للعناية بحديقتك" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <Card className="flex h-full flex-col">
                  <img
                    src={p.thumbnailImage ?? p.articleImage}
                    alt={p.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-bold text-primary">{p.category}</p>
                    <h3 className="mt-2 text-base text-foreground">{p.title}</h3>
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

      {/* FAQ */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="الأسئلة الشائعة" title="إجابات لأكثر ما يسأل عنه عملاؤنا" />
          <div className="mt-10">
            <Accordion items={generalFaqs.slice(0, 6)} />
          </div>
          <div className="mt-8 text-center">
            <Link to="/faq" className={btn.ghost}>
              كل الأسئلة <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}

const gallerySplit = Math.ceil(gallery.length / 2);
const galleryRows = [gallery.slice(0, gallerySplit), gallery.slice(gallerySplit)];

function GalleryCarousel({ images, label }: { images: typeof gallery; label: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const swipeStartX = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isHovered || isFocused || prefersReducedMotion || images.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % images.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, images.length, isFocused, isHovered, prefersReducedMotion]);

  const moveBy = (step: number) => {
    if (images.length < 2) return;
    setActiveIndex((index) => (index + step + images.length) % images.length);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch") return;
    swipeStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null) return;

    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;

    if (Math.abs(distance) < 45) return;
    moveBy(distance < 0 ? 1 : -1);
  };

  return (
    <div
      role="region"
      aria-label={label}
      aria-roledescription="carousel"
      className="overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-card shadow-[var(--shadow-soft)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (
          !(event.relatedTarget instanceof Node) ||
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          setIsFocused(false);
        }
      }}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden bg-secondary sm:aspect-[16/9] touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          swipeStartX.current = null;
        }}
      >
        {images.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={`${image.alt}-${index}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity ease-in-out ${
                prefersReducedMotion ? "duration-0" : "duration-500"
              } ${isActive ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <img
                src={image.projectImage}
                alt={image.alt}
                className="size-full select-none object-contain"
                loading={isActive ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-3">
        <button
          type="button"
          onClick={() => moveBy(-1)}
          aria-label="الصورة السابقة"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
            <path
              d="m9 18 6-6-6-6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
          <span
            className="block h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${((activeIndex + 1) / images.length) * 100}%` }}
          />
        </span>
        <button
          type="button"
          onClick={() => moveBy(1)}
          aria-label="الصورة التالية"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
            <path
              d="m15 18-6-6 6-6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
