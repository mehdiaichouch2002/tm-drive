import type { Viewport } from "next";
import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";
import { fontsFr } from "../fonts-fr";
import "../globals.css";

export const viewport: Viewport = { themeColor: "#0E1B33" };

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootShell locale="fr" fonts={fontsFr}>
      {children}
    </RootShell>
  );
}
