import React, { useMemo } from 'react';

export const StarryBackground: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1.5}px`,
      delay: `${Math.random() * 4}s`,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#0c0817] via-[#120a21] to-[#0c0817]">
      {/* Soft color glow pools */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-pink-900/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-amber-900/15 rounded-full blur-3xl" />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-amber-100 animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            opacity: star.opacity,
            boxShadow: '0 0 6px rgba(255, 235, 180, 0.8)',
          }}
        />
      ))}
    </div>
  );
};
