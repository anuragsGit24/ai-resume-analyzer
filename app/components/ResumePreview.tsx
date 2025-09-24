interface ResumePreviewProps {
    resumeData: ResumeData;
    template: string;
}

const ResumePreview = ({ resumeData, template }: ResumePreviewProps) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    const renderModernTemplate = () => (
        <div className="w-full bg-white shadow-xl rounded-2xl overflow-hidden" style={{ aspectRatio: '8.5/11', fontSize: '11px' }}>
            {/* Header */}
            <div className="primary-gradient text-white p-6">
                <h1 className="text-2xl font-bold mb-2">{resumeData.personalInfo.fullName || 'Your Name'}</h1>
                <div className="space-y-1 text-white/90 text-xs">
                    <div className="flex flex-wrap gap-3">
                        {resumeData.personalInfo.email && (
                            <span className="flex items-center gap-1">
                                <span>📧</span> {resumeData.personalInfo.email}
                            </span>
                        )}
                        {resumeData.personalInfo.phone && (
                            <span className="flex items-center gap-1">
                                <span>📱</span> {resumeData.personalInfo.phone}
                            </span>
                        )}
                        {resumeData.personalInfo.location && (
                            <span className="flex items-center gap-1">
                                <span>📍</span> {resumeData.personalInfo.location}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {resumeData.personalInfo.linkedIn && (
                            <span className="flex items-center gap-1">
                                <span>💼</span> LinkedIn
                            </span>
                        )}
                        {resumeData.personalInfo.portfolio && (
                            <span className="flex items-center gap-1">
                                <span>🌐</span> Portfolio
                            </span>
                        )}
                        {resumeData.personalInfo.github && (
                            <span className="flex items-center gap-1">
                                <span>💻</span> GitHub
                            </span>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="p-6">
                {/* Summary */}
                {resumeData.summary && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3">
                            PROFESSIONAL SUMMARY
                        </h2>
                        <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                    </div>
                )}

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3">
                            PROFESSIONAL EXPERIENCE
                        </h2>
                        <div className="space-y-4">
                            {resumeData.experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                                        <span className="text-sm text-gray-600">
                                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-2">
                                        {exp.company} • {exp.location}
                                    </div>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {exp.description.map((desc, index) => (
                                            desc.trim() && <li key={index}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {resumeData.skills.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3">
                            TECHNICAL SKILLS
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {resumeData.skills.map((skill) => (
                                <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {resumeData.projects.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3">
                            PROJECTS
                        </h2>
                        <div className="space-y-3">
                            {resumeData.projects.map((project) => (
                                <div key={project.id}>
                                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                                    <p className="text-gray-700 text-sm mb-1">{project.description}</p>
                                    {project.technologies.length > 0 && (
                                        <p className="text-xs text-gray-600 mb-1">
                                            <strong>Technologies:</strong> {project.technologies.join(', ')}
                                        </p>
                                    )}
                                    <div className="text-xs text-blue-600">
                                        {project.link && (
                                            <span className="mr-4">Live: {project.link}</span>
                                        )}
                                        {project.github && (
                                            <span>GitHub: {project.github}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {resumeData.education.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3">
                            EDUCATION
                        </h2>
                        <div className="space-y-2">
                            {resumeData.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                                            <p className="text-sm text-gray-600">{edu.institution}</p>
                                        </div>
                                        <div className="text-right text-sm text-gray-600">
                                            <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                                            {edu.gpa && <p>GPA: {edu.gpa}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {resumeData.certifications.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3">
                            CERTIFICATIONS
                        </h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {resumeData.certifications.map((cert, index) => (
                                cert.trim() && <li key={index}>{cert}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );

    const renderClassicTemplate = () => (
        <div className="max-w-4xl mx-auto bg-white shadow-lg" style={{ minHeight: '11in', width: '8.5in', fontSize: '12px' }}>
            <div className="p-8">
                {/* Header */}
                <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">{resumeData.personalInfo.fullName || 'Your Name'}</h1>
                    <div className="mt-2 text-gray-600">
                        <div className="flex justify-center flex-wrap gap-4 text-sm">
                            {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                            {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
                            {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
                        </div>
                        <div className="flex justify-center flex-wrap gap-4 text-sm mt-1">
                            {resumeData.personalInfo.linkedIn && <span>{resumeData.personalInfo.linkedIn}</span>}
                            {resumeData.personalInfo.portfolio && <span>{resumeData.personalInfo.portfolio}</span>}
                            {resumeData.personalInfo.github && <span>{resumeData.personalInfo.github}</span>}
                        </div>
                    </div>
                </div>

                {/* Summary */}
                {resumeData.summary && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                            Professional Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                    </div>
                )}

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                            Professional Experience
                        </h2>
                        <div className="space-y-4">
                            {resumeData.experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-gray-900">{exp.position} - {exp.company}</h3>
                                        <span className="text-sm text-gray-600">
                                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2 italic">{exp.location}</p>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {exp.description.map((desc, index) => (
                                            desc.trim() && <li key={index}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {resumeData.education.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                            Education
                        </h2>
                        <div className="space-y-2">
                            {resumeData.education.map((edu) => (
                                <div key={edu.id} className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                                        <p className="text-sm text-gray-600">{edu.institution}</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                                        {edu.gpa && <p>GPA: {edu.gpa}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {resumeData.skills.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                            Technical Skills
                        </h2>
                        <p className="text-gray-700">{resumeData.skills.join(' • ')}</p>
                    </div>
                )}

                {/* Projects */}
                {resumeData.projects.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                            Projects
                        </h2>
                        <div className="space-y-3">
                            {resumeData.projects.map((project) => (
                                <div key={project.id}>
                                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                                    <p className="text-gray-700 text-sm mb-1">{project.description}</p>
                                    {project.technologies.length > 0 && (
                                        <p className="text-xs text-gray-600 mb-1">
                                            <strong>Technologies:</strong> {project.technologies.join(', ')}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {resumeData.certifications.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                            Certifications
                        </h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {resumeData.certifications.map((cert, index) => (
                                cert.trim() && <li key={index}>{cert}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );

    const renderMinimalTemplate = () => (
        <div className="max-w-4xl mx-auto bg-white shadow-lg" style={{ minHeight: '11in', width: '8.5in', fontSize: '12px' }}>
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-light text-gray-900 mb-2">{resumeData.personalInfo.fullName || 'Your Name'}</h1>
                    <div className="text-gray-600 text-sm">
                        {[
                            resumeData.personalInfo.email,
                            resumeData.personalInfo.phone,
                            resumeData.personalInfo.location,
                            resumeData.personalInfo.linkedIn,
                            resumeData.personalInfo.portfolio,
                            resumeData.personalInfo.github
                        ].filter(Boolean).join(' | ')}
                    </div>
                </div>

                {/* Summary */}
                {resumeData.summary && (
                    <div className="mb-8">
                        <p className="text-gray-700 leading-relaxed text-base">{resumeData.summary}</p>
                    </div>
                )}

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-light text-gray-900 mb-4 pb-1 border-b border-gray-300">
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {resumeData.experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                                        <span className="text-sm text-gray-500">
                                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-2">{exp.company}, {exp.location}</p>
                                    <div className="text-gray-700 space-y-1">
                                        {exp.description.map((desc, index) => (
                                            desc.trim() && <p key={index} className="text-sm">• {desc}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {resumeData.skills.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-light text-gray-900 mb-4 pb-1 border-b border-gray-300">
                            Skills
                        </h2>
                        <p className="text-gray-700">{resumeData.skills.join(', ')}</p>
                    </div>
                )}

                {/* Projects */}
                {resumeData.projects.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-light text-gray-900 mb-4 pb-1 border-b border-gray-300">
                            Projects
                        </h2>
                        <div className="space-y-4">
                            {resumeData.projects.map((project) => (
                                <div key={project.id}>
                                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                                    <p className="text-gray-700 text-sm mb-1">{project.description}</p>
                                    {project.technologies.length > 0 && (
                                        <p className="text-xs text-gray-500">
                                            {project.technologies.join(', ')}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {resumeData.education.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-light text-gray-900 mb-4 pb-1 border-b border-gray-300">
                            Education
                        </h2>
                        <div className="space-y-2">
                            {resumeData.education.map((edu) => (
                                <div key={edu.id} className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{edu.degree} in {edu.field}</h3>
                                        <p className="text-sm text-gray-600">{edu.institution}</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                                        {edu.gpa && <p>GPA: {edu.gpa}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {resumeData.certifications.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-light text-gray-900 mb-4 pb-1 border-b border-gray-300">
                            Certifications
                        </h2>
                        <div className="text-gray-700 space-y-1">
                            {resumeData.certifications.map((cert, index) => (
                                cert.trim() && <p key={index} className="text-sm">• {cert}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderTemplate = () => {
        switch (template) {
            case 'classic':
                return renderClassicTemplate();
            case 'minimal':
                return renderMinimalTemplate();
            default:
                return renderModernTemplate();
        }
    };

    return (
        <div className="bg-gray-100 p-4 resume-preview">
            {renderTemplate()}
        </div>
    );
};

export default ResumePreview;