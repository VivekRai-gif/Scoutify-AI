import React from 'react';
import { DashboardCard } from './DashboardCard';
import { ProgressBar } from './ProgressBar';
import { User, Briefcase, Mail, Phone } from 'lucide-react';

interface ProfileCardProps {
  candidateName?: string;
  role?: string;
  resumeStrength?: number;
  email?: string;
  phone?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  candidateName = 'Candidate',
  role = 'Job Seeker',
  resumeStrength = 0,
  email,
  phone
}) => {
  return (
    <DashboardCard hover={false} className="text-center">
      {/* Avatar */}
      <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-orange-200 to-yellow-200 flex items-center justify-center mb-4 border-4 border-white shadow-md">
        <User className="w-12 h-12 text-orange-600" />
      </div>

      {/* Name & Role */}
      <h3 className="text-xl font-bold text-neutral-900 mb-1">{candidateName}</h3>
      <p className="text-sm text-neutral-600 mb-6 flex items-center justify-center gap-2">
        <Briefcase className="w-4 h-4" />
        {role}
      </p>

      {/* Resume Strength */}
      <div className="mb-6">
        <ProgressBar 
          label="Resume Strength" 
          value={resumeStrength} 
          color="#FFD166"
        />
      </div>

      {/* Contact Info */}
      {(email || phone) && (
        <div className="pt-4 border-t border-neutral-100 space-y-2 text-left">
          {email && (
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Mail className="w-4 h-4" />
              <span className="truncate">{email}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Phone className="w-4 h-4" />
              <span>{phone}</span>
            </div>
          )}
        </div>
      )}
    </DashboardCard>
  );
};
