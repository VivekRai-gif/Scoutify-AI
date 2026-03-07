import { motion } from 'framer-motion';
import { ArrowRight, Play, Brain, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ModernHero = () => {
  const navigate = useNavigate();

  const tags = [
    'For Job Seekers',
    'Career Intelligence',
    'Skill-First Matching',
    'Bias-Free Analysis',
  ];

  const handleGetStarted = () => {
    navigate('/candidate-intelligence');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-neutral-900 to-black pt-28">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.06) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
                           linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px)`,
          backgroundSize: 'cover, cover, 60px 60px, 60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Tag Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {tags.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: 0.3 + index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-5 py-2.5 bg-neutral-900 border border-primary-500 hover:border-primary-400 rounded-full text-sm text-neutral-300 hover:text-primary-400 transition-all duration-300 cursor-pointer hover:shadow-soft font-medium"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.5, 
            duration: 1, 
            ease: [0.16, 1, 0.3, 1]
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
        >
          <motion.span 
            className="text-gradient inline-block"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Multi-Agent AI Career Assistant
          </motion.span>
          <br />
          <motion.span 
            className="text-white inline-block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            for Job Seekers
          </motion.span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          AI-powered resume analysis, skill gap identification, job safety verification, 
          and personalized application emails—all in one platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button 
            onClick={handleGetStarted}
            className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-primary flex items-center gap-2"
          >
            <Brain className="w-5 h-5" />
            Try Career Intelligence
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-4 bg-neutral-900 border-2 border-primary-500 text-primary-400 hover:bg-primary-600 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-medium flex items-center gap-2">
            <Play className="w-5 h-5" />
            See Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
};
