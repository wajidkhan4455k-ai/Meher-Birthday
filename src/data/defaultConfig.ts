import { BirthdayStoryConfig } from '../types';

export const DEFAULT_BIRTHDAY_CONFIG: BirthdayStoryConfig = {
  recipientName: 'Meher Manahil',
  senderName: 'Yasar Safi',
  senderNickname: 'Yasar Safi',
  birthdayDate: 'August 12',
  openingSubheading: 'I made something very special just for you, Meher Manahil.',
  personalLetter: `I didn't want to just send a simple "Happy Birthday!" text message this year that gets lost in a group chat or forgotten by tomorrow.

You mean way too much to me for that.

Looking back on everything, I realized how incredibly lucky I am to have someone as wonderful as you, Meher Manahil, in my life. You bring so much energy, warmth, and joy into every room you step into. You turn quiet, ordinary days into moments worth holding onto forever.

Today is completely yours. I hope you feel surrounded by all the happiness, laughter, and love you so generously share with everyone around you every single day.`,
  memories: [
    {
      id: 'mem-1',
      title: 'That Golden Hour Conversation',
      date: 'October 14, 2025',
      imageUrl: '/src/assets/images/memory_sunset_talks_1786568750380.jpg',
      caption: 'When we sat watching the sunset and lost all track of time.',
      detailedStory: 'We originally said we would only stay for 10 minutes, but we ended up talking for hours until the sky turned deep violet. That afternoon reminded me how effortless it is to talk to you about anything and everything.',
      location: 'Sunset Point'
    },
    {
      id: 'mem-2',
      title: 'Late Night Coffee & Unstoppable Laughter',
      date: 'December 22, 2025',
      imageUrl: '/src/assets/images/memory_coffee_laugh_1786568767945.jpg',
      caption: 'Two cups of warm coffee and jokes that had us crying of laughter.',
      detailedStory: 'Remember when we tried to stay focused, but one small joke turned into 20 minutes of non-stop laughing in the corner of the cozy cafe? Everyone was looking, but neither of us cared.',
      location: 'Fairy Light Cafe'
    },
    {
      id: 'mem-3',
      title: 'Stargazing Under the Open Sky',
      date: 'May 18, 2026',
      imageUrl: '/src/assets/images/memory_stargazing_1786568784986.jpg',
      caption: 'Wrapped in blankets, counting shooting stars and sharing big dreams.',
      detailedStory: 'Out away from city lights, we made wishes on stars and talked about where we wanted to be in 5 years. I remember thinking how rare and genuine your spirit is.',
      location: 'Whispering Pines Hill'
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
  scratchSurpriseMessage: 'VALID FOR: One Unlimited Coffee, Sunset Hangout & Anything You Want Day — Entirely On Me! ☕🌅🍰',
  musicTrack: 'ambient'
};
