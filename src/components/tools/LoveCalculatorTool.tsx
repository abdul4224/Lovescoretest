import React, { useState } from 'react';
import { Heart, Sparkles, RefreshCw, Share2, Copy, Check, Flame } from 'lucide-react';
import { ShareData } from '../../types';

interface LoveCalculatorToolProps {
  onShare: (data: ShareData) => void;
}

export const LoveCalculatorTool: React.FC<LoveCalculatorToolProps> = ({ onShare }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [relationshipType, setRelationshipType] = useState('Dating');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    chemistry: number;
    longevity: number;
    communication: number;
    verdict: string;
    description: string;
    advice: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Algorithmic resonance function: deterministic for same names, but fun and dynamic
  const calculateLove = (e: React.FormEvent) => {
    e.preventDefault();
    const clean1 = name1.trim();
    const clean2 = name2.trim();

    if (!clean1 || !clean2) {
      setError('Please enter both names to calculate your score.');
      return;
    }

    if (clean1.length < 2 || clean2.length < 2) {
      setError('Please enter at least 2 characters for each name.');
      return;
    }

    setError('');
    setIsCalculating(true);

    setTimeout(() => {
      // Calculate harmonic hash
      const combined = `${clean1.toLowerCase()}&${clean2.toLowerCase()}`;
      let hash = 0;
      for (let i = 0; i < combined.length; i++) {
        hash = (hash << 5) - hash + combined.charCodeAt(i);
        hash |= 0;
      }
      const positiveHash = Math.abs(hash);

      // Algorithmic range mostly in the uplifting 68% - 98% range
      const baseScore = 65 + (positiveHash % 32);
      const chemistry = 70 + ((positiveHash * 7) % 29);
      const longevity = 68 + ((positiveHash * 13) % 31);
      const communication = 72 + ((positiveHash * 17) % 27);

      let verdict = 'Soulful Spark!';
      let description = 'You two share an undeniable magnetic pull and wonderful conversational energy.';
      let advice = 'Keep cultivating your shared laughter and curiosity about each other’s worlds.';

      if (baseScore >= 90) {
        verdict = 'Cosmic Match!';
        description = 'An extraordinary harmonious connection! Your names vibrate with deep mutual warmth, loyalty, and joyful chemistry.';
        advice = 'Celebrate your bond by planning a spontaneous date or writing each other a heartfelt note.';
      } else if (baseScore >= 80) {
        verdict = 'Deep Harmony!';
        description = 'A strong, loving foundation with fantastic compatibility and natural teamwork.';
        advice = 'Make intentional time for weekly quality moments away from screens to deepen your intimacy.';
      } else {
        verdict = 'Charming Chemistry!';
        description = 'A delightfully playful dynamic with great spark and room to grow closer every day.';
        advice = 'Embrace your unique differences—they are the very sparks that keep things exciting!';
      }

      setResult({
        score: baseScore,
        chemistry,
        longevity,
        communication,
        verdict,
        description,
        advice,
      });
      setIsCalculating(false);
    }, 600);
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setResult(null);
    setError('');
  };

  const handleCopyResult = async () => {
    if (!result) return;
    const text = `❤️ LoveScoreTest: ${name1} & ${name2} = ${result.score}% (${result.verdict})\nChemistry: ${result.chemistry}% | Longevity: ${result.longevity}% | Communication: ${result.communication}%\nTest yours free: https://lovescoretest.com/#/tool/love-calculator`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const triggerShare = () => {
    if (!result) return;
    onShare({
      title: `Love Calculator: ${name1} & ${name2} = ${result.score}%`,
      text: `${name1} & ${name2} scored ${result.score}% (${result.verdict}) on LoveScoreTest.com!`,
      url: `https://lovescoretest.com/#/tool/love-calculator`,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Tool Interactive Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-pink-100/80 dark:border-slate-800 p-6 md:p-8 shadow-xl shadow-pink-500/5 relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />

        {!result ? (
          <form onSubmit={calculateLove} className="space-y-6 relative z-10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white mb-3 shadow-lg shadow-pink-500/25">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                Calculate Love Compatibility
              </h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Enter two names to see your romantic synergy, chemistry & match score
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-300 text-xs text-center font-medium">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  />
                  <Heart className="w-4 h-4 text-pink-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Partner / Crush Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Taylor"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  />
                  <Sparkles className="w-4 h-4 text-purple-400 absolute right-3.5 top-3.5" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Current Relationship Stage
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {['Crush', 'Dating', 'Couple', 'Engaged', 'Married'].map((stage) => (
                  <button
                    type="button"
                    key={stage}
                    onClick={() => setRelationshipType(stage)}
                    className={`py-2 px-3 text-xs font-medium rounded-xl transition-all border ${
                      relationshipType === stage
                        ? 'bg-pink-50 dark:bg-pink-950/50 border-pink-400 text-pink-600 dark:text-pink-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isCalculating}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-sm md:text-base shadow-lg shadow-pink-500/30 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isCalculating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Aligning Harmonic Vibrations...</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Calculate Love Score</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6 relative z-10 animate-in fade-in zoom-in-95 duration-300">
            {/* Header Result */}
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 text-xs font-semibold mb-2">
                {relationshipType} Compatibility
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
                {name1} <span className="text-pink-500">&</span> {name2}
              </h2>

              {/* Big Score Gauge */}
              <div className="my-6 relative inline-flex items-center justify-center">
                <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-purple-500 p-1.5 shadow-xl shadow-pink-500/20 animate-pulse">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex flex-col items-center justify-center">
                    <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      {result.score}%
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-pink-500 mt-0.5">
                      Love Score
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100">
                {result.verdict}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                {result.description}
              </p>
            </div>

            {/* Metrics Breakdown Bars */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1 mb-1">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  <span>Chemistry</span>
                </div>
                <div className="text-base font-bold text-slate-800 dark:text-slate-100">
                  {result.chemistry}%
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${result.chemistry}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  <span>Longevity</span>
                </div>
                <div className="text-base font-bold text-slate-800 dark:text-slate-100">
                  {result.longevity}%
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${result.longevity}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1 mb-1">
                  <Heart className="w-3.5 h-3.5 text-pink-500" />
                  <span>Vibe Match</span>
                </div>
                <div className="text-base font-bold text-slate-800 dark:text-slate-100">
                  {result.communication}%
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-pink-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${result.communication}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Insight & Tip */}
            <div className="p-4 rounded-2xl bg-pink-50/60 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/40 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-pink-600 dark:text-pink-400 block mb-1">
                💡 Connection Tip for {name1} & {name2}:
              </span>
              {result.advice}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={triggerShare}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 hover:opacity-95 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Result</span>
              </button>

              <button
                onClick={handleCopyResult}
                className="py-3 px-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>

              <button
                onClick={handleReset}
                className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>New Names</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Required Disclaimer */}
      <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-4 px-4 leading-relaxed">
        * <strong>Entertainment Disclaimer:</strong> The Love Calculator is designed for playful fun, couple amusement, and sparking affectionate conversations. True love, mutual respect, and emotional intimacy are built through real-life connection and shared experiences.
      </p>
    </div>
  );
};
