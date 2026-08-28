import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Settings2, Heart, Save, RotateCcw, Palette, User, Calendar, Sliders, Check } from 'lucide-react';
import { CelebrationSettings } from '../types';
import { DEFAULT_SETTINGS } from '../data/defaultContent';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CelebrationSettings;
  onSave: (newSettings: CelebrationSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [formData, setFormData] = useState<CelebrationSettings>({ ...settings });
  const [activeTab, setActiveTab] = useState<'profile' | 'letter' | 'theme'>('profile');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSavedNotice(true);
    setTimeout(() => {
      setIsSavedNotice(false);
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    if (confirm('আপনি কি ডিফল্ট সেটিংসে ফিরে যেতে চান?')) {
      setFormData({ ...DEFAULT_SETTINGS });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="bg-white/95 backdrop-blur-2xl rounded-3xl sm:rounded-[36px] max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-white/90 ring-1 ring-rose-100/80 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-rose-50/90 via-pink-50/80 to-purple-50/90 border-b border-rose-100/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 text-white shadow-md shadow-rose-500/20">
              <Settings2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-bengali text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600">
                বার্থডে সেলিব্রেশন কাস্টমাইজ করুন
              </h3>
              <p className="text-xs text-purple-700/80 font-bengali font-medium">
                বউয়ের নাম, বিশেষ চিঠি এবং থিম পরিবর্তন করুন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-rose-50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-rose-100 px-6 bg-white/60">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold font-bengali border-b-2 transition ${
              activeTab === 'profile'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-stone-500 hover:text-purple-600'
            }`}
          >
            <User className="w-4 h-4" />
            <span>নাম ও তারিখ</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('letter')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold font-bengali border-b-2 transition ${
              activeTab === 'letter'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-stone-500 hover:text-purple-600'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>প্রেমপত্র এডিটর</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-semibold font-bengali border-b-2 transition ${
              activeTab === 'theme'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-stone-500 hover:text-purple-600'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>থিম ও স্পিড</span>
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 font-bengali flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  বউয়ের নাম (Wife's Full/Display Name)
                </label>
                <input
                  type="text"
                  value={formData.wifeName}
                  onChange={(e) => setFormData({ ...formData, wifeName: e.target.value })}
                  className="w-full text-sm px-4 py-2.5 rounded-2xl border border-rose-200/80 focus:ring-2 focus:ring-purple-400 outline-none"
                  placeholder="যেমন: তানজিলা"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  ডাকার নাম / মিষ্টি নাম (Nickname)
                </label>
                <input
                  type="text"
                  value={formData.wifeNickname}
                  onChange={(e) => setFormData({ ...formData, wifeNickname: e.target.value })}
                  className="w-full text-sm px-4 py-2.5 rounded-2xl border border-rose-200/80 focus:ring-2 focus:ring-purple-400 outline-none"
                  placeholder="যেমন: জানপাখি / প্রিয়তমা"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  আপনার নাম (Husband's Signature Name)
                </label>
                <input
                  type="text"
                  value={formData.husbandName}
                  onChange={(e) => setFormData({ ...formData, husbandName: e.target.value })}
                  className="w-full text-sm px-4 py-2.5 rounded-2xl border border-rose-200/80 focus:ring-2 focus:ring-purple-400 outline-none"
                  placeholder="যেমন: তোমার রনি"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    জন্মদিন (Birthday Date)
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full text-sm px-4 py-2.5 rounded-2xl border border-rose-200/80 focus:ring-2 focus:ring-purple-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    সম্পর্ক / বিয়ের শুরু (Anniversary Date)
                  </label>
                  <input
                    type="date"
                    value={formData.relationshipStartDate || '2021-02-14'}
                    onChange={(e) => setFormData({ ...formData, relationshipStartDate: e.target.value })}
                    className="w-full text-sm px-4 py-2.5 rounded-2xl border border-rose-200/80 focus:ring-2 focus:ring-purple-400 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  চিঠির সম্বোধন (Salutation)
                </label>
                <input
                  type="text"
                  value={formData.loveLetterSalutation}
                  onChange={(e) => setFormData({ ...formData, loveLetterSalutation: e.target.value })}
                  className="w-full text-sm px-4 py-2.5 rounded-2xl border border-rose-200/80 focus:ring-2 focus:ring-purple-400 outline-none"
                  placeholder="যেমন: আমার জীবনের সবচেয়ে মিষ্টি মানুষ,"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  হৃদয়ের প্রেমবার্তা (Custom Love Letter)
                </label>
                <textarea
                  rows={6}
                  value={formData.customLetter}
                  onChange={(e) => setFormData({ ...formData, customLetter: e.target.value })}
                  className="w-full text-sm px-4 py-2.5 rounded-2xl border border-rose-200/80 focus:ring-2 focus:ring-purple-400 outline-none leading-relaxed"
                  placeholder="আপনার মনের সমস্ত ভালোবাসা দিয়ে লিখুন..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  চিঠির সমাপ্তি বাক্য (Closing Signature)
                </label>
                <input
                  type="text"
                  value={formData.loveLetterClosing}
                  onChange={(e) => setFormData({ ...formData, loveLetterClosing: e.target.value })}
                  className="w-full text-sm px-4 py-2.5 rounded-2xl border border-rose-200/80 focus:ring-2 focus:ring-purple-400 outline-none"
                  placeholder="যেমন: চিরকাল তোমার ভালোবাসায় আবদ্ধ,"
                />
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  কালার প্যালেট থিম (Color Theme)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'rose', label: 'ভাইব্র্যান্ট প্যালেট (Vibrant)', color: 'from-rose-500 via-pink-500 to-purple-600' },
                    { id: 'lavender', label: 'স্টারলাইট ল্যাভেন্ডার', color: 'from-purple-500 to-indigo-500' },
                    { id: 'golden', label: 'গোল্ডেন সানসেট', color: 'from-amber-500 to-rose-500' },
                    { id: 'cherry', label: 'চেরি ব্লসম', color: 'from-pink-500 to-red-400' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, theme: t.id as any })}
                      className={`p-3 rounded-2xl border flex items-center gap-2.5 text-left transition ${
                        formData.theme === t.id
                          ? 'border-purple-600 bg-purple-50/70 shadow-sm'
                          : 'border-stone-200 hover:border-purple-300'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-gradient-to-tr ${t.color} shadow`} />
                      <span className="text-xs font-semibold text-stone-800">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-stone-700">
                    স্লাইডশো পরিবর্তনের গতি (Slideshow Speed)
                  </label>
                  <span className="text-xs font-semibold text-purple-600">
                    {formData.slideshowSpeed} সেকেন্ড
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="1"
                  value={formData.slideshowSpeed}
                  onChange={(e) => setFormData({ ...formData, slideshowSpeed: parseInt(e.target.value) })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-rose-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-purple-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ডিফল্ট রিসেট</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-2xl text-stone-600 hover:bg-rose-50/60 text-xs sm:text-sm font-medium"
              >
                বাতিল
              </button>
              <button
                type="submit"
                id="btn-save-settings"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-rose-500/20 active:scale-95 transition"
              >
                {isSavedNotice ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>সংরক্ষিত!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>সেভ করুন</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
