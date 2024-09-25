import React from "react";
import { Html } from "@react-three/drei";
import { motion } from "framer-motion";

interface TextOverlayProps {
  text: string;
}

const TextOverlay: React.FC<TextOverlayProps> = ({ text }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.6 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -60, y: 60 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: 0.6,
        duration: 2.1,
      },
    },
  };

  return (
    <Html fullscreen>
      <motion.div
        className="w-full h-full flex flex-col pt-60 px-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="ml-10 origin-bottom-left"
          variants={textVariants}
        >
          <h1 className="text-white md:text-8xl font-bold max-w-[50%] mb-7">
            {text}
          </h1>
          <h3 className="text-white md:text-3xl font-bold max-w-[50%]">
            Creative Coding for Your Company.
          </h3>
        </motion.div>
      </motion.div>
    </Html>
  );
};

export default TextOverlay;
