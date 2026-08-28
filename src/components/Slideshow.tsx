import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  Minimize2, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Heart, 
  Calendar,
  Tag,
  Check,
  X,
  Upload
} from 'lucide-react';
import { PhotoSlide } from '../types';

interface SlideshowProps {
  photos: PhotoSlide[];
  onUpdatePhotos: (photos: PhotoSlide[]) => void;
  speed?: number; // in seconds
  wifeName?: string;
}

type FrameStyle = 'polaroid' | 'rose-gold' | 'minimal' | 'cinematic';

export const Slideshow: React.FC<SlideshowProps> = ({
  photos,
  onUpdatePhotos,
  speed = 4,
  wifeName = 'আমার প্রিয়তমা'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [frameStyle, setFrameStyle] = useState<FrameStyle>('polaroid');
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<PhotoSlide>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying || photos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [isPlaying, photos.length, speed]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const newPhoto: PhotoSlide = {
            id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            url: result,
            caption: 'তোমার মিষ্টি হাসি ও ভালোবাসার মধুর স্মৃতি।',
            dateOrPlace: 'বিশেষ স্মৃতি',
            tag: 'স্মৃতি অ্যালবাম'
          };
          onUpdatePhotos([...photos, newPhoto]);
          setCurrentIndex(photos.length);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (photos.length <= 1) {
      alert('কমপক্ষে একটি ছবি থাকতে হবে!');
      return;
    }
    const updated = photos.filter((p) => p.id !== id);
    onUpdatePhotos(updated);
    if (currentIndex >= updated.length) {
      setCurrentIndex(0);
    }
  };

  const openEditModal = (photo: PhotoSlide, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(photo.id);
    setEditForm({ ...photo });
    setIsEditingModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    const updated = photos.map((p) => {
      if (p.id === editingId) {
        return {
          ...p,
          url: editForm.url || p.url,
          caption: editForm.caption || p.caption,
          dateOrPlace: editForm.dateOrPlace || p.dateOrPlace,
          tag: editForm.tag || p.tag
        };
      }
      return p;
    });
    onUpdatePhotos(updated);
    setIsEditingModalOpen(false);
    setEditingId(null);
  };

  const currentPhoto = photos[currentIndex] || photos[0];

  return (
    <div 
      id="photo-slideshow-section" 
      ref={containerRef}
      className={`relative w-full rounded-3xl sm:rounded-[36px] transition-all duration-300 ${
        isFullscreen 
          ? 'fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between p-6 sm:p-10' 
          : 'bg-white/75 backdrop-blur-xl border border-white/90 shadow-2xl shadow-purple-900/5 p-4 sm:p-8 ring-1 ring-rose-100/50'
      }`}
    >
      {/* Header & Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 text-white shadow-sm shadow-rose-500/20">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-bengali text-rose-950">
              {wifeName}-এর স্মৃতির অ্যালবাম
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-purple-700/80 mt-1 font-bengali font-medium">
            ছবি {currentIndex + 1} / {photos.length} • ভালোবাসার রঙিন মুহূর্তগুলো
          </p>
        </div>

        {/* Action buttons & Style switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Frame Style Selector */}
          {!isFullscreen && (
            <div className="hidden sm:flex items-center bg-rose-100/50 backdrop-blur-sm p-1 rounded-2xl text-xs font-medium text-rose-800 border border-rose-200/50">
              <button
                id="style-polaroid"
                onClick={() => setFrameStyle('polaroid')}
                className={`px-3 py-1.5 rounded-xl transition ${
                  frameStyle === 'polaroid' ? 'bg-white shadow-sm font-bold text-rose-900' : 'hover:text-purple-700'
                }`}
              >
                পোলারয়েড
              </button>
              <button
                id="style-rose-gold"
                onClick={() => setFrameStyle('rose-gold')}
                className={`px-3 py-1.5 rounded-xl transition ${
                  frameStyle === 'rose-gold' ? 'bg-white shadow-sm font-bold text-rose-900' : 'hover:text-purple-700'
                }`}
              >
                রোজ গোল্ড
              </button>
              <button
                id="style-cinematic"
                onClick={() => setFrameStyle('cinematic')}
                className={`px-3 py-1.5 rounded-xl transition ${
                  frameStyle === 'cinematic' ? 'bg-white shadow-sm font-bold text-rose-900' : 'hover:text-purple-700'
                }`}
              >
                সিনেমাটিক
              </button>
            </div>
          )}

          {/* Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
          <button
            id="btn-upload-photo"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-rose-500/20 transition active:scale-95"
            title="নতুন ছবি যুক্ত করুন"
          >
            <Upload className="w-4 h-4" />
            <span className="font-bengali">ছবি যোগ করুন</span>
          </button>

          {/* Fullscreen Button */}
          <button
            id="btn-toggle-fullscreen"
            onClick={handleToggleFullscreen}
            className="p-2.5 rounded-2xl bg-white/80 hover:bg-rose-50 text-rose-700 hover:text-purple-700 border border-rose-200/80 shadow-sm transition active:scale-95"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Slideshow'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slideshow Stage */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[560px] rounded-3xl overflow-hidden flex items-center justify-center bg-stone-900/5 border border-rose-100/50">
        <AnimatePresence mode="wait">
          {currentPhoto && (
            <motion.div
              key={currentPhoto.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="w-full h-full flex items-center justify-center p-2 sm:p-4"
            >
              {/* Frame Styles */}
              {frameStyle === 'polaroid' && !isFullscreen ? (
                <div className="bg-white p-3 sm:p-5 pb-8 sm:pb-12 rounded-[28px] sm:rounded-[36px] shadow-2xl border-[8px] sm:border-[12px] border-white ring-1 ring-rose-100/80 max-w-2xl w-full flex flex-col items-center rotate-[-0.5deg] hover:rotate-0 transition-transform duration-500">
                  {/* Polaroid Pin */}
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 border-2 border-white shadow-md -mt-6 mb-2 flex items-center justify-center">
                    <Heart className="w-2.5 h-2.5 text-white fill-white" />
                  </div>

                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100 shadow-inner group">
                    <img
                      src={currentPhoto.url}
                      alt={currentPhoto.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />

                    {/* Quick photo tools overlay */}
                    <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm p-1 rounded-xl">
                      <button
                        onClick={(e) => openEditModal(currentPhoto, e)}
                        className="p-1 text-white hover:text-rose-300 transition"
                        title="ক্যাপশন পরিবর্তন করুন"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDeletePhoto(currentPhoto.id, e)}
                        className="p-1 text-white hover:text-red-400 transition"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="mt-4 text-center px-4 w-full">
                    <p className="font-bengali text-stone-800 text-base sm:text-lg font-semibold leading-relaxed">
                      "{currentPhoto.caption}"
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-2 text-xs text-rose-500 font-medium">
                      {currentPhoto.dateOrPlace && (
                        <span className="flex items-center gap-1 text-purple-600">
                          <Calendar className="w-3 h-3" />
                          {currentPhoto.dateOrPlace}
                        </span>
                      )}
                      {currentPhoto.tag && (
                        <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-100 font-semibold">
                          <Tag className="w-3 h-3 text-purple-500" />
                          {currentPhoto.tag}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ) : frameStyle === 'rose-gold' && !isFullscreen ? (
                <div className="relative w-full max-w-3xl h-full rounded-3xl p-1.5 bg-gradient-to-tr from-amber-200 via-rose-300 to-purple-400 shadow-2xl shadow-purple-300/30">
                  <div className="w-full h-full rounded-[22px] overflow-hidden relative bg-stone-900 group">
                    <img
                      src={currentPhoto.url}
                      alt={currentPhoto.caption}
                      className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    {/* Bottom gradient overlay with caption */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 sm:p-6 text-white">
                      <p className="font-bengali text-lg sm:text-xl font-medium tracking-wide">
                        {currentPhoto.caption}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-rose-200">
                        {currentPhoto.dateOrPlace && <span>📍 {currentPhoto.dateOrPlace}</span>}
                        {currentPhoto.tag && <span className="bg-white/20 px-2 py-0.5 rounded-full">✨ {currentPhoto.tag}</span>}
                      </div>
                    </div>

                    <div className="absolute top-3 right-3 flex gap-1.5 bg-black/50 backdrop-blur-md p-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => openEditModal(currentPhoto, e)}
                        className="p-1 text-white hover:text-rose-300 transition"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDeletePhoto(currentPhoto.id, e)}
                        className="p-1 text-white hover:text-red-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Cinematic / Fullscreen Style */
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black flex items-center justify-center group shadow-2xl">
                  <img
                    src={currentPhoto.url}
                    alt={currentPhoto.caption}
                    className="w-full h-full object-contain sm:object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  
                  {/* Caption Bar */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-8 text-center text-white">
                    <motion.p 
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="font-serif-bengali text-xl sm:text-3xl font-semibold text-rose-100 drop-shadow-lg max-w-3xl mx-auto"
                    >
                      "{currentPhoto.caption}"
                    </motion.p>
                    <div className="flex items-center justify-center gap-3 mt-2 text-xs sm:text-sm text-rose-300 font-bengali">
                      {currentPhoto.dateOrPlace && <span>{currentPhoto.dateOrPlace}</span>}
                      {currentPhoto.tag && <span>• {currentPhoto.tag}</span>}
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2 bg-black/60 backdrop-blur-md p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => openEditModal(currentPhoto, e)}
                      className="p-1 text-white hover:text-rose-300 transition"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDeletePhoto(currentPhoto.id, e)}
                      className="p-1 text-white hover:text-red-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          id="btn-slide-prev"
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-white/90 hover:bg-white text-rose-600 hover:text-purple-600 shadow-xl backdrop-blur-md transition-all transform hover:scale-110 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          id="btn-slide-next"
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-white/90 hover:bg-white text-rose-600 hover:text-purple-600 shadow-xl backdrop-blur-md transition-all transform hover:scale-110 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Slide Progress & Playback Controls */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Play / Pause & Auto Progress Indicator */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            id="btn-toggle-play"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/90 hover:bg-rose-50 text-rose-900 hover:text-purple-700 text-xs sm:text-sm font-semibold border border-rose-200/80 shadow-sm transition"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-rose-900" />
                <span>পজ করুন</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-rose-900" />
                <span>চালু করুন</span>
              </>
            )}
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[200px] sm:max-w-xs">
            {photos.map((_, idx) => (
              <button
                key={idx}
                id={`dot-slide-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'w-7 bg-gradient-to-r from-rose-500 to-purple-600 shadow-sm' 
                    : 'w-2.5 bg-rose-200 hover:bg-purple-200'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Preview Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? 'border-rose-500 scale-105 shadow-md ring-2 ring-rose-300'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-shrink-0 w-12 h-12 rounded-lg border-2 border-dashed border-rose-300 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition"
            title="নতুন ছবি যুক্ত করুন"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Edit Photo Caption Modal */}
      <AnimatePresence>
        {isEditingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <h4 className="text-lg font-bold font-serif-bengali text-rose-950">
                  ছবির ক্যাপশন ও তথ্য পরিবর্তন করুন
                </h4>
                <button
                  onClick={() => setIsEditingModalOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mt-4 font-bengali">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ছবির ইউআরএল (Image URL)
                  </label>
                  <input
                    type="text"
                    value={editForm.url || ''}
                    onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-rose-400 outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ক্যাপশন / রোমান্টিক বার্তা
                  </label>
                  <textarea
                    rows={3}
                    value={editForm.caption || ''}
                    onChange={(e) => setEditForm({ ...editForm, caption: e.target.value })}
                    className="w-full text-sm px-3 py-2 border rounded-xl focus:ring-2 focus:ring-rose-400 outline-none"
                    placeholder="ছবির সাথে মিষ্টি কিছু কথা লিখুন..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      স্থান / তারিখ
                    </label>
                    <input
                      type="text"
                      value={editForm.dateOrPlace || ''}
                      onChange={(e) => setEditForm({ ...editForm, dateOrPlace: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-rose-400 outline-none"
                      placeholder="যেমন: কক্সবাজার ভ্রমণ"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ট্যাগ / শিরোনাম
                    </label>
                    <input
                      type="text"
                      value={editForm.tag || ''}
                      onChange={(e) => setEditForm({ ...editForm, tag: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-rose-400 outline-none"
                      placeholder="যেমন: ভালোবাসা"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 font-bengali">
                <button
                  onClick={() => setIsEditingModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm font-medium"
                >
                  বাতিল
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-md active:scale-95 transition"
                >
                  <Check className="w-4 h-4" />
                  সংরক্ষণ করুন
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
