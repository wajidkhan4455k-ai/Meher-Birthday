export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  caption: string;
  detailedStory: string;
  location?: string;
}

export interface AppreciationItem {
  id: string;
  reasonNumber: number;
  title: string;
  description: string;
  iconName: string;
}

export interface WishItem {
  id: string;
  title: string;
  wishText: string;
  lanternColor: string;
  iconName: string;
}

export interface BirthdayStoryConfig {
  recipientName: string;
  senderName: string;
  senderNickname: string;
  birthdayDate: string;
  openingSubheading: string;
  personalLetter: string;
  memories: MemoryItem[];
  appreciations: AppreciationItem[];
  wishes: WishItem[];
  scratchSurpriseTitle: string;
  scratchSurpriseMessage: string;
  musicTrack: 'ambient' | 'peaceful' | 'acoustic' | 'celebration';
}

export type StoryChapter = 
  | 'curiosity'       // Chapter 1: Hey... I made something for you
  | 'reveal'          // Chapter 2: WAIT... IT'S YOUR DAY!
  | 'letter'          // Chapter 3: A Little Message From Me
  | 'memories'        // Chapter 4: A Few Moments Worth Remembering
  | 'appreciation'    // Chapter 5: Little Things That Make You Special
  | 'wishes'          // Chapter 6: I Hope This Year Gives You...
  | 'cake_and_scratch'// Chapter 7: Blow the Candles & Scratch Coupon
  | 'finale';         // Chapter 8: Final Celebration & Share / Personalize
