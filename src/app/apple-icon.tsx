import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icône de l'écran d'accueil (iPhone) : le monogramme volant */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0E1B33",
        }}
      >
        <svg width="116" height="116" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="13" stroke="#F3F4F1" strokeWidth="2.5" />
          <circle cx="16" cy="16" r="3.2" stroke="#F3F4F1" strokeWidth="2.5" />
          <path d="M3.6 13.5 13 15M28.4 13.5 19 15" stroke="#F3F4F1" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 19.2V29" stroke="#F5B82E" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
