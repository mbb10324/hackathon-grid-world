import { UseScore } from '../models';
import { useState } from 'react';

export function useScore(): UseScore {
	const [showLose, setShowLose] = useState<boolean>(false); //bool state for showing loser modal
	const [showWin, setShowWin] = useState<boolean>(false); //bool state for showing winner modal
	const [wins, setWins] = useState<number>(0); //win counter
	const [loses, setLoses] = useState<number>(0); //lose counter
	const [gamesPlayed, setGamesPlayed] = useState<number>(0); //total games played counter

	function winner() {
		setShowWin(true);
		setWins(wins + 1);
		setGamesPlayed(gamesPlayed + 1);
	}

	function loser() {
		setShowLose(true);
		setLoses(loses + 1);
		setGamesPlayed(gamesPlayed + 1);
	}

	function resetCounters() {
		setWins(0);
		setLoses(0);
		setGamesPlayed(0);
	}

	return {
		setShowLose,
		setShowWin,
		winner,
		loser,
		resetCounters,
		showLose,
		showWin,
		gamesPlayed,
		wins,
		loses,
	};
}
