import type { Operation, QuizQuestion } from './types';

export function generateFlashcardQuestions(
  operation: Operation,
  count: number,
  digits: number,
  rows: number,
  includeSubtraction: boolean
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const id = `q_${i + 1}`;
    
    if (operation === 'addition') {
      const numbers: number[] = [];
      for (let r = 0; r < rows; r++) {
        const num = Math.floor(Math.random() * Math.pow(10, digits));
        numbers.push(num);
      }
      // subtraction if enabled
      if (includeSubtraction && Math.random() > 0.5 && rows === 2) {
        questions.push({ id, operator: 'addition', numbers: [numbers[0], -numbers[1]] });
      } else {
        questions.push({ id, operator: 'addition', numbers });
      }
    } else if (operation === 'multiplication') {
      const a = Math.floor(Math.random() * Math.pow(10, digits));
      const b = Math.floor(Math.random() * Math.pow(10, digits));
      questions.push({ id, operator: 'multiplication', numbers: [a, b] });
    } else if (operation === 'division') {
      const divisor = Math.floor(Math.random() * Math.pow(10, Math.min(digits, 2))) + 1;
      const quotient = Math.floor(Math.random() * Math.pow(10, digits));
      const dividend = divisor * quotient;
      questions.push({ id, operator: 'division', numbers: [dividend, divisor] });
    }
  }

  return questions;
}

export function calculateAnswer(question: QuizQuestion): number {
  const { operator, numbers } = question;
  
  if (operator === 'addition') {
    return numbers.reduce((sum, n) => sum + n, 0);
  } else if (operator === 'multiplication') {
    return numbers[0] * numbers[1];
  } else if (operator === 'division') {
    return Math.floor(numbers[0] / numbers[1]);
  }
  
  return 0;
}
