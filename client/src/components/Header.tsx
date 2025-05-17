import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
      if (isMenuOpen) {
        mobileMenu.classList.add("-translate-y-full");
      } else {
        mobileMenu.classList.remove("-translate-y-full");
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">Cleitin</h1>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <a
                href="#about"
                className="text-gray-600 hover:text-primary font-medium transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-primary font-medium transition"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#stack"
                className="text-gray-600 hover:text-primary font-medium transition"
              >
                Stack
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-gray-600 hover:text-primary font-medium transition"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-primary font-medium transition"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-600 hover:text-primary font-medium transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <button
          className="md:hidden text-gray-600"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
