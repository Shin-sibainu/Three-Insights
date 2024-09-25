import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import TextOverlay from "./components/interfaces/TextOverlay";

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 1.9], fov: 45 }}>
        <Experience />
        <TextOverlay text="Three InSights" />
      </Canvas>
    </>
  );
}

export default App;
