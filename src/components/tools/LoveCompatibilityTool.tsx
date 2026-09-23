import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, Share2, Copy, Check, HeartHandshake } from 'lucide-react';
import { ShareData } from '../../types';

interface LoveCompatibilityToolProps {
  onShare: (data: ShareData) => void;
}

const QUESTIONS = [
  {
    id: 1,
    category: 'Emotional',
    question: 'When one of you is stressed or overwhelmed, how do you usually respond to each other?',
    options: [
      { text: 'We instinctively listen, validate feelings, and give comforting hugs', score: 10 },
      { text: 'One of us problem-solves right away while the other needs quiet time first', score: 7 },
      { text: 'We tend to get a bit tense or accidentally withdraw until stress passes', score: 5 },
      { text: 'We are still learning what each other needs during high stress', score: 6 },
    ],
  },
  {
    id: 2,
    category: 'Communication',
    question: 'How do you both handle disagreements or sensitive issues?',
    options: [
      { text: 'We talk it out calmly, avoid insults, and focus on resolving the issue together', score: 10 },
      { text: 'We take a brief cooling-off pause, then come back and talk honestly', score: 9 },
      { text: 'One of us wants to talk immediately while the other shuts down or retreats', score: 6 },
      { text: 'Disagreements sometimes turn into lingering silent treatments', score: 4 },
    ],
  },
  {
    id: 3,
    category: 'Future & Values',
    question: 'How aligned are your 5-year visions regarding career, home, and finances?',
    options: [
      { text: 'Extremely aligned; we share almost identical priorities and life dreams', score: 10 },
      { text: 'Largely aligned on the big pillars, with minor differences we happily balance', score: 8 },
      { text: 'We haven’t talked deeply about the future yet, but we are open-minded', score: 7 },
      { text: 'We have noticeably different timelines or conflicting geographic dreams', score: 5 },
    ],
  },
  {
    id: 4,
    category: 'Quality Time & Romance',
    question: 'How does your romantic spark feel on an ordinary weekday evening?',
    options: [
      { text: 'Vibrant and affectionate; we find little ways to laugh, tease, and connect daily', score: 10 },
      { text: 'Comfortable and peaceful; we enjoy simple cozy moments together', score: 8 },
      { text: 'Sometimes distracted by work, chores, and screens, but we love date nights', score: 7 },
      { text: 'We feel like we’ve gotten stuck in a repetitive routine lately', score: 5 },
    ],
  },
  {
    id: 5,
    category: 'Financial Harmony',
    question: 'When it comes to spending money, saving, and treating yourselves:',
    options: [
      { text: 'We are totally transparent and hold very similar financial philosophies', score: 10 },
      { text: 'One is slightly more cautious, the other more generous, but it balances well', score: 8 },
      { text: 'We keep our finances separate and avoid interfering in personal choices', score: 7 },
      { text: 'Money conversations frequently provoke quiet anxiety or tension', score: 4 },
    ],
  },
  {
    id: 6,
    category: 'Independence & Freedom',
    question: 'How do you both balance couple time with personal friendships and solo hobbies?',
    options: [
      { text: 'Total trust; we cheer on each other’s solo passions and friends wholeheartedly', score: 10 },
      { text: 'Great balance, with occasional gentle check-ins when schedules get busy', score: 8 },
      { text: 'We do almost everything together and rarely spend time apart', score: 7 },
      { text: 'One partner sometimes feels neglected or smothered by social obligations', score: 5 },
    ],
  },
  {
    id: 7,
    category: 'Vulnerability & Trust',
    question: 'Can you show your true flaws, fears, and goofy moments without feeling judged?',
    options: [
      { text: '100% yes; we feel safer with each other than anyone else on earth', score: 10 },
      { text: 'Mostly yes; we are steadily building that level of deep trust', score: 8 },
      { text: 'Sometimes we hold back vulnerable thoughts to avoid being seen as needy', score: 6 },
      { text: 'We still keep some emotional walls up out of past relationship scars', score: 5 },
    ],
  },
  {
    id: 8,
    category: 'Team Mentality',
    question: 'When unexpected bad luck strikes (car breaks down, travel delayed), how is your vibe?',
    options: [
      { text: 'We turn into a power team, laugh through the absurdity, and solve it together', score: 10 },
      { text: 'A little initial grumbling, then we team up and handle it like champions', score: 8 },
      { text: 'Stress runs high and we occasionally snap before calming down', score: 6 },
      { text: 'We tend to play the blame game during unexpected stress', score: 4 },
    ],
  },
];

export const LoveCompatibilityTool: React.FC<LoveCompatibilityToolProps> = ({ onShare }) => {
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
  const maxPoints = QUESTIONS.length * 10;
  const scorePercent = Math.round((totalPoints / maxPoints) * 100);

  const getResultsReport = () => {
    if (scorePercent >= 88) {
      return {
        level: 'Exceptional Soul Synergy (Grade: A+)',
        summary: 'Your relationship demonstrates elite communication, deep emotional safety, and shared vision.',
        strengths: ['Unconditional vulnerability & trust', 'Playful resilience during stressful times', 'Unified future priorities and team-first mindset'],
        growthTip: 'Keep celebrating the little things! Your bond is a masterclass in modern healthy partnership.',
      };
    } else if (scorePercent >= 75) {
      return {
        level: 'Harmonious & Thriving (Grade: A)',
        summary: 'You share a solid, affectionate foundation with wonderful respect and emotional warmth.',
        strengths: ['Thoughtful conflict recovery', 'Strong genuine mutual attraction', 'Healthy individual respect'],
        growthTip: 'Carve out regular screen-free deep talk nights to share ongoing dreams as you both evolve.',
      };
    } else if (scorePercent >= 60) {
      return {
        level: 'High Potential with Growth Zones (Grade: B+)',
        summary: 'You have genuine sparks and care for each other, with distinct opportunities to align your rhythms.',
        strengths: ['Authentic chemistry and mutual affection', 'Willingness to spend time together'],
        growthTip: 'Focus on establishing a shared cooling-off protocol during disagreements so small spats don’t linger.',
      };
    } else {
      return {
        level: 'Developing Dynamic (Grade: B)',
        summary: 'Your connection is in an exploratory phase where intentional curiosity can unlock major intimacy.',
        strengths: ['Honesty about current friction points', 'Opportunity to learn each other’s true needs'],
        growthTip: 'Practice the "Ask, Don’t Assume" rule: check in on your partner’s feelings directly rather than guessing.',
      };
    }
  };

  const report = getResultsReport();

  const handleReset = () => {
    setCurrentIdx(0);
    setAnswers([]);
  };

  const handleCopy = async () => {
    const text = `✨ Love Compatibility Test: ${scorePercent}% (${report.level})\n${report.summary}\nTest your relationship free: https://lovescoretest.com/#/tool/love-compatibility-test`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerShare = () => {
    onShare({
      title: `Love Compatibility Test Result: ${scorePercent}%`,
      text: `We took the Love Compatibility Test on LoveScoreTest.com and scored ${scorePercent}%! ${report.level}`,
      url: 'https://lovescoretest.com/#/tool/love-compatibility-test',
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-6 md:p-8 shadow-xl shadow-purple-500/5 relative overflow-hidden">
        {!isCompleted ? (
          <div>
            {/* Progress Header */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              <span className="uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Question {currentIdx + 1} of {QUESTIONS.length}
              </span>
              <span>{Math.round(((currentIdx) / QUESTIONS.length) * 100)}% Completed</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="mb-6 animate-in fade-in duration-200">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 text-[11px] font-semibold mb-2">
                {QUESTIONS[currentIdx].category}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {QUESTIONS[currentIdx].question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {QUESTIONS[currentIdx].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(opt.score)}
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
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 mb-1">
              <Sparkles className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Compatibility Assessment Complete
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {scorePercent}% Overall Compatibility
              </h2>
              <p className="text-base font-bold text-purple-600 dark:text-purple-400 mt-1">
                {report.level}
              </p>
            </div>

            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
              {report.summary}
            </p>

            {/* Strengths List */}
            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 text-left">
              <h4 className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4" /> Core Relationship Strengths
              </h4>
              <ul className="space-y-1.5">
                {report.strengths.map((str, sIdx) => (
                  <li key={sIdx} className="text-xs md:text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth Tip */}
            <div className="p-4 rounded-2xl bg-pink-50/60 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/50 text-left">
              <span className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider block mb-1">
                🌱 Growth Opportunity:
              </span>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {report.growthTip}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={triggerShare}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 hover:opacity-95 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Compatibility</span>
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
                <span>Retake Test</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
