import React from 'react';
import { Heart, Settings2, Sparkles, Share2, Image as ImageIcon, MessageSquare, Cake } from 'lucide-react';
import { MusicPlayer } from './MusicPlayer';

interface NavbarProps {
  wifeName: string;
  onOpenSettings: () => void;
  onOpenShareModal: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wifeName,
  onOpenSettings,
  onOpenShareModal,
  onNavigateSection
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/75 border-b border-rose-100/80 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Title with Vibrant Gradient */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-md shadow-rose-500/25 transform hover:scale-105 transition">
            ❤️
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600 text-base sm:text-lg font-extrabold tracking-tight uppercase font-sans">
                Happy Birthday
              </span>
              <span className="text-rose-900 font-serif-bengali font-bold text-base sm:text-lg">
                {wifeName}
              </span>
            </div>
            <span className="text-[11px] text-purple-600/90 font-semibold font-bengali block">
              ভালোবাসার রঙিন ডিজিটাল উৎসব ✨
            </span>
          </div>
        </div>

        {/* Quick Nav Links (Desktop) */}
        {onNavigateSection && (
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold font-bengali">
            <button 
              onClick={() => onNavigateSection('photo-slideshow-section')}
              className="text-rose-600 hover:text-purple-600 flex items-center gap-1.5 transition"
            >
              <ImageIcon className="w-4 h-4 text-rose-500" />
              <span>স্মৃতিশালা (Photos)</span>
            </button>
            <button 
              onClick={() => onNavigateSection('interactive-birthday-cake')}
              className="text-stone-600 hover:text-rose-600 flex items-center gap-1.5 transition"
            >
              <Cake className="w-4 h-4 text-pink-500" />
              <span>কেক ও মোমবাতি</span>
            </button>
            <button 
              onClick={() => onNavigateSection('romantic-love-letter-section')}
              className="text-stone-600 hover:text-purple-600 flex items-center gap-1.5 transition"
            >
              <MessageSquare className="w-4 h-4 text-purple-500" />
              <span>প্রেমপত্র</span>
            </button>
          </nav>
        )}

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Music Synth Controller */}
          <MusicPlayer />

          {/* Share / Copy App Link */}
          <button
            id="btn-share-app"
            onClick={onOpenShareModal}
            className="p-2 sm:px-3.5 sm:py-2 rounded-2xl bg-white/80 hover:bg-rose-50 text-rose-700 hover:text-purple-700 text-xs font-semibold font-bengali border border-rose-200/80 shadow-sm transition active:scale-95 flex items-center gap-1.5"
            title="লিঙ্ক শেয়ার করুন"
          >
            <Share2 className="w-4 h-4 text-rose-500" />
            <span className="hidden sm:inline">শেয়ার</span>
          </button>

          {/* Settings Customizer Button with Vibrant Gradient */}
          <button
            id="btn-settings-open"
            onClick={onOpenSettings}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white text-xs sm:text-sm font-semibold font-bengali shadow-md shadow-rose-500/25 transition active:scale-95"
            title="কাস্টমাইজ করুন"
          >
            <Settings2 className="w-4 h-4" />
            <span className="hidden sm:inline">কাস্টমাইজ</span>
          </button>
        </div>
      </div>
    </header>
  );
};

