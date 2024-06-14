import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { index, numQuestions, points, allPoints, answer } = useQuiz();

  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Question
        <strong>
          {index + 1} / {numQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {points}/{allPoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
