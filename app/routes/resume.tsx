import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

export const meta = () => ([
    {title: 'Resumind | Auth'},
    {name: 'description', content :'Log into your account'},
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageURL] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume/${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);
            //read from pdf from file system by using image blobs
            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
            const resumeURL = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeURL);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;
            const imageURL = URL.createObjectURL(imageBlob);
            setImageURL(imageURL);

            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl, feedback: data.feedback});
        }

        loadResume();
    }, [id]);

  return (
    <main className="!pt-0">
        <nav className="resume-nav">
            <Link to="/" className="back-button">
                <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
            </Link>
        </nav>
        <div className=" flex flex-row w-full max-ig:flex-col-reverse">
            <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
                {imageUrl && resumeUrl && (
                    <div className="animate-in fade-in duration-1000 gradient-border max-sm:0 h-[90%] max-wxl: h-fit w-fit">
                        <a>
                            <img
                                src={imageUrl}
                                className="w-full h-full object-contain rounded-2xl"
                                title="resume"
                            />
                        </a>
                    </div>
                )}
            </section>
        </div>
    </main>
  );
};

export default Resume;
