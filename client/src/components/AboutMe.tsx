import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  
  // For parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  
  // For section visibility
  const [section1Ref, section1IsVisible] = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: false,
  });
  const [section2Ref, section2IsVisible] = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: false,
  });
  const [section3Ref, section3IsVisible] = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: false,
  });

  const aboutSections = [
    {
      id: "expertise",
      title: "My Expertise",
      color: "bg-gray-100",
      textColor: "text-gray-800",
      content: "With deep expertise in CSS & C++, I build high-performance solutions that not only look great but run smoothly across all platforms and devices.",
      ref: section1Ref,
      isVisible: section1IsVisible,
      parallaxY: parallaxY1
    },
    {
      id: "ai",
      title: "AI Specialization",
      color: "bg-white",
      textColor: "text-gray-800",
      content: "I create prompt engineering systems for AI that enhance productivity and unlock new capabilities for businesses looking to leverage cutting-edge technology.",
      ref: section2Ref,
      isVisible: section2IsVisible,
      parallaxY: parallaxY2
    },
    {
      id: "mission",
      title: "My Mission",
      color: "bg-gray-100",
      textColor: "text-gray-800",
      content: "My mission is to deliver high-impact digital solutions that transform ideas into reality, helping businesses grow and succeed in the digital landscape.",
      ref: section3Ref,
      isVisible: section3IsVisible,
      parallaxY: parallaxY3
    }
  ];

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      // Find which section is most visible
      const visibleSections = [
        section1IsVisible,
        section2IsVisible,
        section3IsVisible
      ];
      
      const activeIndex = visibleSections.findIndex(isVisible => isVisible);
      if (activeIndex !== -1) {
        setActiveSection(activeIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [section1IsVisible, section2IsVisible, section3IsVisible]);

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8, 
            type: "spring",
            stiffness: 100
          }}
        >
          About Me
        </motion.h2>
        
        {/* Sticky header that changes based on active section */}
        <motion.div 
          className="sticky top-16 z-20 mb-8 transition-all duration-300 shadow-md hidden md:block bg-white/80 backdrop-blur-sm rounded-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex justify-between items-center px-6 py-3">
            <h3 className="text-xl font-bold text-primary">{aboutSections[activeSection].title}</h3>
            <div className="flex space-x-2">
              {aboutSections.map((_, index) => (
                <span 
                  key={index} 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === index ? 'bg-primary scale-125' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Scrollable sections */}
        <div ref={containerRef} className="space-y-32">
          {aboutSections.map((section, index) => (
            <div
              key={section.id}
              ref={section.ref as React.RefObject<HTMLDivElement>}
              id={section.id}
              className="scroll-mt-32"
            >
              <motion.div
                className={`rounded-2xl p-8 shadow-lg ${section.color} ${section.textColor} overflow-hidden relative`}
                style={{ y: section.parallaxY }}
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ 
                  duration: 0.9, 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 20 
                }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
              >
                {/* Enhanced decorative elements with animations */}
                <motion.div 
                  className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full pointer-events-none" 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.4, 0.3],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -left-10 -bottom-10 w-32 h-32 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full pointer-events-none"
                  animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.3, 0.2],
                    rotate: [0, -5, 0]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                
                <div className="relative z-10">
                  <motion.h3 
                    className="text-2xl font-bold mb-4 text-primary"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {section.title}
                  </motion.h3>
                  <motion.p 
                    className="text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {section.content}
                  </motion.p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
