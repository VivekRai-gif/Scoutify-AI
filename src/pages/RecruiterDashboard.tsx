import { motion } from 'framer-motion';
import { Users, TrendingUp, Filter, BarChart3, Award, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const RecruiterDashboard = () => {
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Real-time Rankings',
      description: 'View candidates ranked by AI with live scoring based on job requirements, skills match, and experience level.',
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: 'Smart Filtering',
      description: 'Filter candidates by skills, experience, location, education, and custom criteria with advanced search.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Shortlist Management',
      description: 'Create, manage, and share multiple shortlists. Collaborate with team members on candidate selections.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Pipeline Tracking',
      description: 'Track candidates through each stage of your hiring pipeline with drag-and-drop functionality.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Comparison View',
      description: 'Side-by-side comparison of candidates to make informed decisions with detailed skill breakdowns.',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Activity Timeline',
      description: 'View complete candidate interaction history including emails, interviews, and status changes.',
    },
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
            <div className="inline-flex items-center gap-2 px-4 py-2 glass border border-primary-10/30 rounded-full mb-6">
              <Users className="w-4 h-4 text-primary-20" />
              <span className="text-primary-20 font-semibold text-sm">Recruiter Dashboard</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Complete Hiring Pipeline <span className="text-gradient">Management</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-8">
              Unified dashboard for recruiters to view, rank, and manage candidates. Track shortlists, 
              compare profiles, and make data-driven hiring decisions with powerful analytics and insights.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-10 to-primary-30 hover:from-primary-30 hover:to-primary-10 rounded-full font-semibold smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-primary-10/50">
                Start Free Trial
              </button>
              <button className="px-8 py-4 glass hover:glass-strong hover:border-primary-10/30 rounded-full font-semibold smooth-transition hover:scale-105">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Everything You Need to Manage Candidates
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass hover:glass-strong hover:border-primary-10/30 rounded-2xl p-8 smooth-transition group hover:translate-y-[-4px]"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-10 to-primary-30 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 smooth-transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-20 smooth-transition">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dashboard Preview Section */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-strong rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Key Dashboard Features
            </h2>
            <div className="space-y-6">
              {[
                'Candidate ranking with percentage match scores',
                'Custom filters and saved searches',
                'Team collaboration and notes',
                'Export reports and analytics',
                'Integration with ATS systems',
                'Mobile-responsive interface',
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-success-20 flex-shrink-0" />
                  <span className="text-lg text-gray-300">{item}</span>
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
