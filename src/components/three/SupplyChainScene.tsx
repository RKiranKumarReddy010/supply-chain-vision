import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* ----------------------------- Models ----------------------------- */

function Warehouse({ position, pulse = 0 }: { position: [number, number, number]; pulse?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current) return;
    const m = ref.current.children[0] as THREE.Mesh;
    if (m && (m.material as THREE.MeshStandardMaterial).emissiveIntensity !== undefined) {
      (m.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse * 0.6;
    }
  });
  return (
    <group ref={ref} position={position}>
      {/* Main body */}
      <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
        <boxGeometry args={[5.2, 2.2, 3.4]} />
        <meshStandardMaterial color="#e8e8e8" emissive="#ffffff" emissiveIntensity={0} roughness={0.55} metalness={0.1} />
      </mesh>
      {/* Roof prism */}
      <mesh castShadow position={[0, 2.55, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.01, 1.9, 3.4, 3, 1, false]} />
        <meshStandardMaterial color="#bdbdbd" roughness={0.7} />
      </mesh>
      {/* Loading bays */}
      {[-1.6, -0.55, 0.5, 1.55].map((x) => (
        <mesh key={x} position={[x, 0.55, 1.71]}>
          <planeGeometry args={[0.7, 1.0]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
      ))}
      {/* Antenna */}
      <mesh position={[2.0, 3.5, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.2]} />
        <meshStandardMaterial color="#cfcfcf" />
      </mesh>
      {/* Base shadow plate */}
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6.2, 4.4]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
    </group>
  );
}

function Store({ position, pulse = 0 }: { position: [number, number, number]; pulse?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse * 0.5;
  });
  return (
    <group position={position}>
      <mesh ref={ref} castShadow position={[0, 0.9, 0]}>
        <boxGeometry args={[3.2, 1.8, 2.4]} />
        <meshStandardMaterial color="#ededed" emissive="#ffffff" emissiveIntensity={0} roughness={0.5} />
      </mesh>
      {/* Awning */}
      <mesh position={[0, 1.55, 1.35]}>
        <boxGeometry args={[3.4, 0.08, 0.7]} />
        <meshStandardMaterial color="#9a9a9a" roughness={0.6} />
      </mesh>
      {/* Window strip */}
      <mesh position={[0, 0.85, 1.21]}>
        <planeGeometry args={[2.6, 0.7]} />
        <meshStandardMaterial color="#0d0d0d" emissive="#ffffff" emissiveIntensity={0.05} />
      </mesh>
      {/* Door */}
      <mesh position={[1.05, 0.5, 1.21]}>
        <planeGeometry args={[0.55, 1.0]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Roof cap */}
      <mesh position={[0, 1.85, 0]}>
        <boxGeometry args={[3.3, 0.1, 2.5]} />
        <meshStandardMaterial color="#bcbcbc" />
      </mesh>
    </group>
  );
}

function Truck({ curve, t }: { curve: THREE.CatmullRomCurve3; t: number }) {
  const group = useRef<THREE.Group>(null);
  
  const logoTexture = useLoader(THREE.TextureLoader, "/favicon.ico?v=2");
  logoTexture.colorSpace = THREE.SRGBColorSpace;

  useFrame(() => {
    if (!group.current) return;
    const tt = Math.max(0.001, Math.min(0.999, t));
    const pos = curve.getPointAt(tt);
    const tan = curve.getTangentAt(tt);
    group.current.position.set(pos.x, pos.y, pos.z);
    const angle = Math.atan2(tan.x, tan.z);
    group.current.rotation.y = angle;
  });
  return (
    <group ref={group}>
      {/* Chassis/Frame */}
      <mesh position={[0, 0.41, 0.1]}>
        <boxGeometry args={[0.8, 0.1, 2.0]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.5} />
      </mesh>

      {/* Cargo box */}
      <RoundedBox args={[0.9, 1.2, 1.4]} radius={0.04} smoothness={4} castShadow position={[0, 1.06, -0.4]}>
        <meshStandardMaterial color="#f4f4f4" roughness={0.4} metalness={0.15} />
      </RoundedBox>

      {/* Logo Right */}
      <mesh position={[0.455, 1.06, -0.4]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshStandardMaterial map={logoTexture} transparent alphaTest={0.05} />
      </mesh>

      {/* Logo Left */}
      <mesh position={[-0.455, 1.06, -0.4]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshStandardMaterial map={logoTexture} transparent alphaTest={0.05} />
      </mesh>

      {/* Cab */}
      <RoundedBox args={[0.9, 0.8, 0.7]} radius={0.05} smoothness={4} castShadow position={[0, 0.86, 0.65]}>
        <meshStandardMaterial color="#ffc107" roughness={0.4} metalness={0.6} />
      </RoundedBox>

      {/* Nose/Engine */}
      <RoundedBox args={[0.9, 0.5, 0.4]} radius={0.04} smoothness={4} castShadow position={[0, 0.71, 1.15]}>
        <meshStandardMaterial color="#ffc107" roughness={0.4} metalness={0.6} />
      </RoundedBox>

      {/* Windshield */}
      <mesh position={[0, 1.02, 1.01]} rotation={[-0.1, 0, 0]}>
        <planeGeometry args={[0.8, 0.38]} />
        <meshStandardMaterial color="#050505" emissive="#ffffff" emissiveIntensity={0.1} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Side Mirrors */}
      <mesh position={[0.48, 0.95, 0.85]}>
        <boxGeometry args={[0.08, 0.18, 0.06]} />
        <meshStandardMaterial color="#111" roughness={0.4} />
      </mesh>
      <mesh position={[-0.48, 0.95, 0.85]}>
        <boxGeometry args={[0.08, 0.18, 0.06]} />
        <meshStandardMaterial color="#111" roughness={0.4} />
      </mesh>

      {/* Grille */}
      <mesh position={[0, 0.71, 1.355]}>
        <planeGeometry args={[0.6, 0.3]} />
        <meshStandardMaterial color="#111" metalness={0.8} />
      </mesh>

      {/* Front Bumper */}
      <RoundedBox args={[1.0, 0.15, 0.15]} radius={0.02} smoothness={2} position={[0, 0.51, 1.38]}>
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.4} />
      </RoundedBox>

      {/* Exhaust Pipe */}
      <mesh position={[0.48, 1.26, 0.35]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Headlights */}
      <mesh position={[0.35, 0.71, 1.36]}>
        <boxGeometry args={[0.15, 0.1, 0.02]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-0.35, 0.71, 1.36]}>
        <boxGeometry args={[0.15, 0.1, 0.02]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
      </mesh>

      {/* Taillights */}
      <mesh position={[0.35, 0.56, -1.11]}>
        <boxGeometry args={[0.15, 0.08, 0.02]} />
        <meshStandardMaterial color="#f00" emissive="#f00" emissiveIntensity={1} />
      </mesh>
      <mesh position={[-0.35, 0.56, -1.11]}>
        <boxGeometry args={[0.15, 0.08, 0.02]} />
        <meshStandardMaterial color="#f00" emissive="#f00" emissiveIntensity={1} />
      </mesh>

      {/* Wheels */}
      {[
        [-0.45, 0.18, 0.9], // Front left
        [0.45, 0.18, 0.9],  // Front right
        [-0.45, 0.18, -0.6], // Rear left
        [0.45, 0.18, -0.6],  // Rear right
        [-0.45, 0.18, -0.9], // Rear-rear left
        [0.45, 0.18, -0.9],  // Rear-rear right
      ].map((p, i) => (
        <group key={i} position={p as [number, number, number]} rotation={[0, Math.PI / 2, 0]}>
          {/* Tire */}
          <mesh>
            <torusGeometry args={[0.12, 0.06, 16, 32]} />
            <meshStandardMaterial color="#0f0f0f" roughness={0.9} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.1, 16]} />
            <meshStandardMaterial color="#b0b0b0" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Headlight glow */}
      <pointLight position={[0, 0.66, 1.6]} intensity={12.0} distance={20} color="#ffffff" />
    </group>
  );
}

function Route({ curve, progress }: { curve: THREE.CatmullRomCurve3; progress: number }) {
  // Static dotted path
  const points = useMemo(() => curve.getSpacedPoints(80), [curve]);
  const dotsRef = useRef<THREE.InstancedMesh>(null);

  useFrame(() => {
    if (!dotsRef.current) return;
    const dummy = new THREE.Object3D();
    points.forEach((p, i) => {
      dummy.position.set(p.x, 0.02, p.z);
      dummy.scale.setScalar(i / points.length <= progress ? 1 : 0.35);
      dummy.updateMatrix();
      dotsRef.current!.setMatrixAt(i, dummy.matrix);
    });
    dotsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={dotsRef} args={[undefined, undefined, points.length]}>
        <circleGeometry args={[0.09, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </instancedMesh>
    </group>
  );
}

function GridFloor() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>
      <gridHelper args={[120, 60, "#222222", "#161616"]} position={[0, 0.001, 0]} />
    </group>
  );
}

/* ----------------------------- Scene ----------------------------- */

function SceneInner({ progress }: { progress: number }) {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-9, 0, 2),
      new THREE.Vector3(-4, 0, -1.5),
      new THREE.Vector3(0, 0, 1.2),
      new THREE.Vector3(4, 0, -1.5),
      new THREE.Vector3(9, 0, 2),
    ]);
  }, []);

  // Camera dolly/yaw based on scroll
  const camRef = useRef<THREE.PerspectiveCamera>(null);
  useFrame(({ camera }) => {
    const yaw = THREE.MathUtils.lerp(-0.35, 0.35, progress);
    const dolly = THREE.MathUtils.lerp(15, 11, progress);
    const targetX = Math.sin(yaw) * dolly;
    const targetZ = Math.cos(yaw) * dolly;
    camera.position.x += (targetX - camera.position.x) * 0.08;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.position.y += (5 - camera.position.y) * 0.08;
    camera.lookAt(0, 0.6, 0);
  });

  // Pulses
  const warehousePulse = Math.max(0, 1 - progress * 4);
  const storePulse = Math.max(0, (progress - 0.75) * 4);

  return (
    <>
      <fog attach="fog" args={["#050505", 18, 38]} />
      <color attach="background" args={["#050505"]} />

      <ambientLight intensity={0.25} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Rim light */}
      <directionalLight position={[-10, 4, -8]} intensity={0.6} color="#ffffff" />

      <GridFloor />
      <Warehouse position={[-9, 0, 2]} pulse={warehousePulse} />
      <Store position={[9, 0, 2]} pulse={storePulse} />
      <Route curve={curve} progress={progress} />
      <Truck curve={curve} t={progress} />
    </>
  );
}

export default function SupplyChainScene({ progress }: { progress: number }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 5, 14], fov: 38 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <SceneInner progress={progress} />
      </Suspense>
    </Canvas>
  );
}
