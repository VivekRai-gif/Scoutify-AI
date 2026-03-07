import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  label: string;
  value: number;
  color?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  color = '#FFD166',
  showPercentage = true
}) => {
  const getBarColor = () => {
    if (color) return color;
    if (value >= 80) return '#10b981';
    if (value >= 60) return '#FFD166';
    return '#F4A261';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        {showPercentage && (
          <span className="text-sm font-bold text-neutral-900">{value}%</span>
        )}
      </div>
      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: getBarColor() }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
