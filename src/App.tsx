import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronLeft } from 'lucide-react';
import { BirthdayStoryConfig, StoryChapter } from './types';
import { DEFAULT_BIRTHDAY_CONFIG } from './data/defaultConfig';
import { StarryBackground } from './components/StarryBackground';
import { Chapter1Curiosity } from './components/chapters/Chapter1Curiosity';
import { Chapter2Reveal } from './components/chapters/Chapter2Reveal';
import { Chapter3Letter } from './components/chapters/Chapter3Letter';
import { Chapter4Memories } from './components/chapters/Chapter4Memories';
import { Chapter5Appreciation } from './components/chapters/Chapter5Appreciation';
import { Chapter6Wishes } from './components/chapters/Chapter6Wishes';
import { Chapter7CakeScratch } from './components/chapters/Chapter7CakeScratch';
import { Chapter8Finale } from './components/chapters/Chapter8Finale';

const CHAPTER_SEQUENCE: StoryChapter[] = [
  'curiosity',
  'reveal',
  'letter',
  'memories',
  'appreciation',
  'wishes',
  'cake_and_scratch',
  'finale'
];

export default function App() {
  const [config] = useState<BirthdayStoryConfig>(DEFAULT_BIRTHDAY_CONFIG);
  const [currentChapter, setCurrentChapter] = useState<StoryChapter>('curiosity');

  const currentIndex = CHAPTER_SEQUENCE.indexOf(currentChapter);

  const handleNextChapter = () => {
    if (currentIndex < CHAPTER_SEQUENCE.length - 1) {
      setCurrentChapter(CHAPTER_SEQUENCE[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevChapter = () => {
    if (currentIndex > 0) {
      setCurrentChapter(CHAPTER_SEQUENCE[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    setCurrentChapter('curiosity');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-[#f4efe6] overflow-x-hidden font-sans-clean select-none">
      {/* Background Starscape */}
      <StarryBackground />

      {/* Chapter Back Control (available from Chapter 2 onwards) */}
      {currentIndex > 0 && currentChapter !== 'finale' && (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={handlePrevChapter}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 text-xs text-purple-200 hover:text-white transition-all cursor-pointer shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-[11px]">Back</span>
          </button>
        </div>
      )}

      {/* Chapter Content Switcher */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {currentChapter === 'curiosity' && (
              <Chapter1Curiosity config={config} onNext={handleNextChapter} />
            )}
            {currentChapter === 'reveal' && (
              <Chapter2Reveal config={config} onNext={handleNextChapter} />
            )}
            {currentChapter === 'letter' && (
              <Chapter3Letter config={config} onNext={handleNextChapter} />
            )}
            {currentChapter === 'memories' && (
              <Chapter4Memories config={config} onNext={handleNextChapter} />
            )}
            {currentChapter === 'appreciation' && (
              <Chapter5Appreciation config={config} onNext={handleNextChapter} />
            )}
            {currentChapter === 'wishes' && (
              <Chapter6Wishes config={config} onNext={handleNextChapter} />
            )}
            {currentChapter === 'cake_and_scratch' && (
              <Chapter7CakeScratch config={config} onNext={handleNextChapter} />
            )}
            {currentChapter === 'finale' && (
              <Chapter8Finale
                config={config}
                onReplay={handleReplay}
                onOpenPersonalize={() => {}}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Progress Tracker (shown during story) */}
      {currentIndex > 0 && currentChapter !== 'finale' && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] text-amber-200/80 shadow-md">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Part {currentIndex} of {CHAPTER_SEQUENCE.length - 1}</span>
        </div>
      )}
    </div>
  );
}
