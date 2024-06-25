'use client';

import { useQuiz } from '@/app/lib/context/quiz-context';
import Question from '@/app/ui/question';

export default function Page({
  params
}: {
  params: { quizId: string; questionId: string };
}) {
  const questionId = Number(params.questionId);
  const [state, dispatch] = useQuiz();
  const question = state?.questions.find((q) => q.id === questionId);

  if (!state) {
    return <div>A quiz with this ID does not exist.</div>;
  }

  if (!question) {
    return <div>Error retrieving question</div>;
  }

  return (
    <main className="h-screen flex">
      <div className="h-fit w-11/12 grid grid-cols-1 gap-y-8 self-center m-auto items-center">
        <div className="justify-self-center">
          <Question
            question={question}
            totalQuestions={state.questions.length}
          />
        </div>
      </div>
    </main>
  );
}
