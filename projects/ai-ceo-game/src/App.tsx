import { useGame } from "./engine/useGame";
import { Dashboard } from "./components/Dashboard";
import { Recap } from "./components/Recap";

export default function App() {
  const { state, inboxEmails, spamEmails, nextDay, reply, spam, read, restart } =
    useGame();

  if (state.phase === "ended") {
    return <Recap state={state} onRestart={restart} />;
  }

  return (
    <Dashboard
      state={state}
      inboxEmails={inboxEmails}
      spamEmails={spamEmails}
      onNextDay={nextDay}
      onReply={reply}
      onSpam={spam}
      onRead={read}
    />
  );
}
