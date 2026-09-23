import React, { useState } from 'react';
import { Sparkles, Shuffle, Share2, Copy, Check, Heart, Trophy, UserCheck } from 'lucide-react';
import { ShareData } from '../../types';

interface WhoIsMoreLikelyToolProps {
  onShare: (data: ShareData) => void;
}

interface PromptItem {
  id: number;
  category: 'Funny' | 'Romantic' | 'Daily Life' | 'Travel & Adventure';
  question: string;
}

const PROMPTS: PromptItem[] = [
  { id: 1, category: 'Funny', question: 'Who is more likely to fall asleep 15 minutes into a movie they picked?' },
  { id: 2, category: 'Romantic', question: 'Who is more likely to remember the exact anniversary date and first date memory?' },
  { id: 3, category: 'Daily Life', question: 'Who is more likely to get hangry when dinner plans are delayed?' },
  { id: 4, category: 'Funny', question: 'Who is more likely to spend 45 minutes looking for their phone while holding it?' },
  { id: 5, category: 'Romantic', question: 'Who says "I love you" more times in a single day?' },
  { id: 6, category: 'Daily Life', question: 'Who is more likely to buy things online that neither of you needed?' },
  { id: 7, category: 'Funny', question: 'Who takes longer getting ready in the bathroom before leaving the house?' },
  { id: 8, category: 'Romantic', question: 'Who is more likely to plan a surprise date night or hide a cute love note?' },
  { id: 9, category: 'Travel & Adventure', question: 'Who is more likely to overpack 5 extra outfits "just in case"?' },
  { id: 10, category: 'Daily Life', question: 'Who is the better navigator when driving in a totally new city?' },
  { id: 11, category: 'Funny', question: 'Who is more likely to say "I\'m not even tired" and start snoring 2 minutes later?' },
  { id: 12, category: 'Romantic', question: 'Who fell in love first?' },
  { id: 13, category: 'Daily Life', question: 'Who is more likely to leave one sip of juice or one chip in the bag?' },
  { id: 14, category: 'Travel & Adventure', question: 'Who is more likely to suggest adopting a stray puppy on vacation?' },
  { id: 15, category: 'Romantic', question: 'Who gives the best comforting hugs after a long stressful day?' },
  { id: 16, category: 'Funny', question: 'Who is worse at keeping a secret surprise party under wraps?' },
  { id: 17, category: 'Daily Life', question: 'Who is more likely to hit the snooze button 5 times in a row?' },
  { id: 18, category: 'Travel & Adventure', question: 'Who is more likely to want to go on a spontaneous midnight road trip?' },
  { id: 19, category: 'Funny', question: 'Who laughs hardest at their own jokes before even finishing telling them?' },
  { id: 20, category: 'Romantic', question: 'Who is more likely to initiate holding hands in public?' },
];

export const WhoIsMoreLikelyTool: React.FC<WhoIsMoreLikelyToolProps> = ({ onShare }) => {
  const [partner1, setPartner1] = useState('Partner 1');
  const [partner2, setPartner2] = useState('Partner 2');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [scores, setScores] = useState<{ p1: number; p2: number; both: number }>({ p1: 0, p2: 0, both: 0 });
  const [copied, setCopied] = useState(false);

  const filteredPrompts = selectedCategory === 'All'
    ? PROMPTS
    : PROMPTS.filter((p) => p.category === selectedCategory);

  const activePrompt = filteredPrompts[currentIdx % filteredPrompts.length];

  const handleVote = (winner: 'p1' | 'p2' | 'both') => {
    setScores((prev) => ({
      ...prev,
      [winner]: prev[winner] + 1,
    }));
    setCurrentIdx((prev) => (prev + 1) % filteredPrompts.length);
  };

  const handleShuffle = () => {
    const randomIdx = Math.floor(Math.random() * filteredPrompts.length);
    setCurrentIdx(randomIdx);
  };

  const totalVotes = scores.p1 + scores.p2 + scores.both;

  const handleCopy = async () => {
    const text = `😂 Who Is More Likely To...? Game Score:\n${partner1}: ${scores.p1} votes\n${partner2}: ${scores.p2} votes\nBoth Equally: ${scores.both} votes\nPlay with your partner free: https://lovescoretest.com/#/tool/who-is-more-likely-to`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerShare = () => {
    onShare({
      title: `Who Is More Likely To? Couple Game Score`,
      text: `${partner1} vs ${partner2}: Total ${totalVotes} questions answered! Play free on LoveScoreTest.com!`,
      url: 'https://lovescoretest.com/#/tool/who-is-more-likely-to',
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-pink-100 dark:border-slate-800 p-6 md:p-8 shadow-xl shadow-pink-500/5 relative overflow-hidden">
        {/* Name setup row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <div className="w-full sm:flex-1">
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Partner 1 Name
            </label>
            <input
              type="text"
              value={partner1}
              onChange={(e) => setPartner1(e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <span className="text-xs font-bold text-pink-500 pt-3">VS</span>

          <div className="w-full sm:flex-1">
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Partner 2 Name
            </label>
            <input
              type="text"
              value={partner2}
              onChange={(e) => setPartner2(e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {['All', 'Funny', 'Romantic', 'Daily Life', 'Travel & Adventure'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIdx(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Question Card */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-tr from-pink-50/70 via-rose-50/50 to-purple-50/70 dark:from-pink-950/30 dark:via-rose-950/20 dark:to-purple-950/30 border border-pink-200/80 dark:border-pink-900/50 text-center my-4 min-h-[160px] flex flex-col items-center justify-center relative">
          <span className="text-[11px] uppercase font-bold tracking-wider text-pink-600 dark:text-pink-400 mb-2">
            {activePrompt.category} Question • #{activePrompt.id}
          </span>
          <h3 className="text-lg md:text-2xl font-extrabold text-slate-900 dark:text-white leading-relaxed max-w-lg">
            "{activePrompt.question}"
          </h3>
        </div>

        {/* Voting Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <button
            onClick={() => handleVote('p1')}
            className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-md shadow-pink-500/20 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>{partner1}</span>
          </button>

          <button
            onClick={() => handleVote('both')}
            className="py-3 px-4 rounded-2xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-bold text-xs hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-purple-500" />
            <span>Both of Us!</span>
          </button>

          <button
            onClick={() => handleVote('p2')}
            className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-md shadow-purple-500/20 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>{partner2}</span>
          </button>
        </div>

        {/* Live Score Tally */}
        <div className="flex items-center justify-around p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-center text-xs font-semibold text-slate-700 dark:text-slate-300 my-4">
          <div>
            <span className="text-pink-600 dark:text-pink-400 block font-bold text-sm">{scores.p1}</span>
            <span>{partner1}</span>
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <span className="text-purple-600 dark:text-purple-400 block font-bold text-sm">{scores.both}</span>
            <span>Tied / Both</span>
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <span className="text-indigo-600 dark:text-indigo-400 block font-bold text-sm">{scores.p2}</span>
            <span>{partner2}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleShuffle}
            className="py-2 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Random Card</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={triggerShare}
              className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:opacity-95 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Score</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
