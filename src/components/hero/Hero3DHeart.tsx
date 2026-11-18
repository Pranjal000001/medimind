import React, { useRef, useMemo, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

class WebGLErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center rounded-2xl border border-white/10 bg-midnight-900/60">
          <p className="text-xs font-medium text-slate-400">
            Interactive 3D Heart Installation
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Smooth organic anatomical heart surface sculpting
function deformToHeart(v: THREE.Vector3): THREE.Vector3 {
  const nx = v.x;
  const ny = v.y;
  const nz = v.z;

  const absX = Math.abs(nx);
  const upper = THREE.MathUtils.smoothstep(ny, -0.05, 0.92);
  const lobeLift = upper * Math.sin(absX * Math.PI * 0.92) * 0.34;
  const cleft = upper * Math.exp(-absX * absX * 7.2) * 0.28;

  const lowerT = THREE.MathUtils.clamp(-ny, 0, 1);
  const taper =
    ny >= 0
      ? 1.0 + Math.sin(ny * Math.PI * 0.85) * 0.16
      : THREE.MathUtils.lerp(1.0, 0.22, Math.pow(lowerT, 1.32));

  const apexX = Math.pow(lowerT, 1.55) * 0.28;
  const apexZ = Math.pow(lowerT, 1.4) * 0.1;

  const groove = nx - (0.04 + lowerT * 0.16);
  const frontMask = THREE.MathUtils.smoothstep(nz, 0.05, 0.85);
  const sulcus = frontMask * Math.exp(-groove * groove * 24) * 0.065;

  const fx = nx * 1.18 * taper + apexX;
  const fy = ny * 1.24 + lobeLift - cleft - Math.pow(lowerT, 1.6) * 0.22;
  const fz = nz * 0.86 * taper + apexZ - sulcus;

  return new THREE.Vector3(fx, fy, fz);
}

function createHeartGeometry(detail = 72): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(1, detail, detail);
  const pos = geo.attributes.position;
  const tmp = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    tmp.fromBufferAttribute(pos, i);
    const d = deformToHeart(tmp);
    pos.setXYZ(i, d.x, d.y, d.z);
  }
  geo.computeVertexNormals();
  return geo;
}

const fresnelVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vLocalPos;

  void main() {
    vLocalPos = position;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fresnelFragmentShader = `
  uniform vec3 uColorCore;
  uniform vec3 uColorRoyal;
  uniform vec3 uColorCyan;
  uniform vec3 uColorMint;
  uniform float uPulse;

  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vLocalPos;

  void main() {
    float ndotv = clamp(dot(normalize(vNormal), normalize(vViewDir)), 0.0, 1.0);
    float fresnel = pow(1.0 - ndotv, 2.2);

    float h = smoothstep(-1.15, 1.25, vLocalPos.y);
    vec3 rimCol = mix(uColorRoyal, mix(uColorCyan, uColorMint, 0.52), h);

    vec3 color = mix(uColorCore, rimCol, fresnel);
    color += rimCol * fresnel * (0.55 + uPulse * 0.45);

    float alpha = clamp(0.16 + fresnel * 0.76 + uPulse * 0.08, 0.0, 0.94);
    gl_FragColor = vec4(color, alpha);
  }
`;

// Surrounding AI Neural Network Constellation
const NeuralNetworkHalo: React.FC<{ beatRef: React.MutableRefObject<number> }> = ({
  beatRef,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);

  const { nodeGeo, lineGeo } = useMemo(() => {
    const count = 42;
    const coords: THREE.Vector3[] = [];
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cMint = new THREE.Color('#9DE8C8');
    const cBlue = new THREE.Color('#5C8DF8');
    const cCyan = new THREE.Color('#38BDF8');

    const golden = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / golden;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const r = 1.65 + (i % 4) * 0.14;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) * 1.06;
      const z = r * Math.sin(phi) * Math.sin(theta);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      coords.push(new THREE.Vector3(x, y, z));

      const chosen = i % 3 === 0 ? cMint : i % 3 === 1 ? cCyan : cBlue;
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    const nGeo = new THREE.BufferGeometry();
    nGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    nGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const linePts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const d = coords[i].distanceTo(coords[j]);
        if (d < 1.18) {
          linePts.push(coords[i], coords[j]);
        }
      }
    }
    const lGeo = new THREE.BufferGeometry().setFromPoints(linePts);

    return { nodeGeo: nGeo, lineGeo: lGeo };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = -t * 0.08;
      groupRef.current.rotation.z = Math.sin(t * 0.25) * 0.06;
    }
    if (lineMatRef.current) {
      lineMatRef.current.opacity = 0.18 + beatRef.current * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={nodeGeo}>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          ref={lineMatRef}
          color="#5C8DF8"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

// Sparse atmospheric floating light particles
const AtmosphericParticles: React.FC = () => {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const count = 110;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4.2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.025;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.028}
        color="#9DE8C8"
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const SignatureHeartInstallation: React.FC<{
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}> = ({ mouseRef }) => {
  const rootRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const pulseParticlesRef = useRef<THREE.InstancedMesh>(null);
  const beatRef = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const heartGeo = useMemo(() => createHeartGeometry(72), []);

  const glassMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColorCore: { value: new THREE.Color('#0E234A') },
          uColorRoyal: { value: new THREE.Color('#356DF3') },
          uColorCyan: { value: new THREE.Color('#38BDF8') },
          uColorMint: { value: new THREE.Color('#9DE8C8') },
          uPulse: { value: 0 },
        },
        vertexShader: fresnelVertexShader,
        fragmentShader: fresnelFragmentShader,
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  const { surfacePoints, vesselGeometries, signalCurves } = useMemo(() => {
    const count = 1950;
    const pts = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cRoyal = new THREE.Color('#5C8DF8');
    const cCyan = new THREE.Color('#38BDF8');
    const cMint = new THREE.Color('#9DE8C8');
    const tmp = new THREE.Color();

    const golden = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / golden;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const d = deformToHeart(
        new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.cos(phi),
          Math.sin(phi) * Math.sin(theta)
        )
      ).multiplyScalar(1.015);

      pts[i * 3] = d.x;
      pts[i * 3 + 1] = d.y;
      pts[i * 3 + 2] = d.z;

      const h = THREE.MathUtils.clamp((d.y + 1.1) / 2.3, 0, 1);
      tmp.lerpColors(cRoyal, h > 0.55 ? cMint : cCyan, h * 0.85);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }

    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    ptGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const curveSpecs = [
      {
        pts: [
          new THREE.Vector3(-0.08, 0.65, 0.1),
          new THREE.Vector3(-0.14, 1.32, 0.05),
          new THREE.Vector3(0.08, 1.66, -0.06),
          new THREE.Vector3(0.46, 1.48, -0.26),
          new THREE.Vector3(0.54, 0.75, -0.45),
        ],
        radius: 0.022,
        color: '#5C8DF8',
      },
      {
        pts: [
          new THREE.Vector3(0.04, 0.72, 0.72),
          new THREE.Vector3(0.12, 0.22, 0.9),
          new THREE.Vector3(0.22, -0.35, 0.8),
          new THREE.Vector3(0.32, -0.92, 0.52),
          new THREE.Vector3(0.36, -1.24, 0.24),
        ],
        radius: 0.015,
        color: '#9DE8C8',
      },
      {
        pts: [
          new THREE.Vector3(0.08, 0.66, 0.7),
          new THREE.Vector3(0.68, 0.45, 0.64),
          new THREE.Vector3(1.06, 0.08, 0.25),
          new THREE.Vector3(0.95, -0.42, -0.25),
        ],
        radius: 0.013,
        color: '#38BDF8',
      },
      {
        pts: [
          new THREE.Vector3(-0.14, 0.58, 0.74),
          new THREE.Vector3(-0.68, 0.28, 0.74),
          new THREE.Vector3(-0.92, -0.22, 0.48),
          new THREE.Vector3(-0.62, -0.78, 0.36),
          new THREE.Vector3(-0.14, -1.04, 0.46),
        ],
        radius: 0.014,
        color: '#9DE8C8',
      },
      {
        pts: [
          new THREE.Vector3(-1.35, -0.35, 0.35),
          new THREE.Vector3(-0.95, 0.85, 0.72),
          new THREE.Vector3(0.25, 1.48, 0.42),
          new THREE.Vector3(1.28, 0.52, -0.22),
          new THREE.Vector3(1.12, -0.72, -0.45),
        ],
        radius: 0.008,
        color: '#93C5FD',
      },
    ];

    const builtCurves = curveSpecs.map((s) => ({
      curve: new THREE.CatmullRomCurve3(s.pts, false, 'catmullrom', 0.5),
      radius: s.radius,
      color: s.color,
    }));

    return {
      surfacePoints: ptGeo,
      vesselGeometries: builtCurves.map((c) => ({
        geo: new THREE.TubeGeometry(c.curve, 64, c.radius, 12, false),
        color: c.color,
      })),
      signalCurves: builtCurves.map((c) => c.curve),
    };
  }, []);

  const signalSeeds = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        curveIdx: i % 5,
        offset: (i * 0.21) % 1,
        speed: 0.14 + (i % 4) * 0.032,
        scale: 0.025 + (i % 3) * 0.007,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    const cycle = (t * 1.07) % 1;
    let beat = 0;
    if (cycle < 0.13) {
      beat = Math.sin((cycle / 0.13) * Math.PI);
    } else if (cycle >= 0.2 && cycle < 0.34) {
      beat = Math.sin(((cycle - 0.2) / 0.14) * Math.PI) * 0.55;
    }

    beatRef.current = beat;
    glassMaterial.uniforms.uPulse.value = beat;

    if (pulseRef.current) {
      const s = 1 + beat * 0.036;
      pulseRef.current.scale.set(s, 1 + beat * 0.024, s);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.12;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.09;
    }

    if (pulseParticlesRef.current) {
      signalSeeds.forEach((seed, i) => {
        const u = (t * seed.speed + seed.offset) % 1;
        const pos = signalCurves[seed.curveIdx].getPointAt(u);
        dummy.position.copy(pos);
        dummy.scale.setScalar(seed.scale * (1 + beat * 0.4));
        dummy.updateMatrix();
        pulseParticlesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      pulseParticlesRef.current.instanceMatrix.needsUpdate = true;
    }

    if (rootRef.current) {
      const targetRotY = -0.22 + t * 0.14 + mouseRef.current.x * 0.48;
      const targetRotX = 0.06 + mouseRef.current.y * 0.26;
      rootRef.current.rotation.y = THREE.MathUtils.lerp(
        rootRef.current.rotation.y,
        targetRotY,
        0.045
      );
      rootRef.current.rotation.x = THREE.MathUtils.lerp(
        rootRef.current.rotation.x,
        targetRotX,
        0.045
      );
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.22}>
      <group ref={rootRef} position={[0, -0.1, 0]} scale={0.94}>
        <group ref={pulseRef}>
          {/* Sculptural Glass Fresnel Heart */}
          <mesh geometry={heartGeo} material={glassMaterial} />

          {/* Subtle Crystal Clearcoat Inner Core */}
          <mesh geometry={heartGeo} scale={0.78}>
            <meshPhysicalMaterial
              color="#10254D"
              roughness={0.2}
              metalness={0.1}
              clearcoat={1}
              transparent
              opacity={0.52}
            />
          </mesh>

          {/* Bio-Scan Surface Point Lattice */}
          <points geometry={surfacePoints}>
            <pointsMaterial
              size={0.025}
              vertexColors
              transparent
              opacity={0.82}
              sizeAttenuation
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </points>

          {/* Vascular & Aortic Glass Conduits */}
          {vesselGeometries.map((v, idx) => (
            <mesh key={idx} geometry={v.geo}>
              <meshBasicMaterial
                color={v.color}
                transparent
                opacity={idx === 0 ? 0.56 : 0.44}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          ))}

          {/* Flowing Luminous Telemetry Pulses */}
          <instancedMesh
            ref={pulseParticlesRef}
            args={[undefined, undefined, signalSeeds.length]}
          >
            <sphereGeometry args={[1, 12, 12]} />
            <meshBasicMaterial
              color="#C8F7E3"
              transparent
              opacity={0.96}
              blending={THREE.AdditiveBlending}
            />
          </instancedMesh>
        </group>

        {/* Surrounding Animated AI Neural Constellation */}
        <NeuralNetworkHalo beatRef={beatRef} />

        {/* Subtle Holographic Orbital Rings */}
        <mesh ref={ring1Ref} rotation={[Math.PI * 0.42, 0.25, 0.1]}>
          <torusGeometry args={[2.02, 0.006, 16, 128]} />
          <meshBasicMaterial color="#356DF3" transparent opacity={0.28} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[-Math.PI * 0.34, -0.35, 0.22]}>
          <torusGeometry args={[2.24, 0.005, 16, 128]} />
          <meshBasicMaterial color="#9DE8C8" transparent opacity={0.22} />
        </mesh>
      </group>
    </Float>
  );
};

export const Hero3DHeart: React.FC = () => {
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      className="relative w-full h-[390px] sm:h-[470px] lg:h-[540px] select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <WebGLErrorBoundary>
        <Canvas
          camera={{ position: [0, 0.08, 5.55], fov: 40 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.45} color="#EAF3FF" />
          <directionalLight position={[4, 5, 5]} intensity={1.4} color="#FFFFFF" />
          <pointLight position={[-4, 2, 2]} intensity={1.6} color="#356DF3" distance={10} />
          <pointLight position={[3, -2, 3]} intensity={1.3} color="#9DE8C8" distance={9} />

          <Environment resolution={128} frames={1}>
            <Lightformer
              form="rect"
              intensity={2.2}
              position={[0, 5, 3]}
              scale={[8, 3, 1]}
              color="#EAF3FF"
            />
            <Lightformer
              form="circle"
              intensity={1.8}
              position={[4, -2, 2]}
              scale={4}
              color="#9DE8C8"
            />
          </Environment>

          <SignatureHeartInstallation mouseRef={mouseRef} />
          <AtmosphericParticles />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};

export default Hero3DHeart;
