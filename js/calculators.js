// LoveScoreTest Calculator & SaaS Interaction Engines

// 1. Deterministic String Hash Utility
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// 2. Share Result Helper
function shareResult(title, text, url) {
  if (navigator.share) {
    navigator.share({ title, text, url: url || window.location.href }).catch(() => {});
  } else {
    navigator.clipboard.writeText(`${title} - ${text} \nCheck yours at ${url || window.location.href}`).then(() => {
      showToast('Result link copied to clipboard!');
    }).catch(() => {
      showToast('Could not copy link automatically.');
    });
  }
}

function showToast(msg) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1c1917;color:#fff;padding:10px 20px;border-radius:8px;font-size:14px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:opacity 0.3s ease;';
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2600);
}

// Mobile Menu & Global Interactive UI
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navPanel = document.getElementById('mobileNavPanel');
  const desktopNavItems = document.querySelectorAll('.desktop-nav .nav-item');

  function closeAllDesktopDropdowns() {
    desktopNavItems.forEach(item => {
      item.classList.remove('open');
      const btn = item.querySelector('button.nav-link');
      if (btn) {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mobile drawer toggle
  if (menuBtn && navPanel) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllDesktopDropdowns();
      const isOpen = navPanel.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Desktop dropdown click & mouse handlers
  desktopNavItems.forEach(item => {
    const btn = item.querySelector('button.nav-link');
    const dropdown = item.querySelector('.nav-dropdown, .nav-dropdown-menu');
    if (btn && dropdown) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = item.classList.contains('open');
        closeAllDesktopDropdowns();
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });

      item.addEventListener('mouseleave', () => {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Global click outside to close dropdowns & mobile menu
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.desktop-nav')) {
      closeAllDesktopDropdowns();
    }
    if (navPanel && menuBtn && !navPanel.contains(e.target) && !menuBtn.contains(e.target)) {
      navPanel.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Global Escape key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDesktopDropdowns();
      if (navPanel && navPanel.classList.contains('open')) {
        navPanel.classList.remove('open');
        if (menuBtn) {
          menuBtn.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.focus();
        }
      }
    }
  });

  // FAQ Accordions with Accessible State
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.closest('.faq-item');
      if (parent) {
        const isActive = parent.classList.toggle('active');
        q.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      }
    });
  });

  // Auto-init home compatibility tool if present
  initHomeCompatibility();
  initBentoTicker();
  initHomeAiAdvisorChips();
});

// ==========================================
// Tool 0: Home Page Interactive Compatibility Matcher
// ==========================================
function initHomeCompatibility() {
  const form = document.getElementById('homeCompatibilityForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name1 = (document.getElementById('homePartner1Name')?.value || '').trim();
    const name2 = (document.getElementById('homePartner2Name')?.value || '').trim();

    if (!name1 || !name2) {
      showToast('Please enter both partner names.');
      return;
    }

    const combinedStr = [
      name1.toLowerCase().replace(/[^a-z]/g, ''),
      name2.toLowerCase().replace(/[^a-z]/g, '')
    ].join('|');

    const seed = hashString(combinedStr);
    const score = 62 + (seed % 36); // 62% to 97%
    const commScore = 65 + ((seed * 3) % 33);
    const emotScore = 62 + ((seed * 7) % 36);
    const funScore = 68 + ((seed * 11) % 30);
    const lifeScore = 64 + ((seed * 13) % 34);

    let summaryText = '';
    if (score >= 90) {
      summaryText = `Exceptional harmony! ${name1} and ${name2} share an intuitive rhythm and complementary strengths. Your pairing thrives on natural curiosity, shared laughter, and deep mutual respect.`;
    } else if (score >= 78) {
      summaryText = `Strong, resilient connection! ${name1} and ${name2} bring balanced perspectives to each other. When you engage in deliberate open communication, your relationship develops enduring warmth.`;
    } else {
      summaryText = `Dynamic pairing! ${name1} and ${name2} bring distinct personal energies that can inspire mutual growth. Focus on active listening and shared experiences to unlock your fullest chemistry.`;
    }

    const resultCard = document.getElementById('homeCompatibilityResult');
    if (resultCard) {
      document.getElementById('homeScoreValue').textContent = score;
      document.getElementById('homeScoreFill').style.width = `${score}%`;
      document.getElementById('homeCommScore').textContent = `${commScore}%`;
      document.getElementById('homeEmotScore').textContent = `${emotScore}%`;
      document.getElementById('homeFunScore').textContent = `${funScore}%`;
      document.getElementById('homeLifeScore').textContent = `${lifeScore}%`;
      document.getElementById('homeResultAnalysis').textContent = summaryText;
      resultCard.classList.add('active');
      resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setupShareButtons(`${name1} & ${name2}'s Compatibility Score: ${score}% on LoveScoreTest`);
  });
}

// Bento Live Duration Ticker
function initBentoTicker() {
  const daysEl = document.getElementById('bentoDaysTicker');
  const hoursEl = document.getElementById('bentoHoursTicker');
  const minsEl = document.getElementById('bentoMinsTicker');
  const secsEl = document.getElementById('bentoSecsTicker');
  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const simulatedStart = new Date(Date.now() - (742 * 86400000 + 14 * 3600000 + 32 * 60000));

  function updateTicker() {
    const diff = Math.max(0, Date.now() - simulatedStart.getTime());
    const totalSecs = Math.floor(diff / 1000);
    const d = Math.floor(totalSecs / 86400);
    const h = Math.floor((totalSecs % 86400) / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;

    daysEl.textContent = d;
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }

  updateTicker();
  setInterval(updateTicker, 1000);
}

// Home AI Prompt Chips
function initHomeAiAdvisorChips() {
  const chipButtons = document.querySelectorAll('.ai-prompt-chip-btn');
  const userBubble = document.getElementById('homeAiUserBubble');
  const assistantBubble = document.getElementById('homeAiAssistantBubble');
  if (!chipButtons.length || !userBubble || !assistantBubble) return;

  const responses = {
    'rainy-date': {
      user: 'Can you suggest 3 creative date ideas for a rainy Saturday under $30?',
      assistant: '<p>Here are 3 cozy, high-connection date ideas for a rainy afternoon:</p><ol><li><strong>Living-Room Vinyl &amp; Blanket Picnic:</strong> Spread out pillows, play favorite nostalgic records, and trade childhood stories.</li><li><strong>Pantry Dessert Challenge:</strong> Pick 3 surprise pantry ingredients and bake a creative dessert together.</li><li><strong>Future Bucket-List Deck:</strong> Draw 5 deep relationship questions over homemade chai tea or hot cocoa.</li></ol>'
    },
    'anniversary': {
      user: 'What are thoughtful, low-stress ways to celebrate our 2nd anniversary?',
      assistant: '<p>For your 2nd anniversary (traditional theme: cotton / comfort):</p><ol><li><strong>Cotton &amp; Comfort Retreat:</strong> High-thread-count sheets, matching linen loungewear, and a no-phones evening cooking your first-date meal.</li><li><strong>Framed Milestone Timeline:</strong> Print 10 favorite photos from years 1 and 2 and write an appreciation caption on the back of each.</li><li><strong>Letters to Year 5:</strong> Write sealed letters to each other to open on your 5th anniversary.</li></ol>'
    },
    'communication': {
      user: 'How do we talk through small chores without it turning into an argument?',
      assistant: '<p>Use the 3-step gentle startup framework:</p><ol><li><strong>Lead with Observation, not Character:</strong> "I noticed the dishes are still in the sink" instead of "You never clean up."</li><li><strong>Express the Personal Impact:</strong> "When the kitchen is full, I feel stressed starting dinner after work."</li><li><strong>Make a Clear, Positive Request:</strong> "Could we take 10 minutes together right now to tackle it as a team?"</li></ol>'
    },
    'questions': {
      user: "Give me 3 deep intimacy questions we haven't asked each other yet.",
      assistant: '<p>Try these 3 reflective vulnerability prompts:</p><ol><li>"What is an insecurity you secretly carry that you rarely talk about with anyone else?"</li><li>"In what specific ways do you feel we have positively influenced each other\'s character?"</li><li>"When was a time recently where you felt quietly proud to be my partner?"</li></ol>'
    }
  };

  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      chipButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-prompt');
      if (responses[key]) {
        userBubble.textContent = responses[key].user;
        assistantBubble.innerHTML = responses[key].assistant;
      }
    });
  });
}

// ==========================================
// Tool 1: Love Compatibility Calculator
// ==========================================
function initLoveCompatibility() {
  const form = document.getElementById('compatibilityForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name1 = (document.getElementById('partner1Name')?.value || '').trim();
    const name2 = (document.getElementById('partner2Name')?.value || '').trim();
    const dob1 = document.getElementById('partner1Dob')?.value || '';
    const dob2 = document.getElementById('partner2Dob')?.value || '';
    const sign1 = document.getElementById('partner1Sign')?.value || '';
    const sign2 = document.getElementById('partner2Sign')?.value || '';

    if (!name1 || !name2) {
      showToast('Please enter both partner names.');
      return;
    }

    const combinedStr = [
      name1.toLowerCase().replace(/[^a-z]/g, ''),
      name2.toLowerCase().replace(/[^a-z]/g, ''),
      dob1,
      dob2,
      sign1,
      sign2
    ].join('|');

    const seed = hashString(combinedStr);
    // Calculated score bounded between 60% and 98% for positive encouraging results
    const score = 60 + (seed % 39);
    const commScore = 65 + ((seed * 3) % 34);
    const emotScore = 62 + ((seed * 7) % 37);
    const funScore = 68 + ((seed * 11) % 31);
    const lifeScore = 64 + ((seed * 13) % 35);

    let summaryText = '';
    if (score >= 90) {
      summaryText = `Exceptional alignment! ${name1} and ${name2} share an intuitive rhythm and complementary strengths. Your pairing thrives on natural curiosity, shared laughter, and deep reciprocal respect.`;
    } else if (score >= 78) {
      summaryText = `Strong, resilient connection! ${name1} and ${name2} bring balanced perspectives to each other. When you engage in deliberate open communication, your relationship develops enduring warmth.`;
    } else {
      summaryText = `Dynamic pairing! ${name1} and ${name2} bring unique individual energies that can inspire mutual personal growth. Focus on active listening and shared hobbies to unlock your fullest chemistry.`;
    }

    // Update UI
    const resultCard = document.getElementById('compatibilityResult');
    if (resultCard) {
      document.getElementById('scoreValue').textContent = score;
      document.getElementById('scoreFill').style.width = `${score}%`;
      document.getElementById('commScore').textContent = `${commScore}%`;
      document.getElementById('emotScore').textContent = `${emotScore}%`;
      document.getElementById('funScore').textContent = `${funScore}%`;
      document.getElementById('lifeScore').textContent = `${lifeScore}%`;
      document.getElementById('resultAnalysis').textContent = summaryText;
      resultCard.classList.add('active');
      resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Configure share buttons
    setupShareButtons(`${name1} & ${name2}'s Compatibility Score: ${score}% on LoveScoreTest`);
  });
}

// ==========================================
// Tool 2: Classic Love Calculator
// ==========================================
function initLoveCalculator() {
  const form = document.getElementById('loveCalcForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name1 = (document.getElementById('name1')?.value || '').trim();
    const name2 = (document.getElementById('name2')?.value || '').trim();

    if (!name1 || !name2) {
      showToast('Please enter both names to test your love score.');
      return;
    }

    const combined = [name1.toLowerCase(), name2.toLowerCase()].sort().join('&');
    const hash = hashString(combined);
    const score = 55 + (hash % 44); // 55% - 98%

    const archetypes = [
      { min: 90, title: "Twin Flames", desc: "A naturally magnetic match with effortless rapport and mutual adoration." },
      { min: 80, title: "Steadfast Bond", desc: "A deep foundation of trust and friendship with high potential for enduring love." },
      { min: 70, title: "Passionate Spark", desc: "Exciting chemistry filled with spontaneity, laughter, and novel shared adventures." },
      { min: 55, title: "Intriguing Contrast", desc: "Two distinct personalities who challenge each other to grow and see life differently." }
    ];

    const match = archetypes.find(a => score >= a.min) || archetypes[archetypes.length - 1];

    const resultBox = document.getElementById('loveResult');
    if (resultBox) {
      document.getElementById('loveScoreNumber').textContent = score;
      document.getElementById('loveScoreFill').style.width = `${score}%`;
      document.getElementById('matchArchetype').textContent = match.title;
      document.getElementById('matchDescription').textContent = match.desc;
      resultBox.classList.add('active');
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setupShareButtons(`${name1} & ${name2} scored ${score}% (${match.title}) on LoveScoreTest!`);
  });
}

// ==========================================
// Tool 3: Relationship Duration Calculator
// ==========================================
let relationshipTimer = null;

function initRelationshipCalculator() {
  const form = document.getElementById('relationshipForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dateInput = document.getElementById('relationshipStartDate')?.value;
    if (!dateInput) {
      showToast('Please select your relationship start date.');
      return;
    }

    // Parse explicitly to avoid UTC timezone off-by-one shifting in local timezones
    const [year, month, day] = dateInput.split('-').map(Number);
    const startDate = new Date(year, month - 1, day);
    const now = new Date();

    if (startDate > now) {
      showToast('The relationship start date cannot be in the future.');
      return;
    }

    const resultBox = document.getElementById('relationshipResult');
    if (resultBox) {
      resultBox.classList.add('active');
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (relationshipTimer) clearInterval(relationshipTimer);

    function updateDuration() {
      const current = new Date();
      const diffMs = current - startDate;
      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);
      const totalWeeks = Math.floor(totalDays / 7);
      const totalMonths = (current.getFullYear() - startDate.getFullYear()) * 12 + (current.getMonth() - startDate.getMonth());

      // Detailed Years, Months, Days breakdown
      let years = current.getFullYear() - startDate.getFullYear();
      let months = current.getMonth() - startDate.getMonth();
      let days = current.getDate() - startDate.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(current.getFullYear(), current.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      document.getElementById('relYears').textContent = years;
      document.getElementById('relMonths').textContent = months;
      document.getElementById('relDays').textContent = days;
      document.getElementById('totalDaysTogether').textContent = totalDays.toLocaleString();
      document.getElementById('totalWeeksTogether').textContent = totalWeeks.toLocaleString();
      document.getElementById('totalHoursTogether').textContent = totalHours.toLocaleString();
      document.getElementById('liveSeconds').textContent = totalSeconds.toLocaleString();

      // Next Anniversary Calculation
      let nextAnniv = new Date(current.getFullYear(), startDate.getMonth(), startDate.getDate());
      if (nextAnniv < current) {
        nextAnniv.setFullYear(current.getFullYear() + 1);
      }
      const daysUntilAnniv = Math.ceil((nextAnniv - current) / (1000 * 60 * 60 * 24));
      const annivNumber = nextAnniv.getFullYear() - startDate.getFullYear();
      document.getElementById('daysUntilNextAnniv').textContent = daysUntilAnniv;
      document.getElementById('nextAnnivOrdinal').textContent = getOrdinal(annivNumber);

      // Milestone Checklist
      const milestones = [
        { days: 100, label: "100 Days Together" },
        { days: 500, label: "500 Days Together" },
        { days: 1000, label: "1,000 Days Milestone" },
        { days: 2000, label: "2,000 Days Milestone" },
        { days: 3652, label: "10 Years (3,652 Days)" }
      ];

      const milestoneList = document.getElementById('milestoneItems');
      if (milestoneList) {
        milestoneList.innerHTML = milestones.map(m => {
          const reached = totalDays >= m.days;
          const targetDate = new Date(startDate.getTime() + m.days * 86400000);
          return `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#f5f5f4;border-radius:8px;margin-bottom:8px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:18px;">${reached ? '✅' : '⏳'}</span>
                <div>
                  <strong style="display:block;font-size:14px;color:#1c1917;">${m.label}</strong>
                  <span style="font-size:12px;color:#78716c;">${targetDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
              <span style="font-size:12px;font-weight:700;padding:4px 8px;border-radius:4px;background:${reached ? '#dcfce7;color:#15803d' : '#e0e7ff;color:#4338ca'}">
                ${reached ? 'Accomplished' : `${(m.days - totalDays).toLocaleString()} days to go`}
              </span>
            </div>
          `;
        }).join('');
      }
    }

    updateDuration();
    relationshipTimer = setInterval(updateDuration, 1000);
    setupShareButtons(`We have been together for days! Calculated on LoveScoreTest`);
  });
}

function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ==========================================
// Tool 4: Anniversary Calculator
// ==========================================
function initAnniversaryCalculator() {
  const form = document.getElementById('annivForm');
  if (!form) return;

  const giftGuides = {
    1: { trad: "Paper", mod: "Clocks", desc: "Represents fragility and the fresh pages waiting to be written." },
    2: { trad: "Cotton", mod: "China", desc: "Symbolizes flexibility, comfort, and interwoven lives." },
    3: { trad: "Leather", mod: "Crystal", desc: "Represents shelter, security, and warm protection." },
    4: { trad: "Fruit & Flowers", mod: "Appliances", desc: "A blossoming relationship bearing beautiful fruit." },
    5: { trad: "Wood", mod: "Silverware", desc: "Strong, deep roots and enduring wisdom." },
    10: { trad: "Tin / Aluminum", mod: "Diamond Jewelry", desc: "Pliable, rust-resistant, and steadfast through seasons." },
    15: { trad: "Crystal", mod: "Watches", desc: "Clarity, transparency, and investment in shared time." },
    20: { trad: "China", mod: "Platinum", desc: "Delicate yet durable elegance nurtured over two decades." },
    25: { trad: "Silver", mod: "Silver", desc: "The classic Silver Jubilee celebrating radiance and value." },
    50: { trad: "Gold", mod: "Gold", desc: "Timeless purity, resilience, and a lifetime of shared devotion." }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dateStr = document.getElementById('annivDate')?.value;
    if (!dateStr) {
      showToast('Please enter your anniversary date.');
      return;
    }

    const [aYear, aMonth, aDay] = dateStr.split('-').map(Number);
    const annivBase = new Date(aYear, aMonth - 1, aDay);
    const now = new Date();
    let nextAnniv = new Date(now.getFullYear(), annivBase.getMonth(), annivBase.getDate());
    if (nextAnniv < now) {
      nextAnniv.setFullYear(now.getFullYear() + 1);
    }

    const daysLeft = Math.ceil((nextAnniv - now) / (1000 * 60 * 60 * 24));
    const nextYearCount = nextAnniv.getFullYear() - annivBase.getFullYear();

    const gift = giftGuides[nextYearCount] || {
      trad: "Custom Keepsake",
      mod: "Experiential Getaway",
      desc: "Honor your unique shared milestone with memories, travel, and handwritten reflections."
    };

    const resultBox = document.getElementById('annivResult');
    if (resultBox) {
      document.getElementById('annivDaysLeft').textContent = daysLeft;
      document.getElementById('annivYearNumber').textContent = getOrdinal(nextYearCount);
      document.getElementById('tradGift').textContent = gift.trad;
      document.getElementById('modGift').textContent = gift.mod;
      document.getElementById('giftMeaning').textContent = gift.desc;
      resultBox.classList.add('active');
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setupShareButtons(`Our ${getOrdinal(nextYearCount)} anniversary is in ${daysLeft} days! Planned on LoveScoreTest`);
  });
}

// ==========================================
// Tool 5: Couple Compatibility Quiz
// ==========================================
function initCoupleQuiz() {
  const form = document.getElementById('coupleQuizForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const answers = new FormData(form);
    let totalPoints = 0;
    let answeredCount = 0;

    for (let entry of answers.entries()) {
      totalPoints += parseInt(entry[1], 10);
      answeredCount++;
    }

    if (answeredCount < 5) {
      showToast('Please answer all 5 questions for an accurate harmony assessment.');
      return;
    }

    // Max possible is 20 points (4 points per 5 questions)
    const percentage = Math.round((totalPoints / 20) * 100);

    let harmonyType = "";
    let guidance = "";

    if (percentage >= 85) {
      harmonyType = "Synchronized Partnership";
      guidance = "Your communication habits and conflict resolution styles are closely aligned. You handle differences with respect, prioritize connection, and naturally validate each other's emotional space.";
    } else if (percentage >= 65) {
      harmonyType = "Harmonious Complement";
      guidance = "You have a solid emotional core with healthy individuality. While your instincts in conflict or social pacing differ at times, you navigate them effectively through patience and mutual goodwill.";
    } else {
      harmonyType = "Growth-Oriented Dynamic";
      guidance = "You and your partner approach communication and stress from contrasting perspectives. This brings great excitement and learning, but benefits from intentional check-ins and clarifying each other's love languages.";
    }

    const resultBox = document.getElementById('quizResult');
    if (resultBox) {
      document.getElementById('quizScore').textContent = `${percentage}%`;
      document.getElementById('quizScoreFill').style.width = `${percentage}%`;
      document.getElementById('harmonyType').textContent = harmonyType;
      document.getElementById('quizGuidance').textContent = guidance;
      resultBox.classList.add('active');
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setupShareButtons(`We scored ${percentage}% (${harmonyType}) on the Couple Harmony Assessment!`);
  });
}

// ==========================================
// Tool 6: Relationship Questions Engine
// ==========================================
function initQuestionGenerator(questions) {
  const btn = document.getElementById('drawQuestionBtn');
  const card = document.getElementById('questionDisplay');
  const catFilter = document.getElementById('categoryFilter');
  const copyBtn = document.getElementById('copyQuestionBtn');

  if (!btn || !card || !questions || !questions.length) return;

  function pickQuestion() {
    const selectedCat = catFilter ? catFilter.value : 'all';
    const filtered = selectedCat === 'all' 
      ? questions 
      : questions.filter(q => q.category === selectedCat);

    if (filtered.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const item = filtered[randomIndex];

    document.getElementById('questionCategoryBadge').textContent = item.category;
    document.getElementById('questionText').textContent = item.question;
    card.style.opacity = '0';
    card.style.transform = 'translateY(6px)';
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 50);
  }

  btn.addEventListener('click', pickQuestion);
  if (catFilter) catFilter.addEventListener('change', pickQuestion);

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = document.getElementById('questionText')?.textContent;
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('Question copied to clipboard!');
        });
      }
    });
  }

  pickQuestion();
}

// ==========================================
// Tool 7: AI Relationship Assistant
// ==========================================
function initAIAdvisor() {
  const sendBtn = document.getElementById('sendAiBtn');
  const input = document.getElementById('aiInput');
  const messages = document.getElementById('aiMessages');
  const pills = document.querySelectorAll('.prompt-pill');

  if (!sendBtn || !input || !messages) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      input.value = pill.textContent.trim();
      input.focus();
    });
  });

  async function handleSend() {
    const query = input.value.trim();
    if (!query) return;

    // Append user message
    appendMessage(query, 'user');
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;

    // Append loading placeholder
    const loadingId = 'loading-' + Date.now();
    const loadingEl = document.createElement('div');
    loadingEl.id = loadingId;
    loadingEl.className = 'chat-bubble bot';
    loadingEl.innerHTML = '<em>Thinking with empathy & care...</em>';
    messages.appendChild(loadingEl);
    messages.scrollTop = messages.scrollHeight;

    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query })
      });

      const data = await res.json();
      const loadNode = document.getElementById(loadingId);
      if (loadNode) loadNode.remove();

      if (res.ok && data.reply) {
        appendMessage(data.reply, 'bot');
      } else {
        appendMessage(data.error || 'Sorry, I could not process your question right now. Please try again in a moment.', 'bot');
      }
    } catch (err) {
      const loadNode = document.getElementById(loadingId);
      if (loadNode) loadNode.remove();
      appendMessage('Unable to reach the advisor service. Please check your connection and try again.', 'bot');
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
      messages.scrollTop = messages.scrollHeight;
    }
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  function appendMessage(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    // Simple paragraph parser for bot replies
    if (sender === 'bot') {
      const paras = text.split('\n\n').filter(p => p.trim());
      bubble.innerHTML = paras.map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`).join('');
    } else {
      bubble.textContent = text;
    }
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

function setupShareButtons(shareText) {
  const currentUrl = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(shareText);

  const wa = document.getElementById('shareWa');
  if (wa) wa.href = `https://api.whatsapp.com/send?text=${text}%20${currentUrl}`;

  const fb = document.getElementById('shareFb');
  if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;

  const tw = document.getElementById('shareTw');
  if (tw) tw.href = `https://twitter.com/intent/tweet?text=${text}&url=${currentUrl}`;

  const copy = document.getElementById('copyShare');
  if (copy) {
    copy.onclick = () => {
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`).then(() => {
        showToast('Link copied to clipboard!');
      });
    };
  }
}

// ==========================================
// Tool 8: Ship Name Generator
// ==========================================
function initShipNameGenerator() {
  const form = document.getElementById('shipNameForm');
  if (!form) return;

  const VOWELS = "aeiouy";
  function isV(c) { return VOWELS.indexOf(c) !== -1; }
  function clean(s) { return (s || "").toLowerCase().replace(/[^a-z]/g, ''); }

  function cuts(name) {
    const pts = {};
    for (let i = 1; i < name.length; i++) {
      if (isV(name[i - 1]) !== isV(name[i])) pts[i] = true;
    }
    if (name.length > 2) pts[2] = true;
    const out = [];
    for (const k in pts) {
      const n = parseInt(k, 10);
      if (n > 0 && n < name.length) out.push(n);
    }
    out.sort((a, b) => a - b);
    return out;
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw1 = (document.getElementById('shipName1')?.value || '').trim();
    const raw2 = (document.getElementById('shipName2')?.value || '').trim();

    if (!raw1 || !raw2) {
      showToast('Please enter two names to blend.');
      return;
    }

    const n1 = clean(raw1);
    const n2 = clean(raw2);

    if (n1.length < 2 || n2.length < 2) {
      showToast('Names must have at least 2 letters.');
      return;
    }

    const cut1 = cuts(n1);
    const cut2 = cuts(n2);
    const seen = new Set();
    const blends = [];

    function addBlend(prefix, suffix) {
      const combined = prefix + suffix;
      if (combined.length < 4 || combined.length > 14) return;
      if (combined === n1 || combined === n2) return;
      if (seen.has(combined)) return;
      seen.add(combined);

      let score = 50;
      if (combined.length >= 5 && combined.length <= 8) score += 20;
      let consecutiveConsonants = 0;
      let maxCons = 0;
      for (const char of combined) {
        if (!isV(char)) {
          consecutiveConsonants++;
          if (consecutiveConsonants > maxCons) maxCons = consecutiveConsonants;
        } else {
          consecutiveConsonants = 0;
        }
      }
      if (maxCons <= 2) score += 15;
      else if (maxCons >= 4) score -= 25;

      blends.push({ name: capitalize(combined), score });
    }

    for (const c1 of cut1) {
      for (const c2 of cut2) {
        addBlend(n1.slice(0, c1), n2.slice(c2));
      }
    }
    for (const c2 of cut2) {
      for (const c1 of cut1) {
        addBlend(n2.slice(0, c2), n1.slice(c1));
      }
    }

    blends.sort((a, b) => b.score - a.score);
    const topBlends = blends.slice(0, 8);

    const resultBox = document.getElementById('shipResult');
    const listEl = document.getElementById('shipNamesList');
    if (resultBox && listEl) {
      if (topBlends.length === 0) {
        const half1 = n1.slice(0, Math.ceil(n1.length / 2));
        const half2 = n2.slice(Math.floor(n2.length / 2));
        topBlends.push({ name: capitalize(half1 + half2), score: 70 });
      }

      listEl.innerHTML = topBlends.map((b, idx) => `
        <li style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#f5f5f4;border-radius:10px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-weight:700;font-size:1.15rem;color:var(--rose-600);">${b.name}</span>
            ${idx === 0 ? '<span style="font-size:0.75rem;padding:2px 8px;background:var(--rose-600);color:#fff;border-radius:999px;font-weight:600;">TOP PICK</span>' : ''}
          </div>
          <button type="button" class="btn btn-sm btn-secondary" onclick="navigator.clipboard.writeText('${b.name}');showToast('Copied ${b.name} to clipboard!');">Copy</button>
        </li>
      `).join('');

      resultBox.classList.add('active');
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setupShareButtons(`${capitalize(n1)} & ${capitalize(n2)}'s Ship Names generated on LoveScoreTest`);
  });
}

