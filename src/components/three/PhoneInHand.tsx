import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* ----------------------------- Man ----------------------------- */

const SKIN = "#d8a07a";
const SKIN_DARK = "#b87a55";
const SUIT = "#0d0d0d";
const SHIRT = "#f4f4f4";

function Head({ walkPhase }: { walkPhase: number }) {
  const bob = Math.sin(walkPhase * Math.PI * 2) * 0.04;
  return (
    <group position={[0, 2.55 + bob, 0]}>
      {/* Head */}
      <mesh castShadow>
        <sphereGeometry args={[0.32, 24, 20]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>
      {/* Hair cap */}
      <mesh position={[0, 0.08, -0.02]} scale={[1.02, 0.7, 1.05]}>
        <sphereGeometry args={[0.32, 24, 20, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.85} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, -0.32, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.16, 0.24, 16]} />
        <meshStandardMaterial color={SKIN_DARK} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Arm({
  side, // -1 left, +1 right
  swing,
  raised = false,
}: {
  side: number;
  swing: number;
  raised?: boolean;
}) {
  // Shoulder pivot
  const shoulderX = 0.42 * side;
  // If raised (phone arm), bend forward and up
  const shoulderRot: [number, number, number] = raised
    ? [-1.45, 0, side * 0.15]
    : [swing, 0, side * 0.05];
  const elbowRot: [number, number, number] = raised ? [-0.25, 0, 0] : [Math.max(0, -swing * 0.5), 0, 0];

  return (
    <group position={[shoulderX, 2.12, 0]}>
      {/* Shoulder */}
      <mesh castShadow>
        <sphereGeometry args={[0.18, 16, 14]} />
        <meshStandardMaterial color={SUIT} roughness={0.85} />
      </mesh>
      <group rotation={shoulderRot}>
        {/* Upper arm */}
        <mesh position={[0, -0.35, 0]} castShadow>
          <cylinderGeometry args={[0.13, 0.11, 0.7, 16]} />
          <meshStandardMaterial color={SUIT} roughness={0.85} />
        </mesh>
        <group position={[0, -0.7, 0]} rotation={elbowRot}>
          {/* Elbow */}
          <mesh castShadow>
            <sphereGeometry args={[0.115, 14, 12]} />
            <meshStandardMaterial color={SUIT} roughness={0.85} />
          </mesh>
          {/* Forearm */}
          <mesh position={[0, -0.32, 0]} castShadow>
            <cylinderGeometry args={[0.105, 0.09, 0.65, 16]} />
            <meshStandardMaterial color={SUIT} roughness={0.85} />
          </mesh>
          {/* Hand */}
          <group position={[0, -0.7, 0]}>
            <mesh castShadow scale={[1, 1.2, 0.55]}>
              <sphereGeometry args={[0.13, 16, 14]} />
              <meshStandardMaterial color={SKIN} roughness={0.6} />
            </mesh>
            {/* Phone in raised hand */}
            {raised && (
              <group position={[0, -0.05, 0.05]} rotation={[1.4, 0, 0]}>
                <RoundedBox args={[0.55, 1.05, 0.08]} radius={0.06} smoothness={4} castShadow>
                  <meshStandardMaterial color="#080808" roughness={0.3} metalness={0.7} />
                </RoundedBox>
                {/* Screen glow */}
                <mesh position={[0, 0, 0.045]}>
                  <planeGeometry args={[0.46, 0.92]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0, 0, 0.046]}>
                  <planeGeometry args={[0.46, 0.92]} />
                  <meshBasicMaterial color="#9ad4ff" transparent opacity={0.35} />
                </mesh>
              </group>
            )}
          </group>
        </group>
      </group>
    </group>
  );
}

function Leg({
  side,
  swing,
}: {
  side: number;
  swing: number;
}) {
  return (
    <group position={[0.18 * side, 1.05, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[0.16, 14, 12]} />
        <meshStandardMaterial color={SUIT} roughness={0.85} />
      </mesh>
      <group rotation={[swing, 0, 0]}>
        {/* Thigh */}
        <mesh position={[0, -0.4, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.13, 0.8, 16]} />
          <meshStandardMaterial color={SUIT} roughness={0.85} />
        </mesh>
        <group position={[0, -0.8, 0]} rotation={[Math.max(0, -swing * 0.6), 0, 0]}>
          {/* Knee */}
          <mesh castShadow>
            <sphereGeometry args={[0.13, 14, 12]} />
            <meshStandardMaterial color={SUIT} roughness={0.85} />
          </mesh>
          {/* Calf */}
          <mesh position={[0, -0.38, 0]} castShadow>
            <cylinderGeometry args={[0.13, 0.1, 0.78, 16]} />
            <meshStandardMaterial color={SUIT} roughness={0.85} />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.78, 0.08]} castShadow scale={[1, 0.6, 1.6]}>
            <sphereGeometry args={[0.16, 16, 12]} />
            <meshStandardMaterial color="#050505" roughness={0.4} metalness={0.3} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function Man({ walkPhase }: { walkPhase: number }) {
  const legSwing = Math.sin(walkPhase * Math.PI * 2) * 0.55;
  const armSwing = Math.sin(walkPhase * Math.PI * 2) * 0.45;
  const bob = Math.abs(Math.sin(walkPhase * Math.PI * 2)) * 0.06;

  return (
    <group position={[0, bob, 0]}>
      <Head walkPhase={walkPhase} />

      {/* Torso */}
      <mesh castShadow position={[0, 1.6, 0]} scale={[1, 1, 0.7]}>
        <cylinderGeometry args={[0.42, 0.5, 1.1, 24]} />
        <meshStandardMaterial color={SUIT} roughness={0.85} />
      </mesh>
      {/* Shirt collar */}
      <mesh position={[0, 2.05, 0.18]} scale={[0.9, 0.4, 0.4]}>
        <sphereGeometry args={[0.24, 18, 14]} />
        <meshStandardMaterial color={SHIRT} roughness={0.6} />
      </mesh>
      {/* Tie */}
      <mesh position={[0, 1.75, 0.32]} scale={[0.5, 1.4, 0.1]}>
        <coneGeometry args={[0.1, 0.45, 4]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>

      {/* Hips */}
      <mesh castShadow position={[0, 1.05, 0]} scale={[1, 0.45, 0.7]}>
        <sphereGeometry args={[0.5, 24, 16]} />
        <meshStandardMaterial color={SUIT} roughness={0.85} />
      </mesh>

      {/* Right arm raised holding phone (front-facing for camera) */}
      <Arm side={-1} swing={-armSwing} raised />
      {/* Left arm swinging */}
      <Arm side={1} swing={armSwing} />

      {/* Legs */}
      <Leg side={-1} swing={legSwing} />
      <Leg side={1} swing={-legSwing} />

      {/* Shadow disk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.7, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/* ----------------------------- Scene ----------------------------- */

function SceneInner({ progress }: { progress: number }) {
  // Walk position: -6 (left, off-screen) to +6 (right, off-screen)
  const x = THREE.MathUtils.lerp(-6.5, 6.5, progress);
  // Walk cycle phase advances with distance (4 steps across)
  const walkPhase = (progress * 4) % 1;
  // Slight head turn toward camera at the middle
  const turn = Math.sin(progress * Math.PI) * 0.2;

  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.x = x;
    groupRef.current.rotation.y = turn;
  });

  // soft camera idle
  useFrame(({ camera }) => {
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 1.6, 0);
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 8, 6]} intensity={1.3} castShadow />
      <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#a8c8ff" />
      <pointLight position={[0, 3, 5]} intensity={0.5} color="#ffe3cc" />

      <group ref={groupRef}>
        <Man walkPhase={walkPhase} />
      </group>
    </>
  );
}

export default function PhoneInHand({ progress }: { progress: number }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 2, 8], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <Suspense fallback={null}>
        <SceneInner progress={progress} />
      </Suspense>
    </Canvas>
  );
}
