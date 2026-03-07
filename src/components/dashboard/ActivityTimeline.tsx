import React from 'react';
import { DashboardCard } from './DashboardCard';
import { Activity, Calendar } from 'lucide-react';

interface ActivityTimelineProps {
  activities?: Array<{
    title: string;
    date: string;
    status: 'completed' | 'pending' | 'in-progress';
  }>;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  activities = []
}) => {
  const defaultActivities = [
    { title: 'Resume Analyzed', date: 'Today', status: 'completed' as const },
    { title: 'Job Match Calculated', date: 'Today', status: 'completed' as const },
    { title: 'Email Generated', date: 'Today', status: 'in-progress' as const },
    { title: 'Application Sent', date: 'Pending', status: 'pending' as const }
  ];

  const items = activities.length > 0 ? activities : defaultActivities;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      default:
        return 'bg-neutral-300';
    }
  };

  return (
    <DashboardCard>
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-neutral-900">Application Progress</h3>
      </div>

      <div className="space-y-4">
        {items.map((activity, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="relative">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(activity.status)}`} />
              {idx < items.length - 1 && (
                <div className="absolute top-3 left-1/2 w-0.5 h-8 bg-neutral-200 -translate-x-1/2" />
              )}
            </div>
            <div className="flex-1 pb-2">
              <div className="text-sm font-medium text-neutral-900">{activity.title}</div>
              <div className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3" />
                {activity.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
