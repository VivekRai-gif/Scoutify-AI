import { motion, useScroll } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ModernHero } from './components/ModernHero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative bg-black text-white">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-accent-500 to-secondary-600 origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Home Section */}
        <div id="home">
          <ModernHero />
        </div>
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Additional Feature Sections */}
        <FeaturesShowcase />
        <Testimonials />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default App;
