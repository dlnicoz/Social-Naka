export interface User {
  id: string;
  name: string;
  profession: string;
  phone: string;
  location: string;
  description: string;
  profileUrl: string;
  theme: ThemeType;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export type ThemeType = 'minimal' | 'gradient' | 'neon' | 'retro';