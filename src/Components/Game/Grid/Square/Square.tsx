import './Square.css';
import React from "react";

interface SquareProps {
    className: string;
}

//memoize squares to prevent whole grid from re rendering
const Square = React.memo(({ className }: SquareProps) => {

    return <div className={className}></div>

});

export default Square;