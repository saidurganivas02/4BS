import React from 'react';
import herbalifeTransparentSrc from '../../assets/herbalife-logo-transparent.png';
import herbalifeOriginalSrc from '../../assets/herbalife-logo.png';

interface HerbalifeLogoProps {
  variant?: 'full' | 'icon' | 'badge';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'light' | 'dark' | 'auto';
  alt?: string;
}

export const HerbalifeLogo: React.FC<HerbalifeLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  theme = 'auto',
  alt = 'Herbalife Nutrition',
}) => {
  // Height / sizing mapping
  const heightClasses = {
    xs: 'h-4',
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-11',
    xl: 'h-16',
  }[size];

  // Icon only dimensions
  const iconDimensions = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
    xl: 'w-16 h-16',
  }[size];

  if (variant === 'badge') {
    return (
      <div 
        className={`inline-flex items-center justify-center bg-white px-2.5 py-1 rounded-xl border border-slate-200/80 shadow-sm shrink-0 select-none ${className}`}
        title={alt}
      >
        <img
          src={herbalifeTransparentSrc}
          alt={alt}
          className={`${heightClasses} w-auto object-contain block`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = herbalifeOriginalSrc;
          }}
        />
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div 
        className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden ${iconDimensions} ${className}`}
        title={alt}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Circle */}
          <circle cx="50" cy="50" r="46" stroke="#76BC21" strokeWidth="7" fill="white" />
          
          {/* Trifold 3 Herbalife Leaves */}
          <g fill="#76BC21">
            {/* Center Vertical Leaf */}
            <path d="M 50 16 C 41 33 42 54 50 78 C 58 54 59 33 50 16 Z" />
            
            {/* Left Angled Leaf */}
            <path d="M 23 54 C 36 43 54 48 60 67 C 43 69 29 64 23 54 Z" />
            
            {/* Right Angled Leaf */}
            <path d="M 77 54 C 71 64 57 69 40 67 C 46 48 64 43 77 54 Z" />
          </g>
        </svg>
      </div>
    );
  }

  // Default 'full' variant
  return (
    <div className={`inline-flex items-center justify-center shrink-0 ${className}`} title={alt}>
      <img
        src={herbalifeTransparentSrc}
        alt={alt}
        className={`${heightClasses} w-auto object-contain block`}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = herbalifeOriginalSrc;
        }}
      />
    </div>
  );
};
