import { motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const goToCandidateIntelligence = () => {
    navigate('/candidate-intelligence');
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-3 left-3 right-3 md:top-6 md:left-6 md:right-6 z-50">
      <div className="bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-2xl md:rounded-3xl shadow-large">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <img 
              src="/matchlylogo.png" 
              alt="matchly" 
              className="h-8 w-auto"
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-neutral-300 hover:text-primary-400 transition-colors text-sm font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-400 group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={goToCandidateIntelligence}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-5 py-2.5 bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-700 hover:to-secondary-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-secondary flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Career AI
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('#contact')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-primary"
            >
              Contact
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neutral-300 p-2 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pt-4 pb-2 px-2 border-t border-neutral-800"
          >
            <div className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className="text-neutral-300 hover:text-primary-400 hover:bg-neutral-800 transition-all py-2 px-3 rounded-lg font-medium text-left"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={goToCandidateIntelligence}
                className="mt-2 px-6 py-2.5 bg-gradient-to-r from-secondary-600 to-secondary-500 text-white font-semibold rounded-lg transition-all text-center flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Career AI
              </button>
              <button 
                onClick={() => scrollToSection('#contact')}
                className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg transition-all text-center"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
        </div>
      </div>
    </nav>
  );
};
