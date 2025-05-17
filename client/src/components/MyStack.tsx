import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

type StackItem = {
  title: string;
  icon: string;
  description: string;
  color: string;
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
      color: "bg-primary"
    },
    {
      title: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      description: "Advanced styling with animations, responsive design, and modern frameworks like Tailwind CSS.",
      color: "bg-secondary"
    },
    {
      title: "ChatGPT",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      description: "Expert prompt engineering, custom AI integration and optimization for business workflows.",
      color: "bg-accent"
    },
    {
      title: "Full-Stack",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      description: "End-to-end application development, from front-end UIs to scalable back-end architectures.",
      color: "bg-gray-800"
    }
  ];

  return (
    <section id="stack" className="py-20 px-4 bg-gray-50">
      <div ref={ref} className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-16">My Stack</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stackItems.map((item, index) => (
            <motion.div
              key={index}
              className="flip-card h-64 perspective-1000"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flip-card-inner relative w-full h-full transition-transform duration-600 transform-style-3d hover:rotate-y-180">
                <div className="flip-card-front absolute w-full h-full flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-lg border border-gray-100 backface-hidden">
                  <img 
                    src={item.icon} 
                    alt={item.title} 
                    className="w-20 h-20 object-contain mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                </div>
                <div className={`flip-card-back absolute w-full h-full flex flex-col items-center justify-center p-6 rounded-xl ${item.color} text-white shadow-lg backface-hidden rotate-y-180`}>
                  <h3 className="text-xl font-bold mb-2">{item.title} Expert</h3>
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
