import type { ReactNode } from "react";
import { Breadcrumbs } from "./ui-kit";

export function PageHero({
  title,
  desc,
  image,
  imageAlt,
  crumbs,
  children,
}: {
  title: string;
  desc?: string;
  image: string;
  imageAlt?: string;
  crumbs: { label: string; to?: string; params?: Record<string, string> }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-14 pt-28 md:pb-20 md:pt-36">
      <img
        src={image}
        alt={imageAlt ?? ""}
        aria-hidden={imageAlt ? undefined : true}
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div className="hero-overlay absolute inset-0 -z-10" />
      <div className="container-x text-primary-foreground">
        <div className="mb-5 [&_a]:text-primary-foreground/70 [&_nav]:text-primary-foreground/70 [&_span]:text-primary-foreground">
          <Breadcrumbs items={crumbs} />
        </div>
        <h1 className="max-w-[min(100%,48rem)] break-words text-[clamp(2.1rem,5vw,4rem)] leading-[1.25] text-primary-foreground">
          {title}
        </h1>
        <div className="gold-line mt-5" />
        {desc ? (
          <p className="mt-5 max-w-2xl leading-7 text-primary-foreground/85 sm:leading-8 md:text-lg">
            {desc}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
