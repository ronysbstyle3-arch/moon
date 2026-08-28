import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, RotateCcw, PartyPopper } from 'lucide-react';
import { triggerBirthdayConfetti, triggerFireworks } from '../utils/confetti';
import { romanticAudio } from '../utils/audioSynth';

interface BirthdayCakeProps {
  wifeName?: string;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ wifeName = 'আমার প্রিয়তমা' }) => {
  const [isLit, setIsLit] = useState(true);
  const [hasBlown, setHasBlown] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);

  const handleBlowCandle = () => {
    if (!isLit) return;
    
    setIsLit(false);
    setHasBlown(true);
    
    // Play audio effect
    romanticAudio.playCandleBlowSound();
    
    // Trigger celebrations
    triggerBirthdayConfetti();
    setTimeout(() => {
      triggerFireworks();
      setShowWishModal(true);
    }, 600);
  };

  const handleRelight = () => {
    setIsLit(true);
    setHasBlown(false);
    setShowWishModal(false);
  };

  return (
    <div id="interactive-birthday-cake" className="relative w-full max-w-2xl mx-auto my-8 p-6 sm:p-10 rounded-3xl sm:rounded-[36px] bg-white/75 backdrop-blur-xl border border-white/90 shadow-2xl shadow-purple-950/5 ring-1 ring-rose-100/60 text-center overflow-hidden">
      {/* Decorative floating badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-rose-200/80 text-rose-700 text-xs sm:text-sm font-semibold shadow-sm mb-6">
        <PartyPopper className="w-4 h-4 text-purple-600" />
        <span className="font-bengali">ইন্টারেক্টিভ বার্থডে কেক</span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold font-serif-bengali text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 mb-2">
        {wifeName}-এর জন্য বিশেষ বার্থডে কেক
      </h3>
      <p className="text-sm sm:text-base text-stone-600 font-bengali mb-8 max-w-md mx-auto">
        {isLit 
          ? 'মনে মনে একটি সুন্দর ইচ্ছা পোষণ করো এবং মোমবাতিতে ক্লিক করে ফুঁ দাও!'
          : 'তোমার মনের সব সুন্দর স্বপ্ন ও ইচ্ছাগুলো যেন সত্যি হয়!'}
      </p>

      {/* SVG Cake Scene */}
      <div className="relative w-72 sm:w-80 h-64 mx-auto flex items-center justify-center cursor-pointer select-none group" onClick={handleBlowCandle}>
        
        {/* Interactive glow when lit */}
        {isLit && (
          <div className="absolute top-4 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl animate-pulse pointer-events-none" />
        )}

        <svg viewBox="0 0 300 240" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Cake Stand Plate */}
          <ellipse cx="150" cy="225" rx="130" ry="14" fill="#fbcfe8" />
          <ellipse cx="150" cy="223" rx="124" ry="10" fill="#ffffff" />
          <path d="M 130 225 Q 150 238 170 225 L 175 238 L 125 238 Z" fill="#f472b6" opacity="0.4" />

          {/* Bottom Cake Layer */}
          <g>
            {/* Base */}
            <path d="M 50 160 Q 50 150 60 150 L 240 150 Q 250 150 250 160 L 250 200 Q 250 215 150 215 Q 50 215 50 200 Z" fill="#fda4af" />
            <ellipse cx="150" cy="160" rx="100" ry="14" fill="#f43f5e" />
            {/* Frosting Drips */}
            <path d="M 50 165 C 65 185, 75 160, 90 180 C 105 160, 120 185, 135 165 C 150 188, 165 162, 180 182 C 195 160, 210 185, 225 165 C 235 180, 245 165, 250 168 L 250 160 Q 150 145 50 160 Z" fill="#ffffff" opacity="0.95" />
            {/* Cream Balls */}
            <circle cx="75" cy="162" r="6" fill="#ffe4e6" />
            <circle cx="110" cy="165" r="6" fill="#ffe4e6" />
            <circle cx="150" cy="166" r="6" fill="#ffe4e6" />
            <circle cx="190" cy="165" r="6" fill="#ffe4e6" />
            <circle cx="225" cy="162" r="6" fill="#ffe4e6" />
          </g>

          {/* Top Cake Layer */}
          <g>
            {/* Base */}
            <path d="M 80 110 Q 80 100 90 100 L 210 100 Q 220 100 220 110 L 220 150 Q 220 165 150 165 Q 80 165 80 150 Z" fill="#fb7185" />
            <ellipse cx="150" cy="110" rx="70" ry="12" fill="#fff1f2" />
            {/* Frosting Swirls */}
            <path d="M 80 115 C 95 130, 105 112, 120 128 C 135 110, 150 130, 165 112 C 180 128, 195 112, 205 125 C 215 115, 218 118, 220 118 L 220 110 Q 150 98 80 110 Z" fill="#ffffff" />
            {/* Cherries/Strawberries */}
            <circle cx="100" cy="108" r="5" fill="#e11d48" />
            <circle cx="130" cy="112" r="5" fill="#e11d48" />
            <circle cx="170" cy="112" r="5" fill="#e11d48" />
            <circle cx="200" cy="108" r="5" fill="#e11d48" />
          </g>

          {/* 3 Birthday Candles */}
          {/* Left Candle */}
          <g>
            <rect x="115" y="65" width="8" height="42" rx="3" fill="#38bdf8" />
            <path d="M 115 75 L 123 72" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <path d="M 115 90 L 123 87" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="119" y1="65" x2="119" y2="58" stroke="#334155" strokeWidth="1.5" />
            {isLit && (
              <g className="animate-flame">
                <ellipse cx="119" cy="50" rx="5" ry="9" fill="#f59e0b" />
                <ellipse cx="119" cy="51" rx="3" ry="6" fill="#fef08a" />
                <circle cx="119" cy="52" r="1.5" fill="#ffffff" />
              </g>
            )}
          </g>

          {/* Center Main Candle */}
          <g>
            <rect x="145" y="55" width="10" height="52" rx="4" fill="#fb7185" />
            <path d="M 145 68 L 155 64" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 145 84 L 155 80" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="150" y1="55" x2="150" y2="46" stroke="#334155" strokeWidth="2" />
            {isLit && (
              <g className="animate-flame" style={{ animationDelay: '0.2s' }}>
                <ellipse cx="150" cy="36" rx="7" ry="12" fill="#f59e0b" />
                <ellipse cx="150" cy="38" rx="4" ry="8" fill="#fef08a" />
                <circle cx="150" cy="40" r="2" fill="#ffffff" />
              </g>
            )}
          </g>

          {/* Right Candle */}
          <g>
            <rect x="177" y="65" width="8" height="42" rx="3" fill="#a855f7" />
            <path d="M 177 75 L 185 72" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <path d="M 177 90 L 185 87" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="181" y1="65" x2="181" y2="58" stroke="#334155" strokeWidth="1.5" />
            {isLit && (
              <g className="animate-flame" style={{ animationDelay: '0.4s' }}>
                <ellipse cx="181" cy="50" rx="5" ry="9" fill="#f59e0b" />
                <ellipse cx="181" cy="51" rx="3" ry="6" fill="#fef08a" />
                <circle cx="181" cy="52" r="1.5" fill="#ffffff" />
              </g>
            )}
          </g>

          {/* Smoke Trails when blown */}
          {!isLit && (
            <g opacity="0.6">
              <path d="M 119 55 Q 115 45 122 38 T 118 25" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
              <path d="M 150 45 Q 145 32 154 22 T 148 10" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="4 2" />
              <path d="M 181 55 Q 185 45 178 38 T 182 25" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
            </g>
          )}
        </svg>
      </div>

      {/* Button Controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        {isLit ? (
          <button
            id="btn-blow-candles"
            onClick={handleBlowCandle}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold font-bengali text-base shadow-lg shadow-rose-500/30 active:scale-95 transition-all transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
            <span>মোমবাতি নেভাও ও উইশ করো 🎂</span>
          </button>
        ) : (
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <button
              id="btn-relight-candles"
              onClick={handleRelight}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/90 hover:bg-rose-50 border border-rose-200/80 text-rose-800 hover:text-purple-700 font-semibold font-bengali text-sm shadow-sm transition active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>আবার মোমবাতি জ্বালাও</span>
            </button>
            <button
              id="btn-view-wish"
              onClick={() => setShowWishModal(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-semibold font-bengali text-sm shadow-md shadow-rose-500/20 transition active:scale-95"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>স্পেশাল বার্তা দেখুন</span>
            </button>
          </div>
        )}
      </div>

      {/* Pop-up Wish Reveal Modal */}
      <AnimatePresence>
        {showWishModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-white/90 backdrop-blur-2xl rounded-3xl sm:rounded-[36px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-white/80 ring-1 ring-rose-100/80 text-center relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/30">
                <Heart className="w-8 h-8 fill-white animate-pulse" />
              </div>

              <h4 className="text-2xl sm:text-3xl font-bold font-serif-bengali text-rose-950 mb-2">
                শুভ জন্মদিন, আমার চাঁদের টুকরো! 💖
              </h4>
              
              <p className="font-bengali text-stone-700 text-base sm:text-lg leading-relaxed mt-4">
                তোমার মনের সব না-বলা ইচ্ছা, স্বপ্ন ও আশাগুলো যেন এই নতুন বছরে বাস্তবে রূপ নেয়। তোমার মুখের এই সুন্দর হাসিটি যেন কোনোদিন ম্লান না হয়। তুমি আমার জীবনের শ্রেষ্ঠতম পাওয়া।
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-rose-50/80 border border-rose-200/60 text-purple-900 font-script text-2xl">
                Always & Forever with You, My Love!
              </div>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => setShowWishModal(false)}
                  className="px-7 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bengali font-semibold shadow-md shadow-rose-500/20 active:scale-95 transition"
                >
                  ধন্যবাদ, জান ❤️
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
