import React, { useState, useEffect } from 'react';
import { SECTIONS, INTRO_TEXT } from './constants';
import Section from './components/Section';
import { TraitRadarChart, AnxietyCycleDiagram, MechanismVisual, MorningRoutineVisual } from './components/Charts';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [viewMode, setViewMode] = useState<'detail' | 'simple'>('detail');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyPrompt = () => {
    const prompt = `
Please create a comprehensive, single-page infographic or illustration summarizing a "2025 Personal Retrospective".

**Visual Style & Tone:**
- **Background:** Warm Ivory (#FDFCF8) to match the website.
- **Color Palette:** Sage Green (#84A98C), Warm Wood (#8D7B68), Stone Gray (#57534E).
- **Mood:** Honest, warm, clean, organized, calm, and sincere. Avoid overly corporate or chaotic styles.
- **Style:** Hand-drawn line art mixed with flat design elements. High readability.

**Content to Visualize (Organize this into a cohesive layout):**

1. **Title:** "2025 Retrospective: A Journey of Finding Myself"
2. **Core Message:** ${INTRO_TEXT.replace(/\n/g, ' ')}

3. **Key Sections (Visualize these with icons and brief keywords):**
${SECTIONS.map(s => `   - **${s.title}**: ${s.subtitle}. Keywords: ${s.tags.join(', ')}. Content summary: ${s.content[0].substring(0, 50)}...`).join('\n')}

4. **Data Visualizations to Include:**
   - **Morning Routine Cycle:** Brushing -> Warm Water -> Yoga/Stretching.
   - **Mechanism Diagram:** A shift from "Shadow (Anxiety, Defensive)" to "Light (Sensitivity, Responsibility)".
   - **Energy Radar Chart:** High Sensitivity & Responsibility, lower Rest.
   - **Anxiety Loop:** Breaking the loop of "Trigger -> Anxiety -> Over-responsibility" and moving to "Pause -> Safety -> Boundaries".

**Composition:**
Arrange these elements in a balanced grid or a flowing journey map layout. Ensure the text is legible and the overall feeling is one of "calm achievement" and "warm encouragement".
    `;

    navigator.clipboard.writeText(prompt.trim());
    alert("이미지 생성용 프롬프트가 복사되었습니다! \nGemini 입력창에 붙여넣기(Ctrl+V) 하세요.");
  };

  return (
    <div className="min-h-screen bg-ivory font-sans selection:bg-sage-100 selection:text-sage-700">
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-3xl mx-auto px-6 flex justify-between items-center">
          <h1 className="font-serif text-xl font-bold text-stone-800">2025 Retrospective</h1>
          <span className="text-sm text-stone-500 font-medium hidden md:inline-block">나의 작동 원리와 회복의 기록</span>
        </div>
      </header>

      <main className="pt-24 pb-20">
        {/* Intro Section */}
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <div className="w-16 h-1 bg-sage-500 mb-8 rounded-full"></div>
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-6 leading-tight">
            조금 서툴러도 괜찮은,<br/>
            나를 찾아가는 여정
          </h2>
          <p className="font-essay text-lg md:text-xl text-stone-600 leading-loose whitespace-pre-line mb-10">
            {INTRO_TEXT}
          </p>

          {/* View Mode Tabs */}
          <div className="flex justify-center">
            <div className="bg-stone-100 p-1.5 rounded-full inline-flex relative">
              <button
                onClick={() => setViewMode('simple')}
                className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  viewMode === 'simple' 
                    ? 'bg-white text-stone-800 shadow-sm' 
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                간단하게 보기
              </button>
              <button
                onClick={() => setViewMode('detail')}
                className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  viewMode === 'detail' 
                    ? 'bg-white text-stone-800 shadow-sm' 
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                상세히 보기
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200"></div>

        {/* Dynamic Sections */}
        {SECTIONS.map((section, index) => {
          return (
            <Section 
              key={section.id} 
              data={section} 
              isLast={index === SECTIONS.length - 1}
              viewMode={viewMode}
            >
              {/* Inject visuals based on section ID */}
              
              {section.id === 'self' && (
                <div className="mt-8">
                  <MorningRoutineVisual />
                </div>
              )}

              {section.id === 'mechanism' && (
                <div className="flex flex-col gap-8 mt-8">
                  <MechanismVisual />
                  {/* Changed from grid to flex-col to stack vertically on all screens */}
                  <div className="flex flex-col gap-6">
                    <AnxietyCycleDiagram />
                    <TraitRadarChart />
                  </div>
                </div>
              )}
            </Section>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="bg-stone-100 py-16 border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-serif text-stone-600 text-lg mb-6 leading-relaxed">
            "2025년, 나를 지키며 치열하게 살아낸 자신이 자랑스럽습니다.<br className="hidden md:block" />
            내년에도 나만의 속도로 걸어갈 저를 온 마음으로 응원합니다."
          </p>
          <div className="flex justify-center gap-4 text-2xl mb-8 opacity-70">
            <span>🌱</span>
            <span>🏡</span>
            <span>🤖</span>
          </div>
          <div className="text-xs text-stone-400 space-y-2 mb-6">
            <p>2025 Personal Retrospective</p>
            <p>Designed with Honesty & Warmth</p>
          </div>
          
          <button 
            onClick={handleCopyPrompt}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-full text-xs font-medium text-stone-500 hover:text-sage-600 hover:border-sage-300 transition-colors shadow-sm"
          >
            ✨ 이미지 생성용 프롬프트 복사
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;