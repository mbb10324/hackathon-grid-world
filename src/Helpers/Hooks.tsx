import { useReducer, useState, Reducer } from 'react';
import {
	buildGameArray,
	difficulyReset,
	findEnd,
	findNextIndex,
	findPlayer,
	isGameOver,
	updateGameArray,
	updateScore,
} from './Utils';
import { gameParams } from './GameRules';

//all types used throughout this file
/**********************************************************************************************/
export type ArrowKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown';

export type Result = 'loser' | 'winner' | 'continue';

type GameAction =
	| { type: 'GameStarted' }
	| { type: 'KeyPressed'; key: ArrowKey }
	| { type: 'DifficultyChanged'; difficulty: DifficultyTypes }
	| { type: 'DetermineGameOver'; result: string };

export enum DifficultyTypes {
	Easy = 'easy',
	Medium = 'medium',
	Hard = 'hard',
}

interface GameState {
	playerIndex: [number, number];
	endingIndex: [number, number];
	gameArray: string[][];
	width: number;
	healthPoints: number;
	moves: number;
	newSquare: string;
	difficulty: DifficultyTypes;
	gameCondition: 'new' | 'running' | 'winner' | 'loser';
}

//reducer used to handle game state
/**********************************************************************************************/
const initialGameState: GameState = {
	playerIndex: [0, 0],
	endingIndex: [0, 0],
	gameArray: [[]],
	width: gameParams.medium.width,
	healthPoints: gameParams.medium.health,
	moves: gameParams.medium.moves,
	newSquare: '',
	difficulty: 'medium' as DifficultyTypes,
	gameCondition: 'new',
};

const gameReducer: Reducer<GameState, GameAction> = (state: GameState, action: GameAction): GameState => {
	let thisDifficulty: { healthDiff: number; movesDiff: number } = { healthDiff: 0, movesDiff: 0 };
	let thisNewArray: string[][] = [[]];
	switch (action.type) {
		//fired each time the game starts/startsover
		case 'GameStarted':
			thisDifficulty = difficulyReset(state.difficulty);
			thisNewArray = buildGameArray(state.width);

			return {
				...state,
				healthPoints: thisDifficulty.healthDiff,
				moves: thisDifficulty.movesDiff,
				playerIndex: findPlayer(thisNewArray),
				endingIndex: findEnd(thisNewArray),
				gameArray: thisNewArray,
				gameCondition: 'new',
			};
		//fired on every arrow key press
		case 'KeyPressed':
			if (state.gameCondition !== 'loser' && state.gameCondition !== 'winner') {
				const newIndex = findNextIndex(state.gameArray, state.playerIndex, action.key);
				const newScore = updateScore(state.healthPoints, state.moves, newIndex, state.gameArray);
				const updatedArray: string[][] = updateGameArray(state.gameArray, state.playerIndex, newIndex);
				const nextGameState = isGameOver(newScore.remainingHealth, newScore.remainingMoves, newScore.newSquare);

				return {
					...state,
					playerIndex: newIndex,
					gameArray: updatedArray,
					healthPoints: newScore.remainingHealth,
					moves: newScore.remainingMoves,
					newSquare: newScore.newSquare,
					gameCondition: nextGameState,
				};
			} else {
				return state;
			}
		default:
			return state;

		//fired after changing difficulties
		case 'DifficultyChanged':
			switch (action.difficulty) {
				case 'easy':
					thisNewArray = buildGameArray(gameParams.easy.width);
					return {
						...state,
						difficulty: 'easy' as DifficultyTypes,
						width: gameParams.easy.width,
						healthPoints: gameParams.easy.health,
						moves: gameParams.easy.moves,
						playerIndex: findPlayer(thisNewArray),
						endingIndex: findEnd(thisNewArray),
						gameArray: thisNewArray,
						gameCondition: 'new',
					};
				case 'medium':
					thisNewArray = buildGameArray(gameParams.medium.width);
					return {
						...state,
						difficulty: 'medium' as DifficultyTypes,
						width: gameParams.medium.width,
						healthPoints: gameParams.medium.health,
						moves: gameParams.medium.moves,
						playerIndex: findPlayer(thisNewArray),
						endingIndex: findEnd(thisNewArray),
						gameArray: thisNewArray,
						gameCondition: 'new',
					};
				case 'hard':
					thisNewArray = buildGameArray(gameParams.hard.width);
					return {
						...state,
						difficulty: 'hard' as DifficultyTypes,
						width: gameParams.hard.width,
						healthPoints: gameParams.hard.health,
						moves: gameParams.hard.moves,
						playerIndex: findPlayer(thisNewArray),
						endingIndex: findEnd(thisNewArray),
						gameArray: thisNewArray,
						gameCondition: 'new',
					};
				default:
					return state;
			}
	}
};

export function useGame() {
	const [state, dispatch] = useReducer(gameReducer, initialGameState);

	function startGame() {
		dispatch({ type: 'GameStarted' });
	}

	function pressKey(key: ArrowKey) {
		dispatch({ type: 'KeyPressed', key });
	}

	function changeDifficulty(difficulty: DifficultyTypes) {
		dispatch({ type: 'DifficultyChanged', difficulty });
	}

	return {
		startGame,
		pressKey,
		changeDifficulty,
		grid: state.gameArray,
		width: state.width,
		health: state.healthPoints,
		moves: state.moves,
		difficulty: state.difficulty,
		gameCondition: state.gameCondition,
	};
}

//custom hook to stucture shared state changes
/**********************************************************************************************/
export function useScore() {
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
