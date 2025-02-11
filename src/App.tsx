import { useGameDetermination } from './Hooks/useGameDetermination';
import Scoreboard from './Components/Scoreboard/Scoreboard';
import { useGridResize } from './Hooks/useGridResize';
import { useKeyPress } from './Hooks/useKeyPress';
import Grid from './Components/Game/Grid/Grid';
import { useScore } from './Hooks/useScore';
import { useGame } from './Hooks/useGame';
import './App.css';

export default function App() {
	const game = useGame(); //Reducer to manage game state
	const score = useScore(); // Custom hook to handle score states
	useKeyPress(game); // Custom hook to handle key presses
	useGridResize(game); // Custom hook to handle grid resizing
	useGameDetermination(game, score); // Custom hook to handle game determination (win/lose)

	return (
		<div className='app'>
			<div className='wrapper'>
				<Grid gameArray={game.grid} />
				<Scoreboard game={game} score={score} />
			</div>
		</div>
	);
}
