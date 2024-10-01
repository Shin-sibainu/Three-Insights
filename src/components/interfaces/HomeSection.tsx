import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

type HomeSectionProps = {
  setCurrentSection: (item: string) => void;
};

const HomeSection = ({ setCurrentSection }: HomeSectionProps) => {
  const navigationItems = ["About", "Skills", "Portfolio", "Contact"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const handleNavigation = (item: string) => {
    setCurrentSection(item);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="absolute top-0 left-0 w-full h-full text-white pointer-events-none"
      style={{ zIndex: 10 }}
    >
      <div className="ml-32 md:mt-72">
        <SectionTitle
          title="Three InSights"
          subTitle="Creative Coding for Your Business."
        />

        <div className="max-w-[30%]">
          <motion.ul
            variants={containerVariants}
            className="grid grid-cols-2 gap-y-4 mt-8"
          >
            {navigationItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -120 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  stiffness: 60,
                  duration: 1.0,
                  delay: 0.8,
                }}
                className="md:text-3xl pointer-events-auto"
                onClick={() => handleNavigation(item)}
              >
                <span className="nav-item cursor-pointer text-yellow-200 duration-150 tracking-wider">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeSection;
