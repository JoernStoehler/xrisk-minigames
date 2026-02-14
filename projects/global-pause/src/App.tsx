import { useGame } from "./engine/useGame";
import MainMenu from "./components/MainMenu";
import GameScreen from "./components/GameScreen";
import GameOverScreen from "./components/GameOverScreen";

export default function App() {
  const game = useGame();
  const { state } = game;

  if (state.phase === "menu") {
    return <MainMenu onStart={game.startGame} />;
  }

  if (state.phase === "won" || state.phase === "lost") {
    return <GameOverScreen state={state} onRestart={game.restart} />;
  }

  return (
    <GameScreen
      state={state}
      onRespond={game.respond}
      onDeployInspector={game.deployInspector}
      onRecallInspector={game.recallInspector}
      onSetSpeed={game.setSpeed}
      onSetFunding={game.setSafetyFunding}
    />
  );
}
