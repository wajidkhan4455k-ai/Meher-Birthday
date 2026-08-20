import { BirthdayStoryConfig } from '../types';

export const DEFAULT_BIRTHDAY_CONFIG: BirthdayStoryConfig = {
  recipientName: 'Meher Manahil',
  senderName: 'Yasar Safi',
  senderNickname: 'Yasar Safi',
  birthdayDate: 'August 21',
  openingSubheading: 'I made something very special just for you, Meher Manahil.',
  personalLetter: `I didn't want to just send a simple "Happy Birthday!" text message this year that gets lost in a group chat or forgotten by tomorrow.

You mean way too much to me for that.

Looking back on all our moments—especially our unforgettable hangout in Murree, the winding mountain roads, the chilly breeze, and all that nonstop laughter—I realized how incredibly lucky I am to have someone as wonderful as you in my life. You bring so much energy, warmth, and joy into every room you step into.

Today is completely yours. I hope 21 brings you endless happiness, exciting new adventures, and all the love you so generously share with everyone around you every single day.`,
  memories: [
    {
      id: 'mem-1',
      title: 'The Murree Road Trip & Mountain Breeze',
      date: 'Murree Road Trip',
      imageUrl: '/src/assets/images/murree_road_trip_1787247456799.jpg',
      caption: 'Winding roads through the pine forests with our favorite songs on repeat.',
      detailedStory: 'The drive up through the hills of Murree was pure magic. Windows rolled down, that crisp cold pine air rushing in, singing along to every song on the playlist, and laughing until our stomachs hurt. It was one of the best drives ever.',
      location: 'Murree Expressway & Hills'
    },
    {
      id: 'mem-2',
      title: 'Hot Karak Chai in the Chilly Evening',
      date: 'Chilly Evening in Murree',
      imageUrl: '/src/assets/images/murree_chai_cafe_1787247477282.jpg',
      caption: 'Holding warm cups of chai while shivering and sharing endless stories.',
      detailedStory: 'Remember when we stopped at the hillside cafe surrounded by fairy lights as the cold mountain mist rolled in? Holding those steaming cups of hot chai, laughing at random jokes, and talking about life made the chilly weather feel so warm and cozy.',
      location: 'Hillside Cafe, Murree'
    },
    {
      id: 'mem-3',
      title: 'Watching Sunset from Kashmir Point',
      date: 'Golden Hour at Murree Hills',
      imageUrl: '/src/assets/images/murree_hills_sunset_1787247493327.jpg',
      caption: 'Standing above the clouds as the sun painted the mountain hills golden.',
      detailedStory: 'Standing together at the viewpoint looking out over the rolling green mountains as the evening sky turned into shades of violet and gold. We both paused for a second just taking it all in—a peaceful, unforgettable moment I will always cherish.',
      location: 'Kashmir Point, Murree'
    }
  ],
  appreciations: [
    {
      id: 'app-1',
      reasonNumber: 1,
      title: 'Your Contagious Laughter',
      description: 'The way your whole face lights up whenever something funny happens. It instantly brightens any room you step into.',
      iconName: 'Sparkles'
    },
    {
      id: 'app-2',
      reasonNumber: 2,
      title: 'How You Remember Small Details',
      description: 'You always remember the little things—my favorite drink, a random thought I mentioned weeks ago, or when I need a pep talk.',
      iconName: 'Heart'
    },
    {
      id: 'app-3',
      reasonNumber: 3,
      title: 'Your Genuine Kindness',
      description: 'You treat everyone with effortless empathy and warmth. You make people feel seen, heard, and truly valued.',
      iconName: 'Sun'
    },
    {
      id: 'app-4',
      reasonNumber: 4,
      title: 'Your Quiet Strength',
      description: 'Even when things get chaotic or tough, you handle everything with incredible grace, resilience, and optimism.',
      iconName: 'Shield'
    },
    {
      id: 'app-5',
      reasonNumber: 5,
      title: 'Simply Being You',
      description: 'You never pretend to be anyone else. Your authenticity is your superpower, and it makes being your friend a gift.',
      iconName: 'Smile'
    }
  ],
  wishes: [
    {
      id: 'wish-1',
      title: 'More Reasons to Smile',
      wishText: 'I hope this year fills your days with unexpected quiet joy, spontaneous adventures, and reasons to smile every morning.',
      lanternColor: 'from-amber-400 to-orange-500',
      iconName: 'Sun'
    },
    {
      id: 'wish-2',
      title: 'Inspiring Conversations',
      wishText: 'I hope you find yourself surrounded by people who spark your creativity, cherish your mind, and cheer for your wins.',
      lanternColor: 'from-pink-400 to-rose-500',
      iconName: 'Sparkles'
    },
    {
      id: 'wish-3',
      title: 'Courage to Chase Big Dreams',
      wishText: 'I hope you step boldly toward every goal you have been secretly hoping for. You are capable of far more than you realize.',
      lanternColor: 'from-purple-400 to-indigo-500',
      iconName: 'Compass'
    },
    {
      id: 'wish-4',
      title: 'Deep Peace & Happiness',
      wishText: 'Above everything else, I wish you unshakeable inner peace, vibrant health, and a year full of love and warmth.',
      lanternColor: 'from-yellow-300 to-amber-500',
      iconName: 'Heart'
    }
  ],
  scratchSurpriseTitle: 'Your Official Birthday Voucher 🎟️',
  scratchSurpriseMessage: 'VALID FOR: One Unlimited Murree Hangout Trip, Hot Chai & Anything You Want Day — Entirely On Me! ☕🏔️🍰',
  musicTrack: 'ambient'
};
