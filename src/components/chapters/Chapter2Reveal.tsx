import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, ArrowRight } from 'lucide-react';
import { BirthdayStoryConfig } from '../../types';
import { audioManager } from '../../utils/audio';

interface Props {
  config: BirthdayStoryConfig;
  onNext: () => void;
}

export const Chapter2Reveal: React.FC<Props> = ({ config, onNext }) => {
  useEffect(() => {
    // Fire confetti celebration
    audioManager.playChime();

    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleNext = () => {
    audioManager.playPop();
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10 max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="space-y-8 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs font-semibold uppercase tracking-widest"
        >
          ✦ Wait... ✦
        </motion.div>

        <div className="space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl sm:text-4xl font-joined text-amber-200"
          >
            Today is completely yours.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-4xl sm:text-6xl font-joined font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-rose-200 drop-shadow-sm leading-tight py-2"
          >
            Happy Birthday, {config.recipientName}!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-sm sm:text-base text-purple-200/80 pt-2 font-light"
          >
            {config.birthdayDate} is special because <span className="text-amber-200 font-normal">you</span> came into the world.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 1.3 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }
          }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left space-y-3 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 text-amber-200 text-lg font-joined">
            <Heart className="w-4 h-4 fill-amber-300/30 text-amber-300" />
            <span>From {config.senderName}</span>
          </div>
          <p className="text-sm text-purple-100/85 leading-relaxed">
            I didn't want to just send a simple message that disappears in your inbox. I wanted to build a little quiet corner on the internet created just for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="pt-2"
        >
          <button
            onClick={handleNext}
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-amber-100 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            <span>A Little Message From Me</span>
            <ArrowRight className="w-4 h-4 text-pink-300 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
