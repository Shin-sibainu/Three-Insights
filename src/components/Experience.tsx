import { useEffect, useState } from "react";
import MainShaderObject from "./MainShaderObject";
import { Vector2, Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

const Experience = () => {
  const [mousePosition, setMousePosition] = useState(new Vector2(0, 0));
  const { camera } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // ビューポートの中心を(0,0)とする座標系に変換
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      setMousePosition(new Vector2(x, y));
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const spring = useSpring({
    from: { scale: [0, 0, 0], opacity: 0 },
    to: { scale: [1, 1, 1], opacity: 1 },
    config: { mass: 3, tension: 600, friction: 350 },

    delay: 700,
  });

  return (
    <>
      {/* background color */}
      <color attach="background" args={["#000000"]} />

      {/* light */}
      <ambientLight />
      <pointLight />

      {/* shader */}
      <animated.group scale={spring.scale as unknown as Vector3}>
        <MainShaderObject
          position={[0.62, 0, 0]}
          mousePosition={mousePosition}
          cameraPosition={camera.position}
        />
      </animated.group>
    </>
  );
};

export default Experience;
