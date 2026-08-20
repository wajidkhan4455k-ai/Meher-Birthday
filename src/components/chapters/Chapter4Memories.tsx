import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, ArrowRight, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { BirthdayStoryConfig, MemoryItem } from '../../types';
import { audioManager } from '../../utils/audio';

interface Props {
  config: BirthdayStoryConfig;
  onNext: () => void;
}

export const Chapter4Memories: React.FC<Props> = ({ config, onNext }) => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  const handleSelect = (mem: MemoryItem) => {
    audioManager.playPop();
    setSelectedMemory(mem);
  };

  const handleClose = () => {
    setSelectedMemory(null);
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
          Chapter 02 ✦ Memories
        </span>
        <h2 className="text-3xl sm:text-5xl font-joined text-amber-100 py-1">
          A few moments worth remembering…
        </h2>
        <p className="text-xl text-purple-200/80 max-w-md mx-auto font-joined">
          Tap any memory to read the little story behind it.
        </p>
      </motion.div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-12">
        {config.memories.map((mem, index) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, index % 2 === 0 ? -12 : -8, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: index * 0.15 },
              y: { duration: 3.5 + index * 0.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }
            }}
            onClick={() => handleSelect(mem)}
            className={`group relative bg-amber-50/95 p-3 pb-6 rounded-md shadow-2xl text-slate-800 transform transition-all duration-300 hover:scale-105 hover:-rotate-1 hover:z-20 cursor-pointer ${
              index % 2 === 0 ? '-rotate-1' : 'rotate-2'
            }`}
          >
            {/* Tape strip top center */}
            <div className="tape-strip absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 z-10" />

            {/* Photo frame */}
            <div className="aspect-[4/3] w-full overflow-hidden rounded bg-slate-200 relative mb-3">
              <img
                src={mem.imageUrl}
                alt={mem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Polaroid caption */}
            <div className="px-1 text-left space-y-1">
              <p className="font-joined text-xl font-bold text-slate-900 leading-tight">
                {mem.title}
              </p>
              <p className="text-[11px] text-slate-600 font-sans-clean line-clamp-2">
                {mem.caption}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 pt-1 font-sans-clean">
                <Calendar className="w-3 h-3 text-amber-600" />
                <span>{mem.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#181329] border border-amber-300/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5 text-left text-amber-100"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/40 border border-white/10">
                <img
                  src={selectedMemory.imageUrl}
                  alt={selectedMemory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedMemory.date}</span>
                  {selectedMemory.location && (
                    <>
                      <span>•</span>
                      <MapPin className="w-3.5 h-3.5 text-pink-400" />
                      <span>{selectedMemory.location}</span>
                    </>
                  )}
                </div>
                <h3 className="text-2xl font-serif-title text-amber-100">{selectedMemory.title}</h3>
              </div>

              <p className="text-sm text-purple-100/90 leading-relaxed font-sans-clean bg-white/5 p-4 rounded-xl border border-white/10">
                "{selectedMemory.detailedStory}"
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleClose}
                  className="px-5 py-2 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold hover:bg-amber-400/30 transition-all cursor-pointer"
                >
                  Close Note
                </button>
              </div>
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
          <span>Things I Appreciate About You</span>
          <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
