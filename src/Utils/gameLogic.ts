import { gameParams, squareDefinitions } from './gameRules';
import { fisherYatesShuffle, makeTwoD } from './utils';

// Builds the initial game array
export function buildGameArray(width: number): string[][] {
	if (!(width % 2 === 1)) {
		/* Create an array with 1/4 of the total squares as 'blank', 'speeder', 'lava', and 'mud' */
		const blankArray = Array((width * width) / 4).fill('E');
		const speederArray = Array((width * width) / 4).fill('S');
		const lavaArray = Array((width * width) / 4).fill('L');
		const mudArray = Array((width * width) / 4).fill('M');
		const combinedArray = blankArray.concat(speederArray, lavaArray, mudArray);
		/* Shuffle the array and convert it to a 2D array */
		const shuffledArray = fisherYatesShuffle(combinedArray);
		const twoD = makeTwoD(shuffledArray, width);
		/* Set the 'player' ('A') to a random starting square on the left side of the grid */
		const randomRow = Math.floor(Math.random() * width);
		twoD[randomRow][0] = 'A';
		/* Set the 'end' ('B') to a random ending square on the right side of the grid */
		const randomEndRow = Math.floor(Math.random() * width);
		twoD[randomEndRow][width - 1] = 'B';

		return twoD;
	} else {
		alert('ERROR: The number of rows/width of the game needs to be an EVEN number.');
		throw new Error('The number of rows/width of the game needs to be an EVEN number.');
	}
}

// Finds the next index the player is moving to
export function findNextIndex(gameArray: string[][], oldIndex: [number, number], direction: string): [number, number] {
	const [oldRow, oldCol] = oldIndex;
	let newRow = oldRow;
	let newCol = oldCol;
	if (direction === 'ArrowUp' && oldRow > 0) {
		newRow = oldRow - 1;
	} else if (direction === 'ArrowDown' && oldRow < gameArray.length - 1) {
		newRow = oldRow + 1;
	} else if (direction === 'ArrowLeft' && oldCol > 0) {
		newCol = oldCol - 1;
	} else if (direction === 'ArrowRight' && oldCol < gameArray[0].length - 1) {
		newCol = oldCol + 1;
	}
	return [newRow, newCol];
}

// Forms the trail that the player has traveled in
export function updateGameArray(grid: string[][], oldIndex: number[], newIndex: number[]): string[][] {
	const updatedGrid = [...grid];
	updatedGrid[oldIndex[0]][oldIndex[1]] = 'V';
	updatedGrid[newIndex[0]][newIndex[1]] = 'A';
	return updatedGrid;
}

// Updates the game score after key press
export function updateScore(
	currHealth: number,
	currMoves: number,
	newIndex: number[],
	gameArray: string[][]
): { remainingHealth: number; remainingMoves: number; newSquare: string } {
	const newSquare = gameArray[newIndex[0]][newIndex[1]];
	const thisSquare = squareDefinitions[newSquare];
	const health = currHealth + thisSquare.health;
	const moves = currMoves + thisSquare.moves;
	return { remainingHealth: health, remainingMoves: moves, newSquare: newSquare };
}

// Determine if the game has ended
export function isGameOver(moves: number, health: number, newSquare: string): 'loser' | 'winner' | 'running' {
	if (health <= 0 || moves <= 0) return 'loser';
	else if (newSquare === 'B') return 'winner';
	else return 'running';
}

// Defines health and moves based off difficulty
export function difficulyReset(difficulty: string): { healthDiff: number; movesDiff: number } {
	if (difficulty === 'easy') {
		return { healthDiff: gameParams.easy.health, movesDiff: gameParams.easy.moves };
	} else if (difficulty === 'medium') {
		return { healthDiff: gameParams.medium.health, movesDiff: gameParams.medium.moves };
	} else if (difficulty === 'hard') {
		return { healthDiff: gameParams.hard.health, movesDiff: gameParams.hard.moves };
	} else {
		return { healthDiff: 0, movesDiff: 0 };
	}
}

// Finds the player on the game board
export function findPlayer(gameArray: string[][]): [number, number] {
	const playerRow = gameArray.findIndex((row) => row.includes('A'));
	const playerCol = gameArray[playerRow].indexOf('A');
	return [playerRow, playerCol];
}

// Finds the ending square on the game board
export function findEnd(gameArray: string[][]): [number, number] {
	const endingRow = gameArray.findIndex((row) => row.includes('B'));
	const endingCol = gameArray[endingRow].indexOf('B');
	return [endingRow, endingCol];
}
