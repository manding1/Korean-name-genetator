import { Question } from '@/types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    text: 'First, tell us about yourself.',
    subtext: 'Which name style are you looking for?',
    options: [
      {
        letter: 'A',
        label: 'Masculine',
        emoji: '🌊',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&fit=crop',
      },
      {
        letter: 'B',
        label: 'Feminine',
        emoji: '🌸',
        imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80&fit=crop',
      },
      {
        letter: 'C',
        label: 'Neutral',
        emoji: '✨',
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&fit=crop',
      },
    ],
  },
  {
    id: 2,
    text: 'You just arrived in Korea.',
    subtext: "What's the first thing you want to do?",
    options: [
      {
        letter: 'A',
        label: 'Visit a cozy bookstore',
        emoji: '📚',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80&fit=crop',
      },
      {
        letter: 'B',
        label: 'Explore trendy cafes',
        emoji: '☕',
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&fit=crop',
      },
      {
        letter: 'C',
        label: 'Hike a mountain trail',
        emoji: '⛰️',
        imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80&fit=crop',
      },
      {
        letter: 'D',
        label: 'Attend a live performance',
        emoji: '🎭',
        imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80&fit=crop',
      },
      {
        letter: 'E',
        label: 'Wander through busy streets',
        emoji: '🌃',
        imageUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&q=80&fit=crop',
      },
    ],
  },
  {
    id: 3,
    text: 'Your friends describe you as...',
    options: [
      {
        letter: 'A',
        label: 'Cheerful',
        emoji: '☀️',
        imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80&fit=crop',
      },
      {
        letter: 'B',
        label: 'Creative',
        emoji: '🎨',
        imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80&fit=crop',
      },
      {
        letter: 'C',
        label: 'Determined',
        emoji: '🚀',
        imageUrl: 'https://images.unsplash.com/photo-1483721310020-03333cf5bd14?w=600&q=80&fit=crop',
      },
      {
        letter: 'D',
        label: 'Warm-hearted',
        emoji: '❤️',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&fit=crop',
      },
      {
        letter: 'E',
        label: 'Quiet',
        emoji: '🌙',
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80&fit=crop',
      },
    ],
  },
  {
    id: 4,
    text: 'What kind of life would you like to have in Korea?',
    options: [
      {
        letter: 'A',
        label: 'Creating art and ideas',
        emoji: '🎨',
        imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80&fit=crop',
      },
      {
        letter: 'B',
        label: 'Helping and teaching others',
        emoji: '📚',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80&fit=crop',
      },
      {
        letter: 'C',
        label: 'Becoming an expert in your field',
        emoji: '🩺',
        imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&fit=crop',
      },
      {
        letter: 'D',
        label: 'Leading projects and businesses',
        emoji: '💼',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop',
      },
      {
        letter: 'E',
        label: 'Writing and sharing stories',
        emoji: '✍️',
        imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80&fit=crop',
      },
    ],
  },
  {
    id: 5,
    text: 'Which place feels most like home?',
    options: [
      {
        letter: 'A',
        label: 'Modern apartment in Seoul',
        emoji: '🏙️',
        imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80&fit=crop',
      },
      {
        letter: 'B',
        label: 'House near the sea',
        emoji: '🌊',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&fit=crop',
      },
      {
        letter: 'C',
        label: 'Cabin surrounded by nature',
        emoji: '🌲',
        imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=80&fit=crop',
      },
      {
        letter: 'D',
        label: 'Artistic neighborhood',
        emoji: '🎨',
        imageUrl: 'https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=600&q=80&fit=crop',
      },
      {
        letter: 'E',
        label: 'Luxury penthouse',
        emoji: '✨',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&fit=crop',
      },
    ],
  },
  {
    id: 6,
    text: 'What is most important to you?',
    options: [
      {
        letter: 'A',
        label: 'Freedom',
        emoji: '🕊️',
        imageUrl: 'https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=600&q=80&fit=crop',
      },
      {
        letter: 'B',
        label: 'Love',
        emoji: '❤️',
        imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80&fit=crop',
      },
      {
        letter: 'C',
        label: 'Success',
        emoji: '🚀',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&fit=crop',
      },
      {
        letter: 'D',
        label: 'Self-Expression',
        emoji: '🎨',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&fit=crop',
      },
      {
        letter: 'E',
        label: 'Stability',
        emoji: '🌿',
        imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80&fit=crop',
      },
    ],
  },
  {
    id: 7,
    text: 'If someone met you for the first time,',
    subtext: 'what would you want them to think?',
    options: [
      {
        letter: 'A',
        label: 'Sophisticated',
        emoji: '✨',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&fit=crop',
      },
      {
        letter: 'B',
        label: 'Intelligent',
        emoji: '🧠',
        imageUrl: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=600&q=80&fit=crop',
      },
      {
        letter: 'C',
        label: 'Confident',
        emoji: '🌟',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&fit=crop',
      },
      {
        letter: 'D',
        label: 'Warm',
        emoji: '❤️',
        imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80&fit=crop',
      },
      {
        letter: 'E',
        label: 'Independent',
        emoji: '🕊️',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&fit=crop',
      },
    ],
  },
  {
    id: 8,
    text: 'If you could live anywhere in Korea,',
    subtext: 'where would it be?',
    options: [
      {
        letter: 'A',
        label: 'Seoul',
        emoji: '🏙️',
        imageUrl: 'https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?w=600&q=80&fit=crop',
      },
      {
        letter: 'B',
        label: 'Busan',
        emoji: '🌊',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80&fit=crop',
      },
      {
        letter: 'C',
        label: 'Jeju',
        emoji: '🌴',
        imageUrl: 'https://images.unsplash.com/photo-1598535847927-fb14a2a3cd9d?w=600&q=80&fit=crop',
      },
      {
        letter: 'D',
        label: 'Gyeongju',
        emoji: '🏛️',
        imageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80&fit=crop',
      },
      {
        letter: 'E',
        label: 'Gangneung',
        emoji: '🌅',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop',
      },
      {
        letter: 'F',
        label: 'Jeonju',
        emoji: '🍲',
        imageUrl: 'https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=600&q=80&fit=crop',
      },
    ],
  },
  {
    id: 9,
    text: 'If you had a completely free day in Korea,',
    subtext: 'how would you spend it?',
    options: [
      {
        letter: 'A',
        label: 'Reading at a quiet cafe',
        emoji: '☕',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80&fit=crop',
      },
      {
        letter: 'B',
        label: 'Exploring hidden neighborhoods',
        emoji: '🚶',
        imageUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&q=80&fit=crop',
      },
      {
        letter: 'C',
        label: 'Visiting museums and galleries',
        emoji: '🖼️',
        imageUrl: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&q=80&fit=crop',
      },
      {
        letter: 'D',
        label: 'Shopping and meeting friends',
        emoji: '🛍️',
        imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80&fit=crop',
      },
      {
        letter: 'E',
        label: 'Escaping into nature',
        emoji: '🌲',
        imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=80&fit=crop',
      },
    ],
  },
  {
    id: 10,
    text: 'What kind of place makes you feel happiest?',
    options: [
      {
        letter: 'A',
        label: 'A cozy bookstore',
        emoji: '📚',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80&fit=crop',
      },
      {
        letter: 'B',
        label: 'A busy city street',
        emoji: '🌃',
        imageUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&q=80&fit=crop',
      },
      {
        letter: 'C',
        label: 'A peaceful beach',
        emoji: '🌊',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&fit=crop',
      },
      {
        letter: 'D',
        label: 'A vibrant music festival',
        emoji: '🎶',
        imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80&fit=crop',
      },
      {
        letter: 'E',
        label: 'A mountain viewpoint',
        emoji: '⛰️',
        imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80&fit=crop',
      },
    ],
  },
];

export function getAnswerLabel(questionIndex: number, letter: string): string {
  const question = questions[questionIndex];
  const option = question?.options.find((o) => o.letter === letter);
  return option ? `${option.label} ${option.emoji}` : letter;
}
