import { getCategories, getQuestions } from '@/app/lib/data';
import QuestionForm from '@/app/ui/question-form';

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="h-screen flex">
      <div className="h-fit w-11/12 grid grid-cols-1 gap-y-8 self-center m-auto items-center">
        <h1 className="text-7xl text-center justify-self-center text-cyan-300">
          Trivial Trivia
        </h1>
        <div className="justify-self-center">
          <QuestionForm categories={categories} getQuestions={getQuestions} />
        </div>
      </div>
    </main>
  );
}
