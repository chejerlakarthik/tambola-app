import { TambolaTicket, WinType } from '../types';

/**
 * Generates a Tambola ticket with 15 random numbers (5 per row, max 3 rows)
 * Numbers are distributed: 1-9, 10-19, 20-29, ..., 80-90
 */
export const generateTambolaTicket = (id: string): TambolaTicket => {
  const ticket: (number | null)[][] = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null]
  ];

  const striked: boolean[][] = [
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false]
  ];

  // Generate numbers for each column (0-8 representing tens: 1-9, 10-19, ..., 80-90)
  for (let col = 0; col < 9; col++) {
    const columnNumbers: number[] = [];
    const start = col === 0 ? 1 : col * 10;
    const end = col === 8 ? 90 : (col + 1) * 10 - 1;
    
    // Generate available numbers for this column
    for (let num = start; num <= end; num++) {
      columnNumbers.push(num);
    }
    
    // Shuffle and pick numbers for this column
    const shuffled = columnNumbers.sort(() => Math.random() - 0.5);
    const selectedCount = Math.min(3, Math.floor(Math.random() * 3) + 1); // 1-3 numbers per column
    
    for (let i = 0; i < selectedCount; i++) {
      const row = Math.floor(Math.random() * 3);
      if (ticket[row][col] === null) {
        ticket[row][col] = shuffled[i];
      } else {
        // Find next available row
        for (let r = 0; r < 3; r++) {
          if (ticket[r][col] === null) {
            ticket[r][col] = shuffled[i];
            break;
          }
        }
      }
    }
  }

  // Ensure we have exactly 15 numbers
  let totalNumbers = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 9; col++) {
      if (ticket[row][col] !== null) totalNumbers++;
    }
  }

  // If we don't have exactly 15, redistribute
  if (totalNumbers < 15) {
    const needed = 15 - totalNumbers;
    const availableSpots: [number, number][] = [];
    
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 9; col++) {
        if (ticket[row][col] === null) {
          availableSpots.push([row, col]);
        }
      }
    }

    for (let i = 0; i < needed && availableSpots.length > 0; i++) {
      const spotIndex = Math.floor(Math.random() * availableSpots.length);
      const [row, col] = availableSpots[spotIndex];
      
      const start = col === 0 ? 1 : col * 10;
      const end = col === 8 ? 90 : (col + 1) * 10 - 1;
      const randomNum = Math.floor(Math.random() * (end - start + 1)) + start;
      
      ticket[row][col] = randomNum;
      availableSpots.splice(spotIndex, 1);
    }
  }

  // Sort numbers in each column
  for (let col = 0; col < 9; col++) {
    const columnNumbers: { row: number; value: number }[] = [];
    
    for (let row = 0; row < 3; row++) {
      if (ticket[row][col] !== null) {
        columnNumbers.push({ row, value: ticket[row][col]! });
        ticket[row][col] = null; // Clear temporarily
      }
    }
    
    columnNumbers.sort((a, b) => a.value - b.value);
    
    columnNumbers.forEach(({ row, value }) => {
      ticket[row][col] = value;
    });
  }

  return { id, numbers: ticket, striked };
};

/**
 * Generates random numbers from 1-90 excluding already called numbers
 */
export const getNextRandomNumber = (calledNumbers: number[]): number | null => {
  const availableNumbers = [];
  for (let i = 1; i <= 90; i++) {
    if (!calledNumbers.includes(i)) {
      availableNumbers.push(i);
    }
  }
  
  if (availableNumbers.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableNumbers.length);
  return availableNumbers[randomIndex];
};

/**
 * Strikes a number on a ticket if it exists
 */
export const strikeNumber = (ticket: TambolaTicket, number: number): TambolaTicket => {
  const newTicket = {
    ...ticket,
    striked: ticket.striked.map(row => [...row])
  };

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 9; col++) {
      if (ticket.numbers[row][col] === number) {
        newTicket.striked[row][col] = true;
      }
    }
  }

  return newTicket;
};

/**
 * Checks if a ticket has won for any pattern
 */
export const checkWinConditions = (ticket: TambolaTicket): WinType[] => {
  const wins: WinType[] = [];
  
  // Count total striked numbers for early five
  let totalStriked = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 9; col++) {
      if (ticket.striked[row][col] && ticket.numbers[row][col] !== null) {
        totalStriked++;
      }
    }
  }
  
  if (totalStriked >= 5) {
    wins.push('early_five');
  }
  
  // Check line wins
  for (let row = 0; row < 3; row++) {
    let lineComplete = true;
    for (let col = 0; col < 9; col++) {
      if (ticket.numbers[row][col] !== null && !ticket.striked[row][col]) {
        lineComplete = false;
        break;
      }
    }
    if (lineComplete) {
      if (row === 0) wins.push('top_line');
      else if (row === 1) wins.push('middle_line');
      else wins.push('bottom_line');
    }
  }
  
  // Check four corners
  const corners = [
    { row: 0, col: 0 }, { row: 0, col: 8 },
    { row: 2, col: 0 }, { row: 2, col: 8 }
  ];
  
  const cornerNumbers = corners.filter(({ row, col }) => ticket.numbers[row][col] !== null);
  const strikedCorners = cornerNumbers.filter(({ row, col }) => ticket.striked[row][col]);
  
  if (cornerNumbers.length > 0 && strikedCorners.length === cornerNumbers.length) {
    wins.push('four_corners');
  }
  
  // Check full house
  let allStriked = true;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 9; col++) {
      if (ticket.numbers[row][col] !== null && !ticket.striked[row][col]) {
        allStriked = false;
        break;
      }
    }
    if (!allStriked) break;
  }
  
  if (allStriked) {
    wins.push('full_house');
  }
  
  return wins;
};