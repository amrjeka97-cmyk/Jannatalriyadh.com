import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { WhatsAppIcon, PhoneIcon } from "./icons";
import { telLink, waLink } from "@/lib/site";

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:bg-primary-deep hover:shadow-[var(--shadow-lift)] md:text-base",
  whatsapp:
    "inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:brightness-95 md:text-base",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-card px-6 py-3 text-sm font-bold text-primary transition hover:bg-accent md:text-base",
  onDark:
    "inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/40 bg-primary-foreground/10 px-6 py-3 text-sm font-bold text-primary-foreground backdrop-blur transition hover:bg-primary-foreground/20 md:text-base",
};

export function SectionHeading({
  eyebrow,
  title,
  desc,
  center = true,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold tracking-wide text-primary">{eyebrow}</p>
      ) : null}
      <As className="text-2xl text-foreground md:text-4xl">{title}</As>
      <div className={`gold-line mt-4 ${center ? "mx-auto" : ""}`} />
      {desc ? <p className="mt-4 leading-8 text-muted-foreground md:text-lg">{desc}</p> : null}
    </Reveal>
  );
}

export function CTABand() {
  return (
    <section className="section-y bg-primary-deep text-primary-foreground">
      <div className="container-x text-center">
        <Reveal>
          <h2 className="text-2xl md:text-4xl">جاهز لتحويل مساحتك إلى حديقة أجمل؟</h2>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-primary-foreground/80">
            تواصل مع جنات الرياض واحصل على استشارة ومعاينة لمشروعك.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}>
              <WhatsAppIcon /> واتساب الآن
            </a>
            <a href={telLink} className={btn.onDark}>
              <PhoneIcon /> اتصل بنا
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`surface-card overflow-hidden ${className}`}>{children}</div>;
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; to?: string; params?: Record<string, string> }[];
}) {
  return (
    <nav aria-label="مسار التنقل" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {it.to ? (
              <Link
                to={it.to}
                params={it.params as never}
                className="transition hover:text-primary"
              >
                {it.label}
              </Link>
            ) : (
              <span className="text-foreground">{it.label}</span>
            )}
            {i < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((f) => (
        <details
          key={f.q}
          className="group rounded-2xl border border-border bg-card px-5 py-4 shadow-[var(--shadow-soft)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-foreground">
            <span>{f.q}</span>
            <span
              className="shrink-0 text-primary transition group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="mt-3 leading-8 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
