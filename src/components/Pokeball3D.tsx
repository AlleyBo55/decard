"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";
import { useReducedMotion } from "@/lib/hooks";

export type CatchPhase = "idle" | "shaking" | "caught";

const TAU = Math.PI * 2;

interface BallProps {
  phase: CatchPhase;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  dragRef: React.RefObject<number>;
  shadowRef: React.RefObject<HTMLDivElement | null>;
  reduced: boolean;
}

function Ball({ phase, pointerRef, dragRef, shadowRef, reduced }: BallProps) {
  const pivotRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const buttonRef = useRef<THREE.MeshStandardMaterial>(null);
  const phaseStartRef = useRef(0);

  useEffect(() => {
    phaseStartRef.current = performance.now();
  }, [phase]);

  useFrame((state, delta) => {
    const pivot = pivotRef.current;
    const spin = spinRef.current;
    if (!pivot || !spin) return;
    const t = state.clock.elapsedTime;

    // Spin: drag fling first, otherwise a slow idle turn. While catching,
    // ease back so the button faces the camera.
    if (phase !== "idle") {
      const front = Math.round(spin.rotation.y / TAU) * TAU;
      spin.rotation.y += (front - spin.rotation.y) * 0.18;
    } else if (dragRef.current !== 0) {
      spin.rotation.y += dragRef.current;
      dragRef.current *= 0.92;
      if (Math.abs(dragRef.current) < 1e-4) dragRef.current = 0;
    } else if (!reduced) {
      spin.rotation.y += delta * 0.35;
    }

    // Lean toward the cursor.
    pivot.rotation.x += (pointerRef.current.y * 0.3 - pivot.rotation.x) * 0.08;
    pivot.rotation.y += (pointerRef.current.x * 0.45 - pivot.rotation.y) * 0.08;

    const bob = reduced ? 0 : Math.sin(t * 1.4) * 0.07;
    pivot.position.y = -1 + bob;

    // Three shakes rocking on the ground point, like the catch animation.
    if (phase === "shaking") {
      const e = (performance.now() - phaseStartRef.current) / 1000;
      const k = Math.floor(e / 0.72);
      const local = e - k * 0.72;
      pivot.rotation.z =
        k < 3 && local < 0.46 ? Math.sin((local / 0.46) * TAU) * 0.42 * (1 - k * 0.18) : pivot.rotation.z * 0.8;
    } else {
      pivot.rotation.z *= 0.85;
    }

    // Button glow: soft while shaking, pulsing on a catch.
    const button = buttonRef.current;
    if (button) {
      const glow = phase === "caught" ? 1.2 + Math.sin(t * 12) * 0.6 : phase === "shaking" ? 0.35 : 0;
      button.emissiveIntensity += (glow - button.emissiveIntensity) * 0.2;
    }

    // Ground shadow follows the float.
    const shadow = shadowRef.current;
    if (shadow) {
      shadow.style.transform = `translateX(-50%) scale(${(1 - bob * 1.6).toFixed(3)})`;
      shadow.style.opacity = (0.6 - bob * 1.4).toFixed(3);
    }
  });

  return (
    // The pivot sits at the ball's base so shakes rock on the ground.
    <group ref={pivotRef} position={[0, -1, 0]}>
      <group position={[0, 1, 0]}>
        <group ref={spinRef}>
          <mesh>
            <sphereGeometry args={[1, 48, 24, 0, TAU, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#e3350d" roughness={0.28} metalness={0.05} />
          </mesh>
          <mesh>
            <sphereGeometry args={[1, 48, 24, 0, TAU, Math.PI / 2, Math.PI / 2]} />
            <meshStandardMaterial color="#fbf8f2" roughness={0.34} metalness={0.02} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[1.012, 1.012, 0.11, 64, 1, true]} />
            <meshStandardMaterial color="#29263d" roughness={0.45} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.965]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.31, 0.31, 0.1, 40]} />
            <meshStandardMaterial color="#29263d" roughness={0.45} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0, 1.005]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.235, 0.235, 0.1, 40]} />
            <meshStandardMaterial color="#fbf8f2" roughness={0.34} />
          </mesh>
          <mesh position={[0, 0, 1.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.08, 32]} />
            <meshStandardMaterial ref={buttonRef} color="#ffffff" roughness={0.18} emissive="#ffcb05" emissiveIntensity={0} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/**
 * The hero Poké Ball. Renders only while on screen (the frame loop pauses when
 * scrolled away), caps DPR, and never re-renders React on pointer moves.
 */
export default function Pokeball3D({ phase, onThrow }: { phase: CatchPhase; onThrow: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef(0);
  const pressRef = useRef<{ last: number; moved: number } | null>(null);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointerRef.current.x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 1.5)));
      pointerRef.current.y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 1.5)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      role="button"
      tabIndex={0}
      aria-label="Throw the Poké Ball to catch a random deal"
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onThrow()}
      className="relative h-full w-full cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: "pan-y" }}
      onPointerDown={(e) => {
        pressRef.current = { last: e.clientX, moved: 0 };
      }}
      onPointerMove={(e) => {
        const p = pressRef.current;
        if (!p) return;
        dragRef.current = (e.clientX - p.last) * 0.012;
        p.moved += Math.abs(e.clientX - p.last);
        p.last = e.clientX;
      }}
      onPointerUp={() => {
        const p = pressRef.current;
        pressRef.current = null;
        if (p && p.moved < 6) onThrow();
      }}
      onPointerLeave={() => {
        pressRef.current = null;
      }}
    >
      <div
        ref={shadowRef}
        aria-hidden
        className="absolute left-1/2 bottom-[9%] h-[8%] w-[52%] rounded-[50%]"
        style={{ background: "radial-gradient(closest-side, rgb(41 38 61 / .38), transparent)", transform: "translateX(-50%)" }}
      />
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0.15, 4.3], fov: 38 }}
      >
        <hemisphereLight args={["#fff7e6", "#c3b79f", 1.1]} />
        <directionalLight position={[3, 5, 4]} intensity={1.7} color="#fff4e0" />
        <directionalLight position={[-4, -1, -3]} intensity={0.7} color="#6390f0" />
        <ambientLight intensity={0.22} />
        <Ball phase={phase} pointerRef={pointerRef} dragRef={dragRef} shadowRef={shadowRef} reduced={reduced} />
      </Canvas>
    </div>
  );
}
