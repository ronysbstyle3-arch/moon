import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Heart, Wine, ShoppingBag, Compass, CheckCircle2 } from 'lucide-react';
import { SurpriseGift } from '../types';
import { triggerBirthdayConfetti } from '../utils/confetti';
import { romanticAudio } from '../utils/audioSynth';

interface GiftBoxSurpriseProps {
  gifts: SurpriseGift[];
}

export const GiftBoxSurprise: React.FC<GiftBoxSurpriseProps> = ({ gifts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<SurpriseGift | null>(null);
  const [claimedGifts, setClaimedGifts] = useState<string[]>([]);

  const handleOpenBox = () => {
    setIsOpen(true);
    romanticAudio.playCelebrationChime();
    triggerBirthdayConfetti();
  };

  const handleClaimGift = (gift: SurpriseGift) => {
    setSelectedGift(gift);
    if (!claimedGifts.includes(gift.id)) {
      setClaimedGifts([...claimedGifts, gift.id]);
    }
    triggerBirthdayConfetti();
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wine':
        return <Wine className="w-6 h-6 text-rose-500" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-pink-500" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-amber-500" />;
      default:
        return <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />;
    }
  };

  return (
    <div id="surprise-gift-section" className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-rose-200/80 text-rose-700 text-xs sm:text-sm font-semibold shadow-sm mb-3">
          <Gift className="w-4 h-4 text-purple-600" />
          <span className="font-bengali">সারপ্রাইজ উপহার বক্স</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-serif-bengali text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
          তোমার জন্য জন্মদিনের বিশেষ উপহার কুপন
        </h3>
        <p className="text-xs sm:text-sm text-purple-700/80 font-bengali mt-1.5 font-medium">
          উপহার বক্সটি খুলুন এবং আপনার পছন্দের উপহারটি রিডিম করুন!
        </p>
      </div>

      {!isOpen ? (
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 bg-white/80 backdrop-blur-xl rounded-3xl sm:rounded-[36px] border border-white/90 ring-1 ring-rose-100/70 shadow-2xl shadow-purple-950/5 text-center">
          {/* Animated 3D Gift Box */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenBox}
            className="cursor-pointer relative w-44 h-44 flex items-center justify-center group"
          >
            {/* Pulsing Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-purple-400/20 rounded-3xl blur-2xl group-hover:from-rose-400/40 group-hover:to-purple-400/40 transition-colors" />

            {/* Gift Box Graphic */}
            <div className="relative w-36 h-36 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center border-2 border-white/80">
              {/* Vertical Ribbon */}
              <div className="absolute w-7 h-full bg-amber-300 shadow-md" />
              {/* Horizontal Ribbon */}
              <div className="absolute h-7 w-full bg-amber-300 shadow-md" />
              
              {/* Ribbon Bow on Top */}
              <div className="absolute -top-4 w-12 h-12 bg-amber-400 rounded-full shadow-lg flex items-center justify-center border-2 border-amber-200">
                <Sparkles className="w-6 h-6 text-amber-950 animate-spin" style={{ animationDuration: '4s' }} />
              </div>

              <div className="z-10 bg-white/95 px-3 py-1 rounded-full text-[11px] font-bold text-rose-700 shadow font-bengali">
                ক্লিক করুন 🎁
              </div>
            </div>
          </motion.div>

          <button
            id="btn-open-gift-box"
            onClick={handleOpenBox}
            className="mt-6 px-7 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold font-bengali text-base shadow-lg shadow-rose-500/20 active:scale-95 transition transform hover:scale-105"
          >
            উপহার বক্সটি খুলুন ✨
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {gifts.map((gift) => {
            const isClaimed = claimedGifts.includes(gift.id);
            return (
              <div
                key={gift.id}
                className={`relative p-6 sm:p-7 rounded-3xl sm:rounded-[32px] border transition-all duration-300 flex flex-col justify-between ${
                  isClaimed
                    ? 'bg-gradient-to-br from-rose-50 to-purple-50/70 border-rose-200/80 shadow-lg'
                    : 'bg-white/80 backdrop-blur-xl hover:bg-white border-white/90 ring-1 ring-rose-100/70 shadow-xl shadow-purple-900/5 hover:shadow-2xl'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="p-3 rounded-2xl bg-gradient-to-tr from-rose-50 to-purple-50 border border-rose-100/80 shadow-sm">
                      {getIcon(gift.icon)}
                    </div>
                    <span className="px-3.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100 font-bengali text-xs font-semibold">
                      {gift.badge}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold font-serif-bengali text-rose-950 mb-1">
                    {gift.title}
                  </h4>
                  <p className="text-xs font-semibold text-purple-600 font-bengali mb-2">
                    {gift.subtitle}
                  </p>
                  <p className="text-sm text-stone-600 font-bengali leading-relaxed">
                    {gift.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-rose-100/80 flex items-center justify-between">
                  <span className="text-xs text-purple-700/70 font-bengali font-medium">
                    {isClaimed ? '✅ দাবি করা হয়েছে' : '🎁 উপহার কুপন'}
                  </span>
                  <button
                    onClick={() => handleClaimGift(gift)}
                    className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold font-bengali transition active:scale-95 flex items-center gap-1.5 ${
                      isClaimed
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-md shadow-rose-500/20'
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>রিডিম হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>কুপনটি গ্রহণ করো</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* Selected Gift Claim Modal */}
      <AnimatePresence>
        {selectedGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/90 backdrop-blur-2xl rounded-3xl sm:rounded-[36px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-white/90 ring-1 ring-rose-100/80 text-center"
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-100 to-purple-100 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
                {getIcon(selectedGift.icon)}
              </div>
              <span className="px-3.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-100 text-xs font-semibold font-bengali">
                {selectedGift.badge}
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-serif-bengali text-rose-950 mt-3 mb-1">
                {selectedGift.title}
              </h4>
              <p className="text-stone-600 font-bengali text-sm mt-2 leading-relaxed">
                {selectedGift.description}
              </p>
              <div className="mt-6 p-4 rounded-2xl bg-rose-50/80 border border-rose-200/80 text-xs text-purple-900 font-bengali font-medium">
                ❤️ এই কুপনটি আজীবন মেয়াদের জন্য কার্যকর। যখনই তুমি চাইবে, তোমার বর এটি সানন্দে পূরণ করবে!
              </div>
              <button
                onClick={() => setSelectedGift(null)}
                className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bengali font-semibold shadow-md shadow-rose-500/20 active:scale-95 transition"
              >
                দারুণ! ধন্যবাদ ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
