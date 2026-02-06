import React from 'react';

interface GlassBorderCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassBorderCardTailwind = ({ children, className = '' }: GlassBorderCardProps) => {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-3xl p-8
        bg-[rgba(42,42,42,0.8)]
        before:absolute before:inset-0 before:rounded-3xl before:p-[2px]
        before:bg-gradient-to-br before:from-white/10 before:via-white/30 before:to-white/10
        before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
        before:[mask-composite:exclude] before:[-webkit-mask-composite:xor]
        before:pointer-events-none
        after:absolute after:inset-0 after:rounded-3xl
        after:bg-gradient-to-br after:from-white/5 after:via-white/15 after:to-white/5
        after:backdrop-blur-[10px] after:opacity-45 after:pointer-events-none
        shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_0_rgba(255,255,255,0.1)]
        ${className}
      `}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassBorderCardTailwind;