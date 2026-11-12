import type { CSSProperties, ReactNode } from "react";
import { RevealObserver } from "./RevealObserver";

/**
 * Apparition au défilement, une seule fois.
 * - variant "up"   : fondu + léger glissement vers le haut (par défaut)
 * - variant "clip" : l'élément se dévoile de bas en haut, comme un rideau (pour les images)
 * L'animation est en CSS (voir globals.css) ; RevealObserver se contente d'ajouter
 * la classe « is-in » quand le bloc entre dans l'écran.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "clip";
}) {
  return (
    <div
      data-reveal={variant}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Barre de progression de lecture, en haut de l'écran */}
      <div
        aria-hidden="true"
        className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] bg-signal"
      />
      {children}
      <RevealObserver />
    </>
  );
}
