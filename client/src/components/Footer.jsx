import { Car, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>

      <div
        className={`relative z-10 py-16 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div
              className={`space-y-6 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0ms" }}
            >
              <div className="group">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/25 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                    <Car className="w-6 h-6 text-white" />
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <span className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Ayan Tour & Travels
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  Making intercity travel easy, affordable, and convenient for
                  everyone with premium service and comfort.
                </p>
                <div className="flex space-x-4 pt-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "200ms" }}
              onMouseEnter={() => setHoveredSection("links")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <h3 className="font-semibold text-lg mb-6 relative">
                <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                  Quick Links
                </span>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 ${
                    hoveredSection === "links" ? "w-full" : "w-8"
                  }`}
                ></div>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "#" },
                  { name: "Routes", href: "#routes" },
                  { name: "Book Now", href: "#book" },
                  { name: "Testimonials", href: "#testimonials" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-2"
                    >
                      <div className="w-1 h-1 bg-green-500 rounded-full mr-3 group-hover:w-2 group-hover:h-2 transition-all duration-300"></div>
                      <span className="relative">
                        {link.name}
                        <div className="absolute bottom-0 left-0 w-0 h-px bg-green-400 group-hover:w-full transition-all duration-300"></div>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "400ms" }}
              onMouseEnter={() => setHoveredSection("support")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <h3 className="font-semibold text-lg mb-6 relative">
                <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                  Support
                </span>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 ${
                    hoveredSection === "support" ? "w-full" : "w-8"
                  }`}
                ></div>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "FAQ", href: "#faq" },
                  { name: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-2"
                    >
                      <div className="w-1 h-1 bg-green-500 rounded-full mr-3 group-hover:w-2 group-hover:h-2 transition-all duration-300"></div>
                      <span className="relative">
                        {link.name}
                        <div className="absolute bottom-0 left-0 w-0 h-px bg-green-400 group-hover:w-full transition-all duration-300"></div>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "600ms" }}
              onMouseEnter={() => setHoveredSection("contact")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <h3 className="font-semibold text-lg mb-6 relative">
                <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                  Contact Us
                </span>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 ${
                    hoveredSection === "contact" ? "w-full" : "w-8"
                  }`}
                ></div>
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+917070186631"
                    className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="w-10 h-10 bg-gray-800 group-hover:bg-green-600 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-500/25">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-sm font-medium">Phone</span>
                      <span className="text-xs opacity-75">
                        +91 70701 86631
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ialam2943@gmail.com"
                    className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="w-10 h-10 bg-gray-800 group-hover:bg-green-600 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-500/25">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-sm font-medium">Email</span>
                      <span className="text-xs opacity-75">
                        ialam2943@gmail.com
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="group flex items-center text-gray-400 transition-all duration-300">
                    <div className="w-10 h-10 bg-gray-800 group-hover:bg-green-600 rounded-lg flex items-center justify-center mr-3 transition-all duration-300">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-sm font-medium">
                        Location
                      </span>
                      <span className="text-xs opacity-75">India</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800/50">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} Ayan Tour & Travels Platform. All
                  rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0"></div>

      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-500/20 rounded-full blur-sm animate-pulse"></div>
      <div
        className="absolute -bottom-1 -right-3 w-6 h-6 bg-green-400/20 rounded-full blur-sm animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 -left-1 w-3 h-3 bg-green-300/20 rounded-full blur-sm animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </footer>
  );
};

export default Footer;
