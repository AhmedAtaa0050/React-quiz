import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  remainigSecond: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "data":
      return {
        ...state,
        questions: action.payLoad,
        status: "ready",
      };

    case "error":
      return {
        status: "error",
      };

    case "start":
      return {
        ...state,
        index: 0,
        answer: null,
        status: "active",
        remainigSecond: state.questions.length * SECONDS_PER_QUESTION,
      };

    case "newAnswer":
      return {
        ...state,
        answer: action.payLoad,
        points:
          action.payLoad === state.questions[state.index].correctOption
            ? state.points + state.questions[state.index].points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.highscore > state.points ? state.highscore : state.points,
      };

    case "restart":
      return {
        ...initialState,
        status: "ready",
        highscore: state.highscore,
        questions: state.questions,
      };

    case "time":
      return {
        ...state,
        remainigSecond: state.remainigSecond - 1,
        status: state.remainigSecond === 0 ? "finish" : state.status,
      };

    default:
      return {
        status: "dispatch type is undefined",
      };
  }
}

const SECONDS_PER_QUESTION = 30;
const API_BASE_URL = "http://localhost:8000";

const QuizContext = createContext();

function QuizProvider({ children }) {
  const [
    { questions, index, status, answer, points, highscore, remainigSecond },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions?.length;
  const allPoints = questions?.reduce((sum, cur) => sum + cur.points, 0);

  useEffect(function () {
    async function fetchQuetions() {
      try {
        const res = await fetch(`${API_BASE_URL}/questions`);

        if (res.ok === false) throw new TypeError("Something went wrong");

        const data = await res.json();
        dispatch({ type: "data", payLoad: data });
      } catch ({ message }) {
        dispatch({ type: "error" });
      }
    }

    fetchQuetions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        index,
        status,
        answer,
        points,
        highscore,
        remainigSecond,
        numQuestions,
        allPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("useQuiz had used out side QuizContext.Provider");

  return context;
}

export { QuizProvider, useQuiz };
