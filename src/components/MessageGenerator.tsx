import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, 
  Check, 
  Sparkles, 
  BookOpen, 
  Quote, 
  Send, 
  Heart,
  Volume2
} from 'lucide-react';
import { LoveMessage } from '../types';
import { triggerBirthdayConfetti } from '../utils/confetti';

interface MessageGeneratorProps {
  messages: LoveMessage[];
  wifeName: string;
  wifeNickname: string;
  husbandName: string;
}

export const MessageGenerator: React.FC<MessageGeneratorProps> = ({
  messages,
  wifeName,
  wifeNickname,
  husbandName
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedWish, setGeneratedWish] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = [
    { id: 'all', label: 'সব বার্তা' },
    { id: 'romantic', label: 'রোমান্টিক' },
    { id: 'emotional', label: 'আবেগঘন' },
    { id: 'gratitude', label: 'কৃতজ্ঞতা' },
    { id: 'poetry', label: 'কবিতা ও উক্তি' }
  ];

  const filteredMessages = selectedCategory === 'all' 
    ? messages 
    : messages.filter((m) => m.category === selectedCategory);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleGenerateSmartWish = (tone: 'sweet' | 'poetic' | 'funny' | 'deep') => {
    setIsGenerating(true);
    setTimeout(() => {
      let wish = '';
      if (tone === 'sweet') {
        wish = `শুভ জন্মদিন আমার মিষ্টি ${wifeNickname || wifeName}! তুমি আমার জীবনের সবচেয়ে দামি রত্ন। তোমার মিষ্টি হাসি দেখে প্রতিটি সকাল শুরু করতে পারা আমার শ্রেষ্ঠ সৌভাগ্য। সবসময় হাসিখুশি থেকো!`;
      } else if (tone === 'poetic') {
        wish = `“হৃদয়ের আকাশে তুমি শুকতারা, তোমায় পেয়ে আমি আত্মহারা।” শুভ জন্মদিন প্রিয়তমা ${wifeName}! জীবনের প্রতিটি পাতায় ভালোবাসার রঙ ছড়িয়ে দিয়েছো তুমি।`;
      } else if (tone === 'funny') {
        wish = `শুভ জন্মদিন আমার পারফেক্ট বউ! বয়সের সংখ্যাটা শুধু একটা সংখ্যাই, তুমি কিন্তু আজও সেই প্রথম দিনের মতোই মিষ্টি ও কিউট (এবং একটু একটু ঝগড়াটেও!)। অনেক ভালোবাসি তোমায়!`;
      } else {
        wish = `আজকের দিনে সৃষ্টিকর্তা আমার জীবনের সবচেয়ে বড় আশীর্বাদ পাঠিয়েছেন—তোমাকে। তোমার ভালোবাসা, ধৈর্য আর পাশে থাকা আমাকে পরিপূর্ণ করেছে। আজীবন এভাবেই তোমার হাতটি ধরে রাখতে চাই। শুভ জন্মদিন!`;
      }
      setGeneratedWish(wish);
      setIsGenerating(false);
      triggerBirthdayConfetti();
    }, 600);
  };

  return (
    <div id="love-messages-collection-section" className="w-full max-w-5xl mx-auto my-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-rose-200/80 text-rose-700 text-xs sm:text-sm font-semibold shadow-sm mb-3">
          <Quote className="w-4 h-4 text-purple-600" />
          <span className="font-bengali">সুন্দর মেসেজ ও প্রেমের উক্তি</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-serif-bengali text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
          {wifeName}-এর জন্য হৃদয়ছোঁয়া জন্মদিনের বার্তা
        </h3>
        <p className="text-xs sm:text-sm text-purple-700/80 font-bengali mt-1.5 font-medium">
          পছন্দের বার্তাটি কপি করে সরাসরি তাকে পাঠাতে পারেন
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 sm:px-5 py-2 rounded-2xl text-xs sm:text-sm font-semibold font-bengali transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white shadow-md shadow-rose-500/20 scale-105'
                : 'bg-white/80 hover:bg-white text-stone-700 border border-rose-200/70 hover:border-purple-300 shadow-sm'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Message Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className="bg-white/80 backdrop-blur-xl rounded-3xl sm:rounded-[32px] p-6 sm:p-7 border border-white/90 ring-1 ring-rose-100/70 shadow-xl shadow-purple-900/5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:border-purple-200"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3.5 py-1 rounded-full bg-purple-50 text-purple-700 font-bengali text-xs font-semibold border border-purple-100">
                  {msg.title}
                </span>
                <button
                  onClick={() => handleCopy(msg.id, `${msg.content}\n\n${msg.quote || ''}`)}
                  className="p-2 rounded-2xl text-stone-400 hover:text-purple-600 hover:bg-purple-50 transition"
                  title="মেসেজ কপি করুন"
                >
                  {copiedId === msg.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <p className="font-bengali text-stone-800 text-sm sm:text-base leading-relaxed mb-4">
                "{msg.content}"
              </p>

              {msg.quote && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-50/80 to-purple-50/80 border border-rose-100 text-xs sm:text-sm text-purple-950 font-bengali italic">
                  ❝ {msg.quote} ❞
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-rose-100/60 flex items-center justify-between text-xs text-stone-400 font-bengali">
              <span className="flex items-center gap-1 text-purple-600 font-medium">
                <Heart className="w-3.5 h-3.5 fill-purple-600" />
                ভালোবাসার বার্তা
              </span>
              <button
                onClick={() => handleCopy(msg.id, `${msg.content}\n\n${msg.quote || ''}`)}
                className="text-purple-700 hover:underline font-semibold"
              >
                {copiedId === msg.id ? 'কপি হয়েছে!' : 'কপি করুন 📋'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Quick Wish Creator Box */}
      <div className="mt-10 p-6 sm:p-8 rounded-3xl sm:rounded-[36px] bg-white/80 backdrop-blur-xl border border-white/90 ring-1 ring-rose-100/70 shadow-2xl shadow-purple-950/5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h4 className="text-lg sm:text-xl font-bold font-serif-bengali text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600">
            ঝটপট উইশ ও রোমান্টিক বার্তা জেনারেটর
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-purple-700/80 font-bengali mb-4 font-medium">
          আপনার মনের অনুভূতির সুর নির্বাচন করুন এবং তাৎক্ষণিক বিশেষ উইশ তৈরি করুন:
        </p>

        <div className="flex flex-wrap gap-2.5 mb-4">
          <button
            onClick={() => handleGenerateSmartWish('sweet')}
            className="px-4 py-2 rounded-2xl bg-white hover:bg-rose-50 text-rose-800 text-xs sm:text-sm font-semibold border border-rose-200/80 transition active:scale-95 font-bengali shadow-sm"
          >
            🌸 মিষ্টি ও কিউট উইশ
          </button>
          <button
            onClick={() => handleGenerateSmartWish('poetic')}
            className="px-4 py-2 rounded-2xl bg-white hover:bg-purple-50 text-purple-800 text-xs sm:text-sm font-semibold border border-purple-200/80 transition active:scale-95 font-bengali shadow-sm"
          >
            📜 কাব্যিক ভালোবাসার উক্তি
          </button>
          <button
            onClick={() => handleGenerateSmartWish('deep')}
            className="px-4 py-2 rounded-2xl bg-white hover:bg-rose-50 text-rose-800 text-xs sm:text-sm font-semibold border border-rose-200/80 transition active:scale-95 font-bengali shadow-sm"
          >
            ❤️ গভীর আবেগঘন বার্তা
          </button>
          <button
            onClick={() => handleGenerateSmartWish('funny')}
            className="px-4 py-2 rounded-2xl bg-white hover:bg-pink-50 text-pink-800 text-xs sm:text-sm font-semibold border border-pink-200/80 transition active:scale-95 font-bengali shadow-sm"
          >
            😄 দুষ্টু-মিষ্টি উইশ
          </button>
        </div>

        <AnimatePresence>
          {generatedWish && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-rose-50/90 to-purple-50/90 border border-purple-200/80 shadow-md relative"
            >
              <p className="font-bengali text-stone-800 text-base leading-relaxed">
                "{generatedWish}"
              </p>
              <div className="mt-3 flex justify-end gap-2">
                <button
                  onClick={() => handleCopy('gen-wish', generatedWish)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white text-xs sm:text-sm font-semibold font-bengali shadow-md shadow-rose-500/20 transition active:scale-95"
                >
                  {copiedId === 'gen-wish' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>কপি করে পাঠাও</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
