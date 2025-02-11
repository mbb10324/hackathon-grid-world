import React, { useEffect } from 'react';
import Modal from '../../Ui/Modal/Modal';
import './ResultModals.css';

type Props = {
	showWin: boolean;
	showLose: boolean;
	clickedRestart: React.Dispatch<React.SetStateAction<void>>;
	setShowWin: (showWin: boolean) => void;
	setShowLose: (showLose: boolean) => void;
};

export default function ResultModals(props: Props) {
	const { showWin, showLose, setShowWin, setShowLose, clickedRestart } = props; //define props
	const modalShown = showLose || showWin;

	//listener for enter button
	useEffect(() => {
		window.addEventListener('keyup', enterKey);
		return () => {
			window.removeEventListener('keyup', enterKey);
		};
	});

	//close modal on button click
	function closeResultModal() {
		clickedRestart();
		setShowWin(false);
		setShowLose(false);
	}

	//close modal when enter pressed
	function enterKey(event: KeyboardEvent) {
		if (event.key === 'Enter' && modalShown === true) {
			closeResultModal();
		}
	}

	function determineMessage() {
		if (showWin) {
			return 'Congrats, You Win!!! :)';
		} else if (showLose) {
			return 'Sorry, You Died!!! :(';
		} else {
			return '';
		}
	}

	return (
		<Modal showModal={showLose || showWin} setShowModal={closeResultModal}>
			<div className='results'>
				<h2>{determineMessage()}</h2>
				<div className='restart'>
					<button onClick={closeResultModal}>Click Here</button>
					<p>or</p>
					<p>Press ENTER</p>
				</div>
			</div>
		</Modal>
	);
}
