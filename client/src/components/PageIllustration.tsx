import React from 'react';

export default function PageIllustration() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Top Center Glow Orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] rounded-full bg-gradient-to-tr from-purple-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />

      {/* Top Right Subtle Accent */}
      <div className="absolute top-24 right-[-10%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Mid Left Accent */}
      <div className="absolute top-[600px] left-[-8%] w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Subtle Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />
    </div>
  );
}
