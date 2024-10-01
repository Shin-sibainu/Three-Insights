import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const StarField = ({ count = 2500 }) => {
  const mesh = useRef<THREE.Points>(null);
  const light = useRef<THREE.PointLight>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      scales[i] = Math.random();
    }

    return { positions, scales };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScale: { value: 0.17 },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;

    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(clock.elapsedTime / 10) * 0.03;
      mesh.current.rotation.y = Math.sin(clock.elapsedTime / 15) * 0.02;
    }

    if (light.current) {
      light.current.position.x = Math.sin(clock.elapsedTime / 2) * 3;
      light.current.position.y = Math.cos(clock.elapsedTime / 2) * 3;
    }

    uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <group>
      <pointLight ref={light} distance={20} intensity={20} color="white" />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.positions.length / 3}
            array={particlesPosition.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aScale"
            count={particlesPosition.scales.length}
            array={particlesPosition.scales}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={`
            varying float vScale;
            void main() {
              float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
              float strength = 0.05 / distanceToCenter - 0.1;
              gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
            }
          `}
          vertexShader={`
            uniform float uTime;
            uniform float uScale;
            attribute float aScale;
            varying float vScale;
            void main() {
              vec4 modelPosition = modelMatrix * vec4(position, 1.0);
              modelPosition.y += sin(uTime * 2.0 + modelPosition.x * 10.0) * aScale * 0.05;
              modelPosition.x += cos(uTime * 2.0 + modelPosition.z * 10.0) * aScale * 0.05;
              vec4 viewPosition = viewMatrix * modelPosition;
              vec4 projectedPosition = projectionMatrix * viewPosition;
              gl_Position = projectedPosition;
              gl_PointSize = uScale * aScale * (300.0 / -viewPosition.z);
              vScale = aScale;
            }
          `}
          uniforms={uniforms}
        />
      </points>
    </group>
  );
};

export default StarField;
