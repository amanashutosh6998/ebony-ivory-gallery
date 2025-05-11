
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "AI Lab", href: "/ai-lab" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md text-white py-2' : 'bg-black/30 backdrop-blur-sm text-white py-4'}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">PORTFOLIO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.href}
                className={`font-medium tracking-wide transition-colors hover:text-gray-300 ${
                  location.pathname === link.href ? "text-white border-b-2 border-white" : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Login/Sign up buttons - similar to the screenshot */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/contact"
              className="px-4 py-2 hover:text-gray-300 transition-colors"
            >
              Contact me
            </Link>
            <Link 
              to="/projects" 
              className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
            >
              View Projects
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 bg-black/95 backdrop-blur-lg">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.href}
                  className={`font-medium tracking-wide hover:text-gray-400 transition-colors block py-2 ${
                    location.pathname === link.href ? "text-white border-l-4 pl-2 border-white" : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-800">
                <Link 
                  to="/projects"
                  className="block w-full text-center bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
