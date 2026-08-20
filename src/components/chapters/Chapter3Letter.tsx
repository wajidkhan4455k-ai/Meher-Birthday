import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { BirthdayStoryConfig } from '../../types';
import { audioManager } from '../../utils/audio';

interface Props {
  config: BirthdayStoryConfig;
  onNext: () => void;
}

export const Chapter3Letter: React.FC<Props> = ({ config, onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    audioManager.playChime();
    setIsOpen(true);
  };

  const handleNext = () => {
    audioManager.playPop();
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10 max-w-2xl mx-auto">
      <div className="w-full space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-300/80 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            Chapter 01 ✦ A Message From Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-joined text-amber-100 py-1">
            Dearest {config.recipientName},
          </h2>
        </motion.div>

        {!isOpen ? (
          /* Sealed Envelope View */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
            className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/15 backdrop-blur-xl shadow-2xl relative flex flex-col items-center gap-6 group hover:border-amber-400/40 transition-all"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500/20 to-pink-500/20 border border-amber-300/30 flex items-center justify-center relative shadow-inner">
              <Mail className="w-10 h-10 text-amber-200 group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center shadow-md">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-lg font-handwriting text-pink-200">
                A personal letter written just for you
              </p>
              <p className="text-xs text-purple-200/60 max-w-xs mx-auto">
                Tap below to break the wax seal and open your birthday message.
              </p>
            </div>

            <button
              onClick={handleOpenLetter}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-pink-400 text-slate-950 font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span>Open Letter ✦</span>
            </button>
          </motion.div>
        ) : (
          /* Unfolded Letter Content */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
              transition={{ duration: 0.6, y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } }}
              className="p-6 sm:p-10 rounded-3xl bg-[#171226]/90 border border-amber-300/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl text-left relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-pink-400 to-rose-400" />
              
              <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-joined text-2xl text-amber-200">For {config.recipientName}</h3>
                  <p className="text-sm text-purple-200/70 font-joined">{config.birthdayDate}</p>
                </div>
                <Heart className="w-5 h-5 text-pink-400 fill-pink-400/20" />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-purple-100/90 leading-relaxed font-sans-clean">
                {config.personalLetter.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="first-letter:text-2xl first-letter:font-joined first-letter:text-amber-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-purple-200/60 uppercase tracking-wider">With all my love,</p>
                  <p className="text-3xl font-joined text-pink-300 pt-1">{config.senderName}</p>
                </div>

                <button
                  onClick={handleNext}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-amber-100 text-xs font-semibold tracking-wide transition-all hover:scale-105 active:scale-95 cursor-pointer ml-auto"
                >
                  <span>Some Memories We Shared</span>
                  <ArrowRight className="w-4 h-4 text-pink-300 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
