import React, { useState, useEffect } from 'react';
import { 
  DEFAULT_PHOTOS, 
  DEFAULT_MESSAGES, 
  DEFAULT_REASONS, 
  DEFAULT_SURPRISE_GIFTS, 
  DEFAULT_SETTINGS 
} from './data/defaultContent';
import { CelebrationSettings, PhotoSlide } from './types';
import { Navbar } from './components/Navbar';
import { FloatingHearts } from './components/FloatingHearts';
import { HeroCelebration } from './components/HeroCelebration';
import { Slideshow } from './components/Slideshow';
import { BirthdayCake } from './components/BirthdayCake';
import { LoveLetter } from './components/LoveLetter';
import { LoveReasonsDeck } from './components/LoveReasonsDeck';
import { LoveCounter } from './components/LoveCounter';
import { GiftBoxSurprise } from './components/GiftBoxSurprise';
import { MessageGenerator } from './components/MessageGenerator';
import { SettingsModal } from './components/SettingsModal';
import { ShareModal } from './components/ShareModal';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  // Load saved settings & photos from localStorage or use defaults
  const [settings, setSettings] = useState<CelebrationSettings>(() => {
    try {
      const saved = localStorage.getItem('wife_bday_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [photos, setPhotos] = useState<PhotoSlide[]>(() => {
    try {
      const saved = localStorage.getItem('wife_bday_photos');
      return saved ? JSON.parse(saved) : DEFAULT_PHOTOS;
    } catch {
      return DEFAULT_PHOTOS;
    }
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Save to localStorage when updated
  const handleSaveSettings = (newSettings: CelebrationSettings) => {
    setSettings(newSettings);
    localStorage.setItem('wife_bday_settings', JSON.stringify(newSettings));
  };

  const handleUpdatePhotos = (newPhotos: PhotoSlide[]) => {
    setPhotos(newPhotos);
    localStorage.setItem('wife_bday_photos', JSON.stringify(newPhotos));
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Theme gradient background styling - Vibrant Palette default with rose/purple gradient harmony
  const getThemeBgClass = () => {
    switch (settings.theme) {
      case 'lavender':
        return 'from-purple-100/60 via-indigo-50/40 to-rose-100/50';
      case 'golden':
        return 'from-amber-50/70 via-rose-50/40 to-purple-50/50';
      case 'cherry':
        return 'from-pink-100/60 via-rose-50/50 to-purple-100/40';
      case 'rose':
      default:
        return 'from-rose-50 via-white to-purple-50';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeBgClass()} text-stone-800 relative selection:bg-rose-200 selection:text-purple-900 overflow-x-hidden`}>
      {/* Vibrant Palette Ambient Glow Orbs in Background */}
      <div className="fixed top-[-60px] right-[-60px] w-80 sm:w-[28rem] h-80 sm:h-[28rem] bg-gradient-to-br from-rose-300/30 to-pink-300/25 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="fixed top-[35%] left-[-100px] w-96 sm:w-[32rem] h-96 sm:h-[32rem] bg-gradient-to-br from-purple-300/25 to-indigo-300/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="fixed bottom-[-80px] right-[-60px] w-96 sm:w-[30rem] h-96 sm:h-[30rem] bg-gradient-to-tr from-pink-300/25 to-purple-300/25 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Floating Ambient Hearts & Tap Reactions */}
      <FloatingHearts />

      {/* Main Top Header Navbar */}
      <Navbar
        wifeName={settings.wifeName}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenShareModal={() => setIsShareOpen(true)}
        onNavigateSection={scrollToSection}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 pb-20 space-y-16 sm:space-y-24">
        {/* 1. Hero Entrance Celebration */}
        <HeroCelebration
          wifeName={settings.wifeName}
          wifeNickname={settings.wifeNickname}
          husbandName={settings.husbandName}
          onNavigateSection={scrollToSection}
        />

        {/* 2. Photo Slideshow Showcase (Main Feature) */}
        <section id="photo-slideshow-section">
          <Slideshow
            photos={photos}
            onUpdatePhotos={handleUpdatePhotos}
            speed={settings.slideshowSpeed}
            wifeName={settings.wifeName}
          />
        </section>

        {/* 3. Interactive Birthday Cake Candle Blowing */}
        <section id="interactive-birthday-cake">
          <BirthdayCake wifeName={settings.wifeName} />
        </section>

        {/* 4. Romantic Love Letter */}
        <section id="romantic-love-letter-section">
          <LoveLetter
            wifeName={settings.wifeName}
            husbandName={settings.husbandName}
            salutation={settings.loveLetterSalutation}
            content={settings.customLetter}
            closing={settings.loveLetterClosing}
            onEditRequest={() => setIsSettingsOpen(true)}
          />
        </section>

        {/* 5. Reasons Why I Love You Flip Deck */}
        <section id="reasons-why-i-love-you">
          <LoveReasonsDeck
            reasons={DEFAULT_REASONS}
            wifeName={settings.wifeName}
          />
        </section>

        {/* 6. Relationship Timeline & Time Elapsed Together Counter */}
        <section id="love-time-counter-section">
          <LoveCounter
            startDate={settings.relationshipStartDate || '2021-02-14'}
            wifeName={settings.wifeName}
          />
        </section>

        {/* 7. Interactive Surprise Gift Box & Date Coupons */}
        <section id="surprise-gift-section">
          <GiftBoxSurprise gifts={DEFAULT_SURPRISE_GIFTS} />
        </section>

        {/* 8. Romantic Birthday Messages, Quotes & Poetry Collection */}
        <section id="love-messages-collection-section">
          <MessageGenerator
            messages={DEFAULT_MESSAGES}
            wifeName={settings.wifeName}
            wifeNickname={settings.wifeNickname}
            husbandName={settings.husbandName}
          />
        </section>
      </main>

      {/* Vibrant Palette Romantic Footer */}
      <footer className="relative z-10 border-t border-rose-100/90 bg-white/70 backdrop-blur-xl py-10 text-center px-4 font-bengali shadow-inner">
        <div className="max-w-md mx-auto flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 font-extrabold text-lg sm:text-xl">
            <span>শুভ জন্মদিন {settings.wifeName}</span>
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
          <p className="text-sm text-stone-600 max-w-sm leading-relaxed">
            {settings.husbandName}-এর পক্ষ থেকে অফুরন্ত ভালোবাসা ও দোয়ার সাথে তৈরি।
          </p>
          
          {/* Vibrant Status Pill */}
          <div className="bg-white/80 px-6 py-2.5 rounded-full border border-rose-200/70 shadow-sm flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest font-sans">
              Forever & Always Syncing Love
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-rose-500 font-medium pt-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>চিরকাল তোমার পাশে থাকার অঙ্গীকার</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          </div>
        </div>
      </footer>

      {/* Customization Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
      />

      {/* Share / Surprise Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        wifeName={settings.wifeName}
      />
    </div>
  );
}
