import fs from 'fs';
import path from 'path';
import { ALL_TOOLS } from '../src/data/toolsData';

export interface ToolSeoConfig {
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  metaDescription: string;
  h1: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  canonicalUrl: string;
}

const rawSeoData: Record<string, {
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  metaDescription: string;
  h1: string;
}> = {
  // Phase 1: Love Calculators
  'love-calculator': {
    primaryKeyword: 'love calculator',
    secondaryKeywords: ['love percentage calculator', 'name compatibility test', 'crush calculator'],
    title: 'Love Calculator â€“ Free Love Percentage & Name Match Test',
    metaDescription: 'Calculate romantic synergy and character harmony between two names in seconds. Fun, free, private love score percentage test.',
    h1: 'Love Calculator: Free Love Percentage & Name Compatibility Test'
  },
  'crush-compatibility-meter': {
    primaryKeyword: 'crush compatibility test',
    secondaryKeywords: ['crush meter', 'does my crush like me quiz', 'crush vibe check'],
    title: 'Crush Compatibility Meter â€“ Test Your Chemistry & Connection',
    metaDescription: 'Evaluate mutual body language, shared laughter, and conversation cues to gauge your crush chemistry score. Free and 100% private.',
    h1: 'Crush Compatibility Meter: Chemistry & Vibe Check'
  },
  'flames-love-game': {
    primaryKeyword: 'flames game',
    secondaryKeywords: ['flames calculator', 'flames love test', 'flames name game'],
    title: 'FLAMES Love Calculator â€“ Classic Friends, Lovers, Affection Game',
    metaDescription: 'Play the nostalgic FLAMES game online. Enter two names to calculate Friends, Lovers, Affection, Marriage, Enmity, or Siblings.',
    h1: 'FLAMES Love Calculator: Friends, Lovers, Affection, Marriage Game'
  },
  'zodiac-love-calculator': {
    primaryKeyword: 'zodiac love calculator',
    secondaryKeywords: ['astrology compatibility', 'star sign match', 'horoscope love test'],
    title: 'Zodiac Love Calculator â€“ Astrological Sign Compatibility',
    metaDescription: 'Compare Western zodiac elements and planetary modalities for any two star signs. Explore astrological harmony for couples and crushes.',
    h1: 'Zodiac Love Calculator: Astrological Sign Compatibility'
  },
  'birthday-love-calculator': {
    primaryKeyword: 'birthday love calculator',
    secondaryKeywords: ['numerology love test', 'birthdate compatibility', 'life path love match'],
    title: 'Birthday Love Calculator â€“ Birthdate & Numerology Compatibility',
    metaDescription: 'Calculate birthdate numerology, life path alignment, and calendar chemistry between two birthdays. Free online compatibility tool.',
    h1: 'Birthday Love Calculator: Birthdate & Life Path Compatibility'
  },
  'initials-love-matcher': {
    primaryKeyword: 'initials love test',
    secondaryKeywords: ['initials compatibility', 'monogram match', 'alphabet love calculator'],
    title: 'Initials Love Matcher â€“ Quick Monogram Romance Match',
    metaDescription: 'Test monogram synergy and alphabet harmony with two initials. A delightful, quick love game for crushes and couples.',
    h1: 'Initials Love Matcher: Monogram & Alphabet Compatibility'
  },
  'true-love-potential-score': {
    primaryKeyword: 'true love test',
    secondaryKeywords: ['long term love potential', 'relationship sustainability quiz', 'genuine love test'],
    title: 'True Love Potential Score â€“ Deep Long-Term Relationship Quiz',
    metaDescription: 'Evaluate genuine emotional depth, unselfish care, and shared vulnerability to assess your relationship potential. Free and private.',
    h1: 'True Love Potential Score: Emotional Depth & Sustainability Quiz'
  },

  // Phase 2: Compatibility Tests
  'love-compatibility-test': {
    primaryKeyword: 'love compatibility test',
    secondaryKeywords: ['relationship compatibility quiz', 'couple compatibility assessment', 'core values match'],
    title: 'Love Compatibility Test â€“ Multi-Factor Couple Assessment',
    metaDescription: 'Comprehensive relationship assessment evaluating values, communication styles, emotional resonance, and shared future vision.',
    h1: 'Love Compatibility Test: Multi-Factor Relationship Assessment'
  },
  'friendship-compatibility-test': {
    primaryKeyword: 'friendship compatibility test',
    secondaryKeywords: ['best friend quiz', 'bff compatibility', 'friendship bond test'],
    title: 'Friendship Compatibility Test â€“ Best Friend Chemistry & Bond',
    metaDescription: 'Measure loyalty, humor, shared adventures, and emotional support to evaluate your platonic bond strength. Free BFF quiz.',
    h1: 'Friendship Compatibility Test: Best Friend Bond & Loyalty Quiz'
  },
  'emotional-compatibility-test': {
    primaryKeyword: 'emotional compatibility test',
    secondaryKeywords: ['emotional connection quiz', 'empathy match', 'vulnerability in relationships'],
    title: 'Emotional Compatibility Test â€“ Couple Empathy & Connection',
    metaDescription: 'Discover how well you and your partner harmonize during emotional highs and lows. Assess mutual validation, soothing, and empathy.',
    h1: 'Emotional Compatibility Test: Empathy & Connection Assessment'
  },
  'communication-style-match': {
    primaryKeyword: 'communication style quiz couples',
    secondaryKeywords: ['relationship communication test', 'how couples communicate', 'conversation styles'],
    title: 'Communication Style Match â€“ Couple Conversation Compatibility',
    metaDescription: 'Identify whether you are direct, diplomatic, analytical, or expressive communicators. Learn how your styles complement each other.',
    h1: 'Communication Style Match: Relationship Conversation Compatibility'
  },
  'lifestyle-habits-compatibility': {
    primaryKeyword: 'lifestyle compatibility test',
    secondaryKeywords: ['living habits quiz', 'couple daily routine match', 'sleep and social habits'],
    title: 'Lifestyle & Habits Compatibility â€“ Daily Routines & Rhythm',
    metaDescription: 'Check compatibility across sleep schedules, social energy, cleanliness, and weekend rhythms before or during cohabitation.',
    h1: 'Lifestyle & Habits Compatibility: Daily Routines & Rhythm Test'
  },
  'financial-harmony-quiz': {
    primaryKeyword: 'financial compatibility couples',
    secondaryKeywords: ['money habits quiz couples', 'spending vs saving couples', 'financial harmony test'],
    title: 'Financial Harmony Quiz â€“ Money Habits & Spending Styles',
    metaDescription: 'Assess budgeting approaches, savings mindset, splurge triggers, and long-term financial transparency with your partner.',
    h1: 'Financial Harmony Quiz: Money Habits & Financial Alignment'
  },
  'future-goals-vision-match': {
    primaryKeyword: 'relationship future goals quiz',
    secondaryKeywords: ['shared vision test', 'marriage and family alignment', 'career and location goals'],
    title: 'Future Goals & Vision Match â€“ 5-Year Relationship Alignment',
    metaDescription: 'Align on city vs suburbs, career mobility, family planning, and lifelong dreams with this structured couple alignment tool.',
    h1: 'Future Goals & Vision Match: Couple Long-Term Alignment Quiz'
  },
  'introvert-extrovert-couple-match': {
    primaryKeyword: 'introvert extrovert relationship',
    secondaryKeywords: ['introvert extrovert couple quiz', 'social battery compatibility', 'opposites attract love'],
    title: 'Introvert-Extrovert Couple Match â€“ Social Battery Harmony',
    metaDescription: 'Learn how introvert and extrovert dynamics balance each other. Optimize quiet downtime and lively social outings as a team.',
    h1: 'Introvert-Extrovert Couple Match: Social Energy Compatibility'
  },
  'humor-and-banter-compatibility': {
    primaryKeyword: 'sense of humor compatibility',
    secondaryKeywords: ['couples humor test', 'banter compatibility', 'shared laughter quiz'],
    title: 'Humor & Banter Compatibility â€“ Shared Laughter & Wit Test',
    metaDescription: 'Are you sarcasm soulmates, goofy puns lovers, or dry wit enthusiasts? Discover how your comedic styles connect.',
    h1: 'Humor & Banter Compatibility: Shared Laughter & Wit Quiz'
  },
  'conflict-resolution-style-test': {
    primaryKeyword: 'conflict resolution quiz couples',
    secondaryKeywords: ['how couples fight quiz', 'healthy arguing test', 'repair attempts quiz'],
    title: 'Conflict Resolution Style Test â€“ De-escalation & Fair Fighting',
    metaDescription: 'Assess your fighting and resolution patterns: calm collaboration, cooling off, or emotional intensity. Learn better repair strategies.',
    h1: 'Conflict Resolution Style Test: Fair Fighting & De-escalation Quiz'
  },
  'attachment-style-compatibility': {
    primaryKeyword: 'attachment style compatibility',
    secondaryKeywords: ['secure anxious avoidant quiz', 'couples attachment test', 'relationship attachment patterns'],
    title: 'Attachment Style Compatibility â€“ Secure, Anxious & Avoidant Dynamics',
    metaDescription: 'Explore how secure, anxious, and avoidant attachment tendencies interact in romantic partnerships, and foster mutual emotional security.',
    h1: 'Attachment Style Compatibility: Relationship Attachment Dynamics'
  },
  'intellectual-compatibility-test': {
    primaryKeyword: 'intellectual compatibility test',
    secondaryKeywords: ['mental connection quiz', 'intellectual chemistry couples', 'curiosity match'],
    title: 'Intellectual Compatibility Test â€“ Mental Chemistry & Curiosity',
    metaDescription: 'Measure deep conversation compatibility, shared curiosity, debate enjoyment, and intellectual chemistry between partners.',
    h1: 'Intellectual Compatibility Test: Mental Chemistry & Curiosity Quiz'
  },
  'adventure-vs-comfort-meter': {
    primaryKeyword: 'adventure compatibility couples',
    secondaryKeywords: ['travel style quiz couples', 'thrill seeker vs homebody', 'vacation compatibility'],
    title: 'Adventure vs Comfort Meter â€“ Travel & Thrill Compatibility',
    metaDescription: 'Are you backpacking thrill-seekers or cozy resort relaxers? Balance wanderlust and cozy homebody comfort in your relationship.',
    h1: 'Adventure vs Comfort Meter: Travel Style & Thrill Compatibility'
  },
  'family-values-compatibility': {
    primaryKeyword: 'family values compatibility',
    secondaryKeywords: ['in-laws relationship quiz', 'holiday traditions couples', 'family boundaries test'],
    title: 'Family Values Compatibility â€“ In-Laws, Holidays & Boundaries',
    metaDescription: 'Evaluate traditions, in-law involvement, holiday expectations, and family boundaries for healthy partnership harmony.',
    h1: 'Family Values Compatibility: In-Laws, Traditions & Boundaries'
  },
  'physical-affection-frequency-match': {
    primaryKeyword: 'affection compatibility couples',
    secondaryKeywords: ['physical touch match', 'cuddle frequency quiz', 'relationship affection test'],
    title: 'Physical Affection Frequency Match â€“ Hugs, Cuddles & Warmth',
    metaDescription: 'Check alignment on hand-holding, cuddles, daily hugs, and romantic touch frequency to keep both partners feeling cherished.',
    h1: 'Physical Affection Frequency Match: Daily Touch & Warmth Compatibility'
  },
  'spontaneity-vs-planning-match': {
    primaryKeyword: 'planner vs spontaneous couples',
    secondaryKeywords: ['spontaneity quiz', 'calendar planning relationship', 'weekend routine compatibility'],
    title: 'Spontaneity vs Planning Match â€“ Schedule & Routine Harmony',
    metaDescription: 'Do you need color-coded itineraries or last-minute road trips? Find the perfect sweet spot between structure and spontaneous joy.',
    h1: 'Spontaneity vs Planning Match: Schedule & Adventure Harmony'
  },
  'career-ambition-synergy': {
    primaryKeyword: 'career ambition couples compatibility',
    secondaryKeywords: ['power couple test', 'work life balance relationship', 'dual career compatibility'],
    title: 'Career & Ambition Synergy â€“ Dual-Career & Goal Support',
    metaDescription: 'Evaluate how you celebrate each otherâ€™s professional wins, navigate demanding work hours, and prevent burnout together.',
    h1: 'Career & Ambition Synergy: Dual-Career Support & Balance'
  },
  'spiritual-and-philosophical-match': {
    primaryKeyword: 'spiritual compatibility couples',
    secondaryKeywords: ['philosophical match quiz', 'worldview compatibility', 'ethics and beliefs relationship'],
    title: 'Spiritual & Philosophical Match â€“ Worldview & Ethics Harmony',
    metaDescription: 'Explore worldview alignment, personal faith or secular ethics, moral principles, and meaning-making in your relationship.',
    h1: 'Spiritual & Philosophical Match: Worldview & Moral Ethics Test'
  },
  'roommate-compatibility-test': {
    primaryKeyword: 'roommate compatibility test',
    secondaryKeywords: ['moving in together quiz', 'cohabitation test', 'chore division compatibility'],
    title: 'Roommate & Co-Living Test â€“ Moving In Together Readiness',
    metaDescription: 'Moving in together? Test cohabitation harmony: dishes in the sink, quiet hours, fridge etiquette, and chore division.',
    h1: 'Roommate & Co-Living Test: Cohabitation Readiness & Habit Match'
  },

  // Phase 3: Couple Quizzes
  'couple-compatibility-quiz': {
    primaryKeyword: 'couple compatibility quiz',
    secondaryKeywords: ['relationship strength quiz', 'dating compatibility test', 'marriage compatibility quiz'],
    title: 'Couple Compatibility Quiz â€“ Deep Relationship Strength Test',
    metaDescription: 'Comprehensive couple quiz evaluating emotional intimacy, conflict resolution, romance, and shared life goals. Free and private.',
    h1: 'Couple Compatibility Quiz: Comprehensive Relationship Strength Test'
  },
  'how-well-do-you-know-your-partner': {
    primaryKeyword: 'how well do you know your partner',
    secondaryKeywords: ['partner quiz', 'couples trivia test', 'how well do you know me game'],
    title: 'How Well Do You Know Your Partner? â€“ Couple Trivia Challenge',
    metaDescription: 'Test how well you know your partnerâ€™s favorite meals, biggest pet peeves, hidden dreams, and childhood memories. Fun couple quiz.',
    h1: 'How Well Do You Know Your Partner? Couple Trivia Challenge'
  },
  'who-is-more-likely-couples': {
    primaryKeyword: 'who is more likely couples',
    secondaryKeywords: ['most likely to couple edition', 'who is more likely to questions', 'couple tag game'],
    title: 'Who Is More Likely? â€” Couples Edition Party Quiz',
    metaDescription: 'Who falls asleep during movies? Who spends more on snacks? Play the ultimate couple tag game with hilarious, revealing prompts.',
    h1: 'Who Is More Likely? Couples Edition Fun Relationship Game'
  },
  'relationship-health-checkup': {
    primaryKeyword: 'relationship health checkup',
    secondaryKeywords: ['relationship wellness test', 'couple check in quiz', 'is my relationship healthy'],
    title: 'Relationship Health Checkup â€“ 10-Pillar Relationship Wellness',
    metaDescription: 'Take a comprehensive, proactive pulse check on your partnership across communication, trust, intimacy, safety, and mutual support.',
    h1: 'Relationship Health Checkup: 10-Pillar Partnership Wellness Test'
  },
  'green-flags-vs-red-flags-quiz': {
    primaryKeyword: 'green flags red flags relationship quiz',
    secondaryKeywords: ['dating green flags test', 'red flag detector quiz', 'healthy relationship signs'],
    title: 'Green Flags vs Red Flags Quiz â€“ Healthy Dating Evaluator',
    metaDescription: 'Identify healthy positive behaviors and spot warning signs early. Evaluate consistency, respect, accountability, and boundaries.',
    h1: 'Green Flags vs Red Flags Quiz: Healthy Dating Evaluation'
  },
  'dating-stage-milestone-quiz': {
    primaryKeyword: 'dating stage milestone quiz',
    secondaryKeywords: ['what stage is our relationship', 'relationship milestones test', 'are we exclusive quiz'],
    title: 'Dating Stage & Milestone Quiz â€“ Where Does Your Relationship Stand?',
    metaDescription: 'From talking stage to exclusive commitment and cohabitation: identify your current relationship phase and healthy next steps.',
    h1: 'Dating Stage & Milestone Quiz: Identify Your Relationship Phase'
  },
  'spark-and-romance-meter': {
    primaryKeyword: 'spark and romance meter',
    secondaryKeywords: ['keep the spark alive quiz', 'romance level test', 'chemistry meter couples'],
    title: 'Spark & Romance Meter â€“ Passion & Novelty Check for Couples',
    metaDescription: 'Gauge date-night frequency, flirtatious energy, novelty, and butterflies. Discover fresh ways to reignite romantic excitement.',
    h1: 'Spark & Romance Meter: Passion & Romantic Chemistry Check'
  },
  'couple-trust-score-test': {
    primaryKeyword: 'couple trust score test',
    secondaryKeywords: ['trust in relationship quiz', 'reliability and honesty test', 'emotional safety couples'],
    title: 'Couple Trust Score Test â€“ Reliability, Honesty & Safety',
    metaDescription: 'Evaluate mutual reliability, honest disclosure, emotional safety, and confidence in your partner with this private trust test.',
    h1: 'Couple Trust Score Test: Reliability & Emotional Safety Quiz'
  },
  'appreciation-gratitude-quiz': {
    primaryKeyword: 'couples gratitude quiz',
    secondaryKeywords: ['appreciation test relationship', 'do we appreciate each other', 'relationship thankfulness'],
    title: 'Appreciation & Gratitude Quiz â€“ Couple Affirmation Meter',
    metaDescription: 'Measure how frequently you notice, acknowledge, and express genuine appreciation for the daily gifts your partner brings into your life.',
    h1: 'Appreciation & Gratitude Quiz: Couple Affirmation & Thankfulness'
  },
  'dating-readiness-quiz': {
    primaryKeyword: 'am i ready to date quiz',
    secondaryKeywords: ['dating readiness test', 'ready for a relationship quiz', 'healing before dating'],
    title: 'Dating Readiness Quiz â€“ Are You Ready for a New Relationship?',
    metaDescription: 'Check emotional closure, personal self-worth, boundary clarity, and bandwidth before jumping back into the modern dating pool.',
    h1: 'Dating Readiness Quiz: Emotional Availability & Dating Health'
  },
  'long-distance-relationship-strength': {
    primaryKeyword: 'long distance relationship test',
    secondaryKeywords: ['ldr strength quiz', 'will our long distance relationship last', 'ldr couples test'],
    title: 'Long Distance Relationship (LDR) Strength â€“ Connection & Trust',
    metaDescription: 'Assess timezone management, virtual intimacy, trust, and shared end-date timelines for long-distance dating couples.',
    h1: 'Long Distance Relationship (LDR) Strength: Connection & Trust Quiz'
  },
  'are-you-soulmates-quiz': {
    primaryKeyword: 'are we soulmates quiz',
    secondaryKeywords: ['soulmate test', 'twin flame quiz', 'destined for each other quiz'],
    title: 'Are You Soulmates Quiz â€“ Deep Connection & Synchronicities',
    metaDescription: 'Explore effortless understanding, telepathic jokes, emotional safety, and cosmic harmony in this fun romantic soulmate quiz.',
    h1: 'Are You Soulmates Quiz: Deep Connection & Chemistry Test'
  },
  'marriage-readiness-assessment': {
    primaryKeyword: 'marriage readiness quiz',
    secondaryKeywords: ['are we ready for marriage test', 'premarital questions quiz', 'engagement readiness'],
    title: 'Marriage Readiness Assessment â€“ Premarital Checklist & Alignment',
    metaDescription: 'Evaluate financial openness, family planning, lifelong commitment, and crisis navigation before taking the walk down the aisle.',
    h1: 'Marriage Readiness Assessment: Premarital Alignment & Checklist'
  },
  'jealousy-and-security-quiz': {
    primaryKeyword: 'relationship jealousy quiz',
    secondaryKeywords: ['am i too jealous quiz', 'relationship security test', 'trust vs insecurity quiz'],
    title: 'Jealousy & Security Quiz â€“ Emotional Calm & Trust Health',
    metaDescription: 'Differentiate healthy boundaries from anxious insecurity. Learn constructive ways to communicate vulnerable feelings calmly.',
    h1: 'Jealousy & Security Quiz: Emotional Calm & Trust Evaluation'
  },
  'couple-stress-handling-quiz': {
    primaryKeyword: 'couples stress handling test',
    secondaryKeywords: ['how couples handle crisis', 'relationship resilience test', 'stress teamwork quiz'],
    title: 'Couple Stress-Handling Quiz â€“ Teamwork Under Pressure',
    metaDescription: 'See how you and your partner coordinate during life challenges, tight budgets, travel delays, and stressful days.',
    h1: 'Couple Stress-Handling Quiz: Resilience & Teamwork Under Pressure'
  },
  'parenting-vision-alignment': {
    primaryKeyword: 'parenting vision alignment quiz',
    secondaryKeywords: ['do we agree on kids quiz', 'parenting styles test couples', 'future children alignment'],
    title: 'Parenting Vision Alignment â€“ Discipline, Values & Family Plans',
    metaDescription: 'Discuss whether to have kids, discipline philosophies, screen time limits, and educational priorities with your partner.',
    h1: 'Parenting Vision Alignment: Family Plans & Discipline Philosophy'
  },
  'forgiveness-and-letting-go-test': {
    primaryKeyword: 'forgiveness in relationships quiz',
    secondaryKeywords: ['letting go of grudges couples', 'relationship repair quiz', 'grudge vs forgiveness test'],
    title: 'Forgiveness & Letting Go Test â€“ Repair & Grace in Love',
    metaDescription: 'Evaluate whether you hold grudges or extend genuine grace. Learn how to rebuild trust cleanly after misunderstandings.',
    h1: 'Forgiveness & Letting Go Test: Relationship Repair & Grace Quiz'
  },
  'couple-generosity-meter': {
    primaryKeyword: 'couple generosity test',
    secondaryKeywords: ['emotional generosity relationship', 'giving in love quiz', 'selflessness in couples'],
    title: 'Couple Generosity Meter â€“ Selfless Giving & Thoughtfulness',
    metaDescription: 'Measure mutual acts of kindness, giving without keeping score, and celebrating your partnerâ€™s happiness selflessly.',
    h1: 'Couple Generosity Meter: Selfless Giving & Daily Thoughtfulness'
  },
  'intimacy-depth-quiz': {
    primaryKeyword: 'intimacy depth quiz',
    secondaryKeywords: ['emotional intimacy test', 'vulnerability in relationships', 'deep connection quiz'],
    title: 'Intimacy Depth Quiz â€“ Emotional, Intellectual & Soul Vulnerability',
    metaDescription: 'Go beyond surface chats. Evaluate psychological safety, secret-sharing comfort, and deep soul vulnerability together.',
    h1: 'Intimacy Depth Quiz: Emotional & Soul Vulnerability Assessment'
  },
  'relationship-boredom-buster': {
    primaryKeyword: 'relationship boredom quiz',
    secondaryKeywords: ['spice up relationship test', 'break the routine couples', 'date night rut quiz'],
    title: 'Relationship Boredom Buster Quiz â€“ Break the Routine & Reignite Fun',
    metaDescription: 'Stuck in a Netflix couch loop? Diagnose your routine rut and unlock creative, unexpected micro-adventures for couples.',
    h1: 'Relationship Boredom Buster Quiz: Break the Routine & Add Novelty'
  },

  // Phase 4: Love Languages & Personality
  'love-language-test': {
    primaryKeyword: 'love language test',
    secondaryKeywords: ['5 love languages quiz', 'what is my love language', 'love languages free test'],
    title: 'Love Language Test â€“ Discover Your Primary & Secondary Style',
    metaDescription: 'Identify how you best give and receive love across Words of Affirmation, Quality Time, Gifts, Acts of Service, and Physical Touch.',
    h1: 'Love Language Test: Discover Your Giving & Receiving Styles'
  },
  'love-language-compatibility': {
    primaryKeyword: 'love language compatibility',
    secondaryKeywords: ['different love languages match', 'couples love language test', 'love language pairing'],
    title: 'Love Language Compatibility â€“ Bridge Different Love Styles',
    metaDescription: 'Compare your love language profile with your partnerâ€™s. Get actionable translation tips to make sure both of you feel deeply loved.',
    h1: 'Love Language Compatibility: Bridge & Harmonize Different Love Styles'
  },
  'apology-language-test': {
    primaryKeyword: 'apology language test',
    secondaryKeywords: ['5 apology languages quiz', 'how to apologize to partner', 'restitution and repentance test'],
    title: 'Apology Language Test â€“ Expressing Regret & Sincere Repair',
    metaDescription: 'Discover whether you need Expressing Regret, Accepting Responsibility, Making Restitution, Repenting, or Requesting Forgiveness.',
    h1: 'Apology Language Test: Expressing Regret & Rebuilding Trust'
  },
  'mbti-couple-personality-match': {
    primaryKeyword: 'mbti couple compatibility',
    secondaryKeywords: ['16 personalities relationship test', 'myers briggs couples match', 'mbti love compatibility'],
    title: 'MBTI Couple Personality Match â€“ 16 Personalities in Love',
    metaDescription: 'Explore cognitive function synergy between any two MBTI types. Understand communication habits, recharge needs, and blind spots.',
    h1: 'MBTI Couple Personality Match: 16 Personalities in Romance'
  },
  'enneagram-relationship-matrix': {
    primaryKeyword: 'enneagram relationship compatibility',
    secondaryKeywords: ['enneagram couples match', 'enneagram types in love', 'enneagram relationship guide'],
    title: 'Enneagram Relationship Matrix â€“ Personality Type Dynamics',
    metaDescription: 'Examine core fears, core desires, and stress triggers between any two Enneagram types. Grow together in deeper compassion.',
    h1: 'Enneagram Relationship Matrix: Type Pairings & Core Desires'
  },
  'introvert-love-language-guide': {
    primaryKeyword: 'introvert love language',
    secondaryKeywords: ['loving an introvert quiz', 'introvert dating guide', 'quiet quality time love'],
    title: 'Introvert Love Language Guide â€“ Quiet Connection & Space',
    metaDescription: 'Discover how introverts express deep love: low-stimulation parallel play, cozy quality time, and thoughtful written notes.',
    h1: 'Introvert Love Language Guide: Quiet Quality Time & Gentle Affection'
  },
  'extrovert-energy-love-guide': {
    primaryKeyword: 'extrovert love language',
    secondaryKeywords: ['loving an extrovert quiz', 'extrovert romance guide', 'social energy relationship'],
    title: 'Extrovert Energy Love Guide â€“ Shared Adventures & Social Joy',
    metaDescription: 'Learn how extroverts feel most appreciated: enthusiasm, outward celebration, lively dates, and group adventures.',
    h1: 'Extrovert Energy Love Guide: Shared Excitement & Social Connection'
  },
  'love-language-giving-vs-receiving': {
    primaryKeyword: 'giving vs receiving love language',
    secondaryKeywords: ['love language discrepancy', 'how i show love vs how i receive love', 'love style gap'],
    title: 'Giving vs Receiving Love Language Match â€“ Spot Your Love Gap',
    metaDescription: 'Do you express love through gifts but crave physical touch? Map out your giving vs receiving profiles to eliminate misunderstandings.',
    h1: 'Giving vs Receiving Love Language Match: Spot Your Love Gap'
  },
  'words-of-affirmation-generator': {
    primaryKeyword: 'words of affirmation generator',
    secondaryKeywords: ['love notes generator', 'compliments for partner', 'affirmation ideas for couples'],
    title: 'Words of Affirmation Builder â€“ Meaningful Praise & Love Notes',
    metaDescription: 'Generate heartfelt, specific praise, sweet text messages, and anniversary notes tailored to your partnerâ€™s unique qualities.',
    h1: 'Words of Affirmation Builder: Heartfelt Compliments & Sweet Notes'
  },
  'quality-time-date-planner': {
    primaryKeyword: 'quality time date planner',
    secondaryKeywords: ['undivided attention dates', 'quality time date ideas', 'distraction free couple dates'],
    title: 'Quality Time Date Planner â€“ Distraction-Free Couple Activities',
    metaDescription: 'Create intentional date nights focused on genuine presence, no-phone zones, eye contact, and deep shared presence.',
    h1: 'Quality Time Date Planner: Distraction-Free Couple Activities'
  },
  'acts-of-service-idea-vault': {
    primaryKeyword: 'acts of service ideas',
    secondaryKeywords: ['acts of service love language', 'how to show acts of service', 'thoughtful chores for partner'],
    title: 'Acts of Service Idea Vault â€“ Thoughtful Daily Help & Care',
    metaDescription: 'Unlock practical ideas to lighten your partnerâ€™s mental load: surprise coffee, car maintenance, warm towels, and chore relief.',
    h1: 'Acts of Service Idea Vault: Practical Care & Thoughtful Gestures'
  },
  'thoughtful-gifting-compass': {
    primaryKeyword: 'meaningful gifts for partner',
    secondaryKeywords: ['gift giving love language', 'thoughtful anniversary gifts', 'sentimental gift finder'],
    title: 'Thoughtful Gifting Compass â€“ Sentimental & Personal Gift Finder',
    metaDescription: 'Find sentimental, memory-grounded gift inspiration based on your partnerâ€™s passions and shared relationship milestones.',
    h1: 'Thoughtful Gifting Compass: Sentimental & Meaningful Gift Finder'
  },
  'physical-touch-comfort-guide': {
    primaryKeyword: 'physical touch love language',
    secondaryKeywords: ['loving touch guide couples', 'cuddling and closeness', 'affection comfort guide'],
    title: 'Physical Touch & Comfort Guide â€“ Warmth, Hugs & Closeness',
    metaDescription: 'Explore non-verbal reassurance: soothing back massages, morning forehead kisses, warm hugs, and hand-holding.',
    h1: 'Physical Touch & Comfort Guide: Warmth, Hugs & Gentle Closeness'
  },
  'love-archetype-test': {
    primaryKeyword: 'love archetype test',
    secondaryKeywords: ['relationship archetypes quiz', 'romantic personality type', 'what kind of lover are you'],
    title: 'Love Archetype Test â€“ The Romantic, Caregiver, Explorer & Anchor',
    metaDescription: 'Discover your foundational romantic archetype: The Caregiver, The Explorer, The Anchor, or The Romantic Dreamer.',
    h1: 'Love Archetype Test: Discover Your Romantic Persona & Core Drive'
  },
  'empathy-quotient-for-couples': {
    primaryKeyword: 'empathy test for couples',
    secondaryKeywords: ['emotional intelligence in relationships', 'active listening quiz', 'partner empathy test'],
    title: 'Empathy Quotient for Couples â€“ Emotional Attunement Test',
    metaDescription: 'Measure your ability to read subtle micro-expressions, validate your partnerâ€™s emotions, and listen without jumping into fix-it mode.',
    h1: 'Empathy Quotient for Couples: Emotional Attunement & Listening Test'
  },
  'romantic-spontaneity-index': {
    primaryKeyword: 'romantic spontaneity test',
    secondaryKeywords: ['spontaneous romance quiz', 'surprise date ideas', 'relationship freshness test'],
    title: 'Romantic Spontaneity Index â€“ Surprise Dates & Playful Energy',
    metaDescription: 'Evaluate how often you surprise your partner with impromptu flowers, secret weekend getaways, and sudden spontaneous dances.',
    h1: 'Romantic Spontaneity Index: Surprise Dates & Playful Energy Test'
  },
  'assertiveness-vs-accommodation-balance': {
    primaryKeyword: 'people pleasing in relationships quiz',
    secondaryKeywords: ['assertiveness in relationships', 'setting boundaries couples', 'healthy compromise quiz'],
    title: 'Assertiveness vs Accommodation Balance â€“ Voice Your Needs Clearly',
    metaDescription: 'Find balance between accommodating your partner and honoring your own needs without passive aggression or resentment.',
    h1: 'Assertiveness vs Accommodation Balance: Speak Up & Compromise Healthy'
  },
  'patience-and-temperament-test': {
    primaryKeyword: 'patience in relationships test',
    secondaryKeywords: ['relationship temperament quiz', 'irritation and patience couples', 'calm under pressure love'],
    title: 'Patience & Temperament Test â€“ Calm Reactions Under Stress',
    metaDescription: 'Measure patience during traffic jams, forgotten errands, and emotional storms. Build gentle tolerance in everyday moments.',
    h1: 'Patience & Temperament Test: Calm Reactions & Gentle Tolerance'
  },
  'optimism-vs-realism-couple-match': {
    primaryKeyword: 'optimist pessimist couple compatibility',
    secondaryKeywords: ['optimism vs realism quiz', 'rose colored glasses couples', 'practical dreamer relationship'],
    title: 'Optimism vs Realism Couple Match â€“ Dreamer & Anchor Synergy',
    metaDescription: 'Are you the big-sky visionary or the grounded risk-assessor? Learn how optimism and pragmatic realism create a balanced partnership.',
    h1: 'Optimism vs Realism Couple Match: Dreamer & Pragmatic Anchor Balance'
  },

  // Phase 5: Couple Games & Questions
  'would-you-rather-couples-edition': {
    primaryKeyword: 'would you rather couples questions',
    secondaryKeywords: ['would you rather for couples', 'fun couples questions', 'date night dilemma game'],
    title: 'Would You Rather? â€” Couples Edition Date Night Dilemmas',
    metaDescription: 'Play over 50 fun, cheeky, and thought-provoking couple dilemmas. Spark laughter and playful debates on your next date night.',
    h1: 'Would You Rather? Couples Edition Date Night Dilemmas Game'
  },
  'never-have-i-ever-couples-edition': {
    primaryKeyword: 'never have i ever couples questions',
    secondaryKeywords: ['never have i ever relationship edition', 'spicy never have i ever couples', 'couple party game'],
    title: 'Never Have I Ever â€” Couples Edition Revealing Confessions',
    metaDescription: 'Uncover secrets and funny confessions with couple-themed Never Have I Ever prompts. Perfect for game nights and cozy drinks.',
    h1: 'Never Have I Ever: Couples Edition Revealing Confessions Game'
  },
  'truth-or-dare-for-couples': {
    primaryKeyword: 'truth or dare couples',
    secondaryKeywords: ['couples truth or dare questions', 'romantic truth or dare', 'spicy couple game'],
    title: 'Truth or Dare â€” Couples Edition Romantic & Playful Game',
    metaDescription: 'Choose between vulnerable romantic truths and sweet, cheeky dares designed to break comfort zones and spark sparks.',
    h1: 'Truth or Dare: Couples Edition Romantic & Playful Party Game'
  },
  '36-questions-to-fall-in-love': {
    primaryKeyword: '36 questions to fall in love',
    secondaryKeywords: ['arthur aron 36 questions', 'fast friendship questions', 'psychology questions love'],
    title: '36 Questions to Fall in Love â€“ The Classic Closeness Experiment',
    metaDescription: 'Experience the famous 36 questions designed by psychologists to foster rapid intimacy and deep vulnerability between two people.',
    h1: '36 Questions to Fall in Love: Arthur Aron Closeness Experiment'
  },
  'date-night-roulette-spinner': {
    primaryKeyword: 'date night spinner',
    secondaryKeywords: ['date night roulette', 'random date idea generator', 'what to do for date night'],
    title: 'Date Night Roulette Spinner â€“ Random Creative Date Ideas',
    metaDescription: 'Canâ€™t decide what to do tonight? Spin the roulette wheel for cozy home dates, budget outings, foodie treats, or outdoor adventures.',
    h1: 'Date Night Roulette Spinner: Instant Creative Date Ideas'
  },
  'first-date-conversation-sparker': {
    primaryKeyword: 'first date conversation starters',
    secondaryKeywords: ['first date questions', 'icebreaker questions for dating', 'skip small talk questions'],
    title: 'First Date Conversation Sparker â€“ Natural Icebreakers & Stories',
    metaDescription: 'Skip boring interview small talk with engaging, organic conversation questions designed to bring out memorable personal stories.',
    h1: 'First Date Conversation Sparker: Engaging Icebreakers & Stories'
  },
  'deep-questions-for-late-nights': {
    primaryKeyword: 'deep late night questions couples',
    secondaryKeywords: ['pillow talk questions', 'existential couple questions', 'deep conversation starters lovers'],
    title: 'Deep Questions for Late Nights â€“ Intimate Pillow Talk Prompts',
    metaDescription: 'Curated deep questions for late-night drives, stargazing, and bedside pillow talk about dreams, fears, and life philosophy.',
    h1: 'Deep Questions for Late Nights: Intimate Pillow Talk Prompts'
  },
  'anniversary-reminiscence-game': {
    primaryKeyword: 'anniversary memory game couples',
    secondaryKeywords: ['anniversary reflection questions', 'walk down memory lane quiz', 'relationship nostalgia game'],
    title: 'Anniversary Reminiscence Game â€“ Relive Your Best Love Memories',
    metaDescription: 'Celebrate your relationship journey: first dates, unforgettable trips, inside jokes, and hurdles you overcame together as a team.',
    h1: 'Anniversary Reminiscence Game: Relive Your Love Story Memories'
  },
  'bucket-list-for-couples': {
    primaryKeyword: 'couple bucket list ideas',
    secondaryKeywords: ['relationship bucket list', 'romantic things to do together', 'couples adventure list'],
    title: 'Couple Bucket List Builder â€“ Dream Adventures & Shared Goals',
    metaDescription: 'Build, organize, and check off your shared couple bucket list: hot air balloon rides, cooking classes, road trips, and cozy milestones.',
    h1: 'Couple Bucket List Builder: Dream Adventures & Shared Milestones'
  },
  'road-trip-couples-trivia': {
    primaryKeyword: 'road trip questions for couples',
    secondaryKeywords: ['car ride games for couples', 'road trip conversation starters', 'couples travel trivia'],
    title: 'Road Trip Couples Trivia â€“ Car Ride Games & Quirky Questions',
    metaDescription: 'Keep long highway miles fun and lively with engaging questions about pop culture, fantasy superpowers, and hilarious debates.',
    h1: 'Road Trip Couples Trivia: Fun Car Games & Highway Debates'
  },
  'dinner-table-question-cards': {
    primaryKeyword: 'dinner table questions couples',
    secondaryKeywords: ['date night conversation cards', 'questions over dinner', 'table talk prompts relationship'],
    title: 'Dinner Table Question Cards â€“ Meaningful Date Night Prompts',
    metaDescription: 'Transform ordinary dinner into a rich, memorable evening with curated conversation cards spanning childhood, philosophy, and future dreams.',
    h1: 'Dinner Table Question Cards: Date Night Conversation Prompts'
  },
  'two-truths-and-a-lie-couples': {
    primaryKeyword: 'two truths and a lie couples game',
    secondaryKeywords: ['couples party games', 'guess the lie relationship', 'fun couple icebreaker'],
    title: 'Two Truths & A Lie â€” Couples Edition Guessing Game',
    metaDescription: 'Think you know everything about your partner? Test your radar with clever childhood, travel, and secret quirk prompts.',
    h1: 'Two Truths & A Lie: Couples Edition Secret Guessing Game'
  },
  'rapid-fire-this-or-that-couples': {
    primaryKeyword: 'this or that questions for couples',
    secondaryKeywords: ['couples rapid fire questions', 'this or that relationship game', 'quick couple choices'],
    title: 'Rapid-Fire This or That? â€” Couples Speed Decision Game',
    metaDescription: 'Beach or mountains? Morning snuggles or midnight snacks? Answer 30 rapid-fire questions and see where your instincts match.',
    h1: 'Rapid-Fire This or That? Couples Speed Decision Game'
  },
  'compliment-battle-game': {
    primaryKeyword: 'compliment game couples',
    secondaryKeywords: ['compliment battle', 'sweet compliments for boyfriend girlfriend', 'affirmation game couples'],
    title: 'Compliment Battle Game â€“ Uplifting Praise & Gratitude Duel',
    metaDescription: 'Take turns giving creative, hyper-specific compliments until one partner blushes or runs out of words. Sweet, wholesome couple game.',
    h1: 'Compliment Battle Game: Uplifting Praise & Affection Duel'
  },
  'fantasy-travel-itinerary-builder': {
    primaryKeyword: 'couples dream vacation planner',
    secondaryKeywords: ['fantasy travel itinerary', 'plan a trip with partner quiz', 'romantic getaway designer'],
    title: 'Fantasy Travel Itinerary Builder â€“ Plan Your Dream Romantic Getaway',
    metaDescription: 'Design your ultimate dream holiday together: pick exotic destinations, overwater villas, sunset dinners, and adventure excursions.',
    h1: 'Fantasy Travel Itinerary Builder: Plan Your Dream Vacation'
  },
  'kiss-and-cuddle-dare-cards': {
    primaryKeyword: 'cuddle dare cards couples',
    secondaryKeywords: ['romantic dares for couples', 'kiss challenge cards', 'cozy couple game'],
    title: 'Kiss & Cuddle Dare Cards â€“ Sweet Romance & Physical Affection',
    metaDescription: 'Draw sweet, gentle dares for 30-second hugs, forehead kisses, slow dances in the kitchen, and warm cuddles on the couch.',
    h1: 'Kiss & Cuddle Dare Cards: Sweet Romantic Challenges & Affection'
  },

  // Phase 6: Relationship Calculators
  'relationship-duration-calculator': {
    primaryKeyword: 'relationship duration calculator',
    secondaryKeywords: ['how long have we been together', 'time together calculator', 'relationship time tracker'],
    title: 'Relationship Duration Calculator â€“ Exact Years, Months & Days',
    metaDescription: 'Calculate the exact time you have been together down to years, months, days, hours, and minutes. Free milestone tracker.',
    h1: 'Relationship Duration Calculator: Exact Time Together Tracker'
  },
  'days-together-calculator': {
    primaryKeyword: 'days together calculator',
    secondaryKeywords: ['how many days have we been together', 'days dating counter', 'anniversary days count'],
    title: 'Days Together Calculator â€“ Total Days of Love Milestone Counter',
    metaDescription: 'Count the total number of consecutive calendar days since your first date or anniversary. Celebrate Day 100, 500, or 1,000.',
    h1: 'Days Together Calculator: Total Days of Love Milestone Counter'
  },
  'next-anniversary-countdown': {
    primaryKeyword: 'anniversary countdown calculator',
    secondaryKeywords: ['days until anniversary', 'next anniversary counter', 'when is our anniversary countdown'],
    title: 'Next Anniversary Countdown â€“ Days, Hours & Minutes Until Celebration',
    metaDescription: 'Track how many days, hours, and minutes remain until your next romantic anniversary with real-time countdown clocks and reminders.',
    h1: 'Next Anniversary Countdown: Days & Hours Until Your Special Day'
  },
  'traditional-anniversary-gift-finder': {
    primaryKeyword: 'anniversary gift by year calculator',
    secondaryKeywords: ['traditional anniversary gifts list', 'modern anniversary gift guide', 'wedding anniversary themes'],
    title: 'Traditional & Modern Anniversary Gift Finder â€“ Gifts by Year',
    metaDescription: 'Find official traditional and modern anniversary gift materials from Year 1 (Paper/Clock) to Year 50 (Gold) with creative ideas.',
    h1: 'Traditional & Modern Anniversary Gift Finder: Theme Guide by Year'
  },
  'hours-spent-together-calculator': {
    primaryKeyword: 'hours spent together calculator',
    secondaryKeywords: ['how many hours have we been together', 'total relationship hours', 'hours in love tracker'],
    title: 'Hours Spent Together Calculator â€“ Estimate Lifetime Shared Time',
    metaDescription: 'Estimate the total waking hours you and your partner have spent side-by-side eating, chatting, traveling, and living together.',
    h1: 'Hours Spent Together Calculator: Lifetime Shared Time Estimator'
  },
  'couples-age-gap-calculator': {
    primaryKeyword: 'couples age gap calculator',
    secondaryKeywords: ['age difference calculator couples', 'age gap in relationship test', 'half your age plus seven'],
    title: 'Couples Age Gap Calculator â€“ Exact Difference & Half-Your-Age Rule',
    metaDescription: 'Calculate the exact age difference between partners in years, months, and days. Includes cultural benchmarks and generational perspectives.',
    h1: 'Couples Age Gap Calculator: Exact Age Difference & Milestones'
  },
  'wedding-budget-estimator': {
    primaryKeyword: 'wedding budget estimator',
    secondaryKeywords: ['wedding cost calculator', 'wedding expense planner', 'venue catering budget estimator'],
    title: 'Wedding Budget Estimator â€“ Break Down Venue, Catering & Attire',
    metaDescription: 'Distribute your target wedding budget realistically across venue, photography, catering, attire, entertainment, and contingency reserves.',
    h1: 'Wedding Budget Estimator: Realistic Expense Breakdown Tool'
  },
  'wedding-guest-count-calculator': {
    primaryKeyword: 'wedding guest count calculator',
    secondaryKeywords: ['wedding seating estimator', 'guest list calculator', 'wedding rsvp estimator'],
    title: 'Wedding Guest Count & Seating Estimator â€“ Realistic RSVP Calculator',
    metaDescription: 'Predict actual wedding attendance using realistic acceptance rates for local vs out-of-town guests and estimate reception tables.',
    h1: 'Wedding Guest Count & Seating Estimator: Realistic RSVP Calculator'
  },
  'honeymoon-budget-and-savings-planner': {
    primaryKeyword: 'honeymoon savings planner',
    secondaryKeywords: ['honeymoon budget calculator', 'couples vacation savings tracker', 'travel budget couples'],
    title: 'Honeymoon Savings & Budget Planner â€“ Target Savings Schedule',
    metaDescription: 'Calculate exactly how much you and your partner need to save each month to fund flights, luxury resorts, and excursions for your honeymoon.',
    h1: 'Honeymoon Savings & Budget Planner: Monthly Savings Target Tool'
  },
  'date-night-annual-spend-calculator': {
    primaryKeyword: 'date night budget calculator',
    secondaryKeywords: ['annual date spend', 'how much couples spend on dates', 'dating cost estimator'],
    title: 'Date Night Annual Spend Calculator â€“ Romance & Budgeting Balance',
    metaDescription: 'Track how much you invest annually into dinners, movies, coffee dates, and staycations, and optimize romantic ROI.',
    h1: 'Date Night Annual Spend Calculator: Romance Investment Tracker'
  },
  'shared-chores-equity-calculator': {
    primaryKeyword: 'shared chores calculator couples',
    secondaryKeywords: ['fair play chore division', 'invisible labor calculator', 'domestic duties split couples'],
    title: 'Shared Chores & Invisible Labor Calculator â€“ Fair Household Split',
    metaDescription: 'Audit weekly cooking, cleaning, laundry, grocery planning, and mental load to ensure an equitable, resentment-free home partnership.',
    h1: 'Shared Chores & Invisible Labor Calculator: Fair Household Balance'
  },
  'heartbeats-shared-together-counter': {
    primaryKeyword: 'heartbeats together calculator',
    secondaryKeywords: ['how many heartbeats in love', 'poetic love calculator', 'heartbeats since anniversary'],
    title: 'Heartbeats Shared Together Counter â€“ Poetic Love Milestone',
    metaDescription: 'Calculate the estimated millions of human heartbeats you and your partner have shared since the magical day your love story began.',
    h1: 'Heartbeats Shared Together Counter: Poetic Lifetime Milestone'
  },
  'ldr-flight-distance-timezones-calculator': {
    primaryKeyword: 'ldr distance calculator',
    secondaryKeywords: ['long distance miles calculator', 'timezone overlap couples', 'ldr flight distance'],
    title: 'LDR Distance & Timezones Calculator â€“ Miles Apart & Best Call Windows',
    metaDescription: 'Enter two cities to calculate geographic flight miles, exact timezone offsets, and overlapping golden hours for long-distance video calls.',
    h1: 'LDR Distance & Timezones Calculator: Miles Apart & Call Windows'
  },
  'shared-sleep-hours-counter': {
    primaryKeyword: 'sleep hours together calculator',
    secondaryKeywords: ['shared sleep counter', 'how long we have slept together', 'hours cuddling in sleep'],
    title: 'Shared Sleep & Dreaming Hours Counter â€“ Nighttime Together',
    metaDescription: 'Calculate how many hours of peaceful sleep and shared dreams you and your partner have experienced side-by-side.',
    h1: 'Shared Sleep & Dreaming Hours Counter: Nighttime Bonding Milestone'
  },
  'sunrises-and-sunsets-shared-counter': {
    primaryKeyword: 'sunrises shared together calculator',
    secondaryKeywords: ['sunsets in love counter', 'golden hours together', 'poetic anniversary counter'],
    title: 'Sunrises & Sunsets Shared Counter â€“ Golden Hours of Love',
    metaDescription: 'Calculate the total number of sunrises and golden sunsets that have painted the sky since the day you became a couple.',
    h1: 'Sunrises & Sunsets Shared Counter: Golden Hours of Romance'
  },
  'shared-meals-eaten-calculator': {
    primaryKeyword: 'shared meals calculator couples',
    secondaryKeywords: ['dinners together counter', 'how many meals together', 'relationship meal counter'],
    title: 'Shared Meals & Dinners Calculator â€“ Breakfasts, Lunches & Dinners',
    metaDescription: 'Celebrate the thousands of delicious home-cooked dinners, morning coffees, and late-night snacks you have savored together.',
    h1: 'Shared Meals & Dinners Calculator: Shared Tables & Food Memories'
  },
  'milestone-1000-days-calculator': {
    primaryKeyword: '1000 days of love calculator',
    secondaryKeywords: ['day 1000 anniversary calculator', '1000 days together date', 'love milestone calculator'],
    title: '1,000 Days of Love Calculator â€“ Find Your 1,000-Day Anniversary Date',
    metaDescription: 'Discover the exact calendar date when your relationship hits Day 1,000, 2,000, 5,000, or 10,000. Plan an unforgettable celebration.',
    h1: '1,000 Days of Love Calculator: Find Your 1,000-Day Anniversary'
  },
  'golden-anniversary-timeline-projector': {
    primaryKeyword: '50 year anniversary calculator',
    secondaryKeywords: ['golden anniversary milestone projector', 'silver anniversary date', 'wedding jubilee calculator'],
    title: '50-Year Golden Timeline Projector â€“ Silver, Pearl & Gold Dates',
    metaDescription: 'Project the exact future calendar years and dates when you will celebrate your Tin (10 yr), Silver (25 yr), and Gold (50 yr) jubilees.',
    h1: '50-Year Golden Timeline Projector: Silver, Pearl & Gold Milestones'
  },
  'relationship-roi-and-growth-score': {
    primaryKeyword: 'relationship growth score',
    secondaryKeywords: ['relationship reflection tool', 'how much have we grown quiz', 'love gratitude badge'],
    title: 'Relationship Growth & Gratitude Score â€“ Celebrate Your Love Journey',
    metaDescription: 'Reflect on personal and couple growth, mutual resilience, and shared happiness. Generate your crowning Grand Relationship Growth Badge.',
    h1: 'Relationship Growth & Gratitude Score: Celebrate Your Shared Journey'
  }
};

// Validate that every tool in ALL_TOOLS has an entry
const allSlugs = ALL_TOOLS.map(t => t.slug);
const seoSlugs = Object.keys(rawSeoData);

console.log(`ALL_TOOLS count: ${allSlugs.length}`);
console.log(`rawSeoData count: ${seoSlugs.length}`);

const missingSlugs = allSlugs.filter(s => !rawSeoData[s]);
const extraSlugs = seoSlugs.filter(s => !allSlugs.includes(s));

if (missingSlugs.length > 0) {
  console.error('MISSING SLUGS:', missingSlugs);
  process.exit(1);
}

if (extraSlugs.length > 0) {
  console.error('EXTRA SLUGS:', extraSlugs);
  process.exit(1);
}

console.log('100/100 tool slugs verified! Building toolsSeoData.ts...');

const outputObj: Record<string, ToolSeoConfig> = {};

for (const tool of ALL_TOOLS) {
  const seo = rawSeoData[tool.slug];
  outputObj[tool.slug] = {
    slug: tool.slug,
    primaryKeyword: seo.primaryKeyword,
    secondaryKeywords: seo.secondaryKeywords,
    title: `${seo.title} | LoveScoreTest`,
    metaDescription: seo.metaDescription,
    h1: seo.h1,
    ogTitle: `${seo.title} | LoveScoreTest`,
    ogDescription: seo.metaDescription,
    twitterTitle: `${seo.title} | LoveScoreTest`,
    twitterDescription: seo.metaDescription,
    canonicalUrl: `https://lovescoretest.com/tool/${tool.slug}`
  };
}

const fileContent = `/**
 * LoveScoreTest.com - 100 Individual Tool Unique SEO Configurations
 *
 * Each tool entry contains:
 * - Unique, non-generic title and H1
 * - Highly targeted meta description matching actual tool features
 * - Primary search intent & secondary keywords
 * - Clean canonical URL (https://lovescoretest.com/tool/<slug>)
 * - Open Graph & Twitter Card metadata
 * - Accurate representation of tool mechanics (no false or invented claims)
 */

export interface ToolSeoConfig {
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  metaDescription: string;
  h1: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  canonicalUrl: string;
}

export const TOOLS_SEO_DATA: Record<string, ToolSeoConfig> = ${JSON.stringify(outputObj, null, 2)};

export function getToolSeoConfig(slug: string): ToolSeoConfig {
  if (TOOLS_SEO_DATA[slug]) {
    return TOOLS_SEO_DATA[slug];
  }
  // Safe fallback if ever queried with an unknown slug
  return {
    slug,
    primaryKeyword: slug.replace(/-/g, ' '),
    secondaryKeywords: [],
    title: \`\${slug.replace(/-/g, ' ')} â€“ Free Online Relationship Tool | LoveScoreTest\`,
    metaDescription: 'Free, private love, couple, and relationship test. Calculate scores, discover insights, and spark meaningful conversations.',
    h1: slug.replace(/-/g, ' '),
    ogTitle: \`\${slug.replace(/-/g, ' ')} | LoveScoreTest\`,
    ogDescription: 'Free, private love, couple, and relationship test on LoveScoreTest.com.',
    twitterTitle: \`\${slug.replace(/-/g, ' ')} | LoveScoreTest\`,
    twitterDescription: 'Free, private love, couple, and relationship test on LoveScoreTest.com.',
    canonicalUrl: \`https://lovescoretest.com/tool/\${slug}\`,
  };
}
`;

fs.writeFileSync(path.resolve(process.cwd(), 'src/data/toolsSeoData.ts'), fileContent, 'utf-8');
console.log('Successfully generated src/data/toolsSeoData.ts with 100 tools!');
