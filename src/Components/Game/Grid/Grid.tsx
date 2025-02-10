import React, { useRef, useMemo, useEffect } from 'react';
import Square from './Square/Square';
import './Grid.css';

type Props = {
	gameArray: string[][];
	handleTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
	handleTouchEnd: (event: React.TouchEvent<HTMLDivElement>) => void;
};

export default function Grid(props: Props) {
	//get numRows, and squareSize to build grid
	/**********************************************************************************************/
	const { gameArray, handleTouchStart, handleTouchEnd } = props;
	const gridRef = useRef<HTMLDivElement>(null);
	const numRows = gameArray[0].length;

	// Cast event handlers to the correct type
	const handleTouchStartTyped = (event: TouchEvent) =>
		handleTouchStart(event as unknown as React.TouchEvent<HTMLDivElement>);
	const handleTouchEndTyped = (event: TouchEvent) =>
		handleTouchEnd(event as unknown as React.TouchEvent<HTMLDivElement>);

	useEffect(() => {
		const gridElement = gridRef.current;

		if (gridElement) {
			const options = { passive: false };
			gridElement.addEventListener('touchstart', handleTouchStartTyped, options);
			gridElement.addEventListener('touchend', handleTouchEndTyped, options);
		}

		return () => {
			if (gridElement) {
				gridElement.removeEventListener('touchstart', handleTouchStartTyped);
				gridElement.removeEventListener('touchend', handleTouchEndTyped);
			}
		};
		//eslint-disable-next-line
	}, [handleTouchStart, handleTouchEnd]);

	function getSquareSize() {
		const getGridSize = gridRef.current;
		if (getGridSize instanceof HTMLElement) {
			return `${Number(getGridSize.clientWidth) / numRows}px`;
		}
		return '';
	}

	const squareSize = getSquareSize();

	//prevent react from re rendering entire grid with useMemo
	/**********************************************************************************************/
	const memoizeSquares = useMemo(() => {
		return (
			<div
				ref={gridRef}
				id='gridElement'
				className='grid'
				style={{
					//using css grid repeat function to build squares dynamically
					gridTemplateColumns: `repeat(${numRows}, ${squareSize})`,
					gridTemplateRows: `repeat(${numRows}, ${squareSize})`,
				}}
			>
				{gameArray.map((square, index) => {
					return (
						<React.Fragment key={`outer-${index}`}>
							{square.map((x, i) => {
								const key = `${index}-${i}`;
								return <Square key={key} className={x} />;
							})}
						</React.Fragment>
					);
				})}
			</div>
		);
		// eslint-disable-next-line
	}, [gameArray, numRows, squareSize, handleTouchStart, handleTouchEnd]);
	return memoizeSquares;
}
