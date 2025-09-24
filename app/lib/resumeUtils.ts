// Helper functions for resume building based on AI feedback

export const generateResumeHelpText = (feedback: Feedback) => {
    const suggestions: { [key: string]: string[] } = {
        personalInfo: [
            "Ensure your contact information is professional and up-to-date",
            "Include a professional email address",
            "Add your LinkedIn profile if available"
        ],
        summary: [],
        experience: [],
        skills: [],
        education: [
            "List your education in reverse chronological order",
            "Include relevant coursework if you're a recent graduate"
        ],
        projects: [
            "Showcase projects that demonstrate relevant skills",
            "Include links to live demos and source code when possible"
        ],
        certifications: [
            "List industry-relevant certifications",
            "Include expiration dates if applicable"
        ]
    };

    // Add specific suggestions based on feedback
    if (feedback.content?.tips) {
        feedback.content.tips.forEach(tip => {
            if (tip.type === 'improve') {
                if (tip.tip.toLowerCase().includes('summary') || tip.tip.toLowerCase().includes('objective')) {
                    suggestions.summary.push(tip.tip);
                } else {
                    suggestions.experience.push(tip.tip);
                }
            }
        });
    }

    if (feedback.skills?.tips) {
        feedback.skills.tips.forEach(tip => {
            if (tip.type === 'improve') {
                suggestions.skills.push(tip.tip);
            }
        });
    }

    // Add default suggestions if none from AI
    if (suggestions.summary.length === 0) {
        suggestions.summary = [
            "Write a compelling 2-3 sentence summary highlighting your key skills and achievements",
            "Focus on what makes you unique and valuable to employers",
            "Avoid generic statements and include specific accomplishments"
        ];
    }

    if (suggestions.experience.length === 0) {
        suggestions.experience = [
            "Use action verbs to start each bullet point",
            "Quantify your achievements with numbers and percentages",
            "Focus on results and impact rather than just responsibilities"
        ];
    }

    if (suggestions.skills.length === 0) {
        suggestions.skills = [
            "Include both technical and soft skills relevant to your target role",
            "List skills in order of proficiency or relevance",
            "Use keywords from job descriptions you're targeting"
        ];
    }

    return suggestions;
};

export const getScoreColor = (score: number): string => {
    if (score > 70) return 'text-green-600 bg-green-100';
    if (score > 49) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
};

export const getScoreBadgeColor = (score: number): string => {
    if (score > 70) return 'bg-green-200 text-green-800';
    if (score > 49) return 'bg-yellow-200 text-yellow-800';
    return 'bg-red-200 text-red-800';
};

export const generateJobTailoredSuggestions = (jobDescription?: string) => {
    if (!jobDescription) {
        return {
            skills: ["Add skills relevant to your target position"],
            keywords: ["Include industry-specific keywords"],
            experience: ["Highlight experience that matches job requirements"]
        };
    }

    // This is a simplified version. In a real app, you'd use NLP or AI to extract keywords
    const commonTechSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git'];
    const commonSoftSkills = ['communication', 'leadership', 'teamwork', 'problem-solving', 'analytical'];
    
    const extractedSkills = commonTechSkills.filter(skill => 
        jobDescription.toLowerCase().includes(skill.toLowerCase())
    );
    
    const extractedSoftSkills = commonSoftSkills.filter(skill =>
        jobDescription.toLowerCase().includes(skill)
    );

    return {
        skills: extractedSkills.length > 0 ? extractedSkills : ["Add technical skills mentioned in the job posting"],
        softSkills: extractedSoftSkills.length > 0 ? extractedSoftSkills : ["Highlight relevant soft skills"],
        keywords: ["Include exact phrases from the job description", "Use industry terminology"]
    };
};

export const validateResumeData = (data: ResumeData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.personalInfo.fullName.trim()) {
        errors.push("Full name is required");
    }

    if (!data.personalInfo.email.trim()) {
        errors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(data.personalInfo.email)) {
        errors.push("Please enter a valid email address");
    }

    if (!data.personalInfo.phone.trim()) {
        errors.push("Phone number is required");
    }

    if (!data.summary.trim()) {
        errors.push("Professional summary is required");
    }

    if (data.experience.length === 0) {
        errors.push("At least one work experience entry is required");
    }

    if (data.skills.length === 0) {
        errors.push("At least one skill is required");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const formatResumeForDownload = (data: ResumeData): string => {
    // This would generate a formatted text version or work with a PDF library
    // For now, returning a simple text format
    let formatted = `${data.personalInfo.fullName}\n`;
    formatted += `${data.personalInfo.email} | ${data.personalInfo.phone}`;
    if (data.personalInfo.location) formatted += ` | ${data.personalInfo.location}`;
    formatted += '\n\n';

    if (data.summary) {
        formatted += `PROFESSIONAL SUMMARY\n${data.summary}\n\n`;
    }

    if (data.experience.length > 0) {
        formatted += 'PROFESSIONAL EXPERIENCE\n';
        data.experience.forEach(exp => {
            formatted += `${exp.position} - ${exp.company}\n`;
            formatted += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n`;
            exp.description.forEach(desc => {
                if (desc.trim()) formatted += `• ${desc}\n`;
            });
            formatted += '\n';
        });
    }

    if (data.skills.length > 0) {
        formatted += `SKILLS\n${data.skills.join(', ')}\n\n`;
    }

    if (data.education.length > 0) {
        formatted += 'EDUCATION\n';
        data.education.forEach(edu => {
            formatted += `${edu.degree} in ${edu.field}\n`;
            formatted += `${edu.institution}\n`;
            formatted += `${edu.startDate} - ${edu.endDate}\n\n`;
        });
    }

    if (data.projects.length > 0) {
        formatted += 'PROJECTS\n';
        data.projects.forEach(project => {
            formatted += `${project.name}\n`;
            formatted += `${project.description}\n`;
            if (project.technologies.length > 0) {
                formatted += `Technologies: ${project.technologies.join(', ')}\n`;
            }
            formatted += '\n';
        });
    }

    if (data.certifications.length > 0) {
        formatted += `CERTIFICATIONS\n${data.certifications.filter(cert => cert.trim()).join('\n')}\n`;
    }

    return formatted;
};