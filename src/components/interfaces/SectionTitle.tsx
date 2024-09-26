import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subTitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subTitle }) => {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 50 },
    },
  };

  return (
    <div className="mb-12">
      <motion.h1
        variants={titleVariants}
        className="text-4xl md:text-9xl font-bold mb-4 tracking-wide"
      >
        {title}
      </motion.h1>
      <motion.h2
        variants={titleVariants}
        className="text-xl md:text-5xl tracking-wide"
      >
        {subTitle}
      </motion.h2>
    </div>
  );
};

export default SectionTitle;
