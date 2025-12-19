export interface ContentSection {
  id: string;
  title: string;
  subtitle: string;
  content: string[]; // Array of paragraphs
  tags: string[];
}

export interface TraitData {
  trait: string;
  value: number;
  fullMark: number;
}
