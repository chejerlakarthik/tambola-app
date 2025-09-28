/**
 * British Bingo Nicknames (Bingo Lingo)
 * Traditional callouts used by bingo callers to make the game more entertaining
 * Source: https://en.wikipedia.org/wiki/List_of_British_bingo_nicknames
 */

export interface BingoCallout {
  number: number;
  primary: string;
  alternatives?: string[];
  explanation?: string;
  response?: string;
}

export const BINGO_CALLOUTS: Record<number, BingoCallout> = {
  1: {
    number: 1,
    primary: "Kelly's Eye",
    alternatives: ["Little Jimmy", "Buttered Scone"],
    explanation: "Military slang, possibly referencing Ned Kelly's helmet"
  },
  2: {
    number: 2,
    primary: "One Little Duck",
    alternatives: ["Me and You", "Dr Who"],
    explanation: "From the resemblance of the number 2 to a duck",
    response: "Quack!"
  },
  3: {
    number: 3,
    primary: "Cup of Tea",
    alternatives: ["You and Me", "Up a Tree"],
    explanation: "Rhymes with 'three'"
  },
  4: {
    number: 4,
    primary: "Knock at the Door",
    alternatives: ["Door to Door"],
    explanation: "Cockney rhyming slang"
  },
  5: {
    number: 5,
    primary: "Man Alive",
    alternatives: ["Jack Alive", "Dead Alive"],
    explanation: "Rhymes with 'five'"
  },
  6: {
    number: 6,
    primary: "Half a Dozen",
    alternatives: ["Tom Mix", "Chopsticks"],
    explanation: "Common phrase meaning six units"
  },
  7: {
    number: 7,
    primary: "Lucky Seven",
    alternatives: ["God's in Heaven"],
    explanation: "7 is considered lucky in many cultures"
  },
  8: {
    number: 8,
    primary: "Garden Gate",
    alternatives: ["One Fat Lady", "Harry Tate"],
    explanation: "Rhymes with 'eight' or resembles an overweight woman"
  },
  9: {
    number: 9,
    primary: "Doctor's Orders",
    explanation: "Number 9 was a laxative pill given by army doctors in WWI",
    response: "Cough, cough!"
  },
  10: {
    number: 10,
    primary: "Keir's Den",
    alternatives: ["Downing Street", "Cock and Hen"],
    explanation: "Refers to 10 Downing Street, changes with each PM"
  },
  11: {
    number: 11,
    primary: "Legs Eleven",
    explanation: "WWI Aussie slang for a tall, thin man",
    response: "*Wolf whistle*"
  },
  12: {
    number: 12,
    primary: "One Dozen",
    explanation: "Reference to 12 units in one dozen"
  },
  13: {
    number: 13,
    primary: "Unlucky for Some",
    explanation: "Reference to 13 being an unlucky number"
  },
  14: {
    number: 14,
    primary: "Valentine's Day",
    explanation: "Reference to 14 February being St. Valentine's Day"
  },
  15: {
    number: 15,
    primary: "Young and Keen",
    explanation: "Rhymes with 'fifteen'"
  },
  16: {
    number: 16,
    primary: "Never Been Kissed",
    alternatives: ["Sweet Sixteen"],
    explanation: "After the song 'Sweet Sixteen and Never Been Kissed'"
  },
  17: {
    number: 17,
    primary: "Dancing Queen",
    explanation: "The ABBA song features the number in its lyrics"
  },
  18: {
    number: 18,
    primary: "Coming of Age",
    explanation: "18 is the age of majority in England, Wales and N. Ireland"
  },
  19: {
    number: 19,
    primary: "Goodbye Teens",
    explanation: "19 is the last teenage year"
  },
  20: {
    number: 20,
    primary: "One Score",
    alternatives: ["Getting Plenty"],
    explanation: "20 units in a score"
  },
  21: {
    number: 21,
    primary: "Key of the Door",
    alternatives: ["Royal Salute"],
    explanation: "Traditional age of majority / 21-gun salute"
  },
  22: {
    number: 22,
    primary: "Two Little Ducks",
    alternatives: ["Ducks on the Pond"],
    explanation: "22 resembles the profile of two ducks",
    response: "Quack, quack!"
  },
  23: {
    number: 23,
    primary: "The Lord is My Shepherd",
    alternatives: ["Thee and Me"],
    explanation: "First words of Psalm 23"
  },
  24: {
    number: 24,
    primary: "Two Dozen",
    explanation: "12 × 2 = 24"
  },
  25: {
    number: 25,
    primary: "Duck and Dive",
    explanation: "Rhymes with 'twenty-five', 2 looks like a duck, 5 like a reflected 2"
  },
  26: {
    number: 26,
    primary: "Half a Crown",
    alternatives: ["Pick and Mix"],
    explanation: "Pre-decimal UK currency (2 shillings and sixpence)"
  },
  27: {
    number: 27,
    primary: "Duck and a Crutch",
    alternatives: ["Gateway to Heaven"],
    explanation: "2 looks like a duck, 7 looks like a crutch"
  },
  28: {
    number: 28,
    primary: "In a State",
    alternatives: ["Overweight"],
    explanation: "'Two and eight' is rhyming slang for 'state'"
  },
  29: {
    number: 29,
    primary: "Rise and Shine",
    explanation: "Rhymes with 'twenty-nine'"
  },
  30: {
    number: 30,
    primary: "Dirty Gertie",
    explanation: "Common rhyme from WWII bawdy song"
  },
  31: {
    number: 31,
    primary: "Get Up and Run",
    explanation: "Rhymes with 'thirty-one'"
  },
  32: {
    number: 32,
    primary: "Buckle My Shoe",
    explanation: "Rhymes with 'thirty-two'"
  },
  33: {
    number: 33,
    primary: "Dirty Knee",
    explanation: "Rhymes with 'thirty-three'"
  },
  34: {
    number: 34,
    primary: "Ask for More",
    explanation: "Rhymes with 'thirty-four'"
  },
  35: {
    number: 35,
    primary: "Jump and Jive",
    explanation: "A dance step"
  },
  36: {
    number: 36,
    primary: "Three Dozen",
    explanation: "3 × 12 = 36"
  },
  37: {
    number: 37,
    primary: "More than Eleven",
    explanation: "Rhymes with 'thirty-seven'"
  },
  38: {
    number: 38,
    primary: "Christmas Cake",
    explanation: "Cockney rhyming slang"
  },
  39: {
    number: 39,
    primary: "All the Steps",
    explanation: "From 'The Thirty-Nine Steps' novel by John Buchan"
  },
  40: {
    number: 40,
    primary: "Life Begins",
    alternatives: ["Naughty Forty"],
    explanation: "From 'Life Begins at Forty' book by W.B. Pitkin"
  },
  41: {
    number: 41,
    primary: "Time for Fun",
    explanation: "Rhymes with 'forty-one'"
  },
  42: {
    number: 42,
    primary: "Winnie the Pooh",
    explanation: "Rhymes with 'forty-two'"
  },
  43: {
    number: 43,
    primary: "Down on Your Knees",
    explanation: "Wartime phrase made popular by soldiers"
  },
  44: {
    number: 44,
    primary: "Droopy Drawers",
    alternatives: ["All the Fours"],
    explanation: "Refers to sagging underwear"
  },
  45: {
    number: 45,
    primary: "Halfway There",
    explanation: "Being halfway towards 90"
  },
  46: {
    number: 46,
    primary: "Up to Tricks",
    explanation: "Rhymes with 'forty-six'"
  },
  47: {
    number: 47,
    primary: "Four and Seven",
    explanation: "Refers to the two numbers that make up 47"
  },
  48: {
    number: 48,
    primary: "Four Dozen",
    explanation: "4 × 12 = 48"
  },
  49: {
    number: 49,
    primary: "PC",
    explanation: "BBC Radio series 'The Adventures of PC 49'",
    response: "Evening, all!"
  },
  50: {
    number: 50,
    primary: "It's a Bullseye!",
    alternatives: ["Half a Century"],
    explanation: "Referring to the darts score or 50 being half of 100"
  },
  51: {
    number: 51,
    primary: "Tweak of the Thumb",
    explanation: "Rhymes with 'fifty-one'"
  },
  52: {
    number: 52,
    primary: "Danny La Rue",
    alternatives: ["Deck of Cards", "Weeks in a Year"],
    explanation: "Reference to drag entertainer or 52 cards/weeks"
  },
  53: {
    number: 53,
    primary: "Here Comes Herbie!",
    alternatives: ["Stuck in the Tree"],
    explanation: "53 is Herbie the VW Beetle's racing number",
    response: "Beep beep!"
  },
  54: {
    number: 54,
    primary: "Man at the Door",
    alternatives: ["Clean the Floor"],
    explanation: "Rhymes with 'fifty-four'"
  },
  55: {
    number: 55,
    primary: "All the Fives",
    alternatives: ["Snakes Alive"],
    explanation: "55 is two fives / rhymes with 'fifty-five'"
  },
  56: {
    number: 56,
    primary: "Was She Worth It?",
    alternatives: ["Shotts Bus"],
    explanation: "Pre-decimal price of a marriage licence (5/6d)",
    response: "Every penny!"
  },
  57: {
    number: 57,
    primary: "Heinz Varieties",
    explanation: "Refers to 'Heinz 57', the '57 Varieties' slogan"
  },
  58: {
    number: 58,
    primary: "Make Them Wait",
    explanation: "Rhymes with 'fifty-eight' - caller often pauses"
  },
  59: {
    number: 59,
    primary: "Brighton Line",
    explanation: "Five and nine rhymes with Brighton Line"
  },
  60: {
    number: 60,
    primary: "Grandma's Getting Frisky",
    alternatives: ["Five Dozen"],
    explanation: "Rhymes with 'sixty' / 5 × 12 = 60"
  },
  61: {
    number: 61,
    primary: "Baker's Bun",
    explanation: "Rhymes with 'sixty-one'"
  },
  62: {
    number: 62,
    primary: "Tickety-Boo",
    alternatives: ["Turn the Screw"],
    explanation: "Rhymes with 'sixty-two'"
  },
  63: {
    number: 63,
    primary: "Tickle Me",
    explanation: "Rhymes with 'sixty-three'"
  },
  64: {
    number: 64,
    primary: "Almost Retired",
    alternatives: ["Red Raw"],
    explanation: "One year away from former UK retirement age"
  },
  65: {
    number: 65,
    primary: "Retirement Age",
    alternatives: ["Old Age Pension"],
    explanation: "Former UK mandatory retirement age"
  },
  66: {
    number: 66,
    primary: "Clickety Click",
    explanation: "Rhymes with 'sixty-six'"
  },
  67: {
    number: 67,
    primary: "Stairway to Heaven",
    alternatives: ["Made in Heaven"],
    explanation: "Rhymes with 'sixty-seven'"
  },
  68: {
    number: 68,
    primary: "Pick a Mate",
    alternatives: ["Saving Grace"],
    explanation: "Rhymes with 'sixty-eight'"
  },
  69: {
    number: 69,
    primary: "Either Way Up",
    alternatives: ["Meal for Two", "A Favourite of Mine"],
    explanation: "Number reads the same upside down / reference to position"
  },
  70: {
    number: 70,
    primary: "Three Score and Ten",
    explanation: "A score is 20, so 20 × 3 + 10 = 70"
  },
  71: {
    number: 71,
    primary: "Bang on the Drum",
    explanation: "Rhymes with 'seventy-one'"
  },
  72: {
    number: 72,
    primary: "Danny La Rue",
    alternatives: ["Six Dozen"],
    explanation: "Reference to drag entertainer / 6 × 12 = 72"
  },
  73: {
    number: 73,
    primary: "Queen Bee",
    alternatives: ["Lucky Free"],
    explanation: "Rhymes with 'seventy-three'"
  },
  74: {
    number: 74,
    primary: "Candy Store",
    explanation: "Rhymes with 'seventy-four'"
  },
  75: {
    number: 75,
    primary: "Strive and Drive",
    explanation: "Rhymes with 'seventy-five'"
  },
  76: {
    number: 76,
    primary: "Trombones",
    explanation: "From 'Seventy-Six Trombones' musical song"
  },
  77: {
    number: 77,
    primary: "All the Sevens",
    alternatives: ["Sunset Strip"],
    explanation: "77 is two sevens / reference to TV show"
  },
  78: {
    number: 78,
    primary: "Heaven's Gate",
    explanation: "Rhymes with 'seventy-eight'"
  },
  79: {
    number: 79,
    primary: "One More Time",
    explanation: "Rhymes with 'seventy-nine'"
  },
  80: {
    number: 80,
    primary: "Eight and Blank",
    alternatives: ["Gandhi's Breakfast"],
    explanation: "8 and 0 / reference to Gandhi eating nothing"
  },
  81: {
    number: 81,
    primary: "Stop and Run",
    explanation: "Rhymes with 'eighty-one'"
  },
  82: {
    number: 82,
    primary: "Straight on Through",
    explanation: "Rhymes with 'eighty-two'"
  },
  83: {
    number: 83,
    primary: "Time for Tea",
    explanation: "Rhymes with 'eighty-three'"
  },
  84: {
    number: 84,
    primary: "Seven Dozen",
    explanation: "7 × 12 = 84"
  },
  85: {
    number: 85,
    primary: "Staying Alive",
    explanation: "Rhymes with 'eighty-five'"
  },
  86: {
    number: 86,
    primary: "Between the Sticks",
    explanation: "Rhymes with 'eighty-six'"
  },
  87: {
    number: 87,
    primary: "Torquay in Devon",
    explanation: "Rhymes with 'eighty-seven'"
  },
  88: {
    number: 88,
    primary: "Two Fat Ladies",
    explanation: "88 resembles two overweight women"
  },
  89: {
    number: 89,
    primary: "Nearly There",
    alternatives: ["All But One"],
    explanation: "Almost at 90"
  },
  90: {
    number: 90,
    primary: "Top of the Shop",
    alternatives: ["End of the Line"],
    explanation: "Highest number in bingo"
  }
};

/**
 * Gets a bingo callout for a given number
 */
export const getBingoCallout = (number: number): BingoCallout | null => {
  return BINGO_CALLOUTS[number] || null;
};

/**
 * Gets a random alternative callout if available
 */
export const getRandomCallout = (number: number): string => {
  const callout = getBingoCallout(number);
  if (!callout) return `Number ${number}`;
  
  if (callout.alternatives && callout.alternatives.length > 0) {
    const allOptions = [callout.primary, ...callout.alternatives];
    const randomIndex = Math.floor(Math.random() * allOptions.length);
    return allOptions[randomIndex];
  }
  
  return callout.primary;
};