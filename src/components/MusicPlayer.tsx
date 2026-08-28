import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTune, setCurrentTune] = useState<'romantic' | 'birthday'>('romantic');
  const [volume, setVolume] = useState(0.3);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      romanticAudio.stop();
      setIsPlaying(false);
    } else {
      romanticAudio.start(currentTune);
      romanticAudio.setVolume(volume);
      setIsPlaying(true);
    }
  };

  const handleTuneChange = (tune: 'romantic' | 'birthday') => {
    setCurrentTune(tune);
    romanticAudio.setMode(tune);
    if (!isPlaying) {
      romanticAudio.start(tune);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Floating Mini Player Button */}
      <button
        id="btn-music-toggle"
        onClick={toggleMusic}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl transition-all shadow-md active:scale-95 ${
          isPlaying
            ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white shadow-rose-500/25'
            : 'bg-white/80 backdrop-blur-md hover:bg-white text-rose-800 border border-rose-200/80'
        }`}
        title={isPlaying ? 'মিউজিক বন্ধ করুন' : 'রোমান্টিক ব্যাকগ্রাউন্ড মিউজিক চালু করুন'}
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : 'text-purple-600'}`} />
        <span className="hidden sm:inline text-xs font-semibold font-bengali">
          {isPlaying ? 'মিউজিক বাজছে 🎵' : 'মিউজিক চালান'}
        </span>

        {/* Animated Sound Waves */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-1 bg-white rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
            <span className="w-1 bg-white rounded-full animate-[pulse_0.4s_ease-in-out_infinite]" style={{ height: '80%' }} />
            <span className="w-1 bg-white rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '100%' }} />
          </div>
        )}
      </button>

      {/* Settings / Tune Switcher trigger */}
      <button
        id="btn-music-options"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
        className="ml-1.5 p-2 rounded-2xl bg-white/80 backdrop-blur-md hover:bg-white text-purple-700 border border-rose-200/80 shadow-sm transition active:scale-95"
        title="মিউজিক অপশন"
      >
        <Disc className={`w-4 h-4 ${isPlaying ? 'animate-spin text-purple-600' : ''}`} style={{ animationDuration: '6s' }} />
      </button>

      {/* Dropdown Menu */}
      {isOpenMenu && (
        <div className="absolute right-0 top-12 mt-1 w-64 p-4 rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl shadow-purple-950/10 border border-white/90 ring-1 ring-rose-100/80 z-50 text-stone-800">
          <div className="flex items-center justify-between pb-2 border-b border-rose-100 mb-3">
            <span className="text-xs font-bold text-rose-950 font-bengali">ব্যাকগ্রাউন্ড সুর নির্বাচন</span>
            <span className="text-[10px] text-purple-600 font-semibold">Web Audio</span>
          </div>

          <div className="space-y-2 mb-4 font-bengali text-xs">
            <button
              onClick={() => handleTuneChange('romantic')}
              className={`w-full text-left px-3.5 py-2.5 rounded-2xl transition flex items-center justify-between ${
                currentTune === 'romantic'
                  ? 'bg-purple-50 text-purple-900 font-bold border border-purple-200'
                  : 'hover:bg-rose-50/60 text-stone-600'
              }`}
            >
              <span>🎹 স্নিগ্ধ রোমান্টিক পিয়ানো</span>
              {currentTune === 'romantic' && <Sparkles className="w-3.5 h-3.5 text-purple-600" />}
            </button>

            <button
              onClick={() => handleTuneChange('birthday')}
              className={`w-full text-left px-3.5 py-2.5 rounded-2xl transition flex items-center justify-between ${
                currentTune === 'birthday'
                  ? 'bg-purple-50 text-purple-900 font-bold border border-purple-200'
                  : 'hover:bg-rose-50/60 text-stone-600'
              }`}
            >
              <span>🎂 হ্যাপি বার্থডে মেলোডি</span>
              {currentTune === 'birthday' && <Sparkles className="w-3.5 h-3.5 text-purple-600" />}
            </button>
          </div>

          {/* Volume Control */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-stone-600 font-bengali mb-1">
              <span>ভলিউম</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
              {volume === 0 ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4 text-purple-600" />}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full accent-purple-600 h-1.5 bg-rose-100 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
