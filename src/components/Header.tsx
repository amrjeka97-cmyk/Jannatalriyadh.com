import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/jannat-al-riyadh-gardens-logo-optimized.webp";
import { servicesByGroup, site, waLink } from "@/lib/site";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "./icons";

const navBefore = [{ to: "/", label: "الرئيسية" }] as const;

const navAfter = [
  { to: "/projects", label: "أعمالنا" },
  { to: "/about", label: "من نحن" },
  { to: "/faq", label: "الأسئلة الشائعة" },
  { to: "/blog", label: "المدونة" },
  { to: "/contact", label: "تواصل معنا" },
] as const;

const linkCls =
  "rounded-full px-3 py-2 text-sm font-bold text-primary-foreground/85 transition hover:bg-primary-foreground/12 hover:text-primary-foreground";
const activeCls = { className: "bg-primary-foreground/15 text-primary-foreground" };

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const solid = scrolled || open;
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  const closeAll = () => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServices(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-out ${
        solid
          ? "border-primary-foreground/10 bg-primary-deep/70 py-2 shadow-[0_10px_40px_-24px_oklch(0.16_0.03_152/0.9)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-gradient-to-b from-primary-deep/40 via-primary-deep/15 to-transparent py-3 md:py-4"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5" onClick={closeAll}>
          <img
            src={logo}
            alt="شعار جنات الرياض"
            width={48}
            height={48}
            className="size-10 drop-shadow-[0_2px_8px_oklch(0.16_0.03_152/0.6)] md:size-12"
          />
          <span className="leading-tight">
            <span className="block text-base font-extrabold text-primary-foreground md:text-lg">
              {site.nameAr}
            </span>
            <span className="block text-[11px] tracking-wide text-primary-foreground/70">
              تنسيق حدائق ولاندسكيب
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="القائمة الرئيسية">
          {navBefore.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className={linkCls}
              activeProps={activeCls}
            >
              {n.label}
            </Link>
          ))}

          {/* Services mega menu */}
          <div
            ref={menuRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((v) => !v)}
              className={`${linkCls} inline-flex items-center gap-1.5`}
            >
              خدماتنا
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className={`size-3.5 transition-transform duration-300 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {servicesOpen ? (
              <div className="absolute end-0 top-full z-50 pt-3">
                <div className="w-[46rem] max-w-[calc(100vw-3rem)] rounded-[var(--radius-2xl)] border border-border bg-card p-6 shadow-[var(--shadow-lift)]">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {servicesByGroup.map((g) => (
                      <div key={g.id}>
                        <p className="text-sm font-extrabold text-primary">{g.title}</p>
                        <ul className="mt-2 space-y-1">
                          {g.items.map((s) => (
                            <li key={s.slug}>
                              <Link
                                to="/services/$slug"
                                params={{ slug: s.slug }}
                                onClick={closeAll}
                                className="block rounded-lg px-2 py-1.5 text-sm leading-6 text-muted-foreground transition hover:bg-accent hover:text-primary"
                              >
                                {s.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <Link
                      to="/services"
                      onClick={closeAll}
                      className="text-sm font-bold text-primary hover:underline"
                    >
                      عرض جميع الخدمات
                    </Link>
                    <a
                      href={waLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-bold text-primary-foreground"
                    >
                      <WhatsAppIcon className="size-4" /> اطلب استشارة مجانية
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <Link to="/" hash="why" className={linkCls} onClick={closeAll}>
            لماذا جنات الرياض
          </Link>

          {navAfter.map((n) => (
            <Link key={n.to} to={n.to} className={linkCls} activeProps={activeCls}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 lg:flex">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="إنستغرام جنات الرياض"
            className="p-2 text-primary-foreground/80 transition hover:text-primary-foreground"
          >
            <InstagramIcon />
          </a>
          <a
            href={site.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تيك توك جنات الرياض"
            className="p-2 text-primary-foreground/80 transition hover:text-primary-foreground"
          >
            <TikTokIcon />
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="ms-1 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:brightness-95"
          >
            <WhatsAppIcon className="size-4" /> واتساب
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="فتح القائمة"
          aria-expanded={open}
          className="grid size-11 place-items-center rounded-full border border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground backdrop-blur transition hover:bg-primary-foreground/20 lg:hidden"
        >
          <span className="sr-only">القائمة</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-5"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="container-x lg:hidden">
          <nav
            className="mt-3 max-h-[75svh] overflow-y-auto rounded-[var(--radius-2xl)] border border-primary-foreground/12 bg-primary-deep/90 p-3 backdrop-blur-xl"
            aria-label="قائمة الهاتف"
          >
            {navBefore.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={closeAll}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-primary-foreground/85 transition hover:bg-primary-foreground/10"
                activeProps={activeCls}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setMobileServices((v) => !v)}
              aria-expanded={mobileServices}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-primary-foreground/85 transition hover:bg-primary-foreground/10"
            >
              خدماتنا
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className={`size-4 transition-transform duration-300 ${
                  mobileServices ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {mobileServices ? (
              <div className="mb-1 ms-2 space-y-3 rounded-xl border border-primary-foreground/12 bg-primary-foreground/5 p-3">
                {servicesByGroup.map((g) => (
                  <div key={g.id}>
                    <p className="px-2 text-xs font-extrabold text-gold">{g.title}</p>
                    <ul className="mt-1">
                      {g.items.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to="/services/$slug"
                            params={{ slug: s.slug }}
                            onClick={closeAll}
                            className="block rounded-lg px-2 py-2.5 text-sm text-primary-foreground/80 transition hover:bg-primary-foreground/10"
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Link
                  to="/services"
                  onClick={closeAll}
                  className="block rounded-lg px-2 py-2.5 text-sm font-bold text-gold"
                >
                  عرض جميع الخدمات
                </Link>
              </div>
            ) : null}

            <Link
              to="/"
              hash="why"
              onClick={closeAll}
              className="block rounded-xl px-4 py-3 text-sm font-bold text-primary-foreground/85 transition hover:bg-primary-foreground/10"
            >
              لماذا جنات الرياض
            </Link>

            {navAfter.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={closeAll}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-primary-foreground/85 transition hover:bg-primary-foreground/10"
                activeProps={activeCls}
              >
                {n.label}
              </Link>
            ))}

            <div className="mt-2 flex items-center gap-2 border-t border-primary-foreground/12 pt-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-bold text-primary-foreground"
              >
                <WhatsAppIcon className="size-4" /> اطلب استشارة مجانية
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="إنستغرام"
                className="grid size-11 place-items-center rounded-full border border-primary-foreground/25 text-primary-foreground"
              >
                <InstagramIcon />
              </a>
              <a
                href={site.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تيك توك"
                className="grid size-11 place-items-center rounded-full border border-primary-foreground/25 text-primary-foreground"
              >
                <TikTokIcon />
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
