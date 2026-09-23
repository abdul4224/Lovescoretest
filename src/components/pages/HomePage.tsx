import React from 'react';
import {
  Heart,
  Sparkles,
  Flame,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Award,
  ChevronRight,
  Compass,
  MessageCircleHeart,
  Gamepad2,
  CalendarHeart,
  Smile,
  Search,
  CheckCircle2,
  Share2,
  FileEdit,
  BarChart3
} from 'lucide-react';
import { ALL_TOOLS } from '../../data/toolsData';
import { AdsterraSlot } from '../AdsterraSlot';
import { FAQAccordion } from '../FAQAccordion';
import { ShareData } from '../../types';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onShare: (data: ShareData) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onShare }) => {
  // Explicitly grab the top 8 popular tools matching the user specification
  const popularSlugs = [
    'love-calculator',
    'love-compatibility-test',
    'friendship-compatibility-test',
    'couple-compatibility-quiz',
    'love-language-test',
    'love-language-compatibility',
    'how-well-do-you-know-your-partner',
    'who-is-more-likely-to',
  ];

  const popularTools = popularSlugs
    .map((slug) => ALL_TOOLS.find((t) => t.slug === slug))
    .filter(Boolean) as typeof ALL_TOOLS;

  const homeFaqs = [
    {
      question: 'How does LoveScoreTest work?',
      answer:
        'LoveScoreTest provides a collection of interactive relationship tools, compatibility checks, and communication quizzes. Each tool uses client-side calculation logic—ranging from phonetic name resonance algorithms to structured multi-factor assessments—to evaluate compatibility, love languages, and relationship milestones right in your web browser.',
    },
    {
      question: 'Are my entered names, quiz answers, and dates kept private?',
      answer:
        'Yes. All calculations and scoring algorithms execute entirely within your browser session using standard client-side JavaScript. We do not require account registration, and your private inputs are neither stored in an external database nor sold to third parties.',
    },
    {
      question: 'Are name-based love scores scientific predictions or for entertainment?',
      answer:
        'Name-based calculators (such as the Love Calculator and Flames Test) are created strictly for recreational fun, lighthearted romance, and entertainment. In contrast, our structured communication quizzes (such as Love Languages and Couple Compatibility) are based on established interpersonal communication concepts to inspire meaningful dialogue.',
    },
    {
      question: 'How do the Couple Compatibility and Love Language quizzes work?',
      answer:
        'Our Couple Compatibility Quiz evaluates key pillars of a healthy partnership: emotional intimacy, shared values, communication habits, and conflict resolution. The Love Language Test assesses your individual preferences across the 5 recognized love styles (Words of Affirmation, Quality Time, Receiving Gifts, Acts of Service, and Physical Touch) to help you and your partner understand each other deeper.',
    },
    {
      question: 'How does sharing results work, and does it expose my private answers?',
      answer:
        'When you click "Share Results", our system generates a clean, fun summary badge with your overall score and encouraging relationship insight. It does not expose individual private questionnaire answers, and you can easily share it via WhatsApp, X, Facebook, Telegram, or copy the direct link.',
    },
    {
      question: 'Do I need to create an account, log in, or pay to use any tool?',
      answer:
        'No. Every single tool on LoveScoreTest.com is 100% free with no account creation, no subscriptions, and no paywalls. You can open any tool and start testing immediately on your phone, tablet, or desktop.',
    },
  ];

  return (
    <div className="w-full">
      {/* ========================================================
          HERO SECTION (High-Contrast Romantic Aesthetic)
          ======================================================== */}
      <section className="relative overflow-hidden pt-8 pb-14 md:pt-14 md:pb-20 border-b border-pink-100 dark:border-slate-800 bg-gradient-to-b from-pink-50/70 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        {/* Soft background ambient blurs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-200/30 dark:bg-pink-900/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/30 dark:bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950/80 border border-pink-200 dark:border-pink-900/60 text-pink-700 dark:text-pink-300 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400 fill-pink-500" />
                <span>The Free 100 Relationship Tools Hub</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Discover. Compare.{' '}
                <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                  Connect.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Explore 100 free tests, compatibility quizzes, love languages, and couple milestones designed to spark joy, intimacy, and heartfelt conversations.
              </p>

              {/* Call-to-action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('tool/love-calculator')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white font-bold text-sm md:text-base shadow-lg shadow-pink-500/25 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Calculate Love Score</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold text-sm md:text-base hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Compass className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  <span>Explore All 100 Tools</span>
                </button>
              </div>

              {/* Privacy and Usability Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>100% In-Browser Privacy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  <span>No Account or Signup Needed</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual (Romantic Preview Card) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-700 p-6 shadow-xl shadow-pink-500/10 relative">
                {/* Floating badge */}
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white text-[11px] font-bold shadow-md shadow-pink-500/30 flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  <span>98% Chemistry</span>
                </div>

                <div className="text-center pt-2 pb-4">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 p-1 shadow-md shadow-pink-500/25 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-pink-50 dark:bg-slate-800 flex items-center justify-center">
                      <Heart className="w-10 h-10 text-pink-600 dark:text-pink-400 fill-pink-500" />
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Better Together ♡
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                    Alex & Taylor • Harmonic Soul Synergy
                  </p>
                </div>

                {/* Micro metrics preview */}
                <div className="space-y-3 my-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      <span>Love Compatibility</span>
                      <span className="text-pink-600 dark:text-pink-400 font-extrabold">96%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-full w-[96%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      <span>Love Languages Synergy</span>
                      <span className="text-purple-600 dark:text-purple-400 font-extrabold">92%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full w-[92%]" />
                    </div>
                  </div>
                </div>

                {/* Action button inside hero card */}
                <button
                  type="button"
                  onClick={() => onNavigate('tool/love-calculator')}
                  className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-md shadow-pink-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Test Your Couple Score Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Adsterra Top Slot */}
      <AdsterraSlot slot="homepage_top" className="my-6" />

      {/* ========================================================
          CATEGORIES SECTION
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
            Curated Categories
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Explore Tools by Vibe & Purpose
          </h2>
          <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 mt-2">
            Click any category to dive straight into tailored relationship experiences
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {[
            {
              name: 'Love Tests',
              icon: Heart,
              color: 'text-pink-600 dark:text-pink-400',
              bg: 'bg-white dark:bg-slate-900 hover:border-pink-300 dark:hover:border-pink-700',
              count: '16 Tools',
            },
            {
              name: 'Compatibility',
              icon: Sparkles,
              color: 'text-purple-600 dark:text-purple-400',
              bg: 'bg-white dark:bg-slate-900 hover:border-purple-300 dark:hover:border-purple-700',
              count: '18 Tools',
            },
            {
              name: 'Love Languages',
              icon: MessageCircleHeart,
              color: 'text-rose-600 dark:text-rose-400',
              bg: 'bg-white dark:bg-slate-900 hover:border-rose-300 dark:hover:border-rose-700',
              count: '14 Tools',
            },
            {
              name: 'Couple Quizzes',
              icon: Users,
              color: 'text-indigo-600 dark:text-indigo-400',
              bg: 'bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700',
              count: '18 Tools',
            },
            {
              name: 'Personality',
              icon: Smile,
              color: 'text-emerald-600 dark:text-emerald-400',
              bg: 'bg-white dark:bg-slate-900 hover:border-emerald-300 dark:hover:border-emerald-700',
              count: '12 Tools',
            },
            {
              name: 'Couple Games',
              icon: Gamepad2,
              color: 'text-fuchsia-600 dark:text-fuchsia-400',
              bg: 'bg-white dark:bg-slate-900 hover:border-fuchsia-300 dark:hover:border-fuchsia-700',
              count: '12 Tools',
            },
            {
              name: 'Calculators',
              icon: CalendarHeart,
              color: 'text-sky-600 dark:text-sky-400',
              bg: 'bg-white dark:bg-slate-900 hover:border-sky-300 dark:hover:border-sky-700',
              count: '10 Tools',
            },
            {
              name: 'Browse All 100',
              icon: Compass,
              color: 'text-pink-600 dark:text-pink-400',
              bg: 'bg-gradient-to-tr from-pink-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 hover:border-pink-400 dark:hover:border-pink-600',
              count: 'Full Catalog',
            },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                onClick={() =>
                  cat.name === 'Browse All 100'
                    ? onNavigate('catalog')
                    : onNavigate(`catalog?category=${encodeURIComponent(cat.name)}`)
                }
                className={`p-5 rounded-3xl border border-slate-200 dark:border-slate-800 ${cat.bg} transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-pink-50 dark:bg-slate-800 shadow-sm flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {cat.count}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 flex items-center gap-1 font-medium">
                    <span>Explore Tools</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          POPULAR TOOLS SECTION (8 Implemented Tools)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ready to Play Right Now</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Popular Relationship Tools
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Free, private, and instant calculations for couples, crushes, and friends
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('catalog')}
            className="text-xs md:text-sm font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All 100 in Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onNavigate(`tool/${tool.slug}`)}
              className="rounded-3xl p-5 md:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-400 dark:hover:border-pink-600 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-700 dark:text-pink-300 px-2.5 py-0.5 rounded-full bg-pink-100/80 dark:bg-pink-950/60">
                    {tool.category}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Available
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors leading-snug">
                  {tool.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed line-clamp-3">
                  {tool.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-pink-600 dark:text-pink-400 group-hover:underline">
                  Start Test Free
                </span>
                <div className="w-7 h-7 rounded-xl bg-pink-50 dark:bg-slate-800 text-pink-600 dark:text-pink-400 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* In-Content Adsterra Slot */}
      <AdsterraSlot slot="homepage_incontent" className="my-6" />

      {/* ========================================================
          HOW IT WORKS (4 Clear Steps per User Specification)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
              Simple Steps. Meaningful Results.
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              How LoveScoreTest Works
            </h2>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 mt-2">
              Four straightforward steps to explore compatibility and spark sweet discussions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400 shadow-sm flex items-center justify-center font-black text-lg mx-auto">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Choose a Tool
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Browse our catalog of 100 relationship tools. Pick from love calculators, compatibility tests, couple games, or anniversary counters.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 shadow-sm flex items-center justify-center font-black text-lg mx-auto">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Enter Your Details
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Provide names, dates, or answer honest quiz prompts. Everything is processed 100% locally in your browser with zero data harvesting.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 shadow-sm flex items-center justify-center font-black text-lg mx-auto">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Get Your Results
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Receive instant compatibility percentages, multi-factor breakdowns, strengths, growth areas, and personalized connection tips.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 shadow-sm flex items-center justify-center font-black text-lg mx-auto">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Share & Connect
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Share your results directly to WhatsApp, social media, or copy a private link to inspire playful conversation with your partner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          HOMEPAGE FAQ ACCORDION (Fixed & Highly Readable)
          ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <FAQAccordion
          faqs={homeFaqs}
          title="Frequently Asked Questions"
          subtitle="Real, straightforward answers about our privacy practices, algorithms, and quiz design."
        />
      </section>

      {/* Footer Banner Ad Slot */}
      <AdsterraSlot slot="footer_banner" className="my-6" />
    </div>
  );
};
