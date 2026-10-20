"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function Ball({ reduced, drag }: { reduced: boolean; drag: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    // Drag offset takes priority; otherwise gentle auto-spin.
    if (drag.current !== 0) {
      group.current.rotation.y += drag.current;
      drag.current *= 0.9; // ease out the fling
      if (Math.abs(drag.current) < 0.0005) drag.current = 0;
    } else if (!reduced) {
      group.current.rotation.y += delta * 0.4;
    }
    const t = state.clock.elapsedTime;
    group.current.position.y = reduced ? 0 : Math.sin(t * 1.2) * 0.08;
    group.current.rotation.z = reduced ? 0 : Math.sin(t * 0.6) * 0.05;
  });

  const topMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#dc0a2d", metalness: 0.3, roughness: 0.35 }),
    [],
  );
  const botMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#e9edf5", metalness: 0.2, roughness: 0.4 }),
    [],
  );
  const bandMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#12151d", metalness: 0.6, roughness: 0.3 }),
    [],
  );
  const buttonMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#f5f7fb", metalness: 0.1, roughness: 0.2 }),
    [],
  );

  return (
    <group ref={group} rotation={[0.25, 0, 0]}>
      {/* top red hemisphere */}
      <mesh material={topMat}>
        <sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      {/* bottom white hemisphere */}
      <mesh material={botMat}>
        <sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
      </mesh>
      {/* equatorial band */}
      <mesh material={bandMat} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.0, 0.055, 24, 80]} />
      </mesh>
      {/* center button ring */}
      <mesh material={bandMat} position={[0, 0, 1.0]}>
        <torusGeometry args={[0.24, 0.06, 20, 48]} />
      </mesh>
      {/* center button */}
      <mesh material={buttonMat} position={[0, 0, 1.005]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.06, 40]} />
      </mesh>
    </group>
  );
}

export default function Pokeball3D({ size }: { size?: number }) {
  const reduced = usePrefersReducedMotion();
  const dim = size ?? 320;
  const drag = useRef(0);
  const lastX = useRef<number | null>(null);

  return (
    <div
      style={{ width: dim, height: dim, touchAction: "none" }}
      className="max-w-full cursor-grab active:cursor-grabbing"
      onPointerDown={(e) => {
        lastX.current = e.clientX;
      }}
      onPointerMove={(e) => {
        if (lastX.current == null) return;
        drag.current = (e.clientX - lastX.current) * 0.01;
        lastX.current = e.clientX;
      }}
      onPointerUp={() => {
        lastX.current = null;
      }}
      onPointerLeave={() => {
        lastX.current = null;
      }}
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 4], fov: 42 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 5]} intensity={1.4} />
        <directionalLight position={[-5, -2, 2]} intensity={0.8} color="#4bb3d4" />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#f6c445" />
        <Ball reduced={reduced} drag={drag} />
      </Canvas>
    </div>
  );
}
