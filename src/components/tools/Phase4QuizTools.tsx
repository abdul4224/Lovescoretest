import React, { useMemo, useState } from 'react';
import {
  Baby,
  Gift,
  Heart,
  HeartHandshake,
  MessageCircleHeart,
  Shield,
  Sparkles,
  Unlock,
  Users,
} from 'lucide-react';
import { ToolItem, ShareData } from '../../types';

interface Phase4ToolProps {
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}

type Answers = Record<number, number>;

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

const scoreLabel = (score: number) => {
  if (score >= 85) return 'Very Strong';
  if (score >= 70) return 'Strong';
  if (score >= 55) return 'Balanced';
  if (score >= 40) return 'Room to Grow';
  return 'Needs Attention';
};

const questions = [
  'How well do you agree on major life decisions?',
  'How comfortable are you discussing money and finances?',
  'How aligned are your expectations about family responsibilities?',
  'How well do you handle disagreements without attacking each other?',
  'How prepared are you for difficult seasons of life?',
  'How clearly have you discussed where and how you want to live?',
  'How comfortable are you with long-term commitment?',
  'How well do you support each other’s individual goals?',
  'How openly can you discuss expectations and boundaries?',
  'How confident are you that you can repair after conflict?',
];

const fivePoint = [
  'Strongly No',
  'Mostly No',
  'Sometimes',
  'Mostly Yes',
  'Strongly Yes',
];

const Shell: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, description, icon, children }) => (
  <div className="w-full max-w-2xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-pink-100 dark:border-slate-800 p-5 sm:p-8 shadow-lg shadow-pink-500/5">
    <div className="flex items-start gap-3 mb-7">
      <div className="w-11 h-11 shrink-0 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>
      </div>
    </div>
    {children}
  </div>
);

const RatingQuestion: React.FC<{
  index: number;
  text: string;
  value?: number;
  onSelect: (value: number) => void;
}> = ({ index, text, value, onSelect }) => (
  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
    <p className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
      {index + 1}. {text}
    </p>
    <div className="grid grid-cols-5 gap-2">
      {fivePoint.map((label, i) => {
        const v = i + 1;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(v)}
            className={`rounded-xl px-2 py-2 text-xs font-semibold transition-colors ${
              value === v
                ? 'bg-pink-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-pink-100 dark:hover:bg-pink-950/50'
            }`}
          >
            {v}
          </button>
        );
      })}
    </div>
    <p className="text-[11px] text-slate-400 mt-2 text-center">
      {value ? fivePoint[value - 1] : 'Choose one'}
    </p>
  </div>
);

const Actions: React.FC<{
  onShare: () => void;
  onReset: () => void;
}> = ({ onShare, onReset }) => (
  <div className="flex flex-wrap gap-3 justify-center mt-6">
    <button
      type="button"
      onClick={onShare}
      className="rounded-xl bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 font-bold text-sm"
    >
      Share Result
    </button>
    <button
      type="button"
      onClick={onReset}
      className="rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-3 font-bold text-sm"
    >
      Try Again
    </button>
  </div>
);

const Result: React.FC<{
  score: number;
  label: string;
  message: string;
  tool: ToolItem;
  onShare: (data: ShareData) => void;
  onReset: () => void;
}> = ({ score, label, message, tool, onShare, onReset }) => (
  <div className="text-center rounded-2xl border border-pink-100 dark:border-slate-800 p-6">
    <div className="w-16 h-16 rounded-3xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 flex items-center justify-center mx-auto mb-5">
      <Sparkles className="w-8 h-8" />
    </div>
    <p className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-2">Your Result</p>
    <p className="text-5xl font-black text-slate-900 dark:text-white">{score}%</p>
    <p className="text-lg font-bold text-pink-600 mt-2">{label}</p>
    <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">{message}</p>
    <Actions
      onShare={() =>
        onShare({
          title: `${tool.title} Result`,
          text: `We got ${score}% on ${tool.title} at LoveScoreTest.com.`,
          url: window.location.href,
        })
      }
      onReset={onReset}
    />
  </div>
);

const QuizTool: React.FC<{
  tool: ToolItem;
  onShare: (data: ShareData) => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  questionSet: string[];
  resultMessage: (score: number) => string;
}> = ({ tool, onShare, title, description, icon, questionSet, resultMessage }) => {
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const answered = Object.keys(answers).length;
  const score = useMemo(() => {
    const values = Object.values(answers);
    return values.length ? clamp((values.reduce((a, b) => a + b, 0) / (values.length * 5)) * 100) : 0;
  }, [answers]);

  const reset = () => {
    setAnswers({});
    setDone(false);
  };

  return (
    <Shell title={title} description={description} icon={icon}>
      {!done ? (
        <>
          <div className="space-y-4">
            {questionSet.map((q, i) => (
              <RatingQuestion
                key={q}
                index={i}
                text={q}
                value={answers[i]}
                onSelect={(v) => setAnswers((current) => ({ ...current, [i]: v }))}
              />
            ))}
          </div>
          <button
            type="button"
            disabled={answered !== questionSet.length}
            onClick={() => setDone(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-5 py-3 font-bold"
          >
            See My Result
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">
            {answered} of {questionSet.length} answered
          </p>
        </>
      ) : (
        <Result
          score={score}
          label={scoreLabel(score)}
          message={resultMessage(score)}
          tool={tool}
          onShare={onShare}
          onReset={reset}
        />
      )}
    </Shell>
  );
};

export const MarriageReadinessTool: React.FC<Phase4ToolProps> = ({ tool, onShare }) => (
  <QuizTool
    tool={tool}
    onShare={onShare}
    title={`Try ${tool.title}`}
    description="Review ten practical pillars commonly discussed before marriage."
    icon={<HeartHandshake className="w-5 h-5" />}
    questionSet={questions}
    resultMessage={(score) =>
      score >= 70
        ? 'Your answers suggest a solid foundation. Keep discussing the areas where expectations differ.'
        : 'Use the lower-scoring areas as conversation topics before making major commitments.'
    }
  />
);

const jealousyQuestions = [
  'I can tell my partner about jealousy without blaming them.',
  'My partner gives me reassurance without feeling controlled.',
  'We have clear boundaries around friendships and social media.',
  'I can separate a real trust issue from an anxious assumption.',
  'We can discuss attention from other people calmly.',
  'I respect my partner’s independence even when I feel insecure.',
  'My partner takes reasonable concerns seriously.',
  'We repair quickly after jealousy-related misunderstandings.',
];

export const JealousySecurityTool: React.FC<Phase4ToolProps> = ({ tool, onShare }) => (
  <QuizTool
    tool={tool}
    onShare={onShare}
    title={`Try ${tool.title}`}
    description="Explore reassurance, boundaries, trust, and healthy independence."
    icon={<Shield className="w-5 h-5" />}
    questionSet={jealousyQuestions}
    resultMessage={(score) =>
      score >= 70
        ? 'Your answers point toward a generally secure approach to jealousy and reassurance.'
        : 'Focus on clear boundaries, calm conversations, and distinguishing evidence from assumptions.'
    }
  />
);

const stressQuestions = [
  'When one of us is stressed, we remember that we are on the same team.',
  'We avoid making the other person the enemy when life is difficult.',
  'We ask what kind of support is needed instead of guessing.',
  'We can give each other space without becoming emotionally distant.',
  'We divide practical responsibilities when one person is overloaded.',
  'We talk about outside stress before it turns into resentment.',
  'We can comfort each other after a difficult day.',
  'We recover together after a stressful period.',
];

export const CoupleStressHandlingTool: React.FC<Phase4ToolProps> = ({ tool, onShare }) => (
  <QuizTool
    tool={tool}
    onShare={onShare}
    title={`Try ${tool.title}`}
    description="Measure how well you operate as a team when outside pressure rises."
    icon={<HeartHandshake className="w-5 h-5" />}
    questionSet={stressQuestions}
    resultMessage={(score) =>
      score >= 70
        ? 'You show several team-based stress habits. Keep protecting the relationship while solving the problem.'
        : 'Try using an “us versus the problem” mindset and agree on practical support during stressful weeks.'
    }
  />
);

const parentingQuestions = [
  'We agree on the kind of discipline we want to use.',
  'We have similar expectations around screen time.',
  'We can discuss education choices without turning them into personal battles.',
  'We agree on household routines for children.',
  'We would present a united message when setting important boundaries.',
  'We agree that children should see healthy affection and respect.',
  'We can revisit parenting rules when circumstances change.',
  'We would support each other instead of undermining each other in front of a child.',
];

export const ParentingVisionTool: React.FC<Phase4ToolProps> = ({ tool, onShare }) => (
  <QuizTool
    tool={tool}
    onShare={onShare}
    title={`Try ${tool.title}`}
    description="Compare practical parenting values before or during family life."
    icon={<Baby className="w-5 h-5" />}
    questionSet={parentingQuestions}
    resultMessage={(score) =>
      score >= 70
        ? 'Your answers suggest meaningful alignment on parenting principles.'
        : 'Discuss discipline, education, routines, and boundaries before disagreements become patterns.'
    }
  />
);

const forgivenessQuestions = [
  'I can acknowledge hurt without keeping a permanent scorecard.',
  'I can accept a sincere apology while still protecting my boundaries.',
  'I can stop reopening an issue after it has genuinely been repaired.',
  'I can distinguish forgiveness from pretending the hurt never happened.',
  'I am willing to discuss what needs to change after a mistake.',
  'I can recognize when resentment is affecting the present relationship.',
  'I can let go of small mistakes after they have been addressed.',
  'I can work toward emotional repair without rushing myself.',
];

export const ForgivenessTool: React.FC<Phase4ToolProps> = ({ tool, onShare }) => (
  <QuizTool
    tool={tool}
    onShare={onShare}
    title={`Try ${tool.title}`}
    description="Reflect on forgiveness, boundaries, repair, and lingering resentment."
    icon={<Unlock className="w-5 h-5" />}
    questionSet={forgivenessQuestions}
    resultMessage={(score) =>
      score >= 70
        ? 'Your answers suggest a flexible approach to repair and letting go while keeping healthy boundaries.'
        : 'Forgiveness does not require ignoring harm. Focus on accountability, boundaries, repair, and releasing scorekeeping where appropriate.'
    }
  />
);

const generosityQuestions = [
  'I notice small things that would make my partner’s day easier.',
  'I regularly help without waiting to be asked.',
  'My partner and I both appreciate thoughtful gestures.',
  'We give time and attention even when life is busy.',
  'We celebrate each other’s wins without competition.',
  'We make room for each other’s needs.',
  'Acts of kindness are not used as leverage later.',
  'We both contribute to making the relationship feel cared for.',
];

export const CoupleGenerosityTool: React.FC<Phase4ToolProps> = ({ tool, onShare }) => (
  <QuizTool
    tool={tool}
    onShare={onShare}
    title={`Try ${tool.title}`}
    description="Measure everyday thoughtfulness, support, and generosity."
    icon={<Gift className="w-5 h-5" />}
    questionSet={generosityQuestions}
    resultMessage={(score) =>
      score >= 70
        ? 'Your answers show a strong pattern of everyday generosity and thoughtfulness.'
        : 'Try small, repeatable acts of kindness rather than relying only on occasional grand gestures.'
    }
  />
);

const intimacyQuestions = [
  'We can talk openly about feelings and vulnerabilities.',
  'We enjoy learning how each other thinks.',
  'We regularly create meaningful shared experiences.',
  'We feel comfortable discussing physical affection and closeness.',
  'We can tell each other when we need more connection.',
  'We make time for private conversations without distractions.',
  'We remain curious about each other as people change.',
  'We can ask for closeness without fear of rejection or ridicule.',
];

export const IntimacyDepthTool: React.FC<Phase4ToolProps> = ({ tool, onShare }) => (
  <QuizTool
    tool={tool}
    onShare={onShare}
    title={`Try ${tool.title}`}
    description="Explore emotional, intellectual, experiential, and physical closeness."
    icon={<Heart className="w-5 h-5" />}
    questionSet={intimacyQuestions}
    resultMessage={(score) =>
      score >= 70
        ? 'Your answers suggest several healthy channels of closeness are available to you.'
        : 'Look for the lowest-confidence areas and create small, comfortable ways to deepen connection.'
    }
  />
);

const boredomQuestions = [
  'We try new activities together instead of repeating the same routine every week.',
  'We still make intentional plans for dates or quality time.',
  'We can be playful together without needing a special occasion.',
  'We sometimes surprise each other with a new idea.',
  'We have interests we can explore together.',
  'We protect time for connection when routines get busy.',
  'We are comfortable changing a stale routine.',
  'We can create fun without spending much money.',
];

const adventureIdeas = [
  'Try a new local food and rate it together.',
  'Take a walk somewhere neither of you usually visits.',
  'Have a phone-free evening with three conversation questions.',
  'Learn a simple skill together from a free tutorial.',
  'Create a mystery date using a small random budget.',
];

export const RelationshipBoredomTool: React.FC<Phase4ToolProps> = ({ tool, onShare }) => {
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const score = useMemo(() => {
    const values = Object.values(answers);
    return values.length ? clamp((values.reduce((a, b) => a + b, 0) / (values.length * 5)) * 100) : 0;
  }, [answers]);

  const reset = () => {
    setAnswers({});
    setDone(false);
  };

  return (
    <Shell
      title={`Try ${tool.title}`}
      description="See how much novelty and intentional fun exists in your current routine."
      icon={<Sparkles className="w-5 h-5" />}
    >
      {!done ? (
        <>
          <div className="space-y-4">
            {boredomQuestions.map((q, i) => (
              <RatingQuestion
                key={q}
                index={i}
                text={q}
                value={answers[i]}
                onSelect={(v) => setAnswers((current) => ({ ...current, [i]: v }))}
              />
            ))}
          </div>
          <button
            type="button"
            disabled={Object.keys(answers).length !== boredomQuestions.length}
            onClick={() => setDone(true)}
            className="w-full mt-6 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-5 py-3 font-bold"
          >
            Bust the Routine
          </button>
        </>
      ) : (
        <>
          <Result
            score={score}
            label={scoreLabel(score)}
            message="The score reflects your answers about novelty and intentional connection; it is a reflection tool, not a clinical measure."
            tool={tool}
            onShare={onShare}
            onReset={reset}
          />
          <div className="mt-6 rounded-2xl border border-pink-100 dark:border-slate-800 p-5">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">5 Easy Spice-Up Ideas</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {adventureIdeas.map((idea) => <li key={idea}>• {idea}</li>)}
            </ul>
          </div>
        </>
      )}
    </Shell>
  );
};

type ApologyLanguage =
  | 'Expressing Regret'
  | 'Accepting Responsibility'
  | 'Making Restitution'
  | 'Genuinely Repenting'
  | 'Requesting Forgiveness';

const apologyOptions: { text: string; type: ApologyLanguage }[] = [
  { text: 'I need to hear that you genuinely regret what happened.', type: 'Expressing Regret' },
  { text: 'I need you to clearly acknowledge what you did wrong.', type: 'Accepting Responsibility' },
  { text: 'I feel better when you explain how you will make things right.', type: 'Making Restitution' },
  { text: 'I need to see a real change so the same thing does not keep happening.', type: 'Genuinely Repenting' },
  { text: 'I need to be asked directly for forgiveness when appropriate.', type: 'Requesting Forgiveness' },
];

export const ApologyLanguageTool: React.FC<Phase4ToolProps> = ({ tool, onShare }) => {
  const [scores, setScores] = useState<Record<ApologyLanguage, number>>({
    'Expressing Regret': 0,
    'Accepting Responsibility': 0,
    'Making Restitution': 0,
    'Genuinely Repenting': 0,
    'Requesting Forgiveness': 0,
  });
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  const current = apologyOptions[index];
  const top = useMemo(
    () => Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Expressing Regret',
    [scores],
  );

  const reset = () => {
    setScores({
      'Expressing Regret': 0,
      'Accepting Responsibility': 0,
      'Making Restitution': 0,
      'Genuinely Repenting': 0,
      'Requesting Forgiveness': 0,
    });
    setIndex(0);
    setDone(false);
  };

  return (
    <Shell
      title={`Try ${tool.title}`}
      description="Choose the apology response that would feel most meaningful to you in each situation."
      icon={<MessageCircleHeart className="w-5 h-5" />}
    >
      {!done ? (
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-2">
              Scenario {index + 1} of {apologyOptions.length}
            </p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              After a disagreement, what would help you feel that the apology is sincere?
            </p>
            <button
              type="button"
              onClick={() => {
                setScores((s) => ({ ...s, [current.type]: s[current.type] + 1 }));
                if (index === apologyOptions.length - 1) setDone(true);
                else setIndex((i) => i + 1);
              }}
              className="w-full mt-5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white px-5 py-4 font-bold"
            >
              {current.text}
            </button>
          </div>
        </div>
      ) : (
        <Result
          score={100}
          label={top}
          message={`Your highest-scoring apology preference is ${top}. People can value more than one apology approach, so use this as a conversation starter rather than a fixed label.`}
          tool={tool}
          onShare={onShare}
          onReset={reset}
        />
      )}
    </Shell>
  );
};

const MBTI_TYPES = [
  'INTJ','INTP','ENTJ','ENTP',
  'INFJ','INFP','ENFJ','ENFP',
  'ISTJ','ISFJ','ESTJ','ESFJ',
  'ISTP','ISFP','ESTP','ESFP',
];

const mbtiScore = (a: string, b: string) => {
  let matches = 0;
  for (let i = 0; i < 4; i += 1) if (a[i] === b[i]) matches += 1;
  return clamp(40 + matches * 15);
};

const mbtiMessage = (a: string, b: string, score: number) => {
  const differences = [
    a[0] !== b[0] ? 'energy and social style' : '',
    a[1] !== b[1] ? 'information preferences' : '',
    a[2] !== b[2] ? 'decision-making style' : '',
    a[3] !== b[3] ? 'planning preferences' : '',
  ].filter(Boolean);

  return differences.length
    ? `${a} and ${b} share some preferences while differing in ${differences.join(', ')}. Those differences can become useful teamwork when discussed openly.`
    : `${a} and ${b} share the same four-letter preference pattern. Similarity can make communication easier, while individual experiences still matter.`;
};

export const MbtiCoupleMatchTool: React.FC<Phase4ToolProps> = ({ tool, onShare }) => {
  const [a, setA] = useState('INTJ');
  const [b, setB] = useState('ENFP');
  const [done, setDone] = useState(false);
  const score = mbtiScore(a, b);

  return (
    <Shell
      title={`Try ${tool.title}`}
      description="Select two four-letter MBTI types and compare their preference patterns."
      icon={<Users className="w-5 h-5" />}
    >
      {!done ? (
        <div className="space-y-5">
          <label className="block">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Person A</span>
            <select
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-full mt-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3"
            >
              {MBTI_TYPES.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Person B</span>
            <select
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="w-full mt-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3"
            >
              {MBTI_TYPES.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <button
            type="button"
            onClick={() => setDone(true)}
            className="w-full rounded-xl bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 font-bold"
          >
            Compare Personality Patterns
          </button>
        </div>
      ) : (
        <Result
          score={score}
          label={`${a} + ${b}`}
          message={mbtiMessage(a, b, score)}
          tool={tool}
          onShare={onShare}
          onReset={() => setDone(false)}
        />
      )}
    </Shell>
  );
};
