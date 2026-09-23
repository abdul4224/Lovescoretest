import React, { useState } from 'react';
import { HelpCircle, RotateCcw, Share2, Copy, Check, Trophy, Sparkles } from 'lucide-react';
import { ShareData } from '../../types';

interface PartnerKnowledgeQuizToolProps {
  onShare: (data: ShareData) => void;
}

const QUESTIONS = [
  {
    id: 1,
    question: 'What is your partner’s ultimate comfort food after a rough day?',
    hints: ['Pizza, pasta, tacos, warm soup, ice cream, or homemade breakfast?'],
  },
  {
    id: 2,
    question: 'If they won an all-expenses-paid trip tomorrow, where would they choose to go?',
    hints: ['A secluded tropical beach, bustling historic European city, snowy mountain cabin, or Japanese countryside?'],
  },
  {
    id: 3,
    question: 'How do they prefer to take their coffee, tea, or morning beverage?',
    hints: ['Black, extra milk & sweet, iced matcha, herbal infusion, or fresh juice?'],
  },
  {
    id: 4,
    question: 'What is their single biggest everyday pet peeve or annoyance?',
    hints: ['Slow walkers, loud chewing, untidy counters, being late, or bad drivers?'],
  },
  {
    id: 5,
    question: 'Are they naturally a morning lark, an afternoon cruiser, or a night owl?',
    hints: ['When is their brain operating at its highest creative energy?'],
  },
  {
    id: 6,
    question: 'What is a movie, book, or band they are secretly obsessed with or nostalgic about?',
    hints: ['Childhood favorite animated movie, classic 90s/2000s band, or guilty pleasure binge show?'],
  },
  {
    id: 7,
    question: 'When they are feeling anxious or sad, what comforts them best?',
    hints: ['Quiet physical hugs, venting out loud without advice, humor and silly distraction, or solitary recharge time?'],
  },
  {
    id: 8,
    question: 'What is a quirky hidden talent, weird party trick, or unusual fact about them?',
    hints: ['Double-jointed, perfect accent impressions, obscure trivia knowledge, or secret video game speedrunning?'],
  },
  {
    id: 9,
    question: 'What was their dream job or aspiration when they were 8 or 9 years old?',
    hints: ['Astronaut, veterinarian, marine biologist, rock star, teacher, or inventor?'],
  },
  {
    id: 10,
    question: 'What is their biggest personal goal or dream they want to accomplish this year?',
    hints: ['Career breakthrough, running a marathon, creative project, travel dream, or financial milestone?'],
  },
];

export const PartnerKnowledgeQuizTool: React.FC<PartnerKnowledgeQuizToolProps> = ({ onShare }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [partnerName, setPartnerName] = useState('My Partner');
  const [scores, setScores] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Rate your knowledge for each: 10 = I know this 100%, 5 = Fair guess, 0 = I need to ask them tonight!
  const handleScore = (pts: number) => {
    const updated = [...scores, pts];
    setScores(updated);
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const totalPoints = scores.reduce((a, b) => a + b, 0);
  const scorePercent = Math.round((totalPoints / (QUESTIONS.length * 10)) * 100);

  const getPartnerIQ = () => {
    if (scorePercent >= 85) {
      return {
        title: 'Partner Mind-Reader (Genius IQ)',
        verdict: `You know ${partnerName} inside and out! Your emotional radar and attention to detail are world-class.`,
        funNote: 'You could practically pass their identity verification security questions with ease!',
      };
    } else if (scorePercent >= 70) {
      return {
        title: 'Attuned Devotee (High IQ)',
        verdict: `You have an impressive grasp of ${partnerName}’s world and heartfelt habits!`,
        funNote: 'A couple of mysteries remain—which makes date night talks all the more fascinating!',
      };
    } else {
      return {
        title: 'Curious Explorer (Great Potential)',
        verdict: `You have a fun opportunity to discover exciting new dimensions of ${partnerName}!`,
        funNote: 'Take this quiz together tonight over takeout and let them reveal the answers firsthand!',
      };
    }
  };

  const iq = getPartnerIQ();

  const handleReset = () => {
    setCurrentIdx(0);
    setScores([]);
    setIsCompleted(false);
  };

  const handleCopy = async () => {
    const text = `🎯 How Well Do You Know Your Partner?: I scored ${scorePercent}% on ${partnerName}! (${iq.title})\nTest your partner trivia knowledge: https://lovescoretest.com/#/tool/how-well-do-you-know-your-partner`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerShare = () => {
    onShare({
      title: `How Well Do You Know Your Partner? - ${scorePercent}% Score`,
      text: `I scored ${scorePercent}% (${iq.title}) testing how well I know ${partnerName} on LoveScoreTest.com!`,
      url: 'https://lovescoretest.com/#/tool/how-well-do-you-know-your-partner',
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-pink-100 dark:border-slate-800 p-6 md:p-8 shadow-xl shadow-pink-500/5 relative overflow-hidden">
        {!isCompleted ? (
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              <span className="uppercase tracking-wider text-pink-600 dark:text-pink-400">
                Question {currentIdx + 1} of {QUESTIONS.length}
              </span>
              <span>{Math.round((currentIdx / QUESTIONS.length) * 100)}%</span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            {currentIdx === 0 && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Who are you taking this quiz about?
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Partner's name"
                  className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {QUESTIONS[currentIdx].question}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                {QUESTIONS[currentIdx].hints[0]}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/70 mb-4 text-xs text-slate-600 dark:text-slate-300">
              💬 <em>Think of your answer or say it out loud to {partnerName}! Then rate your confidence below:</em>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleScore(10)}
                className="p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 font-semibold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <span className="text-lg">🎯</span>
                <span>I know this 100%!</span>
                <span className="text-[10px] opacity-75">(10 pts)</span>
              </button>

              <button
                onClick={() => handleScore(5)}
                className="p-3.5 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-100/70 dark:hover:bg-amber-900/40 text-amber-800 dark:text-amber-200 font-semibold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <span className="text-lg">🤔</span>
                <span>I have a solid guess</span>
                <span className="text-[10px] opacity-75">(5 pts)</span>
              </button>

              <button
                onClick={() => handleScore(0)}
                className="p-3.5 rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100/70 dark:hover:bg-rose-900/40 text-rose-800 dark:text-rose-200 font-semibold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <span className="text-lg">❓</span>
                <span>Need to ask them!</span>
                <span className="text-[10px] opacity-75">(0 pts)</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25 mb-1">
              <Trophy className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                Partner Knowledge Challenge
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                {scorePercent}% Knowledge Score
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold mt-2">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>Title: {iq.title}</span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
              {iq.verdict}
            </p>

            <div className="p-4 rounded-2xl bg-pink-50/60 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/50 text-left">
              <span className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider block mb-1">
                💡 Date Night Idea:
              </span>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {iq.funNote} Hand your phone to {partnerName} now and let them take the quiz about you!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={triggerShare}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 hover:opacity-95 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Partner Score</span>
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
                <span>Play Again</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
