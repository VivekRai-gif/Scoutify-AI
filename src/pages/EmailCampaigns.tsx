import { motion } from 'framer-motion';
import { Mail, Send, Calendar, Zap, BarChart, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const EmailCampaigns = () => {
  const features = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Smart Templates',
      description: 'Pre-built, customizable email templates for every stage of the hiring process.',
    },
    {
      icon: <Send className="w-6 h-6" />,
      title: 'Bulk Personalization',
      description: 'Send personalized emails at scale with dynamic fields and custom variables.',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Auto Scheduling',
      description: 'Automated interview scheduling with calendar integration and timezone support.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Follow-up Automation',
      description: 'Set up automatic follow-up sequences based on candidate actions and timelines.',
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: 'Email Analytics',
      description: 'Track open rates, click rates, and response metrics for all your campaigns.',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Smart Timing',
      description: 'AI-powered send time optimization to maximize engagement and response rates.',
    },
  ];

  const capabilities = [
    'Customizable email templates',
    'Dynamic field insertion',
    'Automated follow-up sequences',
    'Interview scheduling links',
    'Calendar integration (Google, Outlook)',
    'Timezone detection',
    'Open and click tracking',
    'Response rate analytics',
    'A/B testing support',
    'Drip campaign builder',
    'Candidate engagement scoring',
    'Email delivery optimization',
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
            <div className="inline-flex items-center gap-2 px-4 py-2 glass border border-warning-10/30 rounded-full mb-6">
              <Mail className="w-4 h-4 text-warning-20" />
              <span className="text-warning-20 font-semibold text-sm">Email Automation</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Smart Communication <span className="text-gradient">at Scale</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-8">
              Streamline your candidate communication with intelligent automation. Send personalized emails, 
              schedule interviews, and keep candidates engaged throughout the hiring process.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-warning-10 to-warning-20 hover:from-warning-20 hover:to-warning-10 rounded-full font-semibold smooth-transition hover:scale-105 hover:shadow-2xl hover:shadow-warning-10/50">
                Start Campaign
              </button>
              <button className="px-8 py-4 glass hover:glass-strong hover:border-warning-10/30 rounded-full font-semibold smooth-transition hover:scale-105">
                View Templates
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Powerful Email Automation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass hover:glass-strong hover:border-warning-10/30 rounded-2xl p-8 smooth-transition group hover:translate-y-[-4px]"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-warning-10 to-warning-20 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 smooth-transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-warning-20 smooth-transition">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Capabilities Section */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-strong rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Complete Email Solution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {capabilities.map((capability, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-warning-20 flex-shrink-0" />
                  <span className="text-lg text-gray-300">{capability}</span>
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
