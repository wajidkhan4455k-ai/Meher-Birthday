import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw, Edit3, Sparkles } from 'lucide-react';
import { BirthdayStoryConfig } from '../../types';
import { audioManager } from '../../utils/audio';

interface Props {
  config: BirthdayStoryConfig;
  onReplay: () => void;
  onOpenPersonalize: () => void;
}

export const Chapter8Finale: React.FC<Props> = ({ config, onReplay, onOpenPersonalize }) => {
  useEffect(() => {
    audioManager.playBirthdayJingle();

    const end = Date.now() + 3 * 1000;
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981']
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10 max-w-2xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-8 w-full"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-pink-400 to-rose-400 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(244,114,182,0.5)] animate-bounce">
          <Heart className="w-10 h-10 text-slate-950 fill-slate-950" />
        </div>

        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-joined font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-rose-200 leading-tight py-2"
          >
            Happy Birthday, {config.recipientName}! 🎂
          </motion.h1>

          <p className="text-2xl sm:text-3xl font-joined text-amber-200/95 leading-relaxed max-w-lg mx-auto">
            "Never forget how genuinely loved, appreciated, and special you are. Today and every single day."
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 text-purple-200/80 text-sm">
          <p className="font-joined text-2xl text-pink-300">
            With endless warmth & love,
          </p>
          <p className="font-joined text-3xl text-amber-100 pt-1">
            {config.senderName}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onReplay}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-400 to-rose-400 text-slate-950 font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-950" />
            <span>Replay Birthday Story ✦</span>
          </button>

          <button
            onClick={onOpenPersonalize}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-amber-200 font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-pink-300" />
            <span>Personalize Details</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
