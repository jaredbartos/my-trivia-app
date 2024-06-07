'use client';

import {
  Category,
  GetQuestionsFunction,
  Difficulty,
  QuestionType
} from '@/app/lib/definitions';
import { useState } from 'react';

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
    );
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
          max="50"
        />
        <span className="inline ms-2">(Max: 50)</span>
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
