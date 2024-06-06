'use server';

import type { Category } from '@/app/lib/definitions';

export async function getCategories(): Promise<Category[]> {
  // Fetch the categories from the API
  const response = await fetch('https://opentdb.com/api_category.php');
  const data = await response.json();

  return data.trivia_categories;
}
