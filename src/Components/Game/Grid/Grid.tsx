import React, { useRef, useMemo } from 'react';
import Square from './Square/Square';
import './Grid.css';

type Props = {
	gameArray: string[][];
};

export default function Grid(props: Props) {
	//get numRows, and squareSize to build grid
	/**********************************************************************************************/
	const { gameArray } = props;
	const gridRef = useRef<HTMLDivElement>(null);
	const numRows = gameArray[0].length;

	function getSquareSize() {
		const getGridSize = gridRef.current;
		if (getGridSize instanceof HTMLElement) {
			return `${Number(getGridSize.clientWidth - 52) / numRows}px`;
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
	}, [gameArray, numRows, squareSize]);
	return memoizeSquares;
}
