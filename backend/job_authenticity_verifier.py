"""
Job Authenticity Verification Module
Analyzes job postings to detect fake or suspicious listings
"""

import google.generativeai as genai
import json
import re
from typing import Dict, List
from datetime import datetime


class JobAuthenticityVerifier:
    """Verify authenticity and safety of job postings"""
    
    def __init__(self, gemini_api_key: str):
        genai.configure(api_key=gemini_api_key)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Red flags to check
        self.red_flags = [
            'upfront payment required',
            'too good to be true salary',
            'vague job description',
            'no company verification',
            'personal email domain',
            'work from home only with high pay',
            'cryptocurrency/MLM keywords',
            'unrealistic promises'
        ]
    
    def verify_job_posting(self, job_description: str, company_name: str = None, salary_info: str = None) -> Dict:
        """Analyze job posting for authenticity and safety"""
        try:
            prompt = f"""Analyze this job posting for authenticity and potential red flags.
Act as a job safety expert and identify any suspicious patterns.

JOB DESCRIPTION:
{job_description[:3000]}

COMPANY NAME: {company_name or 'Not provided'}
SALARY INFO: {salary_info or 'Not provided'}

Analyze and return a detailed JSON response:
{{
    "authenticity_score": 0-100,
    "safety_rating": "safe/caution/suspicious/scam",
    "trust_level": "high/medium/low/very_low",
    
    "red_flags_detected": [
        {{
            "category": "payment_request/unrealistic_salary/vague_description/contact_issues/company_verification/other",
            "severity": "critical/high/medium/low",
            "description": "what the red flag is",
            "evidence": "specific text from posting that triggered this"
        }}
    ],
    
    "verification_signals": {{
        "company_details_clear": true/false,
        "role_description_detailed": true/false,
        "reasonable_requirements": true/false,
        "professional_contact_info": true/false,
        "salary_range_realistic": true/false,
        "legitimate_work_structure": true/false
    }},
    
    "positive_indicators": [
        "list of positive signs that suggest legitimacy"
    ],
    
    "warning_signs": [
        "list of concerning elements"
    ],
    
    "candidate_advice": "clear advice for the candidate about this opportunity",
    
    "recommendation": "apply_confidently/apply_with_caution/research_more/avoid",
    
    "verification_checklist": [
        {{
            "item": "what to verify",
            "priority": "high/medium/low",
            "how_to_verify": "specific steps candidate should take"
        }}
    ],
    
    "overall_assessment": "detailed assessment summary"
}}

Be thorough and err on the side of caution to protect job seekers."""

            response = self.model.generate_content(prompt)
            result_text = response.text.strip()
            
            # Clean up markdown formatting
            result_text = result_text.replace('```json', '').replace('```', '').strip()
            
            result = json.loads(result_text)
            
            return {
                'success': True,
                'verification': result,
                'analyzed_at': datetime.now().isoformat(),
                'confidence': 'high' if result.get('authenticity_score', 0) > 70 else 'medium' if result.get('authenticity_score', 0) > 40 else 'low'
            }
            
        except json.JSONDecodeError as e:
            return {
                'success': False,
                'error': f'Failed to parse AI response: {str(e)}',
                'raw_response': result_text if 'result_text' in locals() else None
            }
        except Exception as e:
            return {
                'success': False,
                'error': f'Verification failed: {str(e)}'
            }
    
    def quick_safety_check(self, job_description: str) -> Dict:
        """Quick safety check for immediate red flags"""
        try:
            red_flags_found = []
            
            # Check for common scam keywords
            scam_keywords = [
                r'pay.*upfront', r'advance.*fee', r'processing.*fee',
                r'work.*from.*home.*\$\d{3,}', r'easy.*money',
                r'no.*experience.*needed.*high.*pay', r'guaranteed.*income',
                r'act.*now', r'limited.*spots', r'wire.*transfer',
                r'western.*union', r'gift.*card', r'bitcoin',
                r'MLM', r'multi-level', r'pyramid'
            ]
            
            for keyword in scam_keywords:
                if re.search(keyword, job_description, re.IGNORECASE):
                    red_flags_found.append(keyword)
            
            # Check email domains
            personal_email_domains = r'@(gmail|yahoo|hotmail|outlook|aol|protonmail)\.com'
            if re.search(personal_email_domains, job_description, re.IGNORECASE):
                red_flags_found.append('personal_email_domain')
            
            # Determine safety level
            if len(red_flags_found) >= 3:
                safety_rating = 'scam'
            elif len(red_flags_found) == 2:
                safety_rating = 'suspicious'
            elif len(red_flags_found) == 1:
                safety_rating = 'caution'
            else:
                safety_rating = 'safe'
            
            return {
                'success': True,
                'quick_safety_check': {
                    'safety_rating': safety_rating,
                    'red_flags_count': len(red_flags_found),
                    'red_flags': red_flags_found,
                    'recommendation': 'Proceed with full verification' if safety_rating in ['safe', 'caution'] else 'High risk - avoid or verify thoroughly'
                }
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': f'Quick check failed: {str(e)}'
            }
    
    def compare_with_industry_standards(self, job_description: str, job_role: str, experience_level: str) -> Dict:
        """Compare job posting with industry standards"""
        try:
            prompt = f"""Compare this job posting with industry standards for the role.

JOB ROLE: {job_role}
EXPERIENCE LEVEL: {experience_level}

JOB DESCRIPTION:
{job_description[:2000]}

Analyze and return JSON:
{{
    "salary_alignment": "above_market/market_rate/below_market/unrealistic/not_specified",
    "requirements_reasonable": true/false,
    "responsibilities_match_role": true/false,
    "industry_standard_comparison": "detailed comparison",
    "notable_deviations": ["list any unusual aspects"],
    "legitimacy_indicators": ["what suggests this is real"],
    "concerns": ["what seems off"]
}}"""

            response = self.model.generate_content(prompt)
            result_text = response.text.strip().replace('```json', '').replace('```', '').strip()
            result = json.loads(result_text)
            
            return {
                'success': True,
                'industry_comparison': result
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': f'Comparison failed: {str(e)}'
            }
