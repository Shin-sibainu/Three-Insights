import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import HomeSection from "./components/interfaces/HomeSection";
import Header from "./components/interfaces/Header";
import { Html } from "@react-three/drei";
import { useState } from "react";

function App() {
  const [currentSection, setCurrentSection] = useState("home");

  return (
    <div className="relative w-full h-screen">
      <Header setCurrentSection={setCurrentSection} />
      <Canvas
        camera={{ position: [0, 0, 1.9], fov: 45 }}
        gl={{ alpha: true }}
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: 0 }}
      >
        {/* shader model */}
        <Experience currentSection={currentSection} />

        {/* HTML overlay */}
        <Html fullscreen>
          <div className="w-full h-full">
            {/* header */}

            {/* home */}
            <HomeSection setCurrentSection={setCurrentSection} />

            {/* You can add other sections here */}
            {/* about */}
            {/* skills */}
          </div>
        </Html>
      </Canvas>
    </div>
  );
}

export default App;
