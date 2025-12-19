import React, { useState, useEffect } from 'react';
import { SECTIONS, INTRO_TEXT } from './constants';
import Section from './components/Section';
import SectionGraphic from './components/SectionGraphics';
import { TraitRadarChart, AnxietyCycleDiagram, MechanismVisual, MorningRoutineVisual } from './components/Charts';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [viewMode, setViewMode] = useState<'detail' | 'simple'>('simple');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

      <main className="pt-24 pb-12">
        {/* Intro Section */}
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <div className="w-16 h-1 bg-sage-500 mb-8 rounded-full"></div>
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-6 leading-tight">
            조금 서툴러도 괜찮아,<br/>
            나를 찾아가는 여정
          </h2>
          <p className="font-essay text-lg md:text-xl text-stone-600 leading-loose whitespace-pre-line mb-10">
            {INTRO_TEXT}
          </p>

          {/* Intro Graphic */}
          <div className="mb-10">
            <SectionGraphic id="intro" />
          </div>

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
              {/* Inject visuals based on section ID and viewMode */}
              
              {section.id === 'self' && viewMode === 'detail' && (
                <div className="mt-8">
                  <MorningRoutineVisual />
                </div>
              )}

              {section.id === 'mechanism' && viewMode === 'detail' && (
                <div className="flex flex-col gap-8 mt-8">
                  <MechanismVisual />
                  <div className="flex flex-col gap-6">
                    <AnxietyCycleDiagram />
                    <TraitRadarChart />
                  </div>
                </div>
              )}
            </Section>
          );
        })}

        {/* Scroll To Top Button */}
        <div className="max-w-3xl mx-auto px-6 mt-8 flex justify-end">
          <button
            onClick={scrollToTop}
            className="px-5 py-2.5 bg-white border border-stone-200 text-stone-500 rounded-xl shadow-sm hover:bg-stone-50 hover:text-sage-700 hover:border-sage-200 transition-all text-sm font-medium flex items-center gap-2"
          >
            <span>▲</span>
            <span>맨 위로</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-100 py-16 border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-serif text-stone-600 text-lg mb-6 leading-relaxed">
            "2025년, 나를 지키며 치열하게 살아낸 내가 자랑스러워.<br className="hidden md:block" />
            내년에도 나만의 속도로 걸어갈 나를 온 마음으로 응원할게."
          </p>
          <div className="flex justify-center gap-4 text-2xl mb-8 opacity-70">
            <span>🌱</span>
            <span>🏡</span>
            <span>🤖</span>
          </div>
          <div className="text-xs text-stone-400 space-y-2">
            <p>2025 Personal Retrospective</p>
            <p>Designed with Honesty & Warmth</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
