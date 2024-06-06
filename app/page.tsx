import Image from 'next/image';
import { getCategories } from '@/app/lib/data';
import { decode } from 'html-entities';
import QuestionForm from '@/app/ui/question-form';

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="h-screen">
      <div className="size-full flex justify-center items-center">
        <h1 className="text-7xl text-orange-300">My Trivia App</h1>
        <QuestionForm categories={categories} />
      </div>
    </main>
  );
}
