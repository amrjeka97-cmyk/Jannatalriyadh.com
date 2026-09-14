import { Link } from "@tanstack/react-router";
import logo from "@/assets/jannat-al-riyadh-gardens-logo-optimized.webp";
import { services, site, telLink, waLink } from "@/lib/site";
import { InstagramIcon, PhoneIcon, TikTokIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="شعار جنات الرياض" width={44} height={44} className="size-11" />
            <span className="text-lg font-extrabold">{site.nameAr}</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-primary-foreground/75">
            شركة {site.nameAr} {site.tagline}. نصمم وننفذ الحدائق والمسطحات الخضراء والمظلات
            والجلسات وشبكات الري بخبرة {site.years} عامًا وأكثر من {site.projects} مشروعًا منجزًا.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="إنستغرام جنات الرياض"
              className="grid size-10 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-primary-foreground/20"
            >
              <InstagramIcon />
            </a>
            <a
              href={site.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تيك توك جنات الرياض"
              className="grid size-10 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-primary-foreground/20"
            >
              <TikTokIcon />
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="واتساب جنات الرياض"
              className="grid size-10 place-items-center rounded-full bg-whatsapp transition hover:brightness-95"
            >
              <WhatsAppIcon className="size-4" />
            </a>
          </div>
        </div>

        <nav aria-label="روابط الموقع">
          <h2 className="text-base font-bold">روابط سريعة</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            {[
              { to: "/", label: "الرئيسية" },
              { to: "/about", label: "من نحن" },
              { to: "/why-us", label: "لماذا نحن؟" },
              { to: "/services", label: "خدماتنا" },
              { to: "/projects", label: "أعمالنا" },
              { to: "/blog", label: "المدونة" },
              { to: "/faq", label: "الأسئلة الشائعة" },
              { to: "/contact", label: "تواصل معنا" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-primary-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="خدماتنا">
          <h2 className="text-base font-bold">خدماتنا</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            {services.slice(0, 8).map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="transition hover:text-primary-foreground"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-base font-bold">تواصل معنا</h2>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <li>
              <a
                href={telLink}
                className="inline-flex items-center gap-2 transition hover:text-primary-foreground"
                dir="ltr"
              >
                <PhoneIcon className="size-4" /> {site.phone}
              </a>
            </li>
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-primary-foreground"
              >
                <WhatsAppIcon className="size-4" /> واتساب
              </a>
            </li>
            <li>الرياض — المملكة العربية السعودية</li>
            <li>ساعات العمل: يوميًا 8 صباحًا — 10 مساءً</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs text-primary-foreground/70">
        جميع الحقوق محفوظة © {new Date().getFullYear()} {site.nameAr}
      </div>
    </footer>
  );
}
