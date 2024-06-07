'use server';

import type { Category, Difficulty, QuestionType } from '@/app/lib/definitions';

export async function getCategories(): Promise<Category[]> {
  // Fetch the categories from the API
  const response = await fetch('https://opentdb.com/api_category.php');
  const data = await response.json();

  return data.trivia_categories;
}

export async function getQuestions(
  amount: number,
  category: string,
  difficulty: Difficulty,
  type: QuestionType
) {
  // Create a new URLSearchParams object
  const searchParams = new URLSearchParams();

  // Add the parameters to the searchParams object
  searchParams.append('amount', amount.toString());
  if (category !== 'all') searchParams.append('category', category.toString());
  if (difficulty !== 'all') searchParams.append('difficulty', difficulty);
  if (type !== 'all') searchParams.append('type', type);

  // Convert the searchParams object to a string and append it to the URL
  const url = `https://opentdb.com/api.php?${searchParams.toString()}`;

  const response = await fetch(url);
  const data = await response.json();
  const { response_code, results } = data;

  if (response_code === 0) console.log(results);
}
