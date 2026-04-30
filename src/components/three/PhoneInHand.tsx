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

const SKIN = "#d8a07a";
const SKIN_DARK = "#b87a55";
const SKIN_LIGHT = "#e8b893";
const NAIL = "#f0d8c4";

function Phalanx({
  length,
  rTop,
  rBot,
}: {
  length: number;
  rTop: number;
  rBot: number;
}) {
  // Tapered, slightly flattened phalanx (wider than tall)
  return (
    <group>
      <mesh castShadow position={[0, 0, length / 2]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.78]}>
        <cylinderGeometry args={[rTop, rBot, length, 20]} />
        <meshStandardMaterial color={SKIN} roughness={0.62} />
      </mesh>
      {/* Subtle skin crease line */}
      <mesh position={[0, -rBot * 0.7, length * 0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[rBot * 0.8, 0.008, 6, 16, Math.PI * 0.8]} />
        <meshStandardMaterial color={SKIN_DARK} roughness={0.9} />
      </mesh>
    </group>
  );
}

function Knuckle({ radius }: { radius: number }) {
  return (
    <mesh castShadow scale={[1.05, 0.85, 1]}>
      <sphereGeometry args={[radius, 20, 16]} />
      <meshStandardMaterial color={SKIN_LIGHT} roughness={0.55} />
    </mesh>
  );
}

function Fingernail({ radius, length }: { radius: number; length: number }) {
  // Small curved nail on top of fingertip
  return (
    <mesh position={[0, radius * 0.75, length * 0.7]} rotation={[-0.4, 0, 0]} scale={[0.8, 0.4, 1.2]}>
      <sphereGeometry args={[radius * 0.55, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color={NAIL} roughness={0.3} metalness={0.05} />
    </mesh>
  );
}

function Finger({
  basePos,
  baseRot,
  lengths,
  radii,
  curls,
  spread = 0,
}: {
  basePos: [number, number, number];
  baseRot: [number, number, number];
  lengths: [number, number, number]; // proximal, middle, distal
  radii: [number, number, number, number]; // base, p-d/m-base, m-d/d-base, tip
  curls: [number, number, number]; // bend at each joint (radians)
  spread?: number;
}) {
  const [l1, l2, l3] = lengths;
  const [r0, r1, r2, r3] = radii;
  const [c1, c2, c3] = curls;

  return (
    <group position={basePos} rotation={baseRot}>
      {/* MCP (knuckle at hand) */}
      <Knuckle radius={r0} />
      <group rotation={[c1, spread, 0]}>
        <Phalanx length={l1} rTop={r1} rBot={r0} />
        <group position={[0, 0, l1]}>
          {/* PIP joint */}
          <Knuckle radius={r1 * 0.95} />
          <group rotation={[c2, 0, 0]}>
            <Phalanx length={l2} rTop={r2} rBot={r1} />
            <group position={[0, 0, l2]}>
              {/* DIP joint */}
              <Knuckle radius={r2 * 0.92} />
              <group rotation={[c3, 0, 0]}>
                <Phalanx length={l3} rTop={r3} rBot={r2} />
                {/* Fingertip pad */}
                <mesh position={[0, -r3 * 0.1, l3]} scale={[1, 0.85, 0.95]}>
                  <sphereGeometry args={[r3 * 1.05, 18, 14]} />
                  <meshStandardMaterial color={SKIN_LIGHT} roughness={0.55} />
                </mesh>
                <Fingernail radius={r3} length={l3} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

function Palm() {
  return (
    <group>
      {/* Main palm — flattened ellipsoid */}
      <mesh castShadow receiveShadow scale={[1.3, 0.42, 1.2]}>
        <sphereGeometry args={[1.0, 32, 24]} />
        <meshStandardMaterial color={SKIN} roughness={0.62} />
      </mesh>
      {/* Thenar eminence (thumb muscle pad) */}
      <mesh castShadow position={[0.85, 0.08, -0.15]} scale={[0.55, 0.45, 0.7]}>
        <sphereGeometry args={[0.6, 24, 20]} />
        <meshStandardMaterial color={SKIN_LIGHT} roughness={0.6} />
      </mesh>
      {/* Hypothenar eminence (pinky side pad) */}
      <mesh castShadow position={[-0.95, 0.05, -0.05]} scale={[0.4, 0.4, 0.85]}>
        <sphereGeometry args={[0.55, 24, 20]} />
        <meshStandardMaterial color={SKIN} roughness={0.65} />
      </mesh>
      {/* Knuckle ridge (metacarpal heads, top of palm) */}
      <mesh castShadow position={[0, 0.1, 0.95]} scale={[1.15, 0.35, 0.4]}>
        <sphereGeometry args={[0.85, 28, 18]} />
        <meshStandardMaterial color={SKIN_LIGHT} roughness={0.6} />
      </mesh>
      {/* Palm crease (life line / heart line) */}
      <mesh position={[0.1, 0.42, 0.05]} rotation={[-Math.PI / 2, 0, -0.4]}>
        <torusGeometry args={[0.55, 0.01, 6, 24, Math.PI * 0.7]} />
        <meshStandardMaterial color={SKIN_DARK} roughness={0.9} />
      </mesh>
      <mesh position={[-0.1, 0.42, 0.4]} rotation={[-Math.PI / 2, 0, 0.2]}>
        <torusGeometry args={[0.7, 0.009, 6, 24, Math.PI * 0.55]} />
        <meshStandardMaterial color={SKIN_DARK} roughness={0.9} />
      </mesh>
    </group>
  );
}

function Hand({ indexCurl }: { indexCurl: number }) {
  // Hand tilted back so palm faces camera-up, fingers reach forward (+Z)
  return (
    <group rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -1.5, 0.2]}>
      <Palm />

      {/* Index finger — animated, slight outward spread */}
      <Finger
        basePos={[0.62, 0.18, 0.92]}
        baseRot={[0, 0.04, 0]}
        lengths={[0.6, 0.42, 0.32]}
        radii={[0.16, 0.145, 0.13, 0.115]}
        curls={[indexCurl * 0.55, indexCurl * 0.95, indexCurl * 0.7]}
        spread={0.05}
      />

      {/* Middle finger — longest, mostly curled to grip phone back */}
      <Finger
        basePos={[0.2, 0.2, 1.0]}
        baseRot={[0, 0.0, 0]}
        lengths={[0.66, 0.46, 0.34]}
        radii={[0.165, 0.15, 0.135, 0.12]}
        curls={[0.9, 1.2, 0.6]}
      />

      {/* Ring finger */}
      <Finger
        basePos={[-0.22, 0.18, 0.95]}
        baseRot={[0, -0.02, 0]}
        lengths={[0.6, 0.42, 0.3]}
        radii={[0.155, 0.14, 0.125, 0.11]}
        curls={[0.95, 1.25, 0.65]}
        spread={-0.03}
      />

      {/* Pinky — shorter, set lower */}
      <Finger
        basePos={[-0.62, 0.13, 0.78]}
        baseRot={[0, -0.15, 0]}
        lengths={[0.45, 0.32, 0.24]}
        radii={[0.13, 0.12, 0.105, 0.095]}
        curls={[1.0, 1.3, 0.7]}
        spread={-0.08}
      />

      {/* Thumb — opposed, gripping side of phone */}
      <group position={[1.05, 0.15, 0.05]} rotation={[0.3, -0.9, -1.1]}>
        <Knuckle radius={0.22} />
        <group rotation={[0.5, 0, 0]}>
          <Phalanx length={0.55} rTop={0.18} rBot={0.21} />
          <group position={[0, 0, 0.55]}>
            <Knuckle radius={0.18} />
            <group rotation={[0.7, 0, 0]}>
              <Phalanx length={0.42} rTop={0.15} rBot={0.18} />
              <mesh position={[0, -0.02, 0.42]} scale={[1, 0.85, 0.95]}>
                <sphereGeometry args={[0.16, 18, 14]} />
                <meshStandardMaterial color={SKIN_LIGHT} roughness={0.55} />
              </mesh>
              <Fingernail radius={0.15} length={0.42} />
            </group>
          </group>
        </group>
      </group>

      {/* Wrist — tapered toward arm */}
      <mesh castShadow position={[0, -0.02, -0.95]} scale={[1, 0.7, 1]}>
        <cylinderGeometry args={[0.62, 0.7, 1.1, 28]} />
        <meshStandardMaterial color={SKIN_DARK} roughness={0.7} />
      </mesh>
      {/* Wrist bone bump (ulnar styloid) */}
      <mesh position={[-0.55, 0.05, -0.7]} scale={[0.4, 0.4, 0.6]}>
        <sphereGeometry args={[0.2, 16, 12]} />
        <meshStandardMaterial color={SKIN_LIGHT} roughness={0.6} />
      </mesh>

      {/* Sleeve cuff */}
      <mesh castShadow position={[0, -0.02, -1.7]} scale={[1, 0.75, 1]}>
        <cylinderGeometry args={[0.78, 0.82, 0.7, 28]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.9} />
      </mesh>
      {/* Cuff hem highlight */}
      <mesh position={[0, -0.02, -1.36]} scale={[1, 0.75, 1]}>
        <torusGeometry args={[0.78, 0.025, 8, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
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
