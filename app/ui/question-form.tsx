'use client';

import { useFormState } from 'react-dom';
import { Category } from '@/app/lib/definitions';
import { getQuestions } from '@/app/lib/actions';
import type { State } from '@/app/lib/actions';

export default function QuestionForm({
  categories
}: {
  categories: Category[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(getQuestions, initialState);

  return (
    <form action={dispatch}>
      <label htmlFor="amount">Number of Questions (Max: 50): </label>
      <input
        className="text-black"
        type="number"
        id="amount"
        name="amount"
        min="1"
        max="50"
        defaultValue='10'
      />
      <label htmlFor="category">Category: </label>
      <select
        className="text-black"
        id="category"
        name="category"
        defaultValue=""
      >
        <option value="" disabled>
          Select a Category
        </option>
        <option value="all">All Categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <label htmlFor="difficulty">Difficulty: </label>
      <select
        className="text-black"
        id="difficulty"
        name="difficulty"
        defaultValue=""
      >
        <option value="" disabled>
          Select a Difficulty
        </option>
        <option value="all">All Difficulties</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <label htmlFor="type">Type of Questions: </label>
      <select className="text-black" id="type" name="type" defaultValue="">
        <option value="" disabled>
          Select a Type
        </option>
        <option value="all">All Types</option>
        <option value="multiple">Multiple Choice</option>
        <option value="boolean">True / False</option>
      </select>
      <button type="submit">Generate Quiz</button>
    </form>
  );
}
