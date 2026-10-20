"use client";

import dynamic from "next/dynamic";

const Pokeball3D = dynamic(() => import("@/components/Pokeball3D"), {
  ssr: false,
  loading: () => <div className="h-[280px] w-[280px] rounded-full bg-panel animate-pulse" />,
});

export function HeroBall({ size }: { size?: number }) {
  return <Pokeball3D size={size} />;
}
