import { useId } from "react";

type P = { className?: string };

/** Monogramme : un volant, avec une branche couleur « phare » */
export function Monogram({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="16" cy="16" r="3.2" stroke="currentColor" strokeWidth="2.5" />
      <path d="M3.6 13.5 13 15M28.4 13.5 19 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 19.2V29" stroke="#F5B82E" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24ZM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.29-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23a7.5 7.5 0 0 1-1.38-1.72c-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43l-.48-.01Z" />
    </svg>
  );
}

/** Motif de fond : des marquages de route en pointillés, légèrement inclinés, très discrets */
export function RoadLines({ className }: P) {
  const id = useId();
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="120" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
          <path d="M0 28h54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Cinq étoiles ; la dernière est remplie en proportion de la note (4,8 -> 80 %) */
export function Stars({ value = 5, className, label }: P & { value?: number; label?: string }) {
  const id = useId();
  const lastFill = Math.round(Math.max(0, Math.min(1, value - 4)) * 100);
  const d =
    "M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.6 4.9 17.3l1-5.7-4.1-4 5.7-.8L10 1.6Z";
  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className ?? ""}`}
      dir="ltr"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id={id}>
            <stop offset={`${lastFill}%`} stopColor="currentColor" />
            <stop offset={`${lastFill}%`} stopColor="currentColor" stopOpacity="0.28" />
          </linearGradient>
        </defs>
      </svg>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-[1em] w-[1em]" aria-hidden="true">
          <path d={d} fill={i === 4 ? `url(#${id})` : "currentColor"} />
        </svg>
      ))}
    </span>
  );
}
