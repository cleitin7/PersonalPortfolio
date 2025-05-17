import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

type Service = {
  number: string;
  title: string;
  description: string;
  colorClass: string;
  bgClass: string;
};

export default function Services() {
  const [ref, isInView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false,
  });

  const services: Service[] = [
    {
      number: "01",
      title: "Website Design & Development",
      description: "Custom, responsive, high-performance websites with clean UI designed to meet your specific business needs. I focus on creating intuitive interfaces that drive user engagement and deliver exceptional experiences.",
      colorClass: "from-primary/30 to-primary/10",
      bgClass: "bg-white"
    },
    {
      number: "02",
      title: "High-Converting Landing Pages",
      description: "Pages optimized for persuasion, speed, and conversion. I leverage proven psychological principles and design techniques to create landing pages that not only look great but actively work to convert visitors into customers.",
      colorClass: "from-secondary/30 to-secondary/10",
      bgClass: "bg-gray-100"
    },
    {
      number: "03",
      title: "AI & Prompt Engineering",
      description: "Tailored AI integrations, prompt frameworks, automations, and LLM-driven tools that enhance your workflow and productivity. I design AI solutions that solve real business problems and provide measurable return on investment.",
      colorClass: "from-accent/30 to-accent/10",
      bgClass: "bg-white"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-16">What I Offer</h2>
        
        <motion.div 
          ref={ref}
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className={`rounded-xl overflow-hidden ${service.bgClass} shadow-lg group`}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-stretch">
                {/* Number column with animated glow */}
                <div className="md:w-1/4 p-8 flex justify-center items-center relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.colorClass} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <span className="text-8xl font-bold text-gray-800 opacity-40 group-hover:opacity-70 pulse-glow transition-all duration-300">
                      {service.number}
                    </span>
                  </div>
                </div>
                
                {/* Content column */}
                <div className="md:w-3/4 p-8 md:pl-0">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-700 text-lg">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
