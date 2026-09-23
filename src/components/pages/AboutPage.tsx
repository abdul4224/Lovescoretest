import React from 'react';
import { Heart, Shield, Sparkles, Users, Award, Smile } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Heart className="w-3.5 h-3.5 fill-pink-500" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          About <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">LoveScoreTest</span>
        </h1>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed">
          The internet’s premier free destination for romantic compatibility tests, couple games, relationship milestones, and heartfelt intimacy builders.
        </p>
      </div>

      <div className="space-y-8 text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-pink-500" />
            Why We Built LoveScoreTest.com
          </h2>
          <p className="mb-4">
            Love, attraction, and friendship are the most profound aspects of the human experience. Yet so many online love tests and relationship quizzes are cluttered with aggressive paywalls, mandatory logins, annoying popups, or invasive questionnaires that harvest your private personal data.
          </p>
          <p>
            We created <strong>LoveScoreTest.com</strong> to change that. Our mission is to provide <strong>100% free, private, client-side tools</strong> that empower couples, best friends, and crush-holders to explore their connections, spark meaningful conversations, and celebrate everyday love.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">100% Private</h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              All quiz calculations and name match algorithms run directly in your web browser. We never store, log, or sell your private names or responses.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Always Free</h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every single tool—from our Love Calculator to Gary Chapman-inspired Love Language quizzes—is free for everyone forever without hidden fees.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mb-4">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Real Connection</h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Our tools are designed as conversation starters. They help couples laugh, reflect, reminisce, and deepen their emotional intimacy.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-pink-50/70 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/40 p-6 md:p-8">
          <h3 className="text-lg font-bold text-pink-900 dark:text-pink-200 mb-2">
            A Playful Philosophy
          </h3>
          <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            While many of our quizzes (such as Love Languages and Couple Compatibility) are based on proven psychological communication models, our name-based calculators are created for playful entertainment and joy. A low score on a name calculator never overrides the true love, patience, and loyalty you build together in real life!
          </p>
        </div>
      </div>
    </div>
  );
};
