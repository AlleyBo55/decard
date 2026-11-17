"use client";
import dynamic from "next/dynamic";
import { useT } from "@/components/LocaleProvider";

// The map components, split out so d3-geo and the atlas load only when a map step mounts.

function MapLoading({ kind }: { kind: "globe" | "map" }) {
  const t = useT();
  return kind === "globe" ? (
    <div className="rd-globe">
      <div className="rd-globe-stage">
        <div className="rd-globe-glow" aria-hidden />
        <div className="rd-globe-load" role="status">
          <span>{t.redeem.map.loading}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="rd-map">
      <div className="rd-map-load" role="status">
        {t.redeem.map.loading}
      </div>
    </div>
  );
}

export const LazyGlobe = dynamic(() => import("./Globe").then((m) => m.Globe), { ssr: false, loading: () => <MapLoading kind="globe" /> });
export const LazyCountryMap = dynamic(() => import("./Globe").then((m) => m.CountryMap), { ssr: false, loading: () => <MapLoading kind="map" /> });
