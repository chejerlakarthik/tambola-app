import React from 'react';
import { Winner } from '../types';
import { getBingoCallout, getRandomCallout } from '../utils/gameLogic';
import './NumberDisplay.css';

interface NumberDisplayProps {
  currentNumber: number | null;
  calledNumbers: number[];
  winners: Winner[];
}

interface RecentCallout {
  number: number;
  callout: string;
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

  // Get current bingo callout
  const getCurrentCallout = () => {
    if (currentNumber === null) return null;
    const callout = getBingoCallout(currentNumber);
    return callout;
  };

  // Get recent callouts for display
  const getRecentCallouts = (): RecentCallout[] => {
    return calledNumbers.slice(-5).reverse().map(number => ({
      number,
      callout: getRandomCallout(number)
    }));
  };

  const currentCallout = getCurrentCallout();
  const recentCallouts = getRecentCallouts();

  return (
	<div className="number-display">
	  <div className="current-number-section">
		<h2>Current Number</h2>
		<div className="current-number">
		  {currentNumber !== null ? currentNumber : '---'}
		</div>
		
		{currentCallout && (
		  <div className="bingo-callout">
			<div className="callout-main">
			  "{currentCallout.primary}"
			</div>
			{currentCallout.alternatives && currentCallout.alternatives.length > 0 && (
			  <div className="callout-alternatives">
				Also known as: {currentCallout.alternatives.join(', ')}
			  </div>
			)}
			{currentCallout.response && (
			  <div className="callout-response">
				<em>Response: {currentCallout.response}</em>
			  </div>
			)}
			{currentCallout.explanation && (
			  <div className="callout-explanation">
				{currentCallout.explanation}
			  </div>
			)}
		  </div>
		)}
		
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
	<h3>Recent Numbers & Callouts</h3>
	<div className="recent-numbers">
	  {recentCallouts.map((item, index) => (
		<div key={index} className={`recent-number-item ${
		  item.number === currentNumber ? 'current' : ''
		}`}>
		  <span className="recent-number">{item.number}</span>
		  <span className="recent-callout">{item.callout}</span>
		</div>
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