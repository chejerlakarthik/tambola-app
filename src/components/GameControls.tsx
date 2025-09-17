import React, { useState } from 'react';
import './GameControls.css';

interface GameControlsProps {
  gameActive: boolean;
  autoCall: boolean;
  callInterval: number;
  calledNumbersCount: number;
  showTickets: boolean;
  onStartGame: (ticketCount: number, generateTickets: boolean) => void;
  onCallNumber: () => void;
  onToggleAutoCall: (auto: boolean) => void;
  onIntervalChange: (interval: number) => void;
  onToggleTickets: (show: boolean) => void;
  onResetGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameActive,
  autoCall,
  callInterval,
  calledNumbersCount,
  showTickets,
  onStartGame,
  onCallNumber,
  onToggleAutoCall,
  onIntervalChange,
  onToggleTickets,
  onResetGame
}) => {
  const [ticketCount, setTicketCount] = useState(4);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="game-controls">
      <div className="main-controls">
        {!gameActive ? (
          <div className="start-game-section">
            <div className="game-mode-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={showTickets}
                  onChange={(e) => onToggleTickets(e.target.checked)}
                />
                Show Practice Tickets (for players)
              </label>
            </div>
            
            {showTickets && (
              <div className="ticket-count-input">
                <label htmlFor="ticket-count">Number of Tickets:</label>
                <select 
                  id="ticket-count"
                  value={ticketCount} 
                  onChange={(e) => setTicketCount(Number(e.target.value))}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={6}>6</option>
                  <option value={8}>8</option>
                </select>
              </div>
            )}
            
            <button 
              className="start-button" 
              onClick={() => onStartGame(ticketCount, showTickets)}
            >
              🎮 Start New Game
            </button>
            
            <div className="mode-description">
              <p>
                {showTickets 
                  ? "Host mode with practice tickets - Use this when players don't have physical tickets"
                  : "Host-only mode - Use this when players have their own physical tickets"}
              </p>
            </div>
          </div>
        ) : (
          <div className="active-game-controls">
            <button 
              className="call-button"
              onClick={onCallNumber}
              disabled={autoCall}
            >
              📢 Call Next Number
            </button>
            
            <button 
              className="auto-toggle-button"
              onClick={() => onToggleAutoCall(!autoCall)}
            >
              {autoCall ? '⏸️ Stop Auto Call' : '▶️ Auto Call'}
            </button>
            
            <button 
              className="settings-button"
              onClick={() => setShowSettings(!showSettings)}
            >
              ⚙️ Settings
            </button>
            
            <button 
              className="reset-button"
              onClick={onResetGame}
            >
              🔄 Reset Game
            </button>
          </div>
        )}
      </div>

      {showSettings && gameActive && (
        <div className="settings-panel">
          <div className="setting-item">
            <label htmlFor="call-interval">Auto Call Interval (seconds):</label>
            <select 
              id="call-interval"
              value={callInterval / 1000} 
              onChange={(e) => onIntervalChange(Number(e.target.value) * 1000)}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
          
          <div className="game-info">
            <span>Numbers Remaining: {90 - calledNumbersCount}</span>
            <span>Progress: {Math.round((calledNumbersCount / 90) * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameControls;
