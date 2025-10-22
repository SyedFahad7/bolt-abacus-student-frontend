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
      const nums: number[] = [];
      for (let r = 0; r < rows; r++) {
        const num = Math.floor(Math.random() * Math.pow(10, digits));
        nums.push(num);
      }
      // Optionally turn one of the later rows negative to simulate subtraction
      if (includeSubtraction && rows >= 2) {
        const idx = Math.floor(Math.random() * (rows - 1)) + 1; // pick index > 0
        nums[idx] = -Math.abs(nums[idx]);
      }

      const total = nums.reduce((acc, n) => acc + n, 0);
      const questionText = nums
        .map((n, idx) => (idx === 0 ? `${Math.abs(n)}` : `${n < 0 ? '-' : '+'} ${Math.abs(n)}`))
        .join(' ');

      questions.push({
        id,
        operator: '+',
        numbers: nums,
        questionText,
        answer: total,
      });
    } else if (operation === 'multiplication') {
      const a = Math.floor(Math.random() * Math.pow(10, digits));
      const b = Math.floor(Math.random() * Math.pow(10, digits));
      const answer = a * b;
      questions.push({
        id,
        operator: '×',
        numbers: [a, b],
        questionText: `${a} × ${b}`,
        answer,
      });
    } else if (operation === 'division') {
      const divisor = Math.floor(Math.random() * Math.pow(10, Math.min(digits, 2))) + 1;
      const quotient = Math.floor(Math.random() * Math.pow(10, digits));
      const dividend = divisor * quotient;
      const answer = Math.floor(dividend / divisor);
      questions.push({
        id,
        operator: '÷',
        numbers: [dividend, divisor],
        questionText: `${dividend} ÷ ${divisor}`,
        answer,
      });
    }
  }

  return questions;
}

export function calculateAnswer(question: QuizQuestion): number {
  const { operator, numbers } = question;
  if (operator === 'addition' || operator === '+') {
    return numbers.reduce((sum, n) => sum + n, 0);
  }
  if (operator === 'multiplication' || operator === '×') {
    return numbers[0] * numbers[1];
  }
  if (operator === 'division' || operator === '÷') {
    return Math.floor(numbers[0] / numbers[1]);
  }
  return 0;
}


// export function generateSoloTrainingQuestions({
//   mode,  
//   subMode,  
//   settings = {},
// }) {
//   const {
//     numQuestions,
//     numDigits,
//     numRows,
//     zigZagPattern,
//     includeSubtraction,
//     sameDigitsInAnswer,
//     flashCardSpeed,
//     firstOperandDigits,
//     secondOperandDigits,
//     numeratorDigits,
//     denominatorDigits,
//     includeDecimal,
//     timeLimit, // in seconds
//   } = settings;

//   const questions = [];

//   // Helper functions
//   const randomNum = (digits) => {
//     const min = Math.pow(10, digits - 1);
//     const max = Math.pow(10, digits) - 1;
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   };

//   const randomDigits = (baseDigits, zigzag) => {
//     if (!zigzag) return baseDigits;
//     const choices = baseDigits === 1 ? [1, 2] : [baseDigits - 1, baseDigits, baseDigits + 1];
//     return choices[Math.floor(Math.random() * choices.length)];
//   };

//   const randomOperator = (includeSub) => {
//     if (!includeSub) return '+';
//     return Math.random() < 0.5 ? '+' : '-';
//   };

//   // Determine total questions
//   const totalQuestions = subMode === 'time_attack' ? (timeLimit || 1) * 10 : (numQuestions || 10);

//   // ------------------- MODE 1: Addition/Subtraction -------------------
//   if (mode === 1) {
//     for (let i = 0; i < totalQuestions; i++) {
//       const rows = [];
//       let total = 0;

//       for (let r = 0; r < (numRows || 2); r++) {
//         const digits = randomDigits(numDigits || 2, zigZagPattern);
//         const num = randomNum(digits);
//         let op = r === 0 ? '+' : randomOperator(includeSubtraction);

//         if (op === '+') total += num;
//         else {
//           if (num > total) {
//             op = '+';
//             total += num;
//           } else total -= num;
//         }

//         rows.push(`${op}${num}`);
//       }

//       rows[0] = rows[0].replace('+', ''); // remove leading '+'

//       if (sameDigitsInAnswer && total.toString().length !== numDigits) {
//         i--;
//         continue;
//       }

//       questions.push({
//         question: rows.join(' '), // single string
//         answer: total,
//         flashCardSpeed,
//       });
//     }
//   }

//   // ------------------- MODE 2: Multiplication -------------------
//   else if (mode === 2) {
//     for (let i = 0; i < totalQuestions; i++) {
//       const a = randomNum(firstOperandDigits || 2);
//       const b = randomNum(secondOperandDigits || 1);
//       const answer = a * b;

//       if (sameDigitsInAnswer) {
//         const ad = answer.toString().length;
//         if (ad !== firstOperandDigits && ad !== secondOperandDigits) {
//           i--;
//           continue;
//         }
//       }

//       questions.push({
//         question: `${a} × ${b}`,
//         answer,
//       });
//     }
//   }

//   // ------------------- MODE 3: Division -------------------
//   else if (mode === 3) {
//     for (let i = 0; i < totalQuestions; i++) {
//       let numerator = randomNum(numeratorDigits || 2);
//       let denominator = randomNum(denominatorDigits || 1);
//       if (denominator === 0) denominator = 1;

//       if (!includeDecimal && numerator < denominator) {
//         [numerator, denominator] = [denominator, numerator];
//         if (denominator === 0) denominator = 1;
//       }

//       let answer = numerator / denominator;

//       if (!includeDecimal && !Number.isInteger(answer)) {
//         i--;
//         continue;
//       }

//       if (sameDigitsInAnswer) {
//         const ad = Math.floor(answer).toString().length;
//         if (ad !== numeratorDigits && ad !== denominatorDigits) {
//           i--;
//           continue;
//         }
//       }

//       questions.push({
//         question: `${numerator} ÷ ${denominator}`,
//         answer: includeDecimal ? parseFloat(answer.toFixed(2)) : answer,
//       });
//     }
//   }
//  console.log('questions',questions)
//   return questions;
// }

export function generateSoloTrainingQuestions({
  mode,
  subMode,
  settings = {},
}: {
  mode: 1 | 2 | 3;
  subMode: 'flash_cards' | 'no_rush_mastery' | 'time_attack' | 'custom_challenge';
  settings?: Partial<{
    numQuestions: number;
    numDigits: number;
    numRows: number;
    zigZagPattern: boolean;
    includeSubtraction: boolean;
    sameDigitsInAnswer: boolean;
    flashCardSpeed: number;
    firstOperandDigits: number;
    secondOperandDigits: number;
    numeratorDigits: number;
    denominatorDigits: number;
    includeDecimal: boolean;
    timeLimit: number; // in minutes
  }>;
}): QuizQuestion[] {
  const {
    numQuestions,
    numDigits,
    numRows,
    zigZagPattern,
    includeSubtraction,
    sameDigitsInAnswer,
    flashCardSpeed,
    firstOperandDigits,
    secondOperandDigits,
    numeratorDigits,
    denominatorDigits,
    includeDecimal,
    timeLimit,
  } = settings;

  const questions: QuizQuestion[] = [];

  const randomNum = (digits: number) => {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomDigits = (baseDigits: number, zigzag?: boolean) => {
    if (!zigzag) return baseDigits;
    const choices = baseDigits === 1 ? [1, 2] : [baseDigits - 1, baseDigits, baseDigits + 1];
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const randomOperator = (includeSub?: boolean) => {
    if (!includeSub) return '+';
    return Math.random() < 0.5 ? '+' : '-';
  };

  const totalQuestions = subMode === 'time_attack' ? (timeLimit || 1) * 10 : numQuestions || 10;

  if (mode === 1) {
    // Addition/Subtraction
    for (let i = 0; i < totalQuestions; i++) {
  const rows: number[] = [];
  const operators: Operation[] = [];
  let total = 0;

  for (let r = 0; r < (numRows || 2); r++) {
    const digits = randomDigits(numDigits || 2, zigZagPattern);
    const num = randomNum(digits);
    let op: Operation = r === 0 ? '+' : (randomOperator(includeSubtraction) as Operation);

    if (op === '+') {
      total += num;
      rows.push(num);
    } else {
      if (num > total) {
        // prevent negative total by forcing addition
        op = '+';
        total += num;
        rows.push(num);
      } else {
        total -= num;
        rows.push(-num); // ✅ store negative number internally
      }
    }

    operators.push(op);
  }

  // ✅ Correct question text formatting
  const questionText = rows
    .map((n, idx) => {
      const absNum = Math.abs(n);
      if (idx === 0) return `${absNum}`; // first number, no operator
      return `${operators[idx]} ${absNum}`; // use operator + absolute number
    })
    .join(' ');

  if (sameDigitsInAnswer && total.toString().length !== numDigits) {
    i--;
    continue;
  }

  questions.push({
    id: `q_${i + 1}`,
    operator: '+',
    numbers: rows, // ✅ [4, -4]
    questionText,  // ✅ "4 - 4"
    answer: total,
    flashCardSpeed,
  });
}

  } else if (mode === 2) {
    // Multiplication
    for (let i = 0; i < totalQuestions; i++) {
      const a = randomNum(firstOperandDigits || 2);
      const b = randomNum(secondOperandDigits || 1);
      const answer = a * b;

      if (sameDigitsInAnswer) {
        const ad = answer.toString().length;
        if (ad !== firstOperandDigits && ad !== secondOperandDigits) {
          i--;
          continue;
        }
      }

      questions.push({
        id: `q_${i + 1}`,
        operator: '×',
        numbers: [a, b],
        questionText: `${a} × ${b}`,
        answer,
      });
    }
  } else if (mode === 3) {
    // Division
    for (let i = 0; i < totalQuestions; i++) {
      let numerator = randomNum(numeratorDigits || 2);
      let denominator = randomNum(denominatorDigits || 1);
      if (denominator === 0) denominator = 1;

      if (!includeDecimal && numerator < denominator) {
        [numerator, denominator] = [denominator, numerator];
        if (denominator === 0) denominator = 1;
      }

      let answer = numerator / denominator;

      if (!includeDecimal && !Number.isInteger(answer)) {
        i--;
        continue;
      }

      if (sameDigitsInAnswer) {
        const ad = Math.floor(answer).toString().length;
        if (ad !== numeratorDigits && ad !== denominatorDigits) {
          i--;
          continue;
        }
      }

      questions.push({
        id: `q_${i + 1}`,
        operator: '÷',
        numbers: [numerator, denominator],
        questionText: `${numerator} ÷ ${denominator}`,
        answer: includeDecimal ? parseFloat(answer.toFixed(2)) : answer,
      });
    }
  }

  return questions;
}