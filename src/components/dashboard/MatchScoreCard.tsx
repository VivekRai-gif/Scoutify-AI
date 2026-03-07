import React from 'react';
import { DashboardCard } from './DashboardCard';
import { CircularProgress } from './CircularProgress';
import { Target } from 'lucide-react';

interface MatchScoreCardProps {
  score: number;
  recommendation?: string;
}

export const MatchScoreCard: React.FC<MatchScoreCardProps> = ({
  score,
  recommendation = 'Analyzing your fit...'
}) => {
  const getScoreColor = () => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#FFD166';
    return '#F4A261';
  };

  return (
    <DashboardCard className="text-center">
      <div className="flex items-center gap-2 justify-center mb-4">
        <Target className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-bold text-neutral-900">Job Match Score</h3>
      </div>
      
      <div className="flex justify-center mb-4">
        <CircularProgress 
          value={score} 
          color={getScoreColor()} 
          label="Match"
          size={140}
          strokeWidth={10}
        />
      </div>

      <p className="text-sm text-neutral-600">{recommendation}</p>
    </DashboardCard>
  );
};

