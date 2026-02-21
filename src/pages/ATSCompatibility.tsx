import { motion } from 'framer-motion';
import { FileCheck, Shield, Scan, AlertCircle, CheckCircle2, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const ATSCompatibility = () => {
  const features = [
    {
      icon: <Scan className="w-6 h-6" />,
      title: 'Format Analysis',
      description: 'Scan resume formatting to ensure compatibility with all major ATS systems and tracking software.',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Parsing Preview',
      description: 'See exactly how ATS systems will parse and read the resume before submission.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Keyword Optimization',
      description: 'Analyze keyword density and suggest improvements to pass ATS screening filters.',
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: 'Issue Detection',
      description: 'Identify formatting issues, incompatible elements, and potential parsing errors.',
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: 'Section Validation',
      description: 'Verify all required sections are properly structured and labeled for ATS recognition.',
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: 'File Type Check',
      description: 'Ensure resume file format is ATS-friendly (.pdf, .docx) with proper encoding.',
    },
  ];

  const checks = [
    'Contact information parsing',
    'Work experience structure',
    'Skills section formatting',
    'Education details extraction',
    'Date format compatibility',
    'Special character handling',
    'Table and column detection',
    'Header and footer validation',
    'Font and styling compatibility',
    'Section heading recognition',
  ];

  return (
    <div className="relative bg-black text-white min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-primary-20 hover:text-primary-30 mb-8 smooth-transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass border border-info-10/30 rounded-full mb-6">
              <FileCheck className="w-4 h-4 text-info-20" />
              <span className="text-info-20 font-semibold text-sm">ATS Compatibility</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Resume Optimization <span className="text-gradient">Scanner</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-8">
              Ensure resumes are ATS-friendly and optimized for automated screening systems. 
              Detect formatting issues, keyword mismatches, and compatibility problems before submission.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-info-10 to-info-20 hover:from-info-20 hover:to-info-10 rounded-full font-semibold smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-info-10/50">
                Check Resume Now
              </button>
              <button className="px-8 py-4 glass hover:glass-strong hover:border-info-10/30 rounded-full font-semibold smooth-transition hover:scale-105">
                See Example
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Comprehensive ATS Analysis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass hover:glass-strong hover:border-info-10/30 rounded-2xl p-8 smooth-transition group hover:translate-y-[-4px]"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-info-10 to-info-20 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 smooth-transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-info-20 smooth-transition">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Compatibility Checks */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-strong rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              What We Check
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {checks.map((check, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-info-20 flex-shrink-0" />
                  <span className="text-lg text-gray-300">{check}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
