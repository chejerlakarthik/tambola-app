import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { GameState, TambolaTicket, Winner } from './types';
import { generateTambolaTicket, getNextRandomNumber, strikeNumber, checkWinConditions } from './utils/gameLogic';
import TambolaTicketComponent from './components/TambolaTicket';
import NumberDisplay from './components/NumberDisplay';
import NumberBoard from './components/NumberBoard';
import GameControls from './components/GameControls';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentGame: false,
    calledNumbers: [],
    currentNumber: null,
    tickets: [],
    winners: []
  });

  const [autoCall, setAutoCall] = useState(false);
  const [callInterval, setCallInterval] = useState(3000);
  const [showTickets, setShowTickets] = useState(false); // Default to false - host-only mode

  // Initialize game with optional ticket generation
  const initializeGame = useCallback((ticketCount: number = 4, generateTickets: boolean = false) => {
    const newTickets: TambolaTicket[] = [];
    
    // Only generate tickets if explicitly requested
    if (generateTickets) {
      for (let i = 0; i < ticketCount; i++) {
        newTickets.push(generateTambolaTicket(`ticket-${i + 1}`));
      }
    }
    
    setGameState({
      currentGame: true,
      calledNumbers: [],
      currentNumber: null,
      tickets: newTickets,
      winners: []
    });
  }, []);

  // Call next number
  const callNextNumber = useCallback(() => {
    if (!gameState.currentGame) return;
    
    const nextNumber = getNextRandomNumber(gameState.calledNumbers);
    if (nextNumber === null) {
      // Game over - all numbers called
      setGameState(prev => ({ ...prev, currentGame: false }));
      return;
    }

    const newCalledNumbers = [...gameState.calledNumbers, nextNumber];
    
    // Strike the number on all tickets and check for wins
    const updatedTickets = gameState.tickets.map(ticket => strikeNumber(ticket, nextNumber));
    
    // Check for new winners
    const newWinners: Winner[] = [];
    updatedTickets.forEach(ticket => {
      const wins = checkWinConditions(ticket);
      wins.forEach(winType => {
        // Check if this win type hasn't been claimed for this ticket yet
        const existingWin = gameState.winners.find(w => w.ticketId === ticket.id && w.type === winType);
        if (!existingWin) {
          newWinners.push({
            ticketId: ticket.id,
            type: winType,
            timestamp: Date.now()
          });
        }
      });
    });
    
    setGameState(prev => ({
      ...prev,
      calledNumbers: newCalledNumbers,
      currentNumber: nextNumber,
      tickets: updatedTickets,
      winners: [...prev.winners, ...newWinners]
    }));
  }, [gameState]);

  // Auto call numbers
  useEffect(() => {
    if (autoCall && gameState.currentGame) {
      const interval = setInterval(() => {
        callNextNumber();
      }, callInterval);
      
      return () => clearInterval(interval);
    }
  }, [autoCall, gameState.currentGame, callNextNumber, callInterval]);

  const resetGame = () => {
    setGameState({
      currentGame: false,
      calledNumbers: [],
      currentNumber: null,
      tickets: [],
      winners: []
    });
    setAutoCall(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tambola Host</h1>
        <p className="app-subtitle">Draw numbers and track the game</p>
        
        <GameControls 
          gameActive={gameState.currentGame}
          autoCall={autoCall}
          callInterval={callInterval}
          showTickets={showTickets}
          onStartGame={initializeGame}
          onCallNumber={callNextNumber}
          onToggleAutoCall={setAutoCall}
          onIntervalChange={setCallInterval}
          onToggleTickets={setShowTickets}
          onResetGame={resetGame}
          calledNumbersCount={gameState.calledNumbers.length}
        />
        
        <div className="game-display-container">
          <NumberDisplay 
            currentNumber={gameState.currentNumber}
            calledNumbers={gameState.calledNumbers}
            winners={gameState.winners}
          />
          
          <NumberBoard 
            calledNumbers={gameState.calledNumbers}
            currentNumber={gameState.currentNumber}
          />
        </div>
        
        {showTickets && gameState.tickets.length > 0 && (
          <div className="tickets-container">
            <h2>Practice Tickets</h2>
            <div className="tickets-grid">
              {gameState.tickets.map(ticket => (
                <TambolaTicketComponent 
                  key={ticket.id} 
                  ticket={ticket} 
                  winners={gameState.winners.filter(w => w.ticketId === ticket.id)}
                />
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
