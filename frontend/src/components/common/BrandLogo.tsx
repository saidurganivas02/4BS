import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md', 
  className = '',
  showBadge = true
}) => {
  const dimensions = {
    sm: { container: 'w-8 h-8 rounded-xl', px: 32 },
    md: { container: 'w-10 h-10 rounded-2xl', px: 40 },
    lg: { container: 'w-14 h-14 rounded-2xl', px: 56 },
    xl: { container: 'w-20 h-20 rounded-3xl', px: 80 },
  };

  const current = dimensions[size];

  return (
    <div 
      className={`relative ${current.container} flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30 group-hover:shadow-blue-500/50 group-hover:scale-105 transition-all duration-300 overflow-hidden ring-1 ring-white/25 select-none ${className}`}
      title="Suresh Pepakayala Enterprises"
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Royal Blue Gradient */}
          <linearGradient id="spBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="45%" stopColor="#2563EB" />
            <stop offset="85%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* Diagonal Glass Sheen Reflection */}
          <linearGradient id="spSheenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Letter Gradient: Metallic Frosted White */}
          <linearGradient id="spTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Golden Spark Accent Gradient */}
          <linearGradient id="spSparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Drop shadow for letters */}
          <filter id="spDropShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#0F172A" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Squircle Background */}
        <rect width="100" height="100" rx="28" fill="url(#spBgGrad)" />

        {/* Ambient Top Highlight Arc */}
        <path 
          d="M 12 12 Q 50 4 88 12 Q 50 26 12 12 Z" 
          fill="#FFFFFF" 
          opacity="0.22" 
        />

        {/* Diagonal Specular Sheen */}
        <path 
          d="M 0 0 L 70 0 L 0 70 Z" 
          fill="url(#spSheenGrad)" 
        />

        {/* Inner Fine Border */}
        <rect 
          x="1" 
          y="1" 
          width="98" 
          height="98" 
          rx="27" 
          stroke="#FFFFFF" 
          strokeWidth="2" 
          strokeOpacity="0.2" 
        />

        {/* Stylized Monogram "SP" */}
        <g filter="url(#spDropShadow)">
          {/* S Letter */}
          <text 
            x="32" 
            y="66" 
            fontFamily="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" 
            fontWeight="900" 
            fontSize="46" 
            fontStyle="italic"
            letterSpacing="-1"
            fill="url(#spTextGrad)" 
            textAnchor="middle"
          >
            S
          </text>

          {/* P Letter */}
          <text 
            x="64" 
            y="66" 
            fontFamily="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" 
            fontWeight="900" 
            fontSize="46" 
            fontStyle="italic"
            letterSpacing="-1"
            fill="url(#spTextGrad)" 
            textAnchor="middle"
          >
            P
          </text>

          {/* Golden Prestige Diamond Spark at Upper Right */}
          <circle cx="83" cy="30" r="4.5" fill="url(#spSparkGrad)" />
          <path 
            d="M 83 23 L 84.5 28.5 L 90 30 L 84.5 31.5 L 83 37 L 81.5 31.5 L 76 30 L 81.5 28.5 Z" 
            fill="#FEF08A" 
            opacity="0.9"
          />
        </g>
      </svg>
    </div>
  );
};
