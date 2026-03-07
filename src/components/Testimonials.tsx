import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "matchly has been instrumental in transforming our online presence. Their team's expertise in web development and design resulted in a visually stunning and user-friendly website that perfectly aligns with our brand. We couldn't be happier with the results!",
      name: 'John Smith',
      title: 'CEO of TechStart',
      company: 'Open Website',
      avatar: '👤',
      color: 'lime',
    },
    {
      quote: "Working with matchly was a breeze. They understood our unique needs and delivered a custom web solution that exceeded our expectations. Our new website streamlines ordering and empowers our customers to make informed choices online.",
      name: 'Sarah Johnson',
      title: 'Founder of HappyMeals',
      company: 'Open Website',
      avatar: '👤',
      color: 'green',
    },
  ];

  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight"
          >
            What our <span className="text-gradient">Clients</span> say About us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            At matchly, we take pride in delivering exceptional and client satisfaction. Here are some of the kind words our clients have to say about their experience working with us.
          </motion.p>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <div className="glass hover:glass-strong hover:border-primary-10/30 rounded-3xl p-8 smooth-transition hover:glow-border h-full flex flex-col group-hover:translate-y-[-4px]">
                {/* Quote */}
                <p className="text-gray-300 mb-8 flex-grow leading-relaxed text-[15px]">
                  "{testimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-10 to-primary-20 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-primary-10/20">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>

                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm text-primary-10 hover:text-primary-20 transition-colors group-hover:gap-3"
                  >
                    {testimonial.company}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
