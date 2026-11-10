import { ImageResponse } from "next/og";

export const alt =
  "Emmanuel Holonou — Backend, SaaS & AI Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Code-generated OG image — brand colors, no binary asset to maintain.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f0e8",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
            color: "#013755",
            letterSpacing: "0.02em",
          }}
        >
          datgeek.<span style={{ color: "#e8641a" }}>manu</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 68,
              lineHeight: 1.1,
              color: "#013755",
              maxWidth: 1000,
            }}
          >
            <span>Reliable software for your business,&nbsp;</span>
            <span style={{ color: "#e8641a" }}>
              built to run in production.
            </span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "rgba(1,55,85,0.75)",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Backend · SaaS · AI — shipped end to end.
          </div>
        </div>

        <div
          style={{
            fontSize: 26,
            color: "#013755",
            fontFamily: "Arial, sans-serif",
            fontWeight: 600,
          }}
        >
          Emmanuel C. Holonou · Software Engineer
        </div>
      </div>
    ),
    { ...size },
  );
}
