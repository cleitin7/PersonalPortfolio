import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  
  // For section visibility
  const [section1Ref, section1IsVisible] = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: false,
  });
  const [section2Ref, section2IsVisible] = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: false,
  });
  const [section3Ref, section3IsVisible] = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: false,
  });
  const [section4Ref, section4IsVisible] = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: false,
  });

  const aboutSections = [
    {
      id: "who",
      title: "Who I Am",
      color: "text-primary bg-white",
      headerBg: "bg-primary text-white",
      content: "Hey! I'm Cleitin, a Full-Stack developer with a passion for creating beautiful, functional websites and applications that solve real-world problems.",
      ref: section1Ref,
      isVisible: section1IsVisible
    },
    {
      id: "expertise",
      title: "My Expertise",
      color: "text-secondary bg-gray-900 text-white",
      headerBg: "bg-secondary text-white",
      content: "With deep expertise in CSS & C++, I build high-performance solutions that not only look great but run smoothly across all platforms and devices.",
      ref: section2Ref,
      isVisible: section2IsVisible
    },
    {
      id: "ai",
      title: "AI Specialization",
      color: "text-accent bg-white",
      headerBg: "bg-accent text-white",
      content: "I create prompt engineering systems for AI that enhance productivity and unlock new capabilities for businesses looking to leverage cutting-edge technology.",
      ref: section3Ref,
      isVisible: section3IsVisible
    },
    {
      id: "mission",
      title: "My Mission",
      color: "text-primary bg-gray-800 text-white",
      headerBg: "bg-primary text-white",
      content: "My mission is to deliver high-impact digital solutions that transform ideas into reality, helping businesses grow and succeed in the digital landscape.",
      ref: section4Ref,
      isVisible: section4IsVisible
    }
  ];

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      // Find which section is most visible
      const visibleSections = [
        section1IsVisible,
        section2IsVisible,
        section3IsVisible,
        section4IsVisible
      ];
      
      const activeIndex = visibleSections.findIndex(isVisible => isVisible);
      if (activeIndex !== -1) {
        setActiveSection(activeIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [section1IsVisible, section2IsVisible, section3IsVisible, section4IsVisible]);

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold text-center mb-16">About Me</h2>
        
        {/* Sticky header that changes based on active section */}
        <div className="sticky top-16 z-20 mb-8 transition-all duration-300 shadow-md hidden md:block">
          <div className={`py-3 px-6 rounded-t-lg ${aboutSections[activeSection].headerBg}`}>
            <h3 className="text-xl font-bold">{aboutSections[activeSection].title}</h3>
          </div>
        </div>
        
        {/* Scrollable sections */}
        <div ref={containerRef} className="space-y-20">
          {aboutSections.map((section, index) => (
            <div
              key={section.id}
              ref={section.ref as React.RefObject<HTMLDivElement>}
              id={section.id}
              className="scroll-mt-32"
            >
              <motion.div
                className={`rounded-2xl p-8 shadow-lg ${section.color} transition duration-500`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: section.isVisible ? 1 : 0.5,
                  y: section.isVisible ? 0 : 20
                }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-xl font-bold mb-4 md:hidden">
                  {section.title}
                </h3>
                <p className="text-lg">
                  {section.content}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
