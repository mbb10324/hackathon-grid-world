import { ArrowKey, DifficultyTypes, GameAction, GameState, UseGame } from '../models';
import { gameParams } from '../Utils/gameRules';
import { useReducer, Reducer } from 'react';
import {
	buildGameArray,
	difficulyReset,
	findEnd,
	findNextIndex,
	findPlayer,
	isGameOver,
	updateGameArray,
	updateScore,
} from '../Utils/gameLogic';

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

export function useGame(): UseGame {
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
