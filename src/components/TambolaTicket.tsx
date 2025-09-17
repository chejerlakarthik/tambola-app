import React from 'react';
import { TambolaTicket, Winner } from '../types';
import './TambolaTicket.css';

interface TambolaTicketProps {
  ticket: TambolaTicket;
  winners: Winner[];
}

const TambolaTicketComponent: React.FC<TambolaTicketProps> = ({ ticket, winners }) => {
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
	<div className="tambola-ticket">
	  <div className="ticket-header">
		<h3>{ticket.id}</h3>
		{winners.length > 0 && (
		  <div className="winners-list">
			{winners.map((winner, index) => (
			  <span key={index} className={`win-badge ${winner.type}`}>
				🏆 {getWinTypeLabel(winner.type)}
			  </span>
			))}
		  </div>
		)}
	  </div>
	  
	  <div className="ticket-grid">
		{ticket.numbers.map((row, rowIndex) => (
		  <div key={rowIndex} className="ticket-row">
			{row.map((number, colIndex) => (
			  <div 
				key={`${rowIndex}-${colIndex}`} 
				className={`ticket-cell ${
				  number === null ? 'empty' : 
				  ticket.striked[rowIndex][colIndex] ? 'striked' : 'number'
				}`}
			  >
				{number !== null ? number : ''}
			  </div>
			))}
		  </div>
		))}
	  </div>
	</div>
  );
};

export default TambolaTicketComponent;