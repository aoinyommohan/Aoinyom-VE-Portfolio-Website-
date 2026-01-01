import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface Testimonial {
  content: string;
  author: string;
  image: string;
  link?: string;
  platform?: 'YouTube' | 'Instagram' | 'TikTok' | 'Website';
  result?: string;
  featured?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
}