import React, { useState } from 'react';
import { MessageCircleHeart, RotateCcw, Share2, Copy, Check, Heart, BookOpen } from 'lucide-react';
import { ShareData } from '../../types';

interface LoveLanguageTestToolProps {
  onShare: (data: ShareData) => void;
}

type LanguageKey = 'words' | 'service' | 'gifts' | 'time' | 'touch';

interface LanguageOption {
  text: string;
  lang: LanguageKey;
}

interface Question {
  id: number;
  question: string;
  options: LanguageOption[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'It means the absolute most to me when my partner:',
    options: [
      { text: 'Unexpectedly says "I am so proud of you and grateful for you"', lang: 'words' },
      { text: 'Takes care of a difficult chore or errand without me asking', lang: 'service' },
      { text: 'Brings me a thoughtful little gift or treat they saw while out', lang: 'gifts' },
      { text: 'Puts their phone in another room to give me their undivided focus', lang: 'time' },
      { text: 'Reaches across the table to hold my hand or wrap me in a hug', lang: 'touch' },
    ],
  },
  {
    id: 2,
    question: 'After a hard and exhausting day, I feel most comforted if:',
    options: [
      { text: 'They listen and speak soothing, encouraging words of support', lang: 'words' },
      { text: 'They make me a warm meal or run a hot bath for me', lang: 'service' },
      { text: 'They surprise me with my favorite snack or comfort item', lang: 'gifts' },
      { text: 'We sit side-by-side on the sofa doing something peaceful together', lang: 'time' },
      { text: 'They hold me tightly in a long, silent, comforting embrace', lang: 'touch' },
    ],
  },
  {
    id: 3,
    question: 'I feel most hurt or disconnected if my partner:',
    options: [
      { text: 'Uses harsh, critical, or dismissive words during a dispute', lang: 'words' },
      { text: 'Breaks promises or ignores tasks they said they would help with', lang: 'service' },
      { text: 'Forgets our special anniversary or gifts something thoughtless', lang: 'gifts' },
      { text: 'Is constantly checking social media or multitasking during dates', lang: 'time' },
      { text: 'Pulls away from physical affection or avoids casual touch for days', lang: 'touch' },
    ],
  },
  {
    id: 4,
    question: 'My favorite kind of spontaneous surprise is:',
    options: [
      { text: 'A hidden handwritten love letter left in my jacket or book', lang: 'words' },
      { text: 'Waking up to find my car scraped, filled with gas, or cleaned', lang: 'service' },
      { text: 'A small souvenir or thoughtful book picked out just for me', lang: 'gifts' },
      { text: 'A planned surprise day trip or scenic walk just the two of us', lang: 'time' },
      { text: 'A surprise back rub or slow dance together in the kitchen', lang: 'touch' },
    ],
  },
  {
    id: 5,
    question: 'When I want to show my partner how deeply I love them, I naturally tend to:',
    options: [
      { text: 'Send them sweet paragraphs expressing everything I adore about them', lang: 'words' },
      { text: 'Help them organize their schedule, make their coffee, or solve a problem', lang: 'service' },
      { text: 'Hunt down the perfect, unique gift they mentioned months ago', lang: 'gifts' },
      { text: 'Clear my whole schedule so we can spend the entire weekend together', lang: 'time' },
      { text: 'Kiss their forehead, cuddle up close, and shower them with affection', lang: 'touch' },
    ],
  },
  {
    id: 6,
    question: 'On our anniversary, what matters most to my heart?',
    options: [
      { text: 'Hearing them verbally reflect on why they still choose me every day', lang: 'words' },
      { text: 'Them handling all the bookings, reservations, and details effortlessly', lang: 'service' },
      { text: 'A meaningful keepsake gift that symbolizes our journey together', lang: 'gifts' },
      { text: 'Having an uninterrupted evening without work emails or interruptions', lang: 'time' },
      { text: 'Intimate closeness, prolonged holding hands, and romantic cuddles', lang: 'touch' },
    ],
  },
  {
    id: 7,
    question: 'In social gatherings or with friends, I love it when my partner:',
    options: [
      { text: 'Openly compliments me or speaks proudly of me to others', lang: 'words' },
      { text: 'Brings me a drink or checks if I need anything comfortable', lang: 'service' },
      { text: 'Hands me a small sweet or token they kept for me', lang: 'gifts' },
      { text: 'Makes sure we share private moments and laugh together during the party', lang: 'time' },
      { text: 'Puts their arm around my waist or gently touches my shoulder', lang: 'touch' },
    ],
  },
  {
    id: 8,
    question: 'Which of these compliments touches your soul most deeply?',
    options: [
      { text: '"You make me a better person; your mind and spirit inspire me."', lang: 'words' },
      { text: '"I noticed how hard you worked today, so I took care of dinner."', lang: 'service' },
      { text: '"I saw this and it reminded me instantly of your smile."', lang: 'gifts' },
      { text: '"My favorite place in the whole world is just being beside you."', lang: 'time' },
      { text: '"I just melt whenever you hold me in your arms."', lang: 'touch' },
    ],
  },
  {
    id: 9,
    question: 'During a disagreement, what helps de-escalate tension fastest for you?',
    options: [
      { text: 'A sincere verbal reassurance: "I love you and we are going to be okay."', lang: 'words' },
      { text: 'Them immediately taking action to fix the practical issue', lang: 'service' },
      { text: 'A peace offering (a hot cup of tea or gentle snack brought over)', lang: 'gifts' },
      { text: 'Sitting together calmly and giving each other undivided focus', lang: 'time' },
      { text: 'A warm, steady hug that calms both nervous systems', lang: 'touch' },
    ],
  },
  {
    id: 10,
    question: 'If you could request one daily ritual with your partner forever, it would be:',
    options: [
      { text: 'A morning and bedtime message full of affection and gratitude', lang: 'words' },
      { text: 'One thoughtful small chore done proactively for each other every day', lang: 'service' },
      { text: 'Little unexpected sweet surprises or love tokens throughout the week', lang: 'gifts' },
      { text: 'A non-negotiable 20-minute evening walk or talk with zero screens', lang: 'time' },
      { text: 'A long 60-second embrace every morning before we part ways', lang: 'touch' },
    ],
  },
];

const LANGUAGE_DETAILS: Record<LanguageKey, { name: string; icon: string; description: string; partnerTip: string }> = {
  words: {
    name: 'Words of Affirmation',
    icon: '💬',
    description: 'You thrive on verbal compliments, appreciation, written notes, and hearing "I love you" paired with specific reasons why you are valued.',
    partnerTip: 'Leave sticky notes on their mirror, send unexpected sweet texts during the workday, and verbally praise their efforts.',
  },
  service: {
    name: 'Acts of Service',
    icon: '🤝',
    description: 'To you, actions speak louder than words. Proactive help, easing daily burdens, and thoughtful chores demonstrate true partnership.',
    partnerTip: 'Notice what is stressing them out and handle it without being asked. Make coffee, fill their gas tank, or run that errand.',
  },
  gifts: {
    name: 'Receiving Gifts',
    icon: '🎁',
    description: 'You treasure tangible symbols of love and visual reminders of being remembered. It is the thoughtfulness and intention, not the price tag.',
    partnerTip: 'Keep a secret notes list on your phone when they mention something they like. Surprise them with their favorite snack or a sweet souvenir.',
  },
  time: {
    name: 'Quality Time',
    icon: '⏳',
    description: 'Your heart craves undivided presence, eye contact, and shared activities where phones are tucked away and you are genuinely together.',
    partnerTip: 'Plan distraction-free dates. Put your phone on "Do Not Disturb" during meals and ask open-ended questions about their world.',
  },
  touch: {
    name: 'Physical Touch',
    icon: '🫂',
    description: 'You feel most secure and connected through non-verbal physical affection: holding hands, cuddles, forehead kisses, and comforting embraces.',
    partnerTip: 'Incorporate casual touch into daily routines: a gentle touch on the back while walking by, holding hands while driving, and 20-second hugs.',
  },
};

export const LoveLanguageTestTool: React.FC<LoveLanguageTestToolProps> = ({ onShare }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [tallies, setTallies] = useState<Record<LanguageKey, number>>({
    words: 0,
    service: 0,
    gifts: 0,
    time: 0,
    touch: 0,
  });
  const [answersCount, setAnswersCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleSelectOption = (lang: LanguageKey) => {
    setTallies((prev) => ({
      ...prev,
      [lang]: prev[lang] + 1,
    }));
    setAnswersCount((prev) => prev + 1);
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const isCompleted = answersCount === QUESTIONS.length;

  // Calculate percentages
  const sortedLanguages = (Object.keys(tallies) as LanguageKey[])
    .map((k) => ({
      key: k,
      name: LANGUAGE_DETAILS[k].name,
      icon: LANGUAGE_DETAILS[k].icon,
      count: tallies[k],
      percent: Math.round((tallies[k] / QUESTIONS.length) * 100),
      details: LANGUAGE_DETAILS[k],
    }))
    .sort((a, b) => b.count - a.count);

  const primary = sortedLanguages[0];
  const secondary = sortedLanguages[1];

  const handleReset = () => {
    setCurrentIdx(0);
    setAnswersCount(0);
    setTallies({ words: 0, service: 0, gifts: 0, time: 0, touch: 0 });
  };

  const handleCopy = async () => {
    const text = `💖 My Love Language Profile: Primary is ${primary.name} (${primary.percent}%), Secondary is ${secondary.name} (${secondary.percent}%).\nTake your free 5 Love Languages test: https://lovescoretest.com/#/tool/love-language-test`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerShare = () => {
    onShare({
      title: `Love Language Test: My Primary is ${primary.name}!`,
      text: `I took the Love Language Test on LoveScoreTest.com! My Primary is ${primary.name} (${primary.percent}%) and Secondary is ${secondary.name} (${secondary.percent}%). Discover yours!`,
      url: 'https://lovescoretest.com/#/tool/love-language-test',
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-6 md:p-8 shadow-xl shadow-purple-500/5 relative overflow-hidden">
        {!isCompleted ? (
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              <span className="uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Love Language Test • Scenario {currentIdx + 1} of {QUESTIONS.length}
              </span>
              <span>{Math.round(((currentIdx) / QUESTIONS.length) * 100)}%</span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <div className="mb-6 animate-in fade-in duration-200">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {QUESTIONS[currentIdx].question}
              </h3>
            </div>

            <div className="space-y-3">
              {QUESTIONS[currentIdx].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(opt.lang)}
                  className="w-full text-left p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-purple-50/60 dark:hover:bg-purple-950/30 hover:border-purple-300 dark:hover:border-purple-600 transition-all text-sm font-medium text-slate-800 dark:text-slate-200 group flex items-start gap-3 cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-purple-500 group-hover:bg-purple-500 group-hover:text-white flex items-center justify-center text-xs font-semibold text-slate-500 dark:text-slate-400 flex-shrink-0 transition-colors mt-0.5">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 mb-2">
                <MessageCircleHeart className="w-7 h-7" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                Your Affection Dialect
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {primary.details.icon} {primary.name}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Primary ({primary.percent}%) • Secondary: {secondary.name} ({secondary.percent}%)
              </p>
            </div>

            {/* Breakdown Bars */}
            <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <h4 className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                Complete 5 Languages Breakdown
              </h4>
              {sortedLanguages.map((item) => (
                <div key={item.key}>
                  <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span className="flex items-center gap-1.5">
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    <span className="font-bold">{item.percent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Partner Cheat Sheet */}
            <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Cheat Sheet for Your Partner:
              </span>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                {primary.details.description}
              </p>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900 border border-purple-100 dark:border-purple-900/30 text-xs text-purple-900 dark:text-purple-200 font-medium">
                👉 <strong>How to love you best:</strong> {primary.details.partnerTip}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={triggerShare}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 hover:opacity-95 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share My Language</span>
              </button>

              <button
                onClick={handleCopy}
                className="py-3 px-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>

              <button
                onClick={handleReset}
                className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
