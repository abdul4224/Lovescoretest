import React, { useState } from 'react';
import { Users, Sparkles, RotateCcw, Share2, Copy, Check, Heart, Trophy } from 'lucide-react';
import { ShareData } from '../../types';

interface FriendshipCompatibilityToolProps {
  onShare: (data: ShareData) => void;
}

const QUESTIONS = [
  {
    id: 1,
    title: 'Late Night Emergency & Good News',
    question: 'If something huge happens at 2 AM (good or bad), would you call or text them without hesitation?',
    options: [
      { text: 'Yes, absolutely! They are the first person on my speed dial no matter the hour', score: 10 },
      { text: 'Yes, but I would probably text first in case they are sleeping', score: 8 },
      { text: 'Only if it is a genuine emergency; otherwise I’d wait until morning', score: 6 },
      { text: 'Probably not; we aren’t quite at the late-night crisis level yet', score: 4 },
    ],
  },
  {
    id: 2,
    title: 'Humor & Banter',
    question: 'What is your shared humor and inside-joke chemistry like?',
    options: [
      { text: 'We have our own unspoken language; one glance across the room makes us burst out laughing', score: 10 },
      { text: 'Great banter; we send each other memes constantly and laugh a lot', score: 8 },
      { text: 'Pleasant and funny, though we occasionally have different senses of humor', score: 6 },
      { text: 'Mostly serious or cordial; we don’t share a ton of inside jokes', score: 4 },
    ],
  },
  {
    id: 3,
    title: 'Time Apart & Distance',
    question: 'If life gets busy and you don’t speak for 3 or 4 weeks, what happens when you reconnect?',
    options: [
      { text: 'Zero awkwardness; we pick up right where we left off as if no time passed at all', score: 10 },
      { text: 'We warm back up quickly after a 10-minute catchup', score: 8 },
      { text: 'One of us feels slightly guilty or apologetic for the distance', score: 6 },
      { text: 'The bond feels noticeably distant and requires effort to rebuild', score: 4 },
    ],
  },
  {
    id: 4,
    title: 'Constructive Honesty',
    question: 'Can you give each other 100% honest advice (even if it is tough to hear) without ruining the friendship?',
    options: [
      { text: 'Yes! We love each other enough to tell the truth with compassion', score: 10 },
      { text: 'Mostly, though we soften the edges to avoid hurting feelings', score: 8 },
      { text: 'We tend to avoid giving critical feedback to keep things peaceful', score: 6 },
      { text: 'Honest feedback usually sparks defensiveness between us', score: 4 },
    ],
  },
  {
    id: 5,
    title: 'Celebrating Big Wins',
    question: 'When one of you achieves something amazing (dream job, promotion, great date), how does the other react?',
    options: [
      { text: 'Pure unadulterated joy! We hype each other up louder than anyone else', score: 10 },
      { text: 'Very happy and supportive, with sincere congratulations', score: 8 },
      { text: 'Supportive, though there might be a tiny secret flicker of personal comparison', score: 6 },
      { text: 'A bit reserved or indifferent depending on the day', score: 4 },
    ],
  },
  {
    id: 6,
    title: 'Being Completely Yourself',
    question: 'Can you be messy, unfiltered, unbrushed, and totally weird around them?',
    options: [
      { text: '100%! They’ve seen my weirdest, most unglamorous self and love me more for it', score: 10 },
      { text: 'Almost completely; I feel very relaxed around them', score: 8 },
      { text: 'I still like to keep my guard up slightly and put my best foot forward', score: 6 },
      { text: 'I feel I have to act a certain way to keep their approval', score: 4 },
    ],
  },
];

export const FriendshipCompatibilityTool: React.FC<FriendshipCompatibilityToolProps> = ({ onShare }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const handleSelectOption = (score: number) => {
    const updated = [...answers, score];
    setAnswers(updated);
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const isCompleted = answers.length === QUESTIONS.length;
  const totalPoints = answers.reduce((acc, curr) => acc + curr, 0);
  const scorePercent = Math.round((totalPoints / (QUESTIONS.length * 10)) * 100);

  const getArchetype = () => {
    if (scorePercent >= 90) {
      return {
        title: 'Soul Siblings / Ride-or-Die BFFs',
        desc: 'You share the rare golden friendship that withstands distance, time, and life changes. You celebrate each other without envy and offer an emotional sanctuary.',
        tip: 'Send them a random message today reminding them how grateful you are for their presence in your life!',
      };
    } else if (scorePercent >= 75) {
      return {
        title: 'Anchor Friends',
        desc: 'A deeply dependable, warm, and loyal friendship. You have great trust, lots of shared laughs, and genuine respect for each other’s journeys.',
        tip: 'Plan an uninterrupted coffee or weekend catch-up to share the deeper things going on in your worlds.',
      };
    } else if (scorePercent >= 60) {
      return {
        title: 'Adventure & Fun Comrades',
        desc: 'A delightful, high-energy friendship built around shared humor, activities, and good times. Ready to deepen into lifelong trust with a little more vulnerability.',
        tip: 'Try sharing a personal goal or recent struggle next time you hang out to build even stronger emotional trust.',
      };
    } else {
      return {
        title: 'Growing Companions',
        desc: 'An evolving friendship with great potential. You enjoy each other’s company and are gradually discovering your mutual rhythm.',
        tip: 'Find a new shared hobby or weekly ritual (like a podcast club or gym session) to deepen your bond naturally.',
      };
    }
  };

  const archetype = getArchetype();

  const handleReset = () => {
    setCurrentIdx(0);
    setAnswers([]);
  };

  const handleCopy = async () => {
    const text = `👯 Friendship Compatibility Score: ${scorePercent}% (${archetype.title})\n${archetype.desc}\nCheck your friendship bond free: https://lovescoretest.com/#/tool/friendship-compatibility-test`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerShare = () => {
    onShare({
      title: `Friendship Compatibility Test: ${scorePercent}%`,
      text: `We scored ${scorePercent}% (${archetype.title}) on the Friendship Compatibility Test on LoveScoreTest.com!`,
      url: 'https://lovescoretest.com/#/tool/friendship-compatibility-test',
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 p-6 md:p-8 shadow-xl shadow-blue-500/5 relative overflow-hidden">
        {!isCompleted ? (
          <div>
            {/* Header / Progress */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              <span className="uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Question {currentIdx + 1} of {QUESTIONS.length}
              </span>
              <span>{Math.round(((currentIdx) / QUESTIONS.length) * 100)}% Complete</span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <div className="mb-6 animate-in fade-in duration-200">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 text-[11px] font-semibold mb-2">
                {QUESTIONS[currentIdx].title}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {QUESTIONS[currentIdx].question}
              </h3>
            </div>

            <div className="space-y-3">
              {QUESTIONS[currentIdx].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(opt.score)}
                  className="w-full text-left p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-blue-50/60 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-600 transition-all text-sm font-medium text-slate-800 dark:text-slate-200 group flex items-start gap-3 cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white flex items-center justify-center text-xs font-semibold text-slate-500 dark:text-slate-400 flex-shrink-0 transition-colors mt-0.5">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 mb-1">
              <Users className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Friendship Bond Calculated
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                {scorePercent}% Platonic Synergy
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold mt-2">
                <Trophy className="w-3.5 h-3.5 text-blue-600" />
                <span>Archetype: {archetype.title}</span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
              {archetype.desc}
            </p>

            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-left">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> Friendship Habit Recommendation:
              </span>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {archetype.tip}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={triggerShare}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 hover:opacity-95 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share with Friend</span>
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
