import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { BirthdayStoryConfig } from '../../types';
import { audioManager } from '../../utils/audio';

interface Props {
  config: BirthdayStoryConfig;
  onNext: () => void;
}

export const Chapter1Curiosity: React.FC<Props> = ({ config, onNext }) => {
  const handleStart = () => {
    audioManager.startAmbientMusic();
    audioManager.playChime();
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-md mx-auto space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-400/25 text-amber-200 text-xl font-joined tracking-wide shadow-md">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>For {config.recipientName}</span>
        </div>

        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-6xl font-joined tracking-wide text-amber-100 leading-tight"
          >
            Hey {config.recipientName}...
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-3xl sm:text-4xl font-joined text-pink-200/95 leading-relaxed"
          >
            I made something very special for you.
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-xs sm:text-sm text-purple-200/60 max-w-xs mx-auto leading-relaxed"
        >
          {config.openingSubheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="pt-4"
        >
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-pink-400 to-rose-400 text-slate-950 font-semibold text-base shadow-[0_0_25px_rgba(251,191,36,0.3)] hover:shadow-[0_0_35px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-slate-900 group-hover:rotate-12 transition-transform" />
            <span>Open It ✦</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
