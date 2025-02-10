import './Difficulty.css';
import { DifficultyTypes } from '../../../Helpers/Hooks';

type Props = {
	changeDifficulty: (difficulty: DifficultyTypes) => void;
	resetCounters: () => void;
	gameInProgress: boolean;
};

export default function Difficulty(props: Props) {
	const { changeDifficulty, resetCounters, gameInProgress } = props; //define props

	//called after select field changed
	function selectDifficulty(event: React.ChangeEvent<HTMLSelectElement>) {
		changeDifficulty(event.target.value as DifficultyTypes);
		resetCounters();
	}

	return (
		<div className='difficulty'>
			<h1>DIFFICULTY</h1>
			<select onChange={selectDifficulty} defaultValue='medium' disabled={gameInProgress}>
				{Object.entries(DifficultyTypes).map(([key, value]) => (
					<option key={key} value={value}>
						{key.toUpperCase()}
					</option>
				))}
			</select>
			{gameInProgress ? <p>you can change difficulty after the round ends.</p> : <br />}
			{/*CUSTOM CSS*/}
		</div>
	);
}
