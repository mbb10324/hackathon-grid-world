import './Score.css';

type Props = {
	healthPoints: number;
	moves: number;
	wins: number;
	loses: number;
	gamesPlayed: number;
};

export default function Score(props: Props) {
	const { healthPoints, moves, wins, loses, gamesPlayed } = props;

	return (
		<div className='score'>
			<h1>SCORE</h1>
			<h3>Health: {healthPoints}</h3>
			<h3>Moves: {moves}</h3>
			<br />
			<h3>Games Played: {gamesPlayed}</h3>
			<h3>Loses: {loses}</h3>
			<h3>Wins: {wins}</h3>
		</div>
	);
}
