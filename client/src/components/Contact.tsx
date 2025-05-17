import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function Contact() {
  const [ref, isInView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <section id="contact" className="py-28 px-4 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-xl"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-gray-200/30 to-gray-200/5 blur-xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.12, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>
      
      <div className="container mx-auto max-w-4xl text-center relative">
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            Let's Work Together
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 mb-14 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Ready to transform your ideas into reality? I'd love to help you create exceptional digital experiences that engage your audience and grow your business.
          </motion.p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.a
              href="https://github.com/cleitin7"
              className="flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg w-full md:w-auto transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View My GitHub Projects
            </motion.a>
            
            <motion.a
              href="https://wa.link/xq9r4b"
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-10 rounded-xl shadow-lg btn-expand relative overflow-hidden w-full md:w-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Let's Talk</span>
              <span className="absolute right-6 emoji-bounce">
                📞
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
