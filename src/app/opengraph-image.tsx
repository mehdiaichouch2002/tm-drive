import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/** Aperçu affiché quand le lien du site est partagé (WhatsApp, Facebook…) */
export const alt = "TM Drive, location de voitures à Meknès";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const star = "M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.6 4.9 17.3l1-5.7-4.1-4 5.7-.8L10 1.6Z";

export default function OpengraphImage() {
  const note = site.rating.value.toFixed(1).replace(".", ",");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          backgroundColor: "#0E1B33",
          color: "#F3F4F1",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="13" stroke="#F3F4F1" strokeWidth="2.5" />
            <circle cx="16" cy="16" r="3.2" stroke="#F3F4F1" strokeWidth="2.5" />
            <path d="M3.6 13.5 13 15M28.4 13.5 19 15" stroke="#F3F4F1" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M16 19.2V29" stroke="#F5B82E" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 150, fontWeight: 700, letterSpacing: -5, marginLeft: 36 }}>
            <span>TM</span>
            <span style={{ color: "#F5B82E", marginLeft: 30 }}>DRIVE</span>
          </div>
        </div>

        <div style={{ fontSize: 44, marginTop: 36, color: "#C9D1DE" }}>
          Location de voitures à Meknès · 24h/24
        </div>

        {/* Marquage de route */}
        <div style={{ display: "flex", marginTop: 48 }}>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{ width: 96, height: 8, borderRadius: 4, backgroundColor: "#F5B82E", marginRight: 48, opacity: 0.9 }}
            />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: 48, fontSize: 40 }}>
          <span style={{ color: "#F5B82E", marginRight: 20 }}>{note}</span>
          <div style={{ display: "flex" }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} width="40" height="40" viewBox="0 0 20 20" style={{ marginRight: 4 }}>
                <path d={star} fill="#F5B82E" />
              </svg>
            ))}
          </div>
          <span style={{ marginLeft: 20 }}>{`sur Google · ${site.rating.count} avis`}</span>
        </div>
      </div>
    ),
    size,
  );
}
