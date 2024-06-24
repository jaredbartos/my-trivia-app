'use client';

import { NumberedQuestion } from '@/app/lib/definitions';
import { decode, encode } from 'html-entities';
import { convertToTitleCase } from '@/app/lib/utils';
import { useQuiz } from '@/app/lib/context/quiz-context';
import { SET_CHOSEN_ANSWER } from '@/app/lib/context/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Question({ question }: { question: NumberedQuestion }) {
  const [state, dispatch] = useQuiz();
  const [feedbackState, setFeedbackState] = useState<{
    wasAnsweredCorrectly: boolean;
    displayFeedback: boolean;
  }>({
    wasAnsweredCorrectly: false,
    displayFeedback: false
  });
  const router = useRouter();

  // Shuffle the answers
  const answers = [...question.incorrect_answers, question.correct_answer];
  // If true/false question
  if (answers.length === 2) {
    // Display true first
    answers.sort().reverse();
  } else {
    // Randomize order of answers
    answers.sort(() => Math.random() - 0.5);
  }

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
        router.push(`/quiz/${state.id}/question/${question.id + 1}`);
      }
    }, 2000);
  };

  // Create radio buttons for choices
  const choices = answers.map((answer) => {
    return (
      <div
        key={answer}
        onClick={() => handleClick(answer)}
        className="hover:cursor-pointer"
      >
        {decode(answer)}
      </div>
    );
  });

  return (
    <div className="grid grid-cols-1 border-4 border-cyan-300 rounded-2xl p-4 shadow-xl">
      <div>Question #{question.id}</div>
      <div>Category: {decode(question.category)}</div>
      <div>Difficulty: {convertToTitleCase(question.difficulty)}</div>
      <div>{decode(question.question)}</div>
      <div>{choices}</div>
    </div>
  );
}
