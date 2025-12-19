import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const traitData = [
  { subject: '섬세함 (Sensitivity)', A: 95, fullMark: 100 },
  { subject: '책임감 (Responsibility)', A: 90, fullMark: 100 },
  { subject: '행동력 (Action)', A: 85, fullMark: 100 },
  { subject: '회복탄력성 (Resilience)', A: 60, fullMark: 100 },
  { subject: '휴식 (Rest)', A: 50, fullMark: 100 },
];

export const TraitRadarChart: React.FC = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px] bg-stone-50 rounded-2xl p-4 border border-stone-200 shadow-sm">
      <h3 className="text-center text-stone-600 font-serif mb-4">나의 에너지 지표</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={traitData}>
          <PolarGrid stroke="#E7E5E4" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#57534E', fontSize: 12, fontFamily: 'sans-serif' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="My Traits"
            dataKey="A"
            stroke="#52796F"
            strokeWidth={2}
            fill="#84A98C"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const MorningRoutineVisual: React.FC = () => {
  return (
    <div className="w-full bg-ivory rounded-xl p-6 border border-stone-200 shadow-sm mb-8">
      <h3 className="text-center text-stone-600 font-serif mb-6">나를 지키는 아침 의식</h3>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
        <div className="flex flex-col items-center group">
           <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-2xl border border-blue-100 mb-2 transition-transform group-hover:scale-110">
             🪥
           </div>
           <span className="text-sm text-stone-600 font-medium">양치하기</span>
        </div>
        
        <div className="hidden md:block w-full h-0.5 bg-stone-200 mx-2"></div>
        <div className="md:hidden h-8 w-0.5 bg-stone-200 my-1"></div>

        <div className="flex flex-col items-center group">
           <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-2xl border border-orange-100 mb-2 transition-transform group-hover:scale-110">
             🍵
           </div>
           <span className="text-sm text-stone-600 font-medium">따뜻한 물</span>
        </div>

        <div className="hidden md:block w-full h-0.5 bg-stone-200 mx-2"></div>
        <div className="md:hidden h-8 w-0.5 bg-stone-200 my-1"></div>

        <div className="flex flex-col items-center group">
           <div className="w-16 h-16 rounded-full bg-sage-50 flex items-center justify-center text-2xl border border-sage-100 mb-2 transition-transform group-hover:scale-110">
             🧘‍♀️
           </div>
           <span className="text-sm text-stone-600 font-medium">스트레칭</span>
        </div>
      </div>
      <p className="text-center text-xs text-stone-400 mt-6">
        이 루틴이 무너지면, 마음의 경보가 울립니다.
      </p>
    </div>
  );
};

export const MechanismVisual: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Shadow Card */}
      <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🌑</div>
        <h4 className="text-stone-800 font-bold mb-4 flex items-center gap-2">
          <span className="text-sm bg-stone-200 px-2 py-0.5 rounded text-stone-600">Shadow</span>
          나의 그림자
        </h4>
        <ul className="space-y-3">
          <li className="flex gap-3 text-sm text-stone-600">
            <span className="text-red-400 shrink-0">⚠️</span>
            <span><strong>타인의 시선:</strong> 내 판단보다 남의 평가를 진실로 믿음</span>
          </li>
          <li className="flex gap-3 text-sm text-stone-600">
            <span className="text-red-400 shrink-0">🤐</span>
            <span><strong>감정 억압:</strong> "괜찮아"라며 참다가 임계치에서 폭발</span>
          </li>
          <li className="flex gap-3 text-sm text-stone-600">
            <span className="text-red-400 shrink-0">🔥</span>
            <span><strong>방어적 소진:</strong> 거절이 두려워 모든 책임을 떠안음</span>
          </li>
        </ul>
      </div>

      {/* Light Card */}
      <div className="bg-sage-50 rounded-2xl p-6 border border-sage-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">☀️</div>
        <h4 className="text-sage-800 font-bold mb-4 flex items-center gap-2">
          <span className="text-sm bg-sage-200 px-2 py-0.5 rounded text-sage-700">Light</span>
          강점과 회복
        </h4>
        <ul className="space-y-3">
          <li className="flex gap-3 text-sm text-stone-700">
            <span className="text-sage-500 shrink-0">💎</span>
            <span><strong>재정의:</strong> 예민함 → <span className="underline decoration-sage-300 decoration-2">섬세함</span>, 책임감 → <span className="underline decoration-sage-300 decoration-2">완결성</span></span>
          </li>
          <li className="flex gap-3 text-sm text-stone-700">
            <span className="text-sage-500 shrink-0">🛑</span>
            <span><strong>멈춤의 미학:</strong> 조급할 때가 바로 멈춰야 할 때</span>
          </li>
          <li className="flex gap-3 text-sm text-stone-700">
            <span className="text-sage-500 shrink-0">🛡️</span>
            <span><strong>책임 분리:</strong> 타인의 감정은 나의 책임이 아님</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const AnxietyCycleDiagram: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm flex flex-col items-center">
      <h3 className="text-center text-stone-600 font-serif mb-6">패턴의 재구성</h3>
      
      <div className="relative w-full max-w-md flex flex-col gap-6">
        {/* Step 1: Trigger */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-lg shrink-0 text-red-500 border border-red-100 mt-1">
            ⚡️
          </div>
          <div>
            <div className="text-xs text-stone-400 font-bold mb-1 tracking-wider">TRIGGER</div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 text-sm text-stone-700">
              <strong>불안 감지</strong> (누군가의 침묵, 계획 변경, 거절의 두려움)
            </div>
          </div>
        </div>

        {/* Path Split */}
        <div className="relative pl-5 h-8 w-full border-l-2 border-stone-200 border-dashed ml-[1.2rem]"></div>

        {/* Old Path */}
        <div className="flex items-start gap-4 opacity-50 hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-lg shrink-0 text-stone-400 border border-stone-200 mt-1">
            🏚
          </div>
          <div className="flex-1">
            <div className="text-xs text-stone-400 font-bold mb-1 tracking-wider">OLD WAY</div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 text-sm text-stone-500">
              <span className="line-through">즉각적 행동 & 과도한 책임</span>
              <br/>
              <span className="text-xs">→ 번아웃 & 폭발 (조건부 평온)</span>
            </div>
          </div>
        </div>

        {/* New Path */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-lg shrink-0 text-sage-600 border border-sage-200 mt-1 shadow-sm">
            🌱
          </div>
          <div className="flex-1">
            <div className="text-xs text-sage-600 font-bold mb-1 tracking-wider">NEW WAY</div>
            <div className="p-4 bg-sage-50 rounded-lg border border-sage-200 text-sm text-stone-800 shadow-sm">
              <strong>1. 멈춤 & 인지</strong> ("나는 안전하다")
              <br/>
              <strong>2. 책임 분리</strong> (타인의 감정은 그들의 몫)
              <br/>
              <strong>3. 안전한 실패</strong> (거절해도 괜찮다)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
