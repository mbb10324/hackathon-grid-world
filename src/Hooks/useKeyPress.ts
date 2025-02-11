import { UseGame } from '../models';
import { useEffect } from 'react';

export function useKeyPress(game: UseGame) {
	useEffect(() => {
		game.startGame();
		window.addEventListener('keydown', keyPress);
		return () => {
			window.removeEventListener('keydown', keyPress);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
}
