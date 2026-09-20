# LoveScoreTest.com - Modern Love & Relationship SaaS Platform

A production-ready, high-performance web platform for couples, featuring deterministic love & compatibility calculators, precision relationship duration & milestone trackers, an anniversary gift planner, interactive reflection quizzes, and an AI-powered relationship assistant.

---

## 🚀 Key Features & Interactive Tools

1. **Multi-Factor Love Compatibility Calculator (`/love-compatibility`)**
   - Combines partner names, optional birthdates, and zodiac signs.
   - Generates a multi-dimensional breakdown: *Communication Chemistry*, *Emotional Depth*, *Playful Dynamic*, and *Life Values*.
   - Includes transparent entertainment disclaimers and 1-click sharing.

2. **Classic Love Calculator (`/love-calculator`)**
   - Deterministic name-matching algorithm (identical names produce identical scores).
   - Identifies couple match archetypes (e.g. *Twin Flames*, *Steadfast Bond*, *Passionate Spark*).

3. **Relationship Duration Tracker (`/relationship-calculator`)**
   - Precision time counter displaying years, months, weeks, days, hours, and a live seconds ticker.
   - Milestone tracking (100 days, 500 days, 1,000 days, 2,000 days, 10 years).
   - Real-time countdown to the next anniversary.

4. **Anniversary & Milestone Calculator (`/anniversary-calculator`)**
   - Days until next anniversary countdown.
   - Complete traditional and modern gift recommendations (1st through 50th year).

5. **Couple Harmony Assessment Quiz (`/couple-compatibility`)**
   - 5-question multi-choice diagnostic evaluating communication patterns, conflict resolution styles, and emotional safety.
   - Instant harmony profile with actionable advice for couples.

6. **Curated Relationship Questions Bank (`/relationship-questions`)**
   - Categorized directory of deep intimacy questions, playful prompts, future vision discussions, and growth inquiries.
   - Interactive random card generator with one-click clipboard copy.

7. **AI Relationship Assistant (`/ai-relationship-advisor`)**
   - Powered server-side by Google Gemini (`gemini-3.6-flash`).
   - Helps couples brainstorm date night ideas, frame delicate conversations constructively, and practice active listening.
   - Built-in crisis safety guardrails and direct helpline referrals.

8. **Editorial Guides & Articles (`/articles/`)**
   - In-depth, search-intent focused articles covering relationship science, milestone traditions, and communication psychology.
   - Breadcrumb navigation, reading times, related tools integration, and Schema.org `Article` metadata.

---

## 🛠️ Architecture & Tech Stack

- **Runtime**: Node.js 22 (ESM)
- **Web Framework**: Express.js (ultra-lightweight, zero cold-start latency)
- **AI Engine**: `@google/genai` (server-side, secure environment variable proxy)
- **Styling**: Modern, responsive CSS design system (zero runtime overhead, mobile-first, zero layout shifts)
- **Monetization**: Adsterra ad slots integrated in zero-CLS containers with non-deceptive placements.
- **SEO**: Clean semantic HTML, XML Sitemap (`/sitemap.xml`), Robots directive (`/robots.txt`), OpenGraph, Twitter Cards, and Schema.org JSON-LD.

---

## 📦 Getting Started & Local Development

### 1. Prerequisites
- Node.js 18+ installed

### 2. Installation
```bash
git clone https://github.com/abdul4224/Lovescoretest.git
cd Lovescoretest
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
# Optional: Google Gemini API Key for the AI Relationship Assistant
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If no API key is provided, the AI assistant gracefully returns curated communication frameworks).*

### 4. Run Development Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

---

## 🌐 Custom Domain Setup (`lovescoretest.com`)

When deploying to Google Cloud Run, Vercel, Render, or any VPS:
1. Point your DNS `A` records to your server IP, or add a `CNAME` record pointing to your cloud host domain.
2. In your cloud provider dashboard, map custom domain `lovescoretest.com` and `www.lovescoretest.com`.
3. SSL certificates are provisioned automatically by Cloud Run / Cloudflare.

---

## 🔒 Security & Privacy Practices

- **Zero Client Data Persistence**: Names, dates of birth, and relationship start dates are never stored in databases or log files.
- **Server-Side AI API Proxy**: The `GEMINI_API_KEY` is never exposed in client JavaScript or public markup.
- **In-Memory Rate Limiting**: The `/api/ai-advisor` endpoint limits queries per IP to prevent bot abuse and excessive quota consumption.
- **Crisis Safeguards**: Queries indicating physical harm or domestic abuse automatically trigger emergency crisis resources.

---

## 📄 License & Ownership
Copyright © LoveScoreTest.com. Built for couples, partners, and connection worldwide.
Contact: `nonelikeyou422@gmail.com`
