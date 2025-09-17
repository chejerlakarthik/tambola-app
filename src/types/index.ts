export interface TambolaTicket {
  id: string;
  numbers: (number | null)[][];
  striked: boolean[][];
}

export interface GameState {
  currentGame: boolean;
  calledNumbers: number[];
  currentNumber: number | null;
  tickets: TambolaTicket[];
  winners: Winner[];
}

export interface Winner {
  ticketId: string;
  type: WinType;
  timestamp: number;
}

export type WinType = 'early_five' | 'top_line' | 'middle_line' | 'bottom_line' | 'four_corners' | 'full_house';

export interface GameSettings {
  ticketCount: number;
  autoCall: boolean;
  callInterval: number;
}