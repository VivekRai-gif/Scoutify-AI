import React from 'react';
import { DashboardCard } from './DashboardCard';
import { ProgressBar } from './ProgressBar';
import { TrendingUp } from 'lucide-react';

interface SkillData {
  skill: string;
  level: number;
  required?: boolean;
}

interface SkillGapChartProps {
  skills: SkillData[];
  title?: string;
}

export const SkillGapChart: React.FC<SkillGapChartProps> = ({
  skills = [],
  title = 'Skill Analysis'
}) => {
  return (
    <DashboardCard>
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
      </div>

      <div className="space-y-4">
        {skills.length > 0 ? (
          skills.map((skill, idx) => (
            <div key={idx}>
              <ProgressBar
                label={skill.skill}
                value={skill.level}
                color={skill.required ? '#F4A261' : '#FFD166'}
                showPercentage={true}
              />
            </div>
          ))
        ) : (
          <p className="text-sm text-neutral-500 text-center py-4">
            No skill data available
          </p>
        )}
      </div>
    </DashboardCard>
  );
};
