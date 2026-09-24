import React, { useMemo, useState } from 'react';
import { Heart, Shuffle, RotateCcw, Sparkles } from 'lucide-react';
import { ToolItem, ShareData } from '../../types';

interface Props {
  tool: ToolItem;
  onShare: (data: ShareData) => void;
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

const Button: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  secondary?: boolean;
}> = ({ children, onClick, secondary }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold transition ${
      secondary
        ? 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
        : 'bg-pink-500 text-white hover:bg-pink-600'
    }`}
  >
    {children}
  </button>
);

const Shell: React.FC<{
  tool: ToolItem;
  children: React.ReactNode;
}> = ({ tool, children }) => (
  <div className="w-full max-w-2xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-pink-100 dark:border-slate-800 p-5 sm:p-8 shadow-lg shadow-pink-500/5">
    <div className="flex items-start gap-3 mb-7">
      <div className="w-11 h-11 shrink-0 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 flex items-center justify-center">
        <Heart className="w-5 h-5" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{tool.title}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{tool.description}</p>
      </div>
    </div>
    {children}
  </div>
);

const Result: React.FC<{
  score: number;
  message: string;
  onShare: () => void;
  onReset: () => void;
}> = ({ score, message, onShare, onReset }) => (
  <div className="text-center mt-7 rounded-2xl border border-pink-100 dark:border-slate-800 p-6">
    <div className="w-16 h-16 rounded-3xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 flex items-center justify-center mx-auto mb-5">
      <Sparkles className="w-8 h-8" />
    </div>
    <p className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-2">Your Result</p>
    <h2 className="text-4xl font-black text-slate-900 dark:text-white">{score}%</h2>
    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto mt-4">{message}</p>
    <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
      <Button onClick={onShare}>Share Result</Button>
      <Button onClick={onReset} secondary>Try Again</Button>
    </div>
  </div>
);

const QUIZ_CONFIG: Record<string, {
  intro: string;
  questions: string[];
}> = {
  'enneagram-relationship-matrix': {
    intro: 'Choose how strongly each statement fits your relationship.',
    questions: [
      'We understand each other’s emotional motivations.',
      'We give each other enough personal space.',
      'We handle differences without trying to change each other.',
      'We communicate our deeper needs openly.',
      'We support each other under pressure.',
      'Our different personality patterns complement each other.',
    ],
  },
  'introvert-love-language-guide': {
    intro: 'Rate how naturally these relationship habits fit you as a couple.',
    questions: [
      'We enjoy meaningful one-on-one time.',
      'Quiet affection feels comfortable for both of us.',
      'We respect each other’s need for recharge time.',
      'Small thoughtful gestures matter to us.',
      'We prefer quality conversations over constant communication.',
      'We notice subtle signs of care from each other.',
    ],
  },
  'extrovert-energy-love-guide': {
    intro: 'Rate your shared social and energetic relationship style.',
    questions: [
      'We enjoy meeting people together.',
      'Social activities energize our relationship.',
      'We communicate openly when something bothers us.',
      'We can balance social time with couple time.',
      'We celebrate each other’s enthusiasm.',
      'We give each other room to be expressive.',
    ],
  },
  'love-language-giving-vs-receiving': {
    intro: 'Rate how closely your giving and receiving habits align.',
    questions: [
      'We naturally notice how the other person prefers to receive love.',
      'We express appreciation in ways our partner understands.',
      'We ask directly when we need affection.',
      'We recognize effort even when it looks different from our own.',
      'We adapt our expressions of love when needed.',
      'Both partners feel appreciated regularly.',
    ],
  },
  'words-of-affirmation-generator': {
    intro: 'Answer these prompts to create personalized appreciation ideas.',
    questions: [
      'My partner deserves more verbal appreciation.',
      'I regularly mention specific things I admire.',
      'I acknowledge effort, not only outcomes.',
      'I express gratitude for everyday help.',
      'I tell my partner what makes them special.',
      'I can give sincere compliments without being prompted.',
    ],
  },
  'quality-time-date-planner': {
    intro: 'Rate how well you currently protect meaningful time together.',
    questions: [
      'We regularly schedule distraction-free couple time.',
      'Both partners contribute date ideas.',
      'We make time even during busy weeks.',
      'Our dates involve genuine conversation.',
      'We try new activities together.',
      'We avoid phones when quality time is the goal.',
    ],
  },
  'acts-of-service-idea-vault': {
    intro: 'Measure how naturally you turn care into helpful actions.',
    questions: [
      'We notice tasks our partner needs help with.',
      'We help without keeping score.',
      'We communicate when we need practical support.',
      'We appreciate invisible household work.',
      'We surprise each other with helpful gestures.',
      'We share responsibilities fairly.',
    ],
  },
  'thoughtful-gifting-compass': {
    intro: 'Rate how thoughtful and personalized your gift-giving habits are.',
    questions: [
      'We remember small things our partner likes.',
      'Our gifts usually reflect personal interests.',
      'We value meaning over price.',
      'We notice occasions that matter to our partner.',
      'We can discuss gift preferences openly.',
      'Unexpected thoughtful gestures are common.',
    ],
  },
  'physical-touch-comfort-guide': {
    intro: 'Rate how comfortably you communicate affection through touch.',
    questions: [
      'We both feel comfortable with everyday affection.',
      'We communicate boundaries around physical touch.',
      'We notice when our partner needs comforting touch.',
      'Affection feels mutual rather than expected.',
      'We can talk openly about physical affection.',
      'Non-sexual affection is part of our relationship.',
    ],
  },
  'love-archetype-test': {
    intro: 'Rate the statements to discover your relationship archetype pattern.',
    questions: [
      'I naturally protect and support my partner.',
      'I bring playfulness into the relationship.',
      'I value deep emotional connection.',
      'I enjoy creating memorable experiences.',
      'I express love through reliability.',
      'I encourage my partner to grow.',
    ],
  },
  'empathy-quotient-for-couples': {
    intro: 'Rate how strongly these empathy habits describe your relationship.',
    questions: [
      'I notice changes in my partner’s mood.',
      'I listen before offering solutions.',
      'I can understand feelings different from my own.',
      'I validate my partner’s experience.',
      'I apologize when I realize I caused hurt.',
      'I consider my partner’s perspective during conflict.',
    ],
  },
  'romantic-spontaneity-index': {
    intro: 'Rate your couple’s ability to create spontaneous romantic moments.',
    questions: [
      'We enjoy unexpected plans.',
      'Either partner can initiate a surprise.',
      'We occasionally break routine together.',
      'Spontaneous affection is welcomed.',
      'We can be flexible when plans change.',
      'We create fun without needing a special occasion.',
    ],
  },
  'assertiveness-vs-accommodation-balance': {
    intro: 'Rate how well you balance personal needs with compromise.',
    questions: [
      'We can state our needs clearly.',
      'Neither partner regularly sacrifices their needs.',
      'We compromise without resentment.',
      'We can disagree respectfully.',
      'Boundaries are treated seriously.',
      'Both voices influence important decisions.',
    ],
  },
  'patience-and-temperament-test': {
    intro: 'Rate how calmly you handle everyday relationship friction.',
    questions: [
      'We give each other time to cool down.',
      'Small mistakes do not become major fights.',
      'We avoid insulting each other during conflict.',
      'We can discuss frustrating habits calmly.',
      'We repair disagreements after cooling down.',
      'We are patient when one partner is stressed.',
    ],
  },
  'optimism-vs-realism-couple-match': {
    intro: 'Rate how well your hopeful and practical perspectives complement each other.',
    questions: [
      'We balance hope with realistic planning.',
      'Different viewpoints improve our decisions.',
      'We respect each other’s outlook.',
      'We can plan for risks without losing optimism.',
      'We celebrate possibilities while checking facts.',
      'We support each other during setbacks.',
    ],
  },
};

const GAME_PROMPTS: Record<string, string[]> = {
  'would-you-rather-couples-edition': [
    'Would you rather plan a surprise date or receive one?',
    'Would you rather travel together or build a dream home together?',
    'Would you rather have a quiet weekend or a busy adventure?',
    'Would you rather relive your first date or your funniest date?',
    'Would you rather cook together or order your favorite meal?',
    'Would you rather receive a handwritten note or a surprise gift?',
    'Would you rather watch a movie together or play a game together?',
    'Would you rather have matching hobbies or separate hobbies?',
  ],
  'never-have-i-ever-couples-edition': [
    'Never have I ever planned a surprise for my partner.',
    'Never have I ever reread an old romantic message.',
    'Never have I ever forgotten an important couple date.',
    'Never have I ever secretly practiced what I wanted to say.',
    'Never have I ever laughed at the wrong moment during a serious talk.',
    'Never have I ever planned a date around my partner’s favorite food.',
    'Never have I ever stayed awake just to keep talking.',
    'Never have I ever taken too many couple photos in one day.',
  ],
  'truth-or-dare-for-couples': [
    'Truth: What is one small thing your partner does that always makes you smile?',
    'Dare: Give your partner three genuine compliments.',
    'Truth: What memory together would you happily relive?',
    'Dare: Plan a surprise date using only three sentences.',
    'Truth: What habit of your partner have you grown to love?',
    'Dare: Hold hands and describe your ideal future weekend.',
    'Truth: What is one thing you want to experience together?',
    'Dare: Send your partner a sweet message right now.',
  ],
  '36-questions-to-fall-in-love': [
    'What would a perfect day look like for you?',
    'What is something you are grateful for today?',
    'What memory from childhood still makes you smile?',
    'What quality do you value most in a close relationship?',
    'What is one dream you would like to accomplish?',
    'What makes you feel genuinely understood?',
    'What is something you rarely tell people about yourself?',
    'What does home mean to you?',
  ],
  'date-night-roulette-spinner': [
    'Cook a new meal together',
    'Take a sunset walk',
    'Have a no-phone dinner',
    'Play a board game',
    'Make a shared playlist',
    'Try a new dessert place',
    'Have a living-room movie night',
    'Plan a future trip',
    'Do a couples photo challenge',
    'Write each other a short note',
  ],
  'first-date-conversation-sparker': [
    'What is a hobby you could talk about for hours?',
    'What is your ideal weekend?',
    'What is one place you want to visit?',
    'What is a small thing that makes your day better?',
    'What kind of music always lifts your mood?',
    'What is something you want to learn?',
    'What is your favorite comfort food?',
    'What is one goal you are excited about?',
  ],
  'deep-questions-for-late-nights': [
    'What makes you feel most loved?',
    'What are you currently trying to understand about yourself?',
    'What kind of future feels meaningful to you?',
    'What experience changed the way you see relationships?',
    'What fear would you like a partner to understand?',
    'When do you feel most at peace?',
    'What does emotional safety mean to you?',
    'What is something you hope we never stop doing?',
  ],
  'anniversary-reminiscence-game': [
    'Describe your first memorable moment together.',
    'What was your funniest shared experience?',
    'What meal reminds you most of your relationship?',
    'Which trip or outing stands out most?',
    'What challenge did you overcome together?',
    'What compliment from your partner do you remember?',
    'What song reminds you of a special moment?',
    'What new memory should you create this year?',
  ],
  'bucket-list-for-couples': [
    'Visit a place neither of you has seen.',
    'Learn a new skill together.',
    'Take a spontaneous weekend trip.',
    'Cook a difficult recipe together.',
    'Create a couple photo album.',
    'Watch a sunrise together.',
    'Complete a fitness or activity challenge.',
    'Plan a dream celebration.',
  ],
  'road-trip-couples-trivia': [
    'Who would navigate better without GPS?',
    'Who is more likely to choose the music?',
    'Who packs more snacks?',
    'Who would suggest an unplanned stop?',
    'Who would talk to strangers first?',
    'Who is more likely to fall asleep first?',
    'Who would take more photos?',
    'Who would remember the route afterward?',
  ],
  'dinner-table-question-cards': [
    'What was the best part of your day?',
    'What are you looking forward to?',
    'What is one thing we should do more often?',
    'What food should we learn to make?',
    'What is a recent moment that made you proud?',
    'What is one small goal for this month?',
    'What would make our next weekend special?',
    'What is something you appreciate today?',
  ],
  'two-truths-and-a-lie-couples': [
    'Share two true relationship memories and invent one.',
    'Share two childhood facts and one fake fact.',
    'Share two dream destinations and one fake destination.',
    'Share two favorite foods and one fake favorite.',
    'Share two things you admire and one playful lie.',
    'Share two funny habits and one invented habit.',
  ],
  'rapid-fire-this-or-that-couples': [
    'Beach or mountains?',
    'Movie night or game night?',
    'Sunrise or sunset?',
    'Sweet or savory?',
    'Road trip or flight?',
    'Cooking or eating out?',
    'Planned date or surprise date?',
    'Texting or calling?',
    'Big party or quiet evening?',
    'City break or countryside escape?',
  ],
  'compliment-battle-game': [
    'Compliment your partner’s personality.',
    'Compliment something they worked hard on.',
    'Compliment their sense of humor.',
    'Compliment a small habit you love.',
    'Compliment their kindness.',
    'Compliment a memory you share.',
    'Compliment their style.',
    'Compliment something they taught you.',
  ],
  'fantasy-travel-itinerary-builder': [
    'Dream beach escape',
    'Romantic European city break',
    'Mountain adventure',
    'Food-focused weekend',
    'Luxury resort retreat',
    'Cultural city exploration',
    'Road trip through scenic towns',
    'Quiet countryside getaway',
  ],
  'kiss-and-cuddle-dare-cards': [
    'Give a warm hug for 20 seconds.',
    'Give three gentle compliments.',
    'Hold hands for one full minute.',
    'Share your favorite cozy memory.',
    'Give your partner a forehead kiss.',
    'Describe your perfect relaxing evening together.',
  ],
};

const inputClass =
  'w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-300';

const QuizTool: React.FC<Props & { config: { intro: string; questions: string[] } }> = ({
  tool,
  onShare,
  config,
}) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const score = useMemo(() => {
    const values = Object.values(answers);
    return values.length === config.questions.length
      ? clamp((values.reduce((a, b) => a + b, 0) / (values.length * 5)) * 100)
      : null;
  }, [answers, config.questions.length]);

  const reset = () => setAnswers({});
  const complete = score !== null;

  return (
    <Shell tool={tool}>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">{config.intro}</p>
      {!complete ? (
        <div className="space-y-5">
          {config.questions.map((q, i) => (
            <div key={q}>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {i + 1}. {q}
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setAnswers((prev) => ({ ...prev, [i]: value }))}
                    className={`py-2 rounded-lg text-sm font-bold border ${
                      answers[i] === value
                        ? 'bg-pink-500 text-white border-pink-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <Button onClick={() => setAnswers((prev) => ({ ...prev }))}>
            {Object.keys(answers).length === config.questions.length ? 'See Result' : 'Complete All Answers'}
          </Button>
        </div>
      ) : (
        <Result
          score={score}
          message={`Your result is ${score}%. This entertainment-focused score reflects the answers you gave today and is not a scientific or clinical assessment.`}
          onShare={() =>
            onShare({
              title: `${tool.title} Result`,
              text: `We got ${score}% on ${tool.title} at LoveScoreTest.com.`,
              url: window.location.href,
            })
          }
          onReset={reset}
        />
      )}
    </Shell>
  );
};

const GameTool: React.FC<Props & { prompts: string[] }> = ({ tool, onShare, prompts }) => {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * prompts.length));
  const prompt = prompts[index];

  const next = () => {
    let nextIndex = Math.floor(Math.random() * prompts.length);
    if (prompts.length > 1 && nextIndex === index) nextIndex = (index + 1) % prompts.length;
    setIndex(nextIndex);
  };

  return (
    <Shell tool={tool}>
      <div className="rounded-2xl bg-pink-50 dark:bg-pink-950/30 p-6 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-3">Your Prompt</p>
        <p className="text-xl font-bold text-slate-900 dark:text-white min-h-20 flex items-center justify-center">
          {prompt}
        </p>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={next}><Shuffle className="inline w-4 h-4 mr-2" />Next</Button>
        <Button
          secondary
          onClick={() =>
            onShare({
              title: tool.title,
              text: `${prompt} — Couples prompt from LoveScoreTest.com`,
              url: window.location.href,
            })
          }
        >
          Share Prompt
        </Button>
      </div>
    </Shell>
  );
};

const RandomizerTool: React.FC<Props & { items: string[] }> = ({ tool, onShare, items }) => {
  const [value, setValue] = useState(items[0]);
  const spin = () => setValue(items[Math.floor(Math.random() * items.length)]);

  return (
    <Shell tool={tool}>
      <div className="text-center">
        <div className="rounded-2xl border border-pink-100 dark:border-slate-800 p-7">
          <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={spin}><Shuffle className="inline w-4 h-4 mr-2" />Spin Again</Button>
          <Button
            secondary
            onClick={() =>
              onShare({
                title: tool.title,
                text: `${tool.title}: ${value}`,
                url: window.location.href,
              })
            }
          >
            Share
          </Button>
        </div>
      </div>
    </Shell>
  );
};

const ANNIVERSARY_GIFTS: Record<number, [string, string]> = {
  1: ['Paper', 'Clock'],
  2: ['Cotton', 'China'],
  3: ['Leather', 'Crystal or Glass'],
  4: ['Fruit or Flowers', 'Appliances'],
  5: ['Wood', 'Silverware'],
  6: ['Iron', 'Wood'],
  7: ['Wool or Copper', 'Desk Sets'],
  8: ['Bronze or Pottery', 'Lace'],
  9: ['Pottery or Willow', 'Leather'],
  10: ['Tin or Aluminum', 'Diamond Jewelry'],
  11: ['Steel', 'Fashion Jewelry'],
  12: ['Silk or Linen', 'Pearls'],
  13: ['Lace', 'Faux Fur'],
  14: ['Ivory', 'Gold Jewelry'],
  15: ['Crystal', 'Watches'],
  20: ['China', 'Platinum'],
  25: ['Silver', 'Silver'],
  30: ['Pearl', 'Diamond'],
  35: ['Coral or Jade', 'Jade'],
  40: ['Ruby', 'Ruby'],
  45: ['Sapphire', 'Sapphire'],
  50: ['Gold', 'Gold'],
};

const AnniversaryGiftTool: React.FC<Props> = ({ tool, onShare }) => {
  const [year, setYear] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const findGift = () => {
    const n = Math.floor(Number(year));
    if (!n || n < 1 || n > 100) return;

    const gift = ANNIVERSARY_GIFTS[n];
    const text = gift
      ? `${n}th anniversary: Traditional gift — ${gift[0]}. Modern gift — ${gift[1]}.`
      : `${n}th anniversary: No standard entry in this quick reference. Consider choosing a gift connected to a shared memory, hobby, or milestone.`;

    setResult(text);
  };

  return (
    <Shell tool={tool}>
      <div className="space-y-4">
        <label className="block">
          <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Anniversary year
          </span>
          <input
            className={inputClass}
            type="number"
            min="1"
            max="100"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g. 10"
          />
        </label>

        <Button onClick={findGift}>Find Gift Ideas</Button>

        {result && (
          <div className="mt-5 rounded-2xl bg-pink-50 dark:bg-pink-950/30 p-5">
            <p className="font-bold text-slate-900 dark:text-white">{result}</p>
            <div className="mt-4 flex gap-3">
              <Button onClick={() => onShare({ title: `${tool.title} Result`, text: result, url: window.location.href })}>
                Share
              </Button>
              <Button secondary onClick={() => setResult(null)}>
                <RotateCcw className="inline w-4 h-4 mr-2" />Reset
              </Button>
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
};

const GrowthScoreTool: React.FC<Props> = ({ tool, onShare }) => {
  const questions = [
    'We regularly show appreciation for each other.',
    'We communicate openly when something is bothering us.',
    'We work together when facing challenges.',
    'We make time for shared experiences and connection.',
    'We support each other’s personal growth and goals.',
    'We reflect on our relationship and try to improve it.',
  ];

  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [result, setResult] = useState<{ score: number; message: string } | null>(null);

  const calculate = () => {
    if (answers.some((v) => v === 0)) return;

    const score = Math.round((answers.reduce((sum, v) => sum + v, 0) / (questions.length * 5)) * 100);
    const message =
      score >= 85
        ? 'Strong growth habits. Keep protecting the appreciation and teamwork that already exist.'
        : score >= 70
          ? 'Healthy growth foundation. Look for one or two areas where you can become more consistent.'
          : score >= 50
            ? 'There is room to strengthen your relationship habits. Start with the lowest-scoring areas.'
            : 'Use this as a starting point for reflection. Small, consistent improvements can build stronger habits over time.';

    setResult({ score, message });
  };

  return (
    <Shell tool={tool}>
      <div className="space-y-5">
        {questions.map((question, index) => (
          <div key={question} className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
            <p className="font-semibold text-slate-900 dark:text-white mb-3">{index + 1}. {question}</p>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAnswers((prev) => prev.map((v, i) => i === index ? value : v))}
                  className={`rounded-xl px-2 py-2 text-sm font-bold border ${
                    answers[index] === value
                      ? 'bg-pink-600 text-white border-pink-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}

        <Button onClick={calculate}>Calculate Growth Score</Button>

        {result && (
          <Result
            score={result.score}
            message={result.message}
            onShare={() => onShare({
              title: `${tool.title} Result`,
              text: `${tool.title}: ${result.score}% — ${result.message}`,
              url: window.location.href,
            })}
            onReset={() => {
              setAnswers(Array(questions.length).fill(0));
              setResult(null);
            }}
          />
        )}
      </div>
    </Shell>
  );
};
const CalculatorTool: React.FC<Props> = ({ tool, onShare }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [number, setNumber] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const start = startDate ? new Date(`${startDate}T00:00:00`) : null;
    const end = endDate ? new Date(`${endDate}T00:00:00`) : null;
    const a = Number(number);
    const b = Number(number2);

    if (tool.slug === 'next-anniversary-countdown') {
      if (!startDate) return;
      const base = new Date(`${startDate}T00:00:00`);
      const now = new Date();
      const next = new Date(now.getFullYear(), base.getMonth(), base.getDate());
      if (next < now) next.setFullYear(now.getFullYear() + 1);
      setResult(`${Math.ceil((next.getTime() - now.getTime()) / 86400000)} days until your next anniversary.`);
      return;
    }

    if (tool.slug === 'hours-spent-together-calculator' || tool.slug === 'shared-sleep-hours-counter') {
      if (!start || !end || end < start) return;
      const days = Math.floor((end.getTime() - start.getTime()) / 86400000);
      const hours = tool.slug === 'shared-sleep-hours-counter' ? days * 8 : days * 24;
      setResult(`${days.toLocaleString()} days × ${hours / Math.max(days, 1)} hours/day = ${hours.toLocaleString()} hours.`);
      return;
    }

    if (tool.slug === 'couples-age-gap-calculator') {
      if (!number || !number2) return;
      setResult(`Approximate age gap: ${Math.abs(a - b).toFixed(1)} years.`);
      return;
    }

    if (tool.slug === 'heartbeats-shared-together-counter') {
      if (!number) return;
      setResult(`At an average of 70 beats/minute, approximately ${(a * 365 * 24 * 60 * 70).toLocaleString()} heartbeats.`);
      return;
    }

    if (tool.slug === 'sunrises-and-sunsets-shared-counter') {
      if (!number) return;
      setResult(`Approximately ${(a * 365).toLocaleString()} days of shared sunrises/sunsets.`);
      return;
    }

    if (tool.slug === 'shared-meals-eaten-calculator') {
      if (!number || !number2) return;
      setResult(`Estimated shared meals: ${(a * b).toLocaleString()}.`);
      return;
    }

    if (tool.slug === 'milestone-1000-days-calculator') {
      if (!start) return;
      const milestone = new Date(start.getTime() + 999 * 86400000);
      setResult(`Your 1,000-day milestone is ${milestone.toLocaleDateString()}.`);
      return;
    }

    if (tool.slug === 'golden-anniversary-timeline-projector') {
      if (!start) return;
      const anniversary = new Date(start);
      anniversary.setFullYear(anniversary.getFullYear() + 50);
      setResult(`Your 50-year golden anniversary date is ${anniversary.toLocaleDateString()}.`);
      return;
    }

    if (tool.slug === 'date-night-annual-spend-calculator') {
      if (!number || !number2) return;
      setResult(`Estimated annual date-night spend: ${(a * b).toLocaleString()}.`);
      return;
    }

    if (tool.slug === 'shared-chores-equity-calculator') {
      if (!number || !number2 || a + b === 0) return;
      const first = (a / (a + b)) * 100;
      const second = (b / (a + b)) * 100;
      setResult(`Chore split: Person A ${first.toFixed(0)}% / Person B ${second.toFixed(0)}%.`);
      return;
    }

    if (tool.slug === 'wedding-budget-estimator') {
      if (!number) return;
      setResult(`Suggested working wedding budget: ${a.toLocaleString()} based on your entered target amount.`);
      return;
    }

    if (tool.slug === 'wedding-guest-count-calculator') {
      if (!number) return;
      setResult(`Plan seating for approximately ${Math.ceil(a)} guests, plus a 5% buffer: ${Math.ceil(a * 1.05)} seats.`);
      return;
    }

    if (tool.slug === 'honeymoon-budget-and-savings-planner') {
      if (!number || !number2) return;
      setResult(`At ${a.toLocaleString()} saved per month, you would reach ${b.toLocaleString()} in approximately ${(b / a).toFixed(1)} months.`);
      return;
    }

    if (tool.slug === 'ldr-flight-distance-timezones-calculator') {
      if (!number || !number2) return;
      setResult(`Time-zone difference: ${Math.abs(a - b).toFixed(1)} hours.`);
      return;
    }

    setResult('Enter the requested values and calculate your estimate.');
  };

  const dateTool = [
    'next-anniversary-countdown',
    'hours-spent-together-calculator',
    'shared-sleep-hours-counter',
    'milestone-1000-days-calculator',
    'golden-anniversary-timeline-projector',
  ].includes(tool.slug);

  const ageTool = tool.slug === 'couples-age-gap-calculator';
  const twoNumberTool = [
    'shared-meals-eaten-calculator',
    'date-night-annual-spend-calculator',
    'shared-chores-equity-calculator',
    'honeymoon-budget-and-savings-planner',
    'ldr-flight-distance-timezones-calculator',
  ].includes(tool.slug);

  return (
    <Shell tool={tool}>
      <div className="space-y-4">
        {dateTool && (
          <label className="block">
            <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {tool.slug === 'next-anniversary-countdown' ? 'Anniversary date' : 'Start date'}
            </span>
            <input className={inputClass} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
        )}

        {dateTool && ['hours-spent-together-calculator', 'shared-sleep-hours-counter'].includes(tool.slug) && (
          <label className="block">
            <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">End date</span>
            <input className={inputClass} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
        )}

        {ageTool && (
          <>
            <label className="block">
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Person A age</span>
              <input className={inputClass} type="number" min="0" value={number} onChange={(e) => setNumber(e.target.value)} />
            </label>
            <label className="block">
              <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Person B age</span>
              <input className={inputClass} type="number" min="0" value={number2} onChange={(e) => setNumber2(e.target.value)} />
            </label>
          </>
        )}

        {!dateTool && !ageTool && (
          <label className="block">
            <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {twoNumberTool ? 'First value' : 'Enter a value'}
            </span>
            <input className={inputClass} type="number" min="0" value={number} onChange={(e) => setNumber(e.target.value)} />
          </label>
        )}

        {twoNumberTool && (
          <label className="block">
            <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Second value</span>
            <input className={inputClass} type="number" min="0" value={number2} onChange={(e) => setNumber2(e.target.value)} />
          </label>
        )}

        <Button onClick={calculate}>Calculate</Button>

        {result && (
          <div className="mt-5 rounded-2xl bg-pink-50 dark:bg-pink-950/30 p-5">
            <p className="font-bold text-slate-900 dark:text-white">{result}</p>
            <div className="mt-4 flex gap-3">
              <Button
                onClick={() =>
                  onShare({
                    title: `${tool.title} Result`,
                    text: result,
                    url: window.location.href,
                  })
                }
              >
                Share
              </Button>
              <Button secondary onClick={() => setResult(null)}>
                <RotateCcw className="inline w-4 h-4 mr-2" />Reset
              </Button>
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
};

export const Phase5And6Tool: React.FC<Props> = ({ tool, onShare }) => {
  if (tool.slug === 'traditional-anniversary-gift-finder') return <AnniversaryGiftTool tool={tool} onShare={onShare} />;
  if (tool.slug === 'relationship-roi-and-growth-score') return <GrowthScoreTool tool={tool} onShare={onShare} />;

  const quiz = QUIZ_CONFIG[tool.slug];
  if (quiz) return <QuizTool tool={tool} onShare={onShare} config={quiz} />;

  const game = GAME_PROMPTS[tool.slug];
  if (game) {
    if (tool.slug === 'date-night-roulette-spinner' || tool.slug === 'fantasy-travel-itinerary-builder') {
      return <RandomizerTool tool={tool} onShare={onShare} items={game} />;
    }
    return <GameTool tool={tool} onShare={onShare} prompts={game} />;
  }

  return <CalculatorTool tool={tool} onShare={onShare} />;
};



