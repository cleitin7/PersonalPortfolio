import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initial animation effect
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);

  // Enhanced floating icons with more variety
  const floatingIcons = [
    {
      src: "https://i.imgur.com/RXpGKOz.png",
      className: "left-[5%] top-[20%] rotate-12 w-16 opacity-60",
      delay: 0,
      duration: 3,
      yOffset: 10
    },
    {
      src: "https://i.imgur.com/R1rax8O.png",
      className: "right-[10%] top-[15%] -rotate-15 w-14 opacity-60",
      delay: 1.5,
      duration: 3.5,
      yOffset: 12
    },
    {
      src: "https://i.imgur.com/R1rax8O.png",
      className: "left-[15%] bottom-[10%] -rotate-12 w-12 opacity-60",
      delay: 0.5,
      duration: 4,
      yOffset: 8
    },
    {
      src: "https://i.imgur.com/RXpGKOz.png",
      className: "right-[20%] bottom-[15%] rotate-45 w-16 opacity-60",
      delay: 2,
      duration: 3.2,
      yOffset: 11
    },
    // Additional floating icons
    {
      src: "https://i.imgur.com/RXpGKOz.png",
      className: "left-[30%] top-[30%] rotate-30 w-12 opacity-40",
      delay: 1.2,
      duration: 3.7,
      yOffset: 9
    },
    {
      src: "https://i.imgur.com/R1rax8O.png",
      className: "right-[35%] top-[10%] -rotate-20 w-10 opacity-50",
      delay: 0.8,
      duration: 4.2,
      yOffset: 7
    },
    {
      src: "https://i.imgur.com/RXpGKOz.png",
      className: "left-[25%] top-[60%] rotate-15 w-14 opacity-30",
      delay: 2.5,
      duration: 3.8,
      yOffset: 13
    },
    {
      src: "https://i.imgur.com/R1rax8O.png",
      className: "right-[25%] bottom-[25%] -rotate-24 w-11 opacity-45",
      delay: 1.7,
      duration: 4.5,
      yOffset: 10
    }
  ];

  // Interactive background elements
  const backgroundElements = [
    { size: 'w-40 h-40', top: '10%', left: '5%', color: 'from-primary/10 to-primary/5', delay: 0.1 },
    { size: 'w-64 h-64', bottom: '10%', right: '5%', color: 'from-secondary/10 to-secondary/5', delay: 0.3 },
    { size: 'w-32 h-32', top: '40%', right: '25%', color: 'from-accent/10 to-accent/5', delay: 0.5 },
    { size: 'w-56 h-56', bottom: '30%', left: '15%', color: 'from-gray-200 to-gray-100/50', delay: 0.7 },
  ];

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-50 via-gray-50 to-gray-100"></div>

        {backgroundElements.map((el, index) => (
          <motion.div
            key={index}
            className={`absolute ${el.size} rounded-full bg-gradient-to-br ${el.color} blur-3xl`}
            style={{
              top: el.top,
              left: el.left,
              right: el.right,
              bottom: el.bottom,
              opacity: 0
            }}
            animate={{
              opacity: [0, 0.3, 0.2, 0.3],
              scale: [0.8, 1, 0.9, 1]
            }}
            transition={{
              delay: el.delay,
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto max-w-4xl text-center relative z-0"
      >
        {/* Floating decorative elements - z-index lower than content */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {floatingIcons.map((icon, index) => (
            <motion.div
              key={index}
              className={`floating-icon absolute ${icon.className} pointer-events-none`}
              animate={{
                y: [0, -icon.yOffset, 0],
                x: index % 3 === 0 ? [0, 5, 0] : index % 3 === 1 ? [0, -5, 0] : [0, 0, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: icon.duration,
                delay: icon.delay,
                ease: "easeInOut",
                repeatType: "mirror"
              }}
            >
              <img
                src={icon.src}
                alt="Decorative icon"
                className="w-full h-auto"
              />
            </motion.div>
          ))}
        </div>

        {/* Profile image - higher z-index */}
        <motion.div
          className="relative inline-block mb-8 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="https://i.imgur.com/fW5b19z.jpeg"
            alt="Cleitin - Full-Stack Developer"
            className="w-40 h-40 object-cover rounded-full shadow-lg border-4 border-white"
          />
          <motion.div
            className="absolute -bottom-2 -right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
          >
            Available
          </motion.div>
        </motion.div>

        {/* Headline and intro - higher z-index */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-shadow relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Hi, I'm Cleitin!
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-600 mb-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Full-Stack Developer & AI Specialist
        </motion.p>

        {/* CTA Button - higher z-index and WhatsApp link */}
        <motion.div
          className="mb-10 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <a
            href="https://wa.link/xq9r4b"
            className="inline-block py-4 px-10 bg-primary text-white font-semibold rounded-full shadow-lg relative group overflow-hidden transition-all duration-300 hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={0}
            aria-label="Contact via WhatsApp"
          >
            <span className="relative z-10">Let's Work Together!</span>
            <span
              className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-4 z-10"
            >
              📞
            </span>
            <span
              className="absolute inset-0 w-full h-full bg-primary group-hover:w-[calc(100%+2rem)] transition-all duration-300 ease-in-out"
              style={{ zIndex: 0 }}
            ></span>
          </a>
        </motion.div>

        {/* Trust badge - higher z-index */}
        <motion.div
          className="inline-block bg-white rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          80+ Happy Clients
        </motion.div>


        <motion.div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm font-medium text-gray-600 mb-1">Scroll Down</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
    </section >
  );
}
