import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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
  useFrame(() => {
    if (!group.current) return;
    const tt = Math.max(0.001, Math.min(0.999, t));
    const pos = curve.getPointAt(tt);
    const tan = curve.getTangentAt(tt);
    group.current.position.set(pos.x, pos.y + 0.35, pos.z);
    const angle = Math.atan2(tan.x, tan.z);
    group.current.rotation.y = angle;
  });
  return (
    <group ref={group}>
      {/* Cargo box */}
      <mesh castShadow position={[0, 0.55, -0.35]}>
        <boxGeometry args={[0.9, 0.9, 1.4]} />
        <meshStandardMaterial color="#f4f4f4" roughness={0.4} metalness={0.15} />
      </mesh>
      {/* Cab */}
      <mesh castShadow position={[0, 0.45, 0.7]}>
        <boxGeometry args={[0.9, 0.7, 0.7]} />
        <meshStandardMaterial color="#cfcfcf" roughness={0.45} />
      </mesh>
      {/* Windshield */}
      <mesh position={[0, 0.6, 1.06]}>
        <planeGeometry args={[0.7, 0.35]} />
        <meshStandardMaterial color="#0a0a0a" emissive="#ffffff" emissiveIntensity={0.08} />
      </mesh>
      {/* Wheels */}
      {[
        [-0.45, 0.15, 0.6],
        [0.45, 0.15, 0.6],
        [-0.45, 0.15, -0.45],
        [0.45, 0.15, -0.45],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.12, 18]} />
          <meshStandardMaterial color="#1f1f1f" roughness={0.85} />
        </mesh>
      ))}
      {/* Headlight glow */}
      <pointLight position={[0, 0.5, 1.2]} intensity={0.6} distance={3} color="#ffffff" />
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
      <SceneInner progress={progress} />
    </Canvas>
  );
}
