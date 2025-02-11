import { SquareDefinitions } from '../models';

export const easyWidth = 10;
export const easyHealth = 100;
export const easyMoves = 40;

export const mediumWidth = 26;
export const mediumHealth = 220;
export const mediumMoves = 100;

export const hardWidth = 50;
export const hardHealth = 450;
export const hardMoves = 200;

export const gameParams = {
	easy: { width: easyWidth, health: easyHealth, moves: easyMoves },
	medium: { width: mediumWidth, health: mediumHealth, moves: mediumMoves },
	hard: { width: hardWidth, health: hardHealth, moves: hardMoves },
};

export const squareDefinitions: SquareDefinitions = {
	A: { moves: 0, health: 0 },
	B: { moves: 0, health: 0 },
	V: { moves: 0, health: 0 },
	E: { moves: -1, health: 0 },
	S: { moves: 0, health: -5 },
	L: { moves: -10, health: -50 },
	M: { moves: -5, health: -10 },
};
