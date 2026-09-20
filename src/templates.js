// LoveScoreTest SaaS Template Engine

const AD_300X250 = `
<div class="ad-slot-wrapper" id="ad-slot-300x250">
  <div class="ad-label">Advertisement</div>
  <div class="ad-container-300x250">
    <script>
      atOptions = {
        'key' : '358664223067c01ff85de9714367fe2e',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    </script>
    <script src="https://www.highrevenueformat.com/358664223067c01ff85de9714367fe2e/invoke.js"></script>
  </div>
</div>
`;

const AD_728X90 = `
<div class="ad-slot-wrapper ad-desktop-only" id="ad-slot-728x90">
  <div class="ad-label">Advertisement</div>
  <div class="ad-container-728x90">
    <script>
      atOptions = {
        'key' : '08591617b0d54beb48cfca5ec87f584a',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    </script>
    <script src="https://www.highrevenueformat.com/08591617b0d54beb48cfca5ec87f584a/invoke.js"></script>
  </div>
</div>
`;

export function renderLayout({
  title,
  description,
  canonical,
  activeNav = '',
  schema = null,
  bodyContent = '',
  scripts = ''
}) {
  const defaultSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://lovescoretest.com/#website",
        "url": "https://lovescoretest.com/",
        "name": "LoveScoreTest",
        "description": "Love, relationship, and couple compatibility SaaS platform with calculators, anniversary tracking, AI advice, and guides."
      },
      {
        "@type": "Organization",
        "@id": "https://lovescoretest.com/#organization",
        "name": "LoveScoreTest",
        "url": "https://lovescoretest.com/",
        "logo": "https://lovescoretest.com/apple-touch-icon.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "nonelikeyou422@gmail.com",
          "contactType": "Customer Support"
        }
      }
    ]
  };

  const currentSchema = schema ? schema : defaultSchema;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | LoveScoreTest</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="index, follow">
  <link rel="icon" type="image/svg+xml" href="/lovescoretest-icon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${title} | LoveScoreTest">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="https://lovescoretest.com/og-image.png">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonical}">
  <meta name="twitter:title" content="${title} | LoveScoreTest">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="https://lovescoretest.com/og-image.png">

  <!-- Google Fonts: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="/css/style.css">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
    ${JSON.stringify(currentSchema, null, 2)}
  </script>
</head>
<body>
  <!-- Global Navigation -->
  <header class="site-nav" id="main-header">
    <div class="container nav-wrapper">
      <a href="/" class="brand-logo" id="nav-brand-logo">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <span>LoveScoreTest</span>
        <span class="brand-badge">SaaS</span>
      </a>
      
      <nav aria-label="Main Navigation" class="desktop-nav">
        <ul class="nav-links">
          <!-- Tools Dropdown -->
          <li class="nav-item">
            <button class="nav-link" type="button" aria-haspopup="true" aria-expanded="false">
              Tools <span class="nav-chevron">▾</span>
            </button>
            <div class="nav-dropdown" role="menu">
              <a href="/love-compatibility" class="dropdown-item" role="menuitem">
                <div class="dropdown-icon">💖</div>
                <div class="dropdown-text">
                  <h4>Love Compatibility</h4>
                  <p>Multi-dimensional matching analysis</p>
                </div>
              </a>
              <a href="/love-calculator" class="dropdown-item" role="menuitem">
                <div class="dropdown-icon">⚡</div>
                <div class="dropdown-text">
                  <h4>Love Calculator</h4>
                  <p>Classic name match percentage</p>
                </div>
              </a>
              <a href="/relationship-calculator" class="dropdown-item" role="menuitem">
                <div class="dropdown-icon">⏳</div>
                <div class="dropdown-text">
                  <h4>Relationship Duration</h4>
                  <p>Track live days, hours, and seconds</p>
                </div>
              </a>
              <a href="/anniversary-calculator" class="dropdown-item" role="menuitem">
                <div class="dropdown-icon">🎁</div>
                <div class="dropdown-text">
                  <h4>Anniversary Calculator</h4>
                  <p>Milestone countdown &amp; gift themes</p>
                </div>
              </a>
              <a href="/ship-name-generator" class="dropdown-item" role="menuitem">
                <div class="dropdown-icon">💫</div>
                <div class="dropdown-text">
                  <h4>Ship Name Generator</h4>
                  <p>Combine two names into couple nicknames</p>
                </div>
              </a>
              <a href="/couple-compatibility" class="dropdown-item" role="menuitem">
                <div class="dropdown-icon">🧩</div>
                <div class="dropdown-text">
                  <h4>Couple Harmony Quiz</h4>
                  <p>5-question relationship diagnostic</p>
                </div>
              </a>
              <a href="/relationship-questions" class="dropdown-item" role="menuitem">
                <div class="dropdown-icon">💬</div>
                <div class="dropdown-text">
                  <h4>Relationship Questions</h4>
                  <p>Deep intimacy &amp; date prompts</p>
                </div>
              </a>
            </div>
          </li>

          <!-- Compatibility Dropdown -->
          <li class="nav-item">
            <button class="nav-link ${activeNav === 'compatibility' || activeNav === 'love-calculator' || activeNav === 'quiz' ? 'active' : ''}" type="button" aria-haspopup="true" aria-expanded="false">
              Compatibility <span class="nav-chevron">▾</span>
            </button>
            <div class="nav-dropdown" role="menu">
              <a href="/love-compatibility" class="dropdown-item" role="menuitem">
                <div class="dropdown-icon">💖</div>
                <div class="dropdown-text">
                  <h4>Love Compatibility Calculator</h4>
                  <p>Multi-factor name, date &amp; zodiac match</p>
                </div>
              </a>
              <a href="/love-calculator" class="dropdown-item" role="menuitem">
                <div class="dropdown-icon">⚡</div>
                <div class="dropdown-text">
                  <h4>Classic Love Calculator</h4>
                  <p>Instant deterministic percentage</p>
                </div>
              </a>
              <a href="/couple-compatibility" class="dropdown-item" role="menuitem">
                <div class="dropdown-icon">🧩</div>
                <div class="dropdown-text">
                  <h4>Couple Harmony Quiz</h4>
                  <p>Communication &amp; conflict assessment</p>
                </div>
              </a>
            </div>
          </li>

          <!-- Relationship Dropdown -->
          <li class="nav-item">
            <button class="nav-link ${activeNav === 'relationship-calculator' || activeNav === 'anniversary' || activeNav === 'questions' || activeNav === 'ship-name' ? 'active' : ''}" type="button" aria-haspopup="true" aria-expanded="false">
              Relationship <span class="nav-chevron">▾</span>
            </button>
            <div class="nav-dropdown" role="menu">
              <a href="/relationship-calculator" class="dropdown-item" role="menuitem">
                <div class="dropdown-icon">⏳</div>
                <div class="dropdown-text">
                  <h4>Relationship Duration Tracker</h4>
                  <p>Live days together &amp; milestones</p>
                </div>
              </a>
              <a href="/anniversary-calculator" class="dropdown-item" role="menuitem">
                <div class="dropdown-icon">🎁</div>
                <div class="dropdown-text">
                  <h4>Anniversary Calculator</h4>
                  <p>Countdown &amp; traditional gift guide</p>
                </div>
              </a>
              <a href="/ship-name-generator" class="dropdown-item" role="menuitem">
                <div class="dropdown-icon">💫</div>
                <div class="dropdown-text">
                  <h4>Ship Name Generator</h4>
                  <p>Blend partner names into couple nicknames</p>
                </div>
              </a>
              <a href="/relationship-questions" class="dropdown-item" role="menuitem">
                <div class="dropdown-icon">💬</div>
                <div class="dropdown-text">
                  <h4>50 Relationship Questions</h4>
                  <p>Curated conversation starters</p>
                </div>
              </a>
            </div>
          </li>

          <!-- Direct Links -->
          <li class="nav-item">
            <a href="/ai-relationship-advisor" class="nav-link ${activeNav === 'ai' ? 'active' : ''}">
              AI Advisor
            </a>
          </li>
          <li class="nav-item">
            <a href="/articles" class="nav-link ${activeNav === 'articles' ? 'active' : ''}">
              Articles
            </a>
          </li>
        </ul>
      </nav>

      <div class="nav-actions">
        <a href="/love-compatibility" class="btn btn-primary nav-cta-btn">Check Compatibility</a>
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle navigation menu" aria-expanded="false">
          <span class="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div class="mobile-nav-panel" id="mobileNavPanel">
      <div class="mobile-nav-group-title">Compatibility</div>
      <ul>
        <li><a href="/love-compatibility" class="${activeNav === 'compatibility' ? 'active' : ''}">💖 Love Compatibility Calculator</a></li>
        <li><a href="/love-calculator" class="${activeNav === 'love-calculator' ? 'active' : ''}">⚡ Classic Love Calculator</a></li>
        <li><a href="/couple-compatibility" class="${activeNav === 'quiz' ? 'active' : ''}">🧩 Couple Harmony Quiz</a></li>
      </ul>

      <div class="mobile-nav-group-title">Relationship Tools</div>
      <ul>
        <li><a href="/relationship-calculator" class="${activeNav === 'relationship-calculator' ? 'active' : ''}">⏳ Days Together Calculator</a></li>
        <li><a href="/anniversary-calculator" class="${activeNav === 'anniversary' ? 'active' : ''}">🎁 Anniversary Milestones</a></li>
        <li><a href="/ship-name-generator" class="${activeNav === 'ship-name' ? 'active' : ''}">💫 Ship Name Generator</a></li>
        <li><a href="/relationship-questions" class="${activeNav === 'questions' ? 'active' : ''}">💬 Relationship Questions Bank</a></li>
      </ul>

      <div class="mobile-nav-group-title">Smart Assistant &amp; Guides</div>
      <ul>
        <li><a href="/ai-relationship-advisor" class="${activeNav === 'ai' ? 'active' : ''}">🤖 AI Relationship Assistant</a></li>
        <li><a href="/articles" class="${activeNav === 'articles' ? 'active' : ''}">📚 Articles &amp; Advice Hub</a></li>
      </ul>

      <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border);">
        <a href="/love-compatibility" class="btn btn-primary btn-block">Check Compatibility &rarr;</a>
      </div>
    </div>
  </header>

  <!-- Page Main Content -->
  <main id="main-content">
    ${bodyContent}
  </main>

  <!-- Global Footer -->
  <footer class="site-footer" id="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <a href="/" class="brand-logo" style="color:#ffffff;margin-bottom:14px;">
            <div class="brand-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span>LoveScoreTest</span>
          </a>
          <p style="color:var(--slate-400);font-size:0.92rem;line-height:1.6;margin-bottom:14px;">
            The modern love, relationship, and couple compatibility platform. Providing deterministic tools, milestone countdowns, deep reflection prompts, and evidence-informed advice.
          </p>
          <div class="footer-disclaimer-text">
            Notice: Compatibility percentages and quizzes are designed for entertainment, reflection, and joyful conversation.
          </div>
        </div>

        <div class="footer-col">
          <h4>Calculators &amp; Tools</h4>
          <ul>
            <li><a href="/love-compatibility">Love Compatibility</a></li>
            <li><a href="/love-calculator">Love Percentage Calculator</a></li>
            <li><a href="/relationship-calculator">Days Together Calculator</a></li>
            <li><a href="/anniversary-calculator">Anniversary Milestones</a></li>
            <li><a href="/ship-name-generator">Ship Name Generator</a></li>
            <li><a href="/couple-compatibility">Couple Harmony Quiz</a></li>
            <li><a href="/relationship-questions">Conversation Prompts</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>AI &amp; Editorial Guides</h4>
          <ul>
            <li><a href="/ai-relationship-advisor">AI Relationship Assistant</a></li>
            <li><a href="/articles">All Relationship Articles</a></li>
            <li><a href="/articles/how-love-calculators-work-algorithms-and-entertainment">Love Calculator Science</a></li>
            <li><a href="/articles/essential-anniversary-milestones-for-couples">Anniversary Milestones Guide</a></li>
            <li><a href="/articles/50-deep-relationship-questions-to-strengthen-intimacy">50 Deep Couple Questions</a></li>
            <li><a href="/articles/understanding-communication-styles-in-relationships">Communication Styles Guide</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Trust &amp; Transparency</h4>
          <ul>
            <li><a href="/about">About Our Mission</a></li>
            <li><a href="/contact">Contact Support</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/disclaimer">Entertainment &amp; Health Disclaimer</a></li>
            <li><a href="/sitemap.xml">XML Sitemap</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} LoveScoreTest.com. All rights reserved.</p>
        <p>Built for couples, partners, and connection worldwide • In-browser privacy architecture.</p>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="/js/calculators.js"></script>
  ${scripts}
</body>
</html>`;
}

// ==========================================
// Page: Homepage
// ==========================================
export function renderHomePage({ articles }) {
  const content = `
    <!-- Hero Section (Clean 2026 Product Hero) -->
    <section class="hero-section" id="home-hero">
      <div class="container">
        <div class="hero-grid">
          <!-- Hero Left Column: Copy & Actions -->
          <div class="hero-content">
            <span class="hero-badge"><span class="pulse-dot"></span> 2026 Relationship Intelligence Suite</span>
            <h1 class="hero-title">
              Relationship intelligence. <br><span class="hero-title-accent">Engineered for real connection.</span>
            </h1>
            <p class="hero-lead">
              Deterministic compatibility modeling, live milestone countdowns, and private AI-assisted reflection — calculators run in-browser without saving inputs or building user profiles.
            </p>

            <div class="hero-actions">
              <a href="#live-compatibility-experience" class="btn btn-primary btn-lg" id="hero-cta-compat">
                Start Compatibility Assessment &darr;
              </a>
              <a href="#popular-tools" class="btn btn-secondary btn-lg" id="hero-cta-tools">
                Explore All 8 Tools
              </a>
            </div>

            <div class="hero-trust-bar">
              <div class="hero-trust-item">
                <span>🔒</span>
                <span>In-Browser Calculations</span>
              </div>
              <div class="hero-trust-item">
                <span>⚡</span>
                <span>Deterministic Formulas</span>
              </div>
              <div class="hero-trust-item">
                <span>🤖</span>
                <span>AI Assistant (Gemini API)</span>
              </div>
            </div>
          </div>

          <!-- Hero Right Column: LoveScore Studio™ SaaS Product Canvas -->
          <div class="hero-preview-col" aria-label="Interactive Product Canvas Preview">
            <div class="studio-app-window">
              <div class="studio-chrome-bar">
                <div class="studio-traffic-dots">
                  <span class="studio-traffic-dot"></span>
                  <span class="studio-traffic-dot"></span>
                  <span class="studio-traffic-dot"></span>
                </div>
                <div class="studio-window-title">LoveScore Studio™ • Connection &amp; Harmony Engine</div>
                <div class="studio-status-pill">
                  <span class="live-dot"></span> In-Browser Sandbox v2.6
                </div>
              </div>

              <div class="studio-body">
                <!-- Partner Header -->
                <div class="studio-couple-deck">
                  <div class="studio-partner-card">
                    <div class="studio-avatar">M</div>
                    <div class="studio-partner-info">
                      <h4>Maya Thorne</h4>
                      <span>Scorpio ♏ • Water</span>
                    </div>
                  </div>
                  <div class="studio-synergy-connector" title="Resonance Bridge">
                    <span>⚡</span>
                  </div>
                  <div class="studio-partner-card" style="justify-content:flex-end;text-align:right;">
                    <div class="studio-partner-info">
                      <h4>Julian Brooks</h4>
                      <span>Cancer ♋ • Water</span>
                    </div>
                    <div class="studio-avatar">J</div>
                  </div>
                </div>

                <!-- Horizontal Compatibility Spectrum -->
                <div class="studio-spectrum-card">
                  <div class="studio-spectrum-head">
                    <div class="studio-score-wrap">
                      <span class="studio-big-score">92%</span>
                      <span style="font-size:0.85rem;font-weight:700;color:var(--zinc-900);">Harmony Resonance</span>
                    </div>
                    <span class="studio-score-tag">Exceptional Attunement</span>
                  </div>
                  <div class="studio-segmented-track" aria-label="Synergy Spectrum: 92%">
                    <div class="studio-segment-fill active"></div>
                    <div class="studio-segment-fill active"></div>
                    <div class="studio-segment-fill active"></div>
                    <div class="studio-segment-fill active"></div>
                    <div class="studio-segment-fill active"></div>
                  </div>
                </div>

                <!-- 4 Horizontal Attunement Dimensions -->
                <div class="studio-metrics-grid">
                  <div class="studio-metric-box">
                    <div class="studio-metric-top">
                      <span>Communication Rhythm</span>
                      <span style="color:var(--brand-primary);font-weight:750;">94%</span>
                    </div>
                    <div class="studio-metric-bar"><div class="studio-metric-bar-fill" style="width:94%;"></div></div>
                  </div>
                  <div class="studio-metric-box">
                    <div class="studio-metric-top">
                      <span>Emotional Depth</span>
                      <span style="color:var(--brand-primary);font-weight:750;">89%</span>
                    </div>
                    <div class="studio-metric-bar"><div class="studio-metric-bar-fill" style="width:89%;"></div></div>
                  </div>
                  <div class="studio-metric-box">
                    <div class="studio-metric-top">
                      <span>Shared Life Vision</span>
                      <span style="color:var(--brand-primary);font-weight:750;">93%</span>
                    </div>
                    <div class="studio-metric-bar"><div class="studio-metric-bar-fill" style="width:93%;"></div></div>
                  </div>
                  <div class="studio-metric-box">
                    <div class="studio-metric-top">
                      <span>Playful Chemistry</span>
                      <span style="color:var(--brand-primary);font-weight:750;">91%</span>
                    </div>
                    <div class="studio-metric-bar"><div class="studio-metric-bar-fill" style="width:91%;"></div></div>
                  </div>
                </div>

                <!-- Suggested Conversation Starter -->
                <div class="studio-prompt-callout">
                  <div>
                    <strong>AI Suggested Date Prompt</strong>
                    <span>"What is one small tradition you'd love for us to create together this upcoming year?"</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Responsive Ad Container (Zero CLS) -->
    <div class="container ad-section-container">
      ${AD_728X90}
    </div>

    <!-- Section C: Primary Product Experience (Live Interactive Compatibility Tool) -->
    <section class="home-product-stage" id="live-compatibility-experience">
      <div class="container">
        <div class="product-stage-box">
          <div class="stage-header-row">
            <div class="stage-title-wrap">
              <span class="section-eyebrow" style="margin-bottom:8px;">Interactive Engine</span>
              <h3>Love Compatibility Matcher</h3>
              <p>Enter two names to calculate an instant multi-dimensional compatibility assessment right here.</p>
            </div>
            <div class="stage-privacy-chip">
              <span>🔒</span> In-Browser Client Computation
            </div>
          </div>

          <form id="homeCompatibilityForm" class="home-calc-form">
            <div class="form-group">
              <label class="form-label" for="homePartner1Name">First Partner Name</label>
              <input type="text" id="homePartner1Name" class="form-input" placeholder="e.g. Alex" required autocomplete="off">
            </div>
            <div class="form-group">
              <label class="form-label" for="homePartner2Name">Second Partner Name</label>
              <input type="text" id="homePartner2Name" class="form-input" placeholder="e.g. Taylor" required autocomplete="off">
            </div>
            <button type="submit" class="btn btn-primary" id="homeCalcSubmitBtn" style="padding:12px 24px;height:46px;">
              Calculate Compatibility &rarr;
            </button>
          </form>

          <!-- Result Card (Revealed on submission) -->
          <div class="result-card" id="homeCompatibilityResult">
            <div style="text-align:center;">
              <div class="score-badge">
                <span id="homeScoreValue">0</span><span class="score-percent-sign">%</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill" id="homeScoreFill"></div>
              </div>
              <p id="homeResultAnalysis" style="font-size:1.05rem;color:var(--zinc-900);font-weight:600;margin-bottom:20px;"></p>
            </div>

            <div class="dimensions-grid">
              <div class="dimension-pill">
                <div class="dimension-title">Communication</div>
                <div class="dimension-value" id="homeCommScore">0%</div>
              </div>
              <div class="dimension-pill">
                <div class="dimension-title">Emotional Depth</div>
                <div class="dimension-value" id="homeEmotScore">0%</div>
              </div>
              <div class="dimension-pill">
                <div class="dimension-title">Playful Dynamic</div>
                <div class="dimension-value" id="homeFunScore">0%</div>
              </div>
              <div class="dimension-pill">
                <div class="dimension-title">Life Values</div>
                <div class="dimension-value" id="homeLifeScore">0%</div>
              </div>
            </div>

            <div class="disclaimer-box">
              <strong>100% Client-Side Privacy:</strong> Your entered names are processed locally in your browser memory and never stored in any external database.
            </div>

            <div class="share-bar">
              <span style="font-size:0.85rem;font-weight:600;color:var(--text-muted);">Share result:</span>
              <a href="#" id="shareWa" class="share-btn whatsapp" target="_blank" rel="noopener">WhatsApp</a>
              <a href="#" id="shareFb" class="share-btn facebook" target="_blank" rel="noopener">Facebook</a>
              <a href="#" id="shareTw" class="share-btn twitter" target="_blank" rel="noopener">X / Twitter</a>
              <button type="button" id="copyShare" class="share-btn">Copy Link</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section D: Popular Tools (Bento Discovery with Intentional Visual Hierarchy) -->
    <section class="container section-padded" id="popular-tools">
      <div class="section-header">
        <span class="section-eyebrow">Tool Suite</span>
        <h2>Curated Tools for Couples &amp; Relationships</h2>
        <p class="section-subtitle">
          Deterministic algorithms, milestone tracking, and relationship conversation starters. Runs 100% locally in your browser.
        </p>
      </div>

      <div class="tools-bento-grid">
        <!-- Flagship 1: Love Compatibility (6 Columns) -->
        <div class="bento-card-primary" id="card-love-compat">
          <div>
            <div class="bento-card-header">
              <div class="bento-icon">💖</div>
              <span class="bento-tag featured">Flagship Tool</span>
            </div>
            <div class="bento-card-body">
              <h3>Love Compatibility Calculator</h3>
              <p>Comprehensive multi-factor matching based on partner names, birthdates, and zodiac synergy with detailed 4-dimension breakdown.</p>
            </div>
          </div>
          <div class="bento-card-footer">
            <span style="font-size:0.8rem;color:var(--text-muted);font-weight:600;">Names • Birthdates • Zodiac</span>
            <a href="/love-compatibility" class="bento-cta-link">
              Calculate Compatibility <span>&rarr;</span>
            </a>
          </div>
        </div>

        <!-- Flagship 2: Relationship Duration (6 Columns) -->
        <div class="bento-card-primary" id="card-rel-calc">
          <div>
            <div class="bento-card-header">
              <div class="bento-icon">⏳</div>
              <span class="bento-tag featured">Live Tracker</span>
            </div>
            <div class="bento-card-body">
              <h3>Relationship Duration Calculator</h3>
              <p>Calculate your exact time together down to the second, total days, weeks, months, years, and countdown to your next anniversary milestone.</p>
              <div class="bento-ticker-preview" id="bentoLiveTicker" aria-label="Live Duration Counter">
                <span class="ticker-unit"><b id="bentoDaysTicker">742</b> days</span>
                <span class="ticker-unit"><b id="bentoHoursTicker">14</b> hrs</span>
                <span class="ticker-unit"><b id="bentoMinsTicker">32</b> min</span>
                <span class="ticker-unit"><b id="bentoSecsTicker">18</b> sec</span>
              </div>
            </div>
          </div>
          <div class="bento-card-footer">
            <span style="font-size:0.8rem;color:var(--text-muted);font-weight:600;">Live Seconds • Milestones</span>
            <a href="/relationship-calculator" class="bento-cta-link">
              Track Duration <span>&rarr;</span>
            </a>
          </div>
        </div>

        <!-- Flagship 3: AI Relationship Advisor Banner (12 Columns) -->
        <div class="bento-card-tertiary" id="card-ai-advisor">
          <div style="max-width:680px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
              <div class="bento-icon" style="width:36px;height:36px;font-size:18px;">🤖</div>
              <span class="bento-tag featured">Smart Assistant</span>
            </div>
            <h3 style="font-size:1.3rem;margin-bottom:6px;">AI Relationship Advisor</h3>
            <p style="font-size:0.95rem;color:var(--text-muted);line-height:1.55;margin-bottom:0;">
              Ask for creative date ideas, gentle communication frameworks, and active listening tips tailored to your situation. Private browser session.
            </p>
          </div>
          <div style="display:flex;align-items:center;gap:12px;flex-shrink:0;">
            <a href="/ai-relationship-advisor" class="btn btn-primary">
              Start Private Session &rarr;
            </a>
          </div>
        </div>

        <!-- Secondary Card 1: Couple Harmony Quiz (4 Columns) -->
        <div class="bento-card-compact" id="card-couple-quiz">
          <div>
            <div class="bento-card-header">
              <div class="bento-icon">🧩</div>
              <span class="bento-tag">Quiz</span>
            </div>
            <div class="bento-card-body">
              <h3>Couple Harmony Quiz</h3>
              <p>5 thoughtful questions on communication habits, conflict styles, and emotional support.</p>
            </div>
          </div>
          <div class="bento-card-footer">
            <span style="font-size:0.8rem;color:var(--text-muted);">5 Questions</span>
            <a href="/couple-compatibility" class="bento-cta-link">Take Quiz <span>&rarr;</span></a>
          </div>
        </div>

        <!-- Secondary Card 2: Anniversary Calculator (4 Columns) -->
        <div class="bento-card-compact" id="card-anniv-calc">
          <div>
            <div class="bento-card-header">
              <div class="bento-icon">🎁</div>
              <span class="bento-tag">Milestones</span>
            </div>
            <div class="bento-card-body">
              <h3>Anniversary Calculator</h3>
              <p>Countdown to your next celebration with traditional and modern gift recommendations for every year.</p>
            </div>
          </div>
          <div class="bento-card-footer">
            <span style="font-size:0.8rem;color:var(--text-muted);">Gift Themes</span>
            <a href="/anniversary-calculator" class="bento-cta-link">Plan Milestone <span>&rarr;</span></a>
          </div>
        </div>

        <!-- Secondary Card 3: Relationship Questions (4 Columns) -->
        <div class="bento-card-compact" id="card-rel-questions">
          <div>
            <div class="bento-card-header">
              <div class="bento-icon">💬</div>
              <span class="bento-tag">Prompts</span>
            </div>
            <div class="bento-card-body">
              <h3>50 Relationship Questions</h3>
              <p>Curated interactive card deck with conversation starters for date nights and road trips.</p>
            </div>
          </div>
          <div class="bento-card-footer">
            <span style="font-size:0.8rem;color:var(--text-muted);">50 Cards</span>
            <a href="/relationship-questions" class="bento-cta-link">Draw Prompts <span>&rarr;</span></a>
          </div>
        </div>

        <!-- Secondary Card 4: Ship Name Generator (4 Columns) -->
        <div class="bento-card-compact" id="card-ship-name">
          <div>
            <div class="bento-card-header">
              <div class="bento-icon">💫</div>
              <span class="bento-tag">Blender</span>
            </div>
            <div class="bento-card-body">
              <h3>Ship Name Generator</h3>
              <p>Combine two names into adorable couple nicknames like Bennifer. Phonetic ranking algorithm.</p>
            </div>
          </div>
          <div class="bento-card-footer">
            <span style="font-size:0.8rem;color:var(--text-muted);">Phonetic Match</span>
            <a href="/ship-name-generator" class="bento-cta-link">Blend Names <span>&rarr;</span></a>
          </div>
        </div>

        <!-- Secondary Card 5: Classic Love Calculator (4 Columns) -->
        <div class="bento-card-compact" id="card-love-calc">
          <div>
            <div class="bento-card-header">
              <div class="bento-icon">⚡</div>
              <span class="bento-tag">Classic Match</span>
            </div>
            <div class="bento-card-body">
              <h3>Classic Love Calculator</h3>
              <p>The beloved deterministic name match percentage. Fast, shareable with friends, and 100% fun.</p>
            </div>
          </div>
          <div class="bento-card-footer">
            <span style="font-size:0.8rem;color:var(--text-muted);">Instant %</span>
            <a href="/love-calculator" class="bento-cta-link">Check Score <span>&rarr;</span></a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section E: AI Relationship Advisor Feature Showcase -->
    <section class="section-padded ai-advisor-section" id="ai-assistant-spotlight">
      <div class="container">
        <div class="ai-advisor-layout">
          <!-- Left Column: Feature Narrative -->
          <div class="ai-advisor-info">
            <span class="section-eyebrow">Smart Guidance</span>
            <h2>Thoughtful Guidance for Everyday Couple Moments</h2>
            <p>
              Need a creative date idea on a budget, suggestions for repairing a small misunderstanding, or gentle conversation starters for dinner tonight? Our private AI advisor combines warmth, empathy, and constructive communication frameworks to help you brainstorm in seconds.
            </p>

            <ul class="ai-capabilities-list">
              <li>
                <span class="ai-check-icon">✓</span>
                <span><strong>Creative Date Planning:</strong> Memorable itineraries tailored to your budget, season, and interests.</span>
              </li>
              <li>
                <span class="ai-check-icon">✓</span>
                <span><strong>Communication Frameworks:</strong> Active listening principles, "I" statements, and de-escalation tips.</span>
              </li>
              <li>
                <span class="ai-check-icon">✓</span>
                <span><strong>Milestone &amp; Gratitude Prompts:</strong> Thoughtful reflections to celebrate anniversaries and daily appreciation.</span>
              </li>
            </ul>

            <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap;">
              <a href="/ai-relationship-advisor" class="btn btn-primary">Start Private Session &rarr;</a>
              <a href="/relationship-questions" class="btn btn-secondary">Browse 50 Questions</a>
            </div>

            <div class="ai-disclaimer-card">
              <strong>Notice:</strong> The AI Advisor offers reflective brainstorming and does not provide clinical couples therapy, psychiatric diagnosis, or emergency counseling.
            </div>
          </div>

          <!-- Right Column: Interactive Conversational Preview Card -->
          <div class="ai-conversation-card" id="homeAiPreviewCard">
            <div class="ai-chat-header-bar">
              <div class="ai-status-badge">
                <span class="ai-status-dot"></span>
                <span>AI Relationship Advisor</span>
              </div>
              <span style="font-size:0.75rem;color:var(--text-muted);">In-Browser Session</span>
            </div>

            <div class="ai-conversation-messages">
              <div class="ai-bubble user" id="homeAiUserBubble">
                Can you suggest 3 creative date ideas for a rainy Saturday under $30?
              </div>

              <div class="ai-bubble assistant" id="homeAiAssistantBubble">
                <p>Here are 3 cozy, high-connection date ideas for a rainy afternoon:</p>
                <ol>
                  <li><strong>Living-Room Vinyl &amp; Blanket Picnic:</strong> Spread out pillows, play favorite nostalgic records, and trade childhood stories.</li>
                  <li><strong>Pantry Dessert Challenge:</strong> Pick 3 surprise pantry ingredients and bake a creative dessert together.</li>
                  <li><strong>Future Bucket-List Deck:</strong> Draw 5 deep relationship questions over homemade chai tea or hot cocoa.</li>
                </ol>
              </div>
            </div>

            <div class="ai-prompt-chips-row">
              <button type="button" class="ai-prompt-chip-btn active" data-prompt="rainy-date">💡 Rainy Day Dates</button>
              <button type="button" class="ai-prompt-chip-btn" data-prompt="anniversary">🎁 2-Year Anniversary</button>
              <button type="button" class="ai-prompt-chip-btn" data-prompt="communication">💬 Resolving Conflict</button>
              <button type="button" class="ai-prompt-chip-btn" data-prompt="questions">❤️ Deep Intimacy</button>
            </div>

            <form action="/ai-relationship-advisor" method="GET" class="ai-quick-inquiry-box" style="margin-top:14px;display:flex;gap:8px;">
              <input type="text" name="q" class="form-input" placeholder="Ask AI Advisor a question..." style="font-size:0.85rem;padding:8px 12px;height:40px;">
              <button type="submit" class="btn btn-primary" style="height:40px;padding:0 16px;white-space:nowrap;font-size:0.85rem;">Ask AI &rarr;</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Section F: Relationship Insights (5 Core Pillars) -->
    <section class="container section-padded" id="relationship-insights">
      <div class="section-header">
        <span class="section-eyebrow">Relationship Principles</span>
        <h2>What You Can Learn From These Tools</h2>
        <p class="section-subtitle">
          Grounded, evidence-informed pillars to help couples cultivate safety, affection, and mutual growth.
        </p>
      </div>

      <div class="insights-grid">
        <div class="insight-card">
          <div class="insight-num">Pillar 01</div>
          <h3>Communication Dynamics</h3>
          <p>How you talk through disagreements, listen without defensiveness, and repair minor friction before it turns into resentment.</p>
        </div>

        <div class="insight-card">
          <div class="insight-num">Pillar 02</div>
          <h3>Emotional Attunement</h3>
          <p>Feeling safe to express vulnerabilities, celebrating daily wins together, and being each other's primary emotional haven.</p>
        </div>

        <div class="insight-card">
          <div class="insight-num">Pillar 03</div>
          <h3>Shared Life Vision</h3>
          <p>Aligning on lifestyle rhythms, financial priorities, family expectations, and building a meaningful future in lockstep.</p>
        </div>

        <div class="insight-card">
          <div class="insight-num">Pillar 04</div>
          <h3>Milestones &amp; Chapters</h3>
          <p>Marking every chapter of your shared timeline, celebrating annual gift traditions, and treasuring how far you've traveled together.</p>
        </div>

        <div class="insight-card">
          <div class="insight-num">Pillar 05</div>
          <h3>Curiosity &amp; Playfulness</h3>
          <p>Keeping novelty alive with deep questions, spontaneous date nights, shared laughter, and genuine day-to-day curiosity.</p>
        </div>
      </div>
    </section>

    <!-- Section G: Editorial Guides -->
    <section class="section-padded articles-section" id="editorial-guides">
      <div class="container">
        <div class="articles-section-header">
          <div>
            <span class="section-eyebrow">Editorial Hub</span>
            <h2>Relationship Guides &amp; Insights</h2>
            <p class="section-subtitle">Evidence-inspired reflections on communication styles, anniversary milestones, and couple dynamics.</p>
          </div>
          <a href="/articles" class="btn btn-secondary">View All Guides &rarr;</a>
        </div>

        <div class="articles-grid">
          ${articles.slice(0, 3).map(art => `
            <article class="article-card" id="article-${art.slug}">
              <div class="article-meta">
                <span class="article-badge">${art.category}</span>
                <span>${art.readTime}</span>
              </div>
              <h3><a href="/articles/${art.slug}">${art.title}</a></h3>
              <p>${art.summary}</p>
              <div class="article-footer">
                <a href="/articles/${art.slug}">Read Guide &rarr;</a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Section H: Trust & Privacy First -->
    <section class="container section-padded" id="trust-transparency">
      <div class="section-header">
        <span class="section-eyebrow">Trust &amp; Privacy</span>
        <h2>Built With Respect for Your Relationship Privacy</h2>
        <p class="section-subtitle">No accounts, no databases, and no invasive tracking.</p>
      </div>

      <div class="trust-grid">
        <div class="trust-col">
          <div class="trust-col-icon">🛡️</div>
          <h4>In-Browser Calculators</h4>
          <p>Name, birthdate, and duration calculations execute directly in your client's web browser memory without server database storage.</p>
        </div>
        <div class="trust-col">
          <div class="trust-col-icon">🔒</div>
          <h4>No Personal Profiling</h4>
          <p>We never sell your personal information or construct user tracking profiles from your calculator inputs.</p>
        </div>
        <div class="trust-col">
          <div class="trust-col-icon">⚡</div>
          <h4>Transparent Algorithms</h4>
          <p>Our tools use consistent, deterministic math formulas so your calculations produce repeatable, stable results.</p>
        </div>
        <div class="trust-col">
          <div class="trust-col-icon">💖</div>
          <h4>Honest Entertainment Context</h4>
          <p>Scores are designed for entertainment, emotional connection, and inspiring productive conversation between partners.</p>
        </div>
      </div>
    </section>

    <!-- Mid-Page 300x250 Ad Container (Zero CLS) -->
    <div class="container ad-section-container">
      ${AD_300X250}
    </div>

    <!-- Section I: FAQ Accordion -->
    <section class="container-narrow section-padded faq-section" id="faq-section">
      <div class="section-header">
        <span class="section-eyebrow">Common Questions</span>
        <h2>Frequently Asked Questions</h2>
        <p class="section-subtitle">Everything you need to know about our calculators, data privacy, and AI tools.</p>
      </div>

      <div class="faq-list">
        <div class="faq-item">
          <button type="button" class="faq-question" aria-expanded="false">
            <span>How does the Love Compatibility calculator work?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>
              Our calculator processes partner names, optional birthdates, and astrological elements through a deterministic algorithmic formula. It produces a repeatable percentage breakdown covering communication harmony, emotional depth, playful chemistry, and long-term values.
            </p>
          </div>
        </div>

        <div class="faq-item">
          <button type="button" class="faq-question" aria-expanded="false">
            <span>Is my personal data or relationship date saved anywhere?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>
              Calculator inputs (such as names, relationship dates, and quiz answers) run locally in your browser and are not saved to a database. When you use the optional AI Relationship Assistant, your question prompt is transmitted securely to our server and processed via Google's Gemini API to generate your response; prompts are not stored permanently or used for user profiling. Third-party advertising partners (such as Adsterra) may use standard cookies or beacons as described in our Privacy Policy.
            </p>
          </div>
        </div>

        <div class="faq-item">
          <button type="button" class="faq-question" aria-expanded="false">
            <span>Are love scores scientifically proven?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>
              No. Compatibility calculators and love percentage meters are strictly for entertainment, playful connection, and lighthearted reflection. True relationship happiness depends on daily communication, mutual respect, emotional attunement, and shared life goals.
            </p>
          </div>
        </div>

        <div class="faq-item">
          <button type="button" class="faq-question" aria-expanded="false">
            <span>What can the AI Relationship Assistant do?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>
              The AI assistant offers constructive suggestions for date nights, de-escalating minor misunderstandings, and practicing active listening. It is programmed with strict safety guardrails and does not provide clinical therapy, medical advice, or legal counsel.
            </p>
          </div>
        </div>

        <div class="faq-item">
          <button type="button" class="faq-question" aria-expanded="false">
            <span>Can I use LoveScoreTest on my mobile phone?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p>
              Yes! All LoveScoreTest calculators, question decks, and guides are 100% responsive and optimized for touchscreens on iOS and Android devices without needing any app download.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: "LoveScoreTest - Love Compatibility, Relationship Calculators & AI Advice",
    description: "Calculate love compatibility, count days together, explore anniversary milestones, take couple quizzes, and get thoughtful advice from our AI assistant.",
    canonical: "https://lovescoretest.com/",
    activeNav: '',
    bodyContent: content
  });
}

// ==========================================
// Page: Love Compatibility Calculator
// ==========================================
export function renderLoveCompatibilityPage() {
  const content = `
    <div class="container-narrow" style="padding-top:40px;">
      <div style="text-align:center;margin-bottom:28px;">
        <span class="hero-pill">💖 Multi-Factor Analysis</span>
        <h1>Love Compatibility Calculator</h1>
        <p>Enter your names, optional birthdates, and zodiac signs to discover your multi-dimensional compatibility profile.</p>
      </div>

      <div class="calculator-box" id="calc-container-compat">
        <form id="compatibilityForm">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="partner1Name">Partner 1 Name *</label>
              <input type="text" id="partner1Name" class="form-input" placeholder="e.g. Alex" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="partner2Name">Partner 2 Name *</label>
              <input type="text" id="partner2Name" class="form-input" placeholder="e.g. Jordan" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="partner1Dob">Partner 1 Birthday (Optional)</label>
              <input type="date" id="partner1Dob" class="form-input">
            </div>
            <div class="form-group">
              <label class="form-label" for="partner2Dob">Partner 2 Birthday (Optional)</label>
              <input type="date" id="partner2Dob" class="form-input">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="partner1Sign">Partner 1 Zodiac (Optional)</label>
              <select id="partner1Sign" class="form-select">
                <option value="">Select sign...</option>
                <option value="Aries">Aries (Mar 21 - Apr 19)</option>
                <option value="Taurus">Taurus (Apr 20 - May 20)</option>
                <option value="Gemini">Gemini (May 21 - Jun 20)</option>
                <option value="Cancer">Cancer (Jun 21 - Jul 22)</option>
                <option value="Leo">Leo (Jul 23 - Aug 22)</option>
                <option value="Virgo">Virgo (Aug 23 - Sep 22)</option>
                <option value="Libra">Libra (Sep 23 - Oct 22)</option>
                <option value="Scorpio">Scorpio (Oct 23 - Nov 21)</option>
                <option value="Sagittarius">Sagittarius (Nov 22 - Dec 21)</option>
                <option value="Capricorn">Capricorn (Dec 22 - Jan 19)</option>
                <option value="Aquarius">Aquarius (Jan 20 - Feb 18)</option>
                <option value="Pisces">Pisces (Feb 19 - Mar 20)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="partner2Sign">Partner 2 Zodiac (Optional)</label>
              <select id="partner2Sign" class="form-select">
                <option value="">Select sign...</option>
                <option value="Aries">Aries (Mar 21 - Apr 19)</option>
                <option value="Taurus">Taurus (Apr 20 - May 20)</option>
                <option value="Gemini">Gemini (May 21 - Jun 20)</option>
                <option value="Cancer">Cancer (Jun 21 - Jul 22)</option>
                <option value="Leo">Leo (Jul 23 - Aug 22)</option>
                <option value="Virgo">Virgo (Aug 23 - Sep 22)</option>
                <option value="Libra">Libra (Sep 23 - Oct 22)</option>
                <option value="Scorpio">Scorpio (Oct 23 - Nov 21)</option>
                <option value="Sagittarius">Sagittarius (Nov 22 - Dec 21)</option>
                <option value="Capricorn">Capricorn (Dec 22 - Jan 19)</option>
                <option value="Aquarius">Aquarius (Jan 20 - Feb 18)</option>
                <option value="Pisces">Pisces (Feb 19 - Mar 20)</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%;margin-top:10px;" id="calculateCompatBtn">
            Calculate Compatibility &rarr;
          </button>
        </form>

        <!-- Result Card -->
        <div class="result-card" id="compatibilityResult">
          <div style="text-align:center;">
            <div class="score-badge">
              <span id="scoreValue">0</span><span class="score-percent-sign">%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" id="scoreFill"></div>
            </div>
            <p id="resultAnalysis" style="font-size:1.05rem;color:var(--slate-800);font-weight:600;margin-bottom:20px;"></p>
          </div>

          <div class="dimensions-grid">
            <div class="dimension-pill">
              <div class="dimension-title">Communication</div>
              <div class="dimension-value" id="commScore">0%</div>
            </div>
            <div class="dimension-pill">
              <div class="dimension-title">Emotional Depth</div>
              <div class="dimension-value" id="emotScore">0%</div>
            </div>
            <div class="dimension-pill">
              <div class="dimension-title">Playful Dynamic</div>
              <div class="dimension-value" id="funScore">0%</div>
            </div>
            <div class="dimension-pill">
              <div class="dimension-title">Life Values</div>
              <div class="dimension-value" id="lifeScore">0%</div>
            </div>
          </div>

          <!-- Insight & Reflection Prompt Callout -->
          <div class="result-callout-box" style="margin:20px 0;padding:18px;background:linear-gradient(135deg,#fff1f2 0%,#f8fafc 100%);border:1px solid #fecdd3;border-radius:var(--radius-md);">
            <h4 style="margin-bottom:6px;display:flex;align-items:center;gap:8px;color:var(--slate-900);">
              <span>💡</span> What This Result Means For You Two
            </h4>
            <p style="font-size:0.92rem;color:var(--slate-600);margin-bottom:12px;line-height:1.6;">
              Compatibility is not a fixed fate—it is an ongoing dance of curiosity, appreciation, and open listening. Use this percentage as a lighthearted reflection on where your dynamics naturally flow and where you can lean in with extra warmth.
            </p>
            <div style="background:#ffffff;border-radius:var(--radius-sm);padding:12px 14px;border:1px solid var(--slate-200);">
              <span style="font-size:0.8rem;font-weight:700;color:var(--rose-600);text-transform:uppercase;letter-spacing:0.05em;">Suggested Conversation Starter:</span>
              <p style="font-size:0.92rem;color:var(--slate-800);margin-top:4px;font-style:italic;">
                "What was one moment this past month where you felt most deeply heard or appreciated by me?"
              </p>
            </div>
          </div>

          <!-- Quick Next Tools -->
          <div style="margin-top:20px;padding:16px;background:var(--slate-50);border-radius:var(--radius-md);border:1px solid var(--border);">
            <div style="font-size:0.85rem;font-weight:600;color:var(--slate-700);margin-bottom:10px;">Recommended next steps for your connection:</div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <a href="/relationship-calculator" class="btn btn-sm btn-secondary">Track Days Together ⏳</a>
              <a href="/relationship-questions" class="btn btn-sm btn-secondary">Draw Date Questions 💬</a>
              <a href="/ai-relationship-advisor" class="btn btn-sm btn-secondary">Ask AI for Date Ideas 🤖</a>
            </div>
          </div>

          <div class="disclaimer-box">
            <strong>Entertainment Notice:</strong> Compatibility percentages are calculated via a character-based algorithmic matching formula for entertainment and reflection. Real relationship fulfillment is nurtured through communication and mutual care.
          </div>

          <div class="share-bar">
            <span style="font-size:0.85rem;font-weight:600;color:var(--text-muted);">Share result:</span>
            <a href="#" id="shareWa" class="share-btn whatsapp" target="_blank" rel="noopener">WhatsApp</a>
            <a href="#" id="shareFb" class="share-btn facebook" target="_blank" rel="noopener">Facebook</a>
            <a href="#" id="shareTw" class="share-btn twitter" target="_blank" rel="noopener">X / Twitter</a>
            <button type="button" id="copyShare" class="share-btn">Copy Link</button>
          </div>
        </div>
      </div>

      <!-- Reserved Adsterra 300x250 Ad Container -->
      ${AD_300X250}

      <!-- Educational Content on Intent -->
      <section style="margin:40px 0;">
        <h2>How Compatibility Scores Work</h2>
        <p style="margin-bottom:16px;">
          Our multi-dimensional algorithm uses string normalization and character hash weighting to map names and optional astrological elements into a consistent, deterministic profile. Because the algorithm is deterministic, entering the exact same details will always generate the same result.
        </p>
        <p style="margin-bottom:24px;">
          Many couples use these scores as a playful prompt to reflect on how they communicate, how they handle stress, and how they show appreciation in daily life.
        </p>

        <h3>Related Tools for Couples</h3>
        <ul style="margin:12px 0 24px 20px;">
          <li><a href="/love-calculator">Classic Love Calculator</a> - Quick, simple name test.</li>
          <li><a href="/relationship-calculator">Relationship Duration Calculator</a> - Track days, months, and years together.</li>
          <li><a href="/couple-compatibility">Couple Harmony Quiz</a> - Answer 5 questions on communication habits.</li>
        </ul>
      </section>
    </div>
  `;

  return renderLayout({
    title: "Love Compatibility Calculator - Multi-Factor Match Test",
    description: "Check your love compatibility score with names, birthdates, and zodiac signs. Get a multi-dimensional breakdown of communication, emotional depth, and connection.",
    canonical: "https://lovescoretest.com/love-compatibility",
    activeNav: 'compatibility',
    bodyContent: content,
    scripts: `<script>document.addEventListener('DOMContentLoaded', initLoveCompatibility);</script>`
  });
}

// ==========================================
// Page: Classic Love Calculator
// ==========================================
export function renderLoveCalculatorPage() {
  const content = `
    <div class="container-narrow" style="padding-top:40px;">
      <div style="text-align:center;margin-bottom:28px;">
        <span class="hero-pill">⚡ Instant Name Match</span>
        <h1>Love Calculator</h1>
        <p>Enter two names to test your love percentage and discover your couple archetype.</p>
      </div>

      <div class="calculator-box" id="calc-container-love">
        <form id="loveCalcForm">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="name1">First Name *</label>
              <input type="text" id="name1" class="form-input" placeholder="Your name" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="name2">Second Name *</label>
              <input type="text" id="name2" class="form-input" placeholder="Partner's name" required>
            </div>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%;margin-top:10px;" id="calcLoveBtn">
            Check Love Score &rarr;
          </button>
        </form>

        <!-- Result Box -->
        <div class="result-card" id="loveResult">
          <div style="text-align:center;">
            <div class="score-badge">
              <span id="loveScoreNumber">0</span><span class="score-percent-sign">%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" id="loveScoreFill"></div>
            </div>
            <h3 id="matchArchetype" style="color:var(--rose-600);margin-bottom:8px;">Match Type</h3>
            <p id="matchDescription" style="font-size:1rem;color:var(--text-secondary);"></p>
          </div>

          <div class="disclaimer-box">
            <strong>Friendly Reminder:</strong> This calculator is an algorithmic entertainment tool. Real love is built through honesty, empathy, and continuous investment in each other.
          </div>

          <div class="share-bar">
            <span style="font-size:0.85rem;font-weight:600;color:var(--text-muted);">Share your score:</span>
            <a href="#" id="shareWa" class="share-btn whatsapp" target="_blank" rel="noopener">WhatsApp</a>
            <a href="#" id="shareFb" class="share-btn facebook" target="_blank" rel="noopener">Facebook</a>
            <a href="#" id="shareTw" class="share-btn twitter" target="_blank" rel="noopener">X / Twitter</a>
            <button type="button" id="copyShare" class="share-btn">Copy Link</button>
          </div>
        </div>
      </div>

      <!-- Adsterra 300x250 Ad Container -->
      ${AD_300X250}

      <section style="margin:40px 0;">
        <h2>The History of Name Compatibility Calculators</h2>
        <p style="margin-bottom:16px;">
          Name-based love meters have been popular since the 1990s. Early versions used the FLAMES acronym (Friends, Lovers, Affection, Marriage, Enmity, Siblings) or letter frequency tables. Our engine uses an advanced ASCII hash distribution that guarantees identical results for identical names every single time.
        </p>
        <p>
          Ready for a deeper dive? Try our <a href="/love-compatibility">Multi-Factor Compatibility Calculator</a> or test your communication styles with the <a href="/couple-compatibility">Couple Quiz</a>.
        </p>
      </section>
    </div>
  `;

  return renderLayout({
    title: "Love Calculator - Calculate Your Love Percentage by Name",
    description: "Free online love calculator. Enter two names to calculate your love percentage, match archetype, and share your score with your partner.",
    canonical: "https://lovescoretest.com/love-calculator",
    activeNav: 'love-calculator',
    bodyContent: content,
    scripts: `<script>document.addEventListener('DOMContentLoaded', initLoveCalculator);</script>`
  });
}

// ==========================================
// Page: Relationship Duration Calculator
// ==========================================
export function renderRelationshipCalculatorPage() {
  const content = `
    <div class="container-narrow" style="padding-top:40px;">
      <div style="text-align:center;margin-bottom:28px;">
        <span class="hero-pill">⏳ Precision Date Tracker</span>
        <h1>Relationship Duration Calculator</h1>
        <p>Calculate exactly how long you and your partner have been together: down to the days, hours, and seconds.</p>
      </div>

      <div class="calculator-box" id="calc-container-rel">
        <form id="relationshipForm">
          <div class="form-group">
            <label class="form-label" for="relationshipStartDate">When did your relationship begin? *</label>
            <input type="date" id="relationshipStartDate" class="form-input" required>
            <div class="form-helper">Select your first date, official anniversary, or wedding date.</div>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%;" id="calculateDaysBtn">
            Calculate Days Together &rarr;
          </button>
        </form>

        <!-- Result Box -->
        <div class="result-card" id="relationshipResult">
          <div style="text-align:center;margin-bottom:24px;">
            <div style="font-size:0.9rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);font-weight:700;">
              Total Days Together
            </div>
            <div style="font-size:3.5rem;font-weight:800;color:var(--rose-600);line-height:1.1;" id="totalDaysTogether">
              0
            </div>
            <div style="color:var(--text-muted);font-size:0.95rem;margin-top:6px;">
              <span id="relYears">0</span> years, <span id="relMonths">0</span> months, <span id="relDays">0</span> days
            </div>
          </div>

          <!-- Counter Grid -->
          <div class="dimensions-grid">
            <div class="dimension-pill">
              <div class="dimension-title">Total Weeks</div>
              <div class="dimension-value" id="totalWeeksTogether">0</div>
            </div>
            <div class="dimension-pill">
              <div class="dimension-title">Total Hours</div>
              <div class="dimension-value" id="totalHoursTogether">0</div>
            </div>
            <div class="dimension-pill">
              <div class="dimension-title">Live Seconds</div>
              <div class="dimension-value" id="liveSeconds" style="font-family:monospace;font-size:1.1rem;color:var(--rose-600);">0</div>
            </div>
            <div class="dimension-pill">
              <div class="dimension-title">Next Anniversary</div>
              <div class="dimension-value">
                <span id="daysUntilNextAnniv">0</span>d
                <span style="font-size:0.75rem;font-weight:600;color:var(--text-muted);">until <span id="nextAnnivOrdinal">1st</span></span>
              </div>
            </div>
          </div>

          <!-- Milestones Tracker -->
          <div style="margin-top:28px;">
            <h4 style="margin-bottom:12px;font-size:1rem;color:var(--text-primary);">Key Relationship Milestones</h4>
            <div id="milestoneItems"></div>
          </div>

          <div class="share-bar">
            <span style="font-size:0.85rem;font-weight:600;color:var(--text-muted);">Share milestone:</span>
            <a href="#" id="shareWa" class="share-btn whatsapp" target="_blank" rel="noopener">WhatsApp</a>
            <a href="#" id="shareFb" class="share-btn facebook" target="_blank" rel="noopener">Facebook</a>
            <a href="#" id="shareTw" class="share-btn twitter" target="_blank" rel="noopener">X / Twitter</a>
            <button type="button" id="copyShare" class="share-btn">Copy Summary</button>
          </div>
        </div>
      </div>

      <!-- Adsterra 300x250 Ad Container -->
      ${AD_300X250}

      <section style="margin:40px 0;">
        <h2>Why Tracking Days Together Matters</h2>
        <p style="margin-bottom:16px;">
          Anniversaries come once a year, but relationships are built day by day. Marking day milestones—such as 100 days, 500 days, or 1,000 days together—gives couples spontaneous reasons to celebrate, reminisce, and express appreciation for their shared journey.
        </p>
        <p>
          Next step: Plan your upcoming gift with our <a href="/anniversary-calculator">Anniversary & Gift Calculator</a>.
        </p>
      </section>
    </div>
  `;

  return renderLayout({
    title: "Relationship Calculator - Days, Months & Years Together",
    description: "Calculate how long you and your partner have been together down to the second. Accurate days, weeks, next anniversary countdown, and milestone tracker.",
    canonical: "https://lovescoretest.com/relationship-calculator",
    activeNav: 'relationship-calculator',
    bodyContent: content,
    scripts: `<script>document.addEventListener('DOMContentLoaded', initRelationshipCalculator);</script>`
  });
}

// ==========================================
// Page: Anniversary Calculator
// ==========================================
export function renderAnniversaryCalculatorPage() {
  const content = `
    <div class="container-narrow" style="padding-top:40px;">
      <div style="text-align:center;margin-bottom:28px;">
        <span class="hero-pill">🎁 Gift & Celebration Planner</span>
        <h1>Anniversary Calculator</h1>
        <p>Calculate the days until your next anniversary, milestone number, and traditional vs. modern gift themes.</p>
      </div>

      <div class="calculator-box" id="calc-container-anniv">
        <form id="annivForm">
          <div class="form-group">
            <label class="form-label" for="annivDate">Anniversary Date (Day You First Dated or Married) *</label>
            <input type="date" id="annivDate" class="form-input" required>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%;" id="calcAnnivBtn">
            Find Anniversary Milestones &rarr;
          </button>
        </form>

        <!-- Result Box -->
        <div class="result-card" id="annivResult">
          <div style="text-align:center;margin-bottom:24px;">
            <div style="font-size:0.9rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);font-weight:700;">
              Days Until Next Anniversary
            </div>
            <div style="font-size:3.5rem;font-weight:800;color:var(--rose-600);line-height:1.1;" id="annivDaysLeft">
              0
            </div>
            <div style="color:var(--text-muted);font-size:0.95rem;margin-top:6px;">
              Celebrating your <strong id="annivYearNumber">1st</strong> Anniversary
            </div>
          </div>

          <div class="dimensions-grid">
            <div class="dimension-pill">
              <div class="dimension-title">Traditional Gift</div>
              <div class="dimension-value" id="tradGift" style="font-size:1.1rem;color:var(--rose-600);">-</div>
            </div>
            <div class="dimension-pill">
              <div class="dimension-title">Modern Alternative</div>
              <div class="dimension-value" id="modGift" style="font-size:1.1rem;color:var(--indigo-600);">-</div>
            </div>
          </div>

          <div style="background:var(--surface-alt);padding:14px 18px;border-radius:var(--radius-sm);margin:16px 0;">
            <strong style="display:block;font-size:0.85rem;text-transform:uppercase;color:var(--text-muted);margin-bottom:4px;">Symbolic Meaning</strong>
            <p id="giftMeaning" style="font-size:0.95rem;color:var(--text-primary);"></p>
          </div>

          <div class="share-bar">
            <span style="font-size:0.85rem;font-weight:600;color:var(--text-muted);">Share countdown:</span>
            <a href="#" id="shareWa" class="share-btn whatsapp" target="_blank" rel="noopener">WhatsApp</a>
            <a href="#" id="shareFb" class="share-btn facebook" target="_blank" rel="noopener">Facebook</a>
            <a href="#" id="shareTw" class="share-btn twitter" target="_blank" rel="noopener">X / Twitter</a>
            <button type="button" id="copyShare" class="share-btn">Copy Link</button>
          </div>
        </div>
      </div>

      <!-- Adsterra 300x250 Ad Container -->
      ${AD_300X250}

      <section style="margin:40px 0;">
        <h2>Traditional & Modern Anniversary Gift Guide</h2>
        <p style="margin-bottom:16px;">
          Anniversary symbols date back centuries. Each material represents how a couple's bond strengthens and weathers life's tests over time:
        </p>
        <ul style="margin:12px 0 24px 20px;">
          <li><strong>1st Year: Paper</strong> - Fragile yet clean, ready for your story to be written. Modern: Clocks.</li>
          <li><strong>5th Year: Wood</strong> - Deep, grounded roots and steady growth. Modern: Silverware.</li>
          <li><strong>10th Year: Tin or Aluminum</strong> - Malleable and rust-proof resilience. Modern: Diamond jewelry.</li>
          <li><strong>25th Year: Silver</strong> - Radiance and timeless value after a quarter century.</li>
          <li><strong>50th Year: Gold</strong> - Unmatched strength, purity, and life-long commitment.</li>
        </ul>
      </section>
    </div>
  `;

  return renderLayout({
    title: "Anniversary Calculator - Days Countdown & Gift Themes",
    description: "Calculate the exact days until your next relationship or wedding anniversary. View traditional and modern anniversary gift symbols and celebration ideas.",
    canonical: "https://lovescoretest.com/anniversary-calculator",
    activeNav: 'anniversary',
    bodyContent: content,
    scripts: `<script>document.addEventListener('DOMContentLoaded', initAnniversaryCalculator);</script>`
  });
}

// ==========================================
// Page: Couple Compatibility Quiz
// ==========================================
export function renderCoupleCompatibilityPage() {
  const content = `
    <div class="container-narrow" style="padding-top:40px;">
      <div style="text-align:center;margin-bottom:28px;">
        <span class="hero-pill">🧩 Communication & Habits Diagnostic</span>
        <h1>Couple Harmony Assessment</h1>
        <p>Answer 5 thoughtful questions about your relationship habits, conflict approach, and shared values to assess your couple harmony profile.</p>
      </div>

      <div class="calculator-box" id="calc-container-quiz">
        <form id="coupleQuizForm">
          <!-- Question 1 -->
          <div class="form-group" style="margin-bottom:24px;">
            <label class="form-label">1. When you and your partner disagree, how do conversations usually unfold?</label>
            <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;">
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q1" value="4" required> We talk openly, listen to understand, and find compromise easily.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q1" value="3"> We sometimes need cool-off time, but we circle back and resolve it constructively.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q1" value="2"> One of us tends to pull away or get defensive, making resolution slow.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q1" value="1"> Arguments often rehash past grievances and feel cyclical.
              </label>
            </div>
          </div>

          <!-- Question 2 -->
          <div class="form-group" style="margin-bottom:24px;">
            <label class="form-label">2. How emotionally supported do you feel when sharing your fears or stress?</label>
            <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;">
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q2" value="4" required> Completely safe—my partner is my primary emotional sanctuary.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q2" value="3"> Mostly supported, though sometimes my partner tries to "fix" rather than listen.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q2" value="2"> Hesitant—I worry about burdening them or being judged.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q2" value="1"> I usually keep vulnerable emotions to myself.
              </label>
            </div>
          </div>

          <!-- Question 3 -->
          <div class="form-group" style="margin-bottom:24px;">
            <label class="form-label">3. How well do your day-to-day lifestyle and spending priorities align?</label>
            <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;">
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q3" value="4" required> Very well—we share financial and personal values.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q3" value="3"> Moderate alignment—we have differing spending habits but respect boundaries.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q3" value="2"> Occasional friction around work-life balance or budgeting.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q3" value="1"> Frequent clashes regarding priorities and future expectations.
              </label>
            </div>
          </div>

          <!-- Question 4 -->
          <div class="form-group" style="margin-bottom:24px;">
            <label class="form-label">4. How do you keep romance and novelty alive?</label>
            <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;">
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q4" value="4" required> Regular date nights, small surprises, and spontaneous laughter.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q4" value="3"> Life gets busy, but we intentionally prioritize couple time when possible.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q4" value="2"> We have settled into a routine and rarely plan special dates.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q4" value="1"> Romance feels distant or one-sided lately.
              </label>
            </div>
          </div>

          <!-- Question 5 -->
          <div class="form-group" style="margin-bottom:24px;">
            <label class="form-label">5. When thinking about your future 5 years from now, do you envision shared dreams?</label>
            <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;">
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q5" value="4" required> Absolutely—we actively talk about and build towards our shared life.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q5" value="3"> Mostly—our general life directions align, with some independent goals.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q5" value="2"> Unclear—we haven't talked seriously about long-term plans recently.
              </label>
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.95rem;">
                <input type="radio" name="q5" value="1"> We seem to want fundamentally different paths.
              </label>
            </div>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%;" id="submitQuizBtn">
            View Couple Harmony Profile &rarr;
          </button>
        </form>

        <!-- Result Box -->
        <div class="result-card" id="quizResult">
          <div style="text-align:center;">
            <div class="score-badge">
              <span id="quizScore">0%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" id="quizScoreFill"></div>
            </div>
            <h3 id="harmonyType" style="color:var(--rose-600);margin-bottom:8px;">Harmony Profile</h3>
            <p id="quizGuidance" style="font-size:1rem;color:var(--text-secondary);"></p>
          </div>

          <div class="disclaimer-box">
            <strong>Self-Reflection Note:</strong> This quiz is designed to spark open conversation between partners. Every healthy couple navigates differences; growth comes from curiosity and emotional safety.
          </div>

          <div class="share-bar">
            <span style="font-size:0.85rem;font-weight:600;color:var(--text-muted);">Share results:</span>
            <a href="#" id="shareWa" class="share-btn whatsapp" target="_blank" rel="noopener">WhatsApp</a>
            <a href="#" id="shareFb" class="share-btn facebook" target="_blank" rel="noopener">Facebook</a>
            <a href="#" id="shareTw" class="share-btn twitter" target="_blank" rel="noopener">X / Twitter</a>
            <button type="button" id="copyShare" class="share-btn">Copy Link</button>
          </div>
        </div>
      </div>

      <!-- Adsterra 300x250 Ad Container -->
      ${AD_300X250}

      <section style="margin:40px 0;">
        <h2>How to Discuss Quiz Results With Your Partner</h2>
        <p style="margin-bottom:16px;">
          Rather than viewing quiz outcomes as a pass/fail grade, treat them as a constructive springboard. Ask each other:
        </p>
        <blockquote style="margin:16px 0;padding:12px 16px;background:var(--rose-50);border-left:4px solid var(--rose-600);border-radius:0 8px 8px 0;">
          <em>"Which question was easiest to answer, and which made you pause to think about how we can support each other better?"</em>
        </blockquote>
        <p>
          Need more conversation prompts? Try our <a href="/relationship-questions">50 Relationship Questions Bank</a> or ask our <a href="/ai-relationship-advisor">AI Advisor</a> for personalized date night suggestions.
        </p>
      </section>
    </div>
  `;

  return renderLayout({
    title: "Couple Compatibility Quiz - Test Your Relationship Harmony",
    description: "Take our free 5-question couple compatibility assessment. Explore communication habits, conflict styles, and discover actionable suggestions for deeper connection.",
    canonical: "https://lovescoretest.com/couple-compatibility",
    activeNav: 'quiz',
    bodyContent: content,
    scripts: `<script>document.addEventListener('DOMContentLoaded', initCoupleQuiz);</script>`
  });
}

// ==========================================
// Page: Relationship Questions Bank
// ==========================================
export function renderRelationshipQuestionsPage({ questions }) {
  const content = `
    <div class="container-narrow" style="padding-top:40px;">
      <div style="text-align:center;margin-bottom:28px;">
        <span class="hero-pill">💬 Deep Conversation Prompts</span>
        <h1>Relationship Questions to Ask Your Partner</h1>
        <p>Break out of routine small talk. Draw curated questions for date nights, road trips, or cozy evenings at home.</p>
      </div>

      <!-- Question Drawer Interactive Box -->
      <div class="calculator-box" id="question-card-container">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
          <div class="form-group" style="margin-bottom:0;flex:1;min-width:200px;">
            <label class="form-label" for="categoryFilter" style="font-size:0.85rem;">Filter by Category</label>
            <select id="categoryFilter" class="form-select">
              <option value="all">All Categories (${questions.length} questions)</option>
              <option value="Deep Intimacy">Deep Intimacy</option>
              <option value="Fun & Playful">Fun & Playful</option>
              <option value="Future & Life Vision">Future & Life Vision</option>
              <option value="Communication & Growth">Communication & Growth</option>
            </select>
          </div>

          <button type="button" id="drawQuestionBtn" class="btn btn-primary" style="margin-top:auto;">
            Draw Random Question 🎲
          </button>
        </div>

        <!-- Animated Display Card -->
        <div id="questionDisplay" style="background:var(--surface-alt);border:1px solid var(--border);border-radius:var(--radius-md);padding:32px 24px;text-align:center;transition:all 0.25s ease;">
          <span id="questionCategoryBadge" class="hero-pill" style="margin-bottom:14px;">Category</span>
          <p id="questionText" style="font-size:1.35rem;font-weight:600;color:var(--text-primary);line-height:1.45;margin-bottom:20px;">
            Loading question...
          </p>
          <button type="button" id="copyQuestionBtn" class="btn btn-secondary btn-sm">
            Copy Question 📋
          </button>
        </div>
      </div>

      <!-- Adsterra 300x250 Ad Container -->
      ${AD_300X250}

      <!-- Questions Grouped by Category -->
      <section style="margin:48px 0;">
        <h2>Curated Relationship Questions Directory</h2>
        <p style="margin-bottom:28px;">
          Browse our complete question bank organized by relationship focus areas:
        </p>

        <div style="display:flex;flex-direction:column;gap:24px;">
          <div>
            <h3 style="color:var(--rose-600);margin-bottom:12px;">❤️ Deep Intimacy & Vulnerability</h3>
            <ul style="margin-left:20px;line-height:1.7;">
              ${questions.filter(q => q.category === 'Deep Intimacy').map(q => `<li>${q.question}</li>`).join('')}
            </ul>
          </div>

          <div>
            <h3 style="color:var(--indigo-600);margin-bottom:12px;">🎉 Fun & Playful Chemistry</h3>
            <ul style="margin-left:20px;line-height:1.7;">
              ${questions.filter(q => q.category === 'Fun & Playful').map(q => `<li>${q.question}</li>`).join('')}
            </ul>
          </div>

          <div>
            <h3 style="color:#059669;margin-bottom:12px;">🌟 Future & Life Vision</h3>
            <ul style="margin-left:20px;line-height:1.7;">
              ${questions.filter(q => q.category === 'Future & Life Vision').map(q => `<li>${q.question}</li>`).join('')}
            </ul>
          </div>

          <div>
            <h3 style="color:#d97706;margin-bottom:12px;">🌱 Communication & Growth</h3>
            <ul style="margin-left:20px;line-height:1.7;">
              ${questions.filter(q => q.category === 'Communication & Growth').map(q => `<li>${q.question}</li>`).join('')}
            </ul>
          </div>
        </div>
      </section>
    </div>
  `;

  return renderLayout({
    title: "Relationship Questions to Ask Your Partner - Deep & Fun Prompts",
    description: "Discover curated conversation starters for couples. Draw random questions for date nights covering intimacy, childhood memories, future dreams, and playful chemistry.",
    canonical: "https://lovescoretest.com/relationship-questions",
    activeNav: 'questions',
    bodyContent: content,
    scripts: `
      <script>
        const QUESTIONS_DATA = ${JSON.stringify(questions)};
        document.addEventListener('DOMContentLoaded', () => {
          initQuestionGenerator(QUESTIONS_DATA);
        });
      </script>
    `
  });
}

// ==========================================
// Page: AI Relationship Advisor
// ==========================================
export function renderAIAdvisorPage() {
  const content = `
    <div class="container-narrow" style="padding-top:40px;">
      <div style="text-align:center;margin-bottom:28px;">
        <span class="hero-pill">🤖 Safe & Private AI Guidance</span>
        <h1>AI Relationship Assistant</h1>
        <p>Ask for thoughtful date night ideas, gentle communication frameworks, and active listening tips.</p>
      </div>

      <!-- Safety & Crisis Banner -->
      <div style="background:#fffbeb;border:1px solid #fef3c7;border-left:4px solid #d97706;padding:14px 18px;border-radius:var(--radius-sm);margin-bottom:20px;font-size:0.875rem;color:#92400e;line-height:1.5;">
        <strong>Important Safety Notice:</strong> This AI assistant is an educational and communication brainstorming tool powered by Google Gemini. It does <em>not</em> provide medical, psychiatric, legal, or emergency counseling.
        If you or someone you know is experiencing abuse, distress, or emergency, contact the <strong>National Domestic Violence Hotline (1-800-799-SAFE)</strong> or <strong>Crisis Text Line (Text HOME to 741741)</strong>.
      </div>

      <!-- Chat Container -->
      <div class="chat-container" id="ai-chat-box">
        <div class="chat-header">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:10px;height:10px;border-radius:50%;background:#10b981;"></div>
            <strong style="font-size:0.95rem;color:var(--text-primary);">LoveScore Assistant</strong>
          </div>
          <span style="font-size:0.8rem;color:var(--text-muted);">Confidential • Browser session only</span>
        </div>

        <div class="chat-messages" id="aiMessages">
          <div class="chat-bubble bot">
            <p>Hello! I am here to help you brainstorm creative date ideas, explore constructive ways to express your feelings, or discover thoughtful questions to ask your partner.</p>
            <p>What relationship topic or conversation is on your mind today?</p>
          </div>
        </div>

        <!-- Prompt Suggestions -->
        <div class="prompt-suggestions">
          <button type="button" class="prompt-pill">How can I communicate better with my partner?</button>
          <button type="button" class="prompt-pill">Plan a creative $25 date night</button>
          <button type="button" class="prompt-pill">How to apologize sincerely after a disagreement?</button>
          <button type="button" class="prompt-pill">Good questions to ask on an anniversary</button>
        </div>

        <!-- Input Bar -->
        <div class="chat-input-row">
          <input type="text" id="aiInput" placeholder="Ask a relationship question or describe a situation..." maxlength="300" autocomplete="off">
          <button type="button" class="btn btn-primary" id="sendAiBtn">Send</button>
        </div>
      </div>

      <!-- Adsterra 300x250 Ad Container -->
      ${AD_300X250}

      <section style="margin:40px 0;">
        <h2>Responsible AI for Modern Relationships</h2>
        <p style="margin-bottom:16px;">
          Technology should bring partners closer together, not substitute for human empathy. We adhere strictly to responsible AI principles:
        </p>
        <ul style="margin:12px 0 24px 20px;">
          <li><strong>No Data Logging:</strong> Your queries are processed in server memory and not stored in persistent user profiles.</li>
          <li><strong>Ethical Boundaries:</strong> The AI will not diagnose partners, encourage manipulation, or replace qualified couples therapy.</li>
          <li><strong>Constructive Focus:</strong> Suggestions emphasize vulnerability, curiosity, and de-escalation.</li>
        </ul>
      </section>
    </div>
  `;

  return renderLayout({
    title: "AI Relationship Assistant - Empathy, Dates & Communication Advice",
    description: "Get private, constructive relationship advice. Brainstorm creative date ideas, communication frameworks, and connection prompts with our AI assistant.",
    canonical: "https://lovescoretest.com/ai-relationship-advisor",
    activeNav: 'ai',
    bodyContent: content,
    scripts: `<script>document.addEventListener('DOMContentLoaded', initAIAdvisor);</script>`
  });
}

// ==========================================
// Page: Articles Index
// ==========================================
export function renderArticlesIndexPage({ articles }) {
  const content = `
    <div class="container" style="padding-top:40px;">
      <div style="text-align:center;max-width:720px;margin:0 auto 36px;">
        <span class="hero-pill">📚 Relationship Science & Guides</span>
        <h1>Relationship Articles & Expert Guides</h1>
        <p>Evidence-inspired reflections on communication styles, anniversary milestones, intimacy questions, and couple psychology.</p>
      </div>

      <!-- Top Ad Slot -->
      ${AD_728X90}

      <div class="articles-grid">
        ${articles.map(art => `
          <article class="article-card" id="article-card-${art.slug}">
            <div class="article-meta">
              <span class="article-badge">${art.category}</span>
              <span>${art.readTime}</span>
            </div>
            <h3><a href="/articles/${art.slug}">${art.title}</a></h3>
            <p>${art.summary}</p>
            <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center;font-size:0.85rem;color:var(--text-muted);padding-top:12px;border-top:1px solid var(--surface-alt);">
              <span>${art.publishedDate}</span>
              <a href="/articles/${art.slug}" style="font-weight:600;color:var(--rose-600);">Read Article &rarr;</a>
            </div>
          </article>
        `).join('')}
      </div>

      <!-- Bottom Ad Slot -->
      ${AD_300X250}
    </div>
  `;

  return renderLayout({
    title: "Relationship Articles, Guides & Advice | LoveScoreTest",
    description: "Read relationship guides on communication styles, milestone anniversaries, deep intimacy questions, and couple compatibility science.",
    canonical: "https://lovescoretest.com/articles",
    activeNav: 'articles',
    bodyContent: content
  });
}

// ==========================================
// Page: Article Detail Reader
// ==========================================
export function renderArticleDetailPage({ article, relatedArticles = [] }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": "https://lovescoretest.com/og-image.png",
    "author": {
      "@type": "Organization",
      "name": article.author,
      "url": "https://lovescoretest.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LoveScoreTest",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lovescoretest.com/apple-touch-icon.png"
      }
    },
    "datePublished": article.publishedDate,
    "dateModified": article.updatedDate,
    "mainEntityOfPage": `https://lovescoretest.com/articles/${article.slug}`
  };

  const content = `
    <article class="container-narrow" style="padding-top:40px;">
      <!-- Breadcrumbs -->
      <nav class="article-breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a> / <a href="/articles">Articles</a> / <span>${article.category}</span>
      </nav>

      <header class="article-header">
        <span class="hero-pill" style="margin-bottom:12px;">${article.category}</span>
        <h1 style="margin-bottom:16px;">${article.title}</h1>
        <div class="article-meta">
          <span>By <strong>${article.author}</strong></span>
          <span>•</span>
          <span>Published ${article.publishedDate}</span>
          <span>•</span>
          <span>Updated ${article.updatedDate}</span>
          <span>•</span>
          <span>${article.readTime}</span>
        </div>
      </header>

      <!-- Top Ad Slot Inside Article -->
      ${AD_728X90}

      <div class="article-body">
        ${article.content}
      </div>

      <!-- Related Tools Widget -->
      ${article.relatedTools && article.relatedTools.length ? `
        <div style="background:var(--surface);border:1px solid #fecdd3;border-radius:var(--radius-md);padding:24px;margin:40px 0;">
          <h3 style="color:var(--rose-600);margin-bottom:10px;">Try Related Interactive Tools</h3>
          <p style="font-size:0.95rem;margin-bottom:16px;">Put these insights into practice with our free companion calculators:</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            ${article.relatedTools.map(t => `<a href="${t.url}" class="btn btn-sm btn-primary">${t.name} &rarr;</a>`).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Bottom Ad Slot -->
      ${AD_300X250}

      <!-- Related Articles Section -->
      ${relatedArticles.length ? `
        <div style="margin:48px 0;padding-top:32px;border-top:1px solid var(--border);">
          <h3 style="margin-bottom:20px;">More Relationship Guides</h3>
          <div class="articles-grid" style="grid-template-columns:1fr 1fr;">
            ${relatedArticles.slice(0, 2).map(ra => `
              <div class="article-card" style="padding:18px;">
                <span class="article-badge" style="width:fit-content;margin-bottom:8px;">${ra.category}</span>
                <h4 style="font-size:1.05rem;margin-bottom:8px;"><a href="/articles/${ra.slug}">${ra.title}</a></h4>
                <p style="font-size:0.85rem;margin-bottom:10px;">${ra.summary}</p>
                <a href="/articles/${ra.slug}" style="font-size:0.85rem;font-weight:600;color:var(--rose-600);">Read &rarr;</a>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </article>
  `;

  return renderLayout({
    title: article.title,
    description: article.description,
    canonical: `https://lovescoretest.com/articles/${article.slug}`,
    activeNav: 'articles',
    schema: articleSchema,
    bodyContent: content
  });
}

// ==========================================
// Trust & Policy Pages
// ==========================================
export function renderAboutPage() {
  const content = `
    <div class="container-narrow" style="padding-top:40px;">
      <span class="hero-pill">About Us</span>
      <h1>Our Mission & Philosophy</h1>
      <div class="article-body" style="margin-top:24px;">
        <p>
          Welcome to <strong>LoveScoreTest.com</strong>. We believe that curiosity, playful reflection, and clear communication are the foundations of joyful relationships.
        </p>
        <h2>Why We Built LoveScoreTest</h2>
        <p>
          The internet has thousands of love calculators, but most are cluttered with intrusive popups, broken layouts, or false claims of scientific validity. We set out to create an original, modern SaaS platform that couples can genuinely enjoy.
        </p>
        <h2>Entertainment With Integrity</h2>
        <p>
          We are 100% transparent about our tools:
        </p>
        <ul>
          <li><strong>Love Compatibility & Name Tests:</strong> These are deterministic entertainment tools designed to inspire laughter and conversation, not scientific verdicts.</li>
          <li><strong>Relationship & Anniversary Trackers:</strong> Precision calendar tools to help you honor your time together down to the second.</li>
          <li><strong>AI Assistant:</strong> An educational brainstorming partner built with strict safety boundaries and empathy.</li>
        </ul>
        <h2>Editorial Standards</h2>
        <p>
          Our guides are crafted to encourage healthy communication, active listening, and respectful boundaries. We actively update our content to ensure high value for couples around the globe.
        </p>
        <h2>Contact Us</h2>
        <p>
          Have questions, suggestions, or feedback? Contact us anytime at <a href="mailto:nonelikeyou422@gmail.com">nonelikeyou422@gmail.com</a>.
        </p>
      </div>
    </div>
  `;

  return renderLayout({
    title: "About LoveScoreTest - Our Mission, Philosophy & Team",
    description: "Learn about LoveScoreTest.com, our commitment to transparent relationship tools, editorial integrity, and responsible AI.",
    canonical: "https://lovescoretest.com/about",
    bodyContent: content
  });
}

export function renderContactPage() {
  const content = `
    <div class="container-narrow" style="padding-top:40px;">
      <span class="hero-pill">Support & Inquiries</span>
      <h1>Contact LoveScoreTest</h1>
      <p style="margin-bottom:28px;">We value your feedback, partnership inquiries, and questions.</p>

      <div class="calculator-box">
        <div style="margin-bottom:20px;">
          <h3 style="margin-bottom:6px;">Official Contact Email</h3>
          <p style="font-size:1.1rem;color:var(--rose-600);font-weight:600;">
            <a href="mailto:nonelikeyou422@gmail.com">nonelikeyou422@gmail.com</a>
          </p>
          <p style="font-size:0.9rem;color:var(--text-muted);margin-top:4px;">
            We aim to respond to all inquiries within 1-2 business days.
          </p>
        </div>

        <hr style="border:0;border-top:1px solid var(--border);margin:24px 0;">

        <h3>Frequently Asked Inquiries</h3>
        <ul style="margin:12px 0 20px 20px;line-height:1.7;">
          <li><strong>Feature Requests:</strong> Have an idea for a new milestone or relationship calculator? Let us know.</li>
          <li><strong>Advertising & Sponsorship:</strong> Contact our team for partnership opportunities.</li>
          <li><strong>Privacy Questions:</strong> Inquire about how our client-side processing protects your data.</li>
        </ul>
      </div>
    </div>
  `;

  return renderLayout({
    title: "Contact LoveScoreTest - Customer Support & Feedback",
    description: "Contact LoveScoreTest for feedback, calculator feature suggestions, or business inquiries.",
    canonical: "https://lovescoretest.com/contact",
    bodyContent: content
  });
}

export function renderPrivacyPage() {
  const content = `
    <div class="container-narrow" style="padding-top:40px;">
      <span class="hero-pill">Privacy Policy</span>
      <h1>Privacy Policy</h1>
      <p style="color:var(--text-muted);margin-bottom:28px;">Last updated: March 2025</p>

      <div class="article-body">
        <p>At LoveScoreTest (accessible from https://lovescoretest.com), preserving your privacy is our top priority. This document outlines our data handling practices.</p>
        
        <h2>1. Client-Side Calculation Privacy</h2>
        <p>All names, birthdates, and relationship dates entered into our calculators are processed locally in your browser or ephemeral server memory. <strong>We do not save, record, or store your personal relationship inputs in any persistent database.</strong></p>

        <h2>2. AI Assistant Interactions</h2>
        <p>When you ask questions in the AI Relationship Assistant, the text of your question is transmitted securely to our server-side API proxy to generate a helpful response via the Google Gemini API. This data is handled in accordance with Google's API service terms and is never sold or used to build personal tracking profiles.</p>

        <h2>3. Third-Party Advertising & Cookies</h2>
        <p>We work with third-party advertising partners, including Adsterra and Google, who may serve advertisements on our site. These third-party ad networks may use cookies, JavaScript, or web beacons in their respective advertisements to measure campaign effectiveness or personalize content. You can manage or disable cookies through your browser settings.</p>

        <h2>4. Server Log Files</h2>
        <p>Like most standard websites, LoveScoreTest uses standard server log files. Information recorded includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks. This data is not linked to personally identifiable information.</p>

        <h2>5. Contact Information</h2>
        <p>If you have any questions or require more information about our Privacy Policy, please contact us at <a href="mailto:nonelikeyou422@gmail.com">nonelikeyou422@gmail.com</a>.</p>
      </div>
    </div>
  `;

  return renderLayout({
    title: "Privacy Policy - LoveScoreTest",
    description: "Read the LoveScoreTest privacy policy. We respect your privacy and do not store calculator inputs or personal names.",
    canonical: "https://lovescoretest.com/privacy-policy",
    bodyContent: content
  });
}

export function renderTermsPage() {
  const content = `
    <div class="container-narrow" style="padding-top:40px;">
      <span class="hero-pill">Terms of Service</span>
      <h1>Terms of Service</h1>
      <p style="color:var(--text-muted);margin-bottom:28px;">Last updated: March 2025</p>

      <div class="article-body">
        <h2>1. Agreement to Terms</h2>
        <p>By accessing or using LoveScoreTest.com, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

        <h2>2. Entertainment Use Disclaimer</h2>
        <p>All compatibility calculators, love meters, horoscope features, and quizzes provided on LoveScoreTest are intended solely for <strong>entertainment, educational reflection, and personal amusement</strong>. They are not psychological assessments, marital counseling, or scientific predictions of relationship success.</p>

        <h2>3. Intellectual Property</h2>
        <p>All proprietary algorithms, design assets, branding, and original editorial content are the intellectual property of LoveScoreTest.com. You may not copy, scrape, or reproduce our tools without written consent.</p>

        <h2>4. Limitation of Liability</h2>
        <p>In no event shall LoveScoreTest or its owners be liable for any damages arising out of the use or inability to use the tools or advice on this site.</p>
      </div>
    </div>
  `;

  return renderLayout({
    title: "Terms of Service - LoveScoreTest",
    description: "Review the terms and conditions for using LoveScoreTest calculators, guides, and AI assistant.",
    canonical: "https://lovescoretest.com/terms",
    bodyContent: content
  });
}

export function renderDisclaimerPage() {
  const content = `
    <div class="container-narrow" style="padding-top:40px;">
      <span class="hero-pill">Disclaimers</span>
      <h1>Entertainment & Health Disclaimer</h1>
      <p style="color:var(--text-muted);margin-bottom:28px;">Last updated: March 2025</p>

      <div class="article-body">
        <h2>1. Entertainment Nature of Compatibility Calculators</h2>
        <p>LoveScoreTest provides name compatibility tests, horoscope calculators, and friendship scores strictly for amusement and fun. We do not make any claim to scientific validity, empirical relationship prediction, or psychological diagnosis.</p>

        <h2>2. Not Medical, Psychological, or Legal Advice</h2>
        <p>Content published on LoveScoreTest.com and generated by our AI Relationship Assistant does not constitute medical advice, marriage therapy, psychological counseling, or psychiatric treatment. If you or your partner are facing severe relationship distress, domestic conflict, or mental health challenges, please consult licensed marriage and family therapists or healthcare professionals.</p>

        <h2>3. Emergency & Crisis Resources</h2>
        <p>If you or someone you know is in danger, please contact local emergency authorities or reach out to these confidential resources immediately:</p>
        <ul>
          <li><strong>National Domestic Violence Hotline:</strong> 1-800-799-SAFE (7233) | <a href="https://www.thehotline.org/" target="_blank" rel="noopener">thehotline.org</a></li>
          <li><strong>Crisis Text Line:</strong> Text HOME to 741741 to connect with a Crisis Counselor 24/7.</li>
          <li><strong>National Suicide & Crisis Lifeline:</strong> Call or text 988 (in the US & Canada).</li>
        </ul>
      </div>
    </div>
  `;

  return renderLayout({
    title: "Entertainment & Medical Disclaimer - LoveScoreTest",
    description: "Read our entertainment and medical disclaimers. LoveScoreTest calculators are for entertainment and do not replace professional therapy.",
    canonical: "https://lovescoretest.com/disclaimer",
    bodyContent: content
  });
}

// ==========================================
// Page: Ship Name Generator
// ==========================================
export function renderShipNameGeneratorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Ship Name Generator",
        "url": "https://lovescoretest.com/ship-name-generator",
        "image": "https://lovescoretest.com/og-image.png",
        "applicationCategory": "LifestyleApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "Blend two names into combined couple nickname ideas instantly. Free, runs in your browser."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a ship name?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A ship name is a single nickname made by blending two people's names together. The term originates from 'relationship'. Famous examples include Bennifer for Ben Affleck and Jennifer Lopez, and Kimye for Kim Kardashian and Kanye West."
            }
          },
          {
            "@type": "Question",
            "name": "How does the ship name generator blend names?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It analyzes the natural vowel and consonant transition points of each name, combining prefixes and suffixes in both directions. The algorithm then scores each combination based on length, pronounceability, and phonetic balance."
            }
          },
          {
            "@type": "Question",
            "name": "Are typed names saved or tracked?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. The name blending engine runs entirely within your browser client. No names are sent to external databases or stored on servers."
            }
          }
        ]
      }
    ]
  };

  const content = `
    <div class="container-narrow" style="padding-top:20px;">
      <div class="calculator-box">
        <span class="hero-pill">💫 Couple Nickname Blender</span>
        <h1 style="font-size:clamp(1.6rem, 3.5vw, 2.2rem);margin:12px 0;">Ship Name Generator</h1>
        <p style="color:var(--text-muted);margin-bottom:24px;">
          Enter two names to blend them into catchy, adorable couple ship names — the Bennifer treatment for any romantic pairing or best friends.
        </p>

        <form id="shipNameForm">
          <div class="form-group">
            <label for="shipName1">First Partner Name</label>
            <input type="text" id="shipName1" class="form-control" placeholder="e.g. Ben or Alex" maxlength="24" required autocomplete="off">
          </div>

          <div class="form-group">
            <label for="shipName2">Second Partner Name</label>
            <input type="text" id="shipName2" class="form-control" placeholder="e.g. Jennifer or Taylor" maxlength="24" required autocomplete="off">
          </div>

          <button type="submit" class="btn btn-primary btn-block" style="padding:14px;font-size:1.05rem;">
            Generate Ship Names 💫
          </button>
        </form>

        <!-- Result Card -->
        <div class="result-card" id="shipResult">
          <h3 style="text-align:center;margin-bottom:16px;">Your Best Blended Ship Names</h3>
          <ul id="shipNamesList" style="list-style:none;padding:0;margin:0 0 20px;"></ul>

          <div class="share-bar">
            <span style="font-size:0.85rem;font-weight:600;color:var(--text-muted);">Share results:</span>
            <a href="#" id="shareWa" class="share-btn whatsapp" target="_blank" rel="noopener">WhatsApp</a>
            <a href="#" id="shareFb" class="share-btn facebook" target="_blank" rel="noopener">Facebook</a>
            <a href="#" id="shareTw" class="share-btn twitter" target="_blank" rel="noopener">X / Twitter</a>
            <button type="button" id="copyShare" class="share-btn">Copy Link</button>
          </div>
        </div>
      </div>

      <!-- Reserved Adsterra 300x250 Ad Container -->
      ${AD_300X250}

      <section style="margin:40px 0;">
        <h2>How Ship Names Work</h2>
        <p style="margin-bottom:16px;">
          A \"ship name\" is a blended portmanteau created by combining the phonetic syllables of two people in a relationship. Celebrity pop culture popularized iconic portmanteaus like <strong>Bennifer</strong> (Ben Affleck &amp; Jennifer Lopez) and <strong>Brangelina</strong> (Brad Pitt &amp; Angelina Jolie).
        </p>
        <p style="margin-bottom:24px;">
          Our generator automatically locates natural vowel-consonant split seams and ranks every combination by balance, flow, and ease of pronunciation so you get options that sound great out loud.
        </p>

        <h3>Frequently Asked Questions</h3>
        <div class="faq-list">
          <div class="faq-item">
            <button type="button" class="faq-question" aria-expanded="false">
              <span>What makes a good ship name?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>The best ship names are 5 to 8 characters long, easy to roll off the tongue, and preserve recognisable phonetic hints from both partner names.</p>
            </div>
          </div>
          <div class="faq-item">
            <button type="button" class="faq-question" aria-expanded="false">
              <span>Can I use this for best friends or fictional pairs?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>Yes! The generator works equally well for friendship duos, besties, fandom couples, and pet combinations.</p>
            </div>
          </div>
          <div class="faq-item">
            <button type="button" class="faq-question" aria-expanded="false">
              <span>Are typed names stored anywhere?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
              <p>No. Name blending executes locally in your browser memory and is not stored on our database servers.</p>
            </div>
          </div>
        </div>

        <h3 style="margin-top:32px;">Explore More Relationship Tools</h3>
        <ul style="margin:12px 0 24px 20px;">
          <li><a href="/love-compatibility">Love Compatibility Calculator</a> - Check multi-factor harmony.</li>
          <li><a href="/relationship-calculator">Relationship Duration Calculator</a> - Track days, months, and hours together.</li>
          <li><a href="/anniversary-calculator">Anniversary Countdown &amp; Gift Guide</a> - Plan your next celebration.</li>
        </ul>
      </section>
    </div>
  `;

  return renderLayout({
    title: "Ship Name Generator - Blend Two Names Into Couple Nicknames",
    description: "Generate blended couple ship names like Bennifer or Kimye instantly. Free, runs in your browser, and ranks the most pronounceable combinations.",
    canonical: "https://lovescoretest.com/ship-name-generator",
    activeNav: 'ship-name',
    schema,
    bodyContent: content,
    scripts: `<script>document.addEventListener('DOMContentLoaded', initShipNameGenerator);</script>`
  });
}

