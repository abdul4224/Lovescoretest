import React from 'react';
import { FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Terms & Conditions</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2">
          Effective Date: March 2026 • LoveScoreTest.com
        </p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 md:p-10 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed">
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-amber-900 dark:text-amber-200">
            <strong>Entertainment & Educational Disclaimer:</strong> All tools, tests, calculators, and compatibility quizzes provided on LoveScoreTest.com are designed strictly for recreational entertainment, romantic fun, and self-reflection. They do not constitute certified psychological, clinical, legal, or licensed marital therapy advice.
          </p>
        </div>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using LoveScoreTest.com, you agree to be bound by these Terms of Service. If you do not agree with any portion of these terms, please discontinue using the website.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
            2. Permitted Use
          </h2>
          <p>
            You are granted a free, revocable, non-exclusive license to use our tools for personal, non-commercial entertainment and reflection. You may freely share your results on social platforms. Automated scraping, bulk extraction, or attempting to reverse-engineer proprietary algorithms without permission is prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
            3. Limitation of Liability
          </h2>
          <p>
            LoveScoreTest.com and its operators shall not be held liable for any decisions made in personal relationships based on calculated scores, quiz outcomes, or astrological interpretations. Real human relationships are complex, and algorithms are playful tools to inspire communication, not life verdicts.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
            4. Modifications
          </h2>
          <p>
            We reserve the right to modify or replace these terms at any time. Changes become effective immediately upon posting to this page.
          </p>
        </section>
      </div>
    </div>
  );
};
