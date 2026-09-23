import React, { useMemo, useState } from 'react';
import {
  Activity,
  Flag,
  Globe,
  Heart,
  HeartHandshake,
  KeyRound,
  Milestone,
  RotateCcw,
  Share2,
  ShieldAlert,
  Sparkles,
  UserCheck,
  Zap,
} from 'lucide-react';
import { ToolItem, ShareData } from '../../types';

interface Phase3ToolProps {
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}

type AnswerMap = Record<number, number>;

const clampScore = (score: number) => Math.max(0, Math.min(100, Math.round(score)));

const getScoreLabel = (score: number): string => {
  if (score >= 85) return 'Very Strong Match';
  if (score >= 70) return 'Strong Match';
  if (score >= 55) return 'Balanced Match';
  if (score >= 40) return 'Room to Explore';
  return 'Good Opportunity to Grow';
};

const FIVE_POINT: { value: number; label: string }[] = [
  { value: 1, label: 'Strongly No' },
  { value: 2, label: 'Mostly No' },
  { value: 3, label: 'Sometimes' },
  { value: 4, label: 'Mostly Yes' },
  { value: 5, label: 'Strongly Yes' },
];

const ShareButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-xl bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 font-bold text-sm transition-colors inline-flex items-center justify-center gap-2"
  >
    <Share2 className="w-4 h-4" />
    Share Result
  </button>
);

const ResetButton: React.FC<{ onClick: () => void; label?: string }> = ({
  onClick,
  label = 'Try Again',
}) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-3 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center justify-center gap-2"
  >
    <RotateCcw className="w-4 h-4" />
    {label}
  </button>
);

const ToolShell: React.FC<{
  title: string;
  description: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, description, icon, children }) => (
  <div className="w-full max-w-2xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-pink-100 dark:border-slate-800 p-5 sm:p-8 shadow-lg shadow-pink-500/5">
    <div className="flex items-start gap-3 mb-7">
      <div className="w-11 h-11 shrink-0 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 flex items-center justify-center">
        {icon ?? <Heart className="w-5 h-5" />}
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>
      </div>
    </div>
    {children}
  </div>
);

const ResultCard: React.FC<{
  score: number;
  label?: string;
  message: string;
  onShare: () => void;
  onReset: () => void;
}> = ({ score, label, message, onShare, onReset }) => (
  <div className="text-center mt-7 rounded-2xl border border-pink-100 dark:border-slate-800 p-6">
    <div className="w-16 h-16 rounded-3xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 flex items-center justify-center mx-auto mb-5">
      <Sparkles className="w-8 h-8" />
    </div>
    <p className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-2">Your Result</p>
    <h2 className="text-4xl font-black text-slate-900 dark:text-white">{score}%</h2>
    {label && (
      <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400 mt-2">{label}</h3>
    )}
    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto mt-4">
      {message}
    </p>
    <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
      <ShareButton onClick={onShare} />
      <ResetButton onClick={onReset} />
    </div>
  </div>
);

const RatingQuestion: React.FC<{
  index: number;
  question: string;
  value?: number;
  onSelect: (value: number) => void;
  scale?: { value: number; label: string }[];
}> = ({ index, question, value, onSelect, scale = FIVE_POINT }) => (
  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-4">
      {index + 1}. {question}
    </p>
    <div className={`grid grid-cols-1 sm:grid-cols-5 gap-2`}>
      {scale.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onSelect(item.value)}
          className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition-all border ${
            value === item.value
              ? 'bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-500/20'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>
);

const ScoreBar: React.FC<{ label: string; score: number; widthClass?: string }> = ({
  label,
  score,
  widthClass = 'w-40',
}) => (
  <div className="flex items-center gap-3">
    <span className={`${widthClass} text-left text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0`}>
      {label}
    </span>
    <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
      <div className="h-full bg-pink-500 rounded-full" style={{ width: `${score}%` }} />
    </div>
    <span className="w-10 text-xs text-slate-400 text-right">{score}%</span>
  </div>
);

const PrimaryButton: React.FC<{
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ disabled, onClick, children }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
  >
    {children}
  </button>
);

// ==========================================================
// 33. Roommate & Co-Living Test
// Two-partner ordinal-distance match across 8 household
// policies. Friction categories generate a draft roommate
// agreement — not a reused lifestyle-habit quiz.
// ==========================================================

type RoommateCategory = {
  label: string;
  options: string[];
  compromise: string;
};

const ROOMMATE_CATEGORIES: RoommateCategory[] = [
  {
    label: 'Chore split',
    options: ['One person handles most', 'Fixed 50/50 task list', 'Rotate weekly', 'Keep it loose / hire help'],
    compromise: 'Write a short weekly chore board with two non-negotiable tasks each, and leave the rest flexible.',
  },
  {
    label: 'Thermostat',
    options: ['Keep it chilly', 'On the cooler side', 'On the warmer side', 'Keep it toasty'],
    compromise: 'Set common rooms in the middle range. Use a blanket, fan, or space heater in private rooms.',
  },
  {
    label: 'Bathroom mornings',
    options: ['Strict time slots', 'Stagger by 20 minutes', 'Whoever wakes first', 'No schedule at all'],
    compromise: 'Agree on a 15-minute bathroom window for the earlier riser, then swap on weekends.',
  },
  {
    label: 'Overnight guests',
    options: ['Anytime, no notice', 'Fine with a heads-up', 'Rare, planned in advance', 'Almost never'],
    compromise: 'Require 24-hour notice for overnight guests, with a monthly cap you both can live with.',
  },
  {
    label: 'Quiet hours',
    options: ['Start at 9pm', 'Start at 10pm', 'Start at 11pm', 'No quiet hours'],
    compromise: 'Set quiet hours for weeknights and keep weekends more flexible unless someone has an early morning.',
  },
  {
    label: 'Kitchen use',
    options: ['Cook and share meals', 'Shared fridge, separate meals', 'Mostly takeout', 'Fully independent kitchens'],
    compromise: 'Label two fridge shelves each and pick two shared cook-together nights per week.',
  },
  {
    label: 'Personal space',
    options: ['Need lots of solo time', 'A closed door is enough', 'Mostly shared living', 'Almost always together'],
    compromise: 'Protect one solo hour after work without taking it personally, then reconnect in the evening.',
  },
  {
    label: 'Shared expenses',
    options: ['Split every bill 50/50', 'Split by income share', 'One person covers more', 'Keep almost everything separate'],
    compromise: 'Use a shared account or app for rent/utilities, and keep personal spending fully separate.',
  },
];

export const RoommateCoLivingTool: React.FC<Phase3ToolProps> = ({ tool, onShare }) => {
  const [picksA, setPicksA] = useState<AnswerMap>({});
  const [picksB, setPicksB] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Math.min(Object.keys(picksA).length, Object.keys(picksB).length);

  const { categoryScores, overall, friction, agreement } = useMemo(() => {
    const scores = ROOMMATE_CATEGORIES.map((cat, i) => {
      if (picksA[i] === undefined || picksB[i] === undefined) return null;
      const distance = Math.abs(picksA[i] - picksB[i]);
      return clampScore(100 - distance * (100 / 3));
    });
    const valid = scores.filter((s): s is number => s !== null);
    const overallScore = valid.length ? clampScore(valid.reduce((s, v) => s + v, 0) / valid.length) : 0;
    const frictionCats = ROOMMATE_CATEGORIES.filter((_, i) => scores[i] !== null && (scores[i] as number) <= 34);
    const lines = ROOMMATE_CATEGORIES.map((cat, i) => {
      if (picksA[i] === undefined || picksB[i] === undefined) return null;
      if (picksA[i] === picksB[i]) {
        return `${cat.label}: Keep your shared default — "${cat.options[picksA[i]]}".`;
      }
      return `${cat.label}: ${cat.compromise}`;
    }).filter((line): line is string => Boolean(line));

    return { categoryScores: scores, overall: overallScore, friction: frictionCats.map((c) => c.label), agreement: lines };
  }, [picksA, picksB]);

  const reset = () => {
    setPicksA({});
    setPicksB({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Each of you picks a household policy per category. We score co-living readiness and draft a roommate agreement from the gaps."
      icon={<KeyRound className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {ROOMMATE_CATEGORIES.map((cat, index) => (
              <div key={cat.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-3">{cat.label}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { picks: picksA, setPicks: setPicksA, who: 'You' },
                    { picks: picksB, setPicks: setPicksB, who: 'Partner' },
                  ].map(({ picks, setPicks, who }) => (
                    <div key={who}>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        {who}
                      </span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {cat.options.map((opt, optIndex) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setPicks((current) => ({ ...current, [index]: optIndex }))}
                            className={`rounded-lg px-2.5 py-2 text-[11px] font-semibold border text-left transition-all ${
                              picks[index] === optIndex
                                ? 'bg-pink-600 text-white border-pink-600'
                                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <PrimaryButton disabled={answeredCount !== ROOMMATE_CATEGORIES.length} onClick={() => setShowResult(true)}>
            See Co-Living Readiness
          </PrimaryButton>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {ROOMMATE_CATEGORIES.length} policies completed for both
          </p>
        </>
      ) : (
        <div className="mt-2">
          <div className="space-y-2 mb-6">
            {ROOMMATE_CATEGORIES.map((cat, i) => (
              <ScoreBar key={cat.label} label={cat.label} score={categoryScores[i] ?? 0} />
            ))}
          </div>
          <div className="rounded-2xl border border-pink-100 dark:border-pink-900/40 bg-pink-50 dark:bg-pink-950/30 p-4 text-left mb-4">
            <p className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider mb-2">
              Draft roommate agreement
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
              {agreement.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
          <ResultCard
            score={overall}
            label={overall >= 70 ? 'Ready to Move In' : overall >= 50 ? 'Talk First, Then Move' : 'Not Lease-Ready Yet'}
            message={
              friction.length
                ? `Your Co-Living Readiness Score is ${overall}%. Biggest friction: ${friction.join(', ')}. Use the draft agreement above as a conversation script before signing anything.`
                : `Your Co-Living Readiness Score is ${overall}%. Daily household policies already line up well — still write the agreement down so small habits do not become silent resentments.`
            }
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `We scored ${overall}% co-living readiness on ${tool.title} at LoveScoreTest.com.`,
                url: window.location.href,
              })
            }
            onReset={reset}
          />
        </div>
      )}
    </ToolShell>
  );
};

// ==========================================================
// 34. Relationship Health Checkup
// Medical-style vitals: 7 markers scored independently, each
// mapped to Excellent / Good / Needs Attention / Critical.
// Boosters are prescribed from the weakest vitals — not a
// single average dressed up as a checkup.
// ==========================================================

type VitalStatus = 'Excellent' | 'Good' | 'Needs Attention' | 'Critical';

const HEALTH_VITALS: { label: string; question: string; booster: string }[] = [
  {
    label: 'Trust',
    question: 'Can you count on each other to be honest and follow through?',
    booster: 'Do a weekly 10-minute “state of us” check-in with no phones.',
  },
  {
    label: 'Appreciation',
    question: 'Do you both feel noticed and thanked for everyday effort?',
    booster: 'Name one specific thing you appreciated before going to sleep tonight.',
  },
  {
    label: 'Intimacy',
    question: 'Do you feel emotionally and physically close in a way that fits you both?',
    booster: 'Schedule one undistracted hour this week that is only for the two of you.',
  },
  {
    label: 'Communication',
    question: 'Can you raise hard topics without it exploding or shutting down?',
    booster: 'Use “When X happens, I feel Y, I need Z” once this week instead of blaming.',
  },
  {
    label: 'Fun & Play',
    question: 'Do you still laugh together and do things just because they are enjoyable?',
    booster: 'Pick a 60-minute activity neither of you has done in the last month.',
  },
  {
    label: 'Mutual Support',
    question: 'When life gets heavy, do you feel like teammates rather than opponents?',
    booster: 'Ask “comfort, advice, or a distraction?” the next time your partner is stressed.',
  },
  {
    label: 'Shared Future',
    question: 'Do you feel you are building toward a life that fits both of you?',
    booster: 'Spend 20 minutes mapping one shared goal for the next 6 months.',
  },
];

const vitalStatus = (score: number): VitalStatus => {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Needs Attention';
  return 'Critical';
};

const statusColor: Record<VitalStatus, string> = {
  Excellent: 'text-emerald-600 dark:text-emerald-400',
  Good: 'text-sky-600 dark:text-sky-400',
  'Needs Attention': 'text-amber-600 dark:text-amber-400',
  Critical: 'text-rose-600 dark:text-rose-400',
};

export const RelationshipHealthCheckupTool: React.FC<Phase3ToolProps> = ({ tool, onShare }) => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);
  const answeredCount = Object.keys(answers).length;

  const { vitals, overall, boosters } = useMemo(() => {
    const rows = HEALTH_VITALS.map((vital, i) => {
      const raw = answers[i];
      const score = typeof raw === 'number' ? clampScore((raw / 5) * 100) : 0;
      return { ...vital, score, status: vitalStatus(score) };
    });
    const overallScore = rows.length
      ? clampScore(rows.reduce((s, v) => s + v.score, 0) / rows.length)
      : 0;
    const weak = [...rows].sort((a, b) => a.score - b.score).slice(0, 2);
    return { vitals: rows, overall: overallScore, boosters: weak };
  }, [answers]);

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  const healthLabel =
    overall >= 85 ? 'Thriving' : overall >= 70 ? 'Healthy' : overall >= 50 ? 'Needs a Tune-Up' : 'Needs Care';

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Rate 7 relationship vitals. Each one gets a health status, and the weakest two receive booster activities."
      icon={<Activity className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {HEALTH_VITALS.map((vital, index) => (
              <RatingQuestion
                key={vital.label}
                index={index}
                question={`${vital.label}: ${vital.question}`}
                value={answers[index]}
                onSelect={(value) => setAnswers((current) => ({ ...current, [index]: value }))}
              />
            ))}
          </div>
          <PrimaryButton disabled={answeredCount !== HEALTH_VITALS.length} onClick={() => setShowResult(true)}>
            See Health Report
          </PrimaryButton>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {HEALTH_VITALS.length} vitals rated
          </p>
        </>
      ) : (
        <div className="mt-2">
          <div className="space-y-2 mb-6">
            {vitals.map((vital) => (
              <div key={vital.label} className="flex items-center gap-3">
                <span className="w-32 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">
                  {vital.label}
                </span>
                <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${vital.score}%` }} />
                </div>
                <span className={`w-28 text-right text-[11px] font-bold ${statusColor[vital.status]}`}>
                  {vital.status}
                </span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-pink-100 dark:border-pink-900/40 bg-pink-50 dark:bg-pink-950/30 p-4 text-left mb-2">
            <p className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider mb-2">
              Prescribed boosters
            </p>
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {boosters.map((item) => (
                <li key={item.label}>
                  <span className="font-semibold">{item.label}:</span> {item.booster}
                </li>
              ))}
            </ul>
          </div>
          <ResultCard
            score={overall}
            label={healthLabel}
            message={`Your Relationship Health Score is ${overall}%. This is a snapshot of the answers you gave today — a conversation starter, not a diagnosis. Focus the next two weeks on the booster activities for your lowest vitals.`}
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `Our relationship health checkup scored ${overall}% (${healthLabel}) on LoveScoreTest.com.`,
                url: window.location.href,
              })
            }
            onReset={reset}
          />
        </div>
      )}
    </ToolShell>
  );
};

// ==========================================================
// 35. Green Flags vs Red Flags Quiz
// Checklist (not a Likert scale). Greens add, yellow/medium/
// serious reds subtract with different weights. Two or more
// serious reds override a high green count.
// ==========================================================

type FlagKind = 'green' | 'yellow' | 'medium' | 'serious';

const FLAG_ITEMS: { text: string; kind: FlagKind; weight: number }[] = [
  { text: 'They keep promises, including small ones', kind: 'green', weight: 7 },
  { text: 'They celebrate your wins without competing', kind: 'green', weight: 7 },
  { text: 'They apologize without being asked twice', kind: 'green', weight: 7 },
  { text: 'They respect a “no” the first time', kind: 'green', weight: 7 },
  { text: 'They introduce you to people who matter to them', kind: 'green', weight: 6 },
  { text: 'They stay kind even during disagreements', kind: 'green', weight: 7 },
  { text: 'They support your friendships and independence', kind: 'green', weight: 7 },
  { text: 'They remember details you casually mentioned', kind: 'green', weight: 6 },
  { text: 'They often disappear from texts with no explanation', kind: 'yellow', weight: 6 },
  { text: 'They avoid introducing you to friends or family', kind: 'yellow', weight: 6 },
  { text: 'They get jealous of your close friends', kind: 'medium', weight: 10 },
  { text: 'They dismiss your feelings as “too sensitive”', kind: 'medium', weight: 10 },
  { text: 'They go through your phone without asking', kind: 'serious', weight: 16 },
  { text: 'They isolate you from friends or family', kind: 'serious', weight: 16 },
  { text: 'Their anger makes you walk on eggshells', kind: 'serious', weight: 16 },
  { text: 'They make you doubt your memory of events', kind: 'serious', weight: 16 },
];

export const GreenRedFlagsTool: React.FC<Phase3ToolProps> = ({ tool, onShare }) => {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const selectedCount = Object.values(checked).filter(Boolean).length;

  const result = useMemo(() => {
    const selected = FLAG_ITEMS.map((item, i) => ({ ...item, i })).filter((item) => checked[item.i]);
    const greens = selected.filter((item) => item.kind === 'green');
    const yellows = selected.filter((item) => item.kind === 'yellow');
    const mediums = selected.filter((item) => item.kind === 'medium');
    const serious = selected.filter((item) => item.kind === 'serious');
    const greenPts = greens.reduce((s, item) => s + item.weight, 0);
    const redPts =
      yellows.reduce((s, item) => s + item.weight, 0) +
      mediums.reduce((s, item) => s + item.weight, 0) +
      serious.reduce((s, item) => s + item.weight, 0);

    let score = clampScore(50 + greenPts - redPts);
    if (serious.length >= 2) score = Math.min(score, 35);
    else if (serious.length === 1) score = Math.min(score, 55);

    let verdict = 'Healthy Green-Flag Bond';
    if (serious.length >= 2) verdict = 'Serious Warning Signs';
    else if (serious.length === 1) verdict = 'Pause and Look Closer';
    else if (score < 50) verdict = 'More Red Than Green';
    else if (score < 70) verdict = 'Mostly Green, Stay Honest';

    return { score, verdict, greens, yellows, mediums, serious };
  }, [checked]);

  const toggle = (index: number) =>
    setChecked((current) => ({ ...current, [index]: !current[index] }));

  const reset = () => {
    setChecked({});
    setShowResult(false);
  };

  const greens = FLAG_ITEMS.map((item, i) => ({ ...item, i })).filter((item) => item.kind === 'green');
  const reds = FLAG_ITEMS.map((item, i) => ({ ...item, i })).filter((item) => item.kind !== 'green');

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Check every dynamic that currently applies. Green flags add. Yellow, medium, and serious red flags subtract — and serious ones can override a high green count."
      icon={<Flag className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/40 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">Green flags</p>
              <div className="space-y-2">
                {greens.map((item) => (
                  <button
                    key={item.i}
                    type="button"
                    onClick={() => toggle(item.i)}
                    className={`w-full text-left rounded-xl px-4 py-2.5 text-xs font-semibold border transition-all ${
                      checked[item.i]
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-rose-200 dark:border-rose-900/40 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-3">Watch-outs & red flags</p>
              <div className="space-y-2">
                {reds.map((item) => (
                  <button
                    key={item.i}
                    type="button"
                    onClick={() => toggle(item.i)}
                    className={`w-full text-left rounded-xl px-4 py-2.5 text-xs font-semibold border transition-all ${
                      checked[item.i]
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-300'
                    }`}
                  >
                    {item.kind === 'serious' ? '⚠ ' : item.kind === 'medium' ? '● ' : '○ '}
                    {item.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <PrimaryButton disabled={selectedCount === 0} onClick={() => setShowResult(true)}>
            Tally My Flags
          </PrimaryButton>
          <p className="text-center text-xs text-slate-400 mt-3">{selectedCount} flags selected</p>
        </>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              ['Green', result.greens.length, 'text-emerald-600'],
              ['Yellow', result.yellows.length, 'text-amber-600'],
              ['Medium', result.mediums.length, 'text-orange-600'],
              ['Serious', result.serious.length, 'text-rose-600'],
            ].map(([label, count, color]) => (
              <div key={String(label)} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-3 text-center">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                <p className={`text-2xl font-black ${color}`}>{count}</p>
              </div>
            ))}
          </div>
          <ResultCard
            score={result.score}
            label={result.verdict}
            message={
              result.serious.length
                ? `Serious red flags were checked (${result.serious.map((item) => item.text).join('; ')}). A high green-flag count does not cancel those. This is a conversation and safety check, not a verdict on your worth.`
                : result.greens.length
                  ? `You marked ${result.greens.length} green flags and ${result.yellows.length + result.mediums.length} milder watch-outs. Consistency between words and actions over time is the strongest green flag of all.`
                  : 'No green flags were checked this time. That is useful information — talk with someone you trust about what you need to feel safe and respected.'
            }
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `I scored ${result.score}% (${result.verdict}) on ${tool.title} at LoveScoreTest.com.`,
                url: window.location.href,
              })
            }
            onReset={reset}
          />
        </div>
      )}
    </ToolShell>
  );
};

// ==========================================================
// 36. Dating Stage & Milestone Quiz
// Each answer maps to a stage index. The mean becomes the
// current phase; the spread detects mixed signals. This is a
// classifier with a progression path, not a percentage quiz.
// ==========================================================

const DATING_STAGES = [
  'Talking Stage',
  'Casual Dating',
  'Exclusive',
  'Official Couple',
  'Committed Partnership',
  'Ready for Forever',
] as const;

const STAGE_NEXT_TALK = [
  'Ask whether you both want to keep talking with dating intent, or keep it casual.',
  'Have “the talk”: are you seeing other people, and do you want exclusivity?',
  'Make it official out loud — titles, social posts, and introducing each other as partners.',
  'Talk about what commitment looks like for you over the next year.',
  'Discuss timelines for living together, engagement, or another shared milestone.',
  'You are at the last stage in this quiz. Keep choosing each other on purpose.',
];

const STAGE_QUESTIONS: { question: string; options: { text: string; stage: number }[] }[] = [
  {
    question: 'How would you describe your current status to a close friend?',
    options: [
      { text: 'We are talking / vibing, nothing defined', stage: 0 },
      { text: 'We go on dates but it is still casual', stage: 1 },
      { text: 'We are not seeing other people', stage: 2 },
      { text: 'We are a couple and say so', stage: 3 },
      { text: 'We are building a life together', stage: 4 },
      { text: 'We are talking marriage / forever', stage: 5 },
    ],
  },
  {
    question: 'How often do you see or speak with intention (not just scrolling)?',
    options: [
      { text: 'Occasionally, with long gaps', stage: 0 },
      { text: 'A date here and there', stage: 1 },
      { text: 'Regularly, several times a week', stage: 2 },
      { text: 'Daily connection is the norm', stage: 3 },
      { text: 'We coordinate calendars as a unit', stage: 4 },
      { text: 'Our lives are already intertwined', stage: 5 },
    ],
  },
  {
    question: 'Have you met each other’s important people?',
    options: [
      { text: 'Not yet, it would feel too soon', stage: 0 },
      { text: 'Maybe a friend, not family', stage: 1 },
      { text: 'Close friends, not family yet', stage: 2 },
      { text: 'Friends and some family', stage: 3 },
      { text: 'Both families know us as a couple', stage: 4 },
      { text: 'We are already part of each other’s families', stage: 5 },
    ],
  },
  {
    question: 'How do you handle future plans (trips, holidays, next year)?',
    options: [
      { text: 'We do not plan beyond this week', stage: 0 },
      { text: 'We might plan a fun date ahead', stage: 1 },
      { text: 'We plan weeks ahead as a pair', stage: 2 },
      { text: 'Holidays are assumed together', stage: 3 },
      { text: 'We plan seasons and big trips together', stage: 4 },
      { text: 'We plan years, homes, or family together', stage: 5 },
    ],
  },
  {
    question: 'If someone attractive showed interest, what would happen?',
    options: [
      { text: 'We have not agreed on exclusivity', stage: 0 },
      { text: 'It would be awkward, but not a rule yet', stage: 1 },
      { text: 'We already chose exclusivity', stage: 2 },
      { text: 'It would clearly be crossing a line', stage: 3 },
      { text: 'We protect the relationship as a given', stage: 4 },
      { text: 'We are fully committed for the long run', stage: 5 },
    ],
  },
  {
    question: 'What feels like the natural next step?',
    options: [
      { text: 'Keep talking and see if it grows', stage: 0 },
      { text: 'Date more consistently', stage: 1 },
      { text: 'Become exclusive', stage: 2 },
      { text: 'Make it official / public', stage: 3 },
      { text: 'Move in, get a pet, or merge routines', stage: 4 },
      { text: 'Engagement or a lifelong commitment', stage: 5 },
    ],
  },
];

export const DatingStageMilestoneTool: React.FC<Phase3ToolProps> = ({ tool, onShare }) => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);
  const answeredCount = Object.keys(answers).length;

  const { stageIndex, progress, spread, mixed } = useMemo(() => {
    const vals = Object.values(answers);
    if (!vals.length) return { stageIndex: 0, progress: 0, spread: 0, mixed: false };
    const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const spreadVal = max - min;
    return {
      stageIndex: Math.max(0, Math.min(5, Math.round(avg))),
      progress: clampScore((avg / 5) * 100),
      spread: spreadVal,
      mixed: spreadVal >= 3,
    };
  }, [answers]);

  const stageName = DATING_STAGES[stageIndex];
  const nextTalk = STAGE_NEXT_TALK[stageIndex];

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Answer 6 benchmark questions. We classify your current phase from the pattern — and flag mixed signals if the answers span too many stages."
      icon={<Milestone className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {STAGE_QUESTIONS.map((q, index) => (
              <div key={q.question} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-3">
                  {index + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt.text}
                      type="button"
                      onClick={() => setAnswers((current) => ({ ...current, [index]: opt.stage }))}
                      className={`w-full text-left rounded-xl px-4 py-2.5 text-xs font-semibold border transition-all ${
                        answers[index] === opt.stage
                          ? 'bg-pink-600 text-white border-pink-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <PrimaryButton disabled={answeredCount !== STAGE_QUESTIONS.length} onClick={() => setShowResult(true)}>
            Find Our Stage
          </PrimaryButton>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {STAGE_QUESTIONS.length} answered
          </p>
        </>
      ) : (
        <div className="mt-2">
          <div className="flex flex-wrap gap-1.5 justify-center mb-6">
            {DATING_STAGES.map((name, i) => (
              <span
                key={name}
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold border ${
                  i === stageIndex
                    ? 'bg-pink-600 text-white border-pink-600'
                    : i < stageIndex
                      ? 'bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-900'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                {name}
              </span>
            ))}
          </div>
          {mixed && (
            <div className="rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 p-4 text-left mb-4">
              <p className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-1">
                Mixed signals
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                Your answers spanned {spread + 1} different stages. That usually means one of you (or one part of the
                relationship) is ahead of the rest. The next conversation matters more than the label.
              </p>
            </div>
          )}
          <ResultCard
            score={progress}
            label={stageName}
            message={`You are currently in the ${stageName} phase (${progress}% of the way toward the “forever” end of this scale). Next conversation: ${nextTalk}`}
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `We landed on ${stageName} (${progress}%) on ${tool.title} at LoveScoreTest.com.`,
                url: window.location.href,
              })
            }
            onReset={reset}
          />
        </div>
      )}
    </ToolShell>
  );
};

// ==========================================================
// 37. Spark & Romance Meter
// Two-dimension model (Novelty vs Passion). Spark temperature
// is a weighted blend; date ideas are selected from the weaker
// dimension's pool — a real recommendation engine.
// ==========================================================

const SPARK_QUESTIONS: { text: string; dimension: 'novelty' | 'passion' }[] = [
  { text: 'In the last month, how often did you do something together that was new for both of you?', dimension: 'novelty' },
  { text: 'How often do your dates still surprise you a little?', dimension: 'novelty' },
  { text: 'How willing are you both to break the usual Friday-night routine?', dimension: 'novelty' },
  { text: 'How often do you still flirt (texts, looks, teasing) during an ordinary week?', dimension: 'passion' },
  { text: 'How present does affection feel — kisses, compliments, lingering touch?', dimension: 'passion' },
  { text: 'How often do you still get a small rush just from being around them?', dimension: 'passion' },
];

const FREQUENCY_SCALE = [
  { value: 1, label: 'Almost never' },
  { value: 2, label: 'Rarely' },
  { value: 3, label: 'Sometimes' },
  { value: 4, label: 'Often' },
  { value: 5, label: 'Very often' },
];

const NOVELTY_DATES = [
  'Take a beginner class neither of you has tried — pottery, salsa, climbing, or a language cafe.',
  'Explore a neighborhood you have never walked, flipping a coin at each corner.',
  'Cook a cuisine from a country neither of you has visited, with a playlist from there.',
];

const PASSION_DATES = [
  'A no-agenda evening: slow dinner, phones in another room, and a 20-minute walk after.',
  'Write three specific things you found attractive this week and swap the notes at dessert.',
  'Recreate your first date as closely as you can, including the playlist if you remember it.',
];

const BLAZE_DATES = [
  'Book a mini overnight nearby, even if it is just one town over.',
  'Do a “yes day” for two hours: each person gets 60 minutes of whatever they want.',
  'Learn a two-song dance in the living room and perform it like nobody is watching.',
];

const sparkTemperature = (score: number) => {
  if (score >= 80) return 'Blaze';
  if (score >= 60) return 'Flame';
  if (score >= 40) return 'Glow';
  return 'Ember';
};

export const SparkRomanceMeterTool: React.FC<Phase3ToolProps> = ({ tool, onShare }) => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);
  const answeredCount = Object.keys(answers).length;

  const { novelty, passion, spark, ideas, weak } = useMemo(() => {
    const dimScore = (dimension: 'novelty' | 'passion') => {
      const vals = SPARK_QUESTIONS.map((q, i) => (q.dimension === dimension ? answers[i] : undefined)).filter(
        (v): v is number => typeof v === 'number',
      );
      return vals.length ? clampScore((vals.reduce((s, v) => s + v, 0) / (vals.length * 5)) * 100) : 0;
    };
    const n = dimScore('novelty');
    const p = dimScore('passion');
    const sparkScore = clampScore(n * 0.45 + p * 0.55);
    let pool = BLAZE_DATES;
    let weakDim = 'both strong';
    if (n < 55 && p < 55) {
      pool = [NOVELTY_DATES[0], NOVELTY_DATES[1], PASSION_DATES[0]];
      weakDim = 'novelty and passion';
    } else if (n <= p - 8) {
      pool = NOVELTY_DATES;
      weakDim = 'novelty';
    } else if (p <= n - 8) {
      pool = PASSION_DATES;
      weakDim = 'passion';
    }
    return { novelty: n, passion: p, spark: sparkScore, ideas: pool, weak: weakDim };
  }, [answers]);

  const temp = sparkTemperature(spark);

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Rate six recent romance habits. We split Novelty and Passion, then prescribe three date ideas from whichever side is cooler."
      icon={<Zap className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {SPARK_QUESTIONS.map((q, index) => (
              <RatingQuestion
                key={q.text}
                index={index}
                question={q.text}
                value={answers[index]}
                onSelect={(value) => setAnswers((current) => ({ ...current, [index]: value }))}
                scale={FREQUENCY_SCALE}
              />
            ))}
          </div>
          <PrimaryButton disabled={answeredCount !== SPARK_QUESTIONS.length} onClick={() => setShowResult(true)}>
            Measure Our Spark
          </PrimaryButton>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {SPARK_QUESTIONS.length} answered
          </p>
        </>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Novelty</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{novelty}%</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Passion</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{passion}%</p>
            </div>
          </div>
          <div className="rounded-2xl border border-pink-100 dark:border-pink-900/40 bg-pink-50 dark:bg-pink-950/30 p-4 text-left mb-2">
            <p className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider mb-2">
              Date ideas for {weak}
            </p>
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {ideas.map((idea) => (
                <li key={idea}>• {idea}</li>
              ))}
            </ul>
          </div>
          <ResultCard
            score={spark}
            label={temp}
            message={`Your spark is at ${spark}% — a ${temp.toLowerCase()}. Long-term love often shifts from frantic butterflies into a warmer glow; these ideas are about feeding both novelty and affection, not chasing the first-month rush forever.`}
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `Our spark is a ${temp} (${spark}%) on ${tool.title} at LoveScoreTest.com.`,
                url: window.location.href,
              })
            }
            onReset={reset}
          />
        </div>
      )}
    </ToolShell>
  );
};

// ==========================================================
// 38. Couple Trust Score Test
// Six pillars with unequal weights. Honesty and reliability
// are core: if either is below 3/5, a foundation penalty
// applies even when other pillars look fine.
// ==========================================================

const TRUST_PILLARS: { label: string; question: string; weight: number; advice: string }[] = [
  {
    label: 'Honesty',
    question: 'Do you tell each other the truth even when it is uncomfortable?',
    weight: 1.3,
    advice: 'Practice one small, timely truth this week instead of a delayed bigger confession.',
  },
  {
    label: 'Reliability',
    question: 'When they say they will do something, does it actually happen?',
    weight: 1.3,
    advice: 'Make promises smaller and keep them 100% for two weeks — reliability is built in repeats.',
  },
  {
    label: 'Confidentiality',
    question: 'Do private things you share stay private?',
    weight: 1.0,
    advice: 'Agree out loud what is “just between us” versus what is okay to retell.',
  },
  {
    label: 'Follow-through',
    question: 'When you share a feeling, does your partner actually adjust afterward?',
    weight: 1.1,
    advice: 'After a hard talk, write one concrete change each of you will try before the next week.',
  },
  {
    label: 'Transparency',
    question: 'Do phones, plans, and friendships feel open rather than hidden?',
    weight: 1.2,
    advice: 'Share calendars or a weekly plan dump so surprises are joyful, not suspicious.',
  },
  {
    label: 'Predictability',
    question: 'Is their mood and availability steady enough that you can relax?',
    weight: 0.9,
    advice: 'Name your typical “low-capacity” times so silence is not read as distance.',
  },
];

export const CoupleTrustScoreTool: React.FC<Phase3ToolProps> = ({ tool, onShare }) => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);
  const answeredCount = Object.keys(answers).length;

  const { pillars, index, weakest, penalty } = useMemo(() => {
    const rows = TRUST_PILLARS.map((pillar, i) => {
      const raw = answers[i] ?? 0;
      const score = clampScore((raw / 5) * 100);
      return { ...pillar, raw, score };
    });
    const weightSum = TRUST_PILLARS.reduce((s, p) => s + p.weight, 0);
    const weighted =
      rows.reduce((s, row) => s + (row.raw / 5) * 100 * row.weight, 0) / weightSum;
    const honesty = rows[0]?.raw ?? 0;
    const reliability = rows[1]?.raw ?? 0;
    const appliedPenalty = honesty < 3 || reliability < 3 ? 8 : 0;
    const weakestRow = [...rows].sort((a, b) => a.score - b.score)[0];
    return {
      pillars: rows,
      index: clampScore(weighted - appliedPenalty),
      weakest: weakestRow,
      penalty: appliedPenalty,
    };
  }, [answers]);

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  const trustLabel =
    index >= 85 ? 'Deeply Secure' : index >= 70 ? 'Solid Trust' : index >= 50 ? 'Trust in Progress' : 'Trust Needs Repair';

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Rate six trust pillars. Honesty and reliability carry more weight — if either is shaky, the overall index is capped by a foundation penalty."
      icon={<ShieldAlert className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {TRUST_PILLARS.map((pillar, index) => (
              <RatingQuestion
                key={pillar.label}
                index={index}
                question={`${pillar.label}: ${pillar.question}`}
                value={answers[index]}
                onSelect={(value) => setAnswers((current) => ({ ...current, [index]: value }))}
              />
            ))}
          </div>
          <PrimaryButton disabled={answeredCount !== TRUST_PILLARS.length} onClick={() => setShowResult(true)}>
            Calculate Trust Index
          </PrimaryButton>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {TRUST_PILLARS.length} pillars rated
          </p>
        </>
      ) : (
        <div className="mt-2">
          <div className="space-y-2 mb-6">
            {pillars.map((pillar) => (
              <ScoreBar key={pillar.label} label={pillar.label} score={pillar.score} widthClass="w-28" />
            ))}
          </div>
          {penalty > 0 && (
            <p className="text-xs text-amber-700 dark:text-amber-300 mb-3 text-center">
              Foundation penalty applied (−{penalty}): honesty or reliability scored below “Sometimes”.
            </p>
          )}
          <div className="rounded-2xl border border-pink-100 dark:border-pink-900/40 bg-pink-50 dark:bg-pink-950/30 p-4 text-left mb-2">
            <p className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider mb-1">
              Weakest pillar: {weakest?.label}
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{weakest?.advice}</p>
          </div>
          <ResultCard
            score={index}
            label={trustLabel}
            message={`Your Couple Trust Index is ${index}%. Trust is rebuilt through repeated, boring consistency — not one big gesture. Start with the weakest pillar this week.`}
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `Our Couple Trust Index is ${index}% (${trustLabel}) on LoveScoreTest.com.`,
                url: window.location.href,
              })
            }
            onReset={reset}
          />
        </div>
      )}
    </ToolShell>
  );
};

// ==========================================================
// 39. Appreciation & Gratitude Quiz
// Dual frequency matrix: how often you GIVE each act vs how
// often you RECEIVE it. Balance gap + lowest-giving acts
// become 30-second daily habits.
// ==========================================================

const APPRECIATION_ACTS: { act: string; habit: string }[] = [
  { act: 'A specific compliment (not just “thanks”)', habit: 'Before sleep, name one specific thing you noticed and liked today.' },
  { act: 'A small helpful act without being asked', habit: 'Do one unasked 60-second help: refill a glass, grab a charger, start the kettle.' },
  { act: 'A thank-you for something ordinary', habit: 'Thank them for one ordinary thing they always do — name the thing out loud.' },
  { act: 'Public or private praise in front of others', habit: 'Mention one genuine compliment about them to a friend, then tell your partner you did.' },
  { act: 'A tiny surprise (note, snack, song, meme)', habit: 'Send one 10-second voice note or photo that says “I thought of you.”' },
  { act: 'Noticing effort, not just results', habit: 'When they try, say “I saw you try X” — even if the result was messy.' },
];

const FREQ_OPTIONS = [
  { value: 0, label: 'Never' },
  { value: 1, label: 'Rarely' },
  { value: 2, label: 'Monthly' },
  { value: 3, label: 'Weekly' },
  { value: 4, label: 'Daily' },
];

export const AppreciationGratitudeTool: React.FC<Phase3ToolProps> = ({ tool, onShare }) => {
  const [give, setGive] = useState<AnswerMap>({});
  const [receive, setReceive] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);

  const answered = Math.min(Object.keys(give).length, Object.keys(receive).length);

  const { giveScore, receiveScore, overall, gap, habits, imbalance } = useMemo(() => {
    const gVals = APPRECIATION_ACTS.map((_, i) => give[i]).filter((v): v is number => typeof v === 'number');
    const rVals = APPRECIATION_ACTS.map((_, i) => receive[i]).filter((v): v is number => typeof v === 'number');
    const g = gVals.length ? gVals.reduce((s, v) => s + v, 0) / (gVals.length * 4) : 0;
    const r = rVals.length ? rVals.reduce((s, v) => s + v, 0) / (rVals.length * 4) : 0;
    const givePct = clampScore(g * 100);
    const receivePct = clampScore(r * 100);
    const ranked = APPRECIATION_ACTS.map((item, i) => ({ ...item, freq: give[i] ?? 4 })).sort(
      (a, b) => a.freq - b.freq,
    );
    let imbalanceText = 'Giving and receiving are fairly close — keep the specific, named thanks going.';
    if (receivePct + 15 <= givePct) imbalanceText = 'You give more than you feel you receive. Ask for the kind of thanks that actually lands for you.';
    if (givePct + 15 <= receivePct) imbalanceText = 'You feel appreciated more than you currently give. Your partner may be quietly hungry for the same energy back.';
    return {
      giveScore: givePct,
      receiveScore: receivePct,
      overall: clampScore((givePct + receivePct) / 2),
      gap: Math.abs(givePct - receivePct),
      habits: ranked.slice(0, 2),
      imbalance: imbalanceText,
    };
  }, [give, receive]);

  const reset = () => {
    setGive({});
    setReceive({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="For each appreciation habit, mark how often you give it and how often you feel you receive it. We compare the two and prescribe 30-second daily habits."
      icon={<HeartHandshake className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {APPRECIATION_ACTS.map((item, index) => (
              <div key={item.act} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-3">
                  {index + 1}. {item.act}
                </p>
                {[
                  { label: 'I do this', values: give, setValues: setGive },
                  { label: 'I receive this', values: receive, setValues: setReceive },
                ].map((row) => (
                  <div key={row.label} className="mb-3 last:mb-0">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      {row.label}
                    </span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {FREQ_OPTIONS.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => row.setValues((current) => ({ ...current, [index]: opt.value }))}
                          className={`rounded-lg py-2 text-[10px] font-bold border transition-all ${
                            row.values[index] === opt.value
                              ? 'bg-pink-600 text-white border-pink-600'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <PrimaryButton disabled={answered !== APPRECIATION_ACTS.length} onClick={() => setShowResult(true)}>
            See Appreciation Balance
          </PrimaryButton>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answered} of {APPRECIATION_ACTS.length} acts completed for both sides
          </p>
        </>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">You give</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{giveScore}%</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">You receive</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{receiveScore}%</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center mb-4">Balance gap: {gap} points</p>
          <div className="rounded-2xl border border-pink-100 dark:border-pink-900/40 bg-pink-50 dark:bg-pink-950/30 p-4 text-left mb-2">
            <p className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider mb-2">
              30-second daily habits
            </p>
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {habits.map((item) => (
                <li key={item.act}>• {item.habit}</li>
              ))}
            </ul>
          </div>
          <ResultCard
            score={overall}
            label={getScoreLabel(overall)}
            message={imbalance}
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `My appreciation balance is ${overall}% on ${tool.title} at LoveScoreTest.com.`,
                url: window.location.href,
              })
            }
            onReset={reset}
          />
        </div>
      )}
    </ToolShell>
  );
};

// ==========================================================
// 40. Dating Readiness Quiz
// Singles-only. Four dimensions, two reverse-scored items,
// and a closure cap: you cannot score “fully ready” if past
// closure is still low.
// ==========================================================

type ReadyDimension = 'closure' | 'selfWorth' | 'availability' | 'motivation';

const READY_QUESTIONS: { text: string; dimension: ReadyDimension; reverse?: boolean }[] = [
  { text: 'Thoughts of my last relationship feel mostly settled, not raw.', dimension: 'closure' },
  { text: 'I can wish my ex well without needing them back.', dimension: 'closure' },
  { text: 'I like who I am when nobody is dating me.', dimension: 'selfWorth' },
  { text: 'I do not need a relationship to feel like a complete person.', dimension: 'selfWorth' },
  { text: 'I have enough emotional energy to show up for someone else.', dimension: 'availability' },
  { text: 'I can be honest about my needs without rushing or hiding.', dimension: 'availability' },
  { text: 'I want to date because I am curious about someone, not because I cannot stand being alone.', dimension: 'motivation' },
  { text: 'I often start talking to people mainly to avoid feeling lonely.', dimension: 'motivation', reverse: true },
];

const readyBand = (score: number, capped: boolean) => {
  if (capped && score >= 60) return 'Almost Ready (closure cap)';
  if (score >= 80) return 'Thriving Ready';
  if (score >= 60) return 'Ready';
  if (score >= 40) return 'Almost Ready';
  return 'Not Yet — Keep Healing';
};

export const DatingReadinessTool: React.FC<Phase3ToolProps> = ({ tool, onShare }) => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);
  const answeredCount = Object.keys(answers).length;

  const { dimensions, overall, capped, whyNote } = useMemo(() => {
    const dimVals: Record<ReadyDimension, number[]> = {
      closure: [],
      selfWorth: [],
      availability: [],
      motivation: [],
    };
    READY_QUESTIONS.forEach((q, i) => {
      const raw = answers[i];
      if (typeof raw !== 'number') return;
      const scored = q.reverse ? 6 - raw : raw;
      dimVals[q.dimension].push(scored);
    });
    const dimScore = (key: ReadyDimension) => {
      const vals = dimVals[key];
      return vals.length ? clampScore((vals.reduce((s, v) => s + v, 0) / (vals.length * 5)) * 100) : 0;
    };
    const dims = {
      closure: dimScore('closure'),
      selfWorth: dimScore('selfWorth'),
      availability: dimScore('availability'),
      motivation: dimScore('motivation'),
    };
    const rawOverall = clampScore((dims.closure + dims.selfWorth + dims.availability + dims.motivation) / 4);
    const closureCap = dims.closure < 50;
    const final = closureCap ? Math.min(rawOverall, 55) : rawOverall;
    const lonelinessHigh = dims.motivation < 55 && rawOverall >= 60;
    return {
      dimensions: dims,
      overall: final,
      capped: closureCap,
      whyNote: lonelinessHigh
        ? 'Your other scores look ready, but the “why” still leans toward filling loneliness. Date slowly and keep a full life outside of matches.'
        : closureCap
          ? 'Closure is still low, so overall readiness is capped. You can meet people, but a new relationship should not be the way you finish the last one.'
          : 'You are dating from a steadier place when curiosity is bigger than emptiness.',
    };
  }, [answers]);

  const band = readyBand(overall, capped);

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="A singles checkup across closure, self-worth, availability, and motivation. One reverse-scored item and a closure cap keep the result honest."
      icon={<UserCheck className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {READY_QUESTIONS.map((q, index) => (
              <RatingQuestion
                key={q.text}
                index={index}
                question={q.text}
                value={answers[index]}
                onSelect={(value) => setAnswers((current) => ({ ...current, [index]: value }))}
              />
            ))}
          </div>
          <PrimaryButton disabled={answeredCount !== READY_QUESTIONS.length} onClick={() => setShowResult(true)}>
            Check My Readiness
          </PrimaryButton>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {READY_QUESTIONS.length} answered
          </p>
        </>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(
              [
                ['Closure', dimensions.closure],
                ['Self-worth', dimensions.selfWorth],
                ['Availability', dimensions.availability],
                ['Motivation', dimensions.motivation],
              ] as const
            ).map(([label, score]) => (
              <div key={label} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
                <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">{label}</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{score}%</p>
              </div>
            ))}
          </div>
          <ResultCard
            score={overall}
            label={band}
            message={whyNote}
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `My dating readiness is ${overall}% (${band}) on LoveScoreTest.com.`,
                url: window.location.href,
              })
            }
            onReset={reset}
          />
        </div>
      )}
    </ToolShell>
  );
};

// ==========================================================
// 41. Long Distance Relationship Strength
// Mixed inputs (hours slider, yes/no visit plan, timezone,
// routine, trust, closing plan) with a 100-point budget.
// Recommendations change with timezone and the golden-rule
// visit date.
// ==========================================================

const DIGITAL_ROUTINES = [
  { label: 'Almost never', pts: 2 },
  { label: 'Monthly', pts: 6 },
  { label: 'Weekly', pts: 12 },
  { label: 'Several times a week', pts: 16 },
];

const CLOSING_PLANS = [
  { label: 'No plan yet', pts: 2 },
  { label: 'We talk about it', pts: 8 },
  { label: 'A timeline exists', pts: 14 },
  { label: 'Moving / closing within a year', pts: 16 },
];

const ASYNC_DATES = [
  'Start a two-person watch party: same film, live comments in a shared note.',
  'Exchange a 60-second voice note every morning for a week — no pressure to reply instantly.',
  'Build a shared playlist and add one song each day with a one-line reason.',
];

const LIVE_DATES = [
  'Eat the same takeout over video and treat it like a real dinner reservation.',
  'Take a simultaneous walk while on a call — same podcast intro, different sidewalks.',
  'Play a co-op game or online board game for 45 minutes, phones down otherwise.',
];

export const LdrStrengthTool: React.FC<Phase3ToolProps> = ({ tool, onShare }) => {
  const [hours, setHours] = useState(4);
  const [visitPlanned, setVisitPlanned] = useState<boolean | null>(null);
  const [timezone, setTimezone] = useState(3);
  const [routine, setRoutine] = useState<number | null>(null);
  const [trust, setTrust] = useState<number | null>(null);
  const [closing, setClosing] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const ready = visitPlanned !== null && routine !== null && trust !== null && closing !== null;

  const scored = useMemo(() => {
    const talkPts = Math.min(hours, 10) * 2;
    const visitPts = visitPlanned ? 20 : 5;
    const tzPts = Math.max(0, 12 - timezone);
    const routinePts = routine !== null ? DIGITAL_ROUTINES[routine].pts : 0;
    const trustPts = trust !== null ? (trust / 5) * 16 : 0;
    const closingPts = closing !== null ? CLOSING_PLANS[closing].pts : 0;
    const total = clampScore(talkPts + visitPts + tzPts + routinePts + trustPts + closingPts);
    const dates = timezone > 6 ? ASYNC_DATES : LIVE_DATES;
    return {
      total,
      talkPts: clampScore(talkPts),
      visitPts,
      tzPts: clampScore(tzPts),
      routinePts,
      trustPts: clampScore(trustPts),
      closingPts,
      dates,
    };
  }, [hours, visitPlanned, timezone, routine, trust, closing]);

  const reset = () => {
    setHours(4);
    setVisitPlanned(null);
    setTimezone(3);
    setRoutine(null);
    setTrust(null);
    setClosing(null);
    setShowResult(false);
  };

  const ldrLabel =
    scored.total >= 80 ? 'LDR Power Couple' : scored.total >= 60 ? 'Steady Across Miles' : scored.total >= 40 ? 'Needs a Stronger Routine' : 'At Risk Without a Plan';

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Mixed inputs — talk hours, next visit, timezone, digital dates, trust, and a closing-the-distance plan — add up to a 100-point LDR Longevity Score."
      icon={<Globe className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Real conversation hours per week (calls, not lurking)
                </p>
                <span className="text-sm font-bold text-pink-600">{hours}h</span>
              </div>
              <input
                type="range"
                min={0}
                max={14}
                value={hours}
                onChange={(event) => setHours(Number(event.target.value))}
                className="w-full accent-pink-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0h</span>
                <span>14h</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                Is the next in-person visit already on the calendar with a date?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Yes, dated', value: true },
                  { label: 'Not yet', value: false },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setVisitPlanned(opt.value)}
                    className={`rounded-xl py-2.5 text-xs font-bold border ${
                      visitPlanned === opt.value
                        ? 'bg-pink-600 text-white border-pink-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Timezone difference (hours)</p>
                <span className="text-sm font-bold text-pink-600">{timezone}h</span>
              </div>
              <input
                type="range"
                min={0}
                max={12}
                value={timezone}
                onChange={(event) => setTimezone(Number(event.target.value))}
                className="w-full accent-pink-600"
              />
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Digital date routine</p>
              <div className="grid grid-cols-2 gap-2">
                {DIGITAL_ROUTINES.map((opt, i) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setRoutine(i)}
                    className={`rounded-xl py-2.5 text-xs font-bold border ${
                      routine === i
                        ? 'bg-pink-600 text-white border-pink-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                Trust while apart (1 = shaky, 5 = solid)
              </p>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setTrust(val)}
                    className={`rounded-lg py-2 text-xs font-bold border ${
                      trust === val
                        ? 'bg-pink-600 text-white border-pink-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Closing-the-distance plan</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CLOSING_PLANS.map((opt, i) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setClosing(i)}
                    className={`rounded-xl py-2.5 text-xs font-bold border ${
                      closing === i
                        ? 'bg-pink-600 text-white border-pink-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <PrimaryButton disabled={!ready} onClick={() => setShowResult(true)}>
            Calculate LDR Strength
          </PrimaryButton>
        </>
      ) : (
        <div className="mt-2">
          <div className="space-y-2 mb-4">
            <ScoreBar label="Conversation" score={clampScore((scored.talkPts / 20) * 100)} />
            <ScoreBar label="Next visit" score={clampScore((scored.visitPts / 20) * 100)} />
            <ScoreBar label="Timezone ease" score={clampScore((scored.tzPts / 12) * 100)} />
            <ScoreBar label="Digital dates" score={clampScore((scored.routinePts / 16) * 100)} />
            <ScoreBar label="Trust" score={clampScore((scored.trustPts / 16) * 100)} />
            <ScoreBar label="Closing plan" score={clampScore((scored.closingPts / 16) * 100)} />
          </div>
          {!visitPlanned && (
            <p className="text-xs text-amber-700 dark:text-amber-300 text-center mb-3">
              Golden rule: put the next visit on the calendar. LDRs without a dated reunion drift.
            </p>
          )}
          <div className="rounded-2xl border border-pink-100 dark:border-pink-900/40 bg-pink-50 dark:bg-pink-950/30 p-4 text-left mb-2">
            <p className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider mb-2">
              {timezone > 6 ? 'Async-friendly date ideas' : 'Live virtual date ideas'}
            </p>
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {scored.dates.map((idea) => (
                <li key={idea}>• {idea}</li>
              ))}
            </ul>
          </div>
          <ResultCard
            score={scored.total}
            label={ldrLabel}
            message={`Your LDR Longevity Score is ${scored.total}%. Distance is survivable when conversation, a dated next visit, and a closing plan all exist together — missing one of those three is usually the real risk.`}
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `Our LDR strength is ${scored.total}% (${ldrLabel}) on LoveScoreTest.com.`,
                url: window.location.href,
              })
            }
            onReset={reset}
          />
        </div>
      )}
    </ToolShell>
  );
};

// ==========================================================
// 42. Are You Soulmates Quiz
// Dual blend: Destiny/Synchronicity (40%) + Attunement (60%).
// Four archetypes from the two-dimension pattern — not a
// single romantic percentage with extra adjectives.
// ==========================================================

const SOUL_QUESTIONS: { text: string; dimension: 'destiny' | 'attunement' }[] = [
  { text: 'The timing of how you met still feels oddly well-placed.', dimension: 'destiny' },
  { text: 'You noticed coincidences or repeated signs around the start of this bond.', dimension: 'destiny' },
  { text: 'It felt unusually easy to be yourself around them very early on.', dimension: 'destiny' },
  { text: 'You have a sense of “I know this person” that you cannot fully explain.', dimension: 'destiny' },
  { text: 'You often understand each other without a long explanation.', dimension: 'attunement' },
  { text: 'This person challenges you to grow, not just to be comfortable.', dimension: 'attunement' },
  { text: 'You can repair after conflict and feel closer rather than colder.', dimension: 'attunement' },
  { text: 'Your values and inner worlds line up even when your lifestyles differ.', dimension: 'attunement' },
];

const soulArchetype = (destiny: number, attunement: number) => {
  if (destiny >= 75 && attunement >= 75) {
    return {
      title: 'Twin-Flame Resonance',
      text: 'High destiny and high attunement. That mix feels magical — and it still needs ordinary kindness, repair, and rest. Soul-level chemistry is not a free pass on communication.',
    };
  }
  if (destiny >= 75 && attunement < 75) {
    return {
      title: 'Fated, Still Growing',
      text: 'The “how we met” story is strong, but day-to-day attunement has room to catch up. Chosen habits will matter more than the origin story from here.',
    };
  }
  if (attunement >= 75 && destiny < 75) {
    return {
      title: 'Chosen Soulmates',
      text: 'You may not have a cinematic meet-cute, but you read and grow with each other. Many of the sturdiest bonds look like this: less destiny-talk, more daily choosing.',
    };
  }
  if (destiny >= 55 || attunement >= 55) {
    return {
      title: 'Kindred Spirits',
      text: 'There is real resonance here. Keep feeding it with curiosity and repair — soulmate is often a practice, not a lightning strike.',
    };
  }
  return {
    title: 'Beautiful Beginning',
    text: 'The bond can still become deep. Instant knowing is overrated compared with consistent care. Let the next season of knowing each other do the work.',
  };
};

export const SoulmatesQuizTool: React.FC<Phase3ToolProps> = ({ tool, onShare }) => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);
  const answeredCount = Object.keys(answers).length;

  const { destiny, attunement, overall, archetype } = useMemo(() => {
    const dimScore = (dimension: 'destiny' | 'attunement') => {
      const vals = SOUL_QUESTIONS.map((q, i) => (q.dimension === dimension ? answers[i] : undefined)).filter(
        (v): v is number => typeof v === 'number',
      );
      return vals.length ? clampScore((vals.reduce((s, v) => s + v, 0) / (vals.length * 5)) * 100) : 0;
    };
    const d = dimScore('destiny');
    const a = dimScore('attunement');
    return {
      destiny: d,
      attunement: a,
      overall: clampScore(d * 0.4 + a * 0.6),
      archetype: soulArchetype(d, a),
    };
  }, [answers]);

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Eight questions split into Destiny (how it began) and Attunement (how you actually meet each other). Attunement carries more of the soulmate percentage."
      icon={<Sparkles className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {SOUL_QUESTIONS.map((q, index) => (
              <RatingQuestion
                key={q.text}
                index={index}
                question={q.text}
                value={answers[index]}
                onSelect={(value) => setAnswers((current) => ({ ...current, [index]: value }))}
              />
            ))}
          </div>
          <PrimaryButton disabled={answeredCount !== SOUL_QUESTIONS.length} onClick={() => setShowResult(true)}>
            Reveal Soulmate Reading
          </PrimaryButton>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {SOUL_QUESTIONS.length} answered
          </p>
        </>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Destiny</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{destiny}%</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Attunement</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{attunement}%</p>
            </div>
          </div>
          <ResultCard
            score={overall}
            label={archetype.title}
            message={`${archetype.text} Entertainment reading only — soulmate stories are meaningful, not scientific proof.`}
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `We got ${overall}% — ${archetype.title} on ${tool.title} at LoveScoreTest.com.`,
                url: window.location.href,
              })
            }
            onReset={reset}
          />
        </div>
      )}
    </ToolShell>
  );
};
