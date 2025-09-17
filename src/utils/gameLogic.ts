import { TambolaTicket, WinType } from '../types';

/**
 * Generates a Tambola ticket with exactly 15 random numbers (5 per row)
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

  // Generate exactly 15 positions (5 per row) ensuring each column has at least 1 number
  const positions: [number, number][] = [];
  const columnsUsed = new Set<number>();
  
  // First, ensure each column has at least one number by placing one number in each column
  const allColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const shuffledColumns = allColumns.sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < 9; i++) {
    const col = shuffledColumns[i];
    const row = Math.floor(Math.random() * 3);
    positions.push([row, col]);
    columnsUsed.add(col);
  }
  
  // Now we have 9 positions (one per column), need 6 more for total of 15
  // Add remaining 6 positions randomly, ensuring each row has exactly 5 numbers
  const rowCounts = [0, 0, 0];
  
  // Count current numbers per row
  positions.forEach(([row]) => {
    rowCounts[row]++;
  });
  
  // Add remaining positions to balance rows to 5 each
  for (let row = 0; row < 3; row++) {
    while (rowCounts[row] < 5) {
      const availableCols = [];
      for (let col = 0; col < 9; col++) {
        // Check if this position is already taken
        const positionExists = positions.some(([r, c]) => r === row && c === col);
        if (!positionExists) {
          availableCols.push(col);
        }
      }
      
      if (availableCols.length > 0) {
        const randomCol = availableCols[Math.floor(Math.random() * availableCols.length)];
        positions.push([row, randomCol]);
        rowCounts[row]++;
      } else {
        break; // Safety break if no available columns
      }
    }
  }

  // For each position, generate appropriate number based on column
  positions.forEach(([row, col]) => {
    const start = col === 0 ? 1 : col * 10;
    const end = col === 8 ? 90 : (col + 1) * 10 - 1;
    
    // Generate a random number in the column's range
    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * (end - start + 1)) + start;
    } while (isNumberAlreadyInColumn(ticket, col, randomNum));
    
    ticket[row][col] = randomNum;
  });

  // Sort numbers in each column from top to bottom
  for (let col = 0; col < 9; col++) {
    const columnNumbers: { row: number; value: number }[] = [];
    
    // Collect all numbers in this column
    for (let row = 0; row < 3; row++) {
      if (ticket[row][col] !== null) {
        columnNumbers.push({ row, value: ticket[row][col]! });
        ticket[row][col] = null; // Clear temporarily
      }
    }
    
    // Sort by value and reassign to rows in order
    columnNumbers.sort((a, b) => a.value - b.value);
    
    columnNumbers.forEach(({ row, value }) => {
      ticket[row][col] = value;
    });
  }

  return { id, numbers: ticket, striked };
};

/**
 * Helper function to check if a number already exists in a column
 */
const isNumberAlreadyInColumn = (ticket: (number | null)[][], col: number, num: number): boolean => {
  for (let row = 0; row < 3; row++) {
    if (ticket[row][col] === num) {
      return true;
    }
  }
  return false;
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