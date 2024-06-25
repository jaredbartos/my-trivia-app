'use client';

import { useQuiz } from '@/app/lib/context/quiz-context';
import Question from '@/app/ui/question';

export default function Page({ params }: { params: { quizId: string } }) {
  const [state, dispatch] = useQuiz();

  if (!state) {
    return <div>A quiz with this ID does not exist.</div>;
  }

  const totalQuestions = state.questions.length;

  const questions = state.questions.map((q) => (
    <Question key={q.id} question={q} totalQuestions={totalQuestions} />
  ));

  // Get number of correclty answered questions
  let correctlyAnswered = 0;
  state.questions.forEach((q) => {
    if (q.chosen_answer === q.correct_answer) {
      correctlyAnswered++;
    }
  });

  return (
    <main className="h-screen flex">
      <div className="h-fit w-11/12 grid grid-cols-1 gap-y-8 self-center m-auto">
        <p>
          You answered {correctlyAnswered} out of {totalQuestions} questions
          correctly for a score of{' '}
          {((correctlyAnswered / totalQuestions) * 100).toFixed(0)}
          %!
        </p>
        <div className="justify-self-center">{questions}</div>
      </div>
    </main>
  );
}
