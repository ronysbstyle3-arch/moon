import { CelebrationSettings, LoveMessage, LoveReason, PhotoSlide, SurpriseGift } from '../types';

export const DEFAULT_PHOTOS: PhotoSlide[] = [
  {
    id: 'photo-1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    caption: 'তোমার সেই মিষ্টি হাসি, যা আমার প্রতিটি দিনকে আলোকিত করে।',
    dateOrPlace: 'আমাদের প্রিয় স্মৃতি',
    tag: 'সৌন্দর্য'
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
    caption: 'তোমার চোখের গভীরে আমি আমার আস্ত একটা পৃথিবী খুঁজে পাই।',
    dateOrPlace: 'একাকী বিকেল',
    tag: 'ভালোবাসা'
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop',
    caption: 'তোমার সাথে কাটানো প্রতিটি মুহূর্ত যেন জীবনের শ্রেষ্ঠ উপহার।',
    dateOrPlace: 'ভ্রমণের আনন্দ',
    tag: 'স্মৃতি'
  },
  {
    id: 'photo-4',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop',
    caption: 'শুভ জন্মদিন আমার অর্ধাঙ্গিনী, আমার জীবনের সবচেয়ে মিষ্টি সুখ।',
    dateOrPlace: 'বিশেষ দিন',
    tag: 'শুভ জন্মদিন'
  },
  {
    id: 'photo-5',
    url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200&auto=format&fit=crop',
    caption: 'তুমি শুধু আমার স্ত্রী নও, আমার সবচেয়ে বিশ্বস্ত বন্ধু ও অনুপ্রেরণা।',
    dateOrPlace: 'চিরন্তন বন্ধন',
    tag: 'চিরসাথী'
  }
];

export const DEFAULT_MESSAGES: LoveMessage[] = [
  {
    id: 'msg-1',
    title: 'আমার জীবনের সেরা উপহার',
    category: 'romantic',
    content: 'আজকের এই বিশেষ দিনে সৃষ্টিকর্তার কাছে একটাই কৃতজ্ঞতা—তিনি তোমাকে আমার জীবনে পাঠিয়েছেন। তোমার ভালোবাসায় আমার পুরো পৃথিবী পূর্ণ। শুভ জন্মদিন আমার প্রিয়তমা বউ!',
    quote: 'তুমি আমার জীবনের সবচেয়ে মধুর কবিতা, যার প্রতিটি ছন্দ শুধুই ভালোবাসায় ভরা।'
  },
  {
    id: 'msg-2',
    title: 'হৃদয়ের গভীর থেকে শুভেচ্ছা',
    category: 'emotional',
    content: 'তুমি আসার পর আমার সাধারণ জীবনটাও অসাধারণ হয়ে উঠেছে। তোমার হাসি আমার ক্লান্তি দূর করে, তোমার পাশে থাকা আমাকে সব বিপদ থেকে রক্ষা করার শক্তি দেয়। শুভ জন্মদিন আমার জান!',
    quote: 'যতবার তোমাকে দেখি, ততবার নতুন করে তোমার প্রেমে পড়ি।'
  },
  {
    id: 'msg-3',
    title: 'চিরকালের ভালোবাসা ও প্রতিশ্রুতি',
    category: 'gratitude',
    content: 'জীবনের প্রতিটি বসন্তে, প্রতিটি শীতে আর প্রতিটি বৃষ্টিতে আমি তোমার হাত ধরে এভাবেই এগিয়ে যেতে চাই। তোমার সব স্বপ্ন যেন সত্যি হয়, এই আমার প্রার্থনা।',
    quote: 'হাতে হাত রেখে আজীবন তোমার সাথে কাটানোর এই যাত্রা আমার জীবনের পরম পাওয়া।'
  },
  {
    id: 'msg-4',
    title: 'রবীন্দ্রনাথের সুরে প্রেমের অঞ্জলি',
    category: 'poetry',
    content: '“তোমারে পেয়েছি আমি হৃদয়ের মাঝে, আর কিছু নাহি চাই এ ভুবন মাঝে।” তোমার এই জন্মদিনে আমার সব ভালোবাসা শুধু তোমার জন্যই নিবেদিত।',
    quote: 'তুমি আছো তাই পৃথিবীটা এত সুন্দর লাগে।'
  }
];

export const DEFAULT_REASONS: LoveReason[] = [
  {
    id: 'reason-1',
    title: 'Your Caring Heart',
    bengaliTitle: 'তোমার অপরিসীম যত্ন',
    description: 'The way you take care of every little thing in our home and in my life.',
    bengaliDesc: 'যেভাবে তুমি নিঃস্বার্থভাবে আমার এবং আমাদের সংসারের প্রতিটি ছোটখাটো বিষয়ে খেয়াল রাখো।',
    iconName: 'HeartHandshake'
  },
  {
    id: 'reason-2',
    title: 'That Magical Smile',
    bengaliTitle: 'তোমার মিষ্টি হাসিমুখ',
    description: 'Your smile instantly brightens even the most exhausting days.',
    bengaliDesc: 'সারাদিনের হাজারো ক্লান্তির পর তোমার একটা হাসিমুখ দেখলে সব কষ্ট নিমেষেই উধাও হয়ে যায়।',
    iconName: 'Sparkles'
  },
  {
    id: 'reason-3',
    title: 'My Best Friend & Confidante',
    bengaliTitle: 'আমার সবচেয়ে ভালো বন্ধু',
    description: 'I can share any secret, dream, and silly thought with you without fear.',
    bengaliDesc: 'যার কাছে কোনো দ্বিধা ছাড়াই মনের সব কথা, স্বপ্ন আর পাগলামি অনায়াসে খুলে বলা যায়।',
    iconName: 'Smile'
  },
  {
    id: 'reason-4',
    title: 'Your Delicious Cooking & Love',
    bengaliTitle: 'ভালোবাসা মাখা হাতের রান্না',
    description: 'Every meal you cook with love warms my soul completely.',
    bengaliDesc: 'তোমার ভালোবেসে তৈরি করা খাবার আর আন্তরিকতা যা আমাদের ঘরকে স্বর্গ করে তুলেছে।',
    iconName: 'Utensils'
  },
  {
    id: 'reason-5',
    title: 'Unconditional Support',
    bengaliTitle: 'সব পরিস্থিতিতে অটল পাশে থাকা',
    description: 'In every high and low, you are my solid rock and inspiration.',
    bengaliDesc: 'জীবনের প্রতিটি ভালো-মন্দ পরিস্থিতিতে তুমি যেভাবে সাহস জুগিয়ে পাশে থাকো।',
    iconName: 'ShieldCheck'
  },
  {
    id: 'reason-6',
    title: 'The Queen of My Heart',
    bengaliTitle: 'আমার হৃদয়ের একমাত্র রানী',
    description: 'Simply being you—pure, beautiful inside and out, and forever mine.',
    bengaliDesc: 'তুমি যেমন, ঠিক তেমনই অনন্য ও অপূর্ব। তুমি শুধুই আমার!',
    iconName: 'Crown'
  }
];

export const DEFAULT_SURPRISE_GIFTS: SurpriseGift[] = [
  {
    id: 'gift-1',
    title: 'রোমান্টিক ক্যান্ডেললাইট ডিনার',
    subtitle: 'তোমার পছন্দের রেস্তোরাঁয় বিশেষ আয়োজন',
    badge: 'স্পেশাল ডেট',
    icon: 'Wine',
    description: 'আজকের রাতটি শুধুই আমাদের দুজনের জন্য। নরম মোমবাতির আলো আর মৃদু সংগীতে উদযাপিত হবে তোমার জন্মদিন।'
  },
  {
    id: 'gift-2',
    title: 'আনলিমিটেড শপিং ভাউচার',
    subtitle: 'তোমার মনের মতো কেনাকাটা করার উপহার',
    badge: 'শপিং স্প্রি',
    icon: 'ShoppingBag',
    description: 'যা কিছু তোমার পছন্দ, আজ কোনো বাধা নেই! তোমার মুখে অমূল্য হাসি ফোটানোই আমার আসল আনন্দ।'
  },
  {
    id: 'gift-3',
    title: 'একটি স্বপ্নের সারপ্রাইজ ট্রিপ',
    subtitle: 'মনোরম পাহাড়ে বা সমুদ্রের তীরে ছুটির দিন',
    badge: 'ভ্রমণ কুপন',
    icon: 'Compass',
    description: 'চলো দৈনন্দিন ব্যস্ততা ভুলে একসাথে ঘুরে আসি কোনো স্নিগ্ধ প্রাকৃতিক সুন্দর জায়গায়।'
  },
  {
    id: 'gift-4',
    title: 'সারাজীবন ভালোবাসার প্রতিশ্রুতি',
    subtitle: 'প্রতিটি পদক্ষেপে তোমার পাশে থাকার শপথ',
    badge: 'চিরন্তন উপহার',
    icon: 'Heart',
    description: 'এই উপহারের কোনো মেয়াদ নেই। আজীবন তোমায় আগলে রাখা, যত্ন নেওয়া আর হৃদয় উজাড় করে ভালোবাসার প্রতিশ্রুতি।'
  }
];

export const DEFAULT_SETTINGS: CelebrationSettings = {
  wifeName: 'আমার প্রিয়তমা',
  wifeNickname: 'জানপাখি',
  husbandName: 'তোমার বর',
  birthDate: new Date().toISOString().split('T')[0],
  relationshipStartDate: '2021-02-14',
  theme: 'rose',
  bgMusicEnabled: false,
  slideshowSpeed: 4,
  loveLetterSalutation: 'আমার ভালোবাসার মানুষ,',
  customLetter: `আজকের এই স্নিগ্ধ শুভ জন্মদিনে তোমাকে জানাই আমার হৃদয়ের সবটুকু ভালোবাসা। 

তোমার আগমনে আমার পুরো পৃথিবীটাই নতুন রঙে সেজে উঠেছিল। তোমার মায়াবী চোখ, মিষ্টি হাসি আর নির্মল ভালোবাসা আমাকে প্রতিদিন একজন সুখী মানুষ করে রাখে। সংসারের প্রতিটি পদক্ষেপে তুমি যেভাবে পাশে থাকো, তা সত্যিই সৃষ্টিকর্তার এক অপরূপ আশীর্বাদ।

আজ তোমার জন্মদিনে আমার একমাত্র প্রার্থনা—তুমি যেন সর্বদা সুস্থ, হাসিখুশি ও শান্তিতে থাকো। তোমার চোখের কোণে যেন কখনো একফোঁটা দুঃখের জল না আসে। 

শুভ জন্মদিন আমার অর্ধাঙ্গিনী! ভালোবাসি তোমায় অনন্তকাল ধরে।`,
  loveLetterClosing: 'চিরকাল তোমার ভালোবাসায় আবদ্ধ,\nতোমার জীবনসঙ্গী'
};
