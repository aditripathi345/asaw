import React from 'react';

interface AnimatedCheckmarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'emerald' | 'blue' | 'amber';
  className?: string;
}

export const AnimatedCheckmark: React.FC<AnimatedCheckmarkProps> = ({
  size = 'md',
  variant = 'emerald',
  className = '',
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', svg: 'w-5 h-5', stroke: 2.5 },
    md: { box: 'w-14 h-14', svg: 'w-8 h-8', stroke: 3 },
    lg: { box: 'w-16 h-16', svg: 'w-10 h-10', stroke: 3.5 },
    xl: { box: 'w-20 h-20', svg: 'w-12 h-12', stroke: 4 },
  };

  const colorVariants = {
    emerald: {
      bg: 'bg-emerald-50 border-emerald-200/80',
      ring: 'stroke-emerald-500',
      check: 'stroke-emerald-600',
      glow: 'shadow-emerald-500/20',
    },
    blue: {
      bg: 'bg-blue-50 border-blue-200/80',
      ring: 'stroke-blue-500',
      check: 'stroke-blue-600',
      glow: 'shadow-blue-500/20',
    },
    amber: {
      bg: 'bg-amber-50 border-amber-200/80',
      ring: 'stroke-amber-500',
      check: 'stroke-amber-600',
      glow: 'shadow-amber-500/20',
    },
  };

  const currentSize = sizeMap[size];
  const currentVariant = colorVariants[variant];

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full border shadow-lg ${currentSize.box} ${currentVariant.bg} ${currentVariant.glow} animate-scale-pop ${className}`}
    >
      {/* Subtle pulsing background ripple */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-emerald-400 pointer-events-none" />

      <svg
        className={`${currentSize.svg} overflow-visible`}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Animated Circle Drawing */}
        <circle
          cx="26"
          cy="26"
          r="24"
          className={`${currentVariant.ring} animate-checkmark-circle`}
          strokeWidth={currentSize.stroke}
          strokeLinecap="round"
          fill="none"
        />

        {/* Animated Checkmark Drawing */}
        <path
          d="M14.5 27L22.5 35L38 18"
          className={`${currentVariant.check} animate-checkmark-check`}
          strokeWidth={currentSize.stroke + 0.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
};
