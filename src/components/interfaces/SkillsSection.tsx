import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Skill {
  name: string;
  level: number;
  color: string;
}

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skills: Skill[] = [
    { name: "React", level: 90, color: "#61DAFB" },
    { name: "Three.js", level: 85, color: "#000000" },
    { name: "TypeScript", level: 80, color: "#3178C6" },
    { name: "WebGL", level: 75, color: "#990000" },
    { name: "Node.js", level: 70, color: "#339933" },
  ];

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, x: 200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      x: 200,
      transition: {
        duration: 0.5,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="lg:w-1/3 w-2/3 fixed md:right-40 md:top-1/3 right-40 top-1/4 transform -translate-y-1/2 bg-slate-500 rounded-lg bg-opacity-75 text-white p-6 shadow-lg overflow-y-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.h2
            className="text-2xl font-bold mb-6 tracking-wider"
            variants={itemVariants}
          >
            Skills
          </motion.h2>
          <ul>
            {skills.map((skill) => (
              <motion.li
                key={skill.name}
                className="mb-6 tracking-widest"
                variants={itemVariants}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">{skill.name}</span>
                  <span className="text-xs">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkillsSection;
