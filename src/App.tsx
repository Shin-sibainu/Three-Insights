import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import HomeSection from "./components/interfaces/HomeSection";
import Header from "./components/interfaces/Header";

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 1.9], fov: 45 }}>
        {/* shader model */}
        <Experience />

        {/* header */}
        <Header />

        {/* home */}
        <HomeSection />

        {/* about */}

        {/* skills */}
      </Canvas>
    </>
  );
}

export default App;
