import type {
  QuestionGroup,
  QuizState,
  QuizAction
} from '@/app/lib/definitions';

export const quizReducer = (
  state: QuizState,
  action: QuizAction
): QuizState => {
  switch (action.type) {
    case 'SET_QUESTIONS': {
      if (action.questions) return action.questions;
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
};
