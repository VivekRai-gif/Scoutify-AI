import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, Mail, Shield, Target, Loader, CheckCircle, AlertCircle } from 'lucide-react';

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureType: 'resume' | 'match' | 'job-safety' | 'email';
}

export const FeatureModal: React.FC<FeatureModalProps> = ({ isOpen, onClose, featureType }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  // Form states
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');

  const resetForm = () => {
    setResumeFile(null);
    setResumeText('');
    setJobDescription('');
    setCompanyName('');
    setResult(null);
    setError('');
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Resume Intelligence Agent
  const handleResumeAnalysis = async () => {
    if (!resumeFile && !resumeText) {
      setError('Please upload a resume or paste resume text');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      const response = await fetch('http://localhost:5000/api/skills/extract', {
        method: 'POST',
        body: resumeFile ? formData : JSON.stringify({ resume_text: resumeText }),
        headers: resumeFile ? {} : { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Skill Match & Gap Agent
  const handleSkillMatch = async () => {
    if (!resumeFile || !jobDescription) {
      setError('Please upload resume and provide job description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('jobDescription', jobDescription);

      const response = await fetch('http://localhost:5000/api/match/transparent', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Match analysis failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Job Authenticity Verification Agent
  const handleJobSafety = async () => {
    if (!jobDescription) {
      setError('Please provide job description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/job/quick-safety-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_description: jobDescription }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Safety check failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Email Crafting Agent
  const handleEmailCraft = async () => {
    if (!resumeText || !jobDescription || !companyName) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/email/craft-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume_data: resumeText,
          job_description: jobDescription,
          company_name: companyName,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Email generation failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (featureType) {
      case 'resume':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Resume Intelligence Agent</h3>
                  <p className="text-neutral-400 text-sm">Extract structured skills and experience from resumes</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Upload Resume</label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-neutral-800 border-2 border-dashed border-neutral-600 hover:border-primary-500 rounded-xl cursor-pointer transition-all"
                  >
                    <Upload className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-300">
                      {resumeFile ? resumeFile.name : 'Click to upload resume (PDF, DOC, DOCX)'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="text-center text-neutral-500">OR</div>

              <div>
                <label className="block text-white font-medium mb-2">Paste Resume Text</label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  rows={6}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all resize-none"
                />
              </div>

              <button
                onClick={handleResumeAnalysis}
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  'Analyze Resume'
                )}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-900/20 border border-red-500/50 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4 p-6 bg-neutral-900 border border-primary-500/30 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h4 className="text-xl font-bold text-white">Analysis Complete</h4>
                </div>
                
                <div className="space-y-3">
                  {result.skills && (
                    <div>
                      <h5 className="text-white font-semibold mb-2">Extracted Skills:</h5>
                      <div className="flex flex-wrap gap-2">
                        {result.skills.map((skill: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 bg-primary-900/50 text-primary-300 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {result.experience && (
                    <div>
                      <h5 className="text-white font-semibold mb-2">Experience:</h5>
                      <p className="text-neutral-300">{result.experience}</p>
                    </div>
                  )}

                  <div className="text-neutral-400 text-sm">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'match':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Skill Match & Gap Agent</h3>
                  <p className="text-neutral-400 text-sm">Calculate match score and identify missing skills</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Upload Resume</label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="resume-upload-match"
                  />
                  <label
                    htmlFor="resume-upload-match"
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-neutral-800 border-2 border-dashed border-neutral-600 hover:border-primary-500 rounded-xl cursor-pointer transition-all"
                  >
                    <Upload className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-300">
                      {resumeFile ? resumeFile.name : 'Click to upload resume'}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  rows={8}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all resize-none"
                />
              </div>

              <button
                onClick={handleSkillMatch}
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing Match...
                  </>
                ) : (
                  'Calculate Match Score'
                )}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-900/20 border border-red-500/50 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4 p-6 bg-neutral-900 border border-green-500/30 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h4 className="text-xl font-bold text-white">Match Analysis Complete</h4>
                </div>
                
                <div className="text-neutral-400 text-sm">
                  <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        );

      case 'job-safety':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Job Authenticity Verification</h3>
                  <p className="text-neutral-400 text-sm">Detect fake or suspicious job postings</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description to verify..."
                  rows={10}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all resize-none"
                />
              </div>

              <button
                onClick={handleJobSafety}
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Verifying Job...
                  </>
                ) : (
                  'Verify Job Safety'
                )}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-900/20 border border-red-500/50 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4 p-6 bg-neutral-900 border border-orange-500/30 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h4 className="text-xl font-bold text-white">Safety Check Complete</h4>
                </div>
                
                <div className="text-neutral-400 text-sm">
                  <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        );

      case 'email':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Email Crafting Agent</h3>
                  <p className="text-neutral-400 text-sm">Generate personalized application emails</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Your Resume/Profile Summary</label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume or profile summary..."
                  rows={4}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Google, Microsoft, Apple"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description..."
                  rows={6}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all resize-none"
                />
              </div>

              <button
                onClick={handleEmailCraft}
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Generating Email...
                  </>
                ) : (
                  'Generate Email'
                )}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-900/20 border border-red-500/50 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4 p-6 bg-neutral-900 border border-purple-500/30 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h4 className="text-xl font-bold text-white">Email Generated</h4>
                </div>
                
                <div className="text-neutral-400 text-sm">
                  <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-800 border border-neutral-700 rounded-3xl shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 rounded-full transition-all z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Content */}
            <div className="p-8">
              {renderContent()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
