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
      text: "Falar no WhatsApp",
      href: "https://wa.link/xq9r4b",
      icon: "📱",
      bgColor: "bg-primary",
      hoverColor: "hover:bg-primary/90"
    },
    {
      text: "Ver meus projetos no GitHub",
      href: "https://github.com/cleitin7",
      icon: "💻",
      bgColor: "bg-gray-800",
      hoverColor: "hover:bg-gray-700"
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="pricing" className="py-24 px-4 bg-gray-50 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary"></div>
        <div className="absolute top-20 right-10 w-20 h-20 rounded-full bg-secondary"></div>
        <div className="absolute bottom-10 left-1/3 w-32 h-32 rounded-full bg-accent"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gray-800"></div>
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          ref={ref}
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            variants={itemVariants}
            transition={{ duration: 0.5 }}
          >
            Vamos trabalhar juntos?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 mb-12 max-w-xl mx-auto"
            variants={itemVariants}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Estou pronto para transformar suas ideias em realidade. Entre em contato para conversarmos sobre seu projeto!
          </motion.p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {actionButtons.map((button, index) => (
              <motion.div
                key={index}
                className="flex-1"
                variants={itemVariants}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
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
            variants={itemVariants}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a
              href="https://wa.link/xq9r4b"
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors duration-300 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Marcar uma call</span>
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                📞
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
