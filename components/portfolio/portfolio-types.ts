export type PortfolioCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  _count?: {
    projects: number;
  };
};

export type PortfolioScreenshot = {
  id?: string;
  url: string;
  alt: string;
  order?: number;
};

export type PortfolioRecord = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  challenge?: string | null;
  solution?: string | null;
  impact?: string | null;
  year?: number | null;
  client?: string | null;
  category?: PortfolioCategory;
  categoryId?: string;
  coverImage?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  techStack: string[];
  featured?: boolean;
  published?: boolean;
  screenshots: PortfolioScreenshot[];
};
