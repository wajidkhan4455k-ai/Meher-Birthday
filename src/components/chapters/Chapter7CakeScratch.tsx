import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Flame, Mic, MicOff, Gift, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { BirthdayStoryConfig } from '../../types';
import { audioManager } from '../../utils/audio';

interface Props {
  config: BirthdayStoryConfig;
  onNext: () => void;
}

export const Chapter7CakeScratch: React.FC<Props> = ({ config, onNext }) => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [isMicListening, setIsMicListening] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isScratched, setIsScratched] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  const allCandlesOut = candlesLit.every((lit) => !lit);

  // Handle candle blow
  const handleBlowCandle = (index: number) => {
    if (candlesLit[index]) {
      const updated = [...candlesLit];
      updated[index] = false;
      setCandlesLit(updated);
      audioManager.playPop();

      if (updated.every((l) => !l)) {
        triggerCandleBlowCelebration();
      }
    }
  };

  const handleBlowAll = () => {
    setCandlesLit([false, false, false]);
    triggerCandleBlowCelebration();
  };

  const triggerCandleBlowCelebration = () => {
    audioManager.playCandleBlow();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Microphone blow detection
  const startMicListener = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsMicListening(true);
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkAudio = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        // Threshold for wind/blowing sound into mic
        if (average > 65) {
          handleBlowAll();
          stream.getTracks().forEach((track) => track.stop());
          setIsMicListening(false);
          return;
        }

        if (stream.active) {
          requestAnimationFrame(checkAudio);
        }
      };

      checkAudio();
    } catch {
      setIsMicListening(false);
    }
  };

  // Scratch Canvas Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw scratchable metallic top layer
    ctx.fillStyle = '#2d2442';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '16px "Caveat", cursive';
    ctx.fillStyle = '#f59e0b';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch here with your finger/mouse ✨', canvas.width / 2, canvas.height / 2);
  }, []);

  const handleScratchMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current && e.type !== 'touchmove') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch percentage
    setScratchProgress((prev) => {
      const next = prev + 3;
      if (next >= 60 && !isScratched) {
        setIsScratched(true);
        audioManager.playChime();
      }
      return next;
    });
  };

  const handleRevealScratch = () => {
    setIsScratched(true);
    audioManager.playChime();
  };

  const handleNext = () => {
    audioManager.playPop();
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10 max-w-3xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3 mb-8"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-pink-300/80 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
          Chapter 05 ✦ Make A Wish & Scratch Voucher
        </span>
        <h2 className="text-3xl sm:text-5xl font-joined text-amber-100 py-1">
          Time to blow out your candles, Meher Manahil! 🎂
        </h2>
        <p className="text-xl text-purple-200/80 font-joined max-w-md mx-auto">
          Tap each candle to blow it out, or enable your mic to blow into your device!
        </p>
      </motion.div>

      {/* Interactive Birthday Cake */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl w-full mb-10 flex flex-col items-center gap-6 shadow-2xl relative"
      >
        <div className="relative flex flex-col items-center pt-8">
          {/* Candle Flames */}
          <div className="flex gap-8 mb-2 z-10">
            {candlesLit.map((lit, idx) => (
              <div
                key={idx}
                onClick={() => handleBlowCandle(idx)}
                className="flex flex-col items-center cursor-pointer group"
                title="Tap to blow out candle"
              >
                {lit ? (
                  <div className="relative mb-1">
                    <div className="w-4 h-6 bg-gradient-to-t from-amber-500 to-yellow-200 rounded-full animate-flame shadow-[0_0_15px_rgba(255,180,50,0.9)]" />
                    <Sparkles className="w-3 h-3 text-amber-300 absolute -top-2 -right-2 animate-ping" />
                  </div>
                ) : (
                  <div className="w-2 h-4 bg-gray-500/40 rounded-full mb-1 animate-pulse">
                    <span className="text-[10px] text-gray-400 font-serif">💨</span>
                  </div>
                )}
                <div className="w-2.5 h-10 bg-gradient-to-b from-pink-300 to-rose-400 rounded-sm shadow-sm" />
              </div>
            ))}
          </div>

          {/* Cake Layers */}
          <div className="w-48 sm:w-64 h-16 bg-gradient-to-r from-pink-400 via-rose-300 to-amber-200 rounded-t-3xl border-b-4 border-pink-500 shadow-md flex items-center justify-center relative">
            <div className="text-sm font-joined text-slate-900 font-bold px-4 py-1 rounded-full bg-white/70 shadow-sm">
              {allCandlesOut ? '✨ Wish Made! ✨' : `Happy Birthday ${config.recipientName}`}
            </div>
          </div>
          <div className="w-56 sm:w-72 h-14 bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300 rounded-b-2xl shadow-xl flex items-center justify-center">
            <div className="w-full h-2 bg-white/40" />
          </div>
        </div>

        {/* Blow Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {!allCandlesOut && (
            <>
              <button
                onClick={handleBlowAll}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/30 text-xs font-semibold transition-all cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-300" />
                <span>Blow All Candles</span>
              </button>

              <button
                onClick={startMicListener}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                  isMicListening
                    ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 text-purple-200 border-white/20'
                }`}
              >
                {isMicListening ? <Mic className="w-4 h-4 text-white" /> : <MicOff className="w-4 h-4 text-purple-300" />}
                <span>{isMicListening ? 'Listening... Blow into Mic!' : 'Use Microphone to Blow'}</span>
              </button>
            </>
          )}

          {allCandlesOut && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>All candles blown out! May your wishes come true.</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Interactive Scratch-off Voucher */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="p-6 rounded-3xl bg-gradient-to-br from-purple-900/40 via-slate-900/60 to-pink-900/30 border border-amber-300/30 w-full mb-10 text-center space-y-4 shadow-2xl relative overflow-hidden"
      >
        <div className="flex items-center justify-center gap-2 text-amber-300">
          <Gift className="w-5 h-5 text-pink-400" />
          <h3 className="font-joined text-2xl text-amber-100">{config.scratchSurpriseTitle}</h3>
        </div>

        <div className="relative max-w-md mx-auto h-28 rounded-2xl overflow-hidden border border-amber-300/30 bg-amber-100/90 text-slate-900 flex items-center justify-center p-4 shadow-inner">
          {/* Revealed Voucher Message */}
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-widest bg-amber-300/60 px-2 py-0.5 rounded">
              Official Birthday Gift Voucher
            </span>
            <p className="font-handwriting text-lg sm:text-xl font-bold text-slate-950 leading-tight">
              {config.scratchSurpriseMessage}
            </p>
          </div>

          {/* Scratch Canvas Overlay */}
          {!isScratched && (
            <canvas
              ref={canvasRef}
              width={380}
              height={110}
              onMouseDown={() => (isDrawing.current = true)}
              onMouseUp={() => (isDrawing.current = false)}
              onMouseMove={handleScratchMove}
              onTouchStart={() => (isDrawing.current = true)}
              onTouchEnd={() => (isDrawing.current = false)}
              onTouchMove={handleScratchMove}
              className="absolute inset-0 w-full h-full cursor-crosshair rounded-2xl touch-none"
            />
          )}
        </div>

        {!isScratched ? (
          <button
            onClick={handleRevealScratch}
            className="text-xs text-amber-300/80 hover:text-amber-200 underline font-handwriting text-base cursor-pointer"
          >
            Or tap here to reveal voucher automatically ✦
          </button>
        ) : (
          <p className="text-xs text-emerald-300 font-handwriting text-base">
            ✨ Voucher Revealed! Redeemable anytime with {config.senderName}.
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={handleNext}
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-400 to-rose-400 text-slate-950 font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Happy Birthday! ✨</span>
          <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
