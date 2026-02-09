import { useGame } from "./engine/useGame";
import { Dashboard } from "./components/Dashboard";
import { Recap } from "./components/Recap";

export default function App() {
  const {
    state,
    emails,
    advanceToNext,
    nextEmailDate,
    reply,
    read,
    toggleStar,
    restart,
  } = useGame();

  if (state.phase === "ended") {
    return <Recap state={state} onRestart={restart} />;
  }

  return (
    <Dashboard
      state={state}
      emails={emails}
      onAdvance={advanceToNext}
      nextEmailDate={nextEmailDate}
      onReply={reply}
      onRead={read}
      onToggleStar={toggleStar}
      onNewGame={restart}
    />
  );
}
