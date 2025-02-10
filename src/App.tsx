import Scoreboard from './Components/Scoreboard/Scoreboard';
import { useGame, useScore } from './Helpers/Hooks';
import Grid from './Components/Game/Grid/Grid';
import { debounce } from './Helpers/Utils';
import { useEffect } from 'react';
import './App.css';

export default function App() {
	const game = useGame(); //Reducer to manage game state
	const score = useScore(); //custom hook to handle score states

	useEffect(() => {
		game.startGame();
		window.addEventListener('keydown', keyPress);
		return () => {
			window.removeEventListener('keydown', keyPress);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const handleResizeDebounce = debounce(1000, handleResize);
		function handleResize() {
			game.changeDifficulty(game.difficulty);
		}
		window.addEventListener('resize', handleResizeDebounce);
		return () => window.removeEventListener('resize', handleResizeDebounce);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game.difficulty, game.changeDifficulty]);

	//fires every time the game condition changes to check for a winner or loser
	/**********************************************************************************************/
	useEffect(() => {
		if (game.gameCondition === 'winner') {
			score.winner();
		} else if (game.gameCondition === 'loser') {
			score.loser();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game.gameCondition]);

	//called after each arrow key is pressed
	/**********************************************************************************************/
	function keyPress(event: KeyboardEvent) {
		//case to only run on arrow key press
		switch (event.key) {
			case 'ArrowUp':
			case 'ArrowDown':
			case 'ArrowRight':
			case 'ArrowLeft':
				event.preventDefault();
				game.pressKey(event.key);
		}
	}

	return (
		<div className='app'>
			<div className='wrapper'>
				<Grid gameArray={game.grid} />
				<Scoreboard game={game} score={score} />
			</div>
		</div>
	);
}
