import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ 
  children, 
  className = '', 
  hover = true 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`
        bg-white rounded-[20px] p-6 
        shadow-[0_10px_30px_rgba(0,0,0,0.05)]
        border border-neutral-100
        transition-all duration-300
        ${hover ? 'hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};
