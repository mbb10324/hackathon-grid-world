import { Solution, UseGame } from '../models';
import { useState } from 'react';

export default function useFindSolution(game: UseGame): { solve: () => void; solution: Solution[] | null } {
	const [solution, setSolution] = useState<Solution[] | null>(null);

	function solve() {
		fetch('http://localhost:3000/solve', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ grid: convert2DArrayToString(game.grid), health: game.health, moves: game.moves }),
		})
			.then((response) => response.json())
			.then((data) => {
				setSolution(data);
				game.setSolution(data[0].path);
			})
			.catch((error) => {
				console.error('Error finding solutions:', error);
				alert('We encountered an error finding the solutions. Please try again later.');
			});
	}

	function convert2DArrayToString(gameArray: string[][]): string {
		return gameArray.map((row) => row.map((cell) => cell.charAt(0).toUpperCase()).join('')).join('\n');
	}

	return { solve, solution };
}
