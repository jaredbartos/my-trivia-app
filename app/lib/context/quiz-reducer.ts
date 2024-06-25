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
        // Copy questions array in state
        const newQuestionsArray = [...state.questions];
        // Find the index of the question to be updated
        let questionIndex;
        if (action.question_answered) {
          questionIndex = newQuestionsArray.findIndex(
            (q) => q.id === action.question_answered
          );
        } else {
          throw new Error('Question answered field was not provided');
        }

        // Update the question
        newQuestionsArray[questionIndex] = {
          ...newQuestionsArray[questionIndex],
          chosen_answer: action.chosen_answer
        };

        // Return new state with updated question
        return { ...state, questions: newQuestionsArray };
      }

      throw new Error('There are no questions to update');
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
};
