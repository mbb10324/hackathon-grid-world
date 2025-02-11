// Converts initial array into 2d
export function makeTwoD(shuffledArray: string[], width: number): string[][] {
	const board = [];
	for (let i = 0; i < width; i++) {
		const row = [];
		for (let j = 0; j < width; j++) {
			const squareIndex = i * width + j;
			row.push(shuffledArray[squareIndex]);
		}
		board.push(row);
	}
	return board;
}

// Fisher yates algorithm for shuffling an array
export function fisherYatesShuffle(array: string[]): string[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Debounce function to limit the number of times a function is called
let timeoutId: number;
export function debounce<T extends (...args: unknown[]) => void>(ms: number, action: T) {
	return (...args: Parameters<T>): void => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			action(...args);
		}, ms);
	};
}
