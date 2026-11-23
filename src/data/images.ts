export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const images = {
  profile: {
    src: '/images/profile.jpg',
    alt: 'Portrait photo of Amadul Islam',
    width: 800,
    height: 800,
  },
  project1: {
    src: '/images/project1.svg',
    alt: 'MosquitoWatch — AI-powered mosquito surveillance and community health platform preview',
    width: 1280,
    height: 720,
  },
  project2: {
    src: '/images/project2.svg',
    alt: 'EasyCode — Gamified coding learning platform with AI support and 1v1 contests preview',
    width: 1280,
    height: 720,
  },
  project3: {
    src: '/images/project3.svg',
    alt: 'Niramoy — Multi-hospital management and symptom-based doctor finder platform preview',
    width: 1280,
    height: 720,
  },
  ogImage: {
    src: '/images/og-image.svg',
    alt: 'Amadul Islam — Developer Portfolio Open Graph preview',
    width: 1200,
    height: 630,
  },
  favicon: {
    src: '/images/favicon.svg',
    alt: 'Amadul Islam monogram icon',
    width: 64,
    height: 64,
  },
} as const satisfies Record<string, ImageAsset>;

export type ProjectImageKey = 'project1' | 'project2' | 'project3';
