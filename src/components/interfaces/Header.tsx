import { Html } from "@react-three/drei";
import { motion } from "framer-motion";

const Header = () => {
  const navigationItems = ["About", "Skills", "Portfolio", "Contact"];

  return (
    <Html fullscreen>
      <motion.header
        initial={{ opacity: 0, y: -70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1.0, damping: 7, stiffness: 100 }}
        className="text-white px-12 py-8 flex justify-between items-center"
      >
        <div>
          <h1 className="md:text-3xl tracking-wide">Three InSights</h1>
        </div>

        <nav>
          <ul className="flex gap-4 items-center tracking-wider">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <span className="cursor-pointer">{item}</span>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>
    </Html>
  );
};

export default Header;
