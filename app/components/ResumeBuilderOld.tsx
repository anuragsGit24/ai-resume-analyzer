import { useState } from 'react';

interface ResumeBuilderProps {
    resumeData: ResumeData;
    setResumeData: (data: ResumeData) => void;
    feedback: Feedback | null;
}

const ResumeBuilder = ({ resumeData, setResumeData, feedback }: ResumeBuilderProps) => {
    const [activeSection, setActiveSection] = useState('personal');

    const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
        setResumeData({
            ...resumeData,
            personalInfo: {
                ...resumeData.personalInfo,
                [field]: value
            }
        });
    };

    const addExperience = () => {
        const newExperience: Experience = {
            id: Date.now().toString(),
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ['']
        };
        setResumeData({
            ...resumeData,
            experience: [...resumeData.experience, newExperience]
        });
    };

    const updateExperience = (id: string, field: keyof Experience, value: any) => {
        setResumeData({
            ...resumeData,
            experience: resumeData.experience.map(exp => 
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        });
    };

    const removeExperience = (id: string) => {
        setResumeData({
            ...resumeData,
            experience: resumeData.experience.filter(exp => exp.id !== id)
        });
    };

    const addEducation = () => {
        const newEducation: Education = {
            id: Date.now().toString(),
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            gpa: ''
        };
        setResumeData({
            ...resumeData,
            education: [...resumeData.education, newEducation]
        });
    };

    const updateEducation = (id: string, field: keyof Education, value: string) => {
        setResumeData({
            ...resumeData,
            education: resumeData.education.map(edu => 
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        });
    };

    const removeEducation = (id: string) => {
        setResumeData({
            ...resumeData,
            education: resumeData.education.filter(edu => edu.id !== id)
        });
    };

    const addProject = () => {
        const newProject: Project = {
            id: Date.now().toString(),
            name: '',
            description: '',
            technologies: [],
            link: '',
            github: ''
        };
        setResumeData({
            ...resumeData,
            projects: [...resumeData.projects, newProject]
        });
    };

    const updateProject = (id: string, field: keyof Project, value: any) => {
        setResumeData({
            ...resumeData,
            projects: resumeData.projects.map(proj => 
                proj.id === id ? { ...proj, [field]: value } : proj
            )
        });
    };

    const removeProject = (id: string) => {
        setResumeData({
            ...resumeData,
            projects: resumeData.projects.filter(proj => proj.id !== id)
        });
    };

    const addSkill = (skill: string) => {
        if (skill.trim() && !resumeData.skills.includes(skill.trim())) {
            setResumeData({
                ...resumeData,
                skills: [...resumeData.skills, skill.trim()]
            });
        }
    };

    const removeSkill = (skill: string) => {
        setResumeData({
            ...resumeData,
            skills: resumeData.skills.filter(s => s !== skill)
        });
    };

    const sections = [
        { id: 'personal', label: 'Personal Info' },
        { id: 'summary', label: 'Summary' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'certifications', label: 'Certifications' }
    ];

    const getScoreForSection = (sectionId: string): number | null => {
        if (!feedback) return null;
        
        switch (sectionId) {
            case 'summary':
            case 'experience':
                return feedback.content.score;
            case 'skills':
                return feedback.skills.score;
            case 'personal':
            case 'education':
            case 'projects':
                return feedback.structure.score;
            default:
                return null;
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'personal':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full primary-gradient flex items-center justify-center">
                                <span className="text-white text-sm font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                        </div>
                        <p className="text-dark-200">Add your contact details and professional links</p>
                        
                        <div className="space-y-6">
                            <div className="form-div">
                                <label className="text-sm font-medium text-gray-700">Full Name *</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={resumeData.personalInfo.fullName}
                                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-div">
                                    <label className="text-sm font-medium text-gray-700">Email Address *</label>
                                    <input
                                        type="email"
                                        placeholder="your.email@example.com"
                                        value={resumeData.personalInfo.email}
                                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                                    />
                                </div>
                                <div className="form-div">
                                    <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        value={resumeData.personalInfo.phone}
                                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <div className="form-div">
                                <label className="text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    placeholder="City, State/Country"
                                    value={resumeData.personalInfo.location}
                                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                                />
                            </div>
                            
                            <div className="space-y-4">
                                <h4 className="text-md font-medium text-gray-900">Professional Links</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="form-div">
                                        <label className="text-sm font-medium text-gray-700">LinkedIn Profile</label>
                                        <input
                                            type="url"
                                            placeholder="https://linkedin.com/in/yourprofile"
                                            value={resumeData.personalInfo.linkedIn}
                                            onChange={(e) => updatePersonalInfo('linkedIn', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-div">
                                        <label className="text-sm font-medium text-gray-700">Portfolio Website</label>
                                        <input
                                            type="url"
                                            placeholder="https://yourportfolio.com"
                                            value={resumeData.personalInfo.portfolio}
                                            onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-div">
                                        <label className="text-sm font-medium text-gray-700">GitHub Profile</label>
                                        <input
                                            type="url"
                                            placeholder="https://github.com/yourusername"
                                            value={resumeData.personalInfo.github}
                                            onChange={(e) => updatePersonalInfo('github', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'summary':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full primary-gradient flex items-center justify-center">
                                <span className="text-white text-sm font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Professional Summary</h3>
                        </div>
                        <p className="text-dark-200">Craft a compelling summary that highlights your expertise and career goals</p>
                        
                        {feedback?.content.tips && (
                            <div className="gradient-border !p-3">
                                <div className="bg-white rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-6 h-6 rounded-full bg-badge-yellow flex items-center justify-center">
                                            <span className="text-badge-yellow-text text-xs font-bold">AI</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Content Improvement Suggestions</h4>
                                    </div>
                                    <ul className="space-y-2">
                                        {feedback.content.tips.filter(tip => tip.type === 'improve').map((tip, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-badge-yellow-text mt-2 flex-shrink-0"></div>
                                                <span className="text-sm text-gray-700">{tip.tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                        
                        <div className="form-div">
                            <label className="text-sm font-medium text-gray-700">Professional Summary *</label>
                            <textarea
                                placeholder="Write a compelling professional summary that highlights your key achievements, skills, and career objectives. Keep it concise (3-4 sentences) and focus on what makes you unique..."
                                value={resumeData.summary}
                                onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                                rows={6}
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>Tip: Include your most relevant skills and achievements</span>
                                <span>{resumeData.summary.length}/500 characters</span>
                            </div>
                        </div>
                    </div>
                );

            case 'experience':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full primary-gradient flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">3</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">Work Experience</h3>
                                    <p className="text-dark-200 text-sm">Add your professional work history</p>
                                </div>
                            </div>
                            <button
                                onClick={addExperience}
                                className="primary-button !w-auto px-6 py-2 text-sm font-medium"
                            >
                                + Add Experience
                            </button>
                        </div>
                        
                        {resumeData.experience.length === 0 ? (
                            <div className="gradient-border">
                                <div className="bg-white rounded-2xl p-8 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                        <span className="text-2xl">💼</span>
                                    </div>
                                    <h4 className="text-lg font-medium text-gray-900 mb-2">No work experience added yet</h4>
                                    <p className="text-dark-200 mb-4">Add your professional work history to showcase your career progression</p>
                                    <button
                                        onClick={addExperience}
                                        className="primary-button !w-auto px-6 py-2 text-sm font-medium"
                                    >
                                        Add Your First Experience
                                    </button>
                                </div>
                            </div>
                        ) : (
                            resumeData.experience.map((exp, index) => (
                                <div key={exp.id} className="gradient-border">
                                    <div className="bg-white rounded-2xl p-6">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <span className="text-gray-600 text-sm font-bold">{index + 1}</span>
                                                </div>
                                                <h4 className="text-lg font-medium text-gray-900">Experience Entry</h4>
                                            </div>
                                            <button
                                                onClick={() => removeExperience(exp.id)}
                                                className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="form-div">
                                                    <label className="text-sm font-medium text-gray-700">Job Title *</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Senior Software Engineer"
                                                        value={exp.position}
                                                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-div">
                                                    <label className="text-sm font-medium text-gray-700">Company *</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Google Inc."
                                                        value={exp.company}
                                                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="form-div">
                                                <label className="text-sm font-medium text-gray-700">Location</label>
                                                <input
                                                    type="text"
                                        placeholder="Location"
                                        value={exp.location}
                                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={exp.current}
                                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                        />
                                        <label className="text-sm">Current Position</label>
                                    </div>
                                    <input
                                        type="month"
                                        placeholder="Start Date"
                                        value={exp.startDate}
                                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                    {!exp.current && (
                                        <input
                                            type="month"
                                            placeholder="End Date"
                                            value={exp.endDate}
                                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                            className="px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    )}
                                </div>
                                
                                <textarea
                                    placeholder="Describe your responsibilities and achievements..."
                                    value={exp.description.join('\n')}
                                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value.split('\n'))}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                );

            case 'education':
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Education</h3>
                            <button
                                onClick={addEducation}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Add Education
                            </button>
                        </div>
                        
                        {resumeData.education.map((edu) => (
                            <div key={edu.id} className="border border-gray-300 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-medium">Education Entry</h4>
                                    <button
                                        onClick={() => removeEducation(edu.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Institution"
                                        value={edu.institution}
                                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Degree"
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Field of Study"
                                        value={edu.field}
                                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="text"
                                        placeholder="GPA (optional)"
                                        value={edu.gpa}
                                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="month"
                                        placeholder="Start Date"
                                        value={edu.startDate}
                                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="month"
                                        placeholder="End Date"
                                        value={edu.endDate}
                                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'skills':
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Skills</h3>
                        {feedback?.skills.tips && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="font-medium text-blue-800 mb-2">AI Suggestions:</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    {feedback.skills.tips.filter(tip => tip.type === 'improve').map((tip, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>{tip.tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                            {resumeData.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                                >
                                    {skill}
                                    <button
                                        onClick={() => removeSkill(skill)}
                                        className="ml-2 text-blue-600 hover:text-blue-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        
                        <input
                            type="text"
                            placeholder="Add a skill and press Enter"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    addSkill((e.target as HTMLInputElement).value);
                                    (e.target as HTMLInputElement).value = '';
                                }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                );

            case 'projects':
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Projects</h3>
                            <button
                                onClick={addProject}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Add Project
                            </button>
                        </div>
                        
                        {resumeData.projects.map((project) => (
                            <div key={project.id} className="border border-gray-300 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-medium">Project Entry</h4>
                                    <button
                                        onClick={() => removeProject(project.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Project Name"
                                        value={project.name}
                                        onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                    
                                    <textarea
                                        placeholder="Project Description"
                                        value={project.description}
                                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                    
                                    <input
                                        type="text"
                                        placeholder="Technologies (comma-separated)"
                                        value={project.technologies.join(', ')}
                                        onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="url"
                                            placeholder="Live Demo URL"
                                            value={project.link}
                                            onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                                            className="px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <input
                                            type="url"
                                            placeholder="GitHub URL"
                                            value={project.github}
                                            onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                                            className="px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'certifications':
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Certifications</h3>
                        
                        <div className="space-y-2">
                            {resumeData.certifications.map((cert, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={cert}
                                        onChange={(e) => {
                                            const newCerts = [...resumeData.certifications];
                                            newCerts[index] = e.target.value;
                                            setResumeData({ ...resumeData, certifications: newCerts });
                                        }}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="Certification name"
                                    />
                                    <button
                                        onClick={() => {
                                            const newCerts = resumeData.certifications.filter((_, i) => i !== index);
                                            setResumeData({ ...resumeData, certifications: newCerts });
                                        }}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        <button
                            onClick={() => setResumeData({
                                ...resumeData,
                                certifications: [...resumeData.certifications, '']
                            })}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Add Certification
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-8">
            {/* Section Navigation */}
            <div className="gradient-border">
                <div className="bg-white rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Sections</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {sections.map((section) => {
                            const score = getScoreForSection(section.id);
                            const isActive = activeSection === section.id;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? 'primary-gradient text-white shadow-lg'
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 inset-shadow'
                                    }`}
                                >
                                    <div className="flex flex-col items-center space-y-1">
                                        <span className="text-center leading-tight">{section.label}</span>
                                        {score && (
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                isActive ? 'bg-white/20 text-white' : 
                                                score > 70 ? 'bg-badge-green text-badge-green-text' :
                                                score > 49 ? 'bg-badge-yellow text-badge-yellow-text' :
                                                'bg-badge-red text-badge-red-text'
                                            }`}>
                                                {score}
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Active Section Content */}
            <div className="gradient-border">
                <div className="bg-white rounded-2xl p-8">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;