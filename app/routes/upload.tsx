import React from 'react';
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";

const upload = () => {
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [statusText, setStatusText] = React.useState("");

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {

    }

  return (
      <main className="bg-[url('/images/bg-main.svg')] bg-cover">
          <Navbar />

          <section className="main-section">
              <div className="page-heading py-16">
                  <h1>Smart Feedback For Your Dream Job</h1>
                  {isProcessing ? (
                      <>
                          <h2>{statusText}</h2>
                          <img src="/images/resume-scan-2.gif" className="w-full" />
                      </>
                  ) : (
                      <h2>Drop your resume for an ATS score and improvement</h2>
                  )}

                  {!isProcessing && (
                      <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                          <div className="form-div">
                              <label htmlFor="company-name">Company Name</label>
                              <input type="text" name="company-name" placeholder="Company Name" id="company-name"></input>
                          </div>
                          <div className="form-div">
                              <label htmlFor="job-title">Job Title</label>
                              <input type="text" name="job-title" placeholder="Job Title" id="job-title"></input>
                          </div>
                          <div className="form-div">
                              <label htmlFor="job-description">Job description</label>
                              <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description"></textarea>
                          </div>
                          <div className="form-div">
                              <label htmlFor="uploader">Upload Resume</label>
                              <FileUploader />
                          </div>

                          <button type="submit" className="primary-button">
                              Analyze Resume
                          </button>

                      </form>
                  )}

              </div>
          </section>
      </main>
  );
};

export default upload;
