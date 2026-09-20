import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  renderLayout,
  renderHomePage,
  renderLoveCompatibilityPage,
  renderLoveCalculatorPage,
  renderRelationshipCalculatorPage,
  renderAnniversaryCalculatorPage,
  renderCoupleCompatibilityPage,
  renderRelationshipQuestionsPage,
  renderAIAdvisorPage,
  renderArticlesIndexPage,
  renderArticleDetailPage,
  renderAboutPage,
  renderContactPage,
  renderPrivacyPage,
  renderTermsPage,
  renderDisclaimerPage,
  renderShipNameGeneratorPage
} from './src/templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
// Serve all static assets from public/ (CSS, JS, icons, SVG, images)
app.use(express.static(path.join(__dirname, 'public')));

// Load Data
const articlesPath = path.join(__dirname, 'data', 'articles.json');
const questionsPath = path.join(__dirname, 'data', 'questions.json');

let articles = [];
let questions = [];

try {
  articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
} catch (err) {
  console.error('Error loading articles:', err);
}

try {
  questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
} catch (err) {
  console.error('Error loading questions:', err);
}

// In-Memory Rate Limiter for AI endpoint (5 requests per min per IP)
const ipRequestMap = new Map();
function rateLimitMiddleware(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 10;

  let record = ipRequestMap.get(ip);
  if (!record || now - record.startTime > windowMs) {
    record = { startTime: now, count: 1 };
    ipRequestMap.set(ip, record);
    return next();
  }

  if (record.count >= maxRequests) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a minute before asking another question.'
    });
  }

  record.count++;
  next();
}

// Clean up stale rate limits every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRequestMap.entries()) {
    if (now - record.startTime > 60000) {
      ipRequestMap.delete(ip);
    }
  }
}, 300000);

// ====================================================
// AI Relationship Assistant API Endpoint
// ====================================================
app.post('/api/ai-advisor', rateLimitMiddleware, async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ error: 'Please provide a valid question.' });
    }

    const trimmedQuestion = question.trim().slice(0, 300);

    // Crisis / Harm detection check
    const crisisKeywords = [
  'hurt myself',
  'kill myself',
  'suicide',
  'self harm',
  'self-harm',
  'want to die',
  'end my life',
  'hit me',
  'beat me',
  'physically abuse',
  'physical abuse',
  'physical violence',
  'domestic violence',
  'abuse me',
  'abused me',
  'being abused',
  'partner hurts me',
  'partner hit me',
  'partner threatened me',
  'threatened to hurt me',
  'afraid of my partner',
  'scared of my partner',
  'unsafe in my relationship',
  'feel unsafe with my partner',
  'controlling me and i am scared'
];
    const isCrisis = crisisKeywords.some(kw => trimmedQuestion.toLowerCase().includes(kw));

    if (isCrisis) {
      return res.json({
        reply: "Your safety and emotional well-being are paramount. If you or someone you know is in immediate danger or experiencing domestic abuse, please connect with trained professionals right away:\n\n• National Domestic Violence Hotline: Call 1-800-799-SAFE (7233) or text 'START' to 88788.\n• Crisis Text Line: Text HOME to 741741 (Free, 24/7, confidential).\n• Suicide & Crisis Lifeline: Call or text 988.\n\nYou do not have to carry this alone."
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Graceful fallback response when API key is not configured
      return res.json({
        reply: `Thank you for sharing your question: "${trimmedQuestion}".\n\nHere is a foundational communication framework to consider:\n1. Lead with curiosity: Begin conversations by asking to understand your partner's perspective before defending your own.\n2. Use "I feel" statements rather than "You make me feel" or "You always" accusations.\n3. Take a 15-minute emotional timeout if heart rates rise, agreeing on a specific time to circle back calmly.\n\n(Note: To enable live generative AI responses, configure the GEMINI_API_KEY environment variable in Settings).`
      });
    }

    // Lazy initialization of GenAI SDK
    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are the empathetic, thoughtful AI Relationship Advisor on LoveScoreTest.com.
Your purpose: Help partners and couples navigate daily relationship questions, brainstorm date ideas, and practice healthy, constructive communication habits.

STRICT SAFETY RULES:
1. You are NOT a doctor, psychologist, marriage therapist, or attorney. Never diagnose mental disorders, personality styles, or attachment disorders.
2. Never encourage manipulation, dishonesty, jealousy testing, or retaliation.
3. If the user mentions domestic violence, abuse, severe distress, or self-harm, immediately provide safety hotlines (e.g. 1-800-799-SAFE or 988) and urge contacting emergency professionals.
4. Keep answers warm, concise (2-4 brief paragraphs), and actionable. Focus on active listening, empathy, mutual validation, and practical steps.`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: trimmedQuestion,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          maxOutputTokens: 600
        }
      });
      responseText = response.text || '';
    } catch (modelErr) {
      // Fallback to gemini-3.6-flash if gemini-3.8-flash is temporarily unavailable
      console.warn('Primary model gemini-3.8-flash fallback to gemini-3.6-flash:', modelErr.message);
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: trimmedQuestion,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          maxOutputTokens: 600
        }
      });
      responseText = fallbackResponse.text || '';
    }

    const reply = responseText || "I apologize, but I could not generate a response. Please try asking again.";
    return res.json({ reply });
  } catch (error) {
    console.error('Error in AI advisor endpoint:', error);
    return res.status(500).json({
      error: 'Our AI relationship advisor is currently experiencing high demand. Please try again shortly.'
    });
  }
});

// ====================================================
// Core Application Routes
// ====================================================

// Homepage
app.get('/', (req, res) => {
  res.send(renderHomePage({ articles, questions }));
});

// Tools
app.get('/love-compatibility', (req, res) => {
  res.send(renderLoveCompatibilityPage());
});

app.get('/love-calculator', (req, res) => {
  res.send(renderLoveCalculatorPage());
});

app.get('/relationship-calculator', (req, res) => {
  res.send(renderRelationshipCalculatorPage());
});

app.get('/anniversary-calculator', (req, res) => {
  res.send(renderAnniversaryCalculatorPage());
});

app.get('/couple-compatibility', (req, res) => {
  res.send(renderCoupleCompatibilityPage());
});

app.get('/relationship-questions', (req, res) => {
  res.send(renderRelationshipQuestionsPage({ questions }));
});

app.get('/ai-relationship-advisor', (req, res) => {
  res.send(renderAIAdvisorPage());
});

// Articles
app.get(['/articles', '/articles/'], (req, res) => {
  res.send(renderArticlesIndexPage({ articles }));
});

app.get('/articles/:slug', (req, res) => {
  const { slug } = req.params;
  const article = articles.find(a => a.slug === slug);
  if (!article) {
    return res.status(404).send(renderLayout({
      title: "Article Not Found",
      description: "The requested relationship guide could not be found.",
      canonical: "https://lovescoretest.com/articles",
      bodyContent: `
        <div class="container-narrow" style="padding:60px 20px;text-align:center;">
          <h1>Article Not Found</h1>
          <p style="margin:16px 0 24px;">The article you are looking for does not exist or has moved.</p>
          <a href="/articles" class="btn btn-primary">Browse All Articles &rarr;</a>
        </div>
      `
    }));
  }

  const related = articles.filter(a => a.slug !== slug);
  res.send(renderArticleDetailPage({ article, relatedArticles: related }));
});

// Trust & Legal Pages
app.get('/about', (req, res) => {
  res.send(renderAboutPage());
});

app.get('/contact', (req, res) => {
  res.send(renderContactPage());
});

app.get('/privacy-policy', (req, res) => {
  res.send(renderPrivacyPage());
});

app.get('/terms', (req, res) => {
  res.send(renderTermsPage());
});

app.get('/disclaimer', (req, res) => {
  res.send(renderDisclaimerPage());
});

app.get('/ship-name-generator', (req, res) => {
  res.send(renderShipNameGeneratorPage());
});

// Legacy 301 Redirects to preserve 100% SEO authority and incoming backlinks from old site
const legacyRedirects = [
  ['/index.html', '/'],
  ['/friendship-score', '/couple-compatibility'],
  ['/friendship-score.html', '/couple-compatibility'],
  ['/love-calculator-by-birthdate', '/love-compatibility'],
  ['/love-calculator-by-birthdate.html', '/love-compatibility'],
  ['/relationship-days-calculator', '/relationship-calculator'],
  ['/relationship-days-calculator.html', '/relationship-calculator'],
  ['/zodiac-compatibility', '/love-compatibility'],
  ['/zodiac-compatibility.html', '/love-compatibility'],
  ['/fun-compatibility-questions', '/relationship-questions'],
  ['/fun-compatibility-questions.html', '/relationship-questions'],
  ['/ship-name-generator.html', '/ship-name-generator'],
  ['/what-does-compatibility-percentage-mean', '/articles/how-love-calculators-work-algorithms-and-entertainment'],
  ['/what-does-compatibility-percentage-mean.html', '/articles/how-love-calculators-work-algorithms-and-entertainment'],
  ['/does-zodiac-compatibility-matter', '/articles/zodiac-compatibility-guide-elements-and-relationships'],
  ['/does-zodiac-compatibility-matter.html', '/articles/zodiac-compatibility-guide-elements-and-relationships'],
  ['/about.html', '/about'],
  ['/contact.html', '/contact'],
  ['/privacy-policy.html', '/privacy-policy'],
  ['/terms.html', '/terms']
];

legacyRedirects.forEach(([from, to]) => {
  app.get(from, (req, res) => res.redirect(301, to));
});

// ====================================================
// Technical SEO: Sitemap & Robots
// ====================================================
app.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  const baseUrl = 'https://lovescoretest.com';
  const today = new Date().toISOString().split('T')[0];

  const coreRoutes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/love-compatibility', priority: '0.9', changefreq: 'weekly' },
    { url: '/love-calculator', priority: '0.9', changefreq: 'weekly' },
    { url: '/relationship-calculator', priority: '0.9', changefreq: 'weekly' },
    { url: '/anniversary-calculator', priority: '0.8', changefreq: 'weekly' },
    { url: '/ship-name-generator', priority: '0.8', changefreq: 'weekly' },
    { url: '/couple-compatibility', priority: '0.8', changefreq: 'weekly' },
    { url: '/relationship-questions', priority: '0.8', changefreq: 'weekly' },
    { url: '/ai-relationship-advisor', priority: '0.8', changefreq: 'weekly' },
    { url: '/articles', priority: '0.8', changefreq: 'daily' },
    { url: '/about', priority: '0.5', changefreq: 'monthly' },
    { url: '/contact', priority: '0.5', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.4', changefreq: 'monthly' },
    { url: '/terms', priority: '0.4', changefreq: 'monthly' },
    { url: '/disclaimer', priority: '0.4', changefreq: 'monthly' }
  ];

  const articleRoutes = articles.map(art => ({
    url: `/articles/${art.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: art.updatedDate || today
  }));

  const allUrls = [...coreRoutes, ...articleRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(item => `  <url>
    <loc>${baseUrl}${item.url}</loc>
    <lastmod>${item.lastmod || today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.send(xml);
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /

Sitemap: https://lovescoretest.com/sitemap.xml
`);
});

// Fallback 404
app.use((req, res) => {
  res.status(404).send(renderLayout({
    title: "Page Not Found - 404",
    description: "The page you requested could not be found.",
    canonical: "https://lovescoretest.com/",
    bodyContent: `
      <div class="container-narrow" style="padding:80px 20px;text-align:center;">
        <span class="hero-pill">404</span>
        <h1 style="margin:16px 0;">Page Not Found</h1>
        <p style="margin-bottom:28px;">The relationship tool or page you are looking for has been relocated.</p>
        <a href="/" class="btn btn-primary">Return to Homepage &rarr;</a>
      </div>
    `
  }));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`LoveScoreTest SaaS server running on port ${PORT}`);
});
