import { telLink, waLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";

export function FloatingCTA() {
  return (
    <div
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 flex flex-col gap-3"
      aria-label="أزرار التواصل السريعة"
    >
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب"
        className="grid size-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-[var(--shadow-lift)] transition hover:brightness-95"
      >
        <WhatsAppIcon className="size-7" />
      </a>
      <a
        href={telLink}
        aria-label="اتصل بنا"
        className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-lift)] transition hover:bg-primary-deep"
      >
        <PhoneIcon className="size-6" />
      </a>
    </div>
  );
}
