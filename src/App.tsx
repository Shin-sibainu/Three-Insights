import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import HomeSection from "./components/interfaces/HomeSection";
import Header from "./components/interfaces/Header";
import { Html } from "@react-three/drei";
import { useState } from "react";
import SkillsSection from "./components/interfaces/SkillsSection";

function App() {
  const [currentSection, setCurrentSection] = useState("Home");

  //for section transition
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 1.9 });

  const render2DContent = () => {
    switch (currentSection) {
      case "Home":
        return <HomeSection setCurrentSection={setCurrentSection} />;
      case "Skills":
        return <SkillsSection />;
      // 他のセクションも同様に追加
      default:
        return null;
    }
  };

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
        <Experience
          currentSection={currentSection}
          setCameraPosition={setCameraPosition}
        />

        {/* HTML overlay */}
        {/* <Html fullscreen>
          <div className="w-full h-full">
            {currentSection === "Home" && (
              <HomeSection setCurrentSection={setCurrentSection} />
            )}

            {currentSection === "Skills" && (
              <SkillsSection cameraPosition={cameraPosition} />
            )}
          </div>
        </Html> */}
      </Canvas>
      {/* Fixed 2D Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {render2DContent()}
      </div>
    </div>
  );
}

export default App;
