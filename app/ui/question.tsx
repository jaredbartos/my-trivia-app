'use client';

import { NumberedQuestion } from '@/app/lib/definitions';
import { decode } from 'html-entities';
import { convertToTitleCase } from '@/app/lib/utils';
import { useQuiz } from '@/app/lib/context/quiz-context';
import { SET_CHOSEN_ANSWER } from '@/app/lib/context/actions';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function Question({
  question,
  totalQuestions
}: {
  question: NumberedQuestion;
  totalQuestions: number;
}) {
  const [state, dispatch] = useQuiz();
  const [feedbackState, setFeedbackState] = useState<{
    wasAnsweredCorrectly: boolean;
    displayFeedback: boolean;
  }>({
    wasAnsweredCorrectly: question.chosen_answer === question.correct_answer,
    displayFeedback: question.chosen_answer ? true : false
  });
  const router = useRouter();

  const handleClick = (answer: string) => {
    // Update question with answer
    dispatch({
      type: SET_CHOSEN_ANSWER,
      question_answered: question.id,
      chosen_answer: answer
    });

    setFeedbackState({
      wasAnsweredCorrectly: answer === question.correct_answer,
      displayFeedback: true
    });

    setTimeout(() => {
      // Go to next question/recap after displaying feedback
      // for 2 seconds
      if (state) {
        if (question.id === totalQuestions) {
          router.push(`/quiz/${state.id}/recap`);
        } else {
          router.push(`/quiz/${state.id}/question/${question.id + 1}`);
        }
      }
    }, 2000);
  };

  // Create choices
  const choices = question.all_answers.map((answer) => {
    return (
      <div
        key={answer}
        onClick={
          question.chosen_answer ? () => null : () => handleClick(answer)
        }
        className={question.chosen_answer ? '' : 'hover:cursor-pointer'}
      >
        {decode(answer)}
      </div>
    );
  });

  return (
    <>
      <div className="grid grid-cols-1 border-4 border-cyan-300 rounded-2xl p-4 shadow-xl">
        <div>Question #{question.id}</div>
        <div>Category: {decode(question.category)}</div>
        <div>Difficulty: {convertToTitleCase(question.difficulty)}</div>
        <div>{decode(question.question)}</div>
        <div>{choices}</div>
      </div>
      {feedbackState.displayFeedback && (
        <div>
          {feedbackState.wasAnsweredCorrectly
            ? 'Correct!'
            : `Wrong! The correct answer is ${decode(
                question.correct_answer
              )}.`}
        </div>
      )}
    </>
  );
}
