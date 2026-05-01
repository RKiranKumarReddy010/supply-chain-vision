import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const rawSocials = [
  { 
    name: "Instagram", url: "https://instagram.com/", color: "#E1306C", 
    svgPath: `<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>`
  },
  { 
    name: "Facebook", url: "https://facebook.com/", color: "#1877F2", 
    svgPath: `<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>`
  },
  { 
    name: "Twitter / X", url: "https://twitter.com/", color: "#1DA1F2", 
    svgPath: `<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>`
  },
  { 
    name: "LinkedIn", url: "https://linkedin.com/", color: "#0A66C2", 
    svgPath: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>`
  },
];

const SOCIALS = rawSocials.map(s => ({
  ...s,
  dataUri: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="-4 -4 32 32" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${s.svgPath}</svg>`)
}));

function TruckMesh() {
  const logoTexture = useLoader(THREE.TextureLoader, "/favicon.ico?v=2");
  logoTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group>
      {/* Chassis/Frame */}
      <mesh position={[0, 0.41, 0.1]}>
        <boxGeometry args={[0.8, 0.1, 2.0]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.5} />
      </mesh>

      {/* Cargo box */}
      <RoundedBox args={[0.9, 1.2, 1.4]} radius={0.04} smoothness={4} castShadow position={[0, 1.06, -0.4]}>
        <meshStandardMaterial color="#f4f4f4" roughness={0.4} metalness={0.15} />
      </RoundedBox>

      {/* Dark Inside to fake hollow */}
      <mesh position={[0, 1.06, -1.101]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.8, 1.1]} />
        <meshBasicMaterial color="#111" />
      </mesh>

      {/* Left Back Door (Swung Open) */}
      <group position={[-0.45, 1.06, -1.1]} rotation={[0, -Math.PI * 0.75, 0]}>
        <mesh position={[0.225, 0, 0]}>
          <boxGeometry args={[0.45, 1.1, 0.05]} />
          <meshStandardMaterial color="#f4f4f4" roughness={0.4} />
        </mesh>
      </group>
      {/* Right Back Door (Swung Open) */}
      <group position={[0.45, 1.06, -1.1]} rotation={[0, Math.PI * 0.75, 0]}>
        <mesh position={[-0.225, 0, 0]}>
          <boxGeometry args={[0.45, 1.1, 0.05]} />
          <meshStandardMaterial color="#f4f4f4" roughness={0.4} />
        </mesh>
      </group>

      {/* Cab */}
      <RoundedBox args={[0.9, 0.8, 0.7]} radius={0.05} smoothness={4} castShadow position={[0, 0.86, 0.65]}>
        <meshStandardMaterial color="#ffc107" roughness={0.4} metalness={0.6} />
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

      {/* Nose/Engine */}
      <RoundedBox args={[0.9, 0.5, 0.4]} radius={0.04} smoothness={4} castShadow position={[0, 0.71, 1.15]}>
        <meshStandardMaterial color="#ffc107" roughness={0.4} metalness={0.6} />
      </RoundedBox>

      {/* Windshield */}
      <mesh position={[0, 1.02, 1.01]} rotation={[-0.1, 0, 0]}>
        <planeGeometry args={[0.8, 0.38]} />
        <meshStandardMaterial color="#050505" emissive="#ffffff" emissiveIntensity={0.1} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Side Glass */}
      <mesh position={[0.455, 1.06, 0.75]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshStandardMaterial color="#050505" emissive="#ffffff" emissiveIntensity={0.1} roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[-0.455, 1.06, 0.75]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshStandardMaterial color="#050505" emissive="#ffffff" emissiveIntensity={0.1} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Side Mirrors */}
      <mesh position={[0.48, 1.0, 0.9]}>
        <boxGeometry args={[0.08, 0.18, 0.06]} />
        <meshStandardMaterial color="#111" roughness={0.4} />
      </mesh>
      <mesh position={[-0.48, 1.0, 0.9]}>
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

      {/* Exhaust Pipe (Bottom Rear) */}
      <mesh position={[0.3, 0.3, -1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3]} />
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

      {/* Wheels */}
      {[
        [-0.45, 0.18, 0.9],
        [0.45, 0.18, 0.9],
        [-0.45, 0.18, -0.6],
        [0.45, 0.18, -0.6],
        [-0.45, 0.18, -0.9],
        [0.45, 0.18, -0.9],
      ].map((p, i) => (
        <group key={i} position={p as [number, number, number]} rotation={[0, Math.PI / 2, 0]}>
          <mesh>
            <torusGeometry args={[0.12, 0.06, 16, 32]} />
            <meshStandardMaterial color="#0f0f0f" roughness={0.9} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.1, 16]} />
            <meshStandardMaterial color="#b0b0b0" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Smoke({ truckRef }: { truckRef: React.RefObject<THREE.Group> }) {
  const particles = useRef<number[][]>([]);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    if (truckRef.current && Math.random() < 0.4) {
      // Local position of the new bottom exhaust pipe
      const ex = new THREE.Vector3(0.3, 0.3, -1.2);
      ex.applyMatrix4(truckRef.current.matrixWorld);
      
      particles.current.push([ex.x, ex.y, ex.z, 0, 1.0 + Math.random() * 1.5, 0.1 + Math.random() * 0.15]);
    }

    if (!meshRef.current) return;
    
    let i = 0;
    while (i < particles.current.length) {
      let p = particles.current[i];
      p[3] += delta; 
      if (p[3] >= p[4]) {
        particles.current.splice(i, 1);
      } else {
        p[1] -= delta * 0.3; // drift downwards
        p[0] -= delta * 1.5; // wind drift backwards (world -X)
        p[2] += delta * (Math.random() - 0.5) * 0.5; // spread
        
        const progress = p[3] / p[4];
        const scale = p[5] * (1 + progress * 4);
        
        dummy.position.set(p[0], p[1], p[2]);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        i++;
      }
    }
    // clear rest
    for (let j = i; j < 60; j++) {
      dummy.scale.setScalar(0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(j, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 60]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#aaaaaa" transparent opacity={0.25} depthWrite={false} />
    </instancedMesh>
  );
}

function DroppingBox({ truckRef, social, active }: { truckRef: React.RefObject<THREE.Group>, social: any, active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const vy = useRef(0);
  const isDropped = useRef(false);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16;
    if (ctx) {
      const img = new Image();
      img.src = social.dataUri;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        tex.needsUpdate = true;
      };
    }
    return tex;
  }, [social.dataUri]);

  useFrame((_, delta) => {
    if (!active) {
      isDropped.current = false;
      if (ref.current) ref.current.visible = false;
      return;
    }
    
    if (ref.current) ref.current.visible = true;

    if (!isDropped.current) {
      isDropped.current = true;
      // Start slightly behind the truck
      if (truckRef.current) {
        const backPos = new THREE.Vector3(0, 1.2, -1.2);
        backPos.applyMatrix4(truckRef.current.matrixWorld);
        ref.current?.position.copy(backPos);
        vy.current = 1.5; // Toss slightly up
      }
    }

    if (!ref.current) return;

    // Physics
    vy.current -= 12.0 * delta; // Gravity
    ref.current.position.y += vy.current * delta;

    if (ref.current.position.y <= 0.25) { // Floor
      ref.current.position.y = 0.25;
      vy.current = -vy.current * 0.6; // Bounce restitution
      
      // Stop completely if very slow
      if (Math.abs(vy.current) < 0.2) {
        vy.current = 0;
      }
    }

    // Spin
    if (ref.current.position.y > 0.26) {
      ref.current.rotation.x -= delta * 2;
      ref.current.rotation.z += delta * 1;
    } else {
      // Flatten out
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0, 0.1);
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, 0, 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, 0, 0.1);
    }
  });

  return (
    <group ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        window.open(social.url, '_blank');
      }}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
      visible={false}
    >
      <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.05} smoothness={4} castShadow>
        <meshStandardMaterial color={social.color} roughness={0.3} metalness={0.2} />
      </RoundedBox>
      <mesh position={[0, 0, 0.251]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshBasicMaterial map={texture} transparent opacity={1} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, -0.251]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshBasicMaterial map={texture} transparent opacity={1} depthWrite={false} />
      </mesh>
    </group>
  );
}

function SceneInner({ progress }: { progress: number }) {
  const { viewport, size } = useThree();
  
  // Dynamically calculate travel distance based on actual screen width in 3D units.
  // viewport.width is the visible width. We add 2.0 (approx truck length) to ensure it starts/ends fully off-screen.
  const maxTravel = (viewport.width / 2) + 2.0;
  const x = THREE.MathUtils.lerp(-maxTravel, maxTravel, progress);
  
  const truckRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (truckRef.current) {
      truckRef.current.position.x = x;
      truckRef.current.rotation.y = Math.PI / 2;
      
      // Suspension bobble
      const speed = 25;
      truckRef.current.position.y = Math.abs(Math.sin(progress * speed * Math.PI)) * 0.05;
    }
  });

  useFrame(({ camera }) => {
    // Zoom out on mobile screens so the truck and boxes have room to fit
    const camZ = size.width < 768 ? 16 : 10;
    camera.position.set(0, 3, camZ);
    camera.lookAt(0, 1.0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 8, 6]} intensity={1.3} castShadow />
      <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#a8c8ff" />
      <pointLight position={[0, 3, 5]} intensity={0.5} color="#ffe3cc" />

      {/* Road */}
      <group position={[0, 0.01, 0]}>
        {/* Shadow plane / ground base */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[60, 12]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.35} />
        </mesh>
        {/* Tarmac */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
          <planeGeometry args={[60, 3.5]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        {/* Dashed line */}
        {Array.from({ length: 30 }).map((_, i) => (
          <mesh key={i} position={[-29 + i * 2, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.0, 0.1]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>

      <group ref={truckRef}>
        <TruckMesh />
      </group>
      
      <Smoke truckRef={truckRef} />

      {SOCIALS.map((social, i) => {
        // Drop boxes uniformly across the scrolling range, starting a bit later so first box is well within view
        const threshold = 0.25 + i * 0.18; 
        return (
          <DroppingBox 
            key={social.name} 
            truckRef={truckRef} 
            social={social} 
            active={progress > threshold} 
          />
        );
      })}
    </>
  );
}

// Keep the name PhoneInHand so the parent Connect.tsx doesn't break
export default function PhoneInHand({ progress }: { progress: number }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 3, 10], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <Suspense fallback={null}>
        <SceneInner progress={progress} />
      </Suspense>
    </Canvas>
  );
}
