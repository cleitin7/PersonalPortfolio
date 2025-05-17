import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

type PricingPlan = {
  title: string;
  subtitle: string;
  price: number;
  period: string;
  features: string[];
  gradient: string;
  buttonColor: string;
  buttonHoverColor: string;
};

export default function Pricing() {
  const [ref, isInView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false,
  });

  const pricingPlans: PricingPlan[] = [
    {
      title: "Website Creation",
      subtitle: "Professional website with ongoing support",
      price: 120,
      period: "/month",
      features: [
        "Full professional website",
        "Hosting support",
        "Monthly updates & maintenance",
        "Responsive design for all devices"
      ],
      gradient: "bg-gradient-to-br from-primary/10 to-primary/5",
      buttonColor: "bg-primary",
      buttonHoverColor: "hover:bg-primary/90"
    },
    {
      title: "App Creation",
      subtitle: "End-to-end app development solution",
      price: 240,
      period: "/month",
      features: [
        "End-to-end mobile/web app development",
        "Performance backend implementation",
        "Professional UI design",
        "Monthly support & updates"
      ],
      gradient: "bg-gradient-to-br from-secondary/10 to-secondary/5",
      buttonColor: "bg-secondary",
      buttonHoverColor: "hover:bg-secondary/90"
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-16">Pricing Plans</h2>
        
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition duration-300 hover:shadow-2xl hover:scale-[1.02]"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={`p-8 ${plan.gradient}`}>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h3>
                <p className="text-gray-600 mb-4">{plan.subtitle}</p>
                <div className="flex items-baseline">
                  <span className={`text-4xl font-bold text-${plan.buttonColor.split('-')[1]}`}>
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.link/xq9r4b"
                  className={`block text-center ${plan.buttonColor} ${plan.buttonHoverColor} text-white font-semibold py-3 px-6 rounded-lg shadow-md w-full relative group overflow-hidden`}
                >
                  <span className="relative z-10">Adquirir</span>
                  <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    📞
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-600 mb-4">Need something more?</p>
          <button className="bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-8 rounded-full shadow-md relative group overflow-hidden">
            <span className="relative z-10">Book a Call</span>
            <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              📞
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
