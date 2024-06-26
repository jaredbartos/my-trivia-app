'use client';

import {
  Category,
  GetQuestionsFunction,
  Difficulty,
  QuestionType
} from '@/app/lib/definitions';
import { useState } from 'react';
import { useQuiz } from '@/app/lib/context/quiz-context';
import { v4 as uuidv4 } from 'uuid';
import { SET_QUESTIONS } from '@/app/lib/context/actions';
import { useRouter } from 'next/navigation';

export default function QuestionForm({
  categories,
  getQuestions
}: {
  categories: Category[];
  getQuestions: GetQuestionsFunction;
}) {
  const [formData, setFormData] = useState<{
    amount: number;
    category: string;
    difficulty: Difficulty;
    type: QuestionType;
  }>({
    amount: 10,
    category: 'all',
    difficulty: 'all',
    type: 'all'
  });
  const [state, dispatch] = useQuiz();
  const router = useRouter();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'amount') {
      setFormData({ ...formData, amount: Number(value) });
    } else if (name === 'category') {
      setFormData({ ...formData, category: value });
    } else if (
      name === 'difficulty' &&
      (value === 'easy' ||
        value === 'medium' ||
        value === 'hard' ||
        value === 'all')
    ) {
      setFormData({ ...formData, difficulty: value });
    } else if (
      name === 'type' &&
      (value === 'multiple' || value === 'boolean' || value === 'all')
    ) {
      setFormData({ ...formData, type: value });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    getQuestions(
      formData.amount,
      formData.category,
      formData.difficulty,
      formData.type
    ).then((data) => {
      // Add an id to each question
      const questions = data.map((question, index) => {
        // Store and shuffle all choices in one array
        const allAnswers = [
          ...question.incorrect_answers,
          question.correct_answer
        ];
        // If true/false question
        if (allAnswers.length === 2) {
          // Display true first
          allAnswers.sort().reverse();
        } else {
          // Randomize order of answers
          allAnswers.sort(() => Math.random() - 0.5);
        }
        return { ...question, id: index + 1, all_answers: allAnswers };
      });
      // Generate a unique id for the group of questions
      const id = uuidv4();
      // Dispatch the questions to the context
      dispatch({ type: SET_QUESTIONS, questions: { id, questions } });
      // Navigate to the quiz page
      router.push(`/quiz/${id}/question/1`);
    });
  };

  return (
    <form className="grid grid-cols-1 border-4 border-cyan-300 rounded-2xl p-4 shadow-xl">
      <label htmlFor="amount" className="mb-1 text-xl">
        Number of Questions
      </label>
      <div className="items-end flex">
        <input
          className="text-black text-lg border rounded-lg text-center p-1 w-12"
          onChange={handleChange}
          value={formData.amount}
          type="number"
          id="amount"
          name="amount"
          min="1"
          max="40"
        />
        <span className="inline ms-2">(Max: 40)</span>
      </div>
      <label htmlFor="category" className="mb-1 mt-4 text-xl">
        Category
      </label>
      <select
        className="text-black text-lg border rounded-lg p-1"
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <label htmlFor="difficulty" className="mb-1 mt-4 text-xl">
        Difficulty
      </label>
      <select
        className="text-black text-lg border rounded-lg p-1"
        id="difficulty"
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
      >
        <option value="all">All Difficulties</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <label htmlFor="type" className="mb-1 mt-4 text-xl">
        Type of Questions
      </label>
      <select
        className="text-black text-lg border rounded-lg p-1"
        id="type"
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="all">All Types</option>
        <option value="multiple">Multiple Choice</option>
        <option value="boolean">True / False</option>
      </select>
      <button
        className="rounded-lg mt-5 text-2xl bg-cyan-300 font-bold hover:bg-cyan-200 text-black"
        type="button"
        onClick={handleClick}
      >
        Generate Quiz
      </button>
    </form>
  );
}
