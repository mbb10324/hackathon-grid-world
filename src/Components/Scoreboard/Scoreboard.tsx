import ResultModals from './ResultModals/ResultModals';
import Difficulty from './Difficulty/Difficulty';
import { UseGame, UseScore } from '../../models';
import Solution from './Solution/Solution';
import Score from './Score/Score';
import './Scoreboard.css';

type ScoreboardProps = {
	game: UseGame;
	score: UseScore;
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
			<Solution game={game} />
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
