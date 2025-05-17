import { motion } from "framer-motion";

export default function Hero() {
  // For the decorative icons
  const floatingIcons = [
    { 
      src: "https://i.imgur.com/RXpGKOz.png", 
      className: "left-[5%] top-[20%] rotate-12 w-16 opacity-60", 
      delay: 0 
    },
    { 
      src: "https://i.imgur.com/R1rax8O.png", 
      className: "right-[10%] top-[15%] -rotate-15 w-14 opacity-60", 
      delay: 1.5 
    },
    { 
      src: "https://i.imgur.com/R1rax8O.png", 
      className: "left-[15%] bottom-[10%] -rotate-12 w-12 opacity-60", 
      delay: 0.5 
    },
    { 
      src: "https://i.imgur.com/RXpGKOz.png", 
      className: "right-[20%] bottom-[15%] rotate-45 w-16 opacity-60", 
      delay: 2 
    }
  ];

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center relative">
        {/* Floating decorative elements */}
        {floatingIcons.map((icon, index) => (
          <motion.div
            key={index}
            className={`floating-icon absolute ${icon.className}`}
            animate={{ 
              y: [0, -10, 0] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              delay: icon.delay,
              ease: "easeInOut" 
            }}
          >
            <img 
              src={icon.src} 
              alt="Decorative icon" 
              className="w-full h-auto"
            />
          </motion.div>
        ))}
        
        {/* Profile image */}
        <motion.div 
          className="relative inline-block mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="https://i.imgur.com/fW5b19z.jpeg" 
            alt="Cleitin - Full-Stack Developer" 
            className="w-40 h-40 object-cover rounded-full shadow-lg border-4 border-white" 
          />
          <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Available
          </div>
        </motion.div>
        
        {/* Headline and intro */}
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 text-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hi, I'm Cleitin!
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Full-Stack Developer & AI Specialist
        </motion.p>
        
        {/* CTA Button */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full shadow-md relative group overflow-hidden">
            <span className="relative z-10">Let's Work Together!</span>
            <span 
              className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                transform: 'translateX(20px)',
                opacity: 0,
                transition: 'all 0.3s ease'
              }}
            >
              📞
            </span>
            <span 
              className="absolute inset-0 w-full h-full bg-primary group-hover:w-[calc(100%+2rem)] transition-all duration-300 ease-in-out"
              style={{ zIndex: 0 }}
            ></span>
          </button>
        </motion.div>
        
        {/* Trust badge */}
        <motion.div 
          className="inline-block bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          80+ Happy Clients
        </motion.div>
      </div>
    </section>
  );
}
