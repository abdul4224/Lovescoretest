import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, Share2, Copy, Check, Heart, Trophy, Gift } from 'lucide-react';
import { ShareData } from '../../types';

interface RelationshipDurationToolProps {
  onShare: (data: ShareData) => void;
}

export const RelationshipDurationTool: React.FC<RelationshipDurationToolProps> = ({ onShare }) => {
  // Default to 1 year ago today
  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() - 1);
  const formattedDefault = defaultDate.toISOString().split('T')[0];

  const [partner1, setPartner1] = useState('Alex');
  const [partner2, setPartner2] = useState('Taylor');
  const [startDate, setStartDate] = useState(formattedDefault);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copied, setCopied] = useState(false);

  // Live tick every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const start = new Date(startDate);
  const isValidDate = !isNaN(start.getTime()) && start <= currentTime;

  // Calculate elapsed
  const diffMs = isValidDate ? currentTime.getTime() - start.getTime() : 0;
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);

  // Approximate breakdown
  let years = currentTime.getFullYear() - start.getFullYear();
  let months = currentTime.getMonth() - start.getMonth();
  let days = currentTime.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(currentTime.getFullYear(), currentTime.getMonth(), 0).getDate();
    days += prevMonthDays;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const hours = currentTime.getHours() - start.getHours() + (currentTime.getHours() < start.getHours() ? 24 : 0);
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  // Next Anniversary Countdown
  const nextAnniversary = new Date(start);
  nextAnniversary.setFullYear(currentTime.getFullYear());
  if (nextAnniversary < currentTime) {
    nextAnniversary.setFullYear(currentTime.getFullYear() + 1);
  }
  const nextDiffMs = nextAnniversary.getTime() - currentTime.getTime();
  const nextDays = Math.floor(nextDiffMs / (1000 * 60 * 60 * 24));
  const nextHours = Math.floor((nextDiffMs / (1000 * 60 * 60)) % 24);
  const nextMins = Math.floor((nextDiffMs / (1000 * 60)) % 60);
  const nextSecs = Math.floor((nextDiffMs / 1000) % 60);

  // Milestone Badges
  const milestones = [
    { label: '100 Days', days: 100, gift: 'First Chapter', unlocked: totalDays >= 100 },
    { label: '6 Months', days: 182, gift: 'Half-Year Milestone', unlocked: totalDays >= 182 },
    { label: '1 Year', days: 365, gift: 'Paper Anniversary', unlocked: totalDays >= 365 },
    { label: '2 Years', days: 730, gift: 'Cotton Anniversary', unlocked: totalDays >= 730 },
    { label: '3 Years', days: 1095, gift: 'Leather Anniversary', unlocked: totalDays >= 1095 },
    { label: '5 Years', days: 1825, gift: 'Wood Anniversary', unlocked: totalDays >= 1825 },
    { label: '10 Years', days: 3650, gift: 'Tin Anniversary', unlocked: totalDays >= 3650 },
    { label: '25 Years', days: 9125, gift: 'Silver Jubilee', unlocked: totalDays >= 9125 },
  ];

  const handleCopy = async () => {
    const text = `⏳ ${partner1} & ${partner2} Relationship Duration:\n${years} Years, ${months} Months, ${days} Days (${totalDays.toLocaleString()} continuous days together!)\nNext Anniversary in ${nextDays} days.\nCalculate your relationship duration: https://lovescoretest.com/#/tool/relationship-duration-calculator`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerShare = () => {
    onShare({
      title: `${partner1} & ${partner2} have been together for ${totalDays.toLocaleString()} days!`,
      text: `${years} Years, ${months} Months, ${days} Days in love! Track yours free on LoveScoreTest.com!`,
      url: 'https://lovescoretest.com/#/tool/relationship-duration-calculator',
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-pink-100 dark:border-slate-800 p-6 md:p-8 shadow-xl shadow-pink-500/5 relative overflow-hidden">
        {/* Setup inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Partner 1 Name
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
              Partner 2 Name
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
              Anniversary Date
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

        {isValidDate ? (
          <div className="space-y-6">
            {/* Big Counter Header */}
            <div className="text-center p-6 rounded-3xl bg-gradient-to-tr from-pink-500/10 via-rose-500/10 to-purple-500/10 border border-pink-200/60 dark:border-pink-900/40">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                Together in Love
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {partner1} <span className="text-pink-500">♡</span> {partner2}
              </h2>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 my-4">
                <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm">
                  <span className="text-2xl font-black text-pink-600 dark:text-pink-400 block">{years}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Years</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm">
                  <span className="text-2xl font-black text-rose-600 dark:text-rose-400 block">{months}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Months</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm">
                  <span className="text-2xl font-black text-purple-600 dark:text-purple-400 block">{days}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Days</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm">
                  <span className="text-2xl font-black text-slate-800 dark:text-slate-100 block">{hours}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Hours</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm">
                  <span className="text-2xl font-black text-slate-800 dark:text-slate-100 block">{minutes}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Mins</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-pink-200 dark:border-pink-900/60">
                  <span className="text-2xl font-black text-pink-500 block font-mono">{seconds}</span>
                  <span className="text-[11px] text-pink-500 font-semibold">Live Secs</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                That is <strong className="text-pink-600 dark:text-pink-400">{totalDays.toLocaleString()} continuous days</strong> ({totalWeeks.toLocaleString()} weeks or {totalHours.toLocaleString()} hours) of shared memories!
              </p>
            </div>

            {/* Next Anniversary Countdown */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Next Anniversary Countdown
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {nextAnniversary.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono font-bold text-sm text-slate-800 dark:text-slate-100">
                <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  {nextDays}d
                </span>
                <span>:</span>
                <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  {nextHours}h
                </span>
                <span>:</span>
                <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  {nextMins}m
                </span>
                <span>:</span>
                <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-pink-500">
                  {nextSecs}s
                </span>
              </div>
            </div>

            {/* Milestones Unlocked */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" /> Anniversary Milestones:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {milestones.map((m) => (
                  <div
                    key={m.label}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      m.unlocked
                        ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 text-slate-800 dark:text-slate-100'
                        : 'bg-slate-50/40 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800 text-slate-400 opacity-60'
                    }`}
                  >
                    <span className="text-base block mb-0.5">{m.unlocked ? '🏆' : '🔒'}</span>
                    <span className="text-xs font-bold block">{m.label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{m.gift}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={triggerShare}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 hover:opacity-95 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Duration</span>
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
            Please pick a valid start date that is in the past!
          </div>
        )}
      </div>
    </div>
  );
};
