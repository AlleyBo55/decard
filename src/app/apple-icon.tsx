import { ImageResponse } from "next/og";

// Home screen icon, and the Organization logo in the root layout's JSON-LD. The Poké Ball
// from app/og/route.tsx on an opaque square: iOS fills transparent pixels with black.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const INK = "#29263d";
const WHITE = "#fbf8f2";

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
          background: "#f4efe4",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 148,
            height: 148,
            borderRadius: 74,
            overflow: "hidden",
            border: `7px solid ${INK}`,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flex: 1, background: "#e3350d" }} />
          <div style={{ display: "flex", height: 7, background: INK }} />
          <div style={{ display: "flex", flex: 1, background: WHITE }} />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{ display: "flex", width: 46, height: 46, borderRadius: 23, background: WHITE, border: `7px solid ${INK}` }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
