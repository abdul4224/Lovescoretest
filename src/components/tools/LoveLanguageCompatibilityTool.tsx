import React, { useState } from 'react';
import { Repeat, Sparkles, RefreshCw, Share2, Copy, Check, Heart, AlertCircle, Lightbulb } from 'lucide-react';
import { ShareData } from '../../types';

interface LoveLanguageCompatibilityToolProps {
  onShare: (data: ShareData) => void;
}

type Language = 'Words of Affirmation' | 'Acts of Service' | 'Receiving Gifts' | 'Quality Time' | 'Physical Touch';

const ALL_LANGUAGES: { name: Language; icon: string; short: string }[] = [
  { name: 'Words of Affirmation', icon: '💬', short: 'Verbal appreciation, compliments, sweet texts' },
  { name: 'Acts of Service', icon: '🤝', short: 'Easing burdens, chores, proactive help' },
  { name: 'Receiving Gifts', icon: '🎁', short: 'Thoughtful tokens, keepsakes, surprises' },
  { name: 'Quality Time', icon: '⏳', short: 'Undivided presence, deep eye contact, dates' },
  { name: 'Physical Touch', icon: '🫂', short: 'Hugs, hand-holding, cuddles, non-verbal warmth' },
];

export const LoveLanguageCompatibilityTool: React.FC<LoveLanguageCompatibilityToolProps> = ({ onShare }) => {
  const [partner1Name, setPartner1Name] = useState('Partner 1');
  const [partner2Name, setPartner2Name] = useState('Partner 2');
  const [partner1Primary, setPartner1Primary] = useState<Language>('Quality Time');
  const [partner2Primary, setPartner2Primary] = useState<Language>('Words of Affirmation');
  const [copied, setCopied] = useState(false);

  // Compute synergy matrix
  const isSame = partner1Primary === partner2Primary;

  const getSynergyData = () => {
    if (isSame) {
      return {
        score: 96,
        badge: 'Mirrored Resonance (96% Harmony)',
        headline: `Both speak ${partner1Primary}!`,
        strengths: 'You naturally understand what makes each other feel cherished. What fills your emotional tank fills theirs too.',
        blindSpot: 'Because you speak the same language, beware of neglecting other areas (like words or physical touch) that round out a relationship.',
        advice: `Keep doing what you do! Just make sure to periodically check in to make sure no secondary emotional needs are overlooked.`,
      };
    }

    // Complementary combinations
    const pair = [partner1Primary, partner2Primary].sort().join(' + ');

    return {
      score: 88,
      badge: 'Complementary Harmony (88% Synergy)',
      headline: `The "${partner1Primary}" & "${partner2Primary}" Pair`,
      strengths: `You bring different emotional gifts to the table, expanding how both of you give and experience affection in the relationship.`,
      blindSpot: `Beware of accidental projection: don’t offer only what YOU crave when your partner is longing for their specific dialect.`,
      advice: `Translate your gestures! When ${partner1Name} wants to express love, try practicing ${partner2Primary}. When ${partner2Name} wants to express love, try practicing ${partner1Primary}.`,
    };
  };

  const synergy = getSynergyData();

  const handleCopy = async () => {
    const text = `💞 Love Language Compatibility: ${partner1Name} (${partner1Primary}) + ${partner2Name} (${partner2Primary}) = ${synergy.score}% Synergy!\n${synergy.headline} - ${synergy.badge}\nCheck yours free: https://lovescoretest.com/#/tool/love-language-compatibility`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerShare = () => {
    onShare({
      title: `Love Language Synergy: ${partner1Primary} + ${partner2Primary}`,
      text: `${partner1Name} and ${partner2Name} compared Love Languages on LoveScoreTest.com and scored ${synergy.score}% Synergy!`,
      url: 'https://lovescoretest.com/#/tool/love-language-compatibility',
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 p-6 md:p-8 shadow-xl shadow-purple-500/5 relative overflow-hidden">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white mb-2 shadow-lg shadow-purple-500/25">
            <Repeat className="w-6 h-6" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Love Language Synergy Matrix
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare how your affection styles align, identify blind spots, and learn to translate love
          </p>
        </div>

        {/* Partners Setup Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Partner 1 */}
          <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/40">
            <div className="mb-3">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Partner 1 Name
              </label>
              <input
                type="text"
                value={partner1Name}
                onChange={(e) => setPartner1Name(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-pink-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-medium"
              />
            </div>

            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
              Primary Love Language
            </label>
            <select
              value={partner1Primary}
              onChange={(e) => setPartner1Primary(e.target.value as Language)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-pink-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {ALL_LANGUAGES.map((l) => (
                <option key={l.name} value={l.name}>
                  {l.icon} {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Partner 2 */}
          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40">
            <div className="mb-3">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Partner 2 Name
              </label>
              <input
                type="text"
                value={partner2Name}
                onChange={(e) => setPartner2Name(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-purple-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-medium"
              />
            </div>

            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
              Primary Love Language
            </label>
            <select
              value={partner2Primary}
              onChange={(e) => setPartner2Primary(e.target.value as Language)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {ALL_LANGUAGES.map((l) => (
                <option key={l.name} value={l.name}>
                  {l.icon} {l.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Compatibility Report */}
        <div className="p-5 rounded-2xl bg-gradient-to-tr from-pink-50/60 to-purple-50/60 dark:from-pink-950/30 dark:to-purple-950/30 border border-pink-100 dark:border-pink-900/40 text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-300 text-xs font-bold shadow-sm mb-2">
            {synergy.badge}
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
            {partner1Name} ({partner1Primary}) <span className="text-pink-500">&</span> {partner2Name} ({partner2Primary})
          </h3>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed max-w-lg mx-auto">
            {synergy.strengths}
          </p>
        </div>

        {/* Blind Spot & Solution */}
        <div className="space-y-3 mb-6">
          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 text-left">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-500" /> Potential Misunderstanding / Blind Spot:
            </span>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {synergy.blindSpot}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-left">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-emerald-500" /> How to Bridge the Dialects:
            </span>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {synergy.advice}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={triggerShare}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 hover:opacity-95 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Synergy Matrix</span>
          </button>

          <button
            onClick={handleCopy}
            className="py-3 px-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
