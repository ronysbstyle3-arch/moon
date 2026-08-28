import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, PartyPopper, Cake, Image as ImageIcon, Mail, Gift, ChevronDown } from 'lucide-react';
import { triggerBirthdayConfetti, triggerFireworks } from '../utils/confetti';
import { romanticAudio } from '../utils/audioSynth';

interface HeroCelebrationProps {
  wifeName: string;
  wifeNickname: string;
  husbandName?: string;
  onNavigateSection: (sectionId: string) => void;
}

export const HeroCelebration: React.FC<HeroCelebrationProps> = ({
  wifeName,
  wifeNickname,
  husbandName,
  onNavigateSection
}) => {
  const handleGrandCelebration = () => {
    romanticAudio.playCelebrationChime();
    triggerBirthdayConfetti();
    setTimeout(() => {
      triggerFireworks();
    }, 400);
  };

  return (
    <div className="relative pt-8 sm:pt-12 pb-14 px-3 sm:px-4 text-center overflow-hidden">
      {/* Decorative Floating Balloons & Hearts in Background */}
      <div className="pointer-events-none absolute inset-0 flex justify-between px-6 sm:px-12 opacity-60">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-4xl sm:text-5xl"
        >
          🎈
        </motion.div>
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [2, -3, 2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="text-5xl sm:text-6xl hidden sm:block"
        >
          💖
        </motion.div>
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="text-4xl sm:text-5xl"
        >
          🎂
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Animated Vibrant Celebration Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-rose-200/80 shadow-md shadow-rose-500/10 mb-2"
        >
          <Sparkles className="w-4 h-4 text-purple-600 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="font-bengali text-xs sm:text-sm font-bold text-rose-700 tracking-wide">
            আজকের দিনটি শুধুই তোমার জন্য বিশেষ
          </span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
        </motion.div>

        {/* Grand Vibrant Typography Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3"
        >
          <h1 className="font-serif-bengali text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight sm:leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
              শুভ জন্মদিন প্রিয়তমা!
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-2xl sm:text-3xl font-bold font-bengali text-rose-900">
              {wifeName}
            </span>
            {wifeNickname ? (
              <span className="text-xl sm:text-2xl font-script text-purple-600">
                ({wifeNickname})
              </span>
            ) : null}
          </div>

          <p className="text-lg sm:text-2xl text-rose-500 font-medium italic font-bengali">
            "প্রযুক্তির ভাষায় একগুচ্ছ ভালোবাসা ও শুভকামনা"
          </p>
        </motion.div>

        {/* Vibrant Glassmorphism Card Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-xl shadow-purple-900/5 max-w-2xl mx-auto"
        >
          <p className="font-bengali text-stone-700 text-base sm:text-lg leading-relaxed">
            আমার জীবনের সবচেয়ে সুন্দর উপহার তুমি। আজকের এই বিশেষ দিনে তোমার জন্য তৈরি করলাম এই ছোট একটি ডিজিটাল পৃথিবী। যেখানে শুধু আমাদের স্মৃতি আর ভালোবাসা মিশে আছে। ভালো থেকো সারাজীবন আমার পাশে।
          </p>
          {husbandName && (
            <div className="mt-4 pt-3 border-t border-rose-100/80 flex items-center justify-between text-xs sm:text-sm text-purple-700 font-bold font-bengali">
              <span>চিরকাল তোমারই</span>
              <span className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-3 py-1 rounded-xl shadow-sm">
                With Love, {husbandName} 💝
              </span>
            </div>
          )}
        </motion.div>

        {/* Big Vibrant Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button
            id="btn-grand-celebrate"
            onClick={handleGrandCelebration}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold font-bengali text-base sm:text-lg shadow-xl shadow-rose-500/30 transform hover:scale-105 active:scale-95 transition-all"
          >
            <PartyPopper className="w-5 h-5" />
            <span>কনফেটি ও আতশবাজি ফোটাও 🎉</span>
          </button>

          <button
            id="btn-goto-slideshow"
            onClick={() => onNavigateSection('photo-slideshow-section')}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-white/90 hover:bg-white text-rose-800 hover:text-purple-800 font-bold font-bengali text-base border-2 border-rose-200/80 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all"
          >
            <ImageIcon className="w-5 h-5 text-rose-500" />
            <span>স্মৃতির ফটো স্লাইডশো 📷</span>
          </button>
        </motion.div>

        {/* Quick Nav Anchor Pills in Vibrant Glass styling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold font-bengali"
        >
          <button
            onClick={() => onNavigateSection('interactive-birthday-cake')}
            className="px-4 py-2.5 rounded-2xl bg-white/80 hover:bg-white text-rose-800 hover:text-pink-600 border border-rose-200/80 shadow-sm transition flex items-center gap-1.5 active:scale-95"
          >
            <Cake className="w-4 h-4 text-pink-500" />
            <span>বার্থডে কেক</span>
          </button>

          <button
            onClick={() => onNavigateSection('romantic-love-letter-section')}
            className="px-4 py-2.5 rounded-2xl bg-white/80 hover:bg-white text-rose-800 hover:text-purple-600 border border-rose-200/80 shadow-sm transition flex items-center gap-1.5 active:scale-95"
          >
            <Mail className="w-4 h-4 text-purple-500" />
            <span>প্রেমপত্র</span>
          </button>

          <button
            onClick={() => onNavigateSection('reasons-why-i-love-you')}
            className="px-4 py-2.5 rounded-2xl bg-white/80 hover:bg-white text-rose-800 hover:text-rose-600 border border-rose-200/80 shadow-sm transition flex items-center gap-1.5 active:scale-95"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>ভালোবাসার কারণ</span>
          </button>

          <button
            onClick={() => onNavigateSection('surprise-gift-section')}
            className="px-4 py-2.5 rounded-2xl bg-white/80 hover:bg-white text-rose-800 hover:text-purple-600 border border-rose-200/80 shadow-sm transition flex items-center gap-1.5 active:scale-95"
          >
            <Gift className="w-4 h-4 text-purple-500" />
            <span>উপহার বক্স</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
