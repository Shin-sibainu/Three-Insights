import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { Html } from "@react-three/drei";

const HomeSection = () => {
  const navigationItems = ["About", "Skills", "Portfolio", "Contact"];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <Html fullscreen>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-white ml-32 md:mt-72"
      >
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
                  delay: 1.2,
                }}
                className="md:text-3xl"
              >
                <span className="cursor-pointer text-yellow-100 hover:text-yellow-300 hover:underline underline-offset-2 duration-150 tracking-wider">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </Html>
  );
};

export default HomeSection;
