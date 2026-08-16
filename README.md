# 🚀 SEO Audit AI — Intelligent Web Crawler & SEO Optimization Suite

**SEO Audit AI** is a full-stack, AI-powered web auditing platform designed to analyze web pages in real time, diagnose technical and on-page SEO issues, and produce actionable, AI-driven recommendations powered by **Google Gemini AI**.

---

## ✨ Features & Capabilities

### 🔍 1. Real-Time Web Crawler & Technical Analysis
- **Meta & Header Tag Inspection**: Validates `<title>`, `<meta name="description">`, `<meta name="keywords">`, robots meta, and canonical URLs.
- **Heading Hierarchy Analysis**: Evaluates proper nesting and distribution of `<h1>` through `<h6>` tags.
- **Social Graph & Card Auditing**: Inspects Open Graph (`og:title`, `og:description`, `og:image`) and Twitter Card metadata for social media optimization.
- **Image & Asset Optimization**: Scans images for missing `alt` attributes, non-descriptive names, and potential performance bottlenecks.
- **Crawlability & Technical Health**:
  - `robots.txt` availability & parsing.
  - `sitemap.xml` detection and verification.
  - SSL/HTTPS security verification.
  - Server response timing & page speed diagnostics.
  - Word count & content length evaluation.

---

### 🤖 2. Google Gemini AI Engine & Optimization
- **Executive Summary Generation**: Produces a concise, natural-language executive summary of the website's SEO health.
- **Prioritized Action Plan**: Categorizes recommendations into *High*, *Medium*, and *Low* priority tasks.
- **AI-Powered Title & Meta Rewrites**: Automatically generates high-converting, keyword-rich `<title>` and `<meta description>` alternatives.
- **Content Enhancement Insights**: Provides copy recommendations, semantic keyword additions, and structural content improvements.

---

### 📊 3. Interactive Analytics & Dashboard
- **Visual Score Metrics**: Overall SEO score calculation (0–100) with color-coded gauge indicators.
- **Categorized Breakdown**: Granular scoring across Technical, On-Page, Meta & Social, and Content categories.
- **Dynamic Charts**: Powered by **Chart.js** & **react-chartjs-2** for visual issue distribution and performance metrics.
- **Audit History & Management**: View past audit reports, re-audit websites, track progress over time, and delete archived audits.

---

### 📄 4. Exportable PDF Reports
- **1-Click PDF Generation**: Download comprehensive, client-ready PDF reports built natively with `@react-pdf/renderer`.
- **Branded & Printable Layouts**: Includes executive summaries, score breakdowns, error highlights, and AI recommendations formatted for presentations and client deliverables.

---

### 🔒 5. Security & Authentication
- **User Authentication**: Secure JSON Web Token (JWT) based authentication with encrypted passwords via `bcryptjs`.
- **API Protection & Rate Limiting**: Request throttling with `express-rate-limit` to prevent abuse.
- **Security Headers**: Hardened HTTP headers configured via `helmet`.
- **Input Validation**: Sanitization and URL verification using `validator.js`.

---

### 🎨 6. Modern & Responsive UI/UX
- **Interactive Animations**: Smooth tab transitions and micro-interactions powered by **Framer Motion**.
- **Iconography**: Clean UI icons from **Lucide React**.
- **Tailwind CSS Styling**: Fully responsive, dark/light sleek dashboard design.
- **Toast Notifications**: Real-time operational feedback powered by `react-toastify`.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Charts**: Chart.js & react-chartjs-2
- **PDF Export**: @react-pdf/renderer
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js + Express 5
- **Database**: MongoDB (Mongoose ORM)
- **AI Integration**: `@google/generative-ai` (Gemini API)
- **Web Scraper**: Cheerio + Axios
- **Authentication**: JSON Web Token (JWT) + bcryptjs
- **Security**: Helmet, Express Rate Limit, Cors

---

## 📁 Project Structure

```
seo-audit-ai/
├── client/                      # React Frontend Application
│   ├── src/
│   │   ├── api/                 # Axios API configuration & services
│   │   ├── components/          # Reusable UI components (Layout, PDF, Gauges, etc.)
│   │   ├── context/             # React Context for Auth state
│   │   ├── pages/               # Application Pages (Landing, Login, Dashboard, AuditResult)
│   │   ├── App.jsx              # Main Router setup
│   │   └── main.jsx             # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Express Backend API
│   ├── config/                  # Database configuration (MongoDB)
│   ├── controllers/             # Auth & Audit request handlers
│   ├── middleware/              # Auth & Error handling middleware
│   ├── models/                  # Mongoose Schemas (User, Audit)
│   ├── routes/                  # Express API routes (/api/auth, /api/audits)
│   ├── services/
│   │   ├── aiEngine.js          # Google Gemini AI prompt orchestration & parsing
│   │   └── seoEngine.js        # Web crawler & technical analysis pipeline
│   ├── server.js                # Server entry point
│   └── package.json
└── README.md
```

---

## ⚡ Quick Start & Installation Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- [Google Gemini API Key](https://aistudio.google.com/)

---

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/seo-audit-ai
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend server:

```bash
npm start
```

The server will run on `http://localhost:5000`.

---

### 2. Frontend Setup

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The client application will run on `http://localhost:5173`.

---

## 📡 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token | No |
| `GET` | `/api/auth/me` | Fetch currently logged-in user profile | Yes |

### Audits (`/api/audits`)
| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/audits/run` | Trigger a new SEO audit for a target URL | Yes |
| `GET` | `/api/audits` | List all historical audits for the user | Yes |
| `GET` | `/api/audits/:id` | Fetch detailed audit results by ID | Yes |
| `DELETE` | `/api/audits/:id` | Delete an audit record | Yes |

---

## 📝 License
This project is open source and available under the **ISC License**.
