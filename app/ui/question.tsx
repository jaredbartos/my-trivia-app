import { NumberedQuestion } from '@/app/lib/definitions';
import { decode } from 'html-entities';

export default function Question({ question }: { question: NumberedQuestion }) {
  // Shuffle the answers
  const answers = [...question.incorrect_answers, question.correct_answer];
  answers.sort(() => Math.random() - 0.5);
  // Create radio buttons for choices
  const choices = answers.map((answer) => {
    return (
      <div key={answer}>
        <input type="radio" id={answer} name="answer" value={answer} />
        <label htmlFor={answer}>{answer}</label>
      </div>
    );
  });

  return (
    <>
      <div>Question #{question.id}</div>
      <div>Category: {decode(question.category)}</div>
      <div>Difficulty: {question.difficulty}</div>
      <div>{decode(question.question)}</div>
      <div>{choices}</div>
    </>
  );
}
