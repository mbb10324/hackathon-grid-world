export interface SquareDefinitions {
	[key: string]: { moves: number; health: number };
}

export interface UseGame {
	startGame: () => void;
	pressKey: (key: ArrowKey) => void;
	changeDifficulty: (difficulty: DifficultyTypes) => void;
	setSolution: (solution: Path[]) => void;
	grid: string[][];
	width: number;
	health: number;
	moves: number;
	difficulty: DifficultyTypes;
	gameCondition: 'new' | 'running' | 'winner' | 'loser';
}

export type ArrowKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown';

export type Result = 'loser' | 'winner' | 'continue';

export type GameAction =
	| { type: 'GameStarted' }
	| { type: 'KeyPressed'; key: ArrowKey }
	| { type: 'DifficultyChanged'; difficulty: DifficultyTypes }
	| { type: 'DetermineGameOver'; result: string }
	| { type: 'SetSolution'; solution: Path[] };

export enum DifficultyTypes {
	Easy = 'easy',
	Medium = 'medium',
	Hard = 'hard',
}

export interface GameState {
	playerIndex: [number, number];
	endingIndex: [number, number];
	gameArray: string[][];
	width: number;
	healthPoints: number;
	moves: number;
	newSquare: string;
	difficulty: DifficultyTypes;
	gameCondition: 'new' | 'running' | 'winner' | 'loser';
	solution: Path[];
}

export interface UseScore {
	setShowLose: (show: boolean) => void;
	setShowWin: (show: boolean) => void;
	winner: () => void;
	loser: () => void;
	resetCounters: () => void;
	showLose: boolean;
	showWin: boolean;
	gamesPlayed: number;
	wins: number;
	loses: number;
}

export type Path = {
	r: number;
	c: number;
	type: string;
};

export type Solution = {
	health: number;
	moves: number;
	path: Path[];
	visualization: string[];
};
