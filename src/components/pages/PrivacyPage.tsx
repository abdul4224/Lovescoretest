import React from 'react';
import { Shield, Lock, EyeOff, ServerOff, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>Your Privacy is Sacred</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2">
          Last Updated: March 2026 • LoveScoreTest.com
        </p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 md:p-10 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed">
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-emerald-900 dark:text-emerald-200">
            <strong>The TL;DR:</strong> We do NOT collect, store, transmit, or sell your names, quiz answers, anniversary dates, or relationship test results. All calculations execute locally on your own computer or phone inside your browser.
          </p>
        </div>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <ServerOff className="w-5 h-5 text-pink-500" />
            1. Client-Side Processing Guarantee
          </h2>
          <p>
            When you enter your name, your partner’s name, birth dates, or answers to any of our quizzes, those inputs never travel over the internet to our servers. All computational algorithms run in real-time via modern JavaScript directly in your browser session. Once you close or refresh the page, any transient form data is gone.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-500" />
            2. Social Sharing & URL Privacy
          </h2>
          <p>
            When you choose to share your quiz or calculator results with your partner or friends, LoveScoreTest.com generates a clean shareable message. We intentionally do not embed sensitive personal identity details in public URL parameters, guaranteeing your private relationship milestones remain safe and under your control.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-blue-500" />
            3. Advertising & Analytics
          </h2>
          <p>
            To keep all 100 relationship tools free for everyone without subscriptions or paywalls, LoveScoreTest.com may display advertisements provided by reputable advertising partners (such as Adsterra or Google AdSense). These third-party ad networks may use standard cookies or web beacons to display context-relevant advertising. You can control or disable cookies at any time via your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
            4. Contact Us Regarding Privacy
          </h2>
          <p>
            If you have questions about our privacy practices, you can contact our data protection team at <strong>privacy@lovescoretest.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};
