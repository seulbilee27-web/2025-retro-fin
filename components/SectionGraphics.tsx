import React, { useState } from 'react';

interface GraphicProps {
  id: string;
}

const SectionGraphic: React.FC<GraphicProps> = ({ id }) => {
  // Initialize 'intro' with the specific URL provided
  const [currentImage] = useState<string | null>(
    id === 'intro' 
      ? "https://sgimage.netmarble.com/images/netmarble/COMMON/20251219/toc21766124117682.PNG" 
      : null
  );

  const getPlaceholderGraphic = () => {
    switch (id) {
      case 'intro':
        return (
          <div className="flex flex-col items-center justify-center w-full h-full bg-stone-100/50 text-stone-400 p-8 border-2 border-dashed border-stone-200 rounded-xl">
             <div className="text-4xl mb-3">🖼️</div>
             <p className="text-sm font-medium text-stone-600 mb-1">인포그래픽 이미지</p>
          </div>
        );
      case 'self':
        return (
          <svg className="w-full h-auto opacity-60" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="320" fill="#FDFCF8"/>
            <path d="M550 0 L800 0 L800 320 L400 320 Z" fill="#F5F5F4"/>
            <path d="M200 200 C200 150 250 150 250 100" stroke="#8D7B68" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
            <path d="M180 220 H260 L250 270 C250 285 230 290 220 290 C210 290 190 285 190 270 L180 220 Z" fill="#FAFAF9" stroke="#57534E" strokeWidth="2"/>
          </svg>
        );
      case 'career':
        return (
          <svg className="w-full h-auto opacity-60" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="320" fill="#FDFCF8"/>
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F5F5F4" strokeWidth="1"/>
            </pattern>
            <rect width="800" height="320" fill="url(#grid)" />
            <rect x="320" y="120" width="60" height="60" rx="2" fill="#FAFAF9" stroke="#E7E5E4" strokeWidth="2"/>
            <path d="M150 250 C250 250 250 100 350 160 C450 220 500 80 650 80" stroke="#84A98C" strokeWidth="3" strokeLinecap="round" fill="none"/>
          </svg>
        );
      case 'health':
        return (
          <svg className="w-full h-auto opacity-60" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="320" fill="#FDFCF8"/>
            <circle cx="400" cy="160" r="120" fill="#ECF4E7" opacity="0.4"/>
            <ellipse cx="400" cy="240" rx="60" ry="15" fill="#57534E"/>
            <ellipse cx="400" cy="215" rx="50" ry="12" fill="#8D7B68"/>
            <ellipse cx="400" cy="195" rx="35" ry="10" fill="#E7E5E4" stroke="#D6D3D1"/>
            <ellipse cx="400" cy="178" rx="20" ry="6" fill="#84A98C"/>
          </svg>
        );
      case 'finance':
        return (
          <svg className="w-full h-auto opacity-60" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="320" fill="#FDFCF8"/>
            <rect x="250" y="240" width="300" height="10" rx="2" fill="#E7E5E4"/>
            <rect x="310" y="190" width="180" height="30" rx="2" fill="#8D7B68"/>
            <path d="M340 190 V140 L400 100 L460 140 V190" stroke="#FAFAF9" strokeWidth="2" fill="none" opacity="0.6"/>
            <circle cx="550" cy="100" r="30" fill="#FFE4BC" opacity="0.6"/>
          </svg>
        );
      case 'mechanism':
        return (
          <svg className="w-full h-auto opacity-60" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
             <rect width="800" height="320" fill="#FDFCF8"/>
             <path d="M100 160 C120 100 140 220 160 140 C180 200 200 120 250 160" stroke="#D6D3D1" strokeWidth="2" fill="none" strokeDasharray="4 4"/>
             <path d="M250 160 C300 200 350 200 400 160 C450 120 500 120 550 160 C600 200 650 200 700 160" stroke="#84A98C" strokeWidth="3" fill="none"/>
             <circle cx="400" cy="160" r="60" stroke="#E7E5E4" strokeWidth="1" fill="none"/>
          </svg>
        );
      case 'next':
        return (
           <svg className="w-full h-auto opacity-60" viewBox="0 0 800 320" fill="none" xmlns="http://www.w3.org/2000/svg">
             <rect width="800" height="320" fill="#FDFCF8"/>
             <path d="M300 280 V100 C300 100 300 80 400 80 C500 80 500 100 500 100 V280" stroke="#8D7B68" strokeWidth="2" fill="none"/>
             <path d="M350 280 L380 200 H420 L450 280" fill="#F5F5F4"/>
             <circle cx="400" cy="140" r="20" fill="#FFE4BC"/>
           </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative w-full bg-stone-50/50 rounded-2xl overflow-hidden mb-8 border border-stone-100/50 shadow-inner ${!currentImage ? 'min-h-[200px] md:min-h-[320px]' : ''}`}>
      {currentImage ? (
        <img 
          src={currentImage} 
          alt={`Graphic for ${id}`} 
          className="w-full h-auto block animate-fade-in"
        />
      ) : (
        <div className="w-full h-full absolute inset-0 flex items-center justify-center">
          {getPlaceholderGraphic()}
        </div>
      )}
    </div>
  );
};

export default SectionGraphic;