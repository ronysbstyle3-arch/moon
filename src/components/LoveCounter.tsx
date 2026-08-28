import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Heart, Sparkles } from 'lucide-react';

interface LoveCounterProps {
  startDate?: string;
  wifeName?: string;
}

export const LoveCounter: React.FC<LoveCounterProps> = ({
  startDate = '2021-02-14',
  wifeName = 'আমার প্রিয়তমা'
}) => {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    years: 0,
    months: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diffMs = Math.max(0, now - start);

      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      const years = Math.floor(totalDays / 365.25);
      const remainingDaysAfterYears = totalDays - Math.floor(years * 365.25);
      const months = Math.floor(remainingDaysAfterYears / 30.44);
      const days = Math.floor(remainingDaysAfterYears % 30.44);

      setTimeTogether({
        days: totalDays,
        hours,
        minutes,
        seconds,
        years,
        months
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div id="love-time-counter-section" className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 p-6 sm:p-10 text-white shadow-2xl shadow-purple-900/20 border border-white/20">
        {/* Ambient subtle background icons */}
        <div className="absolute -right-6 -bottom-6 text-white/10 text-9xl font-script select-none">
          Love
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-semibold mb-4 shadow-sm">
            <Clock className="w-4 h-4 text-amber-200" />
            <span className="font-bengali">একসাথে পথচলার প্রতিটি সেকেন্ড</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-serif-bengali mb-2">
            {wifeName} ও আমার ভালোবাসার অমূল্য সময়
          </h3>
          <p className="text-xs sm:text-sm text-rose-100 font-bengali mb-8 font-medium">
            জীবনের প্রতিটি মুহূর্ত তোমার সাথে যেন নতুন এক বসন্ত
          </p>

          {/* Time Counter Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 sm:p-5 border border-white/25 shadow-lg">
              <span className="block text-3xl sm:text-4xl font-bold font-serif">
                {timeTogether.days}
              </span>
              <span className="text-xs font-semibold text-rose-100 font-bengali mt-1 block">
                মোট দিন (Days)
              </span>
            </div>

            <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 sm:p-5 border border-white/25 shadow-lg">
              <span className="block text-3xl sm:text-4xl font-bold font-serif">
                {timeTogether.hours.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold text-rose-100 font-bengali mt-1 block">
                ঘণ্টা (Hours)
              </span>
            </div>

            <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 sm:p-5 border border-white/25 shadow-lg">
              <span className="block text-3xl sm:text-4xl font-bold font-serif">
                {timeTogether.minutes.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold text-rose-100 font-bengali mt-1 block">
                মিনিট (Minutes)
              </span>
            </div>

            <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 sm:p-5 border border-white/25 shadow-lg">
              <span className="block text-3xl sm:text-4xl font-bold font-serif text-amber-200">
                {timeTogether.seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold text-rose-100 font-bengali mt-1 block">
                সেকেন্ড (Seconds)
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-rose-100 font-bengali">
            <Heart className="w-4 h-4 fill-rose-300 text-rose-300 animate-pulse" />
            <span>
              {timeTogether.years > 0 && `${timeTogether.years} বছর `}
              {timeTogether.months > 0 && `${timeTogether.months} মাস `}
              একসাথে কাটিয়েছি এবং সারাজীবন এভাবেই ভালোবাসবো
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
