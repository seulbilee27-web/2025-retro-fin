import React from 'react';
import { ContentSection } from '../types';

interface SectionProps {
  data: ContentSection;
  children?: React.ReactNode;
  isLast?: boolean;
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

const Section: React.FC<SectionProps> = ({ data, children, isLast }) => {
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

      <div className="space-y-6 text-stone-700 font-essay text-base md:text-lg leading-relaxed">
        {data.content.map((paragraph, index) => (
          <p key={index}>{formatText(paragraph)}</p>
        ))}
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
