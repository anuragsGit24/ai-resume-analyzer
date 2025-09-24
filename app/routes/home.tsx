import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "HireBoost" },
    { name: "description", content: "Smart FeedBack for your dream job" },
  ];
}

export default function Home() {
        const { auth, kv } = usePuterStore();
        const navigate = useNavigate();
        const [resumes, setResumes] = useState<Resume[]>([]);
        const [loadingResumes, setLoadingResume] = useState(false);

        useEffect(() => {
            if(!auth.isAuthenticated) navigate('/auth?next=/');
        }, [auth.isAuthenticated]);

    useEffect(() => {
        const loadResumes = async () => {
            setLoadingResume(true);

            const resumes = (await kv.list('resume:*', true)) as KVItem[];
            const parsedResumes = resumes ?. map((resume) => (
                JSON.parse(resume.value) as Resume
            ))

            console.log("parsedResumes", parsedResumes);

            setResumes(parsedResumes || []);
            setLoadingResume(false);
        }
        loadResumes();
    }, []);

    return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar />

        <section className="main-section">
            <div className="page-heading py-16">
                <h1>Track your Applications and Resume Rating</h1>
                {!loadingResumes && resumes.length === 0 ? (
                    <h2>No resumes found.Upload your first resume to get feedback.</h2>
                ) : (
                    <h2>Review your submissions and check AI-powered feedback.</h2>
                )}
            </div>

            {loadingResumes && (
                <div>
                    <img src="/images/resume-scan-2.gif" className="w-[200px]" />
                </div>
            )}

            {/*structure for database*/}
            {/*{[*/}
            {/*    {*/}
            {/*        title: "Resume Mind",*/}
            {/*        thumbnail: '...'*/}
            {/*    }*/}
            {/*]}*/}

            {!loadingResumes && resumes.length > 0 && (
                <div className="resumes-section">
                    {resumes.map((resume) => (
                        <ResumeCard key ={resume.id} resume={resume} />
                    ))}
                </div>
            )}

            {!loadingResumes && resumes.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-10 gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Analyze Resume</h3>
                            <p className="text-gray-600 text-sm mb-4">Upload your existing resume to get AI-powered feedback and scoring</p>
                            <Link to="/upload" className="primary-button w-full text-base font-semibold">
                                Upload Resume
                            </Link>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Build Resume</h3>
                            <p className="text-gray-600 text-sm mb-4">Create a new professional resume from scratch with our guided builder</p>
                            <Link to="/builder" className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 cursor-pointer w-full font-semibold transition-colors">
                                Start Building
                            </Link>
                        </div>
                    </div>
                </div>
            )}

        </section>
    </main>;
}
