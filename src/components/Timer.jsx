import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
  const { dispatch, remainigSecond } = useQuiz();

  const minutes = Math.floor(remainigSecond / 60);
  const seconds = Math.floor(remainigSecond % 60);

  useEffect(function () {
    const id = setInterval(function () {
      dispatch({ type: "time" });
    }, 1000);

    return function () {
      clearInterval(id);
    };
  }, []);

  return (
    <button className="btn timer">
      {minutes < 10 && 0}
      {minutes}:{seconds < 10 && 0}
      {seconds}
    </button>
  );
}

export default Timer;
