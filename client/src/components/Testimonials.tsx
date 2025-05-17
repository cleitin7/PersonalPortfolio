import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  bgColor: string;
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [ref, isInView] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: false,
  });

  const testimonials: Testimonial[] = [
    {
      name: "Lucas Vieira",
      role: "CTO",
      company: "PixelForge",
      quote: "Cleitin went above and beyond. His CSS and C++ skills gave us a solid, beautiful interface.",
      image: "https://imgur.com/WI9TJ09.jpg",
      bgColor: "bg-gray-100"
    },
    {
      name: "Aline Moraes",
      role: "CEO",
      company: "BrightClick",
      quote: "The AI strategies Cleitin implemented saved us tons of time. His prompt engineering is next-level.",
      image: "https://imgur.com/iS7U2XX.jpg",
      bgColor: "bg-gray-900 text-white"
    },
    {
      name: "Rafael Duarte",
      role: "Head of Product",
      company: "NovaNext",
      quote: "Fast, clean code with style. Cleitin is both a coder and a creative.",
      image: "https://imgur.com/a2yrLJt.jpg",
      bgColor: "bg-gray-200"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (isInView && autoScrollEnabled) {
      timerRef.current = setInterval(() => {
        const nextIndex = (activeIndex + 1) % testimonials.length;
        scrollToTestimonial(nextIndex);
      }, 5000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isInView, activeIndex, testimonials.length, autoScrollEnabled]);

  // Handle scroll logic for manual scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      // Temporarily disable auto-scroll when user scrolls manually
      if (autoScrollEnabled) {
        setAutoScrollEnabled(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        
        // Re-enable auto-scroll after user stops scrolling
        const timeout = setTimeout(() => {
          setAutoScrollEnabled(true);
        }, 5000);
        
        return () => clearTimeout(timeout);
      }

      const container = containerRef.current;
      const scrollPosition = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      
      testimonials.forEach((_, index) => {
        const testimonial = container.children[index] as HTMLElement;
        if (!testimonial) return;
        
        const testimonialLeft = testimonial.offsetLeft;
        const testimonialWidth = testimonial.offsetWidth;
        
        if (
          scrollPosition >= testimonialLeft - 100 &&
          scrollPosition < testimonialLeft + testimonialWidth - containerWidth / 2
        ) {
          setActiveIndex(index);
        }
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [testimonials.length, autoScrollEnabled]);

  // Scroll to specific testimonial
  const scrollToTestimonial = (index: number) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const testimonial = container.children[index] as HTMLElement;
    if (!testimonial) return;
    
    const scrollPosition = testimonial.offsetLeft - 
                          (container.offsetWidth - testimonial.offsetWidth) / 2;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    setActiveIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-16">What My Clients Say</h2>
        
        <div 
          ref={(el) => {
            // Set both refs
            if (ref) {
              (ref as any).current = el;
            }
            containerRef.current = el;
          }}
          className="testimonial-container flex overflow-x-auto gap-6 pb-8 px-4 snap-x snap-mandatory scroll-smooth hide-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={`testimonial flex-shrink-0 w-full md:w-[400px] rounded-xl shadow-lg p-8 border border-gray-100 snap-center ${testimonial.bgColor}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-white" 
                />
                <div className="ml-4">
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className={`text-sm ${testimonial.bgColor === 'bg-gray-900 text-white' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <p className={`text-lg leading-relaxed ${testimonial.bgColor === 'bg-gray-900 text-white' ? 'text-gray-100' : 'text-gray-700'}`}>
                  "{testimonial.quote}"
                </p>
                
                {/* Decorative quote icon */}
                <svg 
                  className={`absolute -top-4 -left-2 w-12 h-12 opacity-10 ${testimonial.bgColor === 'bg-gray-900 text-white' ? 'text-white' : 'text-gray-800'}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-primary scale-110 shadow-md shadow-primary/30' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => {
                scrollToTestimonial(index);
                setAutoScrollEnabled(false);
                setTimeout(() => setAutoScrollEnabled(true), 5000);
              }}
              aria-label={`View testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
