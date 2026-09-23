export type ToolPhase = 1 | 2 | 3 | 4 | 5 | 6;

export type ToolCategory =
  | 'Love Tests'
  | 'Compatibility'
  | 'Couple Quizzes'
  | 'Love Languages'
  | 'Personality'
  | 'Couple Games'
  | 'Calculators';

export interface RawToolItem {
  id: string;
  name: string;
  number: number; // 1 to 100
  phase: ToolPhase;
  phaseName: string;
  category: ToolCategory;
  tagline: string;
  description: string;
  detailedOverview: string;
  howItWorks: string[];
  whatResultMeans: string;
  icon: string;
  isFunctional: boolean;
  badge?: 'Popular' | 'Trending' | 'Top Pick' | 'New' | 'Classic' | 'Favorite';
  tags: string[];
  faqs: { question: string; answer: string }[];
  entertainmentDisclaimer?: boolean;
}

export interface ToolItem extends RawToolItem {
  title: string;
  slug: string;
  isAvailable: boolean;
  overview: string;
  instructions: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface ShareData {
  title: string;
  text: string;
  url: string;
}
