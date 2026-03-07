import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export const ContactSection = () => {
  const [budget, setBudget] = useState(5000);

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-black to-neutral-900">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-primary"
          >
            <img 
              src="/matchlylogo.png" 
              alt="matchly" 
              className="h-12 w-auto brightness-200"
            />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight"
          >
            Thank you for your Interest in <span className="text-gradient">matchly</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-neutral-400 text-lg leading-relaxed"
          >
            We would love to hear from you and discuss how we can help bring your digital ideas to life. 
            Here are the different ways you can get in touch with us.
          </motion.p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="space-y-6"
        >
          {/* Name and Email */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-white font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full px-5 py-4 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Type here"
                className="w-full px-5 py-4 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
              />
            </div>
          </motion.div>

          {/* Why are you contacting us */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <label className="block text-white font-medium mb-3">
              Why are you contacting us?
            </label>
            <div className="grid grid-cols-2 gap-4">
              {['Web Design', 'Collaboration', 'Mobile App Design', 'Others'].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 p-4 bg-neutral-900 border border-neutral-700 hover:border-primary-500 hover:bg-neutral-800 rounded-xl cursor-pointer transition-all group"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
                  />
                  <span className="text-neutral-300 group-hover:text-primary-400 transition-colors">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Budget Slider */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <label className="block text-white font-medium mb-2">
              Your Budget
            </label>
            <p className="text-sm text-neutral-400 mb-4">
              Slide to indicate your budget range
            </p>
            <div className="relative">
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((budget - 100) / (10000 - 100)) * 100}%, #e5e7eb ${((budget - 100) / (10000 - 100)) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between mt-2 text-sm text-neutral-400">
                <span>$100</span>
                <span className="text-primary-400 font-semibold">${budget}</span>
                <span>$10000</span>
              </div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <label className="block text-white font-medium mb-2">
              Your Message
            </label>
            <textarea
              placeholder="Type here"
              rows={5}
              className="w-full px-5 py-4 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all resize-none"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="group px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-primary flex items-center gap-2 mx-auto text-lg"
          >
            Submit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};
