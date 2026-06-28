"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { skills, skillGroupColor, type Skill } from "@/lib/data";

type Positioned = Skill & { pos: [number, number, number] };

/** Distribute nodes evenly on a sphere (Fibonacci sphere). */
function useGalaxyLayout(radius: number): Positioned[] {
  return useMemo(() => {
    const n = skills.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return skills.map((s, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      return { ...s, pos: [x * radius, y * radius, z * radius] };
    });
  }, [radius]);
}

function Node({
  node,
  selected,
  dimmed,
  onSelect,
}: {
  node: Positioned;
  selected: boolean;
  dimmed: boolean;
  onSelect: (id: string) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const color = skillGroupColor[node.group];
  const baseScale = 0.32 + node.level * 0.34;

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = selected ? 1.6 : hovered ? 1.25 : 1;
    ref.current.scale.lerp(
      new THREE.Vector3(target, target, target).multiplyScalar(baseScale),
      Math.min(1, delta * 8),
    );
  });

  return (
    <group position={node.pos}>
      <mesh
        ref={ref}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={selected ? 1.4 : hovered ? 0.9 : 0.45}
          roughness={0.35}
          metalness={0.4}
          transparent
          opacity={dimmed ? 0.25 : 1}
        />
      </mesh>

      <Html
        center
        distanceFactor={11}
        style={{ pointerEvents: "none", opacity: dimmed ? 0.3 : 1 }}
        zIndexRange={[10, 0]}
      >
        <div
          className="select-none whitespace-nowrap font-mono text-[11px] tracking-tight"
          style={{
            color: selected || hovered ? "#fff" : "rgba(220,225,240,0.75)",
            textShadow: "0 1px 8px rgba(0,0,0,0.9)",
            transform: "translateY(22px)",
          }}
        >
          {node.label}
        </div>
      </Html>
    </group>
  );
}

function Galaxy({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const nodes = useGalaxyLayout(5.4);
  const pointer = useRef({ x: 0, y: 0 });

  const related = useMemo(() => {
    if (!selected) return null;
    const sel = skills.find((s) => s.id === selected);
    if (!sel) return null;
    const ids = new Set<string>([sel.id]);
    // co-located skills sharing a project stay lit
    for (const s of skills) {
      if (s.projects.some((p) => sel.projects.includes(p))) ids.add(s.id);
    }
    return ids;
  }, [selected]);

  useFrame((state, delta) => {
    if (!group.current) return;
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
    // idle spin + pointer parallax
    group.current.rotation.y += delta * 0.08;
    const targetX = pointer.current.y * 0.35;
    const targetY = group.current.rotation.y + pointer.current.x * 0.0;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      Math.min(1, delta * 2),
    );
    void targetY;
  });

  return (
    <group ref={group}>
      {/* connective wireframe core */}
      <mesh>
        <icosahedronGeometry args={[5.4, 1]} />
        <meshBasicMaterial color="#6d8bff" wireframe transparent opacity={0.05} />
      </mesh>
      {nodes.map((n) => (
        <Node
          key={n.id}
          node={n}
          selected={selected === n.id}
          dimmed={!!related && !related.has(n.id)}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

export default function GalaxyScene({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      onPointerMissed={() => onSelect("")}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#6d8bff" />
      <pointLight position={[-10, -6, -8]} intensity={0.8} color="#b07bff" />
      <Galaxy selected={selected || null} onSelect={onSelect} />
    </Canvas>
  );
}
