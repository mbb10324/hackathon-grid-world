import { UseGame, UseScore } from '../models';
import { useEffect } from 'react';

export function useGameDetermination(game: UseGame, score: UseScore) {
	useEffect(() => {
		if (game.gameCondition === 'winner') {
			score.winner();
		} else if (game.gameCondition === 'loser') {
			score.loser();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game.gameCondition]);
}
