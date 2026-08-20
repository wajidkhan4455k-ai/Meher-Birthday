import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface AudioControlProps {
  onToggleMusic?: () => void;
}

export const AudioControl: React.FC<AudioControlProps> = () => {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggle = () => {
    const muted = audioManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs text-amber-100/90 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
        title={isMuted ? "Unmute Sound" : "Mute Sound"}
        aria-label="Toggle audio"
      >
        <Music className={`w-3.5 h-3.5 ${!isMuted ? 'text-pink-300 animate-pulse' : 'text-gray-400'}`} />
        <span>{isMuted ? 'Audio Off' : 'Sound On'}</span>
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-rose-300" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-amber-300" />
        )}
      </button>
    </div>
  );
};
