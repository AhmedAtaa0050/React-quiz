import { useQuiz } from "../contexts/QuizContext";

function FinishQuiz() {
  const { points, allPoints, highscore, dispatch } = useQuiz();

  const percentage = (points / allPoints) * 100;

  let emoji;

  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥳";
  if (percentage >= 50 && percentage < 80) emoji = "😌";
  if (percentage > 0 && percentage < 50) emoji = "😰";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <div className="result">
        <span>{emoji}</span> You scored {points} out of {allPoints} (
        {Math.ceil(percentage)}%)
      </div>
      <div className="highscore">(Highscore: {highscore} Points)</div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishQuiz;
