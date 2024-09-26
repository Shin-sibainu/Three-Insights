import { Html } from "@react-three/drei";
import { motion } from "framer-motion";

const Navigation = () => {
  const navigationContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 1.3 } },
  };

  return (
    <Html fullscreen>
      <motion.div
        variants={navigationContainerVariants}
        className="text-white tracking-wider pt-[4rem] lg:pt-[32rem] md:px-24"
      >
        <ul className="grid grid-cols-2 lg:max-w-[30%] gap-y-5 ml-10">
          <motion.li
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 1.3,
              duration: 1.0,
              type: "spring",
              stiffness: 40,
            }}
            className="md:text-3xl"
          >
            <span className="cursor-pointer text-yellow-100 hover:text-yellow-300 hover:underline underline-offset-2 duration-150">
              About
            </span>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 1.3 * 1.1,
              duration: 1.0,
              type: "spring",
              stiffness: 40,
            }}
            className="md:text-3xl"
          >
            <span className="cursor-pointer text-yellow-100 hover:text-yellow-300 hover:underline underline-offset-2 duration-150">
              Skills
            </span>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 1.3 * 1.2,
              duration: 1.0,
              type: "spring",
              stiffness: 40,
            }}
            className="md:text-3xl"
          >
            <span className="cursor-pointer text-yellow-100 hover:text-yellow-300 hover:underline underline-offset-2 duration-150">
              PortFolio
            </span>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 1.3 * 1.3,
              duration: 1.0,
              type: "spring",
              stiffness: 40,
            }}
            className="md:text-3xl"
          >
            <span className="cursor-pointer text-yellow-100 hover:text-yellow-300 hover:underline underline-offset-2 duration-150">
              Contact
            </span>
          </motion.li>
        </ul>
      </motion.div>
    </Html>
  );
};

export default Navigation;
