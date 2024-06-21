import type { QuizState, QuizAction } from '@/app/lib/definitions';
import { SET_QUESTIONS, SET_CHOSEN_ANSWER } from '@/app/lib/context/actions';

export const quizReducer = (
  state: QuizState,
  action: QuizAction
): QuizState => {
  switch (action.type) {
    case SET_QUESTIONS: {
      if (action.questions) return action.questions;
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
};
