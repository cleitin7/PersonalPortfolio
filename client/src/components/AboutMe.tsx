import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function AboutMe() {
  const [ref, isInView] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: false,
  });

  const [activeSection, setActiveSection] = useState(0);

  const aboutSections = [
    {
      title: "Who I Am",
      color: "text-primary",
      content: "Hey! I'm Cleitin, a Full-Stack developer with a passion for creating beautiful, functional websites and applications that solve real-world problems."
    },
    {
      title: "My Expertise",
      color: "text-secondary",
      content: "With deep expertise in CSS & C++, I build high-performance solutions that not only look great but run smoothly across all platforms and devices."
    },
    {
      title: "AI Specialization",
      color: "text-accent",
      content: "I create prompt engineering systems for AI that enhance productivity and unlock new capabilities for businesses looking to leverage cutting-edge technology."
    },
    {
      title: "My Mission",
      color: "text-primary",
      content: "My mission is to deliver high-impact digital solutions that transform ideas into reality, helping businesses grow and succeed in the digital landscape."
    }
  ];

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveSection((prev) => (prev + 1) % aboutSections.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView, aboutSections.length]);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  };

  return (
    <section id="about" className="py-20 px-4 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-16">About Me</h2>
        
        <div 
          ref={ref}
          className="about-container relative" 
          style={{ height: "300px" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              className={`absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg`}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              exit="exit"
              variants={variants}
              transition={{ duration: 0.5 }}
            >
              <h3 className={`text-xl font-bold mb-4 ${aboutSections[activeSection].color}`}>
                {aboutSections[activeSection].title}
              </h3>
              <p className="text-lg text-gray-700">
                {aboutSections[activeSection].content}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
