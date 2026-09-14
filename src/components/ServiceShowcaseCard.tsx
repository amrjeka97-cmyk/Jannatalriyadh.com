import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon, ServiceGroupIcon } from "@/components/icons";
import type { ServiceGroup } from "@/lib/site";

type ServiceShowcaseGroup = ServiceGroup & {
  items: { slug: string; title: string; displayTitle?: string }[];
};

type Props = {
  group: ServiceShowcaseGroup;
  index: number;
  priorityEager?: boolean;
};

export function ServiceShowcaseCard({ group, index, priorityEager }: Props) {
  return (
    <Reveal delay={(index % 2) * 90}>
      <article className="group overflow-hidden rounded-[var(--radius-3xl)] border border-border bg-card shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
        <div className="relative">
          <img
            src={group.thumbnailImage ?? group.image}
            alt={group.imageAlt}
            className="h-[280px] w-full object-cover md:h-[380px]"
            loading={priorityEager ? "eager" : "lazy"}
          />
          <span className="absolute left-5 top-5 grid size-14 place-items-center rounded-full border border-white/70 bg-card/95 text-primary shadow-[0_10px_24px_rgba(18,63,43,0.2)] backdrop-blur-sm md:left-6 md:top-6 md:size-16">
            <ServiceGroupIcon name={group.icon} className="size-7 md:size-8" />
          </span>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-primary">
                المجموعة {index + 1}
              </p>
              <h2 className="mt-2 text-2xl text-foreground md:text-3xl">
                {group.displayTitle ?? group.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{group.desc}</p>
            </div>
            <Link
              to="/services/$slug"
              params={{ slug: group.slug }}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-primary"
            >
              تفاصيل المجموعة <ArrowIcon />
            </Link>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">
              الخدمات المرتبطة
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {group.items.map((service) => (
                <Link
                  key={service.slug}
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="inline-flex min-h-11 items-center justify-between gap-3 rounded-xl border border-border/80 bg-secondary/40 px-4 py-3 text-sm font-bold text-foreground transition hover:border-primary/40 hover:bg-accent hover:text-primary"
                >
                  <span>{service.displayTitle ?? service.title}</span>
                  <ArrowIcon className="size-4 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
