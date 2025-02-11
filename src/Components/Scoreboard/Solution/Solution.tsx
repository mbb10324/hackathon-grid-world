import useFindSolution from '../../../Hooks/useFindSolution';
import { UseGame } from '../../../models';
import './Solution.css';

type SolutionProps = {
	game: UseGame;
};

export default function Solution(props: SolutionProps) {
	const { game } = props;
	const { solve, solution } = useFindSolution(game);

	console.log(solution);

	return (
		<div className='solution'>
			<button onClick={solve}>See Solution</button>
		</div>
	);
}
