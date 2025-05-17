import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

type StackItem = {
  title: string;
  icon: string;
  description: string;
  frontBg: string;
  backBg: string;
  textColor: string;
};

export default function MyStack() {
  const [ref, isInView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false,
  });

  const stackItems: StackItem[] = [
    {
      title: "C++",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      description: "Advanced algorithms, performance optimization, and system-level programming for high-efficiency applications.",
      frontBg: "bg-white",
      backBg: "bg-primary",
      textColor: "text-white"
    },
    {
      title: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      description: "Advanced styling with animations, responsive design, and modern frameworks like Tailwind CSS.",
      frontBg: "bg-gray-800",
      backBg: "bg-secondary",
      textColor: "text-white"
    },
    {
      title: "ChatGPT",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      description: "Expert prompt engineering, custom AI integration and optimization for business workflows.",
      frontBg: "bg-white",
      backBg: "bg-accent",
      textColor: "text-white"
    },
    {
      title: "Full-Stack",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      description: "End-to-end application development, from front-end UIs to scalable back-end architectures.",
      frontBg: "bg-gray-900",
      backBg: "bg-white",
      textColor: "text-gray-900"
    }
  ];

  return (
    <section id="stack" className="py-20 px-4 bg-white">
      <div ref={ref} className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-16">My Stack</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stackItems.map((item, index) => (
            <motion.div
              key={index}
              className="flip-card h-72 perspective-1000"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              tabIndex={0} // For keyboard accessibility
              role="button"
              aria-label={`${item.title} skill details`}
            >
              <div className="flip-card-inner relative w-full h-full transition-transform duration-600 transform-style-3d hover:rotate-y-180 focus:rotate-y-180 shadow-xl rounded-xl">
                {/* Front of card */}
                <div className={`flip-card-front absolute w-full h-full flex flex-col items-center justify-center p-6 rounded-xl ${item.frontBg} ${item.frontBg === "bg-white" ? "text-gray-800" : "text-white"} shadow-lg border border-gray-100 backface-hidden`}>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-30 blur-lg rounded-full"></div>
                    <img 
                      src={item.icon} 
                      alt={item.title} 
                      className="w-24 h-24 object-contain mb-6 relative z-10"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-sm mt-2 opacity-80">(Click or hover to flip)</p>
                </div>
                
                {/* Back of card */}
                <div className={`flip-card-back absolute w-full h-full flex flex-col items-center justify-center p-8 rounded-xl ${item.backBg} ${item.textColor} shadow-lg backface-hidden rotate-y-180`}>
                  <h3 className="text-xl font-bold mb-4">{item.title} Expert</h3>
                  <p className="text-center">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
