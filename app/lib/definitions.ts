// OBJECT TYPES
export type Category = {
  id: number;
  name: string;
};

export type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type NumberedQuestion = {
  id: number;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  chosen_answer?: string;
};

export type QuestionGroup = {
  id: string;
  questions: NumberedQuestion[];
};

export type QuizAction = {
  type: string;
  questions?: QuestionGroup;
  chosen_answer?: string;
  question_answered?: number;
};

// FUNCTION TYPES
export type GetQuestionsFunction = (
  amount: number,
  category: string,
  difficulty: Difficulty,
  type: QuestionType
) => Promise<Question[]>;

// VARIABLE TYPES
export type Difficulty = 'easy' | 'medium' | 'hard' | 'all';

export type QuestionType = 'multiple' | 'boolean' | 'all';

export type QuizState = null | QuestionGroup;
