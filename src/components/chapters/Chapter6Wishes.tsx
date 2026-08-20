import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sun, Compass, Heart, ArrowRight } from 'lucide-react';
import { BirthdayStoryConfig, WishItem } from '../../types';
import { audioManager } from '../../utils/audio';

interface Props {
  config: BirthdayStoryConfig;
  onNext: () => void;
}

const getWishIcon = (name: string) => {
  switch (name) {
    case 'Sun': return <Sun className="w-5 h-5 text-amber-300" />;
    case 'Compass': return <Compass className="w-5 h-5 text-indigo-300" />;
    case 'Heart': return <Heart className="w-5 h-5 text-rose-300" />;
    default: return <Sparkles className="w-5 h-5 text-pink-300" />;
  }
};

export const Chapter6Wishes: React.FC<Props> = ({ config, onNext }) => {
  const [litWishIds, setLitWishIds] = useState<string[]>([]);
  const [activeWish, setActiveWish] = useState<WishItem | null>(null);

  const handleLightLantern = (wish: WishItem) => {
    audioManager.playChime();
    if (!litWishIds.includes(wish.id)) {
      setLitWishIds((prev) => [...prev, wish.id]);
    }
    setActiveWish(wish);
  };

  const handleNext = () => {
    audioManager.playPop();
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10 max-w-4xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3 mb-10"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-300/80 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
          Chapter 04 ✦ My Wishes For You
        </span>
        <h2 className="text-3xl sm:text-5xl font-joined text-amber-100 py-1">
          I hope this year gives you, Meher Manahil…
        </h2>
        <p className="text-xl text-purple-200/80 font-joined max-w-md mx-auto">
          Tap each floating sky lantern to release a wish for your upcoming year.
        </p>
      </motion.div>

      {/* Floating Lanterns Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-12">
        {config.wishes.map((wish, idx) => {
          const isLit = litWishIds.includes(wish.id);

          return (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: [0, idx % 2 === 0 ? -14 : -8, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: idx * 0.15 },
                y: { duration: 3.8 + idx * 0.7, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }
              }}
              onClick={() => handleLightLantern(wish)}
              className={`p-6 rounded-3xl border transition-all duration-500 cursor-pointer text-left relative overflow-hidden group ${
                isLit
                  ? 'bg-gradient-to-br from-amber-500/20 via-pink-500/15 to-purple-900/30 border-amber-300/50 shadow-[0_0_35px_rgba(251,191,36,0.3)]'
                  : 'bg-white/5 border-white/10 hover:border-amber-400/30 hover:bg-white/10'
              }`}
            >
              {/* Glowing lantern icon */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-3 rounded-2xl ${isLit ? 'bg-amber-400/20 text-amber-300 shadow-md animate-pulse' : 'bg-white/5 text-purple-300/60'}`}>
                  {getWishIcon(wish.iconName)}
                </div>
                <div>
                  <h3 className="text-2xl font-joined text-amber-100">{wish.title}</h3>
                  <p className="text-xs text-purple-200/60 font-joined text-sm">
                    {isLit ? '✨ Lantern Lit' : 'Tap to ignite lantern'}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-purple-100/85 leading-relaxed font-sans-clean pt-1">
                {wish.wishText}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Active Wish Modal */}
      <AnimatePresence>
        {activeWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveWish(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1c1530] border border-amber-300/40 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(251,191,36,0.5)]">
                {getWishIcon(activeWish.iconName)}
              </div>
              <h3 className="text-2xl font-serif-title text-amber-100">{activeWish.title}</h3>
              <p className="text-sm text-purple-100/90 leading-relaxed font-sans-clean bg-white/5 p-4 rounded-xl border border-white/10">
                "{activeWish.wishText}"
              </p>
              <button
                onClick={() => setActiveWish(null)}
                className="px-6 py-2.5 rounded-full bg-amber-400 text-slate-950 text-xs font-semibold hover:scale-105 transition-transform cursor-pointer"
              >
                Close Wish
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={handleNext}
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-400 to-rose-400 text-slate-950 font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>One Last Surprise</span>
          <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
