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

  if (question === undefined) {
    return <div>Error retrieving question</div>;
  }

  return (
    <div>
      <Question question={question} />
    </div>
  );
}
