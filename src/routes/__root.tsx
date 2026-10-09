import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { site, waLink } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="max-w-lg rounded-[var(--radius-3xl)] border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]">
        <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-primary/10 text-3xl font-black text-primary">
          404
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">الصفحة غير موجودة</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {`الرابط الذي تبحث عنه غير متوفر أو تم نقله. يمكنك العودة إلى الصفحة الرئيسية أو `}
          {`التواصل مباشرة مع جنات الرياض.`}
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary-deep"
          >
            العودة للرئيسية
          </Link>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-bold text-foreground transition hover:bg-accent"
          >
            تواصل واتساب
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">تعذر تحميل الصفحة</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          حدث خطأ غير متوقع. يمكنك المحاولة مرة أخرى أو العودة للصفحة الرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary-deep"
          >
            إعادة المحاولة
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-bold text-foreground transition hover:bg-accent"
          >
            الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index,follow" },
      {
        name: "google-site-verification",
        content: "Buot6s-QdzSD8ax0oEtmNzX5L7ecG8zV7uxyGvl3e0k",
      },
      { title: `${site.nameAr} | تنسيق حدائق ولاندسكيب بالرياض` },
      {
        name: "description",
        content:
          "جنات الرياض: تنسيق وتصميم الحدائق واللاندسكيب بالرياض مع خدمات الثيل الطبيعي، العشب الصناعي، المظلات، الجلسات، الشلالات، وأعمال الري داخل الرياض.",
      },
      { name: "author", content: site.nameAr },
      { property: "og:title", content: `${site.nameAr} | تنسيق حدائق بالرياض` },
      {
        property: "og:description",
        content:
          "شركة جنات الرياض لتنسيق الحدائق واللاندسكيب بالرياض: تصميم، تنفيذ، زراعة، ري، مظلات وجلسات خارجية.",
      },
      { property: "og:site_name", content: site.nameAr },
      { property: "og:locale", content: "ar_SA" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: site.url },
      { property: "og:image", content: site.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${site.nameAr} | تنسيق حدائق بالرياض` },
      {
        name: "twitter:description",
        content:
          "تنسيق وتجهيز الحدائق بالرياض مع الثيل، العشب الصناعي، المظلات، الجلسات، شبكات الري والديكور الخارجي.",
      },
      { name: "twitter:image", content: site.ogImage },
      { name: "theme-color", content: "#1c4632" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800&family=Tajawal:wght@400;500;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Landscaper",
          "@id": `${site.url}/#business`,
          name: site.businessName,
          alternateName: site.nameEn,
          url: site.url,
          logo: site.ogImage,
          image: site.ogImage,
          description: `${site.businessName} ${site.tagline}`,
          telephone: site.phone,
          areaServed: [
            { "@type": "City", name: site.city },
            { "@type": "AdministrativeArea", name: "الرياض" },
            { "@type": "AdministrativeArea", name: "خارج الرياض" },
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.streetAddress,
            addressLocality: site.address.addressLocality,
            addressRegion: site.address.addressRegion,
            postalCode: site.address.postalCode,
            addressCountry: site.address.addressCountry,
          },
          hasMap: site.googleMaps,
          sameAs: [site.instagram, site.tiktok, site.googleMaps],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: site.phone,
            contactType: "customer service",
            areaServed: "SA",
            availableLanguage: ["ar"],
          },
          priceRange: "$$",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA />
    </QueryClientProvider>
  );
}
