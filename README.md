# 🤖 AI Mock Interview Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.2.2-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-0.40.0-green)](https://orm.drizzle.team/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

> **Transform your interview preparation with AI-powered mock interviews that provide real-time feedback and personalized coaching.**

## ✨ Features

### 🎯 **Smart Interview Generation**
- **AI-Powered Questions**: Generates customized interview questions based on job position, description, and experience level
- **Dynamic Content**: Uses Google's Gemini AI to create relevant, industry-specific questions
- **Flexible Experience Levels**: Supports interviews for all experience levels (0-50+ years)

### 🎙️ **Interactive Interview Experience**
- **Real-time Speech Recognition**: Answer questions using voice input with `react-hook-speech-to-text`
- **Live Video Recording**: Practice with webcam integration using `react-webcam`
- **Text-to-Speech**: Questions are read aloud for better accessibility
- **Progress Tracking**: Visual progress indicators throughout the interview

### 📊 **Intelligent Feedback System**
- **AI-Generated Feedback**: Detailed analysis of your answers with improvement suggestions
- **Rating System**: Get scored on your responses (1-10 scale)
- **Comparative Analysis**: See correct answers alongside your responses
- **Performance Analytics**: Track your overall interview performance

### 🔐 **Secure & User-Friendly**
- **Authentication**: Secure login with Clerk authentication
- **Data Persistence**: All interviews and feedback stored securely in Neon PostgreSQL
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS and Radix UI

## 🚀 Live Demo

[**Try the Live Demo**](https://your-demo-link.vercel.app) *(Replace with your actual deployment URL)*

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/6366f1/ffffff?text=Dashboard+Screenshot)
*Create new interviews and view your interview history*

### Interview Setup
![Interview Setup](https://via.placeholder.com/800x400/10b981/ffffff?text=Interview+Setup)
*Customize your interview based on job role and experience*

### Live Interview
![Live Interview](https://via.placeholder.com/800x400/f59e0b/ffffff?text=Live+Interview)
*Practice with real-time video and voice recording*

### Feedback Report
![Feedback](https://via.placeholder.com/800x400/ef4444/ffffff?text=Feedback+Report)
*Get detailed feedback and performance analytics*

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15.2.2 with App Router
- **Language**: TypeScript 5.8.2
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI primitives
- **Animations**: Tailwind CSS Animate
- **Icons**: Lucide React

### **Backend & Database**
- **Database**: Neon PostgreSQL (Serverless)
- **ORM**: Drizzle ORM 0.40.0
- **Authentication**: Clerk
- **AI Integration**: Google Gemini AI (gemini-2.0-flash)

### **Media & Communication**
- **Speech-to-Text**: react-hook-speech-to-text
- **Video Recording**: react-webcam
- **Text-to-Speech**: Web Speech API
- **Notifications**: Sonner (toast notifications)

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager
- Neon PostgreSQL database
- Google Gemini API key
- Clerk account for authentication

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-mock-interview.git
cd ai-mock-interview
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
NEXT_PUBLIC_DRIZZLE_DB_URL=your_neon_postgresql_connection_string

# Google Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# App Configuration
NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=5
NEXT_PUBLIC_QUESTION_NOTE="Click on record answer when you want to answer the question. At the end of interview, we will give you feedback along with correct answer for each question and your answer to compare it."
```

### 4. Database Setup
```bash
# Push database schema
npm run db:push

# (Optional) Open Drizzle Studio to view your database
npm run db:studio
```

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   └── sign-in/             # Sign-in page
│   ├── dashboard/               # Main dashboard
│   │   ├── _components/         # Dashboard components
│   │   │   ├── AddNewInterview.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── InterviewItemCard.jsx
│   │   │   └── InterviewList.jsx
│   │   └── interview/[interviewId]/  # Dynamic interview routes
│   │       ├── start/           # Interview start page
│   │       └── feedback/        # Feedback page
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   └── page.js                  # Home page
├── components/ui/               # Reusable UI components
│   ├── button.jsx
│   ├── dialog.jsx
│   ├── input.jsx
│   └── textarea.jsx
├── utils/                       # Utility functions
│   ├── GeminiAIModel.js        # AI model configuration
│   ├── db.js                   # Database connection
│   └── schema.js               # Database schema
├── lib/
│   └── utils.js                # Utility functions
├── drizzle.config.js           # Drizzle ORM configuration
└── package.json                # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `NEXT_PUBLIC_DRIZZLE_DB_URL` | Neon PostgreSQL connection string | ✅ |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Google Gemini AI API key | ✅ |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | ✅ |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ |
| `NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT` | Number of questions per interview | ✅ |
| `NEXT_PUBLIC_QUESTION_NOTE` | Instructions shown to users | ✅ |

### Database Schema

The application uses two main tables:

**MockInterview Table**
- Stores interview configurations and AI-generated questions
- Fields: id, jsonMockResponse, jobPosition, jobDesc, jobExperience, createdBy, createdAt, mockId

**UserAnswer Table**
- Stores user responses and AI feedback
- Fields: id, mockIdRef, question, correctAns, UserAns, feedback, rating, UserEmail, createdAt

## 📚 API Reference

### Google Gemini AI Integration

The application uses Google's Gemini AI model (`gemini-2.0-flash`) for:
- Generating interview questions based on job requirements
- Analyzing user answers and providing feedback
- Rating responses on a 1-10 scale

### Speech Recognition

Utilizes the Web Speech API through `react-hook-speech-to-text` for:
- Real-time speech-to-text conversion
- Continuous recording capability
- Cross-browser compatibility

## 🚀 Deployment

### Vercel (Recommended)

1. Fork this repository
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically with each push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-mock-interview)

### Other Platforms

The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify
- Google Cloud Platform

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Google Gemini AI](https://ai.google.dev/) - Advanced AI capabilities
- [Clerk](https://clerk.dev/) - Authentication and user management
- [Neon](https://neon.tech/) - Serverless PostgreSQL
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives

## 📞 Support

If you have any questions or need help getting started:

- 📧 Email: [your-email@example.com](mailto:your-email@example.com)
- 💬 Discord: [Join our community](https://discord.gg/your-invite)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/ai-mock-interview/issues)
- 📖 Documentation: [Full Documentation](https://your-docs-site.com)

---

<div align="center">
  <strong>Built with ❤️ by [Your Name]</strong>
  <br>
  <sub>Star ⭐ this repository if you found it helpful!</sub>
</div>
