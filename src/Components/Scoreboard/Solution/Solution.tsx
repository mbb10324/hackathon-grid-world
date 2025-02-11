import { useState } from 'react';
import './Solution.css';

type SolutionProps = {
	grid: string[][];
};

export default function Solution(props: SolutionProps) {
	const { grid } = props;
	const [solution, setSolution] = useState<string | null>(null);

	function solve() {
		fetch('http://localhost:3000/solve', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ grid: convert2DArrayToString(grid) }),
		})
			.then((response) => response.json())
			.then((data) => {
				setSolution(data);
			});
	}

	function convert2DArrayToString(gameArray: string[][]): string {
		return gameArray.map((row) => row.map((cell) => cell.charAt(0).toUpperCase()).join('')).join('\n');
	}

	console.log(solution);

	return (
		<div className='solution'>
			<button onClick={solve}>See Solution</button>
		</div>
	);
}
