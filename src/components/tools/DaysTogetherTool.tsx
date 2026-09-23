import React, { useState } from 'react';
import { Heart, Calendar, Sparkles, Share2, Copy, Check, Flame, Trophy } from 'lucide-react';
import { ShareData } from '../../types';

interface DaysTogetherToolProps {
  onShare: (data: ShareData) => void;
}

export const DaysTogetherTool: React.FC<DaysTogetherToolProps> = ({ onShare }) => {
  // Default to 500 days ago
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() - 500);
  const formattedDefault = defaultDate.toISOString().split('T')[0];

  const [partner1, setPartner1] = useState('Alex');
  const [partner2, setPartner2] = useState('Taylor');
  const [startDate, setStartDate] = useState(formattedDefault);
  const [copied, setCopied] = useState(false);

  const start = new Date(startDate);
  const today = new Date();
  const isValid = !isNaN(start.getTime()) && start <= today;

  const diffTime = isValid ? Math.abs(today.getTime() - start.getTime()) : 0;
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Fun shared estimates
  const heartbeats = (totalDays * 100000).toLocaleString();
  const sleepHours = (totalDays * 8).toLocaleString();
  const estimatedMeals = (totalDays * 3).toLocaleString();

  // Milestone list
  const milestoneDays = [100, 500, 1000, 2000, 3000, 5000, 10000];
  const milestones = milestoneDays.map((m) => {
    const milestoneDate = new Date(start);
    milestoneDate.setDate(milestoneDate.getDate() + m);
    const reached = totalDays >= m;
    const daysLeft = m - totalDays;
    return {
      days: m,
      dateStr: milestoneDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      reached,
      daysLeft: daysLeft > 0 ? daysLeft : 0,
      progress: Math.min(100, Math.round((totalDays / m) * 100)),
    };
  });

  const nextMilestone = milestones.find((m) => !m.reached) || milestones[milestones.length - 1];

  const handleCopy = async () => {
    const text = `💖 ${partner1} & ${partner2} have been together for ${totalDays.toLocaleString()} continuous days!\n❤️ Approx ${heartbeats} heartbeats shared\n🎯 Next Milestone: ${nextMilestone.days} Days in ${nextMilestone.daysLeft} days (${nextMilestone.dateStr})\nCalculate your days together: https://lovescoretest.com/#/tool/days-together-counter`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerShare = () => {
    onShare({
      title: `${partner1} & ${partner2} - ${totalDays.toLocaleString()} Days Together!`,
      text: `We have been together for ${totalDays.toLocaleString()} days! Calculate your couple days on LoveScoreTest.com!`,
      url: 'https://lovescoretest.com/#/tool/days-together-counter',
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 p-6 md:p-8 shadow-xl shadow-rose-500/5 relative overflow-hidden">
        {/* Input Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={partner1}
              onChange={(e) => setPartner1(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Partner Name
            </label>
            <input
              type="text"
              value={partner2}
              onChange={(e) => setPartner2(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              The Day You Started Dating
            </label>
            <input
              type="date"
              value={startDate}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {isValid ? (
          <div className="space-y-6">
            {/* Big Days Badge */}
            <div className="text-center p-6 md:p-8 rounded-3xl bg-gradient-to-tr from-rose-500/10 via-pink-500/10 to-purple-500/10 border border-rose-200/70 dark:border-rose-900/40">
              <span className="inline-block px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-bold mb-2">
                Our Love Journey
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
                {partner1} <span className="text-rose-500">♡</span> {partner2}
              </h2>

              <div className="my-4">
                <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {totalDays.toLocaleString()}
                </span>
                <span className="block text-xs uppercase font-bold tracking-widest text-rose-500 mt-1">
                  Continuous Days of Love
                </span>
              </div>

              {/* Next Milestone mini banner */}
              <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-rose-100 dark:border-rose-900/40 max-w-sm mx-auto text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Next: {nextMilestone.days} Days</span>
                </span>
                <span className="font-bold text-rose-600 dark:text-rose-400">
                  {nextMilestone.daysLeft} days to go ({nextMilestone.dateStr})
                </span>
              </div>
            </div>

            {/* Fun Shared Life Stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
                <span className="text-lg block mb-0.5">💓</span>
                <span className="text-base font-black text-rose-600 dark:text-rose-400 block">{heartbeats}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Shared Heartbeats</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
                <span className="text-lg block mb-0.5">🌙</span>
                <span className="text-base font-black text-purple-600 dark:text-purple-400 block">{sleepHours}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Hours of Sweet Dreams</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
                <span className="text-lg block mb-0.5">☕</span>
                <span className="text-base font-black text-amber-600 dark:text-amber-400 block">{estimatedMeals}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Meals & Coffee Dates</span>
              </div>
            </div>

            {/* Milestone Roadmap */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-rose-500" /> Couple Days Milestones:
              </h4>
              <div className="space-y-2">
                {milestones.map((m) => (
                  <div
                    key={m.days}
                    className={`p-3 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                      m.reached
                        ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 text-slate-800 dark:text-slate-100'
                        : 'bg-slate-50/40 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800 text-slate-500 opacity-75'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{m.reached ? '🎉' : '⏳'}</span>
                      <div>
                        <span className="font-bold block">{m.days.toLocaleString()} Days Milestone</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{m.dateStr}</span>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        m.reached
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {m.reached ? 'Celebrated ✓' : `${m.daysLeft} days left`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={triggerShare}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-rose-500/20 hover:opacity-95 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Days Counter</span>
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
        ) : (
          <div className="p-6 text-center text-slate-500 text-sm">
            Please pick a valid start date!
          </div>
        )}
      </div>
    </div>
  );
};
