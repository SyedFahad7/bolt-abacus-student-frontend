// import { useState, useEffect, useRef } from 'react';
// import Sidebar from '../../../../components/Sidebar';
// import MainContent from '../../../../components/layout/MainContent';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import type { FlashcardsSettings, QuizQuestion, QuizAnswer } from '../../types';
// import { generateFlashcardQuestions, calculateAnswer, generateSoloTrainingQuestions } from '../../utils';

// export default function FlashcardsPracticePage() {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();
//   const cfgEncoded = params.get('cfg');
//   const settings: FlashcardsSettings | null = cfgEncoded ? JSON.parse(atob(cfgEncoded)) : null;

//   const [questions, setQuestions] = useState<QuizQuestion[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
//   const [answer, setAnswer] = useState('');
//   const [answers, setAnswers] = useState<QuizAnswer[]>([]);
//   const [disabled, setDisabled] = useState(true);
//   const [showQuestion, setShowQuestion] = useState(!settings?.audioMode);
//   const inputRef = useRef<HTMLInputElement>(null);
//  var num = 1
//   // useEffect(() => {
//   //   if (!settings) return;
//   //   const qs = generateFlashcardQuestions(
//   //     settings.operation,
//   //     settings.numberOfQuestions,
//   //     settings.numberOfDigits,
//   //     settings.numberOfRows,
//   //     settings.includeSubtraction
//   //   );
//   //   setQuestions(qs);
//   //   setAnswers(qs.map((q) => ({ questionId: q.id, answer: null, correct: false })));
//   //   num = num+1
//   //   console.log(num)
//   // }, []);

//   useEffect(() => {
//   if (!settings) return;

//   // Map your settings object to the unified function
//   const qs = generateSoloTrainingQuestions({
//     mode: settings.operation === 'addition' ? 1 :settings.operation === 'multiplication'? 2 : 3  , // 1 = Addition/Subtraction, 2 = Multiplication, 3 = Division
//     subMode: 'flash_cards', // e.g., 'flash_cards', 'no_rush_mastery', etc.
//     settings: {
//       numQuestions: settings.numberOfQuestions,
//       numDigits: settings.numberOfDigits,
//       numRows: settings.numberOfRows,
//       zigZagPattern: settings.isZigzag,
//       includeSubtraction: settings.includeSubtraction,
//       sameDigitsInAnswer: settings.persistNumberOfDigits,
//       flashCardSpeed: settings.speed,  

  
//     },
//   });

//   setQuestions(qs);
//   // setAnswers(
//   //   qs.map((q, index) => ({
//   //     questionId: index, // You can generate an actual ID if needed
//   //     answer: null,
//   //     correct: false,
//   //   }))
//   // );

//   num = num + 1;
//   console.log(settings,qs);
// }, [settings]);
//   useEffect(() => {
//     if (!questions.length || !settings) return;
//     setCurrentNumberIndex(0);
//     setAnswer('');
//     setDisabled(true);
//     if (settings.audioMode) {
//       setShowQuestion(false);
//       readQuestionAloud();
//     } else {
//       setShowQuestion(true);
//     }
//     inputRef.current?.focus();
//   }, [currentIndex, questions]);

//   useEffect(() => {
//     if (!questions.length || currentIndex >= questions.length || !settings) return;
//     const interval = setInterval(() => {
//       setCurrentNumberIndex((prev) => {
//         const next = prev + 1;
//         if (next >= questions[currentIndex].numbers.length) {
//           clearInterval(interval);
//           return prev;
//         }
//         return next;
//       });
//     }, settings.speed);
//     return () => clearInterval(interval);
//   }, [currentIndex, questions, settings]);

//   const readQuestionAloud = () => {
//     if (!settings?.audioMode || !questions[currentIndex]) return;
//     const nums = questions[currentIndex].numbers;
//     const text = nums.map((n) => Math.abs(n).toString()).join(' plus ');
//     const utterance = new SpeechSynthesisUtterance(text);
//     const rates = { slow: 0.75, normal: 1.0, fast: 1.25, ultra: 1.5 };
//     utterance.rate = rates[settings.audioPace] || 1.0;
//     speechSynthesis.speak(utterance);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value.replace(/[^0-9-]/gi, '');
//     setAnswer(val);
//     setDisabled(val === '' || isNaN(parseInt(val, 10)));
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if ((e.code === 'Enter' || e.code === 'NumpadEnter') && !disabled) {
//       submitAnswer();
//     }
//   };

//   const submitAnswer = () => {
//     const userAnswer = parseInt(answer, 10);
//     const correctAnswer = calculateAnswer(questions[currentIndex]);
//     const correct = userAnswer === correctAnswer;
    
//     const updatedAnswers = answers.map((a) =>
//       a.questionId === questions[currentIndex].id
//         ? { ...a, answer: userAnswer, correct }
//         : a
//     );
//     setAnswers(updatedAnswers);

//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       finishQuiz(updatedAnswers);
//     }
//   };

//   const skipQuestion = () => {
//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       finishQuiz(answers);
//     }
//   };

//   const finishQuiz = (finalAnswers: QuizAnswer[]) => {
//     const q = new URLSearchParams();
//     q.set('results', btoa(JSON.stringify({ questions, answers: finalAnswers, settings })));
//     navigate(`/student/solo-training-ground/flashcards/results?${q.toString()}`);
//   };

//   if (!settings || !questions.length) {
//     return (
//       <div className="min-h-screen flex bg-black">
//         <Sidebar />
//         <MainContent>
//           <div className="text-white/80">Loading questions...</div>
//         </MainContent>
//       </div>
//     );
//   }

//   const currentQuestion = questions[currentIndex];
//   const currentNumber = currentQuestion.numbers[currentNumberIndex] || currentQuestion.numbers[currentQuestion.numbers.length - 1];
//   const progress = ((currentIndex + 1) / questions.length) * 100;

//   return (
//     <div className="min-h-screen flex bg-black">
//       <Sidebar />
//       <MainContent>
//         <div className="w-full max-w-2xl">
//           {/* Progress Bar */}
//           <div className="mb-4">
//             <div className="flex justify-between text-sm text-white/80 mb-1">
//               <span>Question {currentIndex + 1} of {questions.length}</span>
//               <span>{Math.round(progress)}%</span>
//             </div>
//             <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-gold transition-all duration-300"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>

//           {/* Flashcard Display */}
//           <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-8 mb-6 min-h-[300px] flex flex-col items-center justify-center">
//             {settings.audioMode && !showQuestion && (
//               <div className="text-white/60 text-center mb-4">
//                 <div className="text-4xl mb-2">🔊</div>
//                 <div>Listen carefully...</div>
//                 <button
//                   className="mt-4 px-4 py-2 bg-[#2a2a2d] text-white rounded-lg hover:bg-[#3a3a3d]"
//                   onClick={() => setShowQuestion(!showQuestion)}
//                 >
//                   {showQuestion ? 'Hide' : 'Show'} Question
//                 </button>
//               </div>
//             )}

//             {showQuestion && (
//               <div className="text-center">
//                 <div className="text-8xl font-bold text-white mb-4 animate-pulse">
//                   {currentNumber >= 0 ? currentNumber : `(${Math.abs(currentNumber)})`}
//                 </div>
//                 <div className="text-white/60">
//                   Number {currentNumberIndex + 1} of {currentQuestion.numbers.length}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Answer Input */}
//           <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6 mb-4">
//             <label className="block text-white/80 mb-2">Your Answer:</label>
//             <input
//               ref={inputRef}
//               type="text"
//               className="w-full bg-black border border-[#2a2a2d] rounded-lg px-4 py-3 text-white text-xl"
//               value={answer}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Enter your answer..."
//             />
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-4">
//             <button
//               className="flex-1 bg-[#2a2a2d] text-white font-semibold py-3 rounded-lg hover:bg-[#3a3a3d]"
//               onClick={skipQuestion}
//             >
//               Skip
//             </button>
//             <button
//               className="flex-1 bg-[#facb25] text-black font-semibold py-3 rounded-lg hover:bg-[#e6b422] disabled:opacity-50 disabled:cursor-not-allowed"
//               onClick={submitAnswer}
//               disabled={disabled}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </MainContent>
//     </div>
//   );
// }


import { useState, useEffect, useRef } from 'react';
import Sidebar from '../../../../components/Sidebar';
import MainContent from '../../../../components/layout/MainContent';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { FlashcardsSettings, QuizQuestion, QuizAnswer } from '../../types';
import { generateSoloTrainingQuestions, calculateAnswer } from '../../utils';

export default function FlashcardsPracticePage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const cfgEncoded = params.get('cfg');
  const settings: FlashcardsSettings | null = cfgEncoded ? JSON.parse(atob(cfgEncoded)) : null;

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [disabled, setDisabled] = useState(true);
  const [showQuestion, setShowQuestion] = useState(!settings?.audioMode);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!settings) return;

    const qs = generateSoloTrainingQuestions({
      mode:
        settings.operation === 'addition'
          ? 1
          : settings.operation === 'multiplication'
          ? 2
          : 3,
      subMode: 'flash_cards',
      settings: {
        numQuestions: settings.numberOfQuestions,
        numDigits: settings.numberOfDigits,
        numRows: settings.numberOfRows,
        zigZagPattern: settings.isZigzag,
        includeSubtraction: settings.includeSubtraction,
        sameDigitsInAnswer: settings.persistNumberOfDigits,
        flashCardSpeed: settings.speed,
      },
    });

    setQuestions(qs);
    console.log(qs)
    setAnswers(
      qs.map((q) => ({
        questionId: q.id,
        answer: null,
        correct: false,
      }))
    );
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!questions.length || !settings) return;
    setCurrentNumberIndex(0);
    setAnswer('');
    setDisabled(true);

    if (settings.audioMode) {
      setShowQuestion(false);
      readQuestionAloud();
    } else {
      setShowQuestion(true);
    }
  }, [currentIndex, questions]);

  useEffect(() => {
    if (!questions.length || currentIndex >= questions.length || !settings) return;
    const interval = setInterval(() => {
      setCurrentNumberIndex((prev) => {
        const next = prev + 1;
        if (next >= questions[currentIndex].numbers.length) {
          clearInterval(interval);
          return prev;
        }
        return next;
      });
    }, settings.speed);
    return () => clearInterval(interval);
  }, [currentIndex, questions]);

  const readQuestionAloud = () => {
    if (!settings?.audioMode || !questions[currentIndex]) return;
    const nums = questions[currentIndex].numbers;
    const text = nums.map((n) => Math.abs(n).toString()).join(' plus ');
    const utterance = new SpeechSynthesisUtterance(text);
    const rates = { slow: 0.75, normal: 1.0, fast: 1.25, ultra: 1.5 };
    utterance.rate = rates[settings.audioPace] || 1.0;
    speechSynthesis.speak(utterance);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9-]/gi, '');
    setAnswer(val);
    setDisabled(val === '' || isNaN(parseInt(val, 10)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && !disabled) {
      submitAnswer();
    }
  };

  const submitAnswer = () => {
    const userAnswer = parseInt(answer, 10);
    console.log('uestions[currentIndex].answer',questions[currentIndex].answer)
    const correctAnswer = questions[currentIndex].answer;
    const correct = userAnswer === correctAnswer;

    const updatedAnswers = answers.map((a) =>
      a.questionId === questions[currentIndex].id
        ? { ...a, answer: userAnswer, correct }
        : a
    );
    setAnswers(updatedAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz(updatedAnswers);
    }
  };

  const skipQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz(answers);
    }
  };

  const finishQuiz = (finalAnswers: QuizAnswer[]) => {
    const q = new URLSearchParams();
    q.set(
      'results',
      btoa(JSON.stringify({ questions, answers: finalAnswers, settings }))
    );
    navigate(`/student/solo-training-ground/flashcards/results?${q.toString()}`);
  };

  if (!settings || !questions.length) {
    return (
      <div className="min-h-screen flex bg-black">
        <Sidebar />
        <MainContent>
          <div className="text-white/80">Loading questions...</div>
        </MainContent>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  console.log('currentQuestion', currentQuestion.numbers[currentQuestion.numbers.length - 1],currentQuestion)
  const currentNumber =
    currentQuestion.numbers[currentNumberIndex] ??
    currentQuestion.numbers[currentQuestion.numbers.length - 1];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-white/80 mb-1">
              <span>
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Flashcard Display */}
          <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-8 mb-6 min-h-[300px] flex flex-col items-center justify-center">
            {settings.audioMode && !showQuestion && (
              <div className="text-white/60 text-center mb-4">
                <div className="text-4xl mb-2">🔊</div>
                <div>Listen carefully...</div>
                <button
                  className="mt-4 px-4 py-2 bg-[#2a2a2d] text-white rounded-lg hover:bg-[#3a3a3d]"
                  onClick={() => setShowQuestion(!showQuestion)}
                >
                  {showQuestion ? 'Hide' : 'Show'} Question
                </button>
              </div>
            )}

            {showQuestion && (
              <div className="text-center">
                <div className="text-8xl font-bold text-white mb-4 animate-pulse">
                  {/* {currentNumber >= 0 ? currentNumber : `(${Math.abs(currentNumber)})`} */}
                  {currentNumber  && currentNumber}

                </div>
                <div className="text-white/60">
                  Number {currentNumberIndex + 1} of {currentQuestion.numbers.length}
                </div>
              </div>
            )}
          </div>

          {/* Answer Input */}
          <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6 mb-4">
            <label className="block text-white/80 mb-2">Your Answer:</label>
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-black border border-[#2a2a2d] rounded-lg px-4 py-3 text-white text-xl"
              value={answer}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your answer..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              className="flex-1 bg-[#2a2a2d] text-white font-semibold py-3 rounded-lg hover:bg-[#3a3a3d]"
              onClick={skipQuestion}
            >
              Skip
            </button>
            <button
              className="flex-1 bg-[#facb25] text-black font-semibold py-3 rounded-lg hover:bg-[#e6b422] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={submitAnswer}
              disabled={disabled}
            >
              Next
            </button>
          </div>
        </div>
      </MainContent>
    </div>
  );
}
