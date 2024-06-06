'use server';

import type { Question } from '@/app/lib/definitions';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  amount: z.coerce
    .number()
    .int()
    .gte(1, { message: 'You must have at least one question in the quiz' })
    .lte(50, { message: 'There is a maximum of 50 questions' }),
  category: z.union([z.coerce.number(), z.literal('all')], {
    invalid_type_error: 'Please select a category'
  }),
  difficulty: z.enum(['easy', 'medium', 'hard', 'all'], {
    invalid_type_error: 'Please select a difficulty'
  }),
  type: z.enum(['multiple', 'boolean', 'all'], {
    invalid_type_error: 'Please select a type'
  })
});

export type State = {
  errors?: {
    amount?: string[];
    category?: string[];
    difficulty?: string[];
    type?: string[];
  };
  message?: string | null;
};

export async function getQuestions(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    amount: formData.get('amount'),
    category: formData.get('category'),
    difficulty: formData.get('difficulty'),
    type: formData.get('type')
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create quiz. Please complete the form.'
    };
  }

  const { amount, category, difficulty, type } = validatedFields.data;

  // Create a new URLSearchParams object
  const searchParams = new URLSearchParams();

  // Add the parameters to the searchParams object
  searchParams.append('amount', amount.toString());
  if (category !== 'all') searchParams.append('category', category.toString());
  if (difficulty !== 'all') searchParams.append('difficulty', difficulty);
  if (type !== 'all') searchParams.append('type', type);

  // Convert the searchParams object to a string and append it to the URL
  const url = `https://opentdb.com/api.php?${searchParams.toString()}`;

  console.log(url);

  const response = await fetch(url);
  const data = await response.json();
  const { response_code, results } = data;

  if (response_code !== 0) {
    return {
      errors: {},
      message: 'Failed to create quiz. Please try again.'
    };
  } else {
    console.log(results);
  }

  redirect('/');
}
