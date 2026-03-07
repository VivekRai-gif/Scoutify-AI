import React, { useState } from 'react';
import { 
  FileText, 
  Shield, 
  Award, 
  Mail,
  CheckCircle,
  AlertTriangle,
  Target,
  Brain,
  Zap,
  Upload,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

// Import Dashboard Components
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { ProfileCard } from '../components/dashboard/ProfileCard';
import { JobSafetyCard } from '../components/dashboard/JobSafetyCard';
import { SkillListCard } from '../components/dashboard/SkillListCard';
import { SkillGapChart } from '../components/dashboard/SkillGapChart';
import { EmailGeneratorCard } from '../components/dashboard/EmailGeneratorCard';
import { ActivityTimeline } from '../components/dashboard/ActivityTimeline';
import { CircularProgress } from '../components/dashboard/CircularProgress';

interface QuickSafetyCheck {
  safety_rating: string;
  red_flags_count: number;
  recommendation: string;
  red_flags?: string[];
}

interface JobSafetyData {
  success: boolean;
  quick_safety_check: QuickSafetyCheck;
}

interface IntelligenceResult {
  resume_intelligence: any;
  skill_match_analysis: any;
  bias_free_evaluation: any;
  job_safety_check: JobSafetyData;
  company_name: string;
}

export const CandidateIntelligence = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IntelligenceResult | null>(null);
  const [generatedEmail, setGeneratedEmail] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleAnalysis = async () => {
    if (!resumeFile || !jobDescription) {
      alert('Please upload your resume and enter the job description');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);
    formData.append('companyName', companyName || 'the company');

    try {
      const response = await fetch('http://localhost:5000/api/candidate/career-intelligence', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (data.success) {
        setResult(data.candidate_intelligence);
      } else {
        alert('Analysis failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateEmail = async () => {
    if (!result) {
      alert('Please run the analysis first');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/email/craft-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume_data: JSON.stringify(result.resume_intelligence),
          job_description: jobDescription,
          company_name: companyName || 'the company',
          tone: 'professional'
        }),
      });
      const data = await response.json();
      
      if (data.success) {
        setGeneratedEmail(data.email);
      } else {
        alert('Email generation failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen" style={{ background: 'linear-gradient(135deg, #F5F5F5 0%, #EDEAE4 100%)' }}>
      <Navbar />
      
      {/* Dashboard Container */}
      <div className="pt-24 pb-20 px-4">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-neutral-600">Live AI Analysis</span>
              </div>
              <h1 className="text-4xl font-bold text-neutral-900">
                AI Career Intelligence Dashboard
              </h1>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-white rounded-full shadow-md border border-neutral-200"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-neutral-900">Powered by AI</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Input Section - Full Width Card */}
        {!result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[1400px] mx-auto mb-8"
          >
            <DashboardCard className="p-8" hover={false}>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-10 h-10 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Start Your Career Intelligence Analysis
                </h2>
                <p className="text-neutral-600">
                  Upload your resume and paste the job description to unlock AI-powered insights
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-neutral-900">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Your Resume
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="w-full px-5 py-4 bg-white border-2 border-neutral-200 rounded-2xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 focus:outline-none transition-all text-sm"
                    />
                    {resumeFile && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3 px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-medium">{resumeFile.name}</span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-neutral-900">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., Google, Microsoft, Amazon"
                    className="w-full px-5 py-4 bg-white border-2 border-neutral-200 rounded-2xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 focus:outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3 text-neutral-900">
                  <Target className="w-4 h-4 inline mr-2" />
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here..."
                  rows={10}
                  className="w-full px-5 py-4 bg-white border-2 border-neutral-200 rounded-2xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 focus:outline-none resize-none transition-all text-sm"
                />
              </div>

              {/* Analyze Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalysis}
                disabled={loading || !resumeFile || !jobDescription}
                className="w-full px-8 py-5 bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 hover:from-yellow-500 hover:via-orange-500 hover:to-orange-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_10px_30px_rgba(255,165,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,165,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Analyzing with AI...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-6 h-6" />
                    <span>Analyze My Job Fit</span>
                  </>
                )}
              </motion.button>
            </DashboardCard>
          </motion.div>
        )}

        {/* 3-COLUMN DASHBOARD LAYOUT */}
        {result && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-[1400px] mx-auto"
          >
            {/* Main Grid - 3 Columns */}
            <div className="grid grid-cols-12 gap-6 mb-6">
              
              {/* LEFT COLUMN - Profile & Activity (3 columns) */}
              <div className="col-span-12 lg:col-span-3 space-y-6">
                {/* Profile Card */}
                <ProfileCard
                  candidateName="Candidate"
                  role="Job Seeker"
                  resumeStrength={result.skill_match_analysis?.overall_match_score || 0}
                />

                {/* Activity Timeline */}
                <ActivityTimeline />

                {/* Application Stats */}
                <DashboardCard>
                  <h3 className="text-lg font-bold text-neutral-900 mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Resume Uploaded</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Job Analyzed</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Match Score</span>
                      <span className="text-sm font-bold text-orange-600">
                        {result.skill_match_analysis?.overall_match_score || 0}%
                      </span>
                    </div>
                  </div>
                </DashboardCard>
              </div>

              {/* CENTER COLUMN - Intelligence Cards (6 columns) */}
              <div className="col-span-12 lg:col-span-6 space-y-6">
                {/* Top KPI Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Match Score - Circular Progress */}
                  <DashboardCard className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-orange-500" />
                      <h3 className="text-sm font-bold text-neutral-900">Match Score</h3>
                    </div>
                    <div className="flex justify-center mb-2">
                      <CircularProgress 
                        value={result.skill_match_analysis?.overall_match_score || 0}
                        size={100}
                        strokeWidth={8}
                        color="#FFD166"
                      />
                    </div>
                    <p className="text-xs text-neutral-600">Job Compatibility</p>
                  </DashboardCard>

                  {/* Skill Coverage */}
                  <DashboardCard className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                      <h3 className="text-sm font-bold text-neutral-900">Skill Coverage</h3>
                    </div>
                    <div className="text-5xl font-bold text-blue-600 mb-2">
                      {Math.round((result.skill_match_analysis?.skill_alignment?.matched_skills?.length || 0) / 
                        ((result.skill_match_analysis?.skill_alignment?.matched_skills?.length || 0) + 
                        (result.skill_match_analysis?.skill_alignment?.missing_critical_skills?.length || 1)) * 100)}%
                    </div>
                    <p className="text-xs text-neutral-600">Skills Matched</p>
                  </DashboardCard>
                </div>

                {/* Job Safety Card */}
                <JobSafetyCard
                  rating={result.job_safety_check?.quick_safety_check?.safety_rating || 'safe'}
                  redFlagsCount={result.job_safety_check?.quick_safety_check?.red_flags_count || 0}
                  recommendation={result.job_safety_check?.quick_safety_check?.recommendation || 'No issues detected'}
                  redFlags={result.job_safety_check?.quick_safety_check?.red_flags || []}
                />

                {/* Matched Skills */}
                <SkillListCard
                  title="Matched Skills"
                  skills={result.skill_match_analysis?.skill_alignment?.matched_skills || []}
                  type="matched"
                />

                {/* Missing Skills */}
                <SkillListCard
                  title="Skill Gaps to Address"
                  skills={result.skill_match_analysis?.skill_alignment?.missing_critical_skills || []}
                  type="missing"
                />

                {/* Skill Gap Chart */}
                {result.skill_match_analysis?.skill_alignment?.matched_skills && (
                  <SkillGapChart
                    title="Top Skills Analysis"
                    skills={[
                      ...result.skill_match_analysis.skill_alignment.matched_skills.slice(0, 3).map((s: any) => ({
                        skill: typeof s === 'string' ? s : s.skill || s.name,
                        level: 85,
                        required: false
                      })),
                      ...result.skill_match_analysis.skill_alignment.missing_critical_skills.slice(0, 3).map((s: any) => ({
                        skill: typeof s === 'string' ? s : s.skill || s.name,
                        level: 30,
                        required: true
                      }))
                    ]}
                  />
                )}
              </div>

              {/* RIGHT COLUMN - Actions & Email (3 columns) */}
              <div className="col-span-12 lg:col-span-3 space-y-6">
                {/* Email Generator */}
                <EmailGeneratorCard
                  onGenerate={handleGenerateEmail}
                  loading={loading}
                  generated={!!generatedEmail}
                  email={generatedEmail}
                />

                {/* Action Buttons */}
                {!generatedEmail && (
                  <DashboardCard>
                    <h3 className="text-lg font-bold text-neutral-900 mb-4">Next Steps</h3>
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGenerateEmail}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Generate Email
                      </motion.button>
                      
                      <button
                        onClick={() => window.location.reload()}
                        className="w-full px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl font-semibold text-sm transition-all"
                      >
                        New Analysis
                      </button>
                    </div>
                  </DashboardCard>
                )}

                {/* Insights Card */}
                <DashboardCard>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-lg font-bold text-neutral-900">AI Insights</h3>
                  </div>
                  <div className="space-y-3 text-sm text-neutral-700">
                    <p className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      💡 <strong>Tip:</strong> {result.skill_match_analysis?.recommendation || 'Focus on highlighting your matched skills'}
                    </p>
                    {result.skill_match_analysis?.overall_match_score >= 70 && (
                      <p className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        ✅ Strong match! Apply with confidence.
                      </p>
                    )}
                    {result.job_safety_check?.quick_safety_check?.red_flags_count === 0 && (
                      <p className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        🛡️ Job posting looks legitimate and safe.
                      </p>
                    )}
                  </div>
                </DashboardCard>
              </div>
            </div>

            {/* Bottom Analytics Section */}
            <div className="mt-6">
              <DashboardCard>
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Detailed Analysis</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {result.skill_match_analysis?.skill_alignment?.matched_skills?.length || 0}
                    </div>
                    <div className="text-sm text-neutral-600">Skills Matched</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
                    <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {result.skill_match_analysis?.skill_alignment?.missing_critical_skills?.length || 0}
                    </div>
                    <div className="text-sm text-neutral-600">Skills to Develop</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {result.job_safety_check?.quick_safety_check?.safety_rating?.toUpperCase() || 'SAFE'}
                    </div>
                    <div className="text-sm text-neutral-600">Job Safety Status</div>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </motion.div>
        )}

        {/* Features Section - Only show when no analysis */}
        {!result && (
          <div className="max-w-[1400px] mx-auto mt-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Powered by Advanced AI Intelligence
              </h2>
              <p className="text-neutral-600">
                Comprehensive career analysis using cutting-edge AI technology
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardCard>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Resume Intelligence</h3>
                  <p className="text-sm text-neutral-600">
                    AI extracts and analyzes your skills, experience, and qualifications with precision
                  </p>
                </DashboardCard>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardCard>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Smart Matching</h3>
                  <p className="text-sm text-neutral-600">
                    Get exact match percentage and identify skill gaps with actionable recommendations
                  </p>
                </DashboardCard>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardCard>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Job Safety Check</h3>
                  <p className="text-sm text-neutral-600">
                    Detect suspicious postings and protect yourself from potential scams automatically
                  </p>
                </DashboardCard>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardCard>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Bias-Free Evaluation</h3>
                  <p className="text-sm text-neutral-600">
                    Skill-focused assessment that removes demographic bias for truly fair analysis
                  </p>
                </DashboardCard>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardCard>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Email Generation</h3>
                  <p className="text-sm text-neutral-600">
                    AI-crafted application emails personalized to the job and your unique profile
                  </p>
                </DashboardCard>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardCard>
                  <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Instant Analysis</h3>
                  <p className="text-sm text-neutral-600">
                    Comprehensive career intelligence delivered in seconds with detailed insights
                  </p>
                </DashboardCard>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CandidateIntelligence;
