import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onStartClick: () => void;
}

// Subtle 3D orbital rings & atmospheric particles for the closing Midnight Navy stage
const AmbientCTA3D: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const particleGeo = useMemo(() => {
    const count = 90;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 11;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.07;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={ring1Ref} position={[3.2, 0.2, -1]} rotation={[Math.PI * 0.38, 0.3, 0]}>
        <torusGeometry args={[2.1, 0.012, 16, 120]} />
        <meshBasicMaterial color="#356DF3" transparent opacity={0.34} />
      </mesh>
      <mesh ref={ring2Ref} position={[-3.4, -0.3, -1.5]} rotation={[-Math.PI * 0.32, -0.4, 0.2]}>
        <torusGeometry args={[2.4, 0.01, 16, 120]} />
        <meshBasicMaterial color="#9DE8C8" transparent opacity={0.24} />
      </mesh>
      <points geometry={particleGeo}>
        <pointsMaterial
          size={0.045}
          color="#9DE8C8"
          transparent
          opacity={0.4}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartClick }) => {
  return (
    <section className="relative py-24 lg:py-32 bg-midnight-950 text-white overflow-hidden">
      {/* Subtle 3D Three.js background stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-85"
      >
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <AmbientCTA3D />
        </Canvas>
      </div>

      {/* Atmospheric radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(53, 109, 243, 0.22) 0%, rgba(157, 232, 200, 0.06) 35%, rgba(7, 15, 31, 0) 68%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md text-[12px] font-medium text-mint-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready When You Are</span>
          </div>

          <h2 className="font-display text-[34px] sm:text-[46px] lg:text-[52px] font-extrabold text-white leading-[1.08] tracking-[-0.028em]">
            Your Health Journey Deserves{' '}
            <span className="bg-gradient-to-r from-white via-royal-200 to-mint-300 bg-clip-text text-transparent">
              Something Better.
            </span>
          </h2>

          <p className="text-[16.5px] sm:text-[18px] text-slate-300 leading-[1.68] max-w-2xl mx-auto">
            Bring your everyday healthcare routine into one intelligent, organized
            experience.
          </p>

          <div className="pt-3 flex items-center justify-center">
            <button
              onClick={onStartClick}
              className="btn-premium group px-8 py-4 text-[15.5px] cursor-pointer"
            >
              <span>Get Started with MediMind</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
