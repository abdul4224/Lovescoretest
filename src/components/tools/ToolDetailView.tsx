import React, { useEffect } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { ToolItem, ShareData } from '../../types';
import { ALL_TOOLS } from '../../data/toolsData';
import { getToolSeoConfig } from '../../data/toolsSeoData';
import { AdsterraSlot } from '../AdsterraSlot';
import { FAQAccordion } from '../FAQAccordion';

// 10 Interactive Tool Components
import { LoveCalculatorTool } from './LoveCalculatorTool';
import { LoveCompatibilityTool } from './LoveCompatibilityTool';
import { FriendshipCompatibilityTool } from './FriendshipCompatibilityTool';
import { CoupleCompatibilityQuizTool } from './CoupleCompatibilityQuizTool';
import { LoveLanguageTestTool } from './LoveLanguageTestTool';
import { LoveLanguageCompatibilityTool } from './LoveLanguageCompatibilityTool';
import { PartnerKnowledgeQuizTool } from './PartnerKnowledgeQuizTool';
import { WhoIsMoreLikelyTool } from './WhoIsMoreLikelyTool';
import { RelationshipDurationTool } from './RelationshipDurationTool';
import { DaysTogetherTool } from './DaysTogetherTool';
import { FunctionalToolEngine } from './FunctionalToolEngine';

interface ToolDetailViewProps {
  tool: ToolItem;
  onNavigate: (route: string) => void;
  onShare: (data: ShareData) => void;
}

export const ToolDetailView: React.FC<ToolDetailViewProps> = ({
  tool,
  onNavigate,
  onShare,
}) => {
  const seo = getToolSeoConfig(tool.slug);

  // Synchronize document title, meta tags, and structured data for tool-specific SEO
  useEffect(() => {
    // 1. Page Title
    document.title = seo.title;

    // Helper to safely set or create meta tag
    const setMetaTag = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to safely set or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute(rel, rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // 2. Standard Meta & Canonical
    setMetaTag('name', 'description', seo.metaDescription);
    setLinkTag('canonical', seo.canonicalUrl);

    // 3. Open Graph
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:title', seo.ogTitle);
    setMetaTag('property', 'og:description', seo.ogDescription);
    setMetaTag('property', 'og:url', seo.canonicalUrl);
    setMetaTag('property', 'og:site_name', 'LoveScoreTest');

    // 4. Twitter / X Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', seo.twitterTitle);
    setMetaTag('name', 'twitter:description', seo.twitterDescription);

    // 5. Schema.org Structured Data (JSON-LD)
    const existingScripts = document.querySelectorAll('script[data-tool-seo="true"]');
    existingScripts.forEach((s) => s.remove());

    const injectJsonLd = (id: string, data: object) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-tool-seo', 'true');
      script.id = id;
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    // BreadcrumbList Structured Data
    injectJsonLd('tool-schema-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://lovescoretest.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': tool.category,
          'item': `https://lovescoretest.com/catalog?category=${encodeURIComponent(tool.category)}`
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': tool.title,
          'item': seo.canonicalUrl
        }
      ]
    });

    // WebApplication Structured Data
    injectJsonLd('tool-schema-webapp', {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': tool.title,
      'url': seo.canonicalUrl,
      'applicationCategory': 'LifestyleApplication',
      'operatingSystem': 'All',
      'description': seo.metaDescription,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    });

    // FAQPage Structured Data (Only injected when FAQs exist on the visible page)
    if (tool.faqs && tool.faqs.length > 0) {
      injectJsonLd('tool-schema-faq', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': tool.faqs.map((f) => ({
          '@type': 'Question',
          'name': f.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.answer
          }
        }))
      });
    }

    return () => {
      const scripts = document.querySelectorAll('script[data-tool-seo="true"]');
      scripts.forEach((s) => s.remove());
    };
  }, [tool, seo]);

  // Find 4 related tools in the same category or phase
  const relatedTools = ALL_TOOLS.filter(
    (t) => t.id !== tool.id && (t.category === tool.category || t.phase === tool.phase)
  ).slice(0, 4);

  // Render the respective interactive tool
  const renderInteractiveTool = () => {
    switch (tool.slug) {
      case 'love-calculator':
        return <LoveCalculatorTool onShare={onShare} />;
      case 'love-compatibility-test':
        return <LoveCompatibilityTool onShare={onShare} />;
      case 'friendship-compatibility-test':
        return <FriendshipCompatibilityTool onShare={onShare} />;
      case 'couple-compatibility-quiz':
        return <CoupleCompatibilityQuizTool onShare={onShare} />;
      case 'love-language-test':
        return <LoveLanguageTestTool onShare={onShare} />;
      case 'love-language-compatibility':
        return <LoveLanguageCompatibilityTool onShare={onShare} />;
      case 'how-well-do-you-know-your-partner':
        return <PartnerKnowledgeQuizTool onShare={onShare} />;
      case 'who-is-more-likely-couples':
      case 'who-is-more-likely-to':
        return <WhoIsMoreLikelyTool onShare={onShare} />;
      case 'relationship-duration-calculator':
        return <RelationshipDurationTool onShare={onShare} />;
      case 'days-together-calculator':
      case 'days-together-counter':
        return <DaysTogetherTool onShare={onShare} />;
      default:
        return <FunctionalToolEngine tool={tool} onShare={onShare} />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Crawlable Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 flex-wrap" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap">
          <li className="flex items-center gap-2">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </li>
          <li className="flex items-center gap-2">
            <a
              href={`/catalog?category=${encodeURIComponent(tool.category)}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`catalog?category=${encodeURIComponent(tool.category)}`);
              }}
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              {tool.category}
            </a>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </li>
          <li className="flex items-center">
            <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[240px]" aria-current="page">
              {tool.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* Header section with Unique H1 */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 text-xs font-bold mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{tool.category} • 100% Free & Private</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {seo.h1}
        </h1>

        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 mt-3 max-w-2xl mx-auto leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Adsterra Top Slot */}
      <AdsterraSlot slot="tool_top" className="mb-8" />

      {/* Interactive Tool Area */}
      <div className="my-8">
        {renderInteractiveTool()}
      </div>

      {/* Adsterra Bottom Slot */}
      <AdsterraSlot slot="tool_bottom" className="my-10" />

      {/* Deep SEO & Educational Content Section */}
      <div className="my-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-10 shadow-sm space-y-8 text-slate-700 dark:text-slate-200 leading-relaxed text-sm md:text-base">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            About the {tool.title}
          </h2>
          <p className="leading-relaxed">
            {tool.overview}
          </p>
        </div>

        {/* Instructions */}
        {tool.instructions && tool.instructions.length > 0 && (
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              How to Use This Tool
            </h3>
            <ol className="space-y-2.5 list-decimal list-inside pl-1 text-slate-700 dark:text-slate-300">
              {tool.instructions.map((inst, idx) => (
                <li key={idx} className="leading-relaxed">
                  {inst}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* FAQs */}
        {tool.faqs && tool.faqs.length > 0 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <FAQAccordion
              faqs={tool.faqs}
              title={`Frequently Asked Questions about ${tool.title}`}
              subtitle="Everything you need to know about test accuracy, methodology, and privacy."
            />
          </div>
        )}
      </div>

      {/* Crawlable Related Tools Section */}
      {relatedTools.length > 0 && (
        <div className="my-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                Related Couple & Love Tools
              </h3>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Explore more relationship calculators and intimacy quizzes
              </p>
            </div>
            <a
              href="/catalog"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('catalog');
              }}
              className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1"
            >
              <span>View All 100</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((rel) => (
              <a
                key={rel.id}
                href={`/tool/${rel.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`tool/${rel.slug}`);
                }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-pink-300 dark:hover:border-pink-600 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-pink-500 mb-2">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors line-clamp-1">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {rel.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-pink-600 dark:text-pink-400">
                  <span>{rel.isAvailable ? 'Try Tool Free' : 'Coming Soon'}</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


