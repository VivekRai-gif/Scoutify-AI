import React from 'react';
import { DashboardCard } from './DashboardCard';
import { Mail, Copy, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmailGeneratorCardProps {
  onGenerate: () => void;
  loading?: boolean;
  generated?: boolean;
  email?: {
    subject_line: string;
    email_body: string;
    sending_tips?: string[];
  };
}

export const EmailGeneratorCard: React.FC<EmailGeneratorCardProps> = ({
  onGenerate,
  loading = false,
  generated = false,
  email
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (!generated || !email) {
    return (
      <DashboardCard className="text-center">
        <div className="py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-purple-600" />
          </div>
          
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            AI Email Generator
          </h3>
          
          <p className="text-sm text-neutral-600 mb-6">
            Generate a personalized application email based on your analysis
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGenerate}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 inline-flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                Generate Email
              </>
            )}
          </motion.button>
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-neutral-900">Application Email</h3>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => copyToClipboard(`${email.subject_line}\n\n${email.email_body}`)}
            className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
            title="Copy all"
          >
            <Copy className="w-4 h-4 text-neutral-600" />
          </motion.button>
        </div>
      </div>

      {/* Subject Line */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-neutral-700 uppercase">Subject</label>
          <button
            onClick={() => copyToClipboard(email.subject_line)}
            className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            <Copy className="w-3 h-3" />
            Copy
          </button>
        </div>
        <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg text-sm font-medium text-neutral-800">
          {email.subject_line}
        </div>
      </div>

      {/* Email Body */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-neutral-700 uppercase">Body</label>
          <button
            onClick={() => copyToClipboard(email.email_body)}
            className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            <Copy className="w-3 h-3" />
            Copy
          </button>
        </div>
        <div className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-700 whitespace-pre-wrap max-h-64 overflow-y-auto">
          {email.email_body}
        </div>
      </div>

      {/* Sending Tips */}
      {email.sending_tips && email.sending_tips.length > 0 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="text-xs font-semibold text-yellow-800 mb-2 flex items-center gap-1">
            <Send className="w-3 h-3" />
            Sending Tips
          </h4>
          <ul className="space-y-1 text-xs text-yellow-700">
            {email.sending_tips.slice(0, 3).map((tip, idx) => (
              <li key={idx}>• {tip}</li>
            ))}
          </ul>
        </div>
      )}
    </DashboardCard>
  );
};
