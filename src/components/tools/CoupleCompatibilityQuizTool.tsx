import React, { useState } from 'react';
import { HeartHandshake, Sparkles, RotateCcw, Share2, Copy, Check, Award, Flame } from 'lucide-react';
import { ShareData } from '../../types';

interface CoupleCompatibilityQuizToolProps {
  onShare: (data: ShareData) => void;
}

const QUESTIONS = [
  {
    id: 1,
    question: 'How often do you exchange unexpected micro-affections (spontaneous hug, sweet text, playful wink)?',
    options: [
      { text: 'Multiple times every day; it is second nature to us', score: 10 },
      { text: 'A few times a week, especially when we are in a relaxed mood', score: 8 },
      { text: 'Mostly reserved for date nights or greetings/goodbyes', score: 6 },
      { text: 'Rarely lately; we have gotten a bit caught up in work/chores', score: 4 },
    ],
  },
  {
    id: 2,
    question: 'When an argument gets heated, how quickly can one of you de-escalate with humor or a repair gesture?',
    options: [
      { text: 'Very fast; we can break the tension with a gentle touch or soft word', score: 10 },
      { text: 'Usually within an hour once we take a brief breath', score: 8 },
      { text: 'It takes several hours of quiet before one of us breaks the ice', score: 6 },
      { text: 'We tend to hold onto pride and let tension linger for days', score: 4 },
    ],
  },
  {
    id: 3,
    question: 'Do you feel you can express your deepest insecurities without fear of having them weaponized later?',
    options: [
      { text: '100% emotional safety; our vulnerable secrets are completely protected', score: 10 },
      { text: 'Mostly safe, with very few exceptions', score: 8 },
      { text: 'I keep a few tender things to myself just to be cautious', score: 6 },
      { text: 'Past experiences make me hesitant to be fully raw', score: 4 },
    ],
  },
  {
    id: 4,
    question: 'How do you both handle household tasks, bills, and everyday life responsibilities?',
    options: [
      { text: 'True equal partnership; we proactively help each other without nagging', score: 10 },
      { text: 'Fairly well balanced, with occasional gentle reminders', score: 8 },
      { text: 'One partner carries noticeably more of the mental or physical load', score: 6 },
      { text: 'Daily responsibilities are a recurring friction point', score: 4 },
    ],
  },
  {
    id: 5,
    question: 'How aligned are your desires for romance, physical intimacy, and affectionate closeness?',
    options: [
      { text: 'Our natural rhythms complement each other beautifully and we communicate openly', score: 10 },
      { text: 'Great connection, and we talk comfortably when rhythms shift', score: 8 },
      { text: 'One of us desires more frequency, but we make loving efforts', score: 6 },
      { text: 'It feels like a sensitive or slightly awkward topic to bring up', score: 4 },
    ],
  },
  {
    id: 6,
    question: 'How do you support each other’s personal growth, career aspirations, and individual dreams?',
    options: [
      { text: 'We are each other’s biggest champion and cheerleader in life', score: 10 },
      { text: 'Very supportive, as long as it doesn’t disrupt our shared routine too much', score: 8 },
      { text: 'Supportive in theory, but life logistics sometimes get in the way', score: 6 },
      { text: 'Sometimes individual ambitions feel like they compete with the relationship', score: 4 },
    ],
  },
  {
    id: 7,
    question: 'If you were stranded together on an unexpected 10-hour airport delay, what would happen?',
    options: [
      { text: 'We’d turn it into a hilarious date, find snacks, play people-watching games, and laugh', score: 10 },
      { text: 'A bit tired at first, but we’d pass the time pleasantly as a team', score: 8 },
      { text: 'We’d probably put our headphones on and scroll independently', score: 6 },
      { text: 'Boredom and stress would likely make us bicker', score: 4 },
    ],
  },
];

export const CoupleCompatibilityQuizTool: React.FC<CoupleCompatibilityQuizToolProps> = ({ onShare }) => {
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

  const getSuperpower = () => {
    if (scorePercent >= 88) {
      return {
        title: 'Unshakable Power Couple',
        grade: 'A+ (Golden Tier)',
        superpower: 'Emotional Telepathy & Resilient Teamwork',
        description: 'You have mastered the art of being both deeply in love and genuine best friends. Your bond radiates security, mutual adoration, and seamless partnership.',
        dateIdea: 'Plan a nostalgic "First Date Re-enactment" night to celebrate how far your love story has flourished.',
      };
    } else if (scorePercent >= 74) {
      return {
        title: 'Warm & Dedicated Partners',
        grade: 'A (Strong Tier)',
        superpower: 'Thoughtful Compassion & Reliable Anchor',
        description: 'A deeply sweet, respectful, and comforting bond. You have weathered life’s routines with grace and loyalty.',
        dateIdea: 'Book an unexpected cooking class or weekend cabin escape without screens to boost spontaneous novelty.',
      };
    } else if (scorePercent >= 60) {
      return {
        title: 'Passionate Work-in-Progress',
        grade: 'B+ (Growth Tier)',
        superpower: 'Authentic Spark & Untapped Potential',
        description: 'You care for each other genuinely, but modern stress occasionally crowds out romantic connection.',
        dateIdea: 'Commit to a 15-minute daily "Decompression Tea" where neither person talks about chores or work.',
      };
    } else {
      return {
        title: 'Exploring Foundations',
        grade: 'B (Exploration Tier)',
        superpower: 'Honesty About Needed Repairs',
        description: 'Your connection has meaningful opportunities for healing, clearer boundaries, and renewed shared joy.',
        dateIdea: 'Have an open, non-judgmental "State of the Union" conversation over your partner’s favorite dessert.',
      };
    }
  };

  const badge = getSuperpower();

  const handleReset = () => {
    setCurrentIdx(0);
    setAnswers([]);
  };

  const handleCopy = async () => {
    const text = `💑 Couple Compatibility Quiz: ${scorePercent}% (${badge.title} - ${badge.grade})\nSuperpower: ${badge.superpower}\nTake the test free: https://lovescoretest.com/#/tool/couple-compatibility-quiz`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerShare = () => {
    onShare({
      title: `Couple Compatibility Quiz Result: ${scorePercent}%`,
      text: `We scored ${scorePercent}% (${badge.title}) on the Couple Compatibility Quiz on LoveScoreTest.com!`,
      url: 'https://lovescoretest.com/#/tool/couple-compatibility-quiz',
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-pink-100 dark:border-slate-800 p-6 md:p-8 shadow-xl shadow-pink-500/5 relative overflow-hidden">
        {!isCompleted ? (
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              <span className="uppercase tracking-wider text-pink-600 dark:text-pink-400">
                Couple Quiz • Question {currentIdx + 1} of {QUESTIONS.length}
              </span>
              <span>{Math.round(((currentIdx) / QUESTIONS.length) * 100)}%</span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-full transition-all duration-300"
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
                  onClick={() => handleSelectOption(opt.score)}
                  className="w-full text-left p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-pink-50/60 dark:hover:bg-pink-950/30 hover:border-pink-300 dark:hover:border-pink-600 transition-all text-sm font-medium text-slate-800 dark:text-slate-200 group flex items-start gap-3 cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-pink-500 group-hover:bg-pink-500 group-hover:text-white flex items-center justify-center text-xs font-semibold text-slate-500 dark:text-slate-400 flex-shrink-0 transition-colors mt-0.5">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25 mb-1">
              <HeartHandshake className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                Couple Quiz Bond Score
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                {scorePercent}% Bond Strength
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold mt-2">
                <Award className="w-4 h-4 text-pink-500" />
                <span>{badge.title} ({badge.grade})</span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
              {badge.description}
            </p>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50/80 to-purple-50/80 dark:from-pink-950/30 dark:to-purple-950/30 border border-pink-100 dark:border-pink-900/40 text-left">
              <span className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500" /> Couple Superpower:
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {badge.superpower}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-left">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-500" /> Recommended Date Night Idea:
              </span>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {badge.dateIdea}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={triggerShare}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 hover:opacity-95 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Couple Result</span>
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
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
