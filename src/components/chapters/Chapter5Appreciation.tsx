import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Sun, Shield, Smile, ArrowRight, Check } from 'lucide-react';
import { BirthdayStoryConfig, AppreciationItem } from '../../types';
import { audioManager } from '../../utils/audio';

interface Props {
  config: BirthdayStoryConfig;
  onNext: () => void;
}

const getIcon = (name: string) => {
  switch (name) {
    case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-300" />;
    case 'Heart': return <Heart className="w-5 h-5 text-pink-400" />;
    case 'Sun': return <Sun className="w-5 h-5 text-amber-400" />;
    case 'Shield': return <Shield className="w-5 h-5 text-purple-400" />;
    default: return <Smile className="w-5 h-5 text-rose-300" />;
  }
};

export const Chapter5Appreciation: React.FC<Props> = ({ config, onNext }) => {
  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const handleReveal = (item: AppreciationItem) => {
    if (!revealedIds.includes(item.id)) {
      audioManager.playPop();
      const updated = [...revealedIds, item.id];
      setRevealedIds(updated);
      if (updated.length === config.appreciations.length) {
        audioManager.playChime();
      }
    }
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
        className="space-y-3 mb-8"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-pink-300/80 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
          Chapter 03 ✦ Appreciation
        </span>
        <h2 className="text-3xl sm:text-5xl font-joined text-amber-100 py-1">
          Little things that make you, YOU, Meher Manahil.
        </h2>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{revealedIds.length} of {config.appreciations.length} Revealed</span>
        </div>
      </motion.div>

      {/* Grid of Appreciation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full mb-10">
        {config.appreciations.map((item, idx) => {
          const isRevealed = revealedIds.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: [0, idx % 2 === 0 ? -10 : -6, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: idx * 0.1 },
                y: { duration: 3.2 + idx * 0.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }
              }}
              onClick={() => handleReveal(item)}
              className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left overflow-hidden ${
                isRevealed
                  ? 'bg-gradient-to-br from-white/10 to-white/5 border-amber-300/40 shadow-xl shadow-pink-500/5'
                  : 'bg-white/5 border-white/10 hover:border-pink-400/40 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-300/80 uppercase tracking-widest">
                  Reason #{item.reasonNumber}
                </span>
                <div className={`p-2 rounded-full ${isRevealed ? 'bg-amber-400/20' : 'bg-white/5'}`}>
                  {isRevealed ? getIcon(item.iconName) : <Check className="w-4 h-4 text-purple-300/40" />}
                </div>
              </div>

              {!isRevealed ? (
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
                  <Sparkles className="w-6 h-6 text-pink-300/60 animate-pulse" />
                  <p className="text-lg text-purple-200/80 font-joined">
                    Tap to reveal reason #{item.reasonNumber}
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-2"
                >
                  <h3 className="text-2xl font-joined text-amber-100">{item.title}</h3>
                  <p className="text-xs text-purple-100/80 leading-relaxed font-sans-clean">
                    {item.description}
                  </p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={handleNext}
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-400 to-rose-400 text-slate-950 font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>My Wishes For You</span>
          <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
