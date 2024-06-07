import type { QuestionGroup } from '@/app/lib/definitions';

export default function quizReducer(
  state: null | QuestionGroup,
  action: {
    type: string;
    questions?: QuestionGroup;
    was_answered_correctly?: boolean;
  }
) {
  switch (action.type) {
    case 'SET_QUESTIONS': {
      return action.questions;
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}
