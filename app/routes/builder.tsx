import { Link, useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import ResumeBuilder from "~/components/ResumeBuilder";
import ResumePreview from "~/components/ResumePreview";

export const meta = () => ([
    { title: 'Resumind | Builder ' },
    { name: 'description', content: 'Build your perfect resume based on AI analysis' },
])

const Builder = () => {
    const { auth, isLoading, kv } = usePuterStore();
    const [searchParams] = useSearchParams();
    const resumeId = searchParams.get('resumeId');
    const navigate = useNavigate();
    
    const [resumeData, setResumeData] = useState<ResumeData>({
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            linkedIn: '',
            portfolio: '',
            github: ''
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: []
    });
    
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState('modern');

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate(`/auth?next=/builder${resumeId ? `/${resumeId}` : ''}`);
        }
    }, [isLoading]);

    useEffect(() => {
        const loadResumeForBuilding = async () => {
            if (!resumeId) return;
            
            try {
                const resume = await kv.get(`resume:${resumeId}`);
                if (resume) {
                    const data = JSON.parse(resume);
                    setFeedback(data.feedback);
                    
                    // Check if we already have built resume data
                    const builtResume = await kv.get(`built-resume:${resumeId}`);
                    if (builtResume) {
                        setResumeData(JSON.parse(builtResume));
                    }
                }
            } catch (error) {
                console.error('Error loading resume:', error);
            }
        };

        loadResumeForBuilding();
    }, [resumeId]);

    const handleSaveResume = async () => {
        try {
            const resumeKey = resumeId ? `built-resume:${resumeId}` : `built-resume:${Date.now()}`;
            await kv.set(resumeKey, JSON.stringify(resumeData));
            alert('Resume saved successfully!');
        } catch (error) {
            console.error('Error saving resume:', error);
            alert('Error saving resume');
        }
    };

    const handleDownloadPDF = async () => {
        try {
            // Create a new window with the resume content
            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                alert('Please allow popups to download the resume');
                return;
            }

            // Get the resume preview element
            const resumeElement = document.querySelector('.resume-preview');
            if (!resumeElement) {
                alert('Resume preview not found');
                return;
            }

            // Create HTML content for printing
            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${resumeData.personalInfo.fullName || 'Resume'}</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            margin: 0; 
                            padding: 20px; 
                            background: white;
                            color: black;
                        }
                        .resume-container {
                            max-width: 8.5in;
                            margin: 0 auto;
                            background: white;
                        }
                        .header {
                            background: linear-gradient(to bottom, #8e98ff, #606beb);
                            color: white;
                            padding: 30px;
                            text-align: center;
                        }
                        .header h1 { margin: 0; font-size: 28px; }
                        .header p { margin: 5px 0; font-size: 14px; }
                        .content { padding: 30px; }
                        .section { margin-bottom: 25px; }
                        .section h2 { 
                            color: #606beb; 
                            border-bottom: 2px solid #e5e7eb; 
                            padding-bottom: 5px; 
                            margin-bottom: 15px;
                            font-size: 18px;
                        }
                        .experience-item, .education-item, .project-item { 
                            margin-bottom: 20px; 
                        }
                        .experience-header { 
                            display: flex; 
                            justify-content: space-between; 
                            align-items: flex-start; 
                            margin-bottom: 5px;
                        }
                        .job-title { font-weight: bold; font-size: 16px; }
                        .company { color: #666; font-size: 14px; }
                        .date { color: #666; font-size: 12px; }
                        .skills { display: flex; flex-wrap: wrap; gap: 8px; }
                        .skill { 
                            background: #e5e7eb; 
                            padding: 4px 12px; 
                            border-radius: 20px; 
                            font-size: 12px;
                        }
                        ul { margin: 8px 0; padding-left: 20px; }
                        li { margin-bottom: 4px; font-size: 14px; }
                        @media print {
                            body { margin: 0; padding: 0; }
                            .resume-container { box-shadow: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="resume-container">
                        <div class="header">
                            <h1>${resumeData.personalInfo.fullName || 'Your Name'}</h1>
                            ${resumeData.personalInfo.email ? `<p>📧 ${resumeData.personalInfo.email}</p>` : ''}
                            ${resumeData.personalInfo.phone ? `<p>📱 ${resumeData.personalInfo.phone}</p>` : ''}
                            ${resumeData.personalInfo.location ? `<p>📍 ${resumeData.personalInfo.location}</p>` : ''}
                            ${resumeData.personalInfo.linkedIn ? `<p>💼 LinkedIn</p>` : ''}
                        </div>
                        <div class="content">
                            ${resumeData.summary ? `
                                <div class="section">
                                    <h2>PROFESSIONAL SUMMARY</h2>
                                    <p>${resumeData.summary}</p>
                                </div>
                            ` : ''}
                            
                            ${resumeData.experience.length > 0 ? `
                                <div class="section">
                                    <h2>PROFESSIONAL EXPERIENCE</h2>
                                    ${resumeData.experience.map(exp => `
                                        <div class="experience-item">
                                            <div class="experience-header">
                                                <div>
                                                    <div class="job-title">${exp.position}</div>
                                                    <div class="company">${exp.company} • ${exp.location}</div>
                                                </div>
                                                <div class="date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
                                            </div>
                                            <ul>
                                                ${exp.description.filter(desc => desc.trim()).map(desc => `<li>${desc}</li>`).join('')}
                                            </ul>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                            
                            ${resumeData.skills.length > 0 ? `
                                <div class="section">
                                    <h2>TECHNICAL SKILLS</h2>
                                    <div class="skills">
                                        ${resumeData.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            
                            ${resumeData.projects.length > 0 ? `
                                <div class="section">
                                    <h2>PROJECTS</h2>
                                    ${resumeData.projects.map(project => `
                                        <div class="project-item">
                                            <div class="job-title">${project.name}</div>
                                            <p>${project.description}</p>
                                            ${project.technologies.length > 0 ? `
                                                <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
                                            ` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                            
                            ${resumeData.education.length > 0 ? `
                                <div class="section">
                                    <h2>EDUCATION</h2>
                                    ${resumeData.education.map(edu => `
                                        <div class="education-item">
                                            <div class="experience-header">
                                                <div>
                                                    <div class="job-title">${edu.degree} in ${edu.field}</div>
                                                    <div class="company">${edu.institution}</div>
                                                </div>
                                                <div class="date">${edu.startDate} - ${edu.endDate}</div>
                                            </div>
                                            ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </body>
                </html>
            `;

            printWindow.document.write(htmlContent);
            printWindow.document.close();
            
            // Wait for content to load then print
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 1000);
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        }
    };

    return (
        <main className="!pt-0 bg-gradient min-h-screen">
            <nav className="resume-nav bg-white shadow-sm">
                <div className="flex justify-between items-center w-full">
                    <Link to={resumeId ? `/resume/${resumeId}` : "/"} className="back-button">
                        <img src="/icons/back.svg" alt="back" className="w-2.5 h-2.5" />
                        <span className="text-gray-800 text-sm font-semibold">
                            {resumeId ? 'Back to Analysis' : 'Back to Homepage'}
                        </span>
                    </Link>
                    
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleSaveResume}
                            className="secondary-button !w-auto px-6 py-2 text-sm font-medium"
                        >
                            Save Resume
                        </button>
                        <button 
                            onClick={handleDownloadPDF}
                            className="primary-button !w-auto px-6 py-2 text-sm font-medium"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            </nav>

            <div className="flex w-full min-h-[calc(100vh-80px)]">
                {/* Builder Section */}
                <div className="w-1/2 overflow-y-auto">
                    <div className="p-8">
                        <div className="gradient-border mb-8">
                            <div className="bg-white rounded-2xl p-6">
                                <h1 className="text-gradient text-3xl font-semibold mb-3">Resume Builder</h1>
                                {feedback && (
                                    <div className="gradient-border !p-3 mb-4">
                                        <div className="bg-white rounded-xl p-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 rounded-full primary-gradient flex items-center justify-center">
                                                    <span className="text-white text-sm font-bold">{feedback.overallScore}</span>
                                                </div>
                                                <h3 className="font-semibold text-gray-900">
                                                    AI Analysis Score: {feedback.overallScore}/100
                                                </h3>
                                            </div>
                                            <p className="text-sm text-dark-200">
                                                Use the insights from your analysis to build an improved resume.
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <h2 className="text-dark-200 text-lg mb-2">Build your perfect resume with AI-powered insights</h2>
                            </div>
                        </div>
                        
                        <ResumeBuilder
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            feedback={feedback}
                        />
                    </div>
                </div>

                {/* Preview Section */}
                <div className="w-1/2 bg-white border-l border-gray-200 overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Template:</span>
                                <select
                                    value={selectedTemplate}
                                    onChange={(e) => setSelectedTemplate(e.target.value)}
                                    className="inset-shadow rounded-xl px-3 py-2 text-sm font-medium focus:outline-none bg-white"
                                >
                                    <option value="modern">Modern</option>
                                    <option value="classic">Classic</option>
                                    <option value="minimal">Minimal</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <div className="gradient-border">
                            <ResumePreview
                                resumeData={resumeData}
                                template={selectedTemplate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Builder;