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
    <form
      action={dispatch}
      className="grid grid-cols-1 border-4 border-cyan-300 rounded-lg p-4 shadow-xl"
    >
      <label htmlFor="amount" className="mb-1 text-xl">
        Number of Questions
      </label>
      <div className='items-end flex'>
        <input
          className="text-black text-lg border rounded-lg text-center p-1 w-12"
          type="number"
          id="amount"
          name="amount"
          min="1"
          max="50"
          defaultValue="10"
        />
        <span className='inline ms-2'>(Max: 50)</span>
      </div>
      <label htmlFor="category" className="mb-1 mt-4 text-xl">
        Category
      </label>
      <select
        className="text-black text-lg border rounded-lg p-1"
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
      <label htmlFor="difficulty" className="mb-1 mt-4 text-xl">
        Difficulty
      </label>
      <select
        className="text-black text-lg border rounded-lg p-1"
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
      <label htmlFor="type" className="mb-1 mt-4 text-xl">
        Type of Questions
      </label>
      <select
        className="text-black text-lg border rounded-lg p-1"
        id="type"
        name="type"
        defaultValue=""
      >
        <option value="" disabled>
          Select a Type
        </option>
        <option value="all">All Types</option>
        <option value="multiple">Multiple Choice</option>
        <option value="boolean">True / False</option>
      </select>
      <button
        className="rounded-lg m-5 text-xl bg-cyan-300 hover:bg-cyan-200 text-black"
        type="submit"
      >
        Generate Quiz
      </button>
    </form>
  );
}
