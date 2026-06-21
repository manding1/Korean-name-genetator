export type AnswerLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface AnswerOption {
  letter: AnswerLetter;
  label: string;
  emoji: string;
  imageUrl: string;
}

export interface Question {
  id: number;
  text: string;
  subtext?: string;
  options: AnswerOption[];
}

export type QuizAnswers = AnswerLetter[];
