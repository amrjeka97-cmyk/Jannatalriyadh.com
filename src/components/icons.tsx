import type { ReactNode } from "react";

type P = { className?: string };

type ServiceGroupIconProps = P & { name: string };

export function WhatsAppIcon({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.17c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.65-1.23-1.46-1.38-1.71-.14-.24-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.76-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.24-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.16 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function PhoneIcon({ className = "size-5" }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.7a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.9 2.2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "size-5" }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.5 3h-2.6v12.1a2.6 2.6 0 1 1-2.2-2.57V9.9a5.6 5.6 0 1 0 4.8 5.54V9.1c.98.7 2.16 1.1 3.4 1.13V7.6a3.9 3.9 0 0 1-3.4-3.4V3Z" />
    </svg>
  );
}

export function LeafIcon({ className = "size-5" }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4 19.5 2c1 5 1.5 12-3.5 15.5A7.4 7.4 0 0 1 11 20Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 21c0-4 2.5-9 8-12" strokeLinecap="round" />
    </svg>
  );
}

export function ServiceGroupIcon({ name, className = "size-7" }: ServiceGroupIconProps) {
  const paths: Record<string, ReactNode> = {
    leaf: (
      <>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4 19.5 2c1 5 1.5 12-3.5 15.5A7.4 7.4 0 0 1 11 20Z" />
        <path d="M2 21c0-4 2.5-9 8-12" strokeLinecap="round" />
      </>
    ),
    tree: (
      <>
        <path d="M12 21V12" strokeLinecap="round" />
        <path d="m12 3 5 7h-3l4 5h-4l-2 3-2-3H6l4-5H7l5-7Z" strokeLinejoin="round" />
      </>
    ),
    grass: (
      <>
        <path d="M5 21c0-5 2-9 6-13M10 21c0-6 3-10 7-13M15 21c0-4 2-7 5-9" strokeLinecap="round" />
        <path d="M4 21h17" strokeLinecap="round" />
      </>
    ),
    scissors: (
      <>
        <circle cx="6" cy="7" r="2.5" />
        <circle cx="6" cy="17" r="2.5" />
        <path d="m8 8 11 9M8 16 19 7" strokeLinecap="round" />
      </>
    ),
    droplets: (
      <>
        <path d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z" />
        <path d="M9.5 16a3 3 0 0 0 2.5 1.5" strokeLinecap="round" />
      </>
    ),
    trophy: (
      <>
        <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
        <path
          d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 21h8M10 17h4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    waves: (
      <>
        <path d="M3 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2" strokeLinecap="round" />
        <path d="M3 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2" strokeLinecap="round" />
        <path d="M12 3v3M9.5 4.5 12 7l2.5-2.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    umbrella: (
      <>
        <path d="M4 12a8 8 0 0 1 16 0H4Z" />
        <path d="M12 12v7a2 2 0 0 0 4 0" strokeLinecap="round" />
      </>
    ),
    flower: (
      <>
        <circle cx="12" cy="10" r="2.5" />
        <path d="M12 7C9 2 4 5 7 9c-5-1-6 5-1 6 0 5 6 5 6 0 0 5 6 5 6 0 5-1 4-7-1-6 3-4-2-7-5-2Z" />
        <path d="M12 13v8" strokeLinecap="round" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths["leaf"]}
    </svg>
  );
}

export function CalendarClockIcon({ className = "size-7" }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4.5" width="13" height="16" rx="2" />
      <path
        d="M7 2.5v4M12 2.5v4M3 9h13M19 13v3l2 1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="16" r="3" />
    </svg>
  );
}

export function ShovelIcon({ className = "size-7" }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden="true"
    >
      <path
        d="m14.5 3.5 6 6M13 5l6 6M12.5 11.5 5 19a2.1 2.1 0 0 0 3 3l7.5-7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m4.5 19.5 3 3M3 21l-1 1M17 4l2-2" strokeLinecap="round" />
    </svg>
  );
}

export function ShieldCheckIcon({ className = "size-7" }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 3 20 6v5.5c0 4.8-3.3 7.8-8 9.5-4.7-1.7-8-4.7-8-9.5V6l8-3Z"
        strokeLinejoin="round"
      />
      <path d="m8.5 12 2.2 2.2 4.8-4.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MapPinIcon({ className = "size-7" }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 5.5-8 11-8 11S4 15.5 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function CheckIcon({ className = "size-5" }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon({ className = "size-4" }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 12H5m0 0 6-6m-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
