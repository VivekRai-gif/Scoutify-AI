import React from 'react';
import { DashboardCard } from './DashboardCard';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface SkillListCardProps {
  title: string;
  skills: any[];
  type: 'matched' | 'missing';
  icon?: React.ReactNode;
}

export const SkillListCard: React.FC<SkillListCardProps> = ({
  title,
  skills = [],
  type,
  icon
}) => {
  const isMatched = type === 'matched';
  const IconComponent = isMatched ? CheckCircle : AlertTriangle;
  const iconColor = isMatched ? 'text-green-600' : 'text-orange-500';
  const itemColor = isMatched ? 'text-green-700' : 'text-orange-700';
  const bgColor = isMatched ? 'bg-green-50' : 'bg-orange-50';

  return (
    <DashboardCard>
      <div className="flex items-center gap-2 mb-4">
        {icon || <IconComponent className={`w-5 h-5 ${iconColor}`} />}
        <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
      </div>

      <div className="space-y-2">
        {skills.length > 0 ? (
          skills.slice(0, 6).map((skill, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${bgColor}`}
            >
              <IconComponent className={`w-4 h-4 ${iconColor}`} />
              <span className={`text-sm font-medium ${itemColor}`}>
                {typeof skill === 'string' ? skill : skill.skill || skill.name}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-neutral-500 text-center py-4">
            {isMatched ? 'No matched skills found' : 'No skill gaps identified'}
          </p>
        )}
      </div>

      {skills.length > 6 && (
        <div className="mt-4 text-sm text-neutral-500 text-center">
          +{skills.length - 6} more
        </div>
      )}
    </DashboardCard>
  );
};
