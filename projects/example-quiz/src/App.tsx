import { useState } from "react";
import { questions } from "./questions";

type Phase = "question" | "explanation" | "results";

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [selected, setSelected] = useState(-1);

  const q = questions[current];
  const isCorrect = selected === q?.correctIndex;

  function handleAnswer(index: number) {
    setSelected(index);
    if (index === q.correctIndex) setScore((s) => s + 1);
    setPhase("explanation");
  }

  function handleNext() {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(-1);
      setPhase("question");
    } else {
      setPhase("results");
    }
  }

  function handleRestart() {
    setCurrent(0);
    setScore(0);
    setSelected(-1);
    setPhase("question");
  }

  if (phase === "results") {
    return (
      <Layout>
        <h1 className="text-3xl font-bold mb-6">Results</h1>
        <p className="text-6xl font-bold mb-4">
          {score} / {questions.length}
        </p>
        <p className="text-gray-400 mb-8">
          {score === questions.length
            ? "Perfect! You understand the key concepts."
            : score >= 3
              ? "Good grasp of the basics. The explanations above cover what you missed."
              : "AI x-risk has some counterintuitive ideas. Review the explanations to build intuition."}
        </p>
        <button
          onClick={handleRestart}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      </Layout>
    );
  }

  return (
    <Layout>
      <p className="text-sm text-gray-500 mb-2">
        Question {current + 1} of {questions.length}
      </p>
      <h2 className="text-xl font-semibold mb-6">{q.question}</h2>

      <div className="space-y-3 w-full">
        {q.choices.map((choice, i) => {
          let style = "border-gray-700 hover:border-gray-500";
          if (phase === "explanation") {
            if (i === q.correctIndex) style = "border-green-500 bg-green-500/10";
            else if (i === selected) style = "border-red-500 bg-red-500/10";
            else style = "border-gray-800 opacity-50";
          }

          return (
            <button
              key={i}
              onClick={() => phase === "question" && handleAnswer(i)}
              disabled={phase === "explanation"}
              className={`w-full text-left px-4 py-3 rounded-lg border ${style} transition-colors`}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {phase === "explanation" && (
        <div className="mt-6 w-full">
          <p className={`font-medium mb-2 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
            {isCorrect ? "Correct!" : "Not quite."}
          </p>
          <p className="text-gray-300 text-sm mb-4">{q.explanation}</p>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors"
          >
            {current + 1 < questions.length ? "Next Question" : "See Results"}
          </button>
        </div>
      )}
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="max-w-xl w-full">{children}</div>
    </div>
  );
}
