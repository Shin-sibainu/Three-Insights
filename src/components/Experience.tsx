import { useEffect, useRef, useState } from "react";
import MainShaderObject from "./MainShaderObject";
import { Vector2, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import StarField from "./StarField";

type ExperienceProps = {
  currentSection: string;
  setCameraPosition: (position: { x: number; y: number; z: number }) => void;
};

const Experience = ({ currentSection, setCameraPosition }: ExperienceProps) => {
  const [mousePosition, setMousePosition] = useState(new Vector2(1000, 0));
  const { camera } = useThree();
  const cameraTargetRef = useRef(new Vector3(0, 0, 1.9));

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

  useEffect(() => {
    switch (currentSection) {
      case "About":
        cameraTargetRef.current.set(-1.32, 0, 1.9);
        break;
      case "Skills":
        cameraTargetRef.current.set(1.32, 0, 1.9);
        break;
      case "Portfolio":
        cameraTargetRef.current.set(0, 1.32, 1.9);
        break;
      case "Contact":
        cameraTargetRef.current.set(0, 0, 1.9);
        break;
      default:
        cameraTargetRef.current.set(0, 0, 1.9);
    }
  }, [currentSection]);

  useFrame(() => {
    camera.position.lerp(cameraTargetRef.current, 0.05);

    setCameraPosition({
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    });
  });

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

      {/* Stars */}
      <StarField />

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
