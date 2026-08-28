import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Copy, Check, Share2, Heart, MessageSquare, Send } from 'lucide-react';
import { triggerBirthdayConfetti } from '../utils/confetti';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  wifeName: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  wifeName
}) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const currentUrl = window.location.href;
  const shareText = `🎂 শুভ জন্মদিন আমার প্রিয়তমা ${wifeName}! 💖 তোমার জন্য বিশেষভাবে তৈরি করা এই মিষ্টি সারপ্রাইজ ওয়েবসাইটটি দেখো: ${currentUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    triggerBirthdayConfetti();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white/90 backdrop-blur-2xl rounded-3xl sm:rounded-[36px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-white/90 ring-1 ring-rose-100/80 text-center"
      >
        <div className="flex justify-between items-center pb-3 border-b border-rose-100 mb-4">
          <div className="flex items-center gap-2 text-rose-900 font-bold font-serif-bengali text-lg">
            <Share2 className="w-5 h-5 text-purple-600" />
            <span>বউকে সারপ্রাইজ পাঠান</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-rose-50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-100 to-purple-100 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
          <Heart className="w-8 h-8 fill-rose-500 text-rose-500 animate-pulse" />
        </div>

        <h4 className="text-xl font-bold font-serif-bengali text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 mb-2">
          {wifeName}-কে এই ওয়েবসাইটটি উপহার দিন 💌
        </h4>
        <p className="text-xs sm:text-sm text-purple-700/80 font-bengali leading-relaxed mb-6 font-medium">
          এই লিঙ্কটি হোয়াটসঅ্যাপ বা মেসেঞ্জারে পাঠিয়ে দিন যাতে তিনি তার জন্য সাজানো ফটোগ্যালারি, গান ও সুন্দর বার্তাগুলো দেখতে পারেন।
        </p>

        {/* Share Link Box */}
        <div className="p-3 bg-white/80 border border-rose-200/80 rounded-2xl flex items-center justify-between gap-2 mb-4 shadow-sm">
          <span className="text-xs text-stone-600 truncate font-mono select-all text-left">
            {currentUrl}
          </span>
          <button
            onClick={handleCopyLink}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-semibold font-bengali flex items-center gap-1 transition shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'কপি হয়েছে!' : 'কপি লিঙ্ক'}</span>
          </button>
        </div>

        {/* Direct WhatsApp Share Button */}
        <button
          onClick={handleWhatsAppShare}
          className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold font-bengali text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-95 mb-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>হোয়াটসঅ্যাপে সরাসরি পাঠান</span>
        </button>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-2xl text-stone-500 hover:bg-rose-50/60 text-xs font-semibold font-bengali transition"
        >
          বন্ধ করুন
        </button>
      </motion.div>
    </div>
  );
};
