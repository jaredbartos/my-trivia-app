'use client';

import { createContext, useContext, useReducer } from 'react';
import { quizReducer } from '@/app/lib/context/quiz-reducer';
import { QuizState, QuizAction } from '@/app/lib/definitions';

type QuizContextType = null | [QuizState, React.Dispatch<QuizAction>];

const QuizContext = createContext<QuizContextType>(null);

export const useQuiz = () => {
  const quiz = useContext(QuizContext);

  if (!quiz) {
    throw new Error('useQuiz must be used within a Provider');
  }

  return quiz;
};

export default function QuizProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(quizReducer, null);

  return (
    <QuizContext.Provider value={[state, dispatch]}>
      {children}
    </QuizContext.Provider>
  );
}
