import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  HeartHandshake, 
  Sparkles, 
  Smile, 
  Utensils, 
  ShieldCheck, 
  Crown, 
  Heart,
  HelpCircle
} from 'lucide-react';
import { LoveReason } from '../types';
import { triggerHeartBurst } from '../utils/confetti';

interface LoveReasonsDeckProps {
  reasons: LoveReason[];
  wifeName?: string;
}

export const LoveReasonsDeck: React.FC<LoveReasonsDeckProps> = ({ 
  reasons, 
  wifeName = 'আমার প্রিয়তমা' 
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    const isNowFlipped = !flippedCards[id];
    setFlippedCards((prev) => ({ ...prev, [id]: isNowFlipped }));

    if (isNowFlipped) {
      triggerHeartBurst(e.clientX, e.clientY);
    }
  };

  const getReasonIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-rose-500" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'Smile':
        return <Smile className="w-6 h-6 text-pink-500" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-orange-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-500" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-yellow-500" />;
      default:
        return <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />;
    }
  };

  return (
    <div id="reasons-why-i-love-you" className="w-full max-w-5xl mx-auto my-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-rose-200/80 text-rose-700 text-xs sm:text-sm font-semibold shadow-sm mb-3">
          <Heart className="w-4 h-4 text-purple-600 fill-purple-600" />
          <span className="font-bengali">ভালোবাসার কারণগুলো</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-serif-bengali text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
          কেন আমি {wifeName}-কে এত ভালোবাসি?
        </h3>
        <p className="text-xs sm:text-sm text-purple-700/80 font-bengali mt-1.5 font-medium">
          কার্ডগুলোতে ক্লিক করে প্রতিটি সুন্দর কারণ উন্মোচন করুন
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reasons.map((reason, index) => {
          const isFlipped = !!flippedCards[reason.id];

          return (
            <div
              key={reason.id}
              onClick={(e) => toggleFlip(reason.id, e)}
              className="group cursor-pointer perspective h-56 w-full select-none"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="relative w-full h-full rounded-3xl transition-shadow duration-300 shadow-md hover:shadow-xl [transform-style:preserve-3d]"
              >
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full rounded-3xl p-6 bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-rose-100/70 shadow-lg shadow-purple-900/5 flex flex-col justify-between [backface-visibility:hidden]">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center font-serif shadow-sm shadow-rose-500/20">
                      #{index + 1}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-rose-50/80 border border-rose-100">
                      {getReasonIcon(reason.iconName)}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold font-serif-bengali text-rose-950 mb-1">
                      {reason.bengaliTitle}
                    </h4>
                    <p className="text-xs font-semibold text-purple-600 font-sans tracking-wide">
                      {reason.title}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-rose-400 font-bengali pt-2 border-t border-rose-100/60">
                    <span className="text-purple-700/70 font-medium">ক্লিক করে জানুন</span>
                    <HelpCircle className="w-4 h-4 text-purple-500 group-hover:rotate-45 transition-transform" />
                  </div>
                </div>

                {/* Back Side (Revealed details) */}
                <div className="absolute inset-0 w-full h-full rounded-3xl p-6 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-2xl shadow-purple-900/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-rose-100 font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="font-bengali">মনের কথা #{index + 1}</span>
                    </div>
                    <Heart className="w-4 h-4 fill-white text-white" />
                  </div>

                  <div className="my-auto">
                    <p className="font-bengali text-sm sm:text-base font-semibold leading-relaxed">
                      "{reason.bengaliDesc}"
                    </p>
                    <p className="text-xs text-rose-100/90 italic font-sans mt-2">
                      {reason.description}
                    </p>
                  </div>

                  <div className="text-right text-[11px] text-rose-200 font-bengali">
                    আবার ক্লিক করে বন্ধ করুন ↺
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
