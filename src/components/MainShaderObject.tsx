import { shaderMaterial } from "@react-three/drei";

import mainShaderVertex from "../shaders/mainShader.vertex.glsl?raw";
import mainShaderFragment from "../shaders/mainShader.fragment.glsl?raw";
import { extend, useFrame } from "@react-three/fiber";
import { Color, SphereGeometry, Vector2, Vector3 } from "three";
import { useMemo, useRef } from "react";
import { MainShaderMaterialImpl } from "../types/custom-types";

const MainShaderMaterial = shaderMaterial(
  {
    uColor: new Color("pink"),
    uTime: 0,
    uSize: 0.02,
    uMouse: new Vector2(0, 0),
    uObjectPosition: new Vector3(0, 0, 0),
  },
  mainShaderVertex,
  mainShaderFragment
);

extend({ MainShaderMaterial });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MainShaderObject = ({ position, mousePosition, cameraPosition }: any) => {
  const materialRef = useRef<MainShaderMaterialImpl>(null);

  const points = useMemo(() => {
    const sphereGeo = new SphereGeometry(0.5, 32, 32);
    const positions = sphereGeo.attributes.position.array;
    const pointsArray = [];
    for (let i = 0; i < positions.length; i += 3) {
      pointsArray.push(
        new Vector3(positions[i], positions[i + 1], positions[i + 2])
      );
    }
    return pointsArray;
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uMouse = mousePosition;
      materialRef.current.uObjectPosition = position;
      materialRef.current.uCameraPosition = cameraPosition;
    }
  });

  return (
    <points position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <mainShaderMaterial ref={materialRef} transparent depthWrite={false} />
    </points>
  );
};

export default MainShaderObject;
