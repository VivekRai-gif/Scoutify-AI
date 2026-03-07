import React from 'react';
import { DashboardCard } from './DashboardCard';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface JobSafetyCardProps {
  rating: string;
  redFlagsCount: number;
  recommendation: string;
  redFlags?: string[];
}

export const JobSafetyCard: React.FC<JobSafetyCardProps> = ({
  rating,
  redFlagsCount,
  recommendation,
  redFlags = []
}) => {
  const getSafetyBadge = () => {
    if (rating === 'safe') {
      return {
        icon: <CheckCircle className="w-6 h-6" />,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        label: 'SAFE'
      };
    }
    if (rating === 'caution') {
      return {
        icon: <AlertTriangle className="w-6 h-6" />,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        label: 'CAUTION'
      };
    }
    return {
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      label: 'RISK'
    };
  };

  const badge = getSafetyBadge();

  return (
    <DashboardCard>
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-neutral-900">Job Safety Check</h3>
      </div>

      {/* Safety Badge */}
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${badge.bg} ${badge.border} border`}>
        <span className={badge.color}>{badge.icon}</span>
        <span className={`font-bold ${badge.color}`}>{badge.label}</span>
      </div>

      <p className="text-sm text-neutral-600 mb-4">{recommendation}</p>

      {/* Red Flags */}
      {redFlagsCount > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-700 font-semibold text-sm mb-2">
            <AlertTriangle className="w-4 h-4" />
            {redFlagsCount} Red Flag{redFlagsCount > 1 ? 's' : ''} Detected
          </div>
          {redFlags.length > 0 && (
            <ul className="text-xs text-yellow-600 space-y-1">
              {redFlags.slice(0, 3).map((flag, idx) => (
                <li key={idx}>• {flag}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </DashboardCard>
  );
};
