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

  const bays = [-1.6, -0.55, 0.5, 1.55];
  return (
    <group ref={ref} position={position}>
      {/* Main body */}
      <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
        <boxGeometry args={[5.2, 2.2, 3.4]} />
        <meshStandardMaterial color="#e9e9e9" emissive="#ffffff" emissiveIntensity={0} roughness={0.42} metalness={0.35} />
      </mesh>

      {/* Roof ridge beam */}
      <mesh castShadow position={[0, 2.55, 0]}>
        <cylinderGeometry args={[0.02, 1.15, 3.7, 3, 1, false]} />
        <meshStandardMaterial color="#b9b9b9" roughness={0.55} metalness={0.6} />
      </mesh>
      {/* Roof cap band */}
      <mesh castShadow position={[0, 2.78, 0]}>
        <boxGeometry args={[5.6, 0.08, 0.95]} />
        <meshStandardMaterial color="#cbcbcb" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Roof overhang trim */}
      <mesh position={[0, 2.32, 1.72]}>
        <boxGeometry args={[5.35, 0.07, 0.08]} />
        <meshStandardMaterial color="#9a9a9a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Roof vents */}
      {[-3.0, -0.75, 0.75, 3.0].map((x) => (
        <group key={x} position={[x, 2.6, -1.0]}>
          <mesh>
            <boxGeometry args={[0.36, 0.2, 0.36]} />
            <meshStandardMaterial color="#b5b5b5" metalness={0.7} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.13, 0]}>
            <boxGeometry args={[0.14, 0.06, 0.14]} />
            <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Corner columns */}
      {[
        [-2.6, 1.72],
        [2.6, 1.72],
        [-2.6, -1.72],
        [2.6, -1.72],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 1.1, z]}>
          <boxGeometry args={[0.18, 2.25, 0.18]} />
          <meshStandardMaterial color="#9f9f9f" metalness={0.7} roughness={0.35} />
        </mesh>
      ))}

      {/* Facade wall (front face with bays) */}
      <mesh position={[0, 1.1, 1.71]}>
        <planeGeometry args={[5.2, 2.3]} />
        <meshStandardMaterial color="#e2e2e2" metalness={0.35} roughness={0.45} />
      </mesh>

      {/* Loading bays — framed, recessed, with headers */}
      {bays.map((x) => (
        <group key={x} position={[x, 0.55, 1.71]}>
          {/* frame */}
          <mesh position={[0, 0, 0.002]}>
            <planeGeometry args={[0.78, 1.12]} />
            <meshStandardMaterial color="#8c8c8c" metalness={0.75} roughness={0.35} />
          </mesh>
          {/* dark dock */}
          <mesh position={[0, 0.02, 0.004]}>
            <planeGeometry args={[0.66, 0.96]} />
            <meshStandardMaterial color="#141414" roughness={0.85} />
          </mesh>
          {/* door splice line */}
          <mesh position={[0, 0.02, 0.006]}>
            <planeGeometry args={[0.6, 0.02]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          {/* header */}
          <mesh position={[0, 0.6, 0.004]}>
            <planeGeometry args={[0.82, 0.07]} />
            <meshStandardMaterial color="#7a7a7a" metalness={0.65} roughness={0.45} />
          </mesh>
          {/* dock light dots */}
          {[-0.25, 0.25].map((l) => (
            <mesh key={l} position={[l, 0.66, 0.006]}>
              <planeGeometry args={[0.05, 0.045]} />
              <meshStandardMaterial color="#fff8e0" emissive="#ffe9a8" emissiveIntensity={1.25} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Stripe bands along facade */}
      <mesh position={[0, 2.05, 1.72]}>
        <boxGeometry args={[5.35, 0.14, 0.02]} />
        <meshStandardMaterial color="#a9a9a9" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.35, 1.72]}>
        <boxGeometry args={[5.35, 0.08, 0.02]} />
        <meshStandardMaterial color="#9a9a9a" metalness={0.55} roughness={0.4} />
      </mesh>

      {/* Brand sign */}
      <mesh position={[0, 1.62, 1.725]}>
        <boxGeometry args={[2.4, 0.42, 0.05]} />
        <meshStandardMaterial color="#0d0d0d" emissive="#ffffff" emissiveIntensity={0.18} roughness={0.25} metalness={0.5} />
      </mesh>

      {/* Antenna */}
      <mesh position={[2.4, 3.55, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.4, 12]} />
        <meshStandardMaterial color="#cfcfcf" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Antenna tip */}
      <mesh position={[2.4, 4.3, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#e03939" emissive="#ff4040" emissiveIntensity={0.9} />
      </mesh>

      {/* Base shadow plate */}
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6.5, 4.7]} />
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
  const wheelRefs = useRef<(THREE.Group | null)[]>([]);
  const lastT = useRef(0);

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

    // Spin wheels based on travel delta
    const delta = Math.max(0, t - lastT.current);
    lastT.current = t;
    wheelRefs.current.forEach((w) => {
      if (w) w.rotation.x += delta * 24;
    });
  });

  const wheelPos = [
    [-0.45, 0.18, 0.9], // Front left
    [0.45, 0.18, 0.9], // Front right
    [-0.45, 0.18, -0.6], // Rear left
    [0.45, 0.18, -0.6], // Rear right
    [-0.45, 0.18, -0.95], // Rear-rear left
    [0.45, 0.18, -0.95], // Rear-rear right
  ];

  return (
    <group ref={group}>
      {/* Chassis/Frame */}
      <mesh position={[0, 0.41, 0.1]}>
        <boxGeometry args={[0.8, 0.1, 2.1]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.5} />
      </mesh>

      {/* Fuel tank under chassis */}
      <mesh position={[0.42, 0.28, 0.45]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.6, 20]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Cargo box */}
      <RoundedBox args={[0.95, 1.25, 1.5]} radius={0.05} smoothness={6} castShadow position={[0, 1.1, -0.4]}>
        <meshStandardMaterial color="#f5f5f5" roughness={0.35} metalness={0.2} />
      </RoundedBox>

      {/* Cargo panel seams */}
      <mesh position={[0, 1.1, -1.155]}>
        <boxGeometry args={[0.96, 1.26, 0.02]} />
        <meshStandardMaterial color="#e2e2e2" metalness={0.3} roughness={0.4} />
      </mesh>
      {[0, 0.42, -0.42].map((z) => (
        <mesh key={z} position={[0, 0.5, z - 0.4]}>
          <boxGeometry args={[0.97, 0.03, 0.74]} />
          <meshStandardMaterial color="#cfcfcf" metalness={0.4} roughness={0.45} />
        </mesh>
      ))}

      {/* Logo Right */}
      <mesh position={[0.485, 1.08, -0.4]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.68, 0.68]} />
        <meshStandardMaterial map={logoTexture} transparent alphaTest={0.05} />
      </mesh>

      {/* Logo Left */}
      <mesh position={[-0.485, 1.08, -0.4]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.68, 0.68]} />
        <meshStandardMaterial map={logoTexture} transparent alphaTest={0.05} />
      </mesh>

      {/* Fender skirts over rear wheels */}
      {[-0.46, 0.46].map((x) => (
        <mesh key={x} position={[x, 0.38, -0.775]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.24, 0.12, 16, 1, true, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}

      {/* Cab */}
      <RoundedBox args={[0.95, 0.85, 0.75]} radius={0.06} smoothness={6} castShadow position={[0, 0.9, 0.68]}>
        <meshStandardMaterial color="#ffc107" roughness={0.35} metalness={0.6} />
      </RoundedBox>

      {/* Roof fairing */}
      <RoundedBox args={[0.95, 0.12, 0.6]} radius={0.04} smoothness={6} position={[0, 1.34, 0.55]}>
        <meshStandardMaterial color="#ffca28" roughness={0.35} metalness={0.6} />
      </RoundedBox>

      {/* Nose/Engine */}
      <RoundedBox args={[0.85, 0.5, 0.4]} radius={0.05} smoothness={6} castShadow position={[0, 0.75, 1.15]}>
        <meshStandardMaterial color="#ffc107" roughness={0.35} metalness={0.6} />
      </RoundedBox>

      {/* Windshield */}
      <mesh position={[0, 1.06, 1.05]} rotation={[-0.12, 0, 0]}>
        <planeGeometry args={[0.72, 0.4]} />
        <meshStandardMaterial color="#050505" emissive="#ffffff" emissiveIntensity={0.1} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Cab side windows */}
      {[-0.43, 0.43].map((x) => (
        <mesh key={x} position={[x, 1.03, 0.72]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.45, 0.32]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.12} />
        </mesh>
      ))}

      {/* Door handles */}
      {[-0.43, 0.43].map((x) => (
        <mesh key={`h${x}`} position={[x, 0.78, 0.72]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.16, 0.04]} />
          <meshStandardMaterial color="#b8860b" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}

      {/* Side Mirrors */}
      <mesh position={[0.485, 0.98, 0.9]}>
        <boxGeometry args={[0.09, 0.2, 0.07]} />
        <meshStandardMaterial color="#111" roughness={0.4} />
      </mesh>
      <mesh position={[-0.485, 0.98, 0.9]}>
        <boxGeometry args={[0.09, 0.2, 0.07]} />
        <meshStandardMaterial color="#111" roughness={0.4} />
      </mesh>
      <mesh position={[0.49, 1.08, 0.9]}>
        <boxGeometry args={[0.03, 0.08, 0.07]} />
        <meshStandardMaterial color="#333" metalness={0.7} />
      </mesh>
      <mesh position={[-0.49, 1.08, 0.9]}>
        <boxGeometry args={[0.03, 0.08, 0.07]} />
        <meshStandardMaterial color="#333" metalness={0.7} />
      </mesh>

      {/* Grille */}
      <mesh position={[0, 0.75, 1.355]}>
        <planeGeometry args={[0.55, 0.32]} />
        <meshStandardMaterial color="#111" metalness={0.8} />
      </mesh>
      {/* Grille slats */}
      {[0.68, 0.75, 0.82].map((y) => (
        <mesh key={y} position={[0, y, 1.358]}>
          <planeGeometry args={[0.5, 0.03]} />
          <meshStandardMaterial color="#2b2b2b" metalness={0.8} />
        </mesh>
      ))}

      {/* Front Bumper */}
      <RoundedBox args={[0.94, 0.16, 0.15]} radius={0.03} smoothness={4} position={[0, 0.52, 1.39]}>
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.4} />
      </RoundedBox>

      {/* Mud flaps */}
      {[-0.45, 0.45].map((x) => (
        <mesh key={`f${x}`} position={[x, 0.5, -1.21]}>
          <boxGeometry args={[0.09, 0.34, 0.02]} />
          <meshStandardMaterial color="#0d0d0d" roughness={0.9} />
        </mesh>
      ))}

      {/* Exhaust stacks */}
      {[0.46, -0.46].map((x) => (
        <mesh key={`e${x}`} position={[x, 1.24, 0.35]}>
          <cylinderGeometry args={[0.045, 0.045, 0.9, 12]} />
          <meshStandardMaterial color="#888" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Headlights */}
      {[0.33, -0.33].map((x) => (
        <mesh key={`hl${x}`} position={[x, 0.72, 1.36]}>
          <boxGeometry args={[0.16, 0.11, 0.02]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2.5} />
        </mesh>
      ))}
      {/* Headlight glow */}
      <pointLight position={[0, 0.66, 1.6]} intensity={14} distance={22} color="#ffffff" />

      {/* Taillights */}
      {[0.33, -0.33].map((x) => (
        <mesh key={`tl${x}`} position={[x, 0.56, -1.165]}>
          <boxGeometry args={[0.16, 0.09, 0.02]} />
          <meshStandardMaterial color="#f00" emissive="#f00" emissiveIntensity={1.2} />
        </mesh>
      ))}

      {/* Wheels — spin on movement */}
      {wheelPos.map((p, i) => (
        <group
          key={i}
          position={p as [number, number, number]}
          ref={(el) => {
            wheelRefs.current[i] = el;
          }}
        >
          {/* Tire */}
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.13, 0.065, 20, 40]} />
            <meshStandardMaterial color="#0e0e0e" roughness={0.92} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.11, 24]} />
            <meshStandardMaterial color="#c9c9c9" metalness={0.92} roughness={0.18} />
          </mesh>
          {/* Hub */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.13, 16]} />
            <meshStandardMaterial color="#fff" metalness={0.85} roughness={0.2} />
          </mesh>
        </group>
      ))}
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

      <ambientLight intensity={0.35} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
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
      dpr={[1, 2]}
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
