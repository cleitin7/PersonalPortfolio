import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

type Service = {
  number: string;
  title: string;
  description: string;
  colorClass: string;
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
      colorClass: "text-primary"
    },
    {
      number: "02",
      title: "High-Converting Landing Pages",
      description: "Pages optimized for persuasion, speed, and conversion. I leverage proven psychological principles and design techniques to create landing pages that not only look great but actively work to convert visitors into customers.",
      colorClass: "text-secondary"
    },
    {
      number: "03",
      title: "AI & Prompt Engineering",
      description: "Tailored AI integrations, prompt frameworks, automations, and LLM-driven tools that enhance your workflow and productivity. I design AI solutions that solve real business problems and provide measurable return on investment.",
      colorClass: "text-accent"
    }
  ];

  return (
    <section id="services" className="py-28 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <motion.h2 
          className="text-3xl font-bold text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          What I Offer
        </motion.h2>
        
        <div className="space-y-24" ref={ref as React.RefObject<HTMLDivElement>}>
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
                {/* Giant number with animation */}
                <div className="md:w-1/4">
                  <div className="relative">
                    <motion.span 
                      className={`text-[120px] md:text-[160px] font-bold ${service.colorClass} opacity-10 leading-none select-none`}
                      animate={{ 
                        opacity: [0.1, 0.15, 0.1],
                        scale: [1, 1.02, 1],
                        x: [0, 5, 0]
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 5,
                        delay: index
                      }}
                    >
                      {service.number}
                    </motion.span>
                  </div>
                </div>
                
                {/* Content with reveal animation */}
                <div className="md:w-3/4 md:-mt-10">
                  <motion.h3 
                    className={`text-3xl font-bold mb-6 ${service.colorClass}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-700 text-lg leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                  >
                    {service.description}
                  </motion.p>
                </div>
              </div>
              
              {/* Decorative line */}
              {index < services.length - 1 && (
                <motion.div 
                  className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent my-12 opacity-0"
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.4 + (index * 0.1) }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
