import fs from 'fs';
import path from 'path';
import { ALL_TOOLS } from '../src/data/toolsData';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
}

const today = '2026-09-25';

const sitemapEntries: SitemapEntry[] = [
  // 1. Homepage
  {
    loc: 'https://lovescoretest.com/',
    lastmod: today,
    changefreq: 'daily',
    priority: '1.0'
  },
  // 2. Catalog Hub
  {
    loc: 'https://lovescoretest.com/catalog',
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.9'
  },

  // 3. Static Pages (4)
  {
    loc: 'https://lovescoretest.com/about.html',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.6'
  },
  {
    loc: 'https://lovescoretest.com/contact.html',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.5'
  },
  {
    loc: 'https://lovescoretest.com/privacy-policy.html',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.4'
  },
  {
    loc: 'https://lovescoretest.com/terms.html',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.4'
  },

  // 4. Static Guides & Articles (8)
  {
    loc: 'https://lovescoretest.com/does-zodiac-compatibility-matter.html',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    loc: 'https://lovescoretest.com/friendship-score.html',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    loc: 'https://lovescoretest.com/fun-compatibility-questions.html',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    loc: 'https://lovescoretest.com/love-calculator-by-birthdate.html',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    loc: 'https://lovescoretest.com/relationship-days-calculator.html',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    loc: 'https://lovescoretest.com/ship-name-generator.html',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    loc: 'https://lovescoretest.com/what-does-compatibility-percentage-mean.html',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    loc: 'https://lovescoretest.com/zodiac-compatibility.html',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7'
  }
];

// 5. All 100 Individual Tool URLs
for (const tool of ALL_TOOLS) {
  sitemapEntries.push({
    loc: `https://lovescoretest.com/tool/${tool.slug}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: tool.badge === 'Popular' || tool.badge === 'Top Pick' ? '0.9' : '0.85'
  });
}

console.log(`Total URLs in sitemap: ${sitemapEntries.length}`);

// Verification
if (sitemapEntries.length !== 114) {
  console.error(`Expected 114 URLs, but got ${sitemapEntries.length}`);
  process.exit(1);
}

// Ensure no hashes and no 404
for (const entry of sitemapEntries) {
  if (entry.loc.includes('#')) {
    console.error(`Sitemap contains hash URL: ${entry.loc}`);
    process.exit(1);
  }
  if (entry.loc.includes('404')) {
    console.error(`Sitemap contains 404 URL: ${entry.loc}`);
    process.exit(1);
  }
}

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const rootPath = path.resolve(process.cwd(), 'sitemap.xml');
const publicPath = path.resolve(process.cwd(), 'public/sitemap.xml');

fs.writeFileSync(rootPath, xmlContent, 'utf-8');
fs.writeFileSync(publicPath, xmlContent, 'utf-8');

console.log('Successfully wrote 114 URLs to sitemap.xml and public/sitemap.xml!');
