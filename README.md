# 🚀 AI Resume Analyzer & Builder

> Transform your career with AI-powered resume optimization and intelligent feedback

A modern, full-stack web application that analyzes resumes using advanced AI and helps users build professional resumes based on intelligent, actionable feedback. Perfect for job seekers looking to optimize their resumes for ATS systems and improve their chances of landing interviews.

![React Router v7](https://img.shields.io/badge/React_Router-v7-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) ![AI Powered](https://img.shields.io/badge/AI_Powered-Claude_3.5-ff6b6b) ![Puter.js](https://img.shields.io/badge/Puter.js-Cloud-purple)

## ✨ Features

### � **Smart AI Resume Analysis**
- **AI-Powered Feedback** using Claude-3.5-Sonnet model
- **ATS Compatibility Scoring** - ensures resumes pass applicant tracking systems
- **Comprehensive Analysis** across 5 key areas:
  - 📝 Content Quality & Relevance (0-100 scale)
  - 🤖 ATS Optimization Score
  - 🏗️ Structure & Formatting
  - 💼 Skills Assessment & Matching
  - 🎯 Tone & Professional Style
- **Job-Specific Analysis** - tailored feedback based on target job descriptions
- **Actionable Improvement Tips** with detailed explanations

### 🎨 **Professional Resume Builder**
- **Interactive Form Interface** with intuitive step-by-step sections
- **Real-Time Live Preview** with multiple professional templates
- **Complete Resume Sections**:
  - � Personal Information & Contact Details
  - 📋 Professional Summary
  - 💼 Work Experience with detailed descriptions
  - 🎓 Education Background
  - 🛠️ Skills with smart categorization
  - � Projects Portfolio
  - 🏆 Certifications
- **PDF Export** functionality for download
- **Cloud Storage** - securely save and access resumes anywhere
- **Template Selection** - Modern, Classic, and Minimal designs

### 🔧 **Technical Excellence**
- **React Router v7** with Server-Side Rendering (SSR)
- **TypeScript** for complete type safety
- **Tailwind CSS** with custom design system
- **Puter.js Integration** for cloud storage and AI services
- **Vite** for lightning-fast development and builds
- **PDF.js** for seamless PDF processing
- **Responsive Design** - works perfectly on all devices

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18 or higher
- **npm** or **yarn** package manager

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/anuragsGit24/ai-resume-analyzer.git
cd ai-resume-analyzer

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser to http://localhost:5173
```

### Available Scripts

```bash
npm run dev          # Start development server with HMR
npm run build        # Create production build
npm run start        # Start production server
npm run typecheck    # Run TypeScript type checking
npm run preview      # Preview production build locally
```

## 📱 How It Works

### 1. **Analyze Your Resume**
1. 📤 Upload your existing PDF resume
2. 📝 Enter target job title and description (optional)
3. 🤖 Get comprehensive AI analysis with detailed scores
4. 📊 Review feedback across multiple categories

### 2. **Build an Improved Resume**
1. 🔄 Start from analysis results or create from scratch
2. 📝 Fill out sections using the guided form interface
3. 👀 Watch real-time preview with professional templates
4. 💾 Save progress to cloud storage
5. 📄 Download polished PDF when complete

### 3. **Optimize Based on AI Insights**
1. 💡 Use specific AI suggestions to enhance content
2. 🎯 Address ATS compatibility issues
3. 📈 Improve scores across all categories
4. 🔄 Iterate and refine until perfect

## 🛠️ Project Structure

```
ai-resume-analyzer/
├── app/
│   ├── components/          # React components
│   │   ├── ResumeBuilder.tsx    # Interactive form builder
│   │   ├── ResumePreview.tsx    # Live template preview
│   │   ├── FileUploader.tsx     # PDF upload interface
│   │   ├── Summary.tsx          # Analysis results display
│   │   └── ScoreGauge.tsx       # Visual score indicators
│   ├── routes/             # Route handlers & pages
│   │   ├── home.tsx            # Dashboard
│   │   ├── upload.tsx          # Resume upload & analysis
│   │   ├── builder.tsx         # Resume builder interface
│   │   └── resume.tsx          # Analysis results
│   ├── lib/                # Utilities and helpers
│   │   ├── puter.ts            # Puter.js integration
│   │   ├── utils.ts            # Helper functions
│   │   └── pdf2img.ts          # PDF processing
│   └── types/              # TypeScript definitions
├── constants/              # App constants and AI prompts
├── public/                # Static assets & icons
├── types/                 # Global type definitions
├── Dockerfile             # Docker configuration
├── vercel.json           # Vercel deployment config
└── tailwind.config.js    # Tailwind CSS configuration
```

## 🎯 Key Benefits

- **🚀 Save Time**: Get instant professional feedback instead of guessing
- **🤖 ATS-Optimized**: Ensure your resume passes automated screening systems
- **🎨 Professional Templates**: Choose from multiple clean, modern designs
- **📊 Data-Driven**: Receive specific, measurable improvement suggestions
- **☁️ Cloud-Powered**: Access your resumes from anywhere, anytime
- **🎯 Job-Specific**: Tailored analysis based on target job requirements
- **📱 Mobile-Friendly**: Works perfectly on all devices

## 🧪 Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: React Router v7 with SSR
- **AI/ML**: Claude-3.5-Sonnet via Puter.js
- **Storage**: Puter.js Cloud KV Store
- **PDF Processing**: PDF.js
- **Build Tool**: Vite
- **Deployment**: Docker, Vercel, Netlify ready


## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use existing component patterns
- Add proper type definitions
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Puter.js](https://puter.js.org/)** - Cloud infrastructure and AI services
- **[React Router](https://reactrouter.com/)** - Modern web app framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Claude AI](https://claude.ai/)** - Powering intelligent resume analysis
- **[Vercel](https://vercel.com/)** - Seamless deployment platform

## 📞 Support & Contact

- 🐛 **Bug Reports**: [Open an Issue](https://github.com/anuragsGit24/ai-resume-analyzer/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/anuragsGit24/ai-resume-analyzer/discussions)

## ⭐ Show Your Support

If this project helped you land your dream job, please give it a ⭐ star on GitHub!

---

**Built by [Anurag](https://github.com/anuragsGit24)**

*Empowering job seekers with AI-driven resume optimization* ✨

---

### 🔗 Live Demo
[**Try AI Resume Analyzer →**](https://your-deployed-url.vercel.app)
