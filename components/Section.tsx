import React from 'react';
import { ContentSection } from '../types';

interface SectionProps {
  data: ContentSection;
  children?: React.ReactNode;
  isLast?: boolean;
  viewMode: 'detail' | 'simple';
}

const formatText = (text: string) => {
  // Regex to split by **bold** or {{badge}}
  const parts = text.split(/(\{\{.*?\}\}|\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    // Badge style (Highlight)
    if (part.startsWith('{{') && part.endsWith('}}')) {
      const content = part.slice(2, -2);
      return (
        <span 
          key={index} 
          className="bg-sage-100 text-sage-800 px-1 rounded mx-0.5 font-medium box-decoration-clone"
        >
          {content}
        </span>
      );
    }
    // Bold style
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      return (
        <strong key={index} className="font-bold text-stone-800">
          {content}
        </strong>
      );
    }
    // Plain text
    return part;
  });
};

const Section: React.FC<SectionProps> = ({ data, children, isLast, viewMode }) => {
  return (
    <section className={`py-12 md:py-20 px-6 max-w-3xl mx-auto ${!isLast ? 'border-b border-stone-200' : ''}`}>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {data.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 bg-white border border-stone-200 rounded-full text-xs md:text-sm text-stone-600 font-medium shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-3 tracking-tight">
          {data.title}
        </h2>
        <p className="text-lg md:text-xl text-sage-700 font-medium mb-2">
          {data.subtitle}
        </p>
      </div>

      <div className="transition-all duration-500 ease-in-out">
        {viewMode === 'detail' ? (
          <div className="space-y-6 text-stone-700 font-essay text-base md:text-lg leading-relaxed animate-fade-in">
            {data.content.map((paragraph, index) => (
              <p key={index}>{formatText(paragraph)}</p>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 animate-fade-in-up">
            {data.summary.map((item, index) => (
              <div 
                key={index} 
                className="group flex items-start gap-4 bg-white p-5 rounded-xl border border-stone-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-sage-200"
              >
                <div className="w-12 h-12 rounded-full bg-stone-50 group-hover:bg-sage-50 border border-stone-100 group-hover:border-sage-100 flex items-center justify-center text-2xl shrink-0 transition-colors duration-300">
                  {item.icon}
                </div>
                <div className="text-stone-700 font-sans leading-relaxed pt-1">
                  {formatText(item.text)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {children && (
        <div className="mt-10">
          {children}
        </div>
      )}
    </section>
  );
};

export default Section;