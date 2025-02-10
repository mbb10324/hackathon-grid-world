import Difficulty from './Difficulty/Difficulty';
import ResultModals from './ResultModals/ResultModals';
import Score from './Score/Score';
import './Scoreboard.css';

type ScoreboardProps = {
	game: any;
	score: any;
};

export default function Scoreboard(props: ScoreboardProps) {
	const { game, score } = props;

	return (
		<div className='scoreboard'>
			<h1 className='title'>Death Walk</h1>
			<Score
				healthPoints={game.health}
				moves={game.moves}
				wins={score.wins}
				loses={score.loses}
				gamesPlayed={score.gamesPlayed}
			/>
			<Difficulty
				gameInProgress={game.gameCondition === 'running'}
				changeDifficulty={game.changeDifficulty}
				resetCounters={score.resetCounters}
			/>
			<ResultModals
				clickedRestart={() => game.startGame()}
				setShowWin={score.setShowWin}
				setShowLose={score.setShowLose}
				showWin={score.showWin}
				showLose={score.showLose}
			/>
		</div>
	);
}
