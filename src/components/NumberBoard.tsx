import React from 'react';
import './NumberBoard.css';

interface NumberBoardProps {
  calledNumbers: number[];
  currentNumber: number | null;
}

const NumberBoard: React.FC<NumberBoardProps> = ({ calledNumbers, currentNumber }) => {
  // Generate all numbers from 1 to 90
  const allNumbers = Array.from({ length: 90 }, (_, i) => i + 1);

  const getNumberStatus = (number: number): string => {
    if (number === currentNumber) return 'current';
    if (calledNumbers.includes(number)) return 'called';
    return 'pending';
  };

  return (
    <div className="number-board">
      <h3>Number Board</h3>
      <div className="board-grid">
        {allNumbers.map((number) => (
          <div
            key={number}
            className={`board-cell ${getNumberStatus(number)}`}
          >
            {number}
          </div>
        ))}
      </div>
      <div className="board-legend">
        <div className="legend-item">
          <div className="legend-color current"></div>
          <span>Current Number</span>
        </div>
        <div className="legend-item">
          <div className="legend-color called"></div>
          <span>Called</span>
        </div>
        <div className="legend-item">
          <div className="legend-color pending"></div>
          <span>Not Called</span>
        </div>
      </div>
    </div>
  );
};

export default NumberBoard;