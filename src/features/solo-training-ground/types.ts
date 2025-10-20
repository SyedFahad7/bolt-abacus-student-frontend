export type Operation = 'addition' | 'multiplication' | 'division';

export interface FlashcardsSettings {
  operation: Operation;
  numberOfQuestions: number;
  numberOfDigits: number; // for operands
  numberOfRows: number; // used mainly for addition stack count
  isZigzag: boolean;
  includeSubtraction: boolean; // applies to addition
  persistNumberOfDigits: boolean;
  speed: number; // ms per flip
  audioMode: boolean;
  audioPace: 'slow' | 'normal' | 'fast' | 'ultra';
  showQuestion: boolean;
}

export interface QuizQuestion {
  id: string;
  operator: Operation;
  numbers: number[]; // for division: [dividend, divisor], multiplication: [a,b]
}

export interface QuizAnswer {
  questionId: string;
  answer: number | null;
  correct: boolean;
}

export interface QuizResultSummary {
  total: number;
  correct: number;
  averageMsPerQuestion: number;
}
