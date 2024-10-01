import { motion } from "framer-motion";

type HeaderProps = {
  setCurrentSection: (item: string) => void;
};

const Header = ({ setCurrentSection }: HeaderProps) => {
  const navigationItems = ["Home", "About", "Skills", "Portfolio", "Home"];

  const handleNavigation = (item: string) => {
    setCurrentSection(item);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 1.0, damping: 7, stiffness: 100 }}
      className="absolute top-0 left-0 right-0 text-white px-12 py-8 flex justify-between items-center pointer-events-auto z-10"
      style={{ pointerEvents: "auto" }}
    >
      <div onClick={() => handleNavigation("Home")} className="cursor-pointer">
        <h1 className="md:text-3xl tracking-wide">Three InSights</h1>
      </div>

      <nav>
        <ul className="flex gap-4 items-center tracking-wider">
          {navigationItems.map((item, index) => (
            <li key={index} onClick={() => handleNavigation(item)}>
              <span className="nav-item cursor-pointer transition-colors duration-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;
