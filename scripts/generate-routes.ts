import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL_TOOLS } from '../src/data/toolsData';
import { getToolSeoConfig } from '../src/data/toolsSeoData';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distIndexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(distIndexHtmlPath)) {
  console.error('Error: dist/index.html does not exist. Run "vite build" first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(distIndexHtmlPath, 'utf8');

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function replaceMeta(html: string, seo: {
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}, jsonLdBlocks: object[]): string {
  let result = html;

  // Title
  result = result.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(seo.title)}</title>`);

  // Meta Description
  result = result.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/s,
    `<meta name="description" content="${escapeHtml(seo.metaDescription)}" />`
  );

  // Canonical Link
  result = result.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/s,
    `<link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />`
  );

  // Open Graph Title
  result = result.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:title" content="${escapeHtml(seo.ogTitle)}" />`
  );

  // Open Graph Description
  result = result.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:description" content="${escapeHtml(seo.ogDescription)}" />`
  );

  // Open Graph URL
  result = result.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:url" content="${escapeHtml(seo.canonicalUrl)}" />`
  );

  // Twitter Title
  result = result.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/s,
    `<meta name="twitter:title" content="${escapeHtml(seo.twitterTitle)}" />`
  );

  // Twitter Description
  result = result.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/s,
    `<meta name="twitter:description" content="${escapeHtml(seo.twitterDescription)}" />`
  );

  // Replace default JSON-LD block with tool-specific structured data
  const jsonLdMarkup = jsonLdBlocks
    .map(block => `    <script type="application/ld+json">\n${JSON.stringify(block, null, 2)}\n    </script>`)
    .join('\n');

  result = result.replace(
    /<script\s+type="application\/ld\+json">.*?<\/script>/s,
    jsonLdMarkup
  );

  return result;
}

// 1. Generate Static Tool Routes
const distToolDir = path.join(distDir, 'tool');
if (!fs.existsSync(distToolDir)) {
  fs.mkdirSync(distToolDir, { recursive: true });
}

let generatedCount = 0;

for (const tool of ALL_TOOLS) {
  const seo = getToolSeoConfig(tool.slug);

  const breadcrumbListSchema = {
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
  };

  const webAppSchema = {
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
  };

  const jsonLdBlocks: object[] = [breadcrumbListSchema, webAppSchema];

  if (tool.faqs && tool.faqs.length > 0) {
    jsonLdBlocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': tool.faqs.map(f => ({
        '@type': 'Question',
        'name': f.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.answer
        }
      }))
    });
  }

  const toolHtml = replaceMeta(templateHtml, seo, jsonLdBlocks);

  const toolDir = path.join(distToolDir, tool.slug);
  if (!fs.existsSync(toolDir)) {
    fs.mkdirSync(toolDir, { recursive: true });
  }

  fs.writeFileSync(path.join(toolDir, 'index.html'), toolHtml, 'utf8');
  generatedCount++;
}

console.log(`✓ Generated ${generatedCount} static tool routes in dist/tool/<slug>/index.html`);

// 2. Generate Static Catalog Route
const distCatalogDir = path.join(distDir, 'catalog');
if (!fs.existsSync(distCatalogDir)) {
  fs.mkdirSync(distCatalogDir, { recursive: true });
}

const catalogSeo = {
  title: 'All 100 Love, Compatibility & Relationship Tools | LoveScoreTest Catalog',
  metaDescription: 'Explore our complete directory of 100 relationship calculators, compatibility quizzes, love tests, and couple games.',
  canonicalUrl: 'https://lovescoretest.com/catalog',
  ogTitle: 'All 100 Love, Compatibility & Relationship Tools | LoveScoreTest Catalog',
  ogDescription: 'Explore our complete directory of 100 relationship calculators, compatibility quizzes, love tests, and couple games.',
  twitterTitle: 'All 100 Love, Compatibility & Relationship Tools | LoveScoreTest Catalog',
  twitterDescription: 'Explore our complete directory of 100 relationship calculators, compatibility quizzes, love tests, and couple games.',
};

const catalogSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'LoveScoreTest Tools Catalog',
    'url': 'https://lovescoretest.com/catalog',
    'description': 'Directory of 100 relationship calculators, love compatibility tests, and couples quizzes.'
  }
];

const catalogHtml = replaceMeta(templateHtml, catalogSeo, catalogSchema);
fs.writeFileSync(path.join(distCatalogDir, 'index.html'), catalogHtml, 'utf8');
console.log('✓ Generated static catalog route in dist/catalog/index.html');
