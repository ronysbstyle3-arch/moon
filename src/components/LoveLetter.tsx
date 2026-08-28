import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Edit3, Copy, Check, Sparkles, Feather, Share2 } from 'lucide-react';
import { triggerBirthdayConfetti } from '../utils/confetti';

interface LoveLetterProps {
  wifeName: string;
  husbandName: string;
  salutation: string;
  content: string;
  closing: string;
  onEditRequest: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({
  wifeName,
  husbandName,
  salutation,
  content,
  closing,
  onEditRequest
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLetter = () => {
    const fullText = `${salutation}\n\n${content}\n\n${closing}\n- ${husbandName}`;
    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    triggerBirthdayConfetti();
  };

  return (
    <div id="romantic-love-letter-section" className="w-full max-w-3xl mx-auto my-10 px-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-rose-200/80 text-rose-700 text-xs sm:text-sm font-semibold shadow-sm mb-3">
          <Feather className="w-4 h-4 text-purple-600" />
          <span className="font-bengali">হৃদয়ের চিরকুট</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-serif-bengali text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
          তোমার জন্য একটি গোপন প্রেমপত্র
        </h3>
        <p className="text-xs sm:text-sm text-purple-700/80 font-bengali mt-1.5 font-medium">
          ভালোবাসার প্রতিটি শব্দ কেবল তোমার জন্যই সাজানো
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Sealed Envelope View */
          <motion.div
            key="envelope"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={handleOpenEnvelope}
            className="cursor-pointer mx-auto max-w-md bg-gradient-to-tr from-rose-100 via-white to-purple-100 rounded-3xl sm:rounded-[36px] p-8 sm:p-10 shadow-2xl shadow-purple-900/10 border border-white/90 ring-1 ring-rose-200/60 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-all duration-300 group"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 to-purple-600 border-4 border-white shadow-xl shadow-rose-500/30 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
              <Mail className="w-9 h-9 text-white" />
            </div>
            <p className="font-script text-2xl text-rose-900 mb-1">For My Dearest Wife</p>
            <p className="font-bengali text-sm text-purple-700 font-semibold">
              চিঠিটি খুলতে এখানে ক্লিক করুন 💌
            </p>
            {/* Wax seal badge */}
            <div className="mt-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md">
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>মোমমোহর সিল</span>
            </div>
          </motion.div>
        ) : (
          /* Opened Letter View */
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/85 backdrop-blur-xl rounded-3xl sm:rounded-[36px] p-6 sm:p-12 shadow-2xl shadow-purple-950/5 border border-white/90 ring-1 ring-rose-100/70 text-stone-800"
          >
            {/* Decorative Corner Flourishes */}
            <div className="absolute top-4 left-4 text-rose-300 text-xl select-none">❦</div>
            <div className="absolute top-4 right-4 text-rose-300 text-xl select-none">❦</div>
            <div className="absolute bottom-4 left-4 text-rose-300 text-xl select-none">❦</div>
            <div className="absolute bottom-4 right-4 text-rose-300 text-xl select-none">❦</div>

            {/* Letter Top Ribbon */}
            <div className="flex items-center justify-between border-b border-rose-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span className="font-script text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600 font-semibold">
                  With Infinite Love
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  id="btn-edit-letter"
                  onClick={onEditRequest}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-2xl bg-white/90 hover:bg-rose-50 text-rose-800 hover:text-purple-700 text-xs font-semibold border border-rose-200/80 shadow-sm transition"
                  title="চিঠি সম্পাদনা করুন"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="font-bengali">এডিট করুন</span>
                </button>
                <button
                  id="btn-copy-letter"
                  onClick={handleCopyLetter}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-2xl bg-white/90 hover:bg-rose-50 text-rose-800 hover:text-purple-700 text-xs font-semibold border border-rose-200/80 shadow-sm transition"
                  title="কপি করুন"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-bengali text-emerald-600">কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-bengali">কপি</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Salutation */}
            <h4 className="font-serif-bengali text-lg sm:text-xl font-bold text-rose-950 mb-4">
              {salutation || `আমার প্রিয়তম ${wifeName},`}
            </h4>

            {/* Letter Body */}
            <div className="font-bengali text-base sm:text-lg text-stone-700 leading-loose whitespace-pre-line space-y-4 tracking-wide font-normal">
              {content}
            </div>

            {/* Closing & Signature */}
            <div className="mt-8 pt-4 border-t border-rose-100 flex flex-col items-end">
              <p className="font-bengali text-sm sm:text-base text-stone-600 italic whitespace-pre-line text-right">
                {closing}
              </p>
              <p className="font-serif-bengali text-lg sm:text-xl font-bold text-rose-900 mt-2">
                - {husbandName}
              </p>
              <div className="w-24 h-0.5 bg-gradient-to-r from-rose-400 to-purple-400 mt-1" />
            </div>

            {/* Stamp Footer */}
            <div className="mt-6 flex justify-between items-center text-xs text-purple-700/70 font-bengali">
              <span>📅 আজকের এই শুভ জন্মদিন</span>
              <span>🔒 সম্পূর্ণ ব্যক্তিগত ও গোপনীয় প্রেমবার্তা</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
