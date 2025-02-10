import Scoreboard from './Components/Scoreboard/Scoreboard';
import { useGame, useScore } from './Helpers/Hooks';
import Grid from './Components/Game/Grid/Grid';
import { useDebounce } from './Helpers/Utils';
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

	const { debouncedValue: debouncedDifficulty } = useDebounce({
		valueOrigin: game.difficulty,
		debounceAmountMilliseconds: 1000,
	});

	useEffect(() => {
		function handleResize() {
			game.changeDifficulty(debouncedDifficulty);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedDifficulty, game.changeDifficulty]);

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

	let startX = 0; // Declare startX
	let startY = 0; // Declare startY

	// Function to handle the start of a touch
	function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
		event.preventDefault();
		const appElement = document.querySelector('.App');
		appElement?.classList.add('no-scroll');
		startX = event.touches[0].clientX;
		startY = event.touches[0].clientY;
	}

	// Function to handle the end of a touch
	const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const appElement = document.querySelector('.App');
		appElement?.classList.remove('no-scroll');
		const diffX = event.changedTouches[0].clientX - startX; // Changed order here
		const diffY = event.changedTouches[0].clientY - startY; // Changed order here

		if (Math.abs(diffX) > Math.abs(diffY)) {
			if (diffX > 0) {
				game.pressKey('ArrowRight');
			} else {
				game.pressKey('ArrowLeft');
			}
		} else {
			if (diffY > 0) {
				game.pressKey('ArrowDown');
			} else {
				game.pressKey('ArrowUp');
			}
		}
	};

	return (
		<div className='app'>
			<div className='wrapper'>
				<Grid gameArray={game.grid} handleTouchStart={handleTouchStart} handleTouchEnd={handleTouchEnd} />
				<Scoreboard game={game} score={score} />
			</div>
		</div>
	);
}
