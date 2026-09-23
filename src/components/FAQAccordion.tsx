import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Find clear answers about how our tools work, privacy, accuracy, and sharing.',
}) => {
  // Keep first item open by default for immediate preview visibility
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggle = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="w-full my-8">
      <div className="mb-6 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
          <span>Got Questions?</span>
        </div>
        <h2 id="faq-heading" className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 mt-1 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndices.includes(idx);
          const questionId = `faq-q-${idx}`;
          const answerId = `faq-a-${idx}`;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm transition-colors"
            >
              <button
                type="button"
                id={questionId}
                aria-controls={answerId}
                aria-expanded={isOpen}
                onClick={() => toggle(idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white pr-2">
                  {faq.question}
                </span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? 'bg-pink-600 text-white rotate-180'
                      : 'bg-pink-50 dark:bg-slate-800 text-pink-600 dark:text-pink-400'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className="px-5 pb-5 pt-2 text-sm md:text-base text-slate-700 dark:text-slate-200 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 leading-relaxed"
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
