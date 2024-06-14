import Header from "./Header.jsx";
import MainComponent from "./MainComponent.jsx";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import StartQuiz from "./StartQuiz.jsx";
import Question from "./Question.jsx";
import NextQuestion from "./NextQuestion.jsx";
import Progress from "./Progress.jsx";
import FinishQuiz from "./FinishQuiz.jsx";
import Footer from "./Footer.jsx";
import Timer from "./Timer.jsx";
import { useQuiz } from "../contexts/QuizContext.jsx";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />

      <MainComponent>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartQuiz />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer></Timer>
              <NextQuestion />
            </Footer>
          </>
        )}

        {status === "finish" && <FinishQuiz />}
      </MainComponent>
    </div>
  );
}

export default App;
