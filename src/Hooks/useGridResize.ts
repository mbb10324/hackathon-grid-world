import { debounce } from '../Utils/utils';
import { UseGame } from '../models';
import { useEffect } from 'react';

export function useGridResize(game: UseGame) {
	useEffect(() => {
		const handleResizeDebounce = debounce(1000, handleResize);
		function handleResize() {
			game.changeDifficulty(game.difficulty);
		}
		window.addEventListener('resize', handleResizeDebounce);
		return () => window.removeEventListener('resize', handleResizeDebounce);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game.difficulty, game.changeDifficulty]);
}
