export interface SummaryItem {
  icon: string;
  text: string;
}

export interface ContentSection {
  id: string;
  title: string;
  subtitle: string;
  content: string[]; // Array of paragraphs for Detail view
  summary: SummaryItem[]; // Array of objects with icon and text for Simple view
  tags: string[];
}

export interface TraitData {
  trait: string;
  value: number;
  fullMark: number;
}