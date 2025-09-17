import React from 'react';
import { Winner } from '../types';
import './NumberDisplay.css';

interface NumberDisplayProps {
  currentNumber: number | null;
  calledNumbers: number[];
  winners: Winner[];
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ currentNumber, calledNumbers, winners }) => {
  const getWinTypeLabel = (winType: string): string => {
	switch (winType) {
	  case 'early_five': return 'Early Five';
	  case 'top_line': return 'Top Line';
	  case 'middle_line': return 'Middle Line';
	  case 'bottom_line': return 'Bottom Line';
	  case 'four_corners': return 'Four Corners';
	  case 'full_house': return 'Full House';
	  default: return winType;
	}
  };

  return (
	<div className="number-display">
	  <div className="current-number-section">
		<h2>Current Number</h2>
		<div className="current-number">
		  {currentNumber !== null ? currentNumber : '---'}
		</div>
		<div className="game-stats">
		  Numbers Called: {calledNumbers.length}/90
		</div>
	  </div>

	  {winners.length > 0 && (
		<div className="winners-section">
		  <h3>🏆 Winners!</h3>
		  <div className="winners-grid">
			{winners.map((winner, index) => (
			  <div key={index} className={`winner-item ${winner.type}`}>
				<strong>{winner.ticketId}</strong>
				<span>{getWinTypeLabel(winner.type)}</span>
			  </div>
			))}
		  </div>
		</div>
	  )}

  <div className="called-numbers-section">
	<h3>Recent Numbers</h3>
	<div className="recent-numbers">
	  {calledNumbers.slice(-5).reverse().map((number, index) => (
		<span key={index} className={`recent-number ${
		  number === currentNumber ? 'current' : ''
		}`}>
		  {number}
		</span>
	  ))}
	  {calledNumbers.length === 0 && (
		<span className="no-numbers">No numbers called yet</span>
	  )}
	</div>
  </div>
	</div>
  );
};

export default NumberDisplay;