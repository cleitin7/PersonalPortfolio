import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, isInView] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: false,
  });

  const testimonials: Testimonial[] = [
    {
      name: "Lucas Vieira",
      role: "CTO",
      company: "PixelForge",
      quote: "Cleitin went above and beyond our expectations. His technical skills combined with his creative approach resulted in a product that exceeded our goals. Would absolutely work with him again.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Aline Moraes",
      role: "CEO",
      company: "BrightClick",
      quote: "The AI strategies he built saved us countless hours and significantly improved our workflow efficiency. Cleitin has an impressive understanding of both business needs and technical implementation.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Rafael Duarte",
      role: "Head of Product",
      company: "NovaNext",
      quote: "Fast, clean code with style. Cleitin's attention to detail and ability to translate complex requirements into elegant solutions made our project a success. Highly recommended!",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    }
  ];

  // Handle scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

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
  }, [testimonials.length]);

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
    <section id="testimonials" className="py-20 px-4">
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
          className="testimonial-container flex overflow-x-auto gap-6 pb-8 px-4 snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial flex-shrink-0 w-full md:w-[350px] bg-white rounded-xl shadow-lg p-6 border border-gray-100 snap-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover shadow-sm" 
                />
                <div className="ml-4">
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.quote}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-primary' : 'bg-gray-300'} transition-colors duration-300`}
              onClick={() => scrollToTestimonial(index)}
              aria-label={`View testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
