import { useQuiz } from "../contexts/QuizContext";

function Options() {
  const { questions, answer, dispatch, index } = useQuiz();

  return (
    <>
      {questions[index].options.map((option, i) => (
        <button
          disabled={answer !== null}
          className={`btn btn-option ${answer === i ? "answer" : ""} ${
            answer === null
              ? ""
              : i === questions[index].correctOption
              ? "correct"
              : "wrong"
          }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payLoad: i })}
        >
          {option}
        </button>
      ))}
    </>
  );
}

export default Options;
