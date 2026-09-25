/**
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

export const TOOLS_SEO_DATA: Record<string, ToolSeoConfig> = {
  "love-calculator": {
    "slug": "love-calculator",
    "primaryKeyword": "love calculator",
    "secondaryKeywords": [
      "love percentage calculator",
      "name compatibility test",
      "crush calculator"
    ],
    "title": "Love Calculator â€“ Free Love Percentage & Name Match Test | LoveScoreTest",
    "metaDescription": "Calculate romantic synergy and character harmony between two names in seconds. Fun, free, private love score percentage test.",
    "h1": "Love Calculator: Free Love Percentage & Name Compatibility Test",
    "ogTitle": "Love Calculator â€“ Free Love Percentage & Name Match Test | LoveScoreTest",
    "ogDescription": "Calculate romantic synergy and character harmony between two names in seconds. Fun, free, private love score percentage test.",
    "twitterTitle": "Love Calculator â€“ Free Love Percentage & Name Match Test | LoveScoreTest",
    "twitterDescription": "Calculate romantic synergy and character harmony between two names in seconds. Fun, free, private love score percentage test.",
    "canonicalUrl": "https://lovescoretest.com/tool/love-calculator"
  },
  "love-compatibility-test": {
    "slug": "love-compatibility-test",
    "primaryKeyword": "love compatibility test",
    "secondaryKeywords": [
      "relationship compatibility quiz",
      "couple compatibility assessment",
      "core values match"
    ],
    "title": "Love Compatibility Test â€“ Multi-Factor Couple Assessment | LoveScoreTest",
    "metaDescription": "Comprehensive relationship assessment evaluating values, communication styles, emotional resonance, and shared future vision.",
    "h1": "Love Compatibility Test: Multi-Factor Relationship Assessment",
    "ogTitle": "Love Compatibility Test â€“ Multi-Factor Couple Assessment | LoveScoreTest",
    "ogDescription": "Comprehensive relationship assessment evaluating values, communication styles, emotional resonance, and shared future vision.",
    "twitterTitle": "Love Compatibility Test â€“ Multi-Factor Couple Assessment | LoveScoreTest",
    "twitterDescription": "Comprehensive relationship assessment evaluating values, communication styles, emotional resonance, and shared future vision.",
    "canonicalUrl": "https://lovescoretest.com/tool/love-compatibility-test"
  },
  "friendship-compatibility-test": {
    "slug": "friendship-compatibility-test",
    "primaryKeyword": "friendship compatibility test",
    "secondaryKeywords": [
      "best friend quiz",
      "bff compatibility",
      "friendship bond test"
    ],
    "title": "Friendship Compatibility Test â€“ Best Friend Chemistry & Bond | LoveScoreTest",
    "metaDescription": "Measure loyalty, humor, shared adventures, and emotional support to evaluate your platonic bond strength. Free BFF quiz.",
    "h1": "Friendship Compatibility Test: Best Friend Bond & Loyalty Quiz",
    "ogTitle": "Friendship Compatibility Test â€“ Best Friend Chemistry & Bond | LoveScoreTest",
    "ogDescription": "Measure loyalty, humor, shared adventures, and emotional support to evaluate your platonic bond strength. Free BFF quiz.",
    "twitterTitle": "Friendship Compatibility Test â€“ Best Friend Chemistry & Bond | LoveScoreTest",
    "twitterDescription": "Measure loyalty, humor, shared adventures, and emotional support to evaluate your platonic bond strength. Free BFF quiz.",
    "canonicalUrl": "https://lovescoretest.com/tool/friendship-compatibility-test"
  },
  "couple-compatibility-quiz": {
    "slug": "couple-compatibility-quiz",
    "primaryKeyword": "couple compatibility quiz",
    "secondaryKeywords": [
      "relationship strength quiz",
      "dating compatibility test",
      "marriage compatibility quiz"
    ],
    "title": "Couple Compatibility Quiz â€“ Deep Relationship Strength Test | LoveScoreTest",
    "metaDescription": "Comprehensive couple quiz evaluating emotional intimacy, conflict resolution, romance, and shared life goals. Free and private.",
    "h1": "Couple Compatibility Quiz: Comprehensive Relationship Strength Test",
    "ogTitle": "Couple Compatibility Quiz â€“ Deep Relationship Strength Test | LoveScoreTest",
    "ogDescription": "Comprehensive couple quiz evaluating emotional intimacy, conflict resolution, romance, and shared life goals. Free and private.",
    "twitterTitle": "Couple Compatibility Quiz â€“ Deep Relationship Strength Test | LoveScoreTest",
    "twitterDescription": "Comprehensive couple quiz evaluating emotional intimacy, conflict resolution, romance, and shared life goals. Free and private.",
    "canonicalUrl": "https://lovescoretest.com/tool/couple-compatibility-quiz"
  },
  "love-language-test": {
    "slug": "love-language-test",
    "primaryKeyword": "love language test",
    "secondaryKeywords": [
      "5 love languages quiz",
      "what is my love language",
      "love languages free test"
    ],
    "title": "Love Language Test â€“ Discover Your Primary & Secondary Style | LoveScoreTest",
    "metaDescription": "Identify how you best give and receive love across Words of Affirmation, Quality Time, Gifts, Acts of Service, and Physical Touch.",
    "h1": "Love Language Test: Discover Your Giving & Receiving Styles",
    "ogTitle": "Love Language Test â€“ Discover Your Primary & Secondary Style | LoveScoreTest",
    "ogDescription": "Identify how you best give and receive love across Words of Affirmation, Quality Time, Gifts, Acts of Service, and Physical Touch.",
    "twitterTitle": "Love Language Test â€“ Discover Your Primary & Secondary Style | LoveScoreTest",
    "twitterDescription": "Identify how you best give and receive love across Words of Affirmation, Quality Time, Gifts, Acts of Service, and Physical Touch.",
    "canonicalUrl": "https://lovescoretest.com/tool/love-language-test"
  },
  "love-language-compatibility": {
    "slug": "love-language-compatibility",
    "primaryKeyword": "love language compatibility",
    "secondaryKeywords": [
      "different love languages match",
      "couples love language test",
      "love language pairing"
    ],
    "title": "Love Language Compatibility â€“ Bridge Different Love Styles | LoveScoreTest",
    "metaDescription": "Compare your love language profile with your partnerâ€™s. Get actionable translation tips to make sure both of you feel deeply loved.",
    "h1": "Love Language Compatibility: Bridge & Harmonize Different Love Styles",
    "ogTitle": "Love Language Compatibility â€“ Bridge Different Love Styles | LoveScoreTest",
    "ogDescription": "Compare your love language profile with your partnerâ€™s. Get actionable translation tips to make sure both of you feel deeply loved.",
    "twitterTitle": "Love Language Compatibility â€“ Bridge Different Love Styles | LoveScoreTest",
    "twitterDescription": "Compare your love language profile with your partnerâ€™s. Get actionable translation tips to make sure both of you feel deeply loved.",
    "canonicalUrl": "https://lovescoretest.com/tool/love-language-compatibility"
  },
  "how-well-do-you-know-your-partner": {
    "slug": "how-well-do-you-know-your-partner",
    "primaryKeyword": "how well do you know your partner",
    "secondaryKeywords": [
      "partner quiz",
      "couples trivia test",
      "how well do you know me game"
    ],
    "title": "How Well Do You Know Your Partner? â€“ Couple Trivia Challenge | LoveScoreTest",
    "metaDescription": "Test how well you know your partnerâ€™s favorite meals, biggest pet peeves, hidden dreams, and childhood memories. Fun couple quiz.",
    "h1": "How Well Do You Know Your Partner? Couple Trivia Challenge",
    "ogTitle": "How Well Do You Know Your Partner? â€“ Couple Trivia Challenge | LoveScoreTest",
    "ogDescription": "Test how well you know your partnerâ€™s favorite meals, biggest pet peeves, hidden dreams, and childhood memories. Fun couple quiz.",
    "twitterTitle": "How Well Do You Know Your Partner? â€“ Couple Trivia Challenge | LoveScoreTest",
    "twitterDescription": "Test how well you know your partnerâ€™s favorite meals, biggest pet peeves, hidden dreams, and childhood memories. Fun couple quiz.",
    "canonicalUrl": "https://lovescoretest.com/tool/how-well-do-you-know-your-partner"
  },
  "who-is-more-likely-couples": {
    "slug": "who-is-more-likely-couples",
    "primaryKeyword": "who is more likely couples",
    "secondaryKeywords": [
      "most likely to couple edition",
      "who is more likely to questions",
      "couple tag game"
    ],
    "title": "Who Is More Likely? â€” Couples Edition Party Quiz | LoveScoreTest",
    "metaDescription": "Who falls asleep during movies? Who spends more on snacks? Play the ultimate couple tag game with hilarious, revealing prompts.",
    "h1": "Who Is More Likely? Couples Edition Fun Relationship Game",
    "ogTitle": "Who Is More Likely? â€” Couples Edition Party Quiz | LoveScoreTest",
    "ogDescription": "Who falls asleep during movies? Who spends more on snacks? Play the ultimate couple tag game with hilarious, revealing prompts.",
    "twitterTitle": "Who Is More Likely? â€” Couples Edition Party Quiz | LoveScoreTest",
    "twitterDescription": "Who falls asleep during movies? Who spends more on snacks? Play the ultimate couple tag game with hilarious, revealing prompts.",
    "canonicalUrl": "https://lovescoretest.com/tool/who-is-more-likely-couples"
  },
  "relationship-duration-calculator": {
    "slug": "relationship-duration-calculator",
    "primaryKeyword": "relationship duration calculator",
    "secondaryKeywords": [
      "how long have we been together",
      "time together calculator",
      "relationship time tracker"
    ],
    "title": "Relationship Duration Calculator â€“ Exact Years, Months & Days | LoveScoreTest",
    "metaDescription": "Calculate the exact time you have been together down to years, months, days, hours, and minutes. Free milestone tracker.",
    "h1": "Relationship Duration Calculator: Exact Time Together Tracker",
    "ogTitle": "Relationship Duration Calculator â€“ Exact Years, Months & Days | LoveScoreTest",
    "ogDescription": "Calculate the exact time you have been together down to years, months, days, hours, and minutes. Free milestone tracker.",
    "twitterTitle": "Relationship Duration Calculator â€“ Exact Years, Months & Days | LoveScoreTest",
    "twitterDescription": "Calculate the exact time you have been together down to years, months, days, hours, and minutes. Free milestone tracker.",
    "canonicalUrl": "https://lovescoretest.com/tool/relationship-duration-calculator"
  },
  "days-together-calculator": {
    "slug": "days-together-calculator",
    "primaryKeyword": "days together calculator",
    "secondaryKeywords": [
      "how many days have we been together",
      "days dating counter",
      "anniversary days count"
    ],
    "title": "Days Together Calculator â€“ Total Days of Love Milestone Counter | LoveScoreTest",
    "metaDescription": "Count the total number of consecutive calendar days since your first date or anniversary. Celebrate Day 100, 500, or 1,000.",
    "h1": "Days Together Calculator: Total Days of Love Milestone Counter",
    "ogTitle": "Days Together Calculator â€“ Total Days of Love Milestone Counter | LoveScoreTest",
    "ogDescription": "Count the total number of consecutive calendar days since your first date or anniversary. Celebrate Day 100, 500, or 1,000.",
    "twitterTitle": "Days Together Calculator â€“ Total Days of Love Milestone Counter | LoveScoreTest",
    "twitterDescription": "Count the total number of consecutive calendar days since your first date or anniversary. Celebrate Day 100, 500, or 1,000.",
    "canonicalUrl": "https://lovescoretest.com/tool/days-together-calculator"
  },
  "crush-compatibility-meter": {
    "slug": "crush-compatibility-meter",
    "primaryKeyword": "crush compatibility test",
    "secondaryKeywords": [
      "crush meter",
      "does my crush like me quiz",
      "crush vibe check"
    ],
    "title": "Crush Compatibility Meter â€“ Test Your Chemistry & Connection | LoveScoreTest",
    "metaDescription": "Evaluate mutual body language, shared laughter, and conversation cues to gauge your crush chemistry score. Free and 100% private.",
    "h1": "Crush Compatibility Meter: Chemistry & Vibe Check",
    "ogTitle": "Crush Compatibility Meter â€“ Test Your Chemistry & Connection | LoveScoreTest",
    "ogDescription": "Evaluate mutual body language, shared laughter, and conversation cues to gauge your crush chemistry score. Free and 100% private.",
    "twitterTitle": "Crush Compatibility Meter â€“ Test Your Chemistry & Connection | LoveScoreTest",
    "twitterDescription": "Evaluate mutual body language, shared laughter, and conversation cues to gauge your crush chemistry score. Free and 100% private.",
    "canonicalUrl": "https://lovescoretest.com/tool/crush-compatibility-meter"
  },
  "flames-love-game": {
    "slug": "flames-love-game",
    "primaryKeyword": "flames game",
    "secondaryKeywords": [
      "flames calculator",
      "flames love test",
      "flames name game"
    ],
    "title": "FLAMES Love Calculator â€“ Classic Friends, Lovers, Affection Game | LoveScoreTest",
    "metaDescription": "Play the nostalgic FLAMES game online. Enter two names to calculate Friends, Lovers, Affection, Marriage, Enmity, or Siblings.",
    "h1": "FLAMES Love Calculator: Friends, Lovers, Affection, Marriage Game",
    "ogTitle": "FLAMES Love Calculator â€“ Classic Friends, Lovers, Affection Game | LoveScoreTest",
    "ogDescription": "Play the nostalgic FLAMES game online. Enter two names to calculate Friends, Lovers, Affection, Marriage, Enmity, or Siblings.",
    "twitterTitle": "FLAMES Love Calculator â€“ Classic Friends, Lovers, Affection Game | LoveScoreTest",
    "twitterDescription": "Play the nostalgic FLAMES game online. Enter two names to calculate Friends, Lovers, Affection, Marriage, Enmity, or Siblings.",
    "canonicalUrl": "https://lovescoretest.com/tool/flames-love-game"
  },
  "zodiac-love-calculator": {
    "slug": "zodiac-love-calculator",
    "primaryKeyword": "zodiac love calculator",
    "secondaryKeywords": [
      "astrology compatibility",
      "star sign match",
      "horoscope love test"
    ],
    "title": "Zodiac Love Calculator â€“ Astrological Sign Compatibility | LoveScoreTest",
    "metaDescription": "Compare Western zodiac elements and planetary modalities for any two star signs. Explore astrological harmony for couples and crushes.",
    "h1": "Zodiac Love Calculator: Astrological Sign Compatibility",
    "ogTitle": "Zodiac Love Calculator â€“ Astrological Sign Compatibility | LoveScoreTest",
    "ogDescription": "Compare Western zodiac elements and planetary modalities for any two star signs. Explore astrological harmony for couples and crushes.",
    "twitterTitle": "Zodiac Love Calculator â€“ Astrological Sign Compatibility | LoveScoreTest",
    "twitterDescription": "Compare Western zodiac elements and planetary modalities for any two star signs. Explore astrological harmony for couples and crushes.",
    "canonicalUrl": "https://lovescoretest.com/tool/zodiac-love-calculator"
  },
  "birthday-love-calculator": {
    "slug": "birthday-love-calculator",
    "primaryKeyword": "birthday love calculator",
    "secondaryKeywords": [
      "numerology love test",
      "birthdate compatibility",
      "life path love match"
    ],
    "title": "Birthday Love Calculator â€“ Birthdate & Numerology Compatibility | LoveScoreTest",
    "metaDescription": "Calculate birthdate numerology, life path alignment, and calendar chemistry between two birthdays. Free online compatibility tool.",
    "h1": "Birthday Love Calculator: Birthdate & Life Path Compatibility",
    "ogTitle": "Birthday Love Calculator â€“ Birthdate & Numerology Compatibility | LoveScoreTest",
    "ogDescription": "Calculate birthdate numerology, life path alignment, and calendar chemistry between two birthdays. Free online compatibility tool.",
    "twitterTitle": "Birthday Love Calculator â€“ Birthdate & Numerology Compatibility | LoveScoreTest",
    "twitterDescription": "Calculate birthdate numerology, life path alignment, and calendar chemistry between two birthdays. Free online compatibility tool.",
    "canonicalUrl": "https://lovescoretest.com/tool/birthday-love-calculator"
  },
  "initials-love-matcher": {
    "slug": "initials-love-matcher",
    "primaryKeyword": "initials love test",
    "secondaryKeywords": [
      "initials compatibility",
      "monogram match",
      "alphabet love calculator"
    ],
    "title": "Initials Love Matcher â€“ Quick Monogram Romance Match | LoveScoreTest",
    "metaDescription": "Test monogram synergy and alphabet harmony with two initials. A delightful, quick love game for crushes and couples.",
    "h1": "Initials Love Matcher: Monogram & Alphabet Compatibility",
    "ogTitle": "Initials Love Matcher â€“ Quick Monogram Romance Match | LoveScoreTest",
    "ogDescription": "Test monogram synergy and alphabet harmony with two initials. A delightful, quick love game for crushes and couples.",
    "twitterTitle": "Initials Love Matcher â€“ Quick Monogram Romance Match | LoveScoreTest",
    "twitterDescription": "Test monogram synergy and alphabet harmony with two initials. A delightful, quick love game for crushes and couples.",
    "canonicalUrl": "https://lovescoretest.com/tool/initials-love-matcher"
  },
  "true-love-potential-score": {
    "slug": "true-love-potential-score",
    "primaryKeyword": "true love test",
    "secondaryKeywords": [
      "long term love potential",
      "relationship sustainability quiz",
      "genuine love test"
    ],
    "title": "True Love Potential Score â€“ Deep Long-Term Relationship Quiz | LoveScoreTest",
    "metaDescription": "Evaluate genuine emotional depth, unselfish care, and shared vulnerability to assess your relationship potential. Free and private.",
    "h1": "True Love Potential Score: Emotional Depth & Sustainability Quiz",
    "ogTitle": "True Love Potential Score â€“ Deep Long-Term Relationship Quiz | LoveScoreTest",
    "ogDescription": "Evaluate genuine emotional depth, unselfish care, and shared vulnerability to assess your relationship potential. Free and private.",
    "twitterTitle": "True Love Potential Score â€“ Deep Long-Term Relationship Quiz | LoveScoreTest",
    "twitterDescription": "Evaluate genuine emotional depth, unselfish care, and shared vulnerability to assess your relationship potential. Free and private.",
    "canonicalUrl": "https://lovescoretest.com/tool/true-love-potential-score"
  },
  "emotional-compatibility-test": {
    "slug": "emotional-compatibility-test",
    "primaryKeyword": "emotional compatibility test",
    "secondaryKeywords": [
      "emotional connection quiz",
      "empathy match",
      "vulnerability in relationships"
    ],
    "title": "Emotional Compatibility Test â€“ Couple Empathy & Connection | LoveScoreTest",
    "metaDescription": "Discover how well you and your partner harmonize during emotional highs and lows. Assess mutual validation, soothing, and empathy.",
    "h1": "Emotional Compatibility Test: Empathy & Connection Assessment",
    "ogTitle": "Emotional Compatibility Test â€“ Couple Empathy & Connection | LoveScoreTest",
    "ogDescription": "Discover how well you and your partner harmonize during emotional highs and lows. Assess mutual validation, soothing, and empathy.",
    "twitterTitle": "Emotional Compatibility Test â€“ Couple Empathy & Connection | LoveScoreTest",
    "twitterDescription": "Discover how well you and your partner harmonize during emotional highs and lows. Assess mutual validation, soothing, and empathy.",
    "canonicalUrl": "https://lovescoretest.com/tool/emotional-compatibility-test"
  },
  "communication-style-match": {
    "slug": "communication-style-match",
    "primaryKeyword": "communication style quiz couples",
    "secondaryKeywords": [
      "relationship communication test",
      "how couples communicate",
      "conversation styles"
    ],
    "title": "Communication Style Match â€“ Couple Conversation Compatibility | LoveScoreTest",
    "metaDescription": "Identify whether you are direct, diplomatic, analytical, or expressive communicators. Learn how your styles complement each other.",
    "h1": "Communication Style Match: Relationship Conversation Compatibility",
    "ogTitle": "Communication Style Match â€“ Couple Conversation Compatibility | LoveScoreTest",
    "ogDescription": "Identify whether you are direct, diplomatic, analytical, or expressive communicators. Learn how your styles complement each other.",
    "twitterTitle": "Communication Style Match â€“ Couple Conversation Compatibility | LoveScoreTest",
    "twitterDescription": "Identify whether you are direct, diplomatic, analytical, or expressive communicators. Learn how your styles complement each other.",
    "canonicalUrl": "https://lovescoretest.com/tool/communication-style-match"
  },
  "lifestyle-habits-compatibility": {
    "slug": "lifestyle-habits-compatibility",
    "primaryKeyword": "lifestyle compatibility test",
    "secondaryKeywords": [
      "living habits quiz",
      "couple daily routine match",
      "sleep and social habits"
    ],
    "title": "Lifestyle & Habits Compatibility â€“ Daily Routines & Rhythm | LoveScoreTest",
    "metaDescription": "Check compatibility across sleep schedules, social energy, cleanliness, and weekend rhythms before or during cohabitation.",
    "h1": "Lifestyle & Habits Compatibility: Daily Routines & Rhythm Test",
    "ogTitle": "Lifestyle & Habits Compatibility â€“ Daily Routines & Rhythm | LoveScoreTest",
    "ogDescription": "Check compatibility across sleep schedules, social energy, cleanliness, and weekend rhythms before or during cohabitation.",
    "twitterTitle": "Lifestyle & Habits Compatibility â€“ Daily Routines & Rhythm | LoveScoreTest",
    "twitterDescription": "Check compatibility across sleep schedules, social energy, cleanliness, and weekend rhythms before or during cohabitation.",
    "canonicalUrl": "https://lovescoretest.com/tool/lifestyle-habits-compatibility"
  },
  "financial-harmony-quiz": {
    "slug": "financial-harmony-quiz",
    "primaryKeyword": "financial compatibility couples",
    "secondaryKeywords": [
      "money habits quiz couples",
      "spending vs saving couples",
      "financial harmony test"
    ],
    "title": "Financial Harmony Quiz â€“ Money Habits & Spending Styles | LoveScoreTest",
    "metaDescription": "Assess budgeting approaches, savings mindset, splurge triggers, and long-term financial transparency with your partner.",
    "h1": "Financial Harmony Quiz: Money Habits & Financial Alignment",
    "ogTitle": "Financial Harmony Quiz â€“ Money Habits & Spending Styles | LoveScoreTest",
    "ogDescription": "Assess budgeting approaches, savings mindset, splurge triggers, and long-term financial transparency with your partner.",
    "twitterTitle": "Financial Harmony Quiz â€“ Money Habits & Spending Styles | LoveScoreTest",
    "twitterDescription": "Assess budgeting approaches, savings mindset, splurge triggers, and long-term financial transparency with your partner.",
    "canonicalUrl": "https://lovescoretest.com/tool/financial-harmony-quiz"
  },
  "future-goals-vision-match": {
    "slug": "future-goals-vision-match",
    "primaryKeyword": "relationship future goals quiz",
    "secondaryKeywords": [
      "shared vision test",
      "marriage and family alignment",
      "career and location goals"
    ],
    "title": "Future Goals & Vision Match â€“ 5-Year Relationship Alignment | LoveScoreTest",
    "metaDescription": "Align on city vs suburbs, career mobility, family planning, and lifelong dreams with this structured couple alignment tool.",
    "h1": "Future Goals & Vision Match: Couple Long-Term Alignment Quiz",
    "ogTitle": "Future Goals & Vision Match â€“ 5-Year Relationship Alignment | LoveScoreTest",
    "ogDescription": "Align on city vs suburbs, career mobility, family planning, and lifelong dreams with this structured couple alignment tool.",
    "twitterTitle": "Future Goals & Vision Match â€“ 5-Year Relationship Alignment | LoveScoreTest",
    "twitterDescription": "Align on city vs suburbs, career mobility, family planning, and lifelong dreams with this structured couple alignment tool.",
    "canonicalUrl": "https://lovescoretest.com/tool/future-goals-vision-match"
  },
  "introvert-extrovert-couple-match": {
    "slug": "introvert-extrovert-couple-match",
    "primaryKeyword": "introvert extrovert relationship",
    "secondaryKeywords": [
      "introvert extrovert couple quiz",
      "social battery compatibility",
      "opposites attract love"
    ],
    "title": "Introvert-Extrovert Couple Match â€“ Social Battery Harmony | LoveScoreTest",
    "metaDescription": "Learn how introvert and extrovert dynamics balance each other. Optimize quiet downtime and lively social outings as a team.",
    "h1": "Introvert-Extrovert Couple Match: Social Energy Compatibility",
    "ogTitle": "Introvert-Extrovert Couple Match â€“ Social Battery Harmony | LoveScoreTest",
    "ogDescription": "Learn how introvert and extrovert dynamics balance each other. Optimize quiet downtime and lively social outings as a team.",
    "twitterTitle": "Introvert-Extrovert Couple Match â€“ Social Battery Harmony | LoveScoreTest",
    "twitterDescription": "Learn how introvert and extrovert dynamics balance each other. Optimize quiet downtime and lively social outings as a team.",
    "canonicalUrl": "https://lovescoretest.com/tool/introvert-extrovert-couple-match"
  },
  "humor-and-banter-compatibility": {
    "slug": "humor-and-banter-compatibility",
    "primaryKeyword": "sense of humor compatibility",
    "secondaryKeywords": [
      "couples humor test",
      "banter compatibility",
      "shared laughter quiz"
    ],
    "title": "Humor & Banter Compatibility â€“ Shared Laughter & Wit Test | LoveScoreTest",
    "metaDescription": "Are you sarcasm soulmates, goofy puns lovers, or dry wit enthusiasts? Discover how your comedic styles connect.",
    "h1": "Humor & Banter Compatibility: Shared Laughter & Wit Quiz",
    "ogTitle": "Humor & Banter Compatibility â€“ Shared Laughter & Wit Test | LoveScoreTest",
    "ogDescription": "Are you sarcasm soulmates, goofy puns lovers, or dry wit enthusiasts? Discover how your comedic styles connect.",
    "twitterTitle": "Humor & Banter Compatibility â€“ Shared Laughter & Wit Test | LoveScoreTest",
    "twitterDescription": "Are you sarcasm soulmates, goofy puns lovers, or dry wit enthusiasts? Discover how your comedic styles connect.",
    "canonicalUrl": "https://lovescoretest.com/tool/humor-and-banter-compatibility"
  },
  "conflict-resolution-style-test": {
    "slug": "conflict-resolution-style-test",
    "primaryKeyword": "conflict resolution quiz couples",
    "secondaryKeywords": [
      "how couples fight quiz",
      "healthy arguing test",
      "repair attempts quiz"
    ],
    "title": "Conflict Resolution Style Test â€“ De-escalation & Fair Fighting | LoveScoreTest",
    "metaDescription": "Assess your fighting and resolution patterns: calm collaboration, cooling off, or emotional intensity. Learn better repair strategies.",
    "h1": "Conflict Resolution Style Test: Fair Fighting & De-escalation Quiz",
    "ogTitle": "Conflict Resolution Style Test â€“ De-escalation & Fair Fighting | LoveScoreTest",
    "ogDescription": "Assess your fighting and resolution patterns: calm collaboration, cooling off, or emotional intensity. Learn better repair strategies.",
    "twitterTitle": "Conflict Resolution Style Test â€“ De-escalation & Fair Fighting | LoveScoreTest",
    "twitterDescription": "Assess your fighting and resolution patterns: calm collaboration, cooling off, or emotional intensity. Learn better repair strategies.",
    "canonicalUrl": "https://lovescoretest.com/tool/conflict-resolution-style-test"
  },
  "attachment-style-compatibility": {
    "slug": "attachment-style-compatibility",
    "primaryKeyword": "attachment style compatibility",
    "secondaryKeywords": [
      "secure anxious avoidant quiz",
      "couples attachment test",
      "relationship attachment patterns"
    ],
    "title": "Attachment Style Compatibility â€“ Secure, Anxious & Avoidant Dynamics | LoveScoreTest",
    "metaDescription": "Explore how secure, anxious, and avoidant attachment tendencies interact in romantic partnerships, and foster mutual emotional security.",
    "h1": "Attachment Style Compatibility: Relationship Attachment Dynamics",
    "ogTitle": "Attachment Style Compatibility â€“ Secure, Anxious & Avoidant Dynamics | LoveScoreTest",
    "ogDescription": "Explore how secure, anxious, and avoidant attachment tendencies interact in romantic partnerships, and foster mutual emotional security.",
    "twitterTitle": "Attachment Style Compatibility â€“ Secure, Anxious & Avoidant Dynamics | LoveScoreTest",
    "twitterDescription": "Explore how secure, anxious, and avoidant attachment tendencies interact in romantic partnerships, and foster mutual emotional security.",
    "canonicalUrl": "https://lovescoretest.com/tool/attachment-style-compatibility"
  },
  "intellectual-compatibility-test": {
    "slug": "intellectual-compatibility-test",
    "primaryKeyword": "intellectual compatibility test",
    "secondaryKeywords": [
      "mental connection quiz",
      "intellectual chemistry couples",
      "curiosity match"
    ],
    "title": "Intellectual Compatibility Test â€“ Mental Chemistry & Curiosity | LoveScoreTest",
    "metaDescription": "Measure deep conversation compatibility, shared curiosity, debate enjoyment, and intellectual chemistry between partners.",
    "h1": "Intellectual Compatibility Test: Mental Chemistry & Curiosity Quiz",
    "ogTitle": "Intellectual Compatibility Test â€“ Mental Chemistry & Curiosity | LoveScoreTest",
    "ogDescription": "Measure deep conversation compatibility, shared curiosity, debate enjoyment, and intellectual chemistry between partners.",
    "twitterTitle": "Intellectual Compatibility Test â€“ Mental Chemistry & Curiosity | LoveScoreTest",
    "twitterDescription": "Measure deep conversation compatibility, shared curiosity, debate enjoyment, and intellectual chemistry between partners.",
    "canonicalUrl": "https://lovescoretest.com/tool/intellectual-compatibility-test"
  },
  "adventure-vs-comfort-meter": {
    "slug": "adventure-vs-comfort-meter",
    "primaryKeyword": "adventure compatibility couples",
    "secondaryKeywords": [
      "travel style quiz couples",
      "thrill seeker vs homebody",
      "vacation compatibility"
    ],
    "title": "Adventure vs Comfort Meter â€“ Travel & Thrill Compatibility | LoveScoreTest",
    "metaDescription": "Are you backpacking thrill-seekers or cozy resort relaxers? Balance wanderlust and cozy homebody comfort in your relationship.",
    "h1": "Adventure vs Comfort Meter: Travel Style & Thrill Compatibility",
    "ogTitle": "Adventure vs Comfort Meter â€“ Travel & Thrill Compatibility | LoveScoreTest",
    "ogDescription": "Are you backpacking thrill-seekers or cozy resort relaxers? Balance wanderlust and cozy homebody comfort in your relationship.",
    "twitterTitle": "Adventure vs Comfort Meter â€“ Travel & Thrill Compatibility | LoveScoreTest",
    "twitterDescription": "Are you backpacking thrill-seekers or cozy resort relaxers? Balance wanderlust and cozy homebody comfort in your relationship.",
    "canonicalUrl": "https://lovescoretest.com/tool/adventure-vs-comfort-meter"
  },
  "family-values-compatibility": {
    "slug": "family-values-compatibility",
    "primaryKeyword": "family values compatibility",
    "secondaryKeywords": [
      "in-laws relationship quiz",
      "holiday traditions couples",
      "family boundaries test"
    ],
    "title": "Family Values Compatibility â€“ In-Laws, Holidays & Boundaries | LoveScoreTest",
    "metaDescription": "Evaluate traditions, in-law involvement, holiday expectations, and family boundaries for healthy partnership harmony.",
    "h1": "Family Values Compatibility: In-Laws, Traditions & Boundaries",
    "ogTitle": "Family Values Compatibility â€“ In-Laws, Holidays & Boundaries | LoveScoreTest",
    "ogDescription": "Evaluate traditions, in-law involvement, holiday expectations, and family boundaries for healthy partnership harmony.",
    "twitterTitle": "Family Values Compatibility â€“ In-Laws, Holidays & Boundaries | LoveScoreTest",
    "twitterDescription": "Evaluate traditions, in-law involvement, holiday expectations, and family boundaries for healthy partnership harmony.",
    "canonicalUrl": "https://lovescoretest.com/tool/family-values-compatibility"
  },
  "physical-affection-frequency-match": {
    "slug": "physical-affection-frequency-match",
    "primaryKeyword": "affection compatibility couples",
    "secondaryKeywords": [
      "physical touch match",
      "cuddle frequency quiz",
      "relationship affection test"
    ],
    "title": "Physical Affection Frequency Match â€“ Hugs, Cuddles & Warmth | LoveScoreTest",
    "metaDescription": "Check alignment on hand-holding, cuddles, daily hugs, and romantic touch frequency to keep both partners feeling cherished.",
    "h1": "Physical Affection Frequency Match: Daily Touch & Warmth Compatibility",
    "ogTitle": "Physical Affection Frequency Match â€“ Hugs, Cuddles & Warmth | LoveScoreTest",
    "ogDescription": "Check alignment on hand-holding, cuddles, daily hugs, and romantic touch frequency to keep both partners feeling cherished.",
    "twitterTitle": "Physical Affection Frequency Match â€“ Hugs, Cuddles & Warmth | LoveScoreTest",
    "twitterDescription": "Check alignment on hand-holding, cuddles, daily hugs, and romantic touch frequency to keep both partners feeling cherished.",
    "canonicalUrl": "https://lovescoretest.com/tool/physical-affection-frequency-match"
  },
  "spontaneity-vs-planning-match": {
    "slug": "spontaneity-vs-planning-match",
    "primaryKeyword": "planner vs spontaneous couples",
    "secondaryKeywords": [
      "spontaneity quiz",
      "calendar planning relationship",
      "weekend routine compatibility"
    ],
    "title": "Spontaneity vs Planning Match â€“ Schedule & Routine Harmony | LoveScoreTest",
    "metaDescription": "Do you need color-coded itineraries or last-minute road trips? Find the perfect sweet spot between structure and spontaneous joy.",
    "h1": "Spontaneity vs Planning Match: Schedule & Adventure Harmony",
    "ogTitle": "Spontaneity vs Planning Match â€“ Schedule & Routine Harmony | LoveScoreTest",
    "ogDescription": "Do you need color-coded itineraries or last-minute road trips? Find the perfect sweet spot between structure and spontaneous joy.",
    "twitterTitle": "Spontaneity vs Planning Match â€“ Schedule & Routine Harmony | LoveScoreTest",
    "twitterDescription": "Do you need color-coded itineraries or last-minute road trips? Find the perfect sweet spot between structure and spontaneous joy.",
    "canonicalUrl": "https://lovescoretest.com/tool/spontaneity-vs-planning-match"
  },
  "career-ambition-synergy": {
    "slug": "career-ambition-synergy",
    "primaryKeyword": "career ambition couples compatibility",
    "secondaryKeywords": [
      "power couple test",
      "work life balance relationship",
      "dual career compatibility"
    ],
    "title": "Career & Ambition Synergy â€“ Dual-Career & Goal Support | LoveScoreTest",
    "metaDescription": "Evaluate how you celebrate each otherâ€™s professional wins, navigate demanding work hours, and prevent burnout together.",
    "h1": "Career & Ambition Synergy: Dual-Career Support & Balance",
    "ogTitle": "Career & Ambition Synergy â€“ Dual-Career & Goal Support | LoveScoreTest",
    "ogDescription": "Evaluate how you celebrate each otherâ€™s professional wins, navigate demanding work hours, and prevent burnout together.",
    "twitterTitle": "Career & Ambition Synergy â€“ Dual-Career & Goal Support | LoveScoreTest",
    "twitterDescription": "Evaluate how you celebrate each otherâ€™s professional wins, navigate demanding work hours, and prevent burnout together.",
    "canonicalUrl": "https://lovescoretest.com/tool/career-ambition-synergy"
  },
  "spiritual-and-philosophical-match": {
    "slug": "spiritual-and-philosophical-match",
    "primaryKeyword": "spiritual compatibility couples",
    "secondaryKeywords": [
      "philosophical match quiz",
      "worldview compatibility",
      "ethics and beliefs relationship"
    ],
    "title": "Spiritual & Philosophical Match â€“ Worldview & Ethics Harmony | LoveScoreTest",
    "metaDescription": "Explore worldview alignment, personal faith or secular ethics, moral principles, and meaning-making in your relationship.",
    "h1": "Spiritual & Philosophical Match: Worldview & Moral Ethics Test",
    "ogTitle": "Spiritual & Philosophical Match â€“ Worldview & Ethics Harmony | LoveScoreTest",
    "ogDescription": "Explore worldview alignment, personal faith or secular ethics, moral principles, and meaning-making in your relationship.",
    "twitterTitle": "Spiritual & Philosophical Match â€“ Worldview & Ethics Harmony | LoveScoreTest",
    "twitterDescription": "Explore worldview alignment, personal faith or secular ethics, moral principles, and meaning-making in your relationship.",
    "canonicalUrl": "https://lovescoretest.com/tool/spiritual-and-philosophical-match"
  },
  "roommate-compatibility-test": {
    "slug": "roommate-compatibility-test",
    "primaryKeyword": "roommate compatibility test",
    "secondaryKeywords": [
      "moving in together quiz",
      "cohabitation test",
      "chore division compatibility"
    ],
    "title": "Roommate & Co-Living Test â€“ Moving In Together Readiness | LoveScoreTest",
    "metaDescription": "Moving in together? Test cohabitation harmony: dishes in the sink, quiet hours, fridge etiquette, and chore division.",
    "h1": "Roommate & Co-Living Test: Cohabitation Readiness & Habit Match",
    "ogTitle": "Roommate & Co-Living Test â€“ Moving In Together Readiness | LoveScoreTest",
    "ogDescription": "Moving in together? Test cohabitation harmony: dishes in the sink, quiet hours, fridge etiquette, and chore division.",
    "twitterTitle": "Roommate & Co-Living Test â€“ Moving In Together Readiness | LoveScoreTest",
    "twitterDescription": "Moving in together? Test cohabitation harmony: dishes in the sink, quiet hours, fridge etiquette, and chore division.",
    "canonicalUrl": "https://lovescoretest.com/tool/roommate-compatibility-test"
  },
  "relationship-health-checkup": {
    "slug": "relationship-health-checkup",
    "primaryKeyword": "relationship health checkup",
    "secondaryKeywords": [
      "relationship wellness test",
      "couple check in quiz",
      "is my relationship healthy"
    ],
    "title": "Relationship Health Checkup â€“ 10-Pillar Relationship Wellness | LoveScoreTest",
    "metaDescription": "Take a comprehensive, proactive pulse check on your partnership across communication, trust, intimacy, safety, and mutual support.",
    "h1": "Relationship Health Checkup: 10-Pillar Partnership Wellness Test",
    "ogTitle": "Relationship Health Checkup â€“ 10-Pillar Relationship Wellness | LoveScoreTest",
    "ogDescription": "Take a comprehensive, proactive pulse check on your partnership across communication, trust, intimacy, safety, and mutual support.",
    "twitterTitle": "Relationship Health Checkup â€“ 10-Pillar Relationship Wellness | LoveScoreTest",
    "twitterDescription": "Take a comprehensive, proactive pulse check on your partnership across communication, trust, intimacy, safety, and mutual support.",
    "canonicalUrl": "https://lovescoretest.com/tool/relationship-health-checkup"
  },
  "green-flags-vs-red-flags-quiz": {
    "slug": "green-flags-vs-red-flags-quiz",
    "primaryKeyword": "green flags red flags relationship quiz",
    "secondaryKeywords": [
      "dating green flags test",
      "red flag detector quiz",
      "healthy relationship signs"
    ],
    "title": "Green Flags vs Red Flags Quiz â€“ Healthy Dating Evaluator | LoveScoreTest",
    "metaDescription": "Identify healthy positive behaviors and spot warning signs early. Evaluate consistency, respect, accountability, and boundaries.",
    "h1": "Green Flags vs Red Flags Quiz: Healthy Dating Evaluation",
    "ogTitle": "Green Flags vs Red Flags Quiz â€“ Healthy Dating Evaluator | LoveScoreTest",
    "ogDescription": "Identify healthy positive behaviors and spot warning signs early. Evaluate consistency, respect, accountability, and boundaries.",
    "twitterTitle": "Green Flags vs Red Flags Quiz â€“ Healthy Dating Evaluator | LoveScoreTest",
    "twitterDescription": "Identify healthy positive behaviors and spot warning signs early. Evaluate consistency, respect, accountability, and boundaries.",
    "canonicalUrl": "https://lovescoretest.com/tool/green-flags-vs-red-flags-quiz"
  },
  "dating-stage-milestone-quiz": {
    "slug": "dating-stage-milestone-quiz",
    "primaryKeyword": "dating stage milestone quiz",
    "secondaryKeywords": [
      "what stage is our relationship",
      "relationship milestones test",
      "are we exclusive quiz"
    ],
    "title": "Dating Stage & Milestone Quiz â€“ Where Does Your Relationship Stand? | LoveScoreTest",
    "metaDescription": "From talking stage to exclusive commitment and cohabitation: identify your current relationship phase and healthy next steps.",
    "h1": "Dating Stage & Milestone Quiz: Identify Your Relationship Phase",
    "ogTitle": "Dating Stage & Milestone Quiz â€“ Where Does Your Relationship Stand? | LoveScoreTest",
    "ogDescription": "From talking stage to exclusive commitment and cohabitation: identify your current relationship phase and healthy next steps.",
    "twitterTitle": "Dating Stage & Milestone Quiz â€“ Where Does Your Relationship Stand? | LoveScoreTest",
    "twitterDescription": "From talking stage to exclusive commitment and cohabitation: identify your current relationship phase and healthy next steps.",
    "canonicalUrl": "https://lovescoretest.com/tool/dating-stage-milestone-quiz"
  },
  "spark-and-romance-meter": {
    "slug": "spark-and-romance-meter",
    "primaryKeyword": "spark and romance meter",
    "secondaryKeywords": [
      "keep the spark alive quiz",
      "romance level test",
      "chemistry meter couples"
    ],
    "title": "Spark & Romance Meter â€“ Passion & Novelty Check for Couples | LoveScoreTest",
    "metaDescription": "Gauge date-night frequency, flirtatious energy, novelty, and butterflies. Discover fresh ways to reignite romantic excitement.",
    "h1": "Spark & Romance Meter: Passion & Romantic Chemistry Check",
    "ogTitle": "Spark & Romance Meter â€“ Passion & Novelty Check for Couples | LoveScoreTest",
    "ogDescription": "Gauge date-night frequency, flirtatious energy, novelty, and butterflies. Discover fresh ways to reignite romantic excitement.",
    "twitterTitle": "Spark & Romance Meter â€“ Passion & Novelty Check for Couples | LoveScoreTest",
    "twitterDescription": "Gauge date-night frequency, flirtatious energy, novelty, and butterflies. Discover fresh ways to reignite romantic excitement.",
    "canonicalUrl": "https://lovescoretest.com/tool/spark-and-romance-meter"
  },
  "couple-trust-score-test": {
    "slug": "couple-trust-score-test",
    "primaryKeyword": "couple trust score test",
    "secondaryKeywords": [
      "trust in relationship quiz",
      "reliability and honesty test",
      "emotional safety couples"
    ],
    "title": "Couple Trust Score Test â€“ Reliability, Honesty & Safety | LoveScoreTest",
    "metaDescription": "Evaluate mutual reliability, honest disclosure, emotional safety, and confidence in your partner with this private trust test.",
    "h1": "Couple Trust Score Test: Reliability & Emotional Safety Quiz",
    "ogTitle": "Couple Trust Score Test â€“ Reliability, Honesty & Safety | LoveScoreTest",
    "ogDescription": "Evaluate mutual reliability, honest disclosure, emotional safety, and confidence in your partner with this private trust test.",
    "twitterTitle": "Couple Trust Score Test â€“ Reliability, Honesty & Safety | LoveScoreTest",
    "twitterDescription": "Evaluate mutual reliability, honest disclosure, emotional safety, and confidence in your partner with this private trust test.",
    "canonicalUrl": "https://lovescoretest.com/tool/couple-trust-score-test"
  },
  "appreciation-gratitude-quiz": {
    "slug": "appreciation-gratitude-quiz",
    "primaryKeyword": "couples gratitude quiz",
    "secondaryKeywords": [
      "appreciation test relationship",
      "do we appreciate each other",
      "relationship thankfulness"
    ],
    "title": "Appreciation & Gratitude Quiz â€“ Couple Affirmation Meter | LoveScoreTest",
    "metaDescription": "Measure how frequently you notice, acknowledge, and express genuine appreciation for the daily gifts your partner brings into your life.",
    "h1": "Appreciation & Gratitude Quiz: Couple Affirmation & Thankfulness",
    "ogTitle": "Appreciation & Gratitude Quiz â€“ Couple Affirmation Meter | LoveScoreTest",
    "ogDescription": "Measure how frequently you notice, acknowledge, and express genuine appreciation for the daily gifts your partner brings into your life.",
    "twitterTitle": "Appreciation & Gratitude Quiz â€“ Couple Affirmation Meter | LoveScoreTest",
    "twitterDescription": "Measure how frequently you notice, acknowledge, and express genuine appreciation for the daily gifts your partner brings into your life.",
    "canonicalUrl": "https://lovescoretest.com/tool/appreciation-gratitude-quiz"
  },
  "dating-readiness-quiz": {
    "slug": "dating-readiness-quiz",
    "primaryKeyword": "am i ready to date quiz",
    "secondaryKeywords": [
      "dating readiness test",
      "ready for a relationship quiz",
      "healing before dating"
    ],
    "title": "Dating Readiness Quiz â€“ Are You Ready for a New Relationship? | LoveScoreTest",
    "metaDescription": "Check emotional closure, personal self-worth, boundary clarity, and bandwidth before jumping back into the modern dating pool.",
    "h1": "Dating Readiness Quiz: Emotional Availability & Dating Health",
    "ogTitle": "Dating Readiness Quiz â€“ Are You Ready for a New Relationship? | LoveScoreTest",
    "ogDescription": "Check emotional closure, personal self-worth, boundary clarity, and bandwidth before jumping back into the modern dating pool.",
    "twitterTitle": "Dating Readiness Quiz â€“ Are You Ready for a New Relationship? | LoveScoreTest",
    "twitterDescription": "Check emotional closure, personal self-worth, boundary clarity, and bandwidth before jumping back into the modern dating pool.",
    "canonicalUrl": "https://lovescoretest.com/tool/dating-readiness-quiz"
  },
  "long-distance-relationship-strength": {
    "slug": "long-distance-relationship-strength",
    "primaryKeyword": "long distance relationship test",
    "secondaryKeywords": [
      "ldr strength quiz",
      "will our long distance relationship last",
      "ldr couples test"
    ],
    "title": "Long Distance Relationship (LDR) Strength â€“ Connection & Trust | LoveScoreTest",
    "metaDescription": "Assess timezone management, virtual intimacy, trust, and shared end-date timelines for long-distance dating couples.",
    "h1": "Long Distance Relationship (LDR) Strength: Connection & Trust Quiz",
    "ogTitle": "Long Distance Relationship (LDR) Strength â€“ Connection & Trust | LoveScoreTest",
    "ogDescription": "Assess timezone management, virtual intimacy, trust, and shared end-date timelines for long-distance dating couples.",
    "twitterTitle": "Long Distance Relationship (LDR) Strength â€“ Connection & Trust | LoveScoreTest",
    "twitterDescription": "Assess timezone management, virtual intimacy, trust, and shared end-date timelines for long-distance dating couples.",
    "canonicalUrl": "https://lovescoretest.com/tool/long-distance-relationship-strength"
  },
  "are-you-soulmates-quiz": {
    "slug": "are-you-soulmates-quiz",
    "primaryKeyword": "are we soulmates quiz",
    "secondaryKeywords": [
      "soulmate test",
      "twin flame quiz",
      "destined for each other quiz"
    ],
    "title": "Are You Soulmates Quiz â€“ Deep Connection & Synchronicities | LoveScoreTest",
    "metaDescription": "Explore effortless understanding, telepathic jokes, emotional safety, and cosmic harmony in this fun romantic soulmate quiz.",
    "h1": "Are You Soulmates Quiz: Deep Connection & Chemistry Test",
    "ogTitle": "Are You Soulmates Quiz â€“ Deep Connection & Synchronicities | LoveScoreTest",
    "ogDescription": "Explore effortless understanding, telepathic jokes, emotional safety, and cosmic harmony in this fun romantic soulmate quiz.",
    "twitterTitle": "Are You Soulmates Quiz â€“ Deep Connection & Synchronicities | LoveScoreTest",
    "twitterDescription": "Explore effortless understanding, telepathic jokes, emotional safety, and cosmic harmony in this fun romantic soulmate quiz.",
    "canonicalUrl": "https://lovescoretest.com/tool/are-you-soulmates-quiz"
  },
  "marriage-readiness-assessment": {
    "slug": "marriage-readiness-assessment",
    "primaryKeyword": "marriage readiness quiz",
    "secondaryKeywords": [
      "are we ready for marriage test",
      "premarital questions quiz",
      "engagement readiness"
    ],
    "title": "Marriage Readiness Assessment â€“ Premarital Checklist & Alignment | LoveScoreTest",
    "metaDescription": "Evaluate financial openness, family planning, lifelong commitment, and crisis navigation before taking the walk down the aisle.",
    "h1": "Marriage Readiness Assessment: Premarital Alignment & Checklist",
    "ogTitle": "Marriage Readiness Assessment â€“ Premarital Checklist & Alignment | LoveScoreTest",
    "ogDescription": "Evaluate financial openness, family planning, lifelong commitment, and crisis navigation before taking the walk down the aisle.",
    "twitterTitle": "Marriage Readiness Assessment â€“ Premarital Checklist & Alignment | LoveScoreTest",
    "twitterDescription": "Evaluate financial openness, family planning, lifelong commitment, and crisis navigation before taking the walk down the aisle.",
    "canonicalUrl": "https://lovescoretest.com/tool/marriage-readiness-assessment"
  },
  "jealousy-and-security-quiz": {
    "slug": "jealousy-and-security-quiz",
    "primaryKeyword": "relationship jealousy quiz",
    "secondaryKeywords": [
      "am i too jealous quiz",
      "relationship security test",
      "trust vs insecurity quiz"
    ],
    "title": "Jealousy & Security Quiz â€“ Emotional Calm & Trust Health | LoveScoreTest",
    "metaDescription": "Differentiate healthy boundaries from anxious insecurity. Learn constructive ways to communicate vulnerable feelings calmly.",
    "h1": "Jealousy & Security Quiz: Emotional Calm & Trust Evaluation",
    "ogTitle": "Jealousy & Security Quiz â€“ Emotional Calm & Trust Health | LoveScoreTest",
    "ogDescription": "Differentiate healthy boundaries from anxious insecurity. Learn constructive ways to communicate vulnerable feelings calmly.",
    "twitterTitle": "Jealousy & Security Quiz â€“ Emotional Calm & Trust Health | LoveScoreTest",
    "twitterDescription": "Differentiate healthy boundaries from anxious insecurity. Learn constructive ways to communicate vulnerable feelings calmly.",
    "canonicalUrl": "https://lovescoretest.com/tool/jealousy-and-security-quiz"
  },
  "couple-stress-handling-quiz": {
    "slug": "couple-stress-handling-quiz",
    "primaryKeyword": "couples stress handling test",
    "secondaryKeywords": [
      "how couples handle crisis",
      "relationship resilience test",
      "stress teamwork quiz"
    ],
    "title": "Couple Stress-Handling Quiz â€“ Teamwork Under Pressure | LoveScoreTest",
    "metaDescription": "See how you and your partner coordinate during life challenges, tight budgets, travel delays, and stressful days.",
    "h1": "Couple Stress-Handling Quiz: Resilience & Teamwork Under Pressure",
    "ogTitle": "Couple Stress-Handling Quiz â€“ Teamwork Under Pressure | LoveScoreTest",
    "ogDescription": "See how you and your partner coordinate during life challenges, tight budgets, travel delays, and stressful days.",
    "twitterTitle": "Couple Stress-Handling Quiz â€“ Teamwork Under Pressure | LoveScoreTest",
    "twitterDescription": "See how you and your partner coordinate during life challenges, tight budgets, travel delays, and stressful days.",
    "canonicalUrl": "https://lovescoretest.com/tool/couple-stress-handling-quiz"
  },
  "parenting-vision-alignment": {
    "slug": "parenting-vision-alignment",
    "primaryKeyword": "parenting vision alignment quiz",
    "secondaryKeywords": [
      "do we agree on kids quiz",
      "parenting styles test couples",
      "future children alignment"
    ],
    "title": "Parenting Vision Alignment â€“ Discipline, Values & Family Plans | LoveScoreTest",
    "metaDescription": "Discuss whether to have kids, discipline philosophies, screen time limits, and educational priorities with your partner.",
    "h1": "Parenting Vision Alignment: Family Plans & Discipline Philosophy",
    "ogTitle": "Parenting Vision Alignment â€“ Discipline, Values & Family Plans | LoveScoreTest",
    "ogDescription": "Discuss whether to have kids, discipline philosophies, screen time limits, and educational priorities with your partner.",
    "twitterTitle": "Parenting Vision Alignment â€“ Discipline, Values & Family Plans | LoveScoreTest",
    "twitterDescription": "Discuss whether to have kids, discipline philosophies, screen time limits, and educational priorities with your partner.",
    "canonicalUrl": "https://lovescoretest.com/tool/parenting-vision-alignment"
  },
  "forgiveness-and-letting-go-test": {
    "slug": "forgiveness-and-letting-go-test",
    "primaryKeyword": "forgiveness in relationships quiz",
    "secondaryKeywords": [
      "letting go of grudges couples",
      "relationship repair quiz",
      "grudge vs forgiveness test"
    ],
    "title": "Forgiveness & Letting Go Test â€“ Repair & Grace in Love | LoveScoreTest",
    "metaDescription": "Evaluate whether you hold grudges or extend genuine grace. Learn how to rebuild trust cleanly after misunderstandings.",
    "h1": "Forgiveness & Letting Go Test: Relationship Repair & Grace Quiz",
    "ogTitle": "Forgiveness & Letting Go Test â€“ Repair & Grace in Love | LoveScoreTest",
    "ogDescription": "Evaluate whether you hold grudges or extend genuine grace. Learn how to rebuild trust cleanly after misunderstandings.",
    "twitterTitle": "Forgiveness & Letting Go Test â€“ Repair & Grace in Love | LoveScoreTest",
    "twitterDescription": "Evaluate whether you hold grudges or extend genuine grace. Learn how to rebuild trust cleanly after misunderstandings.",
    "canonicalUrl": "https://lovescoretest.com/tool/forgiveness-and-letting-go-test"
  },
  "couple-generosity-meter": {
    "slug": "couple-generosity-meter",
    "primaryKeyword": "couple generosity test",
    "secondaryKeywords": [
      "emotional generosity relationship",
      "giving in love quiz",
      "selflessness in couples"
    ],
    "title": "Couple Generosity Meter â€“ Selfless Giving & Thoughtfulness | LoveScoreTest",
    "metaDescription": "Measure mutual acts of kindness, giving without keeping score, and celebrating your partnerâ€™s happiness selflessly.",
    "h1": "Couple Generosity Meter: Selfless Giving & Daily Thoughtfulness",
    "ogTitle": "Couple Generosity Meter â€“ Selfless Giving & Thoughtfulness | LoveScoreTest",
    "ogDescription": "Measure mutual acts of kindness, giving without keeping score, and celebrating your partnerâ€™s happiness selflessly.",
    "twitterTitle": "Couple Generosity Meter â€“ Selfless Giving & Thoughtfulness | LoveScoreTest",
    "twitterDescription": "Measure mutual acts of kindness, giving without keeping score, and celebrating your partnerâ€™s happiness selflessly.",
    "canonicalUrl": "https://lovescoretest.com/tool/couple-generosity-meter"
  },
  "intimacy-depth-quiz": {
    "slug": "intimacy-depth-quiz",
    "primaryKeyword": "intimacy depth quiz",
    "secondaryKeywords": [
      "emotional intimacy test",
      "vulnerability in relationships",
      "deep connection quiz"
    ],
    "title": "Intimacy Depth Quiz â€“ Emotional, Intellectual & Soul Vulnerability | LoveScoreTest",
    "metaDescription": "Go beyond surface chats. Evaluate psychological safety, secret-sharing comfort, and deep soul vulnerability together.",
    "h1": "Intimacy Depth Quiz: Emotional & Soul Vulnerability Assessment",
    "ogTitle": "Intimacy Depth Quiz â€“ Emotional, Intellectual & Soul Vulnerability | LoveScoreTest",
    "ogDescription": "Go beyond surface chats. Evaluate psychological safety, secret-sharing comfort, and deep soul vulnerability together.",
    "twitterTitle": "Intimacy Depth Quiz â€“ Emotional, Intellectual & Soul Vulnerability | LoveScoreTest",
    "twitterDescription": "Go beyond surface chats. Evaluate psychological safety, secret-sharing comfort, and deep soul vulnerability together.",
    "canonicalUrl": "https://lovescoretest.com/tool/intimacy-depth-quiz"
  },
  "relationship-boredom-buster": {
    "slug": "relationship-boredom-buster",
    "primaryKeyword": "relationship boredom quiz",
    "secondaryKeywords": [
      "spice up relationship test",
      "break the routine couples",
      "date night rut quiz"
    ],
    "title": "Relationship Boredom Buster Quiz â€“ Break the Routine & Reignite Fun | LoveScoreTest",
    "metaDescription": "Stuck in a Netflix couch loop? Diagnose your routine rut and unlock creative, unexpected micro-adventures for couples.",
    "h1": "Relationship Boredom Buster Quiz: Break the Routine & Add Novelty",
    "ogTitle": "Relationship Boredom Buster Quiz â€“ Break the Routine & Reignite Fun | LoveScoreTest",
    "ogDescription": "Stuck in a Netflix couch loop? Diagnose your routine rut and unlock creative, unexpected micro-adventures for couples.",
    "twitterTitle": "Relationship Boredom Buster Quiz â€“ Break the Routine & Reignite Fun | LoveScoreTest",
    "twitterDescription": "Stuck in a Netflix couch loop? Diagnose your routine rut and unlock creative, unexpected micro-adventures for couples.",
    "canonicalUrl": "https://lovescoretest.com/tool/relationship-boredom-buster"
  },
  "apology-language-test": {
    "slug": "apology-language-test",
    "primaryKeyword": "apology language test",
    "secondaryKeywords": [
      "5 apology languages quiz",
      "how to apologize to partner",
      "restitution and repentance test"
    ],
    "title": "Apology Language Test â€“ Expressing Regret & Sincere Repair | LoveScoreTest",
    "metaDescription": "Discover whether you need Expressing Regret, Accepting Responsibility, Making Restitution, Repenting, or Requesting Forgiveness.",
    "h1": "Apology Language Test: Expressing Regret & Rebuilding Trust",
    "ogTitle": "Apology Language Test â€“ Expressing Regret & Sincere Repair | LoveScoreTest",
    "ogDescription": "Discover whether you need Expressing Regret, Accepting Responsibility, Making Restitution, Repenting, or Requesting Forgiveness.",
    "twitterTitle": "Apology Language Test â€“ Expressing Regret & Sincere Repair | LoveScoreTest",
    "twitterDescription": "Discover whether you need Expressing Regret, Accepting Responsibility, Making Restitution, Repenting, or Requesting Forgiveness.",
    "canonicalUrl": "https://lovescoretest.com/tool/apology-language-test"
  },
  "mbti-couple-personality-match": {
    "slug": "mbti-couple-personality-match",
    "primaryKeyword": "mbti couple compatibility",
    "secondaryKeywords": [
      "16 personalities relationship test",
      "myers briggs couples match",
      "mbti love compatibility"
    ],
    "title": "MBTI Couple Personality Match â€“ 16 Personalities in Love | LoveScoreTest",
    "metaDescription": "Explore cognitive function synergy between any two MBTI types. Understand communication habits, recharge needs, and blind spots.",
    "h1": "MBTI Couple Personality Match: 16 Personalities in Romance",
    "ogTitle": "MBTI Couple Personality Match â€“ 16 Personalities in Love | LoveScoreTest",
    "ogDescription": "Explore cognitive function synergy between any two MBTI types. Understand communication habits, recharge needs, and blind spots.",
    "twitterTitle": "MBTI Couple Personality Match â€“ 16 Personalities in Love | LoveScoreTest",
    "twitterDescription": "Explore cognitive function synergy between any two MBTI types. Understand communication habits, recharge needs, and blind spots.",
    "canonicalUrl": "https://lovescoretest.com/tool/mbti-couple-personality-match"
  },
  "enneagram-relationship-matrix": {
    "slug": "enneagram-relationship-matrix",
    "primaryKeyword": "enneagram relationship compatibility",
    "secondaryKeywords": [
      "enneagram couples match",
      "enneagram types in love",
      "enneagram relationship guide"
    ],
    "title": "Enneagram Relationship Matrix â€“ Personality Type Dynamics | LoveScoreTest",
    "metaDescription": "Examine core fears, core desires, and stress triggers between any two Enneagram types. Grow together in deeper compassion.",
    "h1": "Enneagram Relationship Matrix: Type Pairings & Core Desires",
    "ogTitle": "Enneagram Relationship Matrix â€“ Personality Type Dynamics | LoveScoreTest",
    "ogDescription": "Examine core fears, core desires, and stress triggers between any two Enneagram types. Grow together in deeper compassion.",
    "twitterTitle": "Enneagram Relationship Matrix â€“ Personality Type Dynamics | LoveScoreTest",
    "twitterDescription": "Examine core fears, core desires, and stress triggers between any two Enneagram types. Grow together in deeper compassion.",
    "canonicalUrl": "https://lovescoretest.com/tool/enneagram-relationship-matrix"
  },
  "introvert-love-language-guide": {
    "slug": "introvert-love-language-guide",
    "primaryKeyword": "introvert love language",
    "secondaryKeywords": [
      "loving an introvert quiz",
      "introvert dating guide",
      "quiet quality time love"
    ],
    "title": "Introvert Love Language Guide â€“ Quiet Connection & Space | LoveScoreTest",
    "metaDescription": "Discover how introverts express deep love: low-stimulation parallel play, cozy quality time, and thoughtful written notes.",
    "h1": "Introvert Love Language Guide: Quiet Quality Time & Gentle Affection",
    "ogTitle": "Introvert Love Language Guide â€“ Quiet Connection & Space | LoveScoreTest",
    "ogDescription": "Discover how introverts express deep love: low-stimulation parallel play, cozy quality time, and thoughtful written notes.",
    "twitterTitle": "Introvert Love Language Guide â€“ Quiet Connection & Space | LoveScoreTest",
    "twitterDescription": "Discover how introverts express deep love: low-stimulation parallel play, cozy quality time, and thoughtful written notes.",
    "canonicalUrl": "https://lovescoretest.com/tool/introvert-love-language-guide"
  },
  "extrovert-energy-love-guide": {
    "slug": "extrovert-energy-love-guide",
    "primaryKeyword": "extrovert love language",
    "secondaryKeywords": [
      "loving an extrovert quiz",
      "extrovert romance guide",
      "social energy relationship"
    ],
    "title": "Extrovert Energy Love Guide â€“ Shared Adventures & Social Joy | LoveScoreTest",
    "metaDescription": "Learn how extroverts feel most appreciated: enthusiasm, outward celebration, lively dates, and group adventures.",
    "h1": "Extrovert Energy Love Guide: Shared Excitement & Social Connection",
    "ogTitle": "Extrovert Energy Love Guide â€“ Shared Adventures & Social Joy | LoveScoreTest",
    "ogDescription": "Learn how extroverts feel most appreciated: enthusiasm, outward celebration, lively dates, and group adventures.",
    "twitterTitle": "Extrovert Energy Love Guide â€“ Shared Adventures & Social Joy | LoveScoreTest",
    "twitterDescription": "Learn how extroverts feel most appreciated: enthusiasm, outward celebration, lively dates, and group adventures.",
    "canonicalUrl": "https://lovescoretest.com/tool/extrovert-energy-love-guide"
  },
  "love-language-giving-vs-receiving": {
    "slug": "love-language-giving-vs-receiving",
    "primaryKeyword": "giving vs receiving love language",
    "secondaryKeywords": [
      "love language discrepancy",
      "how i show love vs how i receive love",
      "love style gap"
    ],
    "title": "Giving vs Receiving Love Language Match â€“ Spot Your Love Gap | LoveScoreTest",
    "metaDescription": "Do you express love through gifts but crave physical touch? Map out your giving vs receiving profiles to eliminate misunderstandings.",
    "h1": "Giving vs Receiving Love Language Match: Spot Your Love Gap",
    "ogTitle": "Giving vs Receiving Love Language Match â€“ Spot Your Love Gap | LoveScoreTest",
    "ogDescription": "Do you express love through gifts but crave physical touch? Map out your giving vs receiving profiles to eliminate misunderstandings.",
    "twitterTitle": "Giving vs Receiving Love Language Match â€“ Spot Your Love Gap | LoveScoreTest",
    "twitterDescription": "Do you express love through gifts but crave physical touch? Map out your giving vs receiving profiles to eliminate misunderstandings.",
    "canonicalUrl": "https://lovescoretest.com/tool/love-language-giving-vs-receiving"
  },
  "words-of-affirmation-generator": {
    "slug": "words-of-affirmation-generator",
    "primaryKeyword": "words of affirmation generator",
    "secondaryKeywords": [
      "love notes generator",
      "compliments for partner",
      "affirmation ideas for couples"
    ],
    "title": "Words of Affirmation Builder â€“ Meaningful Praise & Love Notes | LoveScoreTest",
    "metaDescription": "Generate heartfelt, specific praise, sweet text messages, and anniversary notes tailored to your partnerâ€™s unique qualities.",
    "h1": "Words of Affirmation Builder: Heartfelt Compliments & Sweet Notes",
    "ogTitle": "Words of Affirmation Builder â€“ Meaningful Praise & Love Notes | LoveScoreTest",
    "ogDescription": "Generate heartfelt, specific praise, sweet text messages, and anniversary notes tailored to your partnerâ€™s unique qualities.",
    "twitterTitle": "Words of Affirmation Builder â€“ Meaningful Praise & Love Notes | LoveScoreTest",
    "twitterDescription": "Generate heartfelt, specific praise, sweet text messages, and anniversary notes tailored to your partnerâ€™s unique qualities.",
    "canonicalUrl": "https://lovescoretest.com/tool/words-of-affirmation-generator"
  },
  "quality-time-date-planner": {
    "slug": "quality-time-date-planner",
    "primaryKeyword": "quality time date planner",
    "secondaryKeywords": [
      "undivided attention dates",
      "quality time date ideas",
      "distraction free couple dates"
    ],
    "title": "Quality Time Date Planner â€“ Distraction-Free Couple Activities | LoveScoreTest",
    "metaDescription": "Create intentional date nights focused on genuine presence, no-phone zones, eye contact, and deep shared presence.",
    "h1": "Quality Time Date Planner: Distraction-Free Couple Activities",
    "ogTitle": "Quality Time Date Planner â€“ Distraction-Free Couple Activities | LoveScoreTest",
    "ogDescription": "Create intentional date nights focused on genuine presence, no-phone zones, eye contact, and deep shared presence.",
    "twitterTitle": "Quality Time Date Planner â€“ Distraction-Free Couple Activities | LoveScoreTest",
    "twitterDescription": "Create intentional date nights focused on genuine presence, no-phone zones, eye contact, and deep shared presence.",
    "canonicalUrl": "https://lovescoretest.com/tool/quality-time-date-planner"
  },
  "acts-of-service-idea-vault": {
    "slug": "acts-of-service-idea-vault",
    "primaryKeyword": "acts of service ideas",
    "secondaryKeywords": [
      "acts of service love language",
      "how to show acts of service",
      "thoughtful chores for partner"
    ],
    "title": "Acts of Service Idea Vault â€“ Thoughtful Daily Help & Care | LoveScoreTest",
    "metaDescription": "Unlock practical ideas to lighten your partnerâ€™s mental load: surprise coffee, car maintenance, warm towels, and chore relief.",
    "h1": "Acts of Service Idea Vault: Practical Care & Thoughtful Gestures",
    "ogTitle": "Acts of Service Idea Vault â€“ Thoughtful Daily Help & Care | LoveScoreTest",
    "ogDescription": "Unlock practical ideas to lighten your partnerâ€™s mental load: surprise coffee, car maintenance, warm towels, and chore relief.",
    "twitterTitle": "Acts of Service Idea Vault â€“ Thoughtful Daily Help & Care | LoveScoreTest",
    "twitterDescription": "Unlock practical ideas to lighten your partnerâ€™s mental load: surprise coffee, car maintenance, warm towels, and chore relief.",
    "canonicalUrl": "https://lovescoretest.com/tool/acts-of-service-idea-vault"
  },
  "thoughtful-gifting-compass": {
    "slug": "thoughtful-gifting-compass",
    "primaryKeyword": "meaningful gifts for partner",
    "secondaryKeywords": [
      "gift giving love language",
      "thoughtful anniversary gifts",
      "sentimental gift finder"
    ],
    "title": "Thoughtful Gifting Compass â€“ Sentimental & Personal Gift Finder | LoveScoreTest",
    "metaDescription": "Find sentimental, memory-grounded gift inspiration based on your partnerâ€™s passions and shared relationship milestones.",
    "h1": "Thoughtful Gifting Compass: Sentimental & Meaningful Gift Finder",
    "ogTitle": "Thoughtful Gifting Compass â€“ Sentimental & Personal Gift Finder | LoveScoreTest",
    "ogDescription": "Find sentimental, memory-grounded gift inspiration based on your partnerâ€™s passions and shared relationship milestones.",
    "twitterTitle": "Thoughtful Gifting Compass â€“ Sentimental & Personal Gift Finder | LoveScoreTest",
    "twitterDescription": "Find sentimental, memory-grounded gift inspiration based on your partnerâ€™s passions and shared relationship milestones.",
    "canonicalUrl": "https://lovescoretest.com/tool/thoughtful-gifting-compass"
  },
  "physical-touch-comfort-guide": {
    "slug": "physical-touch-comfort-guide",
    "primaryKeyword": "physical touch love language",
    "secondaryKeywords": [
      "loving touch guide couples",
      "cuddling and closeness",
      "affection comfort guide"
    ],
    "title": "Physical Touch & Comfort Guide â€“ Warmth, Hugs & Closeness | LoveScoreTest",
    "metaDescription": "Explore non-verbal reassurance: soothing back massages, morning forehead kisses, warm hugs, and hand-holding.",
    "h1": "Physical Touch & Comfort Guide: Warmth, Hugs & Gentle Closeness",
    "ogTitle": "Physical Touch & Comfort Guide â€“ Warmth, Hugs & Closeness | LoveScoreTest",
    "ogDescription": "Explore non-verbal reassurance: soothing back massages, morning forehead kisses, warm hugs, and hand-holding.",
    "twitterTitle": "Physical Touch & Comfort Guide â€“ Warmth, Hugs & Closeness | LoveScoreTest",
    "twitterDescription": "Explore non-verbal reassurance: soothing back massages, morning forehead kisses, warm hugs, and hand-holding.",
    "canonicalUrl": "https://lovescoretest.com/tool/physical-touch-comfort-guide"
  },
  "love-archetype-test": {
    "slug": "love-archetype-test",
    "primaryKeyword": "love archetype test",
    "secondaryKeywords": [
      "relationship archetypes quiz",
      "romantic personality type",
      "what kind of lover are you"
    ],
    "title": "Love Archetype Test â€“ The Romantic, Caregiver, Explorer & Anchor | LoveScoreTest",
    "metaDescription": "Discover your foundational romantic archetype: The Caregiver, The Explorer, The Anchor, or The Romantic Dreamer.",
    "h1": "Love Archetype Test: Discover Your Romantic Persona & Core Drive",
    "ogTitle": "Love Archetype Test â€“ The Romantic, Caregiver, Explorer & Anchor | LoveScoreTest",
    "ogDescription": "Discover your foundational romantic archetype: The Caregiver, The Explorer, The Anchor, or The Romantic Dreamer.",
    "twitterTitle": "Love Archetype Test â€“ The Romantic, Caregiver, Explorer & Anchor | LoveScoreTest",
    "twitterDescription": "Discover your foundational romantic archetype: The Caregiver, The Explorer, The Anchor, or The Romantic Dreamer.",
    "canonicalUrl": "https://lovescoretest.com/tool/love-archetype-test"
  },
  "empathy-quotient-for-couples": {
    "slug": "empathy-quotient-for-couples",
    "primaryKeyword": "empathy test for couples",
    "secondaryKeywords": [
      "emotional intelligence in relationships",
      "active listening quiz",
      "partner empathy test"
    ],
    "title": "Empathy Quotient for Couples â€“ Emotional Attunement Test | LoveScoreTest",
    "metaDescription": "Measure your ability to read subtle micro-expressions, validate your partnerâ€™s emotions, and listen without jumping into fix-it mode.",
    "h1": "Empathy Quotient for Couples: Emotional Attunement & Listening Test",
    "ogTitle": "Empathy Quotient for Couples â€“ Emotional Attunement Test | LoveScoreTest",
    "ogDescription": "Measure your ability to read subtle micro-expressions, validate your partnerâ€™s emotions, and listen without jumping into fix-it mode.",
    "twitterTitle": "Empathy Quotient for Couples â€“ Emotional Attunement Test | LoveScoreTest",
    "twitterDescription": "Measure your ability to read subtle micro-expressions, validate your partnerâ€™s emotions, and listen without jumping into fix-it mode.",
    "canonicalUrl": "https://lovescoretest.com/tool/empathy-quotient-for-couples"
  },
  "romantic-spontaneity-index": {
    "slug": "romantic-spontaneity-index",
    "primaryKeyword": "romantic spontaneity test",
    "secondaryKeywords": [
      "spontaneous romance quiz",
      "surprise date ideas",
      "relationship freshness test"
    ],
    "title": "Romantic Spontaneity Index â€“ Surprise Dates & Playful Energy | LoveScoreTest",
    "metaDescription": "Evaluate how often you surprise your partner with impromptu flowers, secret weekend getaways, and sudden spontaneous dances.",
    "h1": "Romantic Spontaneity Index: Surprise Dates & Playful Energy Test",
    "ogTitle": "Romantic Spontaneity Index â€“ Surprise Dates & Playful Energy | LoveScoreTest",
    "ogDescription": "Evaluate how often you surprise your partner with impromptu flowers, secret weekend getaways, and sudden spontaneous dances.",
    "twitterTitle": "Romantic Spontaneity Index â€“ Surprise Dates & Playful Energy | LoveScoreTest",
    "twitterDescription": "Evaluate how often you surprise your partner with impromptu flowers, secret weekend getaways, and sudden spontaneous dances.",
    "canonicalUrl": "https://lovescoretest.com/tool/romantic-spontaneity-index"
  },
  "assertiveness-vs-accommodation-balance": {
    "slug": "assertiveness-vs-accommodation-balance",
    "primaryKeyword": "people pleasing in relationships quiz",
    "secondaryKeywords": [
      "assertiveness in relationships",
      "setting boundaries couples",
      "healthy compromise quiz"
    ],
    "title": "Assertiveness vs Accommodation Balance â€“ Voice Your Needs Clearly | LoveScoreTest",
    "metaDescription": "Find balance between accommodating your partner and honoring your own needs without passive aggression or resentment.",
    "h1": "Assertiveness vs Accommodation Balance: Speak Up & Compromise Healthy",
    "ogTitle": "Assertiveness vs Accommodation Balance â€“ Voice Your Needs Clearly | LoveScoreTest",
    "ogDescription": "Find balance between accommodating your partner and honoring your own needs without passive aggression or resentment.",
    "twitterTitle": "Assertiveness vs Accommodation Balance â€“ Voice Your Needs Clearly | LoveScoreTest",
    "twitterDescription": "Find balance between accommodating your partner and honoring your own needs without passive aggression or resentment.",
    "canonicalUrl": "https://lovescoretest.com/tool/assertiveness-vs-accommodation-balance"
  },
  "patience-and-temperament-test": {
    "slug": "patience-and-temperament-test",
    "primaryKeyword": "patience in relationships test",
    "secondaryKeywords": [
      "relationship temperament quiz",
      "irritation and patience couples",
      "calm under pressure love"
    ],
    "title": "Patience & Temperament Test â€“ Calm Reactions Under Stress | LoveScoreTest",
    "metaDescription": "Measure patience during traffic jams, forgotten errands, and emotional storms. Build gentle tolerance in everyday moments.",
    "h1": "Patience & Temperament Test: Calm Reactions & Gentle Tolerance",
    "ogTitle": "Patience & Temperament Test â€“ Calm Reactions Under Stress | LoveScoreTest",
    "ogDescription": "Measure patience during traffic jams, forgotten errands, and emotional storms. Build gentle tolerance in everyday moments.",
    "twitterTitle": "Patience & Temperament Test â€“ Calm Reactions Under Stress | LoveScoreTest",
    "twitterDescription": "Measure patience during traffic jams, forgotten errands, and emotional storms. Build gentle tolerance in everyday moments.",
    "canonicalUrl": "https://lovescoretest.com/tool/patience-and-temperament-test"
  },
  "optimism-vs-realism-couple-match": {
    "slug": "optimism-vs-realism-couple-match",
    "primaryKeyword": "optimist pessimist couple compatibility",
    "secondaryKeywords": [
      "optimism vs realism quiz",
      "rose colored glasses couples",
      "practical dreamer relationship"
    ],
    "title": "Optimism vs Realism Couple Match â€“ Dreamer & Anchor Synergy | LoveScoreTest",
    "metaDescription": "Are you the big-sky visionary or the grounded risk-assessor? Learn how optimism and pragmatic realism create a balanced partnership.",
    "h1": "Optimism vs Realism Couple Match: Dreamer & Pragmatic Anchor Balance",
    "ogTitle": "Optimism vs Realism Couple Match â€“ Dreamer & Anchor Synergy | LoveScoreTest",
    "ogDescription": "Are you the big-sky visionary or the grounded risk-assessor? Learn how optimism and pragmatic realism create a balanced partnership.",
    "twitterTitle": "Optimism vs Realism Couple Match â€“ Dreamer & Anchor Synergy | LoveScoreTest",
    "twitterDescription": "Are you the big-sky visionary or the grounded risk-assessor? Learn how optimism and pragmatic realism create a balanced partnership.",
    "canonicalUrl": "https://lovescoretest.com/tool/optimism-vs-realism-couple-match"
  },
  "would-you-rather-couples-edition": {
    "slug": "would-you-rather-couples-edition",
    "primaryKeyword": "would you rather couples questions",
    "secondaryKeywords": [
      "would you rather for couples",
      "fun couples questions",
      "date night dilemma game"
    ],
    "title": "Would You Rather? â€” Couples Edition Date Night Dilemmas | LoveScoreTest",
    "metaDescription": "Play over 50 fun, cheeky, and thought-provoking couple dilemmas. Spark laughter and playful debates on your next date night.",
    "h1": "Would You Rather? Couples Edition Date Night Dilemmas Game",
    "ogTitle": "Would You Rather? â€” Couples Edition Date Night Dilemmas | LoveScoreTest",
    "ogDescription": "Play over 50 fun, cheeky, and thought-provoking couple dilemmas. Spark laughter and playful debates on your next date night.",
    "twitterTitle": "Would You Rather? â€” Couples Edition Date Night Dilemmas | LoveScoreTest",
    "twitterDescription": "Play over 50 fun, cheeky, and thought-provoking couple dilemmas. Spark laughter and playful debates on your next date night.",
    "canonicalUrl": "https://lovescoretest.com/tool/would-you-rather-couples-edition"
  },
  "never-have-i-ever-couples-edition": {
    "slug": "never-have-i-ever-couples-edition",
    "primaryKeyword": "never have i ever couples questions",
    "secondaryKeywords": [
      "never have i ever relationship edition",
      "spicy never have i ever couples",
      "couple party game"
    ],
    "title": "Never Have I Ever â€” Couples Edition Revealing Confessions | LoveScoreTest",
    "metaDescription": "Uncover secrets and funny confessions with couple-themed Never Have I Ever prompts. Perfect for game nights and cozy drinks.",
    "h1": "Never Have I Ever: Couples Edition Revealing Confessions Game",
    "ogTitle": "Never Have I Ever â€” Couples Edition Revealing Confessions | LoveScoreTest",
    "ogDescription": "Uncover secrets and funny confessions with couple-themed Never Have I Ever prompts. Perfect for game nights and cozy drinks.",
    "twitterTitle": "Never Have I Ever â€” Couples Edition Revealing Confessions | LoveScoreTest",
    "twitterDescription": "Uncover secrets and funny confessions with couple-themed Never Have I Ever prompts. Perfect for game nights and cozy drinks.",
    "canonicalUrl": "https://lovescoretest.com/tool/never-have-i-ever-couples-edition"
  },
  "truth-or-dare-for-couples": {
    "slug": "truth-or-dare-for-couples",
    "primaryKeyword": "truth or dare couples",
    "secondaryKeywords": [
      "couples truth or dare questions",
      "romantic truth or dare",
      "spicy couple game"
    ],
    "title": "Truth or Dare â€” Couples Edition Romantic & Playful Game | LoveScoreTest",
    "metaDescription": "Choose between vulnerable romantic truths and sweet, cheeky dares designed to break comfort zones and spark sparks.",
    "h1": "Truth or Dare: Couples Edition Romantic & Playful Party Game",
    "ogTitle": "Truth or Dare â€” Couples Edition Romantic & Playful Game | LoveScoreTest",
    "ogDescription": "Choose between vulnerable romantic truths and sweet, cheeky dares designed to break comfort zones and spark sparks.",
    "twitterTitle": "Truth or Dare â€” Couples Edition Romantic & Playful Game | LoveScoreTest",
    "twitterDescription": "Choose between vulnerable romantic truths and sweet, cheeky dares designed to break comfort zones and spark sparks.",
    "canonicalUrl": "https://lovescoretest.com/tool/truth-or-dare-for-couples"
  },
  "36-questions-to-fall-in-love": {
    "slug": "36-questions-to-fall-in-love",
    "primaryKeyword": "36 questions to fall in love",
    "secondaryKeywords": [
      "arthur aron 36 questions",
      "fast friendship questions",
      "psychology questions love"
    ],
    "title": "36 Questions to Fall in Love â€“ The Classic Closeness Experiment | LoveScoreTest",
    "metaDescription": "Experience the famous 36 questions designed by psychologists to foster rapid intimacy and deep vulnerability between two people.",
    "h1": "36 Questions to Fall in Love: Arthur Aron Closeness Experiment",
    "ogTitle": "36 Questions to Fall in Love â€“ The Classic Closeness Experiment | LoveScoreTest",
    "ogDescription": "Experience the famous 36 questions designed by psychologists to foster rapid intimacy and deep vulnerability between two people.",
    "twitterTitle": "36 Questions to Fall in Love â€“ The Classic Closeness Experiment | LoveScoreTest",
    "twitterDescription": "Experience the famous 36 questions designed by psychologists to foster rapid intimacy and deep vulnerability between two people.",
    "canonicalUrl": "https://lovescoretest.com/tool/36-questions-to-fall-in-love"
  },
  "date-night-roulette-spinner": {
    "slug": "date-night-roulette-spinner",
    "primaryKeyword": "date night spinner",
    "secondaryKeywords": [
      "date night roulette",
      "random date idea generator",
      "what to do for date night"
    ],
    "title": "Date Night Roulette Spinner â€“ Random Creative Date Ideas | LoveScoreTest",
    "metaDescription": "Canâ€™t decide what to do tonight? Spin the roulette wheel for cozy home dates, budget outings, foodie treats, or outdoor adventures.",
    "h1": "Date Night Roulette Spinner: Instant Creative Date Ideas",
    "ogTitle": "Date Night Roulette Spinner â€“ Random Creative Date Ideas | LoveScoreTest",
    "ogDescription": "Canâ€™t decide what to do tonight? Spin the roulette wheel for cozy home dates, budget outings, foodie treats, or outdoor adventures.",
    "twitterTitle": "Date Night Roulette Spinner â€“ Random Creative Date Ideas | LoveScoreTest",
    "twitterDescription": "Canâ€™t decide what to do tonight? Spin the roulette wheel for cozy home dates, budget outings, foodie treats, or outdoor adventures.",
    "canonicalUrl": "https://lovescoretest.com/tool/date-night-roulette-spinner"
  },
  "first-date-conversation-sparker": {
    "slug": "first-date-conversation-sparker",
    "primaryKeyword": "first date conversation starters",
    "secondaryKeywords": [
      "first date questions",
      "icebreaker questions for dating",
      "skip small talk questions"
    ],
    "title": "First Date Conversation Sparker â€“ Natural Icebreakers & Stories | LoveScoreTest",
    "metaDescription": "Skip boring interview small talk with engaging, organic conversation questions designed to bring out memorable personal stories.",
    "h1": "First Date Conversation Sparker: Engaging Icebreakers & Stories",
    "ogTitle": "First Date Conversation Sparker â€“ Natural Icebreakers & Stories | LoveScoreTest",
    "ogDescription": "Skip boring interview small talk with engaging, organic conversation questions designed to bring out memorable personal stories.",
    "twitterTitle": "First Date Conversation Sparker â€“ Natural Icebreakers & Stories | LoveScoreTest",
    "twitterDescription": "Skip boring interview small talk with engaging, organic conversation questions designed to bring out memorable personal stories.",
    "canonicalUrl": "https://lovescoretest.com/tool/first-date-conversation-sparker"
  },
  "deep-questions-for-late-nights": {
    "slug": "deep-questions-for-late-nights",
    "primaryKeyword": "deep late night questions couples",
    "secondaryKeywords": [
      "pillow talk questions",
      "existential couple questions",
      "deep conversation starters lovers"
    ],
    "title": "Deep Questions for Late Nights â€“ Intimate Pillow Talk Prompts | LoveScoreTest",
    "metaDescription": "Curated deep questions for late-night drives, stargazing, and bedside pillow talk about dreams, fears, and life philosophy.",
    "h1": "Deep Questions for Late Nights: Intimate Pillow Talk Prompts",
    "ogTitle": "Deep Questions for Late Nights â€“ Intimate Pillow Talk Prompts | LoveScoreTest",
    "ogDescription": "Curated deep questions for late-night drives, stargazing, and bedside pillow talk about dreams, fears, and life philosophy.",
    "twitterTitle": "Deep Questions for Late Nights â€“ Intimate Pillow Talk Prompts | LoveScoreTest",
    "twitterDescription": "Curated deep questions for late-night drives, stargazing, and bedside pillow talk about dreams, fears, and life philosophy.",
    "canonicalUrl": "https://lovescoretest.com/tool/deep-questions-for-late-nights"
  },
  "anniversary-reminiscence-game": {
    "slug": "anniversary-reminiscence-game",
    "primaryKeyword": "anniversary memory game couples",
    "secondaryKeywords": [
      "anniversary reflection questions",
      "walk down memory lane quiz",
      "relationship nostalgia game"
    ],
    "title": "Anniversary Reminiscence Game â€“ Relive Your Best Love Memories | LoveScoreTest",
    "metaDescription": "Celebrate your relationship journey: first dates, unforgettable trips, inside jokes, and hurdles you overcame together as a team.",
    "h1": "Anniversary Reminiscence Game: Relive Your Love Story Memories",
    "ogTitle": "Anniversary Reminiscence Game â€“ Relive Your Best Love Memories | LoveScoreTest",
    "ogDescription": "Celebrate your relationship journey: first dates, unforgettable trips, inside jokes, and hurdles you overcame together as a team.",
    "twitterTitle": "Anniversary Reminiscence Game â€“ Relive Your Best Love Memories | LoveScoreTest",
    "twitterDescription": "Celebrate your relationship journey: first dates, unforgettable trips, inside jokes, and hurdles you overcame together as a team.",
    "canonicalUrl": "https://lovescoretest.com/tool/anniversary-reminiscence-game"
  },
  "bucket-list-for-couples": {
    "slug": "bucket-list-for-couples",
    "primaryKeyword": "couple bucket list ideas",
    "secondaryKeywords": [
      "relationship bucket list",
      "romantic things to do together",
      "couples adventure list"
    ],
    "title": "Couple Bucket List Builder â€“ Dream Adventures & Shared Goals | LoveScoreTest",
    "metaDescription": "Build, organize, and check off your shared couple bucket list: hot air balloon rides, cooking classes, road trips, and cozy milestones.",
    "h1": "Couple Bucket List Builder: Dream Adventures & Shared Milestones",
    "ogTitle": "Couple Bucket List Builder â€“ Dream Adventures & Shared Goals | LoveScoreTest",
    "ogDescription": "Build, organize, and check off your shared couple bucket list: hot air balloon rides, cooking classes, road trips, and cozy milestones.",
    "twitterTitle": "Couple Bucket List Builder â€“ Dream Adventures & Shared Goals | LoveScoreTest",
    "twitterDescription": "Build, organize, and check off your shared couple bucket list: hot air balloon rides, cooking classes, road trips, and cozy milestones.",
    "canonicalUrl": "https://lovescoretest.com/tool/bucket-list-for-couples"
  },
  "road-trip-couples-trivia": {
    "slug": "road-trip-couples-trivia",
    "primaryKeyword": "road trip questions for couples",
    "secondaryKeywords": [
      "car ride games for couples",
      "road trip conversation starters",
      "couples travel trivia"
    ],
    "title": "Road Trip Couples Trivia â€“ Car Ride Games & Quirky Questions | LoveScoreTest",
    "metaDescription": "Keep long highway miles fun and lively with engaging questions about pop culture, fantasy superpowers, and hilarious debates.",
    "h1": "Road Trip Couples Trivia: Fun Car Games & Highway Debates",
    "ogTitle": "Road Trip Couples Trivia â€“ Car Ride Games & Quirky Questions | LoveScoreTest",
    "ogDescription": "Keep long highway miles fun and lively with engaging questions about pop culture, fantasy superpowers, and hilarious debates.",
    "twitterTitle": "Road Trip Couples Trivia â€“ Car Ride Games & Quirky Questions | LoveScoreTest",
    "twitterDescription": "Keep long highway miles fun and lively with engaging questions about pop culture, fantasy superpowers, and hilarious debates.",
    "canonicalUrl": "https://lovescoretest.com/tool/road-trip-couples-trivia"
  },
  "dinner-table-question-cards": {
    "slug": "dinner-table-question-cards",
    "primaryKeyword": "dinner table questions couples",
    "secondaryKeywords": [
      "date night conversation cards",
      "questions over dinner",
      "table talk prompts relationship"
    ],
    "title": "Dinner Table Question Cards â€“ Meaningful Date Night Prompts | LoveScoreTest",
    "metaDescription": "Transform ordinary dinner into a rich, memorable evening with curated conversation cards spanning childhood, philosophy, and future dreams.",
    "h1": "Dinner Table Question Cards: Date Night Conversation Prompts",
    "ogTitle": "Dinner Table Question Cards â€“ Meaningful Date Night Prompts | LoveScoreTest",
    "ogDescription": "Transform ordinary dinner into a rich, memorable evening with curated conversation cards spanning childhood, philosophy, and future dreams.",
    "twitterTitle": "Dinner Table Question Cards â€“ Meaningful Date Night Prompts | LoveScoreTest",
    "twitterDescription": "Transform ordinary dinner into a rich, memorable evening with curated conversation cards spanning childhood, philosophy, and future dreams.",
    "canonicalUrl": "https://lovescoretest.com/tool/dinner-table-question-cards"
  },
  "two-truths-and-a-lie-couples": {
    "slug": "two-truths-and-a-lie-couples",
    "primaryKeyword": "two truths and a lie couples game",
    "secondaryKeywords": [
      "couples party games",
      "guess the lie relationship",
      "fun couple icebreaker"
    ],
    "title": "Two Truths & A Lie â€” Couples Edition Guessing Game | LoveScoreTest",
    "metaDescription": "Think you know everything about your partner? Test your radar with clever childhood, travel, and secret quirk prompts.",
    "h1": "Two Truths & A Lie: Couples Edition Secret Guessing Game",
    "ogTitle": "Two Truths & A Lie â€” Couples Edition Guessing Game | LoveScoreTest",
    "ogDescription": "Think you know everything about your partner? Test your radar with clever childhood, travel, and secret quirk prompts.",
    "twitterTitle": "Two Truths & A Lie â€” Couples Edition Guessing Game | LoveScoreTest",
    "twitterDescription": "Think you know everything about your partner? Test your radar with clever childhood, travel, and secret quirk prompts.",
    "canonicalUrl": "https://lovescoretest.com/tool/two-truths-and-a-lie-couples"
  },
  "rapid-fire-this-or-that-couples": {
    "slug": "rapid-fire-this-or-that-couples",
    "primaryKeyword": "this or that questions for couples",
    "secondaryKeywords": [
      "couples rapid fire questions",
      "this or that relationship game",
      "quick couple choices"
    ],
    "title": "Rapid-Fire This or That? â€” Couples Speed Decision Game | LoveScoreTest",
    "metaDescription": "Beach or mountains? Morning snuggles or midnight snacks? Answer 30 rapid-fire questions and see where your instincts match.",
    "h1": "Rapid-Fire This or That? Couples Speed Decision Game",
    "ogTitle": "Rapid-Fire This or That? â€” Couples Speed Decision Game | LoveScoreTest",
    "ogDescription": "Beach or mountains? Morning snuggles or midnight snacks? Answer 30 rapid-fire questions and see where your instincts match.",
    "twitterTitle": "Rapid-Fire This or That? â€” Couples Speed Decision Game | LoveScoreTest",
    "twitterDescription": "Beach or mountains? Morning snuggles or midnight snacks? Answer 30 rapid-fire questions and see where your instincts match.",
    "canonicalUrl": "https://lovescoretest.com/tool/rapid-fire-this-or-that-couples"
  },
  "compliment-battle-game": {
    "slug": "compliment-battle-game",
    "primaryKeyword": "compliment game couples",
    "secondaryKeywords": [
      "compliment battle",
      "sweet compliments for boyfriend girlfriend",
      "affirmation game couples"
    ],
    "title": "Compliment Battle Game â€“ Uplifting Praise & Gratitude Duel | LoveScoreTest",
    "metaDescription": "Take turns giving creative, hyper-specific compliments until one partner blushes or runs out of words. Sweet, wholesome couple game.",
    "h1": "Compliment Battle Game: Uplifting Praise & Affection Duel",
    "ogTitle": "Compliment Battle Game â€“ Uplifting Praise & Gratitude Duel | LoveScoreTest",
    "ogDescription": "Take turns giving creative, hyper-specific compliments until one partner blushes or runs out of words. Sweet, wholesome couple game.",
    "twitterTitle": "Compliment Battle Game â€“ Uplifting Praise & Gratitude Duel | LoveScoreTest",
    "twitterDescription": "Take turns giving creative, hyper-specific compliments until one partner blushes or runs out of words. Sweet, wholesome couple game.",
    "canonicalUrl": "https://lovescoretest.com/tool/compliment-battle-game"
  },
  "fantasy-travel-itinerary-builder": {
    "slug": "fantasy-travel-itinerary-builder",
    "primaryKeyword": "couples dream vacation planner",
    "secondaryKeywords": [
      "fantasy travel itinerary",
      "plan a trip with partner quiz",
      "romantic getaway designer"
    ],
    "title": "Fantasy Travel Itinerary Builder â€“ Plan Your Dream Romantic Getaway | LoveScoreTest",
    "metaDescription": "Design your ultimate dream holiday together: pick exotic destinations, overwater villas, sunset dinners, and adventure excursions.",
    "h1": "Fantasy Travel Itinerary Builder: Plan Your Dream Vacation",
    "ogTitle": "Fantasy Travel Itinerary Builder â€“ Plan Your Dream Romantic Getaway | LoveScoreTest",
    "ogDescription": "Design your ultimate dream holiday together: pick exotic destinations, overwater villas, sunset dinners, and adventure excursions.",
    "twitterTitle": "Fantasy Travel Itinerary Builder â€“ Plan Your Dream Romantic Getaway | LoveScoreTest",
    "twitterDescription": "Design your ultimate dream holiday together: pick exotic destinations, overwater villas, sunset dinners, and adventure excursions.",
    "canonicalUrl": "https://lovescoretest.com/tool/fantasy-travel-itinerary-builder"
  },
  "kiss-and-cuddle-dare-cards": {
    "slug": "kiss-and-cuddle-dare-cards",
    "primaryKeyword": "cuddle dare cards couples",
    "secondaryKeywords": [
      "romantic dares for couples",
      "kiss challenge cards",
      "cozy couple game"
    ],
    "title": "Kiss & Cuddle Dare Cards â€“ Sweet Romance & Physical Affection | LoveScoreTest",
    "metaDescription": "Draw sweet, gentle dares for 30-second hugs, forehead kisses, slow dances in the kitchen, and warm cuddles on the couch.",
    "h1": "Kiss & Cuddle Dare Cards: Sweet Romantic Challenges & Affection",
    "ogTitle": "Kiss & Cuddle Dare Cards â€“ Sweet Romance & Physical Affection | LoveScoreTest",
    "ogDescription": "Draw sweet, gentle dares for 30-second hugs, forehead kisses, slow dances in the kitchen, and warm cuddles on the couch.",
    "twitterTitle": "Kiss & Cuddle Dare Cards â€“ Sweet Romance & Physical Affection | LoveScoreTest",
    "twitterDescription": "Draw sweet, gentle dares for 30-second hugs, forehead kisses, slow dances in the kitchen, and warm cuddles on the couch.",
    "canonicalUrl": "https://lovescoretest.com/tool/kiss-and-cuddle-dare-cards"
  },
  "next-anniversary-countdown": {
    "slug": "next-anniversary-countdown",
    "primaryKeyword": "anniversary countdown calculator",
    "secondaryKeywords": [
      "days until anniversary",
      "next anniversary counter",
      "when is our anniversary countdown"
    ],
    "title": "Next Anniversary Countdown â€“ Days, Hours & Minutes Until Celebration | LoveScoreTest",
    "metaDescription": "Track how many days, hours, and minutes remain until your next romantic anniversary with real-time countdown clocks and reminders.",
    "h1": "Next Anniversary Countdown: Days & Hours Until Your Special Day",
    "ogTitle": "Next Anniversary Countdown â€“ Days, Hours & Minutes Until Celebration | LoveScoreTest",
    "ogDescription": "Track how many days, hours, and minutes remain until your next romantic anniversary with real-time countdown clocks and reminders.",
    "twitterTitle": "Next Anniversary Countdown â€“ Days, Hours & Minutes Until Celebration | LoveScoreTest",
    "twitterDescription": "Track how many days, hours, and minutes remain until your next romantic anniversary with real-time countdown clocks and reminders.",
    "canonicalUrl": "https://lovescoretest.com/tool/next-anniversary-countdown"
  },
  "traditional-anniversary-gift-finder": {
    "slug": "traditional-anniversary-gift-finder",
    "primaryKeyword": "anniversary gift by year calculator",
    "secondaryKeywords": [
      "traditional anniversary gifts list",
      "modern anniversary gift guide",
      "wedding anniversary themes"
    ],
    "title": "Traditional & Modern Anniversary Gift Finder â€“ Gifts by Year | LoveScoreTest",
    "metaDescription": "Find official traditional and modern anniversary gift materials from Year 1 (Paper/Clock) to Year 50 (Gold) with creative ideas.",
    "h1": "Traditional & Modern Anniversary Gift Finder: Theme Guide by Year",
    "ogTitle": "Traditional & Modern Anniversary Gift Finder â€“ Gifts by Year | LoveScoreTest",
    "ogDescription": "Find official traditional and modern anniversary gift materials from Year 1 (Paper/Clock) to Year 50 (Gold) with creative ideas.",
    "twitterTitle": "Traditional & Modern Anniversary Gift Finder â€“ Gifts by Year | LoveScoreTest",
    "twitterDescription": "Find official traditional and modern anniversary gift materials from Year 1 (Paper/Clock) to Year 50 (Gold) with creative ideas.",
    "canonicalUrl": "https://lovescoretest.com/tool/traditional-anniversary-gift-finder"
  },
  "hours-spent-together-calculator": {
    "slug": "hours-spent-together-calculator",
    "primaryKeyword": "hours spent together calculator",
    "secondaryKeywords": [
      "how many hours have we been together",
      "total relationship hours",
      "hours in love tracker"
    ],
    "title": "Hours Spent Together Calculator â€“ Estimate Lifetime Shared Time | LoveScoreTest",
    "metaDescription": "Estimate the total waking hours you and your partner have spent side-by-side eating, chatting, traveling, and living together.",
    "h1": "Hours Spent Together Calculator: Lifetime Shared Time Estimator",
    "ogTitle": "Hours Spent Together Calculator â€“ Estimate Lifetime Shared Time | LoveScoreTest",
    "ogDescription": "Estimate the total waking hours you and your partner have spent side-by-side eating, chatting, traveling, and living together.",
    "twitterTitle": "Hours Spent Together Calculator â€“ Estimate Lifetime Shared Time | LoveScoreTest",
    "twitterDescription": "Estimate the total waking hours you and your partner have spent side-by-side eating, chatting, traveling, and living together.",
    "canonicalUrl": "https://lovescoretest.com/tool/hours-spent-together-calculator"
  },
  "couples-age-gap-calculator": {
    "slug": "couples-age-gap-calculator",
    "primaryKeyword": "couples age gap calculator",
    "secondaryKeywords": [
      "age difference calculator couples",
      "age gap in relationship test",
      "half your age plus seven"
    ],
    "title": "Couples Age Gap Calculator â€“ Exact Difference & Half-Your-Age Rule | LoveScoreTest",
    "metaDescription": "Calculate the exact age difference between partners in years, months, and days. Includes cultural benchmarks and generational perspectives.",
    "h1": "Couples Age Gap Calculator: Exact Age Difference & Milestones",
    "ogTitle": "Couples Age Gap Calculator â€“ Exact Difference & Half-Your-Age Rule | LoveScoreTest",
    "ogDescription": "Calculate the exact age difference between partners in years, months, and days. Includes cultural benchmarks and generational perspectives.",
    "twitterTitle": "Couples Age Gap Calculator â€“ Exact Difference & Half-Your-Age Rule | LoveScoreTest",
    "twitterDescription": "Calculate the exact age difference between partners in years, months, and days. Includes cultural benchmarks and generational perspectives.",
    "canonicalUrl": "https://lovescoretest.com/tool/couples-age-gap-calculator"
  },
  "wedding-budget-estimator": {
    "slug": "wedding-budget-estimator",
    "primaryKeyword": "wedding budget estimator",
    "secondaryKeywords": [
      "wedding cost calculator",
      "wedding expense planner",
      "venue catering budget estimator"
    ],
    "title": "Wedding Budget Estimator â€“ Break Down Venue, Catering & Attire | LoveScoreTest",
    "metaDescription": "Distribute your target wedding budget realistically across venue, photography, catering, attire, entertainment, and contingency reserves.",
    "h1": "Wedding Budget Estimator: Realistic Expense Breakdown Tool",
    "ogTitle": "Wedding Budget Estimator â€“ Break Down Venue, Catering & Attire | LoveScoreTest",
    "ogDescription": "Distribute your target wedding budget realistically across venue, photography, catering, attire, entertainment, and contingency reserves.",
    "twitterTitle": "Wedding Budget Estimator â€“ Break Down Venue, Catering & Attire | LoveScoreTest",
    "twitterDescription": "Distribute your target wedding budget realistically across venue, photography, catering, attire, entertainment, and contingency reserves.",
    "canonicalUrl": "https://lovescoretest.com/tool/wedding-budget-estimator"
  },
  "wedding-guest-count-calculator": {
    "slug": "wedding-guest-count-calculator",
    "primaryKeyword": "wedding guest count calculator",
    "secondaryKeywords": [
      "wedding seating estimator",
      "guest list calculator",
      "wedding rsvp estimator"
    ],
    "title": "Wedding Guest Count & Seating Estimator â€“ Realistic RSVP Calculator | LoveScoreTest",
    "metaDescription": "Predict actual wedding attendance using realistic acceptance rates for local vs out-of-town guests and estimate reception tables.",
    "h1": "Wedding Guest Count & Seating Estimator: Realistic RSVP Calculator",
    "ogTitle": "Wedding Guest Count & Seating Estimator â€“ Realistic RSVP Calculator | LoveScoreTest",
    "ogDescription": "Predict actual wedding attendance using realistic acceptance rates for local vs out-of-town guests and estimate reception tables.",
    "twitterTitle": "Wedding Guest Count & Seating Estimator â€“ Realistic RSVP Calculator | LoveScoreTest",
    "twitterDescription": "Predict actual wedding attendance using realistic acceptance rates for local vs out-of-town guests and estimate reception tables.",
    "canonicalUrl": "https://lovescoretest.com/tool/wedding-guest-count-calculator"
  },
  "honeymoon-budget-and-savings-planner": {
    "slug": "honeymoon-budget-and-savings-planner",
    "primaryKeyword": "honeymoon savings planner",
    "secondaryKeywords": [
      "honeymoon budget calculator",
      "couples vacation savings tracker",
      "travel budget couples"
    ],
    "title": "Honeymoon Savings & Budget Planner â€“ Target Savings Schedule | LoveScoreTest",
    "metaDescription": "Calculate exactly how much you and your partner need to save each month to fund flights, luxury resorts, and excursions for your honeymoon.",
    "h1": "Honeymoon Savings & Budget Planner: Monthly Savings Target Tool",
    "ogTitle": "Honeymoon Savings & Budget Planner â€“ Target Savings Schedule | LoveScoreTest",
    "ogDescription": "Calculate exactly how much you and your partner need to save each month to fund flights, luxury resorts, and excursions for your honeymoon.",
    "twitterTitle": "Honeymoon Savings & Budget Planner â€“ Target Savings Schedule | LoveScoreTest",
    "twitterDescription": "Calculate exactly how much you and your partner need to save each month to fund flights, luxury resorts, and excursions for your honeymoon.",
    "canonicalUrl": "https://lovescoretest.com/tool/honeymoon-budget-and-savings-planner"
  },
  "date-night-annual-spend-calculator": {
    "slug": "date-night-annual-spend-calculator",
    "primaryKeyword": "date night budget calculator",
    "secondaryKeywords": [
      "annual date spend",
      "how much couples spend on dates",
      "dating cost estimator"
    ],
    "title": "Date Night Annual Spend Calculator â€“ Romance & Budgeting Balance | LoveScoreTest",
    "metaDescription": "Track how much you invest annually into dinners, movies, coffee dates, and staycations, and optimize romantic ROI.",
    "h1": "Date Night Annual Spend Calculator: Romance Investment Tracker",
    "ogTitle": "Date Night Annual Spend Calculator â€“ Romance & Budgeting Balance | LoveScoreTest",
    "ogDescription": "Track how much you invest annually into dinners, movies, coffee dates, and staycations, and optimize romantic ROI.",
    "twitterTitle": "Date Night Annual Spend Calculator â€“ Romance & Budgeting Balance | LoveScoreTest",
    "twitterDescription": "Track how much you invest annually into dinners, movies, coffee dates, and staycations, and optimize romantic ROI.",
    "canonicalUrl": "https://lovescoretest.com/tool/date-night-annual-spend-calculator"
  },
  "shared-chores-equity-calculator": {
    "slug": "shared-chores-equity-calculator",
    "primaryKeyword": "shared chores calculator couples",
    "secondaryKeywords": [
      "fair play chore division",
      "invisible labor calculator",
      "domestic duties split couples"
    ],
    "title": "Shared Chores & Invisible Labor Calculator â€“ Fair Household Split | LoveScoreTest",
    "metaDescription": "Audit weekly cooking, cleaning, laundry, grocery planning, and mental load to ensure an equitable, resentment-free home partnership.",
    "h1": "Shared Chores & Invisible Labor Calculator: Fair Household Balance",
    "ogTitle": "Shared Chores & Invisible Labor Calculator â€“ Fair Household Split | LoveScoreTest",
    "ogDescription": "Audit weekly cooking, cleaning, laundry, grocery planning, and mental load to ensure an equitable, resentment-free home partnership.",
    "twitterTitle": "Shared Chores & Invisible Labor Calculator â€“ Fair Household Split | LoveScoreTest",
    "twitterDescription": "Audit weekly cooking, cleaning, laundry, grocery planning, and mental load to ensure an equitable, resentment-free home partnership.",
    "canonicalUrl": "https://lovescoretest.com/tool/shared-chores-equity-calculator"
  },
  "heartbeats-shared-together-counter": {
    "slug": "heartbeats-shared-together-counter",
    "primaryKeyword": "heartbeats together calculator",
    "secondaryKeywords": [
      "how many heartbeats in love",
      "poetic love calculator",
      "heartbeats since anniversary"
    ],
    "title": "Heartbeats Shared Together Counter â€“ Poetic Love Milestone | LoveScoreTest",
    "metaDescription": "Calculate the estimated millions of human heartbeats you and your partner have shared since the magical day your love story began.",
    "h1": "Heartbeats Shared Together Counter: Poetic Lifetime Milestone",
    "ogTitle": "Heartbeats Shared Together Counter â€“ Poetic Love Milestone | LoveScoreTest",
    "ogDescription": "Calculate the estimated millions of human heartbeats you and your partner have shared since the magical day your love story began.",
    "twitterTitle": "Heartbeats Shared Together Counter â€“ Poetic Love Milestone | LoveScoreTest",
    "twitterDescription": "Calculate the estimated millions of human heartbeats you and your partner have shared since the magical day your love story began.",
    "canonicalUrl": "https://lovescoretest.com/tool/heartbeats-shared-together-counter"
  },
  "ldr-flight-distance-timezones-calculator": {
    "slug": "ldr-flight-distance-timezones-calculator",
    "primaryKeyword": "ldr distance calculator",
    "secondaryKeywords": [
      "long distance miles calculator",
      "timezone overlap couples",
      "ldr flight distance"
    ],
    "title": "LDR Distance & Timezones Calculator â€“ Miles Apart & Best Call Windows | LoveScoreTest",
    "metaDescription": "Enter two cities to calculate geographic flight miles, exact timezone offsets, and overlapping golden hours for long-distance video calls.",
    "h1": "LDR Distance & Timezones Calculator: Miles Apart & Call Windows",
    "ogTitle": "LDR Distance & Timezones Calculator â€“ Miles Apart & Best Call Windows | LoveScoreTest",
    "ogDescription": "Enter two cities to calculate geographic flight miles, exact timezone offsets, and overlapping golden hours for long-distance video calls.",
    "twitterTitle": "LDR Distance & Timezones Calculator â€“ Miles Apart & Best Call Windows | LoveScoreTest",
    "twitterDescription": "Enter two cities to calculate geographic flight miles, exact timezone offsets, and overlapping golden hours for long-distance video calls.",
    "canonicalUrl": "https://lovescoretest.com/tool/ldr-flight-distance-timezones-calculator"
  },
  "shared-sleep-hours-counter": {
    "slug": "shared-sleep-hours-counter",
    "primaryKeyword": "sleep hours together calculator",
    "secondaryKeywords": [
      "shared sleep counter",
      "how long we have slept together",
      "hours cuddling in sleep"
    ],
    "title": "Shared Sleep & Dreaming Hours Counter â€“ Nighttime Together | LoveScoreTest",
    "metaDescription": "Calculate how many hours of peaceful sleep and shared dreams you and your partner have experienced side-by-side.",
    "h1": "Shared Sleep & Dreaming Hours Counter: Nighttime Bonding Milestone",
    "ogTitle": "Shared Sleep & Dreaming Hours Counter â€“ Nighttime Together | LoveScoreTest",
    "ogDescription": "Calculate how many hours of peaceful sleep and shared dreams you and your partner have experienced side-by-side.",
    "twitterTitle": "Shared Sleep & Dreaming Hours Counter â€“ Nighttime Together | LoveScoreTest",
    "twitterDescription": "Calculate how many hours of peaceful sleep and shared dreams you and your partner have experienced side-by-side.",
    "canonicalUrl": "https://lovescoretest.com/tool/shared-sleep-hours-counter"
  },
  "sunrises-and-sunsets-shared-counter": {
    "slug": "sunrises-and-sunsets-shared-counter",
    "primaryKeyword": "sunrises shared together calculator",
    "secondaryKeywords": [
      "sunsets in love counter",
      "golden hours together",
      "poetic anniversary counter"
    ],
    "title": "Sunrises & Sunsets Shared Counter â€“ Golden Hours of Love | LoveScoreTest",
    "metaDescription": "Calculate the total number of sunrises and golden sunsets that have painted the sky since the day you became a couple.",
    "h1": "Sunrises & Sunsets Shared Counter: Golden Hours of Romance",
    "ogTitle": "Sunrises & Sunsets Shared Counter â€“ Golden Hours of Love | LoveScoreTest",
    "ogDescription": "Calculate the total number of sunrises and golden sunsets that have painted the sky since the day you became a couple.",
    "twitterTitle": "Sunrises & Sunsets Shared Counter â€“ Golden Hours of Love | LoveScoreTest",
    "twitterDescription": "Calculate the total number of sunrises and golden sunsets that have painted the sky since the day you became a couple.",
    "canonicalUrl": "https://lovescoretest.com/tool/sunrises-and-sunsets-shared-counter"
  },
  "shared-meals-eaten-calculator": {
    "slug": "shared-meals-eaten-calculator",
    "primaryKeyword": "shared meals calculator couples",
    "secondaryKeywords": [
      "dinners together counter",
      "how many meals together",
      "relationship meal counter"
    ],
    "title": "Shared Meals & Dinners Calculator â€“ Breakfasts, Lunches & Dinners | LoveScoreTest",
    "metaDescription": "Celebrate the thousands of delicious home-cooked dinners, morning coffees, and late-night snacks you have savored together.",
    "h1": "Shared Meals & Dinners Calculator: Shared Tables & Food Memories",
    "ogTitle": "Shared Meals & Dinners Calculator â€“ Breakfasts, Lunches & Dinners | LoveScoreTest",
    "ogDescription": "Celebrate the thousands of delicious home-cooked dinners, morning coffees, and late-night snacks you have savored together.",
    "twitterTitle": "Shared Meals & Dinners Calculator â€“ Breakfasts, Lunches & Dinners | LoveScoreTest",
    "twitterDescription": "Celebrate the thousands of delicious home-cooked dinners, morning coffees, and late-night snacks you have savored together.",
    "canonicalUrl": "https://lovescoretest.com/tool/shared-meals-eaten-calculator"
  },
  "milestone-1000-days-calculator": {
    "slug": "milestone-1000-days-calculator",
    "primaryKeyword": "1000 days of love calculator",
    "secondaryKeywords": [
      "day 1000 anniversary calculator",
      "1000 days together date",
      "love milestone calculator"
    ],
    "title": "1,000 Days of Love Calculator â€“ Find Your 1,000-Day Anniversary Date | LoveScoreTest",
    "metaDescription": "Discover the exact calendar date when your relationship hits Day 1,000, 2,000, 5,000, or 10,000. Plan an unforgettable celebration.",
    "h1": "1,000 Days of Love Calculator: Find Your 1,000-Day Anniversary",
    "ogTitle": "1,000 Days of Love Calculator â€“ Find Your 1,000-Day Anniversary Date | LoveScoreTest",
    "ogDescription": "Discover the exact calendar date when your relationship hits Day 1,000, 2,000, 5,000, or 10,000. Plan an unforgettable celebration.",
    "twitterTitle": "1,000 Days of Love Calculator â€“ Find Your 1,000-Day Anniversary Date | LoveScoreTest",
    "twitterDescription": "Discover the exact calendar date when your relationship hits Day 1,000, 2,000, 5,000, or 10,000. Plan an unforgettable celebration.",
    "canonicalUrl": "https://lovescoretest.com/tool/milestone-1000-days-calculator"
  },
  "golden-anniversary-timeline-projector": {
    "slug": "golden-anniversary-timeline-projector",
    "primaryKeyword": "50 year anniversary calculator",
    "secondaryKeywords": [
      "golden anniversary milestone projector",
      "silver anniversary date",
      "wedding jubilee calculator"
    ],
    "title": "50-Year Golden Timeline Projector â€“ Silver, Pearl & Gold Dates | LoveScoreTest",
    "metaDescription": "Project the exact future calendar years and dates when you will celebrate your Tin (10 yr), Silver (25 yr), and Gold (50 yr) jubilees.",
    "h1": "50-Year Golden Timeline Projector: Silver, Pearl & Gold Milestones",
    "ogTitle": "50-Year Golden Timeline Projector â€“ Silver, Pearl & Gold Dates | LoveScoreTest",
    "ogDescription": "Project the exact future calendar years and dates when you will celebrate your Tin (10 yr), Silver (25 yr), and Gold (50 yr) jubilees.",
    "twitterTitle": "50-Year Golden Timeline Projector â€“ Silver, Pearl & Gold Dates | LoveScoreTest",
    "twitterDescription": "Project the exact future calendar years and dates when you will celebrate your Tin (10 yr), Silver (25 yr), and Gold (50 yr) jubilees.",
    "canonicalUrl": "https://lovescoretest.com/tool/golden-anniversary-timeline-projector"
  },
  "relationship-roi-and-growth-score": {
    "slug": "relationship-roi-and-growth-score",
    "primaryKeyword": "relationship growth score",
    "secondaryKeywords": [
      "relationship reflection tool",
      "how much have we grown quiz",
      "love gratitude badge"
    ],
    "title": "Relationship Growth & Gratitude Score â€“ Celebrate Your Love Journey | LoveScoreTest",
    "metaDescription": "Reflect on personal and couple growth, mutual resilience, and shared happiness. Generate your crowning Grand Relationship Growth Badge.",
    "h1": "Relationship Growth & Gratitude Score: Celebrate Your Shared Journey",
    "ogTitle": "Relationship Growth & Gratitude Score â€“ Celebrate Your Love Journey | LoveScoreTest",
    "ogDescription": "Reflect on personal and couple growth, mutual resilience, and shared happiness. Generate your crowning Grand Relationship Growth Badge.",
    "twitterTitle": "Relationship Growth & Gratitude Score â€“ Celebrate Your Love Journey | LoveScoreTest",
    "twitterDescription": "Reflect on personal and couple growth, mutual resilience, and shared happiness. Generate your crowning Grand Relationship Growth Badge.",
    "canonicalUrl": "https://lovescoretest.com/tool/relationship-roi-and-growth-score"
  }
};

export function getToolSeoConfig(slug: string): ToolSeoConfig {
  if (TOOLS_SEO_DATA[slug]) {
    return TOOLS_SEO_DATA[slug];
  }
  // Safe fallback if ever queried with an unknown slug
  return {
    slug,
    primaryKeyword: slug.replace(/-/g, ' '),
    secondaryKeywords: [],
    title: `${slug.replace(/-/g, ' ')} â€“ Free Online Relationship Tool | LoveScoreTest`,
    metaDescription: 'Free, private love, couple, and relationship test. Calculate scores, discover insights, and spark meaningful conversations.',
    h1: slug.replace(/-/g, ' '),
    ogTitle: `${slug.replace(/-/g, ' ')} | LoveScoreTest`,
    ogDescription: 'Free, private love, couple, and relationship test on LoveScoreTest.com.',
    twitterTitle: `${slug.replace(/-/g, ' ')} | LoveScoreTest`,
    twitterDescription: 'Free, private love, couple, and relationship test on LoveScoreTest.com.',
    canonicalUrl: `https://lovescoretest.com/tool/${slug}`,
  };
}
