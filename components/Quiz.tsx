import React, { useState, useEffect } from 'react';
import type { QuizQuestion } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

interface QuizProps {
  questions: QuizQuestion[];
  lessonId: string;
}

export const Quiz: React.FC<QuizProps> = ({ questions, lessonId }) => {
  const getInitialAnswers = () => {
    try {
      const savedAnswers = localStorage.getItem(`quiz-${lessonId}`);
      // Ensure the saved data structure matches the expected length
      if (savedAnswers) {
        const parsed = JSON.parse(savedAnswers);
        if (Array.isArray(parsed) && parsed.length === questions.length) {
          return parsed;
        }
      }
      return new Array(questions.length).fill(null);
    } catch (error) {
      console.error("Failed to parse quiz answers from localStorage", error);
      return new Array(questions.length).fill(null);
    }
  };

  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(getInitialAnswers);
  const [submitted, setSubmitted] = useState(() => getInitialAnswers().every(a => a !== null));

  useEffect(() => {
    // When lessonId changes (which implies questions might change), re-initialize state.
    const newInitialAnswers = getInitialAnswers();
    setSelectedAnswers(newInitialAnswers);
    setSubmitted(newInitialAnswers.every(a => a !== null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, questions.length]);


  useEffect(() => {
    try {
      localStorage.setItem(`quiz-${lessonId}`, JSON.stringify(selectedAnswers));
    } catch (error) {
      console.error("Failed to save quiz answers to localStorage", error);
    }
    
  }, [selectedAnswers, lessonId]);

  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    if (submitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
    if (newAnswers.every(answer => answer !== null)) {
        setSubmitted(true);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswerIndex ? score + 1 : score;
    }, 0);
  };
  
  const score = calculateScore();
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const passed = percentage >= 80;

  return (
    <div className="p-6 bg-gray-800/50 border border-gray-700/50 rounded-lg shadow-inner">
      <div className="space-y-8">
        {questions.map((q, qIndex) => (
          <div key={qIndex}>
            <p className="font-semibold text-gray-200 mb-4">{qIndex + 1}. {q.question}</p>
            <div className="space-y-3">
              {q.options.map((option, oIndex) => {
                const isSelected = selectedAnswers[qIndex] === oIndex;
                const isCorrect = questions[qIndex].correctAnswerIndex === oIndex;
                const hasBeenAnswered = selectedAnswers[qIndex] !== null;

                let buttonClass = 'border-gray-600 bg-gray-800 hover:bg-gray-700';
                if (hasBeenAnswered) {
                  if (isSelected && isCorrect) {
                    buttonClass = 'bg-green-500/20 border-green-500 text-white';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'bg-red-500/20 border-red-500 text-white';
                  } else if (isCorrect) {
                    buttonClass = 'bg-green-500/20 border-green-500 text-white';
                  } else {
                     buttonClass = 'border-gray-700 bg-gray-800/50';
                  }
                }
                
                return (
                  <button
                    key={oIndex}
                    onClick={() => handleSelectAnswer(qIndex, oIndex)}
                    disabled={hasBeenAnswered}
                    className={`w-full text-left p-3 rounded-md border transition-all duration-200 flex items-center justify-between ${buttonClass}`}
                  >
                    <span>
                      {option}
                      {hasBeenAnswered && isSelected && isCorrect && <span className="sr-only"> - Correct</span>}
                      {hasBeenAnswered && isSelected && !isCorrect && <span className="sr-only"> - Incorrect</span>}
                    </span>
                    {hasBeenAnswered && isSelected && isCorrect && <CheckCircleIcon className="w-6 h-6 text-green-400" aria-hidden="true" />}
                    {hasBeenAnswered && isSelected && !isCorrect && <XCircleIcon className="w-6 h-6 text-red-400" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
            {selectedAnswers[qIndex] !== null && (
              <div className="mt-4 p-3 bg-gray-900/50 rounded-md text-sm text-gray-400">
                <p><span className="font-bold text-gray-300">Explanation:</span> {q.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {submitted && (
         <div className={`mt-10 p-6 rounded-lg border-2 text-center ${passed ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
            <h3 className="text-2xl font-bold">{passed ? 'Congratulations! You passed!' : 'Keep Practicing!'}</h3>
            <p className="text-4xl font-extrabold my-2">{percentage}%</p>
            <p className="text-lg">You answered {score} out of {questions.length} questions correctly.</p>
         </div>
      )}
    </div>
  );
};