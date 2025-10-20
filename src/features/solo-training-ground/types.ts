export type Operation = 'addition' | 'multiplication' | 'division' | '+' | '×' | '÷';

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
  id: string;              // Unique ID for the question
  operator: Operation;     // '+', '-', '×', or '÷'
  numbers: number[];       // Operands: 
                           // Addition/Subtraction: [num1, num2, ...] 
                           // Multiplication: [a, b]
                           // Division: [numerator, denominator]
  questionText: string;    // Full question as a single string, e.g., "23 + 45 - 12"
  answer: number;          // Correct answer
  flashCardSpeed?: number; // Optional speed for flash card mode
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
