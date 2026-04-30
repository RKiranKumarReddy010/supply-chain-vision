import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

const SOCIALS = [
  { name: "Instagram", handle: "@omnitensor", icon: "IG" },
  { name: "Facebook", handle: "/omnitensor", icon: "FB" },
  { name: "Twitter / X", handle: "@omnitensor", icon: "X" },
  { name: "LinkedIn", handle: "/company/omnitensor", icon: "IN" },
];

/* ----------------------------- Hand ----------------------------- */
function Finger({
  basePos,
  baseRot,
  segments,
  curl,
}: {
  basePos: [number, number, number];
  baseRot: [number, number, number];
  segments: { len: number; radius: number }[];
  curl: number; // 0..1 how much the finger is bent
}) {
  // Build a chain of joints
  return (
    <group position={basePos} rotation={baseRot}>
      <FingerChain segments={segments} curl={curl} />
    </group>
  );
}

function FingerChain({
  segments,
  curl,
  index = 0,
}: {
  segments: { len: number; radius: number }[];
  curl: number;
  index?: number;
}) {
  if (index >= segments.length) return null;
  const seg = segments[index];
  // Curl angle increases per joint
  const bend = curl * (index === 0 ? 0.5 : 0.9);
  return (
    <group rotation={[bend, 0, 0]}>
      {/* Joint sphere */}
      <mesh>
        <sphereGeometry args={[seg.radius * 1.05, 16, 16]} />
        <meshStandardMaterial color="#e8c5a8" roughness={0.6} />
      </mesh>
      {/* Bone */}
      <mesh position={[0, 0, seg.len / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[seg.radius, seg.radius * 0.92, seg.len, 16]} />
        <meshStandardMaterial color="#edcdb0" roughness={0.55} />
      </mesh>
      <group position={[0, 0, seg.len]}>
        <FingerChain segments={segments} curl={curl} index={index + 1} />
      </group>
    </group>
  );
}

function Hand({ indexCurl }: { indexCurl: number }) {
  // Hand is oriented palm-up, fingers pointing +Z
  return (
    <group rotation={[-Math.PI / 2.4, 0, 0]} position={[0, -1.4, 0]}>
      {/* Palm */}
      <RoundedBox args={[2.6, 0.55, 2.4]} radius={0.25} smoothness={4} castShadow receiveShadow position={[0, 0, 0]}>
        <meshStandardMaterial color="#e8c5a8" roughness={0.65} />
      </RoundedBox>

      {/* Thumb (curled around side) */}
      <group position={[1.25, 0.05, -0.4]} rotation={[0, 0, -0.6]}>
        <Finger
          basePos={[0, 0, 0]}
          baseRot={[0.2, -0.8, 0]}
          segments={[
            { len: 0.55, radius: 0.18 },
            { len: 0.45, radius: 0.16 },
            { len: 0.35, radius: 0.13 },
          ]}
          curl={0.55}
        />
      </group>

      {/* Index finger — animated curl */}
      <Finger
        basePos={[0.7, 0.15, 1.15]}
        baseRot={[0, 0, 0]}
        segments={[
          { len: 0.55, radius: 0.16 },
          { len: 0.45, radius: 0.14 },
          { len: 0.35, radius: 0.12 },
        ]}
        curl={indexCurl}
      />

      {/* Middle finger (slight curl, supports phone) */}
      <Finger
        basePos={[0.22, 0.15, 1.2]}
        baseRot={[0, 0, 0]}
        segments={[
          { len: 0.6, radius: 0.17 },
          { len: 0.5, radius: 0.15 },
          { len: 0.38, radius: 0.13 },
        ]}
        curl={0.85}
      />

      {/* Ring finger */}
      <Finger
        basePos={[-0.28, 0.15, 1.18]}
        baseRot={[0, 0, 0]}
        segments={[
          { len: 0.55, radius: 0.16 },
          { len: 0.45, radius: 0.14 },
          { len: 0.35, radius: 0.12 },
        ]}
        curl={0.9}
      />

      {/* Pinky */}
      <Finger
        basePos={[-0.78, 0.13, 1.1]}
        baseRot={[0, 0, 0]}
        segments={[
          { len: 0.45, radius: 0.14 },
          { len: 0.36, radius: 0.12 },
          { len: 0.28, radius: 0.1 },
        ]}
        curl={0.95}
      />

      {/* Wrist */}
      <mesh position={[0, -0.05, -1.5]} castShadow>
        <cylinderGeometry args={[0.85, 0.95, 1.6, 24]} />
        <meshStandardMaterial color="#d9b598" roughness={0.7} />
      </mesh>
      {/* Sleeve */}
      <mesh position={[0, -0.05, -2.3]} castShadow>
        <cylinderGeometry args={[1.0, 1.05, 0.6, 24]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ----------------------------- Phone ----------------------------- */

function Phone({ scrollOffset, activeIdx }: { scrollOffset: number; activeIdx: number }) {
  // Phone tilted slightly forward, sitting on palm
  const PHONE_W = 2.0;
  const PHONE_H = 4.1;
  const PHONE_D = 0.18;
  const SCREEN_INSET = 0.08;
  const SCREEN_W = PHONE_W - SCREEN_INSET * 2;
  const SCREEN_H = PHONE_H - SCREEN_INSET * 2 - 0.2;

  // each card occupies the full screen height; offset moves them up
  const cardHeight = SCREEN_H;

  return (
    <group position={[0, 0.4, 0.3]} rotation={[-0.18, 0, 0]}>
      {/* Phone body */}
      <RoundedBox args={[PHONE_W, PHONE_H, PHONE_D]} radius={0.18} smoothness={6} castShadow>
        <meshStandardMaterial color="#0a0a0a" roughness={0.35} metalness={0.7} />
      </RoundedBox>

      {/* Bezel highlight */}
      <RoundedBox args={[PHONE_W + 0.01, PHONE_H + 0.01, PHONE_D - 0.02]} radius={0.18} smoothness={6} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.6} />
      </RoundedBox>

      {/* Screen base (black) */}
      <mesh position={[0, 0, PHONE_D / 2 + 0.001]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial color="#050505" />
      </mesh>

      {/* Status bar */}
      <Text
        position={[-SCREEN_W / 2 + 0.18, SCREEN_H / 2 - 0.18, PHONE_D / 2 + 0.005]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        9:41
      </Text>
      <Text
        position={[SCREEN_W / 2 - 0.18, SCREEN_H / 2 - 0.18, PHONE_D / 2 + 0.005]}
        fontSize={0.09}
        color="#ffffff"
        anchorX="right"
        anchorY="middle"
      >
        ●●●●● 5G
      </Text>

      {/* Header */}
      <Text
        position={[0, SCREEN_H / 2 - 0.55, PHONE_D / 2 + 0.005]}
        fontSize={0.16}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
      >
        CONNECT WITH US
      </Text>
      <mesh position={[0, SCREEN_H / 2 - 0.78, PHONE_D / 2 + 0.005]}>
        <planeGeometry args={[0.6, 0.012]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Clipped scroll viewport */}
      <group position={[0, -0.15, PHONE_D / 2 + 0.004]}>
        {/* Cards stacked vertically; translated by scrollOffset */}
        <group position={[0, scrollOffset * (cardHeight - 1.2), 0]}>
          {SOCIALS.map((s, i) => {
            const yPos = (SOCIALS.length - 1 - i) * 1.05 - (SOCIALS.length - 1) * 1.05 / 2;
            const isActive = i === activeIdx;
            return (
              <SocialCard key={s.name} y={yPos} social={s} active={isActive} width={SCREEN_W - 0.2} />
            );
          })}
        </group>
      </group>

      {/* Bottom indicator dots */}
      <group position={[0, -SCREEN_H / 2 + 0.25, PHONE_D / 2 + 0.005]}>
        {SOCIALS.map((_, i) => (
          <mesh key={i} position={[(i - (SOCIALS.length - 1) / 2) * 0.2, 0, 0]}>
            <circleGeometry args={[i === activeIdx ? 0.045 : 0.025, 16]} />
            <meshBasicMaterial color={i === activeIdx ? "#ffffff" : "#555555"} />
          </mesh>
        ))}
      </group>

      {/* Speaker / camera */}
      <mesh position={[0, PHONE_H / 2 - 0.12, PHONE_D / 2 + 0.005]}>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>

      {/* Side button */}
      <mesh position={[PHONE_W / 2 + 0.005, 0.5, 0]}>
        <boxGeometry args={[0.03, 0.4, 0.08]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} />
      </mesh>
    </group>
  );
}

function SocialCard({
  y,
  social,
  active,
  width,
}: {
  y: number;
  social: { name: string; handle: string; icon: string };
  active: boolean;
  width: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    const target = active ? 1 : 0.4;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity += (target - mat.opacity) * 0.15;
  });

  return (
    <group position={[0, y, 0]}>
      {/* Card background */}
      <mesh ref={ref}>
        <planeGeometry args={[width, 0.95]} />
        <meshBasicMaterial color="#111111" transparent opacity={0.4} />
      </mesh>
      {/* Border */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, 0.95)]} />
        <lineBasicMaterial color={active ? "#ffffff" : "#333333"} />
      </lineSegments>

      {/* Icon badge */}
      <mesh position={[-width / 2 + 0.45, 0, 0.001]}>
        <circleGeometry args={[0.32, 32]} />
        <meshBasicMaterial color={active ? "#ffffff" : "#444444"} />
      </mesh>
      <Text
        position={[-width / 2 + 0.45, 0, 0.003]}
        fontSize={0.18}
        color={active ? "#000000" : "#111111"}
        anchorX="center"
        anchorY="middle"
      >
        {social.icon}
      </Text>

      {/* Name */}
      <Text
        position={[-width / 2 + 0.95, 0.15, 0.003]}
        fontSize={0.14}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        {social.name}
      </Text>
      {/* Handle */}
      <Text
        position={[-width / 2 + 0.95, -0.12, 0.003]}
        fontSize={0.1}
        color="#888888"
        anchorX="left"
        anchorY="middle"
      >
        {social.handle}
      </Text>

      {/* Arrow */}
      <Text
        position={[width / 2 - 0.2, 0, 0.003]}
        fontSize={0.16}
        color={active ? "#ffffff" : "#444444"}
        anchorX="right"
        anchorY="middle"
      >
        →
      </Text>
    </group>
  );
}

/* ----------------------------- Scene ----------------------------- */

function SceneInner({ progress }: { progress: number }) {
  // index finger curls/swipes in a rhythmic motion as user scrolls
  const swipePhase = (progress * (SOCIALS.length - 1)) % 1;
  // make a triangular pulse: 0 -> 1 -> 0
  const indexCurl = 0.15 + Math.sin(swipePhase * Math.PI) * 0.55;

  // active card index based on scroll
  const activeIdx = Math.min(SOCIALS.length - 1, Math.floor(progress * SOCIALS.length));

  // smooth scroll offset for cards (negative = scroll down through list)
  const scrollOffset = -progress * (SOCIALS.length - 1) / (SOCIALS.length - 1);

  // subtle camera idle
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime;
    const tx = Math.sin(t * 0.25) * 0.15;
    camera.position.x += (tx - camera.position.x) * 0.04;
    camera.lookAt(0, 0.2, 0);
  });

  return (
    <>
      <fog attach="fog" args={["#050505", 12, 28]} />
      <color attach="background" args={["#050505"]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 10, 6]} intensity={1.2} castShadow />
      <directionalLight position={[-8, 4, -6]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 2, 4]} intensity={0.6} color="#ffffff" />

      <Hand indexCurl={indexCurl} />
      <Phone scrollOffset={scrollOffset} activeIdx={activeIdx} />
    </>
  );
}

const SOCIALS_LEN = 4;

export default function PhoneInHand({ progress }: { progress: number }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.5, 7], fov: 38 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <SceneInner progress={progress} />
      </Suspense>
    </Canvas>
  );
}
