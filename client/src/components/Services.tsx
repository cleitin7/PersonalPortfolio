import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

type Service = {
  number: string;
  title: string;
  description: string;
  color: string;
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
      description: "Custom, responsive, high-performance websites with clean UI/UX designed to meet your specific business needs. I focus on creating intuitive interfaces that drive user engagement and deliver exceptional experiences.",
      color: "text-primary/10 group-hover:text-primary/30"
    },
    {
      number: "02",
      title: "High-Converting Landing Pages",
      description: "Pages optimized for persuasion, speed, and conversion. I leverage proven psychological principles and design techniques to create landing pages that not only look great but actively work to convert visitors into customers.",
      color: "text-secondary/10 group-hover:text-secondary/30"
    },
    {
      number: "03",
      title: "AI & Prompt Engineering",
      description: "Tailored AI integrations, prompt frameworks, automations, and LLM-driven tools that enhance your workflow and productivity. I design AI solutions that solve real business problems and provide measurable return on investment.",
      color: "text-accent/10 group-hover:text-accent/30"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-16">What I Offer</h2>
        
        <motion.div 
          ref={ref}
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="flex flex-col md:flex-row items-start gap-6 group"
              variants={itemVariants}
            >
              <div className={`text-8xl font-bold ${service.color} md:w-1/4 flex justify-center transition duration-300`}>
                <span>{service.number}</span>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-700 text-lg">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
