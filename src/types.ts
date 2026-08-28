export interface PhotoSlide {
  id: string;
  url: string;
  caption: string;
  dateOrPlace?: string;
  tag?: string;
}

export interface LoveMessage {
  id: string;
  title: string;
  content: string;
  quote?: string;
  category: 'romantic' | 'emotional' | 'gratitude' | 'poetry';
}

export interface LoveReason {
  id: string;
  title: string;
  description: string;
  iconName: string;
  bengaliTitle: string;
  bengaliDesc: string;
}

export interface SurpriseGift {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  description: string;
}

export interface CelebrationSettings {
  wifeName: string;
  wifeNickname: string;
  husbandName: string;
  birthDate: string;
  relationshipStartDate?: string;
  theme: 'rose' | 'lavender' | 'golden' | 'cherry';
  bgMusicEnabled: boolean;
  slideshowSpeed: number; // in seconds
  customLetter: string;
  loveLetterSalutation: string;
  loveLetterClosing: string;
}
