import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface GraphicProps {
  id: string;
}

const SECTION_PROMPTS: Record<string, string> = {
  intro: "A warm, hand-drawn style infographic map illustrating a personal journey of 2025. Visual elements include a morning routine cycle, a radar chart of personality traits, and a path from anxiety to safety. Soft ivory background, sage green and warm wood colors. Text '2025 Retrospective' is visible.",
  self: "A photorealistic, warm and cozy living room corner. A comfortable beige fabric armchair with a soft blanket, a warm floor lamp casting a gentle glow, and a small wooden side table with a steaming white coffee cup. Soft ivory and warm wood tones. Minimalist and inviting atmosphere.",
  career: "A clean, modern workspace desk viewed from slightly above. An open laptop showing a clean interface, a neat notebook with a pen, and a small potted green plant. Soft, natural lighting with sage green accents. Professional and organized.",
  health: "A peaceful wellness scene. A yoga mat unrolled on a smooth wooden floor near a window with sheer white curtains. Morning sunlight streaming in. A glass of water nearby. Serene, calm, and healthy atmosphere.",
  finance: "A close-up still life representing home ownership. A pair of house keys resting on a wooden table next to a small, neat stack of gold coins and a simple planner notebook. Warm lighting, representing stability and security.",
  mechanism: "A zen-like composition representing balance and clarity. A perfectly balanced stack of smooth river stones (cairn) on a wooden surface, with a soft, blurred background. Represents peace, stability, and mindfulness.",
  next: "A view through a wide open door frame looking out onto a beautiful, bright landscape with green rolling hills and a rising sun in a blue sky. Symbolizing a bright future and new opportunities. Hopeful and uplifting."
};

const SectionGraphic: React.FC<GraphicProps> = ({ id }) => {
  // Initialize 'intro' with the specific URL provided
  const [currentImage, setCurrentImage] = useState<string | null>(
    id === 'intro' 
      ? "https://sgimage.netmarble.com/images/netmarble/COMMON/20251219/dkmf1766119473186.PNG" 
      : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI Image Generation
  const handleGenerateImage = async () => {
    if (!process.env.API_KEY) {
      alert("API Key가 설정되지 않았습니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = SECTION_PROMPTS[id] || "A warm, abstract background with soft colors.";

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {}
      });
      
      let imageUrl = null;
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            imageUrl = `data:image/png;base64,${base64EncodeString}`;
            break;
          }
        }
      }

      if (imageUrl) {
        setCurrentImage(imageUrl);
      } else {
        throw new Error("이미지를 생성하지 못했습니다.");
      }

    } catch (err) {
      console.error(err);
      setError("이미지 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // User File Upload
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result as string);
        setError(null);
      };
      reader.onerror = () => {
        setError("사진을 불러오는데 실패했습니다.");
      };
      reader.readAsDataURL(file);
    }
  };

  const getPlaceholderGraphic = () => {
    switch (id) {
      case 'intro':
        return (
          <div className="flex flex-col items-center justify-center w-full h-full bg-stone-100/50 text-stone-400 p-8 border-2 border-dashed border-stone-200 rounded-xl">
             <div className="text-4xl mb-3">🖼️</div>
             <p className="text-sm font-medium text-stone-600 mb-1">인포그래픽 이미지를 등록해주세요</p>
             <p className="text-xs text-stone-400">아래 '📷 내 사진 담기' 버튼을 눌러 이미지를 선택하세요</p>
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
    <div className={`relative group w-full bg-stone-50/50 rounded-2xl overflow-hidden mb-8 border border-stone-100/50 shadow-inner transition-all hover:shadow-md ${!currentImage ? 'min-h-[200px] md:min-h-[320px]' : ''}`}>
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

      {/* Control Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[1px] transition-all duration-300 ${currentImage ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
        <div className="flex gap-2">
          {/* AI Generation Button */}
          <button 
            onClick={handleGenerateImage}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-full shadow-sm text-stone-600 font-medium text-sm hover:bg-white hover:text-sage-700 hover:border-sage-300 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-sage-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>그리는 중...</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span>AI로 그리기</span>
              </>
            )}
          </button>

          {/* User Upload Button */}
          <button 
            onClick={handleUploadClick}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-full shadow-sm text-stone-600 font-medium text-sm hover:bg-white hover:text-stone-800 hover:border-stone-400 hover:scale-105 active:scale-95 transition-all"
          >
            <span>📷</span>
            <span>내 사진 담기</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      </div>
      
      {error && (
        <div className="absolute bottom-4 left-0 right-0 text-center px-4">
          <span className="inline-block px-3 py-1 bg-red-50 text-red-500 text-xs rounded-full border border-red-100 shadow-sm">
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

export default SectionGraphic;
