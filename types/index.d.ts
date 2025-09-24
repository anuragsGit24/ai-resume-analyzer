interface Job {
    title: string;
    description: string;
    location: string;
    requiredSkills: string[];
}

interface Resume {
    id: string;
    companyName?: string;
    jobTitle?: string;
    imagePath: string;
    resumePath: string;
    feedback: Feedback;
}

interface Feedback {
    overallScore: number;
    ATS: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
        }[];
    };
    toneAndStyle: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    content: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    structure: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    skills: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
}

interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn?: string;
    portfolio?: string;
    github?: string;
}

interface Experience {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string[];
}

interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
}

interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
}

interface ResumeData {
    personalInfo: PersonalInfo;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
    projects: Project[];
    certifications: string[];
}

interface ResumeTemplate {
    id: string;
    name: string;
    preview: string;
    description: string;
}