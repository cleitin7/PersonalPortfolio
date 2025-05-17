import { useState } from "react";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
      mobileMenu.classList.add("-translate-y-full");
    }
  };

  return (
    <div
      id="mobileMenu"
      className="fixed inset-0 bg-white z-40 transform -translate-y-full transition-transform duration-300 ease-in-out"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end">
          <button
            id="closeMenu"
            className="text-gray-600"
            onClick={closeMenu}
            aria-label="Close menu"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-8">
          <ul className="space-y-6 text-center">
            <li>
              <a
                href="#about"
                className="text-xl text-gray-800 hover:text-primary font-medium transition"
                onClick={closeMenu}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="text-xl text-gray-800 hover:text-primary font-medium transition"
                onClick={closeMenu}
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#stack"
                className="text-xl text-gray-800 hover:text-primary font-medium transition"
                onClick={closeMenu}
              >
                Stack
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-xl text-gray-800 hover:text-primary font-medium transition"
                onClick={closeMenu}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-xl text-gray-800 hover:text-primary font-medium transition"
                onClick={closeMenu}
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-xl text-gray-800 hover:text-primary font-medium transition"
                onClick={closeMenu}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
