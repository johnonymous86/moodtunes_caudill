/**
 * Each mood maps to a Last.fm tag used for track lookup.
 * `gradient` classes must be Tailwind-safe (avoid dynamic construction).
 */
export const MOODS = [
  {
    id: 'happy',
    label: 'Happy',
    emoji: '😄',
    tag: 'happy',
    description: 'Bright, upbeat & joyful',
    gradient: 'from-yellow-400 to-orange-400',
    glow: 'shadow-yellow-500/30',
    textColor: 'text-yellow-300',
  },
  {
    id: 'sad',
    label: 'Sad',
    emoji: '😢',
    tag: 'sad',
    description: 'Melancholy & reflective',
    gradient: 'from-blue-400 to-blue-600',
    glow: 'shadow-blue-500/30',
    textColor: 'text-blue-300',
  },
  {
    id: 'energetic',
    label: 'Energetic',
    emoji: '⚡',
    tag: 'energetic',
    description: 'Pumped up & ready to go',
    gradient: 'from-orange-400 to-red-500',
    glow: 'shadow-orange-500/30',
    textColor: 'text-orange-300',
  },
  {
    id: 'chill',
    label: 'Chill',
    emoji: '😌',
    tag: 'chill',
    description: 'Relaxed & laid back',
    gradient: 'from-emerald-400 to-teal-500',
    glow: 'shadow-emerald-500/30',
    textColor: 'text-emerald-300',
  },
  {
    id: 'sleepy',
    label: 'Sleepy',
    emoji: '😴',
    tag: 'sleep',
    description: 'Winding down for rest',
    gradient: 'from-indigo-400 to-violet-500',
    glow: 'shadow-indigo-500/30',
    textColor: 'text-indigo-300',
  },
  {
    id: 'silly',
    label: 'Silly',
    emoji: '🤪',
    tag: 'fun',
    description: 'Playful & carefree',
    gradient: 'from-pink-400 to-fuchsia-500',
    glow: 'shadow-pink-500/30',
    textColor: 'text-pink-300',
  },
  {
    id: 'stressed',
    label: 'Stressed',
    emoji: '😤',
    tag: 'stress relief',
    description: 'Need to decompress',
    gradient: 'from-red-400 to-rose-600',
    glow: 'shadow-red-500/30',
    textColor: 'text-red-300',
  },
  {
    id: 'romantic',
    label: 'Romantic',
    emoji: '💕',
    tag: 'romantic',
    description: 'Love is in the air',
    gradient: 'from-rose-400 to-pink-600',
    glow: 'shadow-rose-500/30',
    textColor: 'text-rose-300',
  },
];

export const MOOD_PROMPTS = [
  'What\'s your current vibe?',
  'How are you feeling right now?',
  'What kind of music matches your mood today?',
  'Describe how you feel and we\'ll find your soundtrack.',
  'Are you sleepy, wide awake, or somewhere in between?',
  'What does your heart sound like today?',
];

export function getRandomPrompt() {
  return MOOD_PROMPTS[Math.floor(Math.random() * MOOD_PROMPTS.length)];
}

export function getMoodById(id) {
  return MOODS.find((m) => m.id === id) ?? null;
}
