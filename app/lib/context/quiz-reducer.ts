import type { QuizState, QuizAction } from '@/app/lib/definitions';
import { SET_QUESTIONS, SET_CHOSEN_ANSWER } from '@/app/lib/context/actions';

export const quizReducer = (
  state: QuizState,
  action: QuizAction
): QuizState => {
  switch (action.type) {
    case SET_QUESTIONS: {
      if (action.questions) return action.questions;
      throw new Error('Questions were not provided');
    }
    case SET_CHOSEN_ANSWER: {
      if (state) {
        // Find the question to be updated
        let question;
        if (action.question_answered) {
          question = state.questions.find(
            (q) => q.id === action.question_answered
          );
        } else {
          throw new Error('Question answered field was not provided');
        }

        // Update the question
        let alteredQuestion;
        if (action.chosen_answer) {
          if (question) {
            alteredQuestion = {
              ...question,
              chosen_answer: action.chosen_answer
            };
          } else {
            throw new Error(
              'Question could not be updated. question_answered value is likely not accurate.'
            );
          }
        } else {
          throw new Error('The chosen answer field was not provided');
        }

        return { ...state, questions: [...state.questions, alteredQuestion] };
      }

      throw new Error('There are no questions to update');
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
};
