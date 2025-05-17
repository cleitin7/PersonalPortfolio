import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

type ActionButton = {
  text: string;
  href: string;
  icon: string;
  bgColor: string;
  hoverColor: string;
};

export default function ContactCTA() {
  const [ref, isInView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false,
  });

  const actionButtons: ActionButton[] = [
    {
      text: "Let's Talk on WhatsApp",
      href: "https://wa.link/xq9r4b",
      icon: "📱",
      bgColor: "bg-primary",
      hoverColor: "hover:bg-primary/90"
    },
    {
      text: "View My GitHub Projects",
      href: "https://github.com/cleitin7",
      icon: "💻",
      bgColor: "bg-gray-800",
      hoverColor: "hover:bg-gray-700"
    }
  ];

  return (
    <section id="pricing" className="py-28 px-4 bg-gray-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full bg-gradient-to-br blur-3xl opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              right: `${Math.random() * 100}%`,
              width: `${150 + Math.random() * 300}px`,
              height: `${150 + Math.random() * 300}px`,
              background: i % 2 === 0 
                ? `linear-gradient(120deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05))` 
                : `linear-gradient(120deg, rgba(220, 220, 220, 0.15), rgba(250, 250, 250, 0.05))`
            }}
            animate={{
              x: [0, i % 2 === 0 ? 10 : -10, 0],
              y: [0, i % 3 === 0 ? 15 : -15, 0],
              scale: [1, 1.05, 1],
              opacity: [0.03, 0.08, 0.03]
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + i * 2,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            Let's Work Together
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            I'm ready to transform your ideas into reality. Let's discuss your project and create something amazing together!
          </motion.p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {actionButtons.map((button, index) => (
              <motion.div
                key={index}
                className="flex-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2 + (index * 0.1) }}
              >
                <a
                  href={button.href}
                  className={`block text-center ${button.bgColor} ${button.hoverColor} text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 btn-expand relative overflow-hidden`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative z-10">{button.text}</span>
                  <span className="absolute right-6 emoji-bounce">
                    {button.icon}
                  </span>
                </a>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <a
              href="https://wa.link/xq9r4b"
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors duration-300 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Schedule a Call</span>
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                📞
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
