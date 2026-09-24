import React, { useMemo, useState } from 'react';
import {
  Brain,
  Briefcase,
  CalendarDays,
  Coins,
  Compass,
  Heart,
  HeartHandshake,
  Home,
  ListChecks,
  MessageCircle,
  Plane,
  RotateCcw,
  Scale,
  Share2,
  Shield,
  Smile,
  Sparkles,
  SunMedium,
  Users,
  Users2,
  Zap,
} from 'lucide-react';
import { ToolItem, ShareData } from '../../types';
import {
  RoommateCoLivingTool,
  RelationshipHealthCheckupTool,
  GreenRedFlagsTool,
  DatingStageMilestoneTool,
  SparkRomanceMeterTool,
  CoupleTrustScoreTool,
  AppreciationGratitudeTool,
  DatingReadinessTool,
  LdrStrengthTool,
  SoulmatesQuizTool,
} from './Phase3QuizTools';
import {
  MarriageReadinessTool,
  JealousySecurityTool,
  CoupleStressHandlingTool,
  ParentingVisionTool,
  ForgivenessTool,
  CoupleGenerosityTool,
  IntimacyDepthTool,
  RelationshipBoredomTool,
  ApologyLanguageTool,
  MbtiCoupleMatchTool,
} from './Phase4QuizTools';
import { Phase5And6Tool } from './Phase5And6Tools';

interface FunctionalToolEngineProps {
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}

type AnswerMap = Record<number, number>;

const QUESTION_COUNT = 6;

const normalizeText = (value: string) =>
  value.toLowerCase().replace(/[^a-z]/g, '');

const hashText = (value: string) => {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }

  return hash;
};

const clampScore = (score: number) =>
  Math.max(0, Math.min(100, Math.round(score)));

const getScoreLabel = (score: number): string => {
  if (score >= 85) return 'Very Strong Match';
  if (score >= 70) return 'Strong Match';
  if (score >= 55) return 'Balanced Match';
  if (score >= 40) return 'Room to Explore';
  return 'Good Opportunity to Grow';
};

const getGenericQuestions = (tool: ToolItem): string[] => {
  const source = tool.instructions?.filter(Boolean) ?? [];

  const questions = [
    'How strongly does this topic describe you and your relationship?',
    'How often does this situation match your relationship?',
    'How important is this area to you as a couple?',
    'How comfortable are you with your current approach to this area?',
    "How closely do your preferences match your partner's?",
    'How much would improving this area benefit your relationship?',
  ];

  return questions.map((question, index) => {
    const hint = source[index];
    return hint ? `${question} (${hint})` : question;
  });
};

const getGenericMessage = (score: number, tool: ToolItem): string => {
  if (score >= 85) {
    return `${tool.title} shows a very strong result. Use this as a starting point for a positive conversation.`;
  }

  if (score >= 70) {
    return `${tool.title} shows several areas of alignment. Talk together about the areas that scored lower.`;
  }

  if (score >= 55) {
    return `${tool.title} shows a balanced result. Differences can be useful opportunities to understand each other better.`;
  }

  return `${tool.title} highlights areas worth discussing together. A score is not a judgment of your relationship.`;
};

const getZodiac = (month: number, day: number) => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
};

const zodiacElement: Record<string, string> = {
  Aries: 'Fire',
  Leo: 'Fire',
  Sagittarius: 'Fire',
  Taurus: 'Earth',
  Virgo: 'Earth',
  Capricorn: 'Earth',
  Gemini: 'Air',
  Libra: 'Air',
  Aquarius: 'Air',
  Cancer: 'Water',
  Scorpio: 'Water',
  Pisces: 'Water',
};

const zodiacBaseScore: Record<string, Record<string, number>> = {
  Fire: { Fire: 78, Earth: 55, Air: 88, Water: 52 },
  Earth: { Fire: 55, Earth: 84, Air: 62, Water: 82 },
  Air: { Fire: 88, Earth: 62, Air: 80, Water: 64 },
  Water: { Fire: 52, Earth: 82, Air: 64, Water: 86 },
};

const parseDateParts = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);

  if (!year || !month || !day) return null;

  return { year, month, day };
};

const calculateAge = (birthDate: string) => {
  const parts = parseDateParts(birthDate);
  if (!parts) return null;

  const today = new Date();

  let age = today.getFullYear() - parts.year;

  const birthdayPassed =
    today.getMonth() + 1 > parts.month ||
    (today.getMonth() + 1 === parts.month && today.getDate() >= parts.day);

  if (!birthdayPassed) age -= 1;

  return age >= 0 ? age : null;
};

const getInitialScore = (first: string, second: string) => {
  const a = normalizeText(first);
  const b = normalizeText(second);

  if (!a || !b) return 0;

  const combined = `${a}|${b}`;
  return 45 + (hashText(combined) % 56);
};

const flamesResult = (first: string, second: string) => {
  const a = normalizeText(first);
  const b = normalizeText(second);

  if (!a || !b) return null;

  const firstChars = a.split('');
  const secondChars = b.split('');

  for (let i = firstChars.length - 1; i >= 0; i -= 1) {
    const matchIndex = secondChars.indexOf(firstChars[i]);

    if (matchIndex !== -1) {
      firstChars.splice(i, 1);
      secondChars.splice(matchIndex, 1);
    }
  }

  const remaining = firstChars.length + secondChars.length;

  if (remaining === 0) {
    return 'Friends';
  }

  const letters = ['F', 'L', 'A', 'M', 'E', 'S'];
  const meanings: Record<string, string> = {
    F: 'Friends',
    L: 'Love',
    A: 'Affection',
    M: 'Marriage',
    E: 'Enemies',
    S: 'Siblings',
  };

  let index = 0;
  let remainingLetters = [...letters];

  while (remainingLetters.length > 1) {
    index = (index + remaining - 1) % remainingLetters.length;
    remainingLetters.splice(index, 1);
  }

  return meanings[remainingLetters[0]];
};

const getBirthdayScore = (firstDate: string, secondDate: string) => {
  const a = parseDateParts(firstDate);
  const b = parseDateParts(secondDate);

  if (!a || !b) return 0;

  const firstNumber =
    a.month + a.day + String(a.year).split('').reduce((sum, n) => sum + Number(n), 0);

  const secondNumber =
    b.month + b.day + String(b.year).split('').reduce((sum, n) => sum + Number(n), 0);

  const difference = Math.abs(firstNumber - secondNumber);
  const yearDifference = Math.abs(a.year - b.year);

  return clampScore(92 - difference * 3 - Math.min(yearDifference, 20) * 1.2);
};

const ShareButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-xl bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 font-bold text-sm transition-colors inline-flex items-center justify-center gap-2"
  >
    <Share2 className="w-4 h-4" />
    Share Result
  </button>
);

const ResetButton: React.FC<{
  onClick: () => void;
  label?: string;
}> = ({ onClick, label = 'Try Again' }) => (
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
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {description}
        </p>
      </div>
    </div>

    {children}
  </div>
);

const NameInputs: React.FC<{
  first: string;
  second: string;
  setFirst: (value: string) => void;
  setSecond: (value: string) => void;
}> = ({ first, second, setFirst, setSecond }) => (
  <div className="grid sm:grid-cols-2 gap-4">
    <label className="block">
      <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
        Your name
      </span>
      <input
        value={first}
        onChange={(event) => setFirst(event.target.value)}
        placeholder="Enter your name"
        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500"
      />
    </label>

    <label className="block">
      <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
        Partner's name
      </span>
      <input
        value={second}
        onChange={(event) => setSecond(event.target.value)}
        placeholder="Enter partner's name"
        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500"
      />
    </label>
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

    <p className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-2">
      Your Result
    </p>

    <h2 className="text-4xl font-black text-slate-900 dark:text-white">
      {score}%
    </h2>

    {label && (
      <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400 mt-2">
        {label}
      </h3>
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

const PhaseOneNameTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
  mode: 'crush' | 'initials';
}> = ({ tool, onShare, mode }) => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!first.trim() || !second.trim()) return 0;

    if (mode === 'initials') {
      const a = normalizeText(first).slice(0, 3);
      const b = normalizeText(second).slice(0, 3);

      if (!a || !b) return 0;

      const sameLetters = [...a].filter((letter) => b.includes(letter)).length;
      return clampScore(55 + sameLetters * 12 + (hashText(`${a}${b}`) % 25));
    }

    return getInitialScore(first, second);
  }, [first, second, mode]);

  const ready = Boolean(first.trim() && second.trim());

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Enter both names to generate a consistent entertainment-style match result."
      icon={<Users className="w-5 h-5" />}
    >
      {!submitted ? (
        <>
          <NameInputs
            first={first}
            second={second}
            setFirst={setFirst}
            setSecond={setSecond}
          />

          <button
            type="button"
            disabled={!ready}
            onClick={() => setSubmitted(true)}
            className="w-full mt-5 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            Calculate Match
          </button>
        </>
      ) : (
        <ResultCard
          score={score}
          label={getScoreLabel(score)}
          message={
            mode === 'initials'
              ? `The initials pattern for ${first} and ${second} produced a ${score}% match. This is a fun calculation, not a scientific compatibility measurement.`
              : `${first} and ${second} received a ${score}% crush compatibility result. Use it for entertainment and as a conversation starter, not as a prediction of a relationship.`
          }
          onShare={() =>
            onShare({
              title: `${tool.title} Result`,
              text: `${first} and ${second} got ${score}% on ${tool.title} at LoveScoreTest.com.`,
              url: window.location.href,
            })
          }
          onReset={() => {
            setSubmitted(false);
          }}
        />
      )}

      <p className="text-center text-xs text-slate-400 mt-4">
        For entertainment only. Results are generated from the information you enter.
      </p>
    </ToolShell>
  );
};

const FlamesTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const ready = Boolean(first.trim() && second.trim());

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Enter two names and use the classic FLAMES elimination game."
      icon={<Heart className="w-5 h-5" />}
    >
      {!result ? (
        <>
          <NameInputs
            first={first}
            second={second}
            setFirst={setFirst}
            setSecond={setSecond}
          />

          <button
            type="button"
            disabled={!ready}
            onClick={() => setResult(flamesResult(first, second))}
            className="w-full mt-5 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            Calculate FLAMES
          </button>
        </>
      ) : (
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-3">
            FLAMES Result
          </p>

          <div className="text-4xl font-black text-slate-900 dark:text-white mb-3">
            {result}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {first} + {second} → {result}. FLAMES is a classic name game for
            entertainment and does not scientifically predict relationships.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <ShareButton
              onClick={() =>
                onShare({
                  title: `${tool.title} Result`,
                  text: `${first} + ${second} got "${result}" in the FLAMES game on LoveScoreTest.com.`,
                  url: window.location.href,
                })
              }
            />
            <ResetButton
              onClick={() => {
                setResult(null);
              }}
            />
          </div>
        </div>
      )}

      <p className="text-center text-xs text-slate-400 mt-4">
        Classic FLAMES game • Entertainment only
      </p>
    </ToolShell>
  );
};

const ZodiacTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [firstDate, setFirstDate] = useState('');
  const [secondDate, setSecondDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    const a = parseDateParts(firstDate);
    const b = parseDateParts(secondDate);

    if (!a || !b) return null;

    const signA = getZodiac(a.month, a.day);
    const signB = getZodiac(b.month, b.day);

    const elementA = zodiacElement[signA];
    const elementB = zodiacElement[signB];

    const score = zodiacBaseScore[elementA][elementB];

    return { signA, signB, elementA, elementB, score };
  }, [firstDate, secondDate]);

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Enter both birth dates to compare zodiac signs and their traditional element pairing."
      icon={<CalendarDays className="w-5 h-5" />}
    >
      {!submitted ? (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Your birth date
              </span>
              <input
                type="date"
                value={firstDate}
                onChange={(event) => setFirstDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Partner's birth date
              </span>
              <input
                type="date"
                value={secondDate}
                onChange={(event) => setSecondDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500"
              />
            </label>
          </div>

          <button
            type="button"
            disabled={!firstDate || !secondDate}
            onClick={() => setSubmitted(true)}
            className="w-full mt-5 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            Check Zodiac Match
          </button>
        </>
      ) : result ? (
        <ResultCard
          score={result.score}
          label={`${result.signA} + ${result.signB}`}
          message={`${result.signA} (${result.elementA}) and ${result.signB} (${result.elementB}) receive a ${result.score}% traditional zodiac compatibility result. Astrology is a belief system and this result is for entertainment, not a scientific measurement.`}
          onShare={() =>
            onShare({
              title: `${tool.title} Result`,
              text: `${result.signA} + ${result.signB} = ${result.score}% on ${tool.title} at LoveScoreTest.com.`,
              url: window.location.href,
            })
          }
          onReset={() => setSubmitted(false)}
        />
      ) : null}

      <p className="text-center text-xs text-slate-400 mt-4">
        Astrology-based entertainment result • Not scientifically validated
      </p>
    </ToolShell>
  );
};

const BirthdayTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [firstDate, setFirstDate] = useState('');
  const [secondDate, setSecondDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () => getBirthdayScore(firstDate, secondDate),
    [firstDate, secondDate],
  );

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Compare two birthdays using a transparent date-based entertainment calculation."
      icon={<CalendarDays className="w-5 h-5" />}
    >
      {!submitted ? (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Your birthday
              </span>
              <input
                type="date"
                value={firstDate}
                onChange={(event) => setFirstDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Partner's birthday
              </span>
              <input
                type="date"
                value={secondDate}
                onChange={(event) => setSecondDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-pink-500"
              />
            </label>
          </div>

          <button
            type="button"
            disabled={!firstDate || !secondDate}
            onClick={() => setSubmitted(true)}
            className="w-full mt-5 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            Calculate Birthday Match
          </button>
        </>
      ) : (
        <ResultCard
          score={score}
          label={getScoreLabel(score)}
          message={`Your birthday comparison produced a ${score}% entertainment score. The calculation uses the entered dates and is designed as a fun relationship game, not a scientific compatibility test.`}
          onShare={() =>
            onShare({
              title: `${tool.title} Result`,
              text: `We got ${score}% on ${tool.title} at LoveScoreTest.com.`,
              url: window.location.href,
            })
          }
          onReset={() => setSubmitted(false)}
        />
      )}

      <p className="text-center text-xs text-slate-400 mt-4">
        Entertainment calculation • No personal data is sent to a server by this tool.
      </p>
    </ToolShell>
  );
};

const TrueLovePotentialTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const questions = [
    'We communicate openly when something is bothering us.',
    'We respect each other even when we disagree.',
    'We can depend on each other during difficult moments.',
    'We make time for each other despite busy schedules.',
    'We share important values or long-term goals.',
    'We can apologize, forgive, and move forward after conflict.',
  ];

  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Object.keys(answers).length;

  const score = useMemo(() => {
    if (!answeredCount) return 0;

    const total = Object.values(answers).reduce((sum, value) => sum + value, 0);
    return clampScore((total / (QUESTION_COUNT * 5)) * 100);
  }, [answers, answeredCount]);

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Answer six relationship questions to create a conversation-focused potential score."
      icon={<Heart className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {questions.map((question, index) => (
              <div
                key={question}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-4">
                  {index + 1}. {question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {[
                    [1, 'Strongly No'],
                    [2, 'Mostly No'],
                    [3, 'Sometimes'],
                    [4, 'Mostly Yes'],
                    [5, 'Strongly Yes'],
                  ].map(([value, label]) => {
                    const numericValue = Number(value);
                    const selected = answers[index] === numericValue;

                    return (
                      <button
                        key={numericValue}
                        type="button"
                        onClick={() =>
                          setAnswers((current) => ({
                            ...current,
                            [index]: numericValue,
                          }))
                        }
                        className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition-all border ${
                          selected
                            ? 'bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-500/20'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled={answeredCount !== QUESTION_COUNT}
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            See My Result
          </button>

          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {QUESTION_COUNT} answered
          </p>
        </>
      ) : (
        <ResultCard
          score={score}
          label={getScoreLabel(score)}
          message={`Your answers produced a ${score}% relationship potential score. It reflects the answers you gave today and is intended as a conversation starter, not a prediction of whether a relationship will succeed.`}
          onShare={() =>
            onShare({
              title: `${tool.title} Result`,
              text: `I got ${score}% — ${getScoreLabel(score)} on ${tool.title} at LoveScoreTest.com.`,
              url: window.location.href,
            })
          }
          onReset={reset}
        />
      )}
    </ToolShell>
  );
};

const GenericTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const questions = useMemo(() => getGenericQuestions(tool), [tool]);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Object.keys(answers).length;

  const score = useMemo(() => {
    if (!answeredCount) return 0;

    const total = Object.values(answers).reduce((sum, value) => sum + value, 0);
    return clampScore((total / (answeredCount * 5)) * 100);
  }, [answers, answeredCount]);

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Answer these questions honestly. There are no right or wrong answers."
      icon={<Sparkles className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {questions.map((question, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-4">
                  {index + 1}. {question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {[
                    [1, 'Not at all'],
                    [2, 'A little'],
                    [3, 'Sometimes'],
                    [4, 'Often'],
                    [5, 'Very much'],
                  ].map(([value, label]) => {
                    const numericValue = Number(value);
                    const selected = answers[index] === numericValue;

                    return (
                      <button
                        key={numericValue}
                        type="button"
                        onClick={() =>
                          setAnswers((current) => ({
                            ...current,
                            [index]: numericValue,
                          }))
                        }
                        className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition-all border ${
                          selected
                            ? 'bg-pink-600 text-white border-pink-600'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled={answeredCount !== QUESTION_COUNT}
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            See My Result
          </button>

          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {QUESTION_COUNT} answered
          </p>
        </>
      ) : (
        <ResultCard
          score={score}
          label={getScoreLabel(score)}
          message={getGenericMessage(score, tool)}
          onShare={() =>
            onShare({
              title: `${tool.title} Result`,
              text: `I got ${score}% — ${getScoreLabel(score)} on ${tool.title} at LoveScoreTest.com.`,
              url: window.location.href,
            })
          }
          onReset={reset}
        />
      )}
    </ToolShell>
  );
};

// ==========================================================
// PHASE 2 TOOLS (17-22): Compatibility Tests
// Each tool below uses logic tailored to what it promises —
// either a two-dimension weighted self-assessment, a category
// classifier, or a genuine two-partner comparative match —
// rather than one reused generic scoring formula.
// ==========================================================

const FIVE_POINT_SCALE: [number, string][] = [
  [1, 'Strongly No'],
  [2, 'Mostly No'],
  [3, 'Sometimes'],
  [4, 'Mostly Yes'],
  [5, 'Strongly Yes'],
];

const RatingQuestion: React.FC<{
  index: number;
  question: string;
  value?: number;
  onSelect: (value: number) => void;
}> = ({ index, question, value, onSelect }) => (
  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-4">
      {index + 1}. {question}
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
      {FIVE_POINT_SCALE.map(([num, label]) => (
        <button
          key={num}
          type="button"
          onClick={() => onSelect(num as number)}
          className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition-all border ${
            value === num
              ? 'bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-500/20'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

// ---------- 17. Emotional Compatibility Test ----------
// Two-dimension weighted self-assessment: 4 Empathy questions +
// 4 Emotional-Safety questions, scored independently. The lower
// of the two dimensions determines the growth-area archetype —
// a genuinely different computation path than a flat average.
type EmotionalDimension = 'empathy' | 'safety';

const EMOTIONAL_QUESTIONS: { text: string; dimension: EmotionalDimension }[] = [
  { text: 'When your partner is upset, how naturally do you tune in and comfort them without being asked?', dimension: 'empathy' },
  { text: 'How well do you notice subtle mood changes in your partner before they say anything?', dimension: 'empathy' },
  { text: 'How much effort do you make to understand your partner\u2019s point of view during a disagreement?', dimension: 'empathy' },
  { text: 'How often do you validate your partner\u2019s feelings even when you do not fully agree with them?', dimension: 'empathy' },
  { text: 'How safe do you feel sharing your fears or insecurities with your partner?', dimension: 'safety' },
  { text: 'How confident are you that vulnerable things you share will not be used against you later?', dimension: 'safety' },
  { text: 'How comfortable are you showing raw emotion (including crying) in front of your partner?', dimension: 'safety' },
  { text: 'How consistently does your partner respond to your emotions with patience rather than judgment?', dimension: 'safety' },
];

const EmotionalCompatibilityTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);
  const answeredCount = Object.keys(answers).length;

  const { empathyScore, safetyScore, overall } = useMemo(() => {
    const empathyVals = EMOTIONAL_QUESTIONS.map((q, i) => (q.dimension === 'empathy' ? answers[i] : undefined)).filter(
      (v): v is number => typeof v === 'number',
    );
    const safetyVals = EMOTIONAL_QUESTIONS.map((q, i) => (q.dimension === 'safety' ? answers[i] : undefined)).filter(
      (v): v is number => typeof v === 'number',
    );

    const empathy = empathyVals.length ? clampScore((empathyVals.reduce((s, v) => s + v, 0) / (empathyVals.length * 5)) * 100) : 0;
    const safety = safetyVals.length ? clampScore((safetyVals.reduce((s, v) => s + v, 0) / (safetyVals.length * 5)) * 100) : 0;

    return { empathyScore: empathy, safetyScore: safety, overall: clampScore((empathy + safety) / 2) };
  }, [answers]);

  const archetype = useMemo(() => {
    if (empathyScore >= 75 && safetyScore >= 75) {
      return {
        title: 'Emotional Anchors',
        text: 'You both read each other\u2019s feelings well and create a space where vulnerability feels safe. This is one of the strongest predictors of long-term relationship stability.',
      };
    }
    if (empathyScore - safetyScore >= 15) {
      return {
        title: 'Big Hearts, Guarded Walls',
        text: 'You tune into your partner\u2019s emotions well, but emotional safety trails behind \u2014 something may still feel risky to share fully. Building consistent, judgment-free responses over time will help close this gap.',
      };
    }
    if (safetyScore - empathyScore >= 15) {
      return {
        title: 'Safe but Distant',
        text: 'There is a foundation of trust and safety, but active empathy \u2014 noticing and responding to unspoken feelings \u2014 has room to grow. Try checking in with open questions instead of waiting to be told.',
      };
    }
    return {
      title: 'Growing Together',
      text: 'Empathy and emotional safety are developing in tandem. Keep having honest check-ins \u2014 consistency, not perfection, is what deepens emotional intimacy.',
    };
  }, [empathyScore, safetyScore]);

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Rate 8 statements across two dimensions: empathy and emotional safety."
      icon={<HeartHandshake className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {EMOTIONAL_QUESTIONS.map((q, index) => (
              <RatingQuestion
                key={index}
                index={index}
                question={q.text}
                value={answers[index]}
                onSelect={(value) => setAnswers((current) => ({ ...current, [index]: value }))}
              />
            ))}
          </div>

          <button
            type="button"
            disabled={answeredCount !== EMOTIONAL_QUESTIONS.length}
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            See My Result
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {EMOTIONAL_QUESTIONS.length} answered
          </p>
        </>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Empathy</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{empathyScore}%</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Emotional Safety</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{safetyScore}%</p>
            </div>
          </div>
          <ResultCard
            score={overall}
            label={archetype.title}
            message={archetype.text}
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `I got ${overall}% (${archetype.title}) on ${tool.title} at LoveScoreTest.com.`,
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

// ---------- 18. Communication Style Match ----------
// Categorical classifier: each of the 6 questions offers 4 options,
// one per communication style. The style with the most picks wins \u2014
// this is a real classification algorithm, not a percentage score.
type CommStyle = 'Direct' | 'Processor' | 'Diplomat' | 'Debater';

const COMM_STYLES: Record<CommStyle, { summary: string; tip: string }> = {
  Direct: {
    summary: 'You say what you mean, quickly and clearly, and expect the same in return.',
    tip: 'Soften delivery with a warm opener before diving into the point \u2014 it lands better with gentler styles.',
  },
  Processor: {
    summary: 'You need time to think before responding, especially during emotional conversations.',
    tip: 'Say "I need a few minutes to think about this" out loud \u2014 silence alone can be misread as disinterest.',
  },
  Diplomat: {
    summary: 'You prioritize harmony and choose words carefully to avoid hurting the other person.',
    tip: 'Practice naming a real concern directly at least once a week \u2014 over-softening can bury real issues.',
  },
  Debater: {
    summary: 'You enjoy exploring an issue from every angle, sometimes for the sake of the discussion itself.',
    tip: 'Ask "do you want to solve this or talk it through?" \u2014 not every conversation needs to be won.',
  },
};

const COMM_QUESTIONS: { question: string; options: { text: string; style: CommStyle }[] }[] = [
  {
    question: 'A disagreement starts. What is your first instinct?',
    options: [
      { text: 'Say exactly what is bothering me, right away', style: 'Direct' },
      { text: 'Go quiet for a bit to gather my thoughts first', style: 'Processor' },
      { text: 'Choose my words carefully so no one feels attacked', style: 'Diplomat' },
      { text: 'Start unpacking every angle of the issue out loud', style: 'Debater' },
    ],
  },
  {
    question: 'Your partner seems upset but has not said why. You...',
    options: [
      { text: 'Ask directly: "What is wrong? Tell me now."', style: 'Direct' },
      { text: 'Give them space and wait for them to bring it up', style: 'Processor' },
      { text: 'Gently check in without pushing too hard', style: 'Diplomat' },
      { text: 'Start guessing out loud and talking through possibilities', style: 'Debater' },
    ],
  },
  {
    question: 'During a text conversation about something important, you prefer to...',
    options: [
      { text: 'Get straight to the point in a few lines', style: 'Direct' },
      { text: 'Wait until you can call or talk in person instead', style: 'Processor' },
      { text: 'Add reassuring context so tone is not misread', style: 'Diplomat' },
      { text: 'Send several messages exploring the topic in depth', style: 'Debater' },
    ],
  },
  {
    question: 'When you are wrong about something, you tend to...',
    options: [
      { text: 'Admit it plainly and move on quickly', style: 'Direct' },
      { text: 'Need a bit of quiet time before you can say it', style: 'Processor' },
      { text: 'Apologize warmly, sometimes over-apologizing', style: 'Diplomat' },
      { text: 'Want to discuss exactly how the misunderstanding happened', style: 'Debater' },
    ],
  },
  {
    question: 'Your ideal way to resolve a recurring disagreement is...',
    options: [
      { text: 'Name the issue plainly and agree on a fix on the spot', style: 'Direct' },
      { text: 'Sleep on it, then talk once thoughts feel settled', style: 'Processor' },
      { text: 'Find a compromise that keeps the peace for both', style: 'Diplomat' },
      { text: 'Talk it through fully until every angle is covered', style: 'Debater' },
    ],
  },
  {
    question: 'When your partner raises a sensitive topic, you...',
    options: [
      { text: 'Address it head-on immediately', style: 'Direct' },
      { text: 'Ask for a little time to process before responding', style: 'Processor' },
      { text: 'Respond gently, watching their reaction closely', style: 'Diplomat' },
      { text: 'Ask follow-up questions to fully understand it', style: 'Debater' },
    ],
  },
];

const CommunicationStyleTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [answers, setAnswers] = useState<Record<number, CommStyle>>({});
  const [showResult, setShowResult] = useState(false);
  const answeredCount = Object.keys(answers).length;

  const tally = useMemo(() => {
    const counts: Record<CommStyle, number> = { Direct: 0, Processor: 0, Diplomat: 0, Debater: 0 };
    Object.values(answers).forEach((style) => {
      counts[style] += 1;
    });
    return counts;
  }, [answers]);

  const ranked = useMemo(
    () => (Object.entries(tally) as [CommStyle, number][]).sort((a, b) => b[1] - a[1]),
    [tally],
  );

  const primary = ranked[0]?.[0];
  const secondary = ranked[1] && ranked[1][1] > 0 && ranked[1][1] >= ranked[0][1] - 1 ? ranked[1][0] : null;

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Answer 6 scenarios to identify your dominant communication style."
      icon={<MessageCircle className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {COMM_QUESTIONS.map((q, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-4">
                  {index + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const selected = answers[index] === opt.style;
                    return (
                      <button
                        key={opt.style}
                        type="button"
                        onClick={() => setAnswers((current) => ({ ...current, [index]: opt.style }))}
                        className={`w-full text-left rounded-xl px-4 py-2.5 text-xs font-semibold transition-all border ${
                          selected
                            ? 'bg-pink-600 text-white border-pink-600'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled={answeredCount !== COMM_QUESTIONS.length}
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            Reveal My Style
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {COMM_QUESTIONS.length} answered
          </p>
        </>
      ) : primary ? (
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-2">Your Communication Style</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-1">
            {primary}
            {secondary ? ` / ${secondary}` : ''}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto mt-3">
            {COMM_STYLES[primary].summary}
          </p>

          <div className="mt-5 space-y-2">
            {ranked.map(([style, count]) => (
              <div key={style} className="flex items-center gap-3">
                <span className="w-20 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">{style}</span>
                <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-pink-500 rounded-full"
                    style={{ width: `${(count / COMM_QUESTIONS.length) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-xs text-slate-400">{count}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-pink-50 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/40 text-left">
            <p className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider mb-1">Tip for you</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{COMM_STYLES[primary].tip}</p>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <ShareButton
              onClick={() =>
                onShare({
                  title: `${tool.title} Result`,
                  text: `My communication style is ${primary} \u2014 according to ${tool.title} at LoveScoreTest.com.`,
                  url: window.location.href,
                })
              }
            />
            <ResetButton onClick={reset} />
          </div>
        </div>
      ) : null}
    </ToolShell>
  );
};

// ---------- 19. Lifestyle & Habits Compatibility ----------
// Two-partner comparative match: both partners pick their own habit
// per category from 4 ordered options. Category score is based on
// the ordinal distance between the two picks (0 apart = 100%, 3
// apart = 0%) \u2014 a genuine deterministic matching algorithm.
const LIFESTYLE_CATEGORIES: { label: string; options: string[] }[] = [
  { label: 'Sleep schedule', options: ['Early bird', 'Balanced', 'Night owl', 'Totally irregular'] },
  { label: 'Tidiness at home', options: ['Very tidy', 'Mostly tidy', 'Relaxed', 'Comfortably messy'] },
  { label: 'Cooking vs ordering in', options: ['Cook almost daily', 'Cook sometimes', 'Order in often', 'Rarely cook'] },
  { label: 'Hosting guests at home', options: ['Love hosting often', 'Occasional guests', 'Prefer just us', 'Very private space'] },
];

const LifestyleHabitsTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [picksA, setPicksA] = useState<Record<number, number>>({});
  const [picksB, setPicksB] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Math.min(Object.keys(picksA).length, Object.keys(picksB).length);

  const { categoryScores, overall, frictionCategories } = useMemo(() => {
    const scores = LIFESTYLE_CATEGORIES.map((cat, i) => {
      if (picksA[i] === undefined || picksB[i] === undefined) return null;
      const distance = Math.abs(picksA[i] - picksB[i]);
      return clampScore(100 - distance * (100 / 3));
    });

    const valid = scores.filter((s): s is number => s !== null);
    const overallScore = valid.length ? clampScore(valid.reduce((s, v) => s + v, 0) / valid.length) : 0;
    const friction = LIFESTYLE_CATEGORIES.filter((_, i) => scores[i] !== null && (scores[i] as number) <= 34).map((c) => c.label);

    return { categoryScores: scores, overall: overallScore, frictionCategories: friction };
  }, [picksA, picksB]);

  const reset = () => {
    setPicksA({});
    setPicksB({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Each partner picks their own habit per category \u2014 we compare how closely your daily routines align."
      icon={<Home className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {LIFESTYLE_CATEGORIES.map((cat, index) => (
              <div key={cat.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-3">{cat.label}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { picks: picksA, setPicks: setPicksA, who: 'You' },
                    { picks: picksB, setPicks: setPicksB, who: 'Partner' },
                  ].map(({ picks, setPicks, who }) => (
                    <div key={who}>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{who}</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {cat.options.map((opt, optIndex) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setPicks((current) => ({ ...current, [index]: optIndex }))}
                            className={`rounded-lg px-2 py-2 text-[11px] font-semibold border transition-all ${
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

          <button
            type="button"
            disabled={answeredCount !== LIFESTYLE_CATEGORIES.length}
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            See Lifestyle Match
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {LIFESTYLE_CATEGORIES.length} categories completed for both
          </p>
        </>
      ) : (
        <div className="mt-2">
          <div className="space-y-2 mb-6">
            {LIFESTYLE_CATEGORIES.map((cat, i) => (
              <div key={cat.label} className="flex items-center gap-3">
                <span className="w-40 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">{cat.label}</span>
                <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${categoryScores[i] ?? 0}%` }} />
                </div>
                <span className="w-10 text-xs text-slate-400 text-right">{categoryScores[i]}%</span>
              </div>
            ))}
          </div>
          <ResultCard
            score={overall}
            label={getScoreLabel(overall)}
            message={
              frictionCategories.length
                ? `Your daily routines align at ${overall}%. The biggest friction points are: ${frictionCategories.join(', ')}. These are worth a direct conversation rather than assuming your partner sees it the same way.`
                : `Your daily routines align at ${overall}% \u2014 no major friction categories found. Small daily habits rarely cause big problems when both partners already move in sync.`
            }
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `We got ${overall}% on ${tool.title} at LoveScoreTest.com.`,
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

// ---------- 20. Financial Harmony Quiz ----------
// Two-partner comparative: each partner independently answers 5
// scenario questions scored on a Saver(-2) to Spender(+2) axis.
// Each gets their own money-archetype from their own sum, and the
// compatibility score is a gap-based formula between the two sums.
const FINANCIAL_QUESTIONS: { question: string; options: { text: string; value: number }[] }[] = [
  {
    question: 'You unexpectedly receive $500. Your first instinct is to...',
    options: [
      { text: 'Put it straight into savings or investments', value: -2 },
      { text: 'Save most of it, spend a little on something nice', value: -1 },
      { text: 'Split it between saving and a fun purchase', value: 1 },
      { text: 'Treat yourself \u2014 you earned it', value: 2 },
    ],
  },
  {
    question: 'Before a big purchase, you typically...',
    options: [
      { text: 'Research for days or weeks and compare prices', value: -2 },
      { text: 'Think it over for a few days first', value: -1 },
      { text: 'Decide fairly quickly if it feels worth it', value: 1 },
      { text: 'Buy it if you want it \u2014 life is short', value: 2 },
    ],
  },
  {
    question: 'How do you feel about carrying a monthly budget or spreadsheet?',
    options: [
      { text: 'Essential \u2014 I track nearly every expense', value: -2 },
      { text: 'I keep a rough budget in mind', value: -1 },
      { text: 'I check in on spending occasionally', value: 1 },
      { text: 'I rarely track it closely', value: 2 },
    ],
  },
  {
    question: 'A friend suggests a spontaneous, somewhat pricey weekend trip. You...',
    options: [
      { text: 'Pass \u2014 it is not in the plan', value: -2 },
      { text: 'Consider it only if it fits your savings goals', value: -1 },
      { text: 'Go for it if you can reasonably afford it', value: 1 },
      { text: 'Book it immediately \u2014 memories matter more than money', value: 2 },
    ],
  },
  {
    question: 'Your ideal approach to an emergency fund is...',
    options: [
      { text: 'A large cushion \u2014 6 months of expenses or more, non-negotiable', value: -2 },
      { text: 'A solid buffer of a few months', value: -1 },
      { text: 'A small cushion is nice, but not a priority right now', value: 1 },
      { text: 'You will figure it out if something comes up', value: 2 },
    ],
  },
];

const financialArchetype = (score: number) => {
  if (score <= 35) return 'Dedicated Saver';
  if (score >= 65) return 'Free-Spirited Spender';
  return 'Balanced Money Manager';
};

const FinancialHarmonyTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [answersA, setAnswersA] = useState<Record<number, number>>({});
  const [answersB, setAnswersB] = useState<Record<number, number>>({});
  const [activeTab, setActiveTab] = useState<'You' | 'Partner'>('You');
  const [showResult, setShowResult] = useState(false);

  const answeredA = Object.keys(answersA).length;
  const answeredB = Object.keys(answersB).length;
  const ready = answeredA === FINANCIAL_QUESTIONS.length && answeredB === FINANCIAL_QUESTIONS.length;

  const { scoreA, scoreB, compatibility } = useMemo(() => {
    const toScore = (answers: Record<number, number>) => {
      const vals = Object.values(answers);
      if (!vals.length) return 50;
      const sum = vals.reduce((s, v) => s + v, 0);
      // sum ranges from -10 (max saver) to +10 (max spender) across 5 questions
      return clampScore(50 + (sum / 10) * 50);
    };

    const a = toScore(answersA);
    const b = toScore(answersB);
    return { scoreA: a, scoreB: b, compatibility: clampScore(100 - Math.abs(a - b)) };
  }, [answersA, answersB]);

  const reset = () => {
    setAnswersA({});
    setAnswersB({});
    setActiveTab('You');
    setShowResult(false);
  };

  const archetypeA = financialArchetype(scoreA);
  const archetypeB = financialArchetype(scoreB);

  const combinationTip = () => {
    if (archetypeA === archetypeB && archetypeA !== 'Balanced Money Manager') {
      return archetypeA === 'Dedicated Saver'
        ? 'You are both natural savers \u2014 great alignment, just remember to budget for shared fun so money never feels only like a restriction.'
        : 'You both lean toward spending freely \u2014 consider setting one shared savings rule together so future goals stay protected.';
    }
    if (archetypeA !== archetypeB && archetypeA !== 'Balanced Money Manager' && archetypeB !== 'Balanced Money Manager') {
      return 'One of you leans toward saving and the other toward spending. This is very common \u2014 the key is agreeing on shared, non-negotiable savings goals while still allowing each person guilt-free personal spending money.';
    }
    return 'Your money styles are reasonably close. Keep having light, regular money check-ins so small differences never turn into bigger disagreements.';
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Each partner answers independently \u2014 switch tabs to fill in both sets of answers."
      icon={<Coins className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="flex gap-2 mb-5">
            {(['You', 'Partner'] as const).map((who) => (
              <button
                key={who}
                type="button"
                onClick={() => setActiveTab(who)}
                className={`flex-1 rounded-xl py-2.5 text-sm font-bold border transition-all ${
                  activeTab === who
                    ? 'bg-pink-600 text-white border-pink-600'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {who} ({who === 'You' ? answeredA : answeredB}/{FINANCIAL_QUESTIONS.length})
              </button>
            ))}
          </div>

          <div className="space-y-5">
            {FINANCIAL_QUESTIONS.map((q, index) => {
              const answers = activeTab === 'You' ? answersA : answersB;
              const setAnswers = activeTab === 'You' ? setAnswersA : setAnswersB;
              return (
                <div key={index} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-3">
                    {index + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const selected = answers[index] === opt.value;
                      return (
                        <button
                          key={opt.text}
                          type="button"
                          onClick={() => setAnswers((current) => ({ ...current, [index]: opt.value }))}
                          className={`w-full text-left rounded-xl px-4 py-2.5 text-xs font-semibold transition-all border ${
                            selected
                              ? 'bg-pink-600 text-white border-pink-600'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
                          }`}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            disabled={!ready}
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            See Financial Harmony Result
          </button>
        </>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">You</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{archetypeA}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Partner</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{archetypeB}</p>
            </div>
          </div>
          <ResultCard
            score={compatibility}
            label={getScoreLabel(compatibility)}
            message={combinationTip()}
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `We got ${compatibility}% on ${tool.title} at LoveScoreTest.com.`,
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

// ---------- 21. Future Goals & Vision Match ----------
// Genuine category-matching algorithm: both partners pick one option
// per life-goal category. Identical answers score full points,
// "undecided"-style answers score half credit (compatible-but-unclear),
// and differing concrete answers score zero \u2014 then summed to a
// real alignment percentage.
const GOALS_CATEGORIES: { label: string; options: string[]; neutralIndex: number }[] = [
  { label: 'Do you want children?', options: ['Yes', 'No', 'Undecided'], neutralIndex: 2 },
  { label: 'Career vs. family priority', options: ['Career-first', 'Balanced', 'Family-first', 'Not sure yet'], neutralIndex: 3 },
  { label: 'Where do you want to live long-term?', options: ['Big city', 'Suburbs', 'Countryside', 'Open to anywhere'], neutralIndex: 3 },
  { label: 'Retirement outlook', options: ['Retire early (FIRE)', 'Traditional retirement age', 'Work as long as possible', 'Have not thought about it'], neutralIndex: 3 },
  { label: 'Marriage / next-step timeline', options: ['As soon as possible', 'Within a few years', 'No rush at all', 'Not sure'], neutralIndex: 3 },
];

const FutureGoalsTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [picksA, setPicksA] = useState<Record<number, number>>({});
  const [picksB, setPicksB] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Math.min(Object.keys(picksA).length, Object.keys(picksB).length);

  const { alignment, aligned, toDiscuss } = useMemo(() => {
    let points = 0;
    const alignedList: string[] = [];
    const discussList: string[] = [];

    GOALS_CATEGORIES.forEach((cat, i) => {
      if (picksA[i] === undefined || picksB[i] === undefined) return;
      if (picksA[i] === picksB[i]) {
        points += 20;
        alignedList.push(cat.label);
      } else if (picksA[i] === cat.neutralIndex || picksB[i] === cat.neutralIndex) {
        points += 10;
        discussList.push(cat.label);
      } else {
        discussList.push(cat.label);
      }
    });

    return { alignment: clampScore(points), aligned: alignedList, toDiscuss: discussList };
  }, [picksA, picksB]);

  const reset = () => {
    setPicksA({});
    setPicksB({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Both partners pick their own answer per category \u2014 we calculate real alignment on your life direction."
      icon={<Compass className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {GOALS_CATEGORIES.map((cat, index) => (
              <div key={cat.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-3">{cat.label}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { picks: picksA, setPicks: setPicksA, who: 'You' },
                    { picks: picksB, setPicks: setPicksB, who: 'Partner' },
                  ].map(({ picks, setPicks, who }) => (
                    <div key={who}>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{who}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.options.map((opt, optIndex) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setPicks((current) => ({ ...current, [index]: optIndex }))}
                            className={`rounded-lg px-2.5 py-2 text-[11px] font-semibold border transition-all ${
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

          <button
            type="button"
            disabled={answeredCount !== GOALS_CATEGORIES.length}
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            See Vision Alignment
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {GOALS_CATEGORIES.length} categories completed for both
          </p>
        </>
      ) : (
        <ResultCard
          score={alignment}
          label={getScoreLabel(alignment)}
          message={
            toDiscuss.length
              ? `You are aligned on ${aligned.length} of ${GOALS_CATEGORIES.length} life categories. Worth a real conversation on: ${toDiscuss.join(', ')}. Differences here are not dealbreakers \u2014 but they are far easier to navigate when discussed early.`
              : `You are fully aligned across all ${GOALS_CATEGORIES.length} life-vision categories \u2014 a strong sign you are building toward the same future.`
          }
          onShare={() =>
            onShare({
              title: `${tool.title} Result`,
              text: `We scored ${alignment}% on ${tool.title} at LoveScoreTest.com.`,
              url: window.location.href,
            })
          }
          onReset={reset}
        />
      )}
    </ToolShell>
  );
};

// ---------- 22. Introvert-Extrovert Couple Match ----------
// Two-partner comparative: each partner rates their own social-energy
// response to 4 scenarios (1 = drains me, 5 = energizes me). Each
// partner gets their own energy score and type classification, and
// compatibility uses an "ideal gap" formula \u2014 a small difference is
// treated as complementary, while an extreme difference is friction.
const ENERGY_QUESTIONS = [
  'Being at a lively party full of people you do not know well',
  'A completely free Saturday with zero plans and no one to see',
  'Spontaneously agreeing to a last-minute group hangout tonight',
  'A quiet night in, just the two of you, no phones',
];

const energyType = (score: number) => {
  if (score < 40) return 'Introvert';
  if (score > 60) return 'Extrovert';
  return 'Ambivert';
};

const IntrovertExtrovertTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [answersA, setAnswersA] = useState<Record<number, number>>({});
  const [answersB, setAnswersB] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const answeredA = Object.keys(answersA).length;
  const answeredB = Object.keys(answersB).length;
  const ready = answeredA === ENERGY_QUESTIONS.length && answeredB === ENERGY_QUESTIONS.length;

  const { scoreA, scoreB, compatibility } = useMemo(() => {
    const toScore = (answers: Record<number, number>) => {
      const vals = Object.values(answers);
      if (!vals.length) return 50;
      return clampScore((vals.reduce((s, v) => s + v, 0) / (vals.length * 5)) * 100);
    };
    const a = toScore(answersA);
    const b = toScore(answersB);
    const gap = Math.abs(a - b);
    const idealGap = 22; // a moderate difference tends to be complementary rather than friction
    const compat = clampScore(100 - Math.abs(gap - idealGap) * 1.4);
    return { scoreA: a, scoreB: b, compatibility: compat };
  }, [answersA, answersB]);

  const reset = () => {
    setAnswersA({});
    setAnswersB({});
    setShowResult(false);
  };

  const typeA = energyType(scoreA);
  const typeB = energyType(scoreB);

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Both partners rate their own energy response \u2014 we calculate your social-battery balance."
      icon={<Zap className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {ENERGY_QUESTIONS.map((q, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-3">
                  {index + 1}. {q}
                </p>
                {[
                  { answers: answersA, setAnswers: setAnswersA, who: 'You' },
                  { answers: answersB, setAnswers: setAnswersB, who: 'Partner' },
                ].map(({ answers, setAnswers, who }) => (
                  <div key={who} className="mb-2 last:mb-0">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{who}</span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAnswers((current) => ({ ...current, [index]: val }))}
                          className={`rounded-lg py-2 text-xs font-bold border transition-all ${
                            answers[index] === val
                              ? 'bg-pink-600 text-white border-pink-600'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] text-slate-400 mt-2 mb-4">1 = drains me &nbsp;\u2022&nbsp; 5 = energizes me</p>

          <button
            type="button"
            disabled={!ready}
            onClick={() => setShowResult(true)}
            className="w-full rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            See Energy Balance
          </button>
        </>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">You</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{typeA}</p>
              <p className="text-xs text-slate-400 mt-0.5">{scoreA}% energized</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Partner</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{typeB}</p>
              <p className="text-xs text-slate-400 mt-0.5">{scoreB}% energized</p>
            </div>
          </div>
          <ResultCard
            score={compatibility}
            label={getScoreLabel(compatibility)}
            message={
              typeA === typeB
                ? `You are both ${typeA.toLowerCase()}s. Comfortable alignment, but watch for both under-scheduling or both over-scheduling social time \u2014 balance it consciously.`
                : `You are a ${typeA} paired with a ${typeB}. This kind of gap is often complementary \u2014 one of you can bring energy to plans while the other offers grounding. The key is agreeing on how much alone time and social time each week actually works for you both.`
            }
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `We got ${compatibility}% on ${tool.title} at LoveScoreTest.com.`,
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
// PHASE 2 TOOLS (23-32): Compatibility Tests, continued
// Each tool below uses a genuinely different computation
// shape (categorical classifier, quadrant dimension model,
// set-overlap similarity, slider gap analysis, or weighted
// two-dimension blend) so results reflect what each tool
// actually promises rather than one reused formula.
// ==========================================================

// ---------- Shared: two-partner numeric slider row ----------
// Used by tools that compare a numeric 1-10 (or custom range)
// preference between both partners rather than a discrete pick.
const AffectionSlider: React.FC<{
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  leftHint?: string;
  rightHint?: string;
}> = ({ label, value, onChange, min = 1, max = 10, leftHint, rightHint }) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
      <span className="text-xs font-bold text-pink-600 dark:text-pink-400">{value}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="w-full accent-pink-600"
    />
    {(leftHint || rightHint) && (
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] text-slate-400">{leftHint}</span>
        <span className="text-[10px] text-slate-400">{rightHint}</span>
      </div>
    )}
  </div>
);

// ---------- 23. Humor & Banter Compatibility ----------
// Categorical classifier over 4 comedy styles, but unlike the
// Communication Style tool this also derives a numeric "Comedy
// Rating" from how concentrated the answers are on one style --
// a score that peaks at a healthy mix of consistency and range,
// not at maximum concentration.
type HumorStyle = 'Witty' | 'Silly' | 'Dry' | 'Warm';

const HUMOR_STYLES: Record<HumorStyle, { summary: string; tip: string }> = {
  Witty: {
    summary: 'You love wordplay, quick comebacks, and clever callbacks to old jokes.',
    tip: 'Give your partner a beat to catch up on fast wordplay -- not everyone processes puns at the same speed.',
  },
  Silly: {
    summary: 'You go for the big, physical, goofy laugh over the clever line every time.',
    tip: 'Save the full slapstick energy for private moments if your partner is more reserved in public.',
  },
  Dry: {
    summary: 'Deadpan delivery and understated sarcasm are your comedic home base.',
    tip: 'Add a small smile or a follow-up line occasionally so dry humor does not get mistaken for irritation.',
  },
  Warm: {
    summary: 'Your humor is affectionate -- inside jokes, gentle teasing, and shared references.',
    tip: 'Warm humor lands best consistently; check in if a teasing joke ever seems to sting more than land.',
  },
};

const HUMOR_QUESTIONS: { question: string; options: { text: string; style: HumorStyle }[] }[] = [
  {
    question: 'A friend tells an obviously bad pun. Your reaction is to...',
    options: [
      { text: 'Fire back with an even worse pun immediately', style: 'Witty' },
      { text: 'Groan loudly and fall over dramatically', style: 'Silly' },
      { text: 'Give a flat, one-word "wow" with zero expression', style: 'Dry' },
      { text: 'Laugh warmly because you love that they tried', style: 'Warm' },
    ],
  },
  {
    question: 'Your go-to way to make your partner laugh on a rough day is...',
    options: [
      { text: 'A clever text with a well-timed twist', style: 'Witty' },
      { text: 'A ridiculous voice, face, or mini dance', style: 'Silly' },
      { text: 'A deadpan one-liner about the situation', style: 'Dry' },
      { text: 'Bringing up a private inside joke you both love', style: 'Warm' },
    ],
  },
  {
    question: 'At a party, the humor you gravitate toward is...',
    options: [
      { text: 'Sharp banter and rapid back-and-forth teasing', style: 'Witty' },
      { text: 'Whatever gets the whole room genuinely cracking up', style: 'Silly' },
      { text: 'Muttering the funniest observation under your breath', style: 'Dry' },
      { text: 'Stories that make everyone feel like part of the group', style: 'Warm' },
    ],
  },
  {
    question: 'When you watch comedy together, you prefer...',
    options: [
      { text: 'Fast, clever writing with layered jokes', style: 'Witty' },
      { text: 'Big physical comedy and over-the-top scenarios', style: 'Silly' },
      { text: 'Awkward-humor shows with deadpan characters', style: 'Dry' },
      { text: 'Feel-good comedies with charming, likable characters', style: 'Warm' },
    ],
  },
  {
    question: 'Your partner does something a little clumsy. You...',
    options: [
      { text: 'Make a witty remark about it on the spot', style: 'Witty' },
      { text: 'Exaggerate it into a whole bit', style: 'Silly' },
      { text: 'Raise an eyebrow and say nothing else needed', style: 'Dry' },
      { text: 'Laugh with them and give them a reassuring squeeze', style: 'Warm' },
    ],
  },
  {
    question: 'A joke fully "lands" for you when it...',
    options: [
      { text: 'Is smart, unexpected, or a clever twist on words', style: 'Witty' },
      { text: 'Is just plain silly and impossible not to laugh at', style: 'Silly' },
      { text: 'Is delivered completely straight-faced', style: 'Dry' },
      { text: 'Makes you feel closer to the person who told it', style: 'Warm' },
    ],
  },
];

const HumorBanterTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [answers, setAnswers] = useState<Record<number, HumorStyle>>({});
  const [showResult, setShowResult] = useState(false);
  const answeredCount = Object.keys(answers).length;

  const tally = useMemo(() => {
    const counts: Record<HumorStyle, number> = { Witty: 0, Silly: 0, Dry: 0, Warm: 0 };
    Object.values(answers).forEach((style) => {
      counts[style] += 1;
    });
    return counts;
  }, [answers]);

  const ranked = useMemo(
    () => (Object.entries(tally) as [HumorStyle, number][]).sort((a, b) => b[1] - a[1]),
    [tally],
  );

  const primary = ranked[0]?.[0];
  const topCount = ranked[0]?.[1] ?? 0;

  const comedyRating = useMemo(() => {
    if (!answeredCount) return 0;
    const concentration = topCount / HUMOR_QUESTIONS.length;
    // Peaks around a 2/3 concentration: recognizable style, but with
    // enough range to keep banter feeling fresh rather than rigid.
    return clampScore(100 - Math.abs(concentration - 0.67) * 150);
  }, [topCount, answeredCount]);

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Pick your instinctive reaction to 6 funny scenarios -- we identify your comedy style and rate its clarity."
      icon={<Smile className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {HUMOR_QUESTIONS.map((q, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-4">
                  {index + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const selected = answers[index] === opt.style;
                    return (
                      <button
                        key={opt.style}
                        type="button"
                        onClick={() => setAnswers((current) => ({ ...current, [index]: opt.style }))}
                        className={`w-full text-left rounded-xl px-4 py-2.5 text-xs font-semibold transition-all border ${
                          selected
                            ? 'bg-pink-600 text-white border-pink-600'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled={answeredCount !== HUMOR_QUESTIONS.length}
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            See My Comedy Rating
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {HUMOR_QUESTIONS.length} answered
          </p>
        </>
      ) : primary ? (
        <div className="mt-2">
          <div className="text-center mb-5">
            <p className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-2">Your Humor Style</p>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{primary}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto mt-3">
              {HUMOR_STYLES[primary].summary}
            </p>
          </div>

          <div className="space-y-2 mb-6">
            {ranked.map(([style, count]) => (
              <div key={style} className="flex items-center gap-3">
                <span className="w-16 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">{style}</span>
                <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${(count / HUMOR_QUESTIONS.length) * 100}%` }} />
                </div>
                <span className="w-6 text-xs text-slate-400">{count}</span>
              </div>
            ))}
          </div>

          <ResultCard
            score={comedyRating}
            label="Comedy Rating"
            message={
              comedyRating >= 75
                ? `Your ${primary.toLowerCase()} humor comes through clearly and consistently -- that recognizable comedic identity is something a partner can learn to play off of.`
                : comedyRating >= 50
                ? `You lean ${primary.toLowerCase()}, but your humor also pulls from other styles -- a flexible sense of humor that adapts to the moment.`
                : `Your humor is spread fairly evenly across styles rather than locked into one -- you likely adjust your comedic approach a lot depending on mood and company.`
            }
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `My humor style is ${primary} with a Comedy Rating of ${comedyRating}% on ${tool.title} at LoveScoreTest.com.`,
                url: window.location.href,
              })
            }
            onReset={reset}
          />

          <div className="mt-4 p-4 rounded-2xl bg-pink-50 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/40 text-left">
            <p className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider mb-1">Tip for you</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{HUMOR_STYLES[primary].tip}</p>
          </div>
        </div>
      ) : null}
    </ToolShell>
  );
};

// ---------- 24. Conflict Resolution Style Test ----------
// Categorical classifier: 6 argument scenarios, each with 4
// options mapped to a repair-style archetype. Most-picked style
// wins, mirroring how real conflict-style inventories work.
type ConflictStyle = 'Problem-Solver' | 'Calmer' | 'Ventor' | 'Avoider';

const CONFLICT_STYLES: Record<ConflictStyle, { summary: string; tip: string }> = {
  'Problem-Solver': {
    summary: 'You want to name the issue and fix it -- fast, direct, and solution-focused.',
    tip: 'Say "I want to understand before we fix this" out loud -- jumping straight to solutions can feel like your partner\'s feelings were skipped.',
  },
  Calmer: {
    summary: 'You need to de-escalate the emotional temperature before any real talking can happen.',
    tip: 'Name your pause out loud ("I need 10 minutes, then I am back") -- silent withdrawal can be mistaken for stonewalling.',
  },
  Ventor: {
    summary: 'You process out loud, getting the frustration out before you can think clearly.',
    tip: 'Ask "can I vent for two minutes?" first -- it turns raw venting into something your partner can actually support.',
  },
  Avoider: {
    summary: 'You prefer to let things settle rather than confront a disagreement head-on.',
    tip: 'Small issues avoided too long tend to resurface bigger -- try raising one small thing this week before it grows.',
  },
};

const CONFLICT_QUESTIONS: { question: string; options: { text: string; style: ConflictStyle }[] }[] = [
  {
    question: 'Your partner forgot something important they promised to do. Your first move is to...',
    options: [
      { text: 'Bring it up right away and figure out a fix together', style: 'Problem-Solver' },
      { text: 'Take a breath and wait until you are both calm to talk', style: 'Calmer' },
      { text: 'Let your frustration out immediately, then talk it through', style: 'Ventor' },
      { text: 'Let it go this time rather than start a disagreement', style: 'Avoider' },
    ],
  },
  {
    question: 'Mid-argument, you notice your heart racing and voice rising. You...',
    options: [
      { text: 'Push to resolve it now rather than let it linger', style: 'Problem-Solver' },
      { text: 'Ask for a short break to cool down before continuing', style: 'Calmer' },
      { text: 'Keep talking -- getting it all out helps you settle', style: 'Ventor' },
      { text: 'Quietly disengage and hope it blows over', style: 'Avoider' },
    ],
  },
  {
    question: 'When your partner brings up a complaint about you, you tend to...',
    options: [
      { text: 'Ask what specifically would fix it going forward', style: 'Problem-Solver' },
      { text: 'Listen, but need time before responding fully', style: 'Calmer' },
      { text: 'Respond passionately and defend your side right away', style: 'Ventor' },
      { text: 'Downplay it so the conversation does not escalate', style: 'Avoider' },
    ],
  },
  {
    question: 'A recurring disagreement comes up for the third time this month. You...',
    options: [
      { text: 'Suggest sitting down to map out a real, lasting solution', style: 'Problem-Solver' },
      { text: 'Feel the need to slow the conversation way down first', style: 'Calmer' },
      { text: 'Get more emotionally worked up each time it repeats', style: 'Ventor' },
      { text: 'Hope it eventually stops coming up on its own', style: 'Avoider' },
    ],
  },
  {
    question: 'Your ideal outcome of any disagreement is to...',
    options: [
      { text: 'Walk away with a concrete plan or agreement', style: 'Problem-Solver' },
      { text: 'Walk away feeling calm and emotionally steady again', style: 'Calmer' },
      { text: 'Walk away feeling fully heard and understood', style: 'Ventor' },
      { text: 'Walk away with the peace restored as quickly as possible', style: 'Avoider' },
    ],
  },
  {
    question: 'When your partner is the one upset with themselves (not you), you...',
    options: [
      { text: 'Jump in with practical ways to help fix the situation', style: 'Problem-Solver' },
      { text: 'Give them quiet space before offering anything', style: 'Calmer' },
      { text: 'Encourage them to fully vent it out to you', style: 'Ventor' },
      { text: 'Gently change the subject to lighten the mood', style: 'Avoider' },
    ],
  },
];

const ConflictResolutionTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [answers, setAnswers] = useState<Record<number, ConflictStyle>>({});
  const [showResult, setShowResult] = useState(false);
  const answeredCount = Object.keys(answers).length;

  const tally = useMemo(() => {
    const counts: Record<ConflictStyle, number> = { 'Problem-Solver': 0, Calmer: 0, Ventor: 0, Avoider: 0 };
    Object.values(answers).forEach((style) => {
      counts[style] += 1;
    });
    return counts;
  }, [answers]);

  const ranked = useMemo(
    () => (Object.entries(tally) as [ConflictStyle, number][]).sort((a, b) => b[1] - a[1]),
    [tally],
  );

  const primary = ranked[0]?.[0];
  const secondary = ranked[1] && ranked[1][1] > 0 && ranked[1][1] >= ranked[0][1] - 1 ? ranked[1][0] : null;

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Answer 6 conflict scenarios to reveal your dominant repair style."
      icon={<Scale className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {CONFLICT_QUESTIONS.map((q, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-4">
                  {index + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const selected = answers[index] === opt.style;
                    return (
                      <button
                        key={opt.style}
                        type="button"
                        onClick={() => setAnswers((current) => ({ ...current, [index]: opt.style }))}
                        className={`w-full text-left rounded-xl px-4 py-2.5 text-xs font-semibold transition-all border ${
                          selected
                            ? 'bg-pink-600 text-white border-pink-600'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled={answeredCount !== CONFLICT_QUESTIONS.length}
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            Reveal My Conflict Style
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {CONFLICT_QUESTIONS.length} answered
          </p>
        </>
      ) : primary ? (
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-2">Your Conflict Style</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-1">
            {primary}
            {secondary ? ` / ${secondary}` : ''}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto mt-3">
            {CONFLICT_STYLES[primary].summary}
          </p>

          <div className="mt-5 space-y-2">
            {ranked.map(([style, count]) => (
              <div key={style} className="flex items-center gap-3">
                <span className="w-28 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">{style}</span>
                <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-pink-500 rounded-full"
                    style={{ width: `${(count / CONFLICT_QUESTIONS.length) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-xs text-slate-400">{count}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-pink-50 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/40 text-left">
            <p className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider mb-1">Repair phrase for you</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{CONFLICT_STYLES[primary].tip}</p>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <ShareButton
              onClick={() =>
                onShare({
                  title: `${tool.title} Result`,
                  text: `My conflict resolution style is ${primary} -- according to ${tool.title} at LoveScoreTest.com.`,
                  url: window.location.href,
                })
              }
            />
            <ResetButton onClick={reset} />
          </div>
        </div>
      ) : null}
    </ToolShell>
  );
};

// ---------- 25. Attachment Style Compatibility ----------
// Two-dimension Likert model grounded in attachment theory:
// Anxiety (fear of abandonment) and Avoidance (discomfort with
// closeness) are scored independently, then the quadrant they
// land in determines the attachment archetype -- Secure, Anxious,
// Avoidant, or Fearful-Avoidant.
type AttachmentDimension = 'anxiety' | 'avoidance';

const ATTACHMENT_QUESTIONS: { text: string; dimension: AttachmentDimension }[] = [
  { text: 'How often do you worry your partner does not feel as strongly about the relationship as you do?', dimension: 'anxiety' },
  { text: 'How much do you need frequent reassurance that your partner still loves you?', dimension: 'anxiety' },
  { text: 'How anxious do you feel when your partner is slower than usual to reply?', dimension: 'anxiety' },
  { text: 'How much does the fear of being left affect your day-to-day mood?', dimension: 'anxiety' },
  { text: 'How uncomfortable do you feel when a partner wants a lot of emotional closeness?', dimension: 'avoidance' },
  { text: 'How much do you prefer handling problems on your own rather than leaning on a partner?', dimension: 'avoidance' },
  { text: 'How often do you pull back or need space when things start to feel serious?', dimension: 'avoidance' },
  { text: 'How hard is it for you to say "I need you" out loud, even when it is true?', dimension: 'avoidance' },
];

const attachmentQuadrant = (anxiety: number, avoidance: number) => {
  if (anxiety < 50 && avoidance < 50) {
    return {
      title: 'Secure',
      text: 'You are generally comfortable with both closeness and independence, and you do not spiral easily over normal relationship uncertainty. This is the attachment style associated with the most stable, resilient partnerships.',
    };
  }
  if (anxiety >= 50 && avoidance < 50) {
    return {
      title: 'Anxious',
      text: 'You crave closeness and reassurance, and you can feel destabilized by small signs of distance from your partner. Learning to self-soothe between check-ins, rather than needing them constantly, builds "earned security" over time.',
    };
  }
  if (anxiety < 50 && avoidance >= 50) {
    return {
      title: 'Avoidant',
      text: 'You value independence highly and can feel crowded by too much emotional intensity. Practicing small moments of vulnerability -- even when your instinct is to pull back -- helps a partner feel let in.',
    };
  }
  return {
    title: 'Fearful-Avoidant',
    text: 'You want closeness but also fear it -- a push-pull pattern where intimacy feels both desired and unsafe at once. This style responds especially well to patient, consistent partners and, often, professional support to unpack where the pattern started.',
  };
};

const AttachmentStyleTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);
  const answeredCount = Object.keys(answers).length;

  const { anxietyScore, avoidanceScore, security } = useMemo(() => {
    const anxietyVals = ATTACHMENT_QUESTIONS.map((q, i) => (q.dimension === 'anxiety' ? answers[i] : undefined)).filter(
      (v): v is number => typeof v === 'number',
    );
    const avoidanceVals = ATTACHMENT_QUESTIONS.map((q, i) => (q.dimension === 'avoidance' ? answers[i] : undefined)).filter(
      (v): v is number => typeof v === 'number',
    );

    const anxiety = anxietyVals.length ? clampScore((anxietyVals.reduce((s, v) => s + v, 0) / (anxietyVals.length * 5)) * 100) : 0;
    const avoidance = avoidanceVals.length
      ? clampScore((avoidanceVals.reduce((s, v) => s + v, 0) / (avoidanceVals.length * 5)) * 100)
      : 0;

    return { anxietyScore: anxiety, avoidanceScore: avoidance, security: clampScore(100 - (anxiety + avoidance) / 2) };
  }, [answers]);

  const quadrant = useMemo(() => attachmentQuadrant(anxietyScore, avoidanceScore), [anxietyScore, avoidanceScore]);

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Rate 8 statements across two attachment dimensions: anxiety and avoidance."
      icon={<Shield className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {ATTACHMENT_QUESTIONS.map((q, index) => (
              <RatingQuestion
                key={index}
                index={index}
                question={q.text}
                value={answers[index]}
                onSelect={(value) => setAnswers((current) => ({ ...current, [index]: value }))}
              />
            ))}
          </div>

          <button
            type="button"
            disabled={answeredCount !== ATTACHMENT_QUESTIONS.length}
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            See My Attachment Style
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {ATTACHMENT_QUESTIONS.length} answered
          </p>
        </>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Anxiety</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{anxietyScore}%</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Avoidance</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{avoidanceScore}%</p>
            </div>
          </div>
          <ResultCard
            score={security}
            label={quadrant.title}
            message={quadrant.text}
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `My attachment style is ${quadrant.title} on ${tool.title} at LoveScoreTest.com.`,
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

// ---------- 26. Intellectual Compatibility Test ----------
// Blends two different measurements: a set-overlap (Jaccard)
// similarity between each partner's picked interests, and a
// personal curiosity/debate-enjoyment Likert score -- a
// fundamentally different computation from the other Phase 2
// tools, driven by set intersection rather than distance or tally.
const INTEREST_TOPICS = [
  'Science & how things work',
  'History',
  'Philosophy & big questions',
  'Politics & current events',
  'Books & literature',
  'Film & storytelling analysis',
  'Psychology & human behavior',
  'Technology & innovation',
  'Art & design',
  'Sports strategy & analytics',
];

const CURIOSITY_QUESTIONS = [
  'How often do you enjoy debating an idea just for the fun of exploring it?',
  'How excited do you get learning something totally unrelated to your job or hobbies?',
  'How much do late-night deep conversations energize you rather than drain you?',
];

const InterestChips: React.FC<{
  who: string;
  selected: number[];
  onToggle: (index: number) => void;
}> = ({ who, selected, onToggle }) => (
  <div>
    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">{who}</span>
    <div className="flex flex-wrap gap-2">
      {INTEREST_TOPICS.map((topic, index) => {
        const active = selected.includes(index);
        return (
          <button
            key={topic}
            type="button"
            onClick={() => onToggle(index)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all ${
              active
                ? 'bg-pink-600 text-white border-pink-600'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
            }`}
          >
            {topic}
          </button>
        );
      })}
    </div>
  </div>
);

const IntellectualCompatibilityTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [mine, setMine] = useState<number[]>([]);
  const [partner, setPartner] = useState<number[]>([]);
  const [curiosity, setCuriosity] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);

  const toggleMine = (index: number) =>
    setMine((current) => (current.includes(index) ? current.filter((i) => i !== index) : [...current, index]));
  const togglePartner = (index: number) =>
    setPartner((current) => (current.includes(index) ? current.filter((i) => i !== index) : [...current, index]));

  const ready = mine.length >= 3 && partner.length >= 3 && Object.keys(curiosity).length === CURIOSITY_QUESTIONS.length;

  const { overlapScore, sharedTopics, depthScore, overall } = useMemo(() => {
    const shared = mine.filter((i) => partner.includes(i));
    const union = new Set([...mine, ...partner]);
    const overlap = union.size ? clampScore((shared.length / union.size) * 100) : 0;

    const curiosityVals = Object.values(curiosity);
    const depth = curiosityVals.length
      ? clampScore((curiosityVals.reduce((s, v) => s + v, 0) / (curiosityVals.length * 5)) * 100)
      : 0;

    return {
      overlapScore: overlap,
      sharedTopics: shared.map((i) => INTEREST_TOPICS[i]),
      depthScore: depth,
      overall: clampScore(overlap * 0.6 + depth * 0.4),
    };
  }, [mine, partner, curiosity]);

  const reset = () => {
    setMine([]);
    setPartner([]);
    setCuriosity({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Pick your top interests, your partner's, and rate your curiosity -- we measure real overlap, not a guess."
      icon={<Brain className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-3">
                Pick at least 3 topics that genuinely interest you (each of you separately)
              </p>
              <div className="space-y-4">
                <InterestChips who="You" selected={mine} onToggle={toggleMine} />
                <InterestChips who="Partner" selected={partner} onToggle={togglePartner} />
              </div>
            </div>

            {CURIOSITY_QUESTIONS.map((q, index) => (
              <RatingQuestion
                key={index}
                index={index}
                question={q}
                value={curiosity[index]}
                onSelect={(value) => setCuriosity((current) => ({ ...current, [index]: value }))}
              />
            ))}
          </div>

          <button
            type="button"
            disabled={!ready}
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            See Intellectual Match
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            Pick at least 3 topics for each person, and answer all 3 curiosity questions
          </p>
        </>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Shared Interests</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{overlapScore}%</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Your Curiosity</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{depthScore}%</p>
            </div>
          </div>
          <ResultCard
            score={overall}
            label={getScoreLabel(overall)}
            message={
              sharedTopics.length
                ? `You share genuine interest in: ${sharedTopics.join(', ')}. That common ground -- combined with your curiosity level -- gives you real material for deep, energizing conversations.`
                : `You did not pick any of the same topics this time, but different interests can still spark curiosity between you if you are open to learning about what your partner loves.`
            }
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `We got ${overall}% on ${tool.title} at LoveScoreTest.com.`,
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

// ---------- 27. Adventure vs Comfort Meter ----------
// Both partners answer 6 forced-choice scenarios (Adventure vs
// Comfort). Each partner's adventure percentage is tallied
// independently, then a piecewise harmony curve -- not a flat
// gap formula -- scores the pairing, since a moderate gap here
// is genuinely complementary rather than pure friction.
const ADVENTURE_QUESTIONS: { question: string; adventure: string; comfort: string }[] = [
  { question: 'A free weekend appears with no plans. Your instinct is to...', adventure: 'Book something spontaneous, even a short road trip', comfort: 'Enjoy a slow weekend at home, fully unplugged' },
  { question: 'Choosing a vacation, you lean toward...', adventure: 'A new country you have never been to', comfort: 'A familiar favorite spot you already love' },
  { question: 'A friend invites you to something totally out of your comfort zone tonight. You...', adventure: 'Say yes immediately, it sounds exciting', comfort: 'Politely pass in favor of your usual routine' },
  { question: 'Your ideal Saturday night involves...', adventure: 'Trying a brand new restaurant or activity', comfort: 'Your favorite takeout and a rewatch' },
  { question: 'When it comes to trying extreme activities (skydiving, scuba, etc), you...', adventure: 'Would jump at the chance', comfort: 'Would rather watch someone else do it' },
  { question: 'Planning next year, you would rather...', adventure: 'Leave it open and decide as you go', comfort: 'Have a clear, comfortable plan mapped out' },
];

const AdventureComfortTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [answersA, setAnswersA] = useState<Record<number, 0 | 1>>({});
  const [answersB, setAnswersB] = useState<Record<number, 0 | 1>>({});
  const [showResult, setShowResult] = useState(false);

  const ready =
    Object.keys(answersA).length === ADVENTURE_QUESTIONS.length &&
    Object.keys(answersB).length === ADVENTURE_QUESTIONS.length;

  const { scoreA, scoreB, harmony } = useMemo(() => {
    const toScore = (answers: Record<number, 0 | 1>) => {
      const vals = Object.values(answers);
      if (!vals.length) return 50;
      return clampScore((vals.reduce((s: number, v) => s + v, 0) / vals.length) * 100);
    };
    const a = toScore(answersA);
    const b = toScore(answersB);
    const diff = Math.abs(a - b);

    let h: number;
    if (diff <= 15) h = clampScore(92 - diff * 0.5);
    else if (diff <= 45) h = clampScore(85 - (diff - 15) * 0.3);
    else h = clampScore(76 - (diff - 45) * 1.1);

    return { scoreA: a, scoreB: b, harmony: h };
  }, [answersA, answersB]);

  const reset = () => {
    setAnswersA({});
    setAnswersB({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Both partners choose Adventure or Comfort for 6 scenarios -- we calculate your Adventure-to-Nest ratio."
      icon={<Plane className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {ADVENTURE_QUESTIONS.map((q, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-3">
                  {index + 1}. {q.question}
                </p>
                {[
                  { answers: answersA, setAnswers: setAnswersA, who: 'You' },
                  { answers: answersB, setAnswers: setAnswersB, who: 'Partner' },
                ].map(({ answers, setAnswers, who }) => (
                  <div key={who} className="mb-2 last:mb-0">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{who}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAnswers((current) => ({ ...current, [index]: 1 }))}
                        className={`rounded-lg px-3 py-2 text-[11px] font-semibold border transition-all text-left ${
                          answers[index] === 1
                            ? 'bg-pink-600 text-white border-pink-600'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
                        }`}
                      >
                        {q.adventure}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAnswers((current) => ({ ...current, [index]: 0 }))}
                        className={`rounded-lg px-3 py-2 text-[11px] font-semibold border transition-all text-left ${
                          answers[index] === 0
                            ? 'bg-pink-600 text-white border-pink-600'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-pink-300'
                        }`}
                      >
                        {q.comfort}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled={!ready}
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            See Our Adventure Ratio
          </button>
        </>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">You</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{scoreA}% Adventure</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Partner</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{scoreB}% Adventure</p>
            </div>
          </div>
          <ResultCard
            score={harmony}
            label={getScoreLabel(harmony)}
            message={
              Math.abs(scoreA - scoreB) <= 15
                ? `You both sit close together on the adventure-comfort spectrum (${scoreA}:${100 - scoreA} vs ${scoreB}:${100 - scoreB}), which usually means your weekend and vacation plans line up naturally.`
                : `Your ratio is ${scoreA}:${100 - scoreA} Adventure-to-Nest, and your partner's is ${scoreB}:${100 - scoreB}. This kind of gap can be a genuine complement -- alternate an adventure day with a recharge day so neither of you feels dragged along or held back.`
            }
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `We got ${harmony}% on ${tool.title} at LoveScoreTest.com.`,
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

// ---------- 28. Family Values Compatibility ----------
// Two-partner comparative using the same distance-based scoring
// shape as Lifestyle Habits Compatibility (tool 19), applied to
// family-specific categories -- in-law involvement, holiday
// hosting, parenting philosophy, and boundary comfort.
const FAMILY_CATEGORIES: { label: string; options: string[] }[] = [
  { label: 'Involvement with extended family', options: ['Very involved, see family weekly', 'Regular visits, healthy boundaries', 'Occasional visits, independent household', 'Minimal contact, very independent'] },
  { label: 'Holiday & tradition hosting', options: ['Host every major holiday', 'Alternate hosting each year', 'Prefer low-key, just us', 'Skip big traditions altogether'] },
  { label: 'Parenting philosophy (if applicable)', options: ['Structured & traditional', 'Balanced, some structure', 'Gentle & flexible', 'Not sure / not planning kids'] },
  { label: 'In-law boundary comfort', options: ['Open-door, in-laws involved often', 'Some involvement, clear boundaries', 'Limited involvement preferred', 'Strong independence from in-laws'] },
];

const FamilyValuesTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [picksA, setPicksA] = useState<Record<number, number>>({});
  const [picksB, setPicksB] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Math.min(Object.keys(picksA).length, Object.keys(picksB).length);

  const { categoryScores, overall, frictionCategories } = useMemo(() => {
    const scores = FAMILY_CATEGORIES.map((cat, i) => {
      if (picksA[i] === undefined || picksB[i] === undefined) return null;
      const distance = Math.abs(picksA[i] - picksB[i]);
      return clampScore(100 - distance * (100 / 3));
    });

    const valid = scores.filter((s): s is number => s !== null);
    const overallScore = valid.length ? clampScore(valid.reduce((s, v) => s + v, 0) / valid.length) : 0;
    const friction = FAMILY_CATEGORIES.filter((_, i) => scores[i] !== null && (scores[i] as number) <= 34).map((c) => c.label);

    return { categoryScores: scores, overall: overallScore, frictionCategories: friction };
  }, [picksA, picksB]);

  const reset = () => {
    setPicksA({});
    setPicksB({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Each partner picks their own family expectations -- we compare how closely they align."
      icon={<Users2 className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {FAMILY_CATEGORIES.map((cat, index) => (
              <div key={cat.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-3">{cat.label}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { picks: picksA, setPicks: setPicksA, who: 'You' },
                    { picks: picksB, setPicks: setPicksB, who: 'Partner' },
                  ].map(({ picks, setPicks, who }) => (
                    <div key={who}>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{who}</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {cat.options.map((opt, optIndex) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setPicks((current) => ({ ...current, [index]: optIndex }))}
                            className={`rounded-lg px-2 py-2 text-[11px] font-semibold border transition-all ${
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

          <button
            type="button"
            disabled={answeredCount !== FAMILY_CATEGORIES.length}
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            See Family Values Match
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {FAMILY_CATEGORIES.length} categories completed for both
          </p>
        </>
      ) : (
        <div className="mt-2">
          <div className="space-y-2 mb-6">
            {FAMILY_CATEGORIES.map((cat, i) => (
              <div key={cat.label} className="flex items-center gap-3">
                <span className="w-40 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">{cat.label}</span>
                <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${categoryScores[i] ?? 0}%` }} />
                </div>
                <span className="w-10 text-xs text-slate-400 text-right">{categoryScores[i]}%</span>
              </div>
            ))}
          </div>
          <ResultCard
            score={overall}
            label={getScoreLabel(overall)}
            message={
              frictionCategories.length
                ? `Your family expectations align at ${overall}%. Worth an early, calm conversation: ${frictionCategories.join(', ')}.`
                : `Your family expectations align at ${overall}% -- no major friction categories found. Keep communicating as circumstances with either family change over time.`
            }
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `We got ${overall}% on ${tool.title} at LoveScoreTest.com.`,
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

// ---------- 29. Physical Affection Frequency Match ----------
// Slider-based gap analysis: each partner rates their desired
// frequency (1-10) for 4 affection types. Unlike the discrete
// button-pick tools, this uses continuous sliders and a linear
// gap-to-score conversion normalized against the 1-10 range.
const AFFECTION_CATEGORIES: { label: string; leftHint: string; rightHint: string }[] = [
  { label: 'Hand-holding & casual touch through the day', leftHint: 'Rarely need it', rightHint: 'Constant touch' },
  { label: 'Hugging when reuniting or saying goodbye', leftHint: 'Quick hello', rightHint: 'Long, frequent hugs' },
  { label: 'Cuddling on the couch or in bed', leftHint: 'Prefer own space', rightHint: 'Always want to cuddle' },
  { label: 'Affection in public (holding hands, etc.)', leftHint: 'Prefer privacy', rightHint: 'Comfortable anywhere' },
];

const PhysicalAffectionTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [valuesA, setValuesA] = useState<Record<number, number>>({ 0: 5, 1: 5, 2: 5, 3: 5 });
  const [valuesB, setValuesB] = useState<Record<number, number>>({ 0: 5, 1: 5, 2: 5, 3: 5 });
  const [showResult, setShowResult] = useState(false);

  const { categoryScores, overall, gapCategories } = useMemo(() => {
    const scores = AFFECTION_CATEGORIES.map((_, i) => {
      const gap = Math.abs((valuesA[i] ?? 5) - (valuesB[i] ?? 5));
      return clampScore(100 - gap * (100 / 9));
    });
    const overallScore = clampScore(scores.reduce((s, v) => s + v, 0) / scores.length);
    const gaps = AFFECTION_CATEGORIES.filter((_, i) => scores[i] <= 55).map((c) => c.label);
    return { categoryScores: scores, overall: overallScore, gapCategories: gaps };
  }, [valuesA, valuesB]);

  const reset = () => {
    setValuesA({ 0: 5, 1: 5, 2: 5, 3: 5 });
    setValuesB({ 0: 5, 1: 5, 2: 5, 3: 5 });
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Slide to rate how much affection each of you wants in 4 categories -- we measure the touch attunement gap."
      icon={<Sparkles className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {AFFECTION_CATEGORIES.map((cat, index) => (
              <div key={cat.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-4">{cat.label}</p>
                <div className="space-y-4">
                  <AffectionSlider
                    label="You"
                    value={valuesA[index] ?? 5}
                    onChange={(value) => setValuesA((current) => ({ ...current, [index]: value }))}
                    leftHint={cat.leftHint}
                    rightHint={cat.rightHint}
                  />
                  <AffectionSlider
                    label="Partner"
                    value={valuesB[index] ?? 5}
                    onChange={(value) => setValuesB((current) => ({ ...current, [index]: value }))}
                    leftHint={cat.leftHint}
                    rightHint={cat.rightHint}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 text-white py-3 font-bold text-sm transition-colors"
          >
            See Touch Attunement Score
          </button>
        </>
      ) : (
        <div className="mt-2">
          <div className="space-y-2 mb-6">
            {AFFECTION_CATEGORIES.map((cat, i) => (
              <div key={cat.label} className="flex items-center gap-3">
                <span className="w-44 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">{cat.label}</span>
                <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${categoryScores[i]}%` }} />
                </div>
                <span className="w-10 text-xs text-slate-400 text-right">{categoryScores[i]}%</span>
              </div>
            ))}
          </div>
          <ResultCard
            score={overall}
            label={getScoreLabel(overall)}
            message={
              gapCategories.length
                ? `Your touch attunement is ${overall}%. The biggest gaps are in: ${gapCategories.join(', ')}. Try scheduling small, predictable moments of affection (like a 5-minute morning hug) to close the gap gently.`
                : `Your touch attunement is ${overall}% -- your affection needs line up closely across all 4 categories, which usually means physical closeness feels natural rather than negotiated.`
            }
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `We got ${overall}% on ${tool.title} at LoveScoreTest.com.`,
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

// ---------- 30. Spontaneity vs Planning Match ----------
// Slider-based, like tool 29, but over 2 dimensions (trip
// planning and daily schedule style) and with a distinct,
// non-linear scoring curve: it rewards a moderate gap with a
// small bonus, since a planner/spontaneous pairing tends to work
// well specifically at a moderate distance, not zero or extreme.
const PLANNING_DIMENSIONS: { label: string; leftHint: string; rightHint: string }[] = [
  { label: 'Trip & vacation planning style', leftHint: 'Fully spontaneous', rightHint: 'Meticulous planner' },
  { label: 'Daily schedule style', leftHint: 'Go with the flow', rightHint: 'Structured routine' },
];

const SpontaneityPlanningTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [valuesA, setValuesA] = useState<Record<number, number>>({ 0: 50, 1: 50 });
  const [valuesB, setValuesB] = useState<Record<number, number>>({ 0: 50, 1: 50 });
  const [showResult, setShowResult] = useState(false);

  const { plannerA, plannerB, compatibility } = useMemo(() => {
    const avg = (values: Record<number, number>) =>
      clampScore((Object.values(values).reduce((s, v) => s + v, 0) / PLANNING_DIMENSIONS.length));
    const a = avg(valuesA);
    const b = avg(valuesB);
    const diff = Math.abs(a - b);

    let compat = clampScore(100 - diff * 0.5);
    if (diff >= 20 && diff <= 40) {
      compat = clampScore(compat + 6); // sweet spot: complementary planner/spontaneous pairing
    }

    return { plannerA: a, plannerB: b, compatibility: compat };
  }, [valuesA, valuesB]);

  const reset = () => {
    setValuesA({ 0: 50, 1: 50 });
    setValuesB({ 0: 50, 1: 50 });
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Slide to rate how much each of you plans vs. improvises -- we compute your Planning-Spontaneity formula."
      icon={<ListChecks className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {PLANNING_DIMENSIONS.map((dim, index) => (
              <div key={dim.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-4">{dim.label}</p>
                <div className="space-y-4">
                  <AffectionSlider
                    label="You"
                    value={valuesA[index] ?? 50}
                    onChange={(value) => setValuesA((current) => ({ ...current, [index]: value }))}
                    min={0}
                    max={100}
                    leftHint={dim.leftHint}
                    rightHint={dim.rightHint}
                  />
                  <AffectionSlider
                    label="Partner"
                    value={valuesB[index] ?? 50}
                    onChange={(value) => setValuesB((current) => ({ ...current, [index]: value }))}
                    min={0}
                    max={100}
                    leftHint={dim.leftHint}
                    rightHint={dim.rightHint}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 text-white py-3 font-bold text-sm transition-colors"
          >
            See Our Formula
          </button>
        </>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">You</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{plannerA}% Planner</p>
              <p className="text-xs text-slate-400 mt-0.5">{100 - plannerA}% Spontaneous</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Partner</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{plannerB}% Planner</p>
              <p className="text-xs text-slate-400 mt-0.5">{100 - plannerB}% Spontaneous</p>
            </div>
          </div>
          <ResultCard
            score={compatibility}
            label={getScoreLabel(compatibility)}
            message={
              Math.abs(plannerA - plannerB) < 20
                ? `You both lean similarly on the planning spectrum, so your day-to-day rhythm and trip prep should feel naturally in sync.`
                : Math.abs(plannerA - plannerB) <= 40
                ? `Your planning styles differ enough to be genuinely complementary -- the planner can map the big picture while the spontaneous partner adds the surprises that make a trip memorable.`
                : `Your planning styles sit at real opposite ends. Try splitting responsibility: one plans the skeleton (flights, key bookings), the other keeps a few days fully open.`
            }
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `We got ${compatibility}% on ${tool.title} at LoveScoreTest.com.`,
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

// ---------- 31. Career & Ambition Synergy ----------
// Two-dimension Likert model like Attachment Style, but weighted
// unevenly (support matters more to the overall score than raw
// ambition) and classified into a different quadrant set focused
// on career dynamics rather than intimacy dynamics.
type CareerDimension = 'ambition' | 'support';

const CAREER_QUESTIONS: { text: string; dimension: CareerDimension }[] = [
  { text: 'How strongly do you want to keep growing and advancing in your career over the next 5 years?', dimension: 'ambition' },
  { text: 'How much does professional achievement factor into your personal sense of identity?', dimension: 'ambition' },
  { text: 'How willing are you to take a real career risk (new city, startup, big pivot) to reach a goal?', dimension: 'ambition' },
  { text: 'How often do you set concrete career or business goals for yourself?', dimension: 'ambition' },
  { text: 'How genuinely excited does your partner get about your career wins, big or small?', dimension: 'support' },
  { text: 'How comfortable is your partner when work demands extra hours during busy seasons?', dimension: 'support' },
  { text: 'How often do you and your partner talk through career decisions together?', dimension: 'support' },
  { text: 'How confident are you that your partner would support a big career risk if you wanted to take it?', dimension: 'support' },
];

const careerArchetype = (ambition: number, support: number) => {
  if (ambition >= 60 && support >= 60) {
    return { title: 'Power Couple Sync', text: 'You both bring drive and mutual encouragement to the table -- a dynamic where ambition and support reinforce each other rather than compete.' };
  }
  if (ambition >= 60 && support < 60) {
    return { title: 'Solo Climber', text: 'Your ambition is strong, but the support system around it has room to grow. A short weekly check-in about career wins and stresses can close that gap fast.' };
  }
  if (ambition < 60 && support >= 60) {
    return { title: 'Steady Cheerleader Dynamic', text: 'Career is not the center of your identity right now, but the support is genuinely there when it matters -- a low-pressure, encouraging foundation.' };
  }
  return { title: 'Easygoing Partnership', text: 'Neither of you is putting heavy pressure on career milestones right now, which can mean more room for other parts of life -- just make sure ambitions are revisited if priorities shift.' };
};

const CareerAmbitionTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResult, setShowResult] = useState(false);
  const answeredCount = Object.keys(answers).length;

  const { ambitionScore, supportScore, overall } = useMemo(() => {
    const ambitionVals = CAREER_QUESTIONS.map((q, i) => (q.dimension === 'ambition' ? answers[i] : undefined)).filter(
      (v): v is number => typeof v === 'number',
    );
    const supportVals = CAREER_QUESTIONS.map((q, i) => (q.dimension === 'support' ? answers[i] : undefined)).filter(
      (v): v is number => typeof v === 'number',
    );

    const ambition = ambitionVals.length ? clampScore((ambitionVals.reduce((s, v) => s + v, 0) / (ambitionVals.length * 5)) * 100) : 0;
    const support = supportVals.length ? clampScore((supportVals.reduce((s, v) => s + v, 0) / (supportVals.length * 5)) * 100) : 0;

    return { ambitionScore: ambition, supportScore: support, overall: clampScore(ambition * 0.4 + support * 0.6) };
  }, [answers]);

  const archetype = useMemo(() => careerArchetype(ambitionScore, supportScore), [ambitionScore, supportScore]);

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Rate 8 statements across two dimensions: your ambition drive and your partner's support."
      icon={<Briefcase className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {CAREER_QUESTIONS.map((q, index) => (
              <RatingQuestion
                key={index}
                index={index}
                question={q.text}
                value={answers[index]}
                onSelect={(value) => setAnswers((current) => ({ ...current, [index]: value }))}
              />
            ))}
          </div>

          <button
            type="button"
            disabled={answeredCount !== CAREER_QUESTIONS.length}
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white py-3 font-bold text-sm transition-colors"
          >
            See Our Career Synergy
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answeredCount} of {CAREER_QUESTIONS.length} answered
          </p>
        </>
      ) : (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Ambition Drive</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{ambitionScore}%</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500 mb-1">Partner Support</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{supportScore}%</p>
            </div>
          </div>
          <ResultCard
            score={overall}
            label={archetype.title}
            message={archetype.text}
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `We got ${overall}% (${archetype.title}) on ${tool.title} at LoveScoreTest.com.`,
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

// ---------- 32. Spiritual & Philosophical Match ----------
// Spectrum-slider gap analysis across 3 worldview dimensions
// (tradition/reinvention, faith/reason, individual/collective),
// each on a -50..+50 scale. A Philosophical Harmony Index is the
// average of per-dimension closeness -- a third distinct gap
// formula shape alongside the tally-based and distance-based ones.
const PHILOSOPHY_DIMENSIONS: { label: string; leftLabel: string; rightLabel: string }[] = [
  { label: 'Tradition vs. reinvention', leftLabel: 'Rooted in tradition', rightLabel: 'Free to reinvent' },
  { label: 'Faith vs. reason', leftLabel: 'Faith-centered', rightLabel: 'Evidence-centered' },
  { label: 'Individual freedom vs. collective duty', leftLabel: 'Individual freedom', rightLabel: 'Collective duty' },
];

const SpiritualPhilosophicalTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}> = ({ tool, onShare }) => {
  const [valuesA, setValuesA] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 0 });
  const [valuesB, setValuesB] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 0 });
  const [showResult, setShowResult] = useState(false);

  const { dimensionScores, harmony, widestGaps } = useMemo(() => {
    const scores = PHILOSOPHY_DIMENSIONS.map((_, i) => {
      const gap = Math.abs((valuesA[i] ?? 0) - (valuesB[i] ?? 0));
      return clampScore(100 - gap);
    });
    const overall = clampScore(scores.reduce((s, v) => s + v, 0) / scores.length);
    const widest = PHILOSOPHY_DIMENSIONS.filter((_, i) => scores[i] <= 60).map((d) => d.label);
    return { dimensionScores: scores, harmony: overall, widestGaps: widest };
  }, [valuesA, valuesB]);

  const reset = () => {
    setValuesA({ 0: 0, 1: 0, 2: 0 });
    setValuesB({ 0: 0, 1: 0, 2: 0 });
    setShowResult(false);
  };

  return (
    <ToolShell
      title={`Try ${tool.title}`}
      description="Place each of you on 3 worldview spectrums -- we measure your Philosophical Harmony Index."
      icon={<SunMedium className="w-5 h-5" />}
    >
      {!showResult ? (
        <>
          <div className="space-y-5">
            {PHILOSOPHY_DIMENSIONS.map((dim, index) => (
              <div key={dim.label} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-4">{dim.label}</p>
                <div className="space-y-4">
                  <AffectionSlider
                    label="You"
                    value={valuesA[index] ?? 0}
                    onChange={(value) => setValuesA((current) => ({ ...current, [index]: value }))}
                    min={-50}
                    max={50}
                    leftHint={dim.leftLabel}
                    rightHint={dim.rightLabel}
                  />
                  <AffectionSlider
                    label="Partner"
                    value={valuesB[index] ?? 0}
                    onChange={(value) => setValuesB((current) => ({ ...current, [index]: value }))}
                    min={-50}
                    max={50}
                    leftHint={dim.leftLabel}
                    rightHint={dim.rightLabel}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowResult(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 text-white py-3 font-bold text-sm transition-colors"
          >
            See Our Harmony Index
          </button>
        </>
      ) : (
        <div className="mt-2">
          <div className="space-y-2 mb-6">
            {PHILOSOPHY_DIMENSIONS.map((dim, i) => (
              <div key={dim.label} className="flex items-center gap-3">
                <span className="w-48 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">{dim.label}</span>
                <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${dimensionScores[i]}%` }} />
                </div>
                <span className="w-10 text-xs text-slate-400 text-right">{dimensionScores[i]}%</span>
              </div>
            ))}
          </div>
          <ResultCard
            score={harmony}
            label={getScoreLabel(harmony)}
            message={
              widestGaps.length
                ? `Your Philosophical Harmony Index is ${harmony}%. The widest gaps are around: ${widestGaps.join(', ')}. These deeper differences are rarely about right or wrong -- open curiosity about why your partner sees it that way goes a long way.`
                : `Your Philosophical Harmony Index is ${harmony}% -- you see the world in a similar way across tradition, belief, and individual-versus-collective values, which tends to make big life decisions easier to align on.`
            }
            onShare={() =>
              onShare({
                title: `${tool.title} Result`,
                text: `We got ${harmony}% on ${tool.title} at LoveScoreTest.com.`,
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


export const FunctionalToolEngine: React.FC<FunctionalToolEngineProps> = ({
  tool,
  onShare,
}) => {
  switch (tool.slug) {
    case 'crush-compatibility-meter':
      return <PhaseOneNameTool tool={tool} onShare={onShare} mode="crush" />;

    case 'flames-love-game':
      return <FlamesTool tool={tool} onShare={onShare} />;

    case 'zodiac-love-calculator':
      return <ZodiacTool tool={tool} onShare={onShare} />;

    case 'birthday-love-calculator':
      return <BirthdayTool tool={tool} onShare={onShare} />;

    case 'initials-love-matcher':
      return <PhaseOneNameTool tool={tool} onShare={onShare} mode="initials" />;

    case 'true-love-potential-score':
      return <TrueLovePotentialTool tool={tool} onShare={onShare} />;

    case 'emotional-compatibility-test':
      return <EmotionalCompatibilityTool tool={tool} onShare={onShare} />;

    case 'communication-style-match':
      return <CommunicationStyleTool tool={tool} onShare={onShare} />;

    case 'lifestyle-habits-compatibility':
      return <LifestyleHabitsTool tool={tool} onShare={onShare} />;

    case 'financial-harmony-quiz':
      return <FinancialHarmonyTool tool={tool} onShare={onShare} />;

    case 'future-goals-vision-match':
      return <FutureGoalsTool tool={tool} onShare={onShare} />;

    case 'introvert-extrovert-couple-match':
      return <IntrovertExtrovertTool tool={tool} onShare={onShare} />;

    case 'humor-and-banter-compatibility':
      return <HumorBanterTool tool={tool} onShare={onShare} />;

    case 'conflict-resolution-style-test':
      return <ConflictResolutionTool tool={tool} onShare={onShare} />;

    case 'attachment-style-compatibility':
      return <AttachmentStyleTool tool={tool} onShare={onShare} />;

    case 'intellectual-compatibility-test':
      return <IntellectualCompatibilityTool tool={tool} onShare={onShare} />;

    case 'adventure-vs-comfort-meter':
      return <AdventureComfortTool tool={tool} onShare={onShare} />;

    case 'family-values-compatibility':
      return <FamilyValuesTool tool={tool} onShare={onShare} />;

    case 'physical-affection-frequency-match':
      return <PhysicalAffectionTool tool={tool} onShare={onShare} />;

    case 'spontaneity-vs-planning-match':
      return <SpontaneityPlanningTool tool={tool} onShare={onShare} />;

    case 'career-ambition-synergy':
      return <CareerAmbitionTool tool={tool} onShare={onShare} />;

    case 'spiritual-and-philosophical-match':
      return <SpiritualPhilosophicalTool tool={tool} onShare={onShare} />;

    case 'roommate-compatibility-test':
      return <RoommateCoLivingTool tool={tool} onShare={onShare} />;

    case 'relationship-health-checkup':
      return <RelationshipHealthCheckupTool tool={tool} onShare={onShare} />;

    case 'green-flags-vs-red-flags-quiz':
      return <GreenRedFlagsTool tool={tool} onShare={onShare} />;

    case 'dating-stage-milestone-quiz':
      return <DatingStageMilestoneTool tool={tool} onShare={onShare} />;

    case 'spark-and-romance-meter':
      return <SparkRomanceMeterTool tool={tool} onShare={onShare} />;

    case 'couple-trust-score-test':
      return <CoupleTrustScoreTool tool={tool} onShare={onShare} />;

    case 'appreciation-gratitude-quiz':
      return <AppreciationGratitudeTool tool={tool} onShare={onShare} />;

    case 'dating-readiness-quiz':
      return <DatingReadinessTool tool={tool} onShare={onShare} />;

    case 'long-distance-relationship-strength':
      return <LdrStrengthTool tool={tool} onShare={onShare} />;

    case 'are-you-soulmates-quiz':
      return <SoulmatesQuizTool tool={tool} onShare={onShare} />;

    case 'marriage-readiness-assessment':
      return <MarriageReadinessTool tool={tool} onShare={onShare} />;

    case 'jealousy-and-security-quiz':
      return <JealousySecurityTool tool={tool} onShare={onShare} />;

    case 'couple-stress-handling-quiz':
      return <CoupleStressHandlingTool tool={tool} onShare={onShare} />;

    case 'parenting-vision-alignment':
      return <ParentingVisionTool tool={tool} onShare={onShare} />;

    case 'forgiveness-and-letting-go-test':
      return <ForgivenessTool tool={tool} onShare={onShare} />;

    case 'couple-generosity-meter':
      return <CoupleGenerosityTool tool={tool} onShare={onShare} />;

    case 'intimacy-depth-quiz':
      return <IntimacyDepthTool tool={tool} onShare={onShare} />;

    case 'relationship-boredom-buster':
      return <RelationshipBoredomTool tool={tool} onShare={onShare} />;

    case 'apology-language-test':
      return <ApologyLanguageTool tool={tool} onShare={onShare} />;

    case 'mbti-couple-personality-match':
      return <MbtiCoupleMatchTool tool={tool} onShare={onShare} />;

    default:
      if (tool.number >= 53 && tool.number <= 100) {
        return <Phase5And6Tool tool={tool} onShare={onShare} />;
      }

      return <GenericTool tool={tool} onShare={onShare} />;
  }
};



